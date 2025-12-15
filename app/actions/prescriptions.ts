"use server"

import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"

export async function createPrescription(data: {
  patientId: number
  appointmentId?: number
  cid10Code?: string
  cid10Description?: string
  cid11Code?: string
  cid11Description?: string
  clinicalIndication: string
  medications: Array<{
    medicationId?: number
    medicationName: string
    dosage: string
    frequency: string
    duration: string
    quantity: number
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

    // Criar prescrição
    const prescriptionResult = await sql`
      INSERT INTO prescriptions (
        patient_id, user_id, appointment_id,
        cid10_code, cid10_description,
        cid11_code, cid11_description,
        clinical_indication, notes, valid_until
      ) VALUES (
        ${data.patientId}, ${user.id}, ${data.appointmentId || null},
        ${data.cid10Code || null}, ${data.cid10Description || null},
        ${data.cid11Code || null}, ${data.cid11Description || null},
        ${data.clinicalIndication}, ${data.notes || null}, ${data.validUntil || null}
      )
      RETURNING id
    `

    const prescriptionId = prescriptionResult[0].id

    // Inserir medicamentos
    for (const med of data.medications) {
      await sql`
        INSERT INTO prescription_items (
          prescription_id, medication_id, medication_name,
          dosage, frequency, duration, quantity,
          administration_instructions, special_warnings
        ) VALUES (
          ${prescriptionId}, ${med.medicationId || null}, ${med.medicationName},
          ${med.dosage}, ${med.frequency}, ${med.duration}, ${med.quantity},
          ${med.administrationInstructions || null}, ${med.specialWarnings || null}
        )
      `
    }

    // Registrar auditoria
    await sql`
      INSERT INTO audit_logs (
        user_id, action, entity_type, entity_id, description
      ) VALUES (
        ${user.id}, 'CREATE', 'prescription', ${prescriptionId},
        ${"Prescrição médica criada para paciente ID: " + data.patientId}
      )
    `

    return { success: true, prescriptionId }
  } catch (error: any) {
    console.error("Erro ao criar prescrição:", error)
    return { success: false, error: error.message || "Erro ao criar prescrição" }
  }
}

export async function getPrescriptionsByPatient(patientId: number) {
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
