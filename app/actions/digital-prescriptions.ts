"use server"

import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"

export async function createDigitalPrescription(data: {
  patientId: string
  medications: Array<{
    medicationId?: string
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

    const userId = session.id
    const sql = await getDb()

    // Buscar dados do paciente
    const patientResult = await sql`
      SELECT full_name, cpf, date_of_birth 
      FROM patients 
      WHERE id = ${data.patientId} AND user_id = ${userId}
    `

    if (patientResult.length === 0) {
      return { error: "Paciente não encontrado" }
    }

    const patient = patientResult[0]

    // Buscar dados do médico
    const userResult = await sql`
      SELECT name, crm, crm_uf, specialty 
      FROM users 
      WHERE id = ${userId}
    `

    const doctor = userResult[0]

    const validityDays = data.validityDays || 30
    const validUntilDate = new Date()
    validUntilDate.setDate(validUntilDate.getDate() + validityDays)
    const validUntilStr = validUntilDate.toISOString().split("T")[0]

    // Criar prescrição médica
    const prescriptionResult = await sql`
      INSERT INTO medical_prescriptions 
       (patient_id, user_id, prescription_date, cid10_code, cid10_description, 
        cid11_code, cid11_description, clinical_indication, notes, valid_until, status)
       VALUES (
         ${data.patientId}, 
         ${userId}, 
         CURRENT_DATE, 
         ${data.cid10Code || null}, 
         ${data.cid10Description || null}, 
         ${data.cid11Code || null}, 
         ${data.cid11Description || null}, 
         ${data.clinicalIndication || null}, 
         ${data.notes || null},
         ${validUntilStr}::date, 
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
           ${med.medicationId || null}, 
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
    const hasControlled = data.prescriptionType?.includes("controlled") || false

    // Criar receita digital
    const digitalPrescriptionResult = await sql`
      INSERT INTO digital_prescriptions 
       (prescription_id, patient_id, user_id, doctor_name, doctor_crm, doctor_crm_uf, 
        doctor_specialty, patient_name, patient_cpf, patient_date_of_birth, 
        validity_days, valid_until, is_controlled_substance, prescription_type, status)
       VALUES (
         ${prescriptionId}, 
         ${data.patientId}, 
         ${userId}, 
         ${doctor.name}, 
         ${doctor.crm}, 
         ${doctor.crm_uf}, 
         ${doctor.specialty}, 
         ${patient.full_name}, 
         ${patient.cpf}, 
         ${patient.date_of_birth}, 
         ${validityDays}, 
         ${validUntilStr}::date, 
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

    const userId = session.id
    const sql = await getDb()

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
       WHERE id = ${data.digitalPrescriptionId} AND user_id = ${userId}
    `

    // Registrar log de assinatura
    await sql`
      INSERT INTO digital_signature_logs 
       (digital_prescription_id, user_id, action, success, certificate_details)
       VALUES (
         ${data.digitalPrescriptionId}, 
         ${userId}, 
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

    const userId = session.id
    const sql = await getDb()

    const prescriptions = await sql`
      SELECT 
        dp.*
       FROM digital_prescriptions dp
       WHERE dp.user_id = ${userId}
       ORDER BY dp.created_at DESC
    `

    // Fetch medications separately for each prescription
    const prescriptionsWithMeds = await Promise.all(
      prescriptions.map(async (dp: any) => {
        const items = await sql`
          SELECT pi.medication_name, pi.dosage, pi.frequency, pi.duration, pi.quantity
          FROM prescription_items pi
          WHERE pi.prescription_id = ${dp.prescription_id}
        `
        return { ...dp, medications: items }
      }),
    )

    return { prescriptions: prescriptionsWithMeds }
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

    const userId = session.id
    const sql = await getDb()

    // Buscar receita original
    const originalResult = await sql`
      SELECT dp.*, mp.patient_id, mp.cid10_code, mp.cid10_description,
              mp.cid11_code, mp.cid11_description, mp.clinical_indication, mp.notes
       FROM digital_prescriptions dp
       JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
       WHERE dp.id = ${originalPrescriptionId} AND dp.user_id = ${userId}
    `

    if (originalResult.length === 0) {
      return { error: "Receita original não encontrada" }
    }

    const original = originalResult[0]

    // Buscar medicamentos da receita original
    const medsResult = await sql`
      SELECT pi.* FROM prescription_items pi
       WHERE pi.prescription_id = ${original.prescription_id}
    `

    const medications = medsResult.map((med: any) => ({
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

export async function getDigitalPrescriptionDetails(prescriptionId: string) {
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

    const userId = session.id
    const sql = await getDb()

    const result = await sql`
      SELECT dp.*, mp.clinical_indication, mp.cid10_code, mp.cid10_description
      FROM digital_prescriptions dp
      LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
      WHERE dp.id = ${prescriptionId} AND dp.user_id = ${userId}
    `

    if (result.length === 0) {
      return { error: "Receita não encontrada" }
    }

    const prescription = result[0]

    const items = await sql`
      SELECT * FROM prescription_items
      WHERE prescription_id = ${prescription.prescription_id}
    `

    return {
      success: true,
      prescription: { ...prescription, medications: items },
    }
  } catch (error) {
    console.error("[v0] Error fetching prescription details:", error)
    return { error: "Erro ao buscar receita" }
  }
}
