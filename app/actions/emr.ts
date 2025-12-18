'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function getEMR(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT e.*, p.name as patient_name
      FROM electronic_medical_records e
      JOIN patients p ON e.patient_id = p.id
      WHERE e.patient_id = ${patient_id} AND e.tenant_id = ${user.tenant_id}
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateEMR(data: {
  patient_id: string
  allergies?: any[]
  active_problems?: any[]
  current_medications?: any[]
  immunizations?: any[]
  family_history?: any
  social_history?: any
  clinical_summary?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE electronic_medical_records
      SET 
        allergies = COALESCE(${data.allergies ? JSON.stringify(data.allergies) : null}::jsonb, allergies),
        active_problems = COALESCE(${data.active_problems ? JSON.stringify(data.active_problems) : null}::jsonb, active_problems),
        current_medications = COALESCE(${data.current_medications ? JSON.stringify(data.current_medications) : null}::jsonb, current_medications),
        immunizations = COALESCE(${data.immunizations ? JSON.stringify(data.immunizations) : null}::jsonb, immunizations),
        family_history = COALESCE(${data.family_history ? JSON.stringify(data.family_history) : null}::jsonb, family_history),
        social_history = COALESCE(${data.social_history ? JSON.stringify(data.social_history) : null}::jsonb, social_history),
        clinical_summary = COALESCE(${data.clinical_summary}, clinical_summary),
        last_updated_by = ${user.id},
        updated_at = NOW()
      WHERE patient_id = ${data.patient_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createClinicalNote(data: {
  patient_id: string
  appointment_id?: string
  note_type: string
  subject?: string
  content?: string
  soap_subjective?: string
  soap_objective?: string
  soap_assessment?: string
  soap_plan?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar EMR ID
    const emr = await db`
      SELECT id FROM electronic_medical_records
      WHERE patient_id = ${data.patient_id} AND tenant_id = ${user.tenant_id}
    `

    if (!emr.length) return { error: 'Prontuário não encontrado' }

    const result = await db`
      INSERT INTO clinical_notes (
        tenant_id, emr_id, appointment_id, user_id, note_type,
        subject, content, soap_subjective, soap_objective,
        soap_assessment, soap_plan, status
      ) VALUES (
        ${user.tenant_id}, ${emr[0].id}, ${data.appointment_id || null},
        ${user.id}, ${data.note_type}, ${data.subject || null},
        ${data.content || null}, ${data.soap_subjective || null},
        ${data.soap_objective || null}, ${data.soap_assessment || null},
        ${data.soap_plan || null}, 'draft'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getClinicalNotes(patient_id: string, limit: number = 50) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT n.*, u.name as author_name
      FROM clinical_notes n
      JOIN electronic_medical_records e ON n.emr_id = e.id
      JOIN users u ON n.user_id = u.id
      WHERE e.patient_id = ${patient_id} AND n.tenant_id = ${user.tenant_id}
      ORDER BY n.created_at DESC
      LIMIT ${limit}
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function signClinicalNote(note_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE clinical_notes
      SET status = 'signed', signed_at = NOW(), updated_at = NOW()
      WHERE id = ${note_id} AND user_id = ${user.id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function addProblem(data: {
  patient_id: string
  icd10_code?: string
  description: string
  problem_type: string
  severity?: string
  onset_date?: string
  notes?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar EMR ID
    const emr = await db`
      SELECT id FROM electronic_medical_records
      WHERE patient_id = ${data.patient_id} AND tenant_id = ${user.tenant_id}
    `

    if (!emr.length) return { error: 'Prontuário não encontrado' }

    const result = await db`
      INSERT INTO problem_list (
        emr_id, tenant_id, icd10_code, description, problem_type,
        severity, onset_date, notes, created_by, status
      ) VALUES (
        ${emr[0].id}, ${user.tenant_id}, ${data.icd10_code || null},
        ${data.description}, ${data.problem_type}, ${data.severity || null},
        ${data.onset_date || null}, ${data.notes || null}, ${user.id}, 'active'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getActiveProblems(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT p.*
      FROM problem_list p
      JOIN electronic_medical_records e ON p.emr_id = e.id
      WHERE e.patient_id = ${patient_id} 
        AND p.tenant_id = ${user.tenant_id}
        AND p.status = 'active'
      ORDER BY p.onset_date DESC NULLS LAST, p.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
