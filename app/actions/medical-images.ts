"use server"

import { getDb } from "@/lib/db"
import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import { setUserContext } from "@/lib/db-init"

export async function createMedicalImage(data: {
  patient_id: string
  appointment_id?: string
  modality: string
  study_description: string
  body_part?: string
  study_date: string
  clinical_indication?: string
  dicom_files?: any[]
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    // Gerar Study Instance UID se não fornecido
    const studyUID = `1.2.826.0.1.${Date.now()}.${user.tenant_id.slice(0, 8)}`

    const result = await db`
      INSERT INTO medical_images (
        tenant_id, user_id, patient_id, appointment_id,
        study_instance_uid, modality, study_description, body_part,
        study_date, clinical_indication, dicom_files, total_images, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id}, ${data.appointment_id || null},
        ${studyUID}, ${data.modality}, ${data.study_description}, ${data.body_part || null},
        ${data.study_date}, ${data.clinical_indication || null},
        ${data.dicom_files ? JSON.stringify(data.dicom_files) : "[]"}::jsonb,
        ${data.dicom_files?.length || 0}, 'scheduled'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getMedicalImages(filters?: {
  patient_id?: string
  modality?: string
  status?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT i.*, p.name as patient_name
      FROM medical_images i
      JOIN patients p ON i.patient_id = p.id
      WHERE i.tenant_id = $1
    `
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.patient_id) {
      query += ` AND i.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    if (filters?.modality) {
      query += ` AND i.modality = $${paramIndex}`
      params.push(filters.modality)
      paramIndex++
    }

    if (filters?.status) {
      query += ` AND i.status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    query += ` ORDER BY i.study_date DESC, i.created_at DESC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function addImageReport(data: {
  image_id: string
  report: string
  findings?: string
  conclusion?: string
  radiologist_name?: string
  radiologist_crm?: string
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
      UPDATE medical_images
      SET 
        report = ${data.report},
        findings = COALESCE(${data.findings}, findings),
        conclusion = COALESCE(${data.conclusion}, conclusion),
        radiologist_name = COALESCE(${data.radiologist_name}, radiologist_name),
        radiologist_crm = COALESCE(${data.radiologist_crm}, radiologist_crm),
        status = 'reported',
        reported_at = NOW(),
        updated_at = NOW()
      WHERE id = ${data.image_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createImageAnnotation(data: {
  image_id: string
  annotation_type: string
  coordinates: any
  label?: string
  measurement_value?: number
  measurement_unit?: string
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
      INSERT INTO image_annotations (
        image_id, user_id, annotation_type, coordinates,
        label, measurement_value, measurement_unit
      ) VALUES (
        ${data.image_id}, ${user.id}, ${data.annotation_type},
        ${JSON.stringify(data.coordinates)}::jsonb,
        ${data.label || null}, ${data.measurement_value || null},
        ${data.measurement_unit || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteMedicalImage(image_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      DELETE FROM medical_images
      WHERE id = ${image_id} AND tenant_id = ${user.tenant_id}
      RETURNING id
    `

    if (result.length === 0) return { error: "Imagem não encontrada" }
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
