"use server"

import { cookies } from "next/headers"
import { verifySession } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function createDigitalPrescription(data: {
  patientId: string
  medications: Array<{
    medicationId: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    quantity: number
    instructions?: string
    warnings?: string
  }>
  cid10Code?: string
  cid10Description?: string
  cid11Code?: string
  cid11Description?: string
  clinicalIndication?: string
  notes?: string
  validityDays?: number
  prescriptionType?: "simple" | "controlled_b1" | "controlled_b2" | "special"
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { error: "Sessão inválida" }
    }

    // Buscar dados do paciente
    const patientResult = await sql`
      SELECT full_name, cpf, date_of_birth 
      FROM patients 
      WHERE id = ${data.patientId} AND user_id = ${session.userId}
    `

    if (patientResult.length === 0) {
      return { error: "Paciente não encontrado" }
    }

    const patient = patientResult[0]

    // Buscar dados do médico
    const userResult = await sql`
      SELECT name, crm, crm_uf, specialty 
      FROM users 
      WHERE id = ${session.userId}
    `

    const doctor = userResult[0]

    // Criar prescrição médica
    const validityDays = data.validityDays || 30
    const prescriptionResult = await sql`
      INSERT INTO medical_prescriptions 
       (patient_id, user_id, prescription_date, cid10_code, cid10_description, 
        cid11_code, cid11_description, clinical_indication, notes, valid_until, status)
       VALUES (
         ${data.patientId}, 
         ${session.userId}, 
         CURRENT_DATE, 
         ${data.cid10Code || null}, 
         ${data.cid10Description || null}, 
         ${data.cid11Code || null}, 
         ${data.cid11Description || null}, 
         ${data.clinicalIndication || null}, 
         ${data.notes || null},
         CURRENT_DATE + INTERVAL '${validityDays} days', 
         'pending_signature'
       )
       RETURNING id
    `

    const prescriptionId = prescriptionResult[0].id

    // Inserir itens da prescrição
    for (const med of data.medications) {
      await sql`
        INSERT INTO prescription_items 
         (prescription_id, medication_id, medication_name, dosage, frequency, 
          duration, quantity, administration_instructions, special_warnings)
         VALUES (
           ${prescriptionId}, 
           ${med.medicationId}, 
           ${med.medicationName}, 
           ${med.dosage}, 
           ${med.frequency}, 
           ${med.duration}, 
           ${med.quantity}, 
           ${med.instructions || null}, 
           ${med.warnings || null}
         )
      `
    }

    // Verificar se há substâncias controladas
    const hasControlled = data.medications.some((med) => data.prescriptionType?.includes("controlled"))

    // Criar receita digital
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + (data.validityDays || 30))

    const digitalPrescriptionResult = await sql`
      INSERT INTO digital_prescriptions 
       (prescription_id, patient_id, user_id, doctor_name, doctor_crm, doctor_crm_uf, 
        doctor_specialty, patient_name, patient_cpf, patient_date_of_birth, 
        validity_days, valid_until, is_controlled_substance, prescription_type, status)
       VALUES (
         ${prescriptionId}, 
         ${data.patientId}, 
         ${session.userId}, 
         ${doctor.name}, 
         ${doctor.crm}, 
         ${doctor.crm_uf}, 
         ${doctor.specialty}, 
         ${patient.full_name}, 
         ${patient.cpf}, 
         ${patient.date_of_birth}, 
         ${data.validityDays || 30}, 
         ${validUntil.toISOString().split("T")[0]}, 
         ${hasControlled}, 
         ${data.prescriptionType || "simple"}, 
         'pending_signature'
       )
       RETURNING id, validation_token
    `

    return {
      success: true,
      digitalPrescriptionId: digitalPrescriptionResult[0].id,
      validationToken: digitalPrescriptionResult[0].validation_token,
    }
  } catch (error) {
    console.error("[v0] Error creating digital prescription:", error)
    return { error: "Erro ao criar receita digital" }
  }
}

