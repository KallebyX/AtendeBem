"use server"

import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"
import { setUserContext } from "@/lib/db-init"

export async function createPrescription(data: {
  patientId: string
  patientName?: string
  patientCpf?: string
  appointmentId?: string
  cid10Code?: string
  cid10Description?: string
  cid11Code?: string
  cid11Description?: string
  clinicalIndication: string
  medications: Array<{
    medicationId?: string
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    quantity: string | number
    administrationInstructions?: string
    specialWarnings?: string
  }>
  notes?: string
  validUntil?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifySession(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const sql = await getDb()
    await setUserContext(user.id)

    // Get patient info if not provided
    let patientName = data.patientName
    let patientCpf = data.patientCpf

    if (!patientName || !patientCpf) {
      const patientResult = await sql`
        SELECT full_name, cpf FROM patients WHERE id = ${data.patientId}
      `
      if (patientResult.length > 0) {
        patientName = patientName || patientResult[0].full_name
        patientCpf = patientCpf || patientResult[0].cpf
      }
    }

    // Format medications for JSONB storage
    const medicationsJson = data.medications.map(med => ({
      name: med.medicationName,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: med.duration,
      quantity: med.quantity,
      instructions: med.administrationInstructions || '',
      warnings: med.specialWarnings || ''
    }))

    // Build instructions text
    const instructionsText = [
      data.clinicalIndication ? `Indicação: ${data.clinicalIndication}` : null,
      data.cid10Code ? `CID-10: ${data.cid10Code} - ${data.cid10Description || ''}` : null,
      data.notes
    ].filter(Boolean).join('\n')

    // Create prescription using the actual table schema
    const prescriptionResult = await sql`
      INSERT INTO prescriptions (
        user_id, appointment_id, patient_name, patient_cpf,
        prescription_type, medications, instructions, validity_days
      ) VALUES (
        ${user.id}, ${data.appointmentId || null},
        ${patientName || 'Paciente'}, ${patientCpf || null},
        'normal', ${JSON.stringify(medicationsJson)}::jsonb,
        ${instructionsText || null}, ${data.validUntil ? 30 : 30}
      )
      RETURNING id
    `

    const prescriptionId = prescriptionResult[0].id

    // Registrar auditoria
    try {
      await sql`
        INSERT INTO audit_logs (
          user_id, action, entity_type, entity_id, description
        ) VALUES (
          ${user.id}, 'CREATE', 'prescription', ${prescriptionId},
          ${"Prescrição médica criada para paciente: " + (patientName || data.patientId)}
        )
      `
    } catch (auditError) {
      console.warn("Erro ao registrar auditoria (não crítico):", auditError)
    }

    return { success: true, prescriptionId }
  } catch (error: any) {
    console.error("Erro ao criar prescrição:", error)
    return { success: false, error: error.message || "Erro ao criar prescrição" }
  }
}

export async function getPrescriptionsByPatient(patientId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifySession(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const sql = await getDb()

    const prescriptions = await sql`
      SELECT 
        p.id, p.prescription_date, p.cid10_code, p.cid10_description,
        p.clinical_indication, p.status, p.valid_until,
        u.name as prescriber_name
      FROM prescriptions p
      JOIN users u ON p.user_id = u.id
      WHERE p.patient_id = ${patientId}
      ORDER BY p.prescription_date DESC
    `

    return { success: true, prescriptions }
  } catch (error: any) {
    console.error("Erro ao buscar prescrições:", error)
    return { success: false, error: error.message || "Erro ao buscar prescrições" }
  }
}
