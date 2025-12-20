"use server"

import { getDb } from "@/lib/db"
import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import { setUserContext } from "@/lib/db-init"

export async function createOdontogram(data: {
  patient_id: string
  appointment_id?: string
  teeth_data?: any
  clinical_notes?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      INSERT INTO odontograms (
        tenant_id, user_id, patient_id, appointment_id, teeth_data, clinical_notes
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id},
        ${data.appointment_id || null},
        ${JSON.stringify(data.teeth_data || {})},
        ${data.clinical_notes || ""}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateOdontogram(
  id: string,
  data: {
    teeth_data?: any
    clinical_notes?: string
    treatment_plan?: string
  },
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE odontograms SET
        teeth_data = ${data.teeth_data ? JSON.stringify(data.teeth_data) : "teeth_data"},
        clinical_notes = ${data.clinical_notes || "clinical_notes"},
        treatment_plan = ${data.treatment_plan || "treatment_plan"},
        updated_at = NOW()
      WHERE id = ${id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    if (result.length === 0) return { error: "Odontograma não encontrado" }
    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getOdontogramsByPatient(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT o.*, p.name as patient_name
      FROM odontograms o
      JOIN patients p ON o.patient_id = p.id
      WHERE o.patient_id = ${patient_id}
      AND o.tenant_id = ${user.tenant_id}
      AND o.deleted_at IS NULL
      ORDER BY o.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function addOdontogramProcedure(data: {
  odontogram_id: string
  tooth_number: string
  tooth_face?: string
  procedure_code: string
  procedure_name: string
  notes?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      INSERT INTO odontogram_procedures (
        tenant_id, odontogram_id, tooth_number, tooth_face,
        procedure_code, procedure_name, notes
      ) VALUES (
        ${user.tenant_id}, ${data.odontogram_id}, ${data.tooth_number},
        ${data.tooth_face || null}, ${data.procedure_code},
        ${data.procedure_name}, ${data.notes || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getOdontograms(patient_id?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT o.*, p.name as patient_name
      FROM odontograms o
      JOIN patients p ON o.patient_id = p.id
      WHERE o.tenant_id = ${user.tenant_id}
      ${patient_id ? db`AND o.patient_id = ${patient_id}` : db``}
      AND o.deleted_at IS NULL
      ORDER BY o.created_at DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