export async function signDigitalPrescription(data: {
  digitalPrescriptionId: string
  certificateSerial: string
  certificateIssuer: string
  signatureHash: string
  digitalSignatureData: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { error: "Sessão inválida" }
    }

    // Atualizar receita com assinatura digital
    await sql`
      UPDATE digital_prescriptions 
       SET is_digitally_signed = true,
           signature_certificate_serial = ${data.certificateSerial},
           signature_certificate_issuer = ${data.certificateIssuer},
           signature_timestamp = CURRENT_TIMESTAMP,
           signature_hash = ${data.signatureHash},
           digital_signature_data = ${data.digitalSignatureData},
           status = 'signed'
       WHERE id = ${data.digitalPrescriptionId} AND user_id = ${session.userId}
    `

    // Registrar log de assinatura
    await sql`
      INSERT INTO digital_signature_logs 
       (digital_prescription_id, user_id, action, success, certificate_details)
       VALUES (
         ${data.digitalPrescriptionId}, 
         ${session.userId}, 
         'sign', 
         true, 
         ${JSON.stringify({
           serial: data.certificateSerial,
           issuer: data.certificateIssuer,
         })}
       )
    `

    return { success: true }
  } catch (error) {
    console.error("[v0] Error signing prescription:", error)
    return { error: "Erro ao assinar receita" }
  }
}

export async function getDigitalPrescriptions() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { error: "Sessão inválida" }
    }

    const result = await sql`
      SELECT 
        dp.*,
        json_agg(
          json_build_object(
            'medication_name', pi.medication_name,
            'dosage', pi.dosage,
            'frequency', pi.frequency,
            'duration', pi.duration,
            'quantity', pi.quantity
          )
        ) as medications
       FROM digital_prescriptions dp
       JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
       JOIN prescription_items pi ON mp.id = pi.prescription_id
       WHERE dp.user_id = ${session.userId}
       GROUP BY dp.id
       ORDER BY dp.created_at DESC
    `

    return { prescriptions: result }
  } catch (error) {
    console.error("[v0] Error fetching prescriptions:", error)
    return { error: "Erro ao buscar receitas" }
  }
}

export async function renewDigitalPrescription(originalPrescriptionId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { error: "Sessão inválida" }
    }

    // Buscar receita original
    const originalResult = await sql`
      SELECT dp.*, mp.patient_id, mp.cid10_code, mp.cid10_description,
              mp.cid11_code, mp.cid11_description, mp.clinical_indication, mp.notes
       FROM digital_prescriptions dp
       JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
       WHERE dp.id = ${originalPrescriptionId} AND dp.user_id = ${session.userId}
    `

    if (originalResult.length === 0) {
      return { error: "Receita original não encontrada" }
    }

    const original = originalResult[0]

    // Buscar medicamentos da receita original
    const medsResult = await sql`
      SELECT pi.* FROM prescription_items pi
       JOIN medical_prescriptions mp ON pi.prescription_id = mp.id
       JOIN digital_prescriptions dp ON mp.id = dp.prescription_id
       WHERE dp.id = ${originalPrescriptionId}
    `

    const medications = medsResult.map((med) => ({
      medicationId: med.medication_id,
      medicationName: med.medication_name,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: med.duration,
      quantity: med.quantity,
      instructions: med.administration_instructions,
      warnings: med.special_warnings,
    }))

    // Criar nova receita baseada na original
    return await createDigitalPrescription({
      patientId: original.patient_id,
      medications,
      cid10Code: original.cid10_code,
      cid10Description: original.cid10_description,
      cid11Code: original.cid11_code,
      cid11Description: original.cid11_description,
      clinicalIndication: original.clinical_indication,
      notes: original.notes,
      validityDays: original.validity_days,
      prescriptionType: original.prescription_type,
    })
  } catch (error) {
    console.error("[v0] Error renewing prescription:", error)
    return { error: "Erro ao renovar receita" }
  }
}
