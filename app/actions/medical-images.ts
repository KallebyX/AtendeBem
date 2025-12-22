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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const studyUID = `1.2.826.0.1.${Date.now()}.${user.id.slice(0, 8)}`

    const result = await db`
      INSERT INTO medical_images (
        user_id, patient_id, appointment_id,
        study_instance_uid, modality, study_description, body_part,
        study_date, clinical_indication, dicom_files, total_images, status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${data.appointment_id || null},
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT i.*, p.full_name as patient_name
      FROM medical_images i
      JOIN patients p ON i.patient_id = p.id
      WHERE i.user_id = ${user.id}
      ${filters?.patient_id ? db`AND i.patient_id = ${filters.patient_id}` : db``}
      ${filters?.modality ? db`AND i.modality = ${filters.modality}` : db``}
      ${filters?.status ? db`AND i.status = ${filters.status}` : db``}
      ORDER BY i.study_date DESC, i.created_at DESC
      LIMIT 100
    `

    return { success: true, data: result }
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

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
      WHERE id = ${data.image_id} AND user_id = ${user.id}
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
    const db = await getDb()

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
    const db = await getDb()

    const result = await db`
      DELETE FROM medical_images
      WHERE id = ${image_id} AND user_id = ${user.id}
      RETURNING id
    `

    if (result.length === 0) return { error: "Imagem não encontrada" }
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

// Alias for uploadMedicalImage (same as createMedicalImage)
export async function uploadMedicalImage(data: {
  patient_id: string
  appointment_id?: string
  modality: string
  study_description: string
  body_part?: string
  study_date: string
  clinical_indication?: string
  dicom_files?: any[]
  image_url?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const studyUID = `1.2.826.0.1.${Date.now()}.${user.id.slice(0, 8)}`

    const result = await db`
      INSERT INTO medical_images (
        user_id, patient_id, appointment_id,
        study_instance_uid, modality, study_description, body_part,
        study_date, clinical_indication, dicom_files, total_images, status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${data.appointment_id || null},
        ${studyUID}, ${data.modality}, ${data.study_description}, ${data.body_part || null},
        ${data.study_date}, ${data.clinical_indication || null},
        ${data.dicom_files ? JSON.stringify(data.dicom_files) : "[]"}::jsonb,
        ${data.dicom_files?.length || 1}, 'completed'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}
