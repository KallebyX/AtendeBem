'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export interface Anamnesis {
  id: string
  user_id: string
  patient_id: string
  appointment_id?: string
  identification: any
  chief_complaint: string
  chief_complaint_duration: string
  chief_complaint_severity: string
  history_present_illness: string
  symptom_onset: string
  symptom_progression: string
  associated_symptoms: string[]
  aggravating_factors: string[]
  relieving_factors: string[]
  past_medical_history: any
  family_history: any
  social_history: any
  systems_review: any
  physical_examination: any
  assessment: string
  plan: string
  diagnostic_hypothesis: string[]
  complementary_exams: string[]
  prescriptions: string[]
  referrals: string[]
  follow_up: string
  specialty: string
  template_id?: string
  current_step: number
  is_completed: boolean
  completed_at?: string
  last_autosave: string
  created_at: string
  updated_at: string
}

export async function createAnamnesis(data: {
  patient_id: string
  appointment_id?: string
  specialty?: string
  template_id?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO anamnesis (
        user_id, patient_id, appointment_id, specialty, template_id, current_step
      ) VALUES (
        ${user.id}, ${data.patient_id},
        ${data.appointment_id || null}, ${data.specialty || 'Clínica Geral'},
        ${data.template_id || null}, 1
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar anamnese:', error)
    return { error: error.message }
  }
}

export async function updateAnamnesisStep(data: {
  anamnesis_id: string
  step: number
  data: any
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const stepData = data.data
    const step = data.step

    // Build update fields based on step
    let updateFields: any = {
      current_step: step,
      last_autosave: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (step === 1) {
      updateFields.identification = JSON.stringify(stepData.identification || {})
    }

    if (step === 2) {
      updateFields.chief_complaint = stepData.chief_complaint || null
      updateFields.chief_complaint_duration = stepData.complaint_duration || null
    }

    if (step === 3) {
      updateFields.history_present_illness = stepData.history_present_illness || null
      updateFields.associated_symptoms = stepData.associated_symptoms || []
    }

    if (step === 4) {
      updateFields.past_medical_history = JSON.stringify(stepData.past_medical_history || {})
      updateFields.family_history = JSON.stringify(stepData.family_history || {})
      updateFields.social_history = JSON.stringify(stepData.social_history || {})
    }

    if (step === 5) {
      updateFields.systems_review = JSON.stringify(stepData.systems_review || {})
    }

    if (step === 6) {
      updateFields.physical_examination = JSON.stringify(stepData.physical_examination || {})
    }

    if (step === 7) {
      updateFields.assessment = stepData.assessment || null
      updateFields.plan = stepData.treatment_plan || null
      updateFields.diagnostic_hypothesis = stepData.diagnostic_hypothesis || []
      updateFields.prescriptions = stepData.prescriptions ? [stepData.prescriptions] : []
      updateFields.is_completed = true
      updateFields.completed_at = new Date().toISOString()
    }

    const result = await db`
      UPDATE anamnesis
      SET
        current_step = ${updateFields.current_step},
        last_autosave = ${updateFields.last_autosave},
        updated_at = ${updateFields.updated_at},
        identification = COALESCE(${updateFields.identification || null}::jsonb, identification),
        chief_complaint = COALESCE(${updateFields.chief_complaint || null}, chief_complaint),
        chief_complaint_duration = COALESCE(${updateFields.chief_complaint_duration || null}, chief_complaint_duration),
        history_present_illness = COALESCE(${updateFields.history_present_illness || null}, history_present_illness),
        associated_symptoms = COALESCE(${updateFields.associated_symptoms || null}, associated_symptoms),
        past_medical_history = COALESCE(${updateFields.past_medical_history || null}::jsonb, past_medical_history),
        family_history = COALESCE(${updateFields.family_history || null}::jsonb, family_history),
        social_history = COALESCE(${updateFields.social_history || null}::jsonb, social_history),
        systems_review = COALESCE(${updateFields.systems_review || null}::jsonb, systems_review),
        physical_examination = COALESCE(${updateFields.physical_examination || null}::jsonb, physical_examination),
        assessment = COALESCE(${updateFields.assessment || null}, assessment),
        plan = COALESCE(${updateFields.plan || null}, plan),
        diagnostic_hypothesis = COALESCE(${updateFields.diagnostic_hypothesis || null}, diagnostic_hypothesis),
        prescriptions = COALESCE(${updateFields.prescriptions || null}, prescriptions),
        is_completed = ${updateFields.is_completed || false},
        completed_at = ${updateFields.completed_at || null}
      WHERE id = ${data.anamnesis_id}
      AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Anamnese não encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar anamnese:', error)
    return { error: error.message }
  }
}

export async function getAnamnesisByPatient(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT a.*, p.full_name as patient_name
      FROM anamnesis a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.patient_id = ${patient_id}
      AND a.user_id = ${user.id}
      ORDER BY a.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar anamneses:', error)
    return { error: error.message }
  }
}

export async function getAnamnesisById(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT a.*, p.full_name as patient_name
      FROM anamnesis a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.id = ${id}
      AND a.user_id = ${user.id}
    `

    if (result.length === 0) return { error: 'Anamnese não encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao buscar anamnese:', error)
    return { error: error.message }
  }
}

export async function getAnamnesisTemplates(specialty?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = specialty
      ? await db`
          SELECT * FROM anamnesis_templates
          WHERE (is_public = true OR user_id = ${user.id})
          AND is_active = true
          AND specialty = ${specialty}
          ORDER BY is_public DESC, name
        `
      : await db`
          SELECT * FROM anamnesis_templates
          WHERE (is_public = true OR user_id = ${user.id})
          AND is_active = true
          ORDER BY is_public DESC, name
        `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar templates:', error)
    return { error: error.message }
  }
}

export async function deleteAnamnesis(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE anamnesis
      SET deleted_at = NOW()
      WHERE id = ${id}
      AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Anamnese não encontrada' }
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao deletar anamnese:', error)
    return { error: error.message }
  }
}
