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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO odontograms (
        user_id, patient_id, appointment_id, teeth_data, clinical_notes
      ) VALUES (
        ${user.id}, ${data.patient_id},
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE odontograms SET
        teeth_data = COALESCE(${data.teeth_data ? JSON.stringify(data.teeth_data) : null}, teeth_data),
        clinical_notes = COALESCE(${data.clinical_notes || null}, clinical_notes),
        treatment_plan = COALESCE(${data.treatment_plan || null}, treatment_plan),
        updated_at = NOW()
      WHERE id = ${id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: "Odontograma nao encontrado" }
    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getOdontogramsByPatient(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT o.*, p.full_name as patient_name
      FROM odontograms o
      JOIN patients p ON o.patient_id = p.id
      WHERE o.patient_id = ${patient_id}
      AND o.user_id = ${user.id}
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO odontogram_procedures (
        user_id, odontogram_id, tooth_number, tooth_face,
        procedure_code, procedure_name, notes
      ) VALUES (
        ${user.id}, ${data.odontogram_id}, ${data.tooth_number},
        ${data.tooth_face || null}, ${data.procedure_code},
        ${data.procedure_name}, ${data.notes || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getOdontogramProcedures(odontogram_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT * FROM odontogram_procedures
      WHERE odontogram_id = ${odontogram_id}
      AND user_id = ${user.id}
      ORDER BY created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getOdontograms(patient_id?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = patient_id
      ? await db`
          SELECT o.*, p.full_name as patient_name
          FROM odontograms o
          JOIN patients p ON o.patient_id = p.id
          WHERE o.user_id = ${user.id}
          AND o.patient_id = ${patient_id}
          ORDER BY o.created_at DESC
          LIMIT 100
        `
      : await db`
          SELECT o.*, p.full_name as patient_name
          FROM odontograms o
          JOIN patients p ON o.patient_id = p.id
          WHERE o.user_id = ${user.id}
          ORDER BY o.created_at DESC
          LIMIT 100
        `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getOdontogramById(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT o.*, p.full_name as patient_name
      FROM odontograms o
      JOIN patients p ON o.patient_id = p.id
      WHERE o.id = ${id} AND o.user_id = ${user.id}
    `

    if (result.length === 0) return { error: "Odontograma nao encontrado" }
    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}
