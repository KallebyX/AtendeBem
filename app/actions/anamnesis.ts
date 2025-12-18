'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export interface Anamnesis {
  id: string
  tenant_id: string
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
  specialty: string
  template_id?: string
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
      INSERT INTO anamnesis (
        tenant_id, user_id, patient_id, appointment_id, specialty, template_id, current_step
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id}, 
        ${data.appointment_id || null}, ${data.specialty}, 
        ${data.template_id || null}, 1
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar anamnese:', error)
    return { error: error.message }
  }
}

export async function updateAnamnesisStep(id: string, step: number, data: any) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const updates: any = {
      current_step: step,
      last_autosave: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Step 1: Identificação
    if (step === 1) updates.identification = JSON.stringify(data.identification || {})

    // Step 2: Queixa Principal
    if (step === 2) {
      updates.chief_complaint = data.chief_complaint
      updates.chief_complaint_duration = data.chief_complaint_duration
      updates.chief_complaint_severity = data.chief_complaint_severity
    }

    // Step 3: HDA
    if (step === 3) {
      updates.history_present_illness = data.history_present_illness
      updates.symptom_onset = data.symptom_onset
      updates.symptom_progression = data.symptom_progression
      updates.associated_symptoms = data.associated_symptoms
      updates.aggravating_factors = data.aggravating_factors
      updates.relieving_factors = data.relieving_factors
    }

    // Step 4: Antecedentes
    if (step === 4) {
      updates.past_medical_history = JSON.stringify(data.past_medical_history || {})
      updates.family_history = JSON.stringify(data.family_history || {})
      updates.social_history = JSON.stringify(data.social_history || {})
    }

    // Step 5: Revisão de Sistemas
    if (step === 5) {
      updates.systems_review = JSON.stringify(data.systems_review || {})
    }

    // Step 6: Exame Físico
    if (step === 6) {
      updates.physical_examination = JSON.stringify(data.physical_examination || {})
    }

    // Step 7: Conduta
    if (step === 7) {
      updates.assessment = data.assessment
      updates.plan = data.plan
      updates.diagnostic_hypothesis = data.diagnostic_hypothesis
      updates.complementary_exams = data.complementary_exams
      updates.prescriptions = data.prescriptions
      updates.referrals = data.referrals
      updates.follow_up = data.follow_up
      updates.is_completed = true
      updates.completed_at = new Date().toISOString()
    }

    const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`).join(', ')
    const values = [id, ...Object.values(updates)]
    
    const result = await db.query(
      `UPDATE anamnesis SET ${setClauses} WHERE id = $1 AND tenant_id = '${user.tenant_id}' RETURNING *`,
      values
    )

    if (result.rows.length === 0) return { error: 'Anamnese não encontrada' }
    return { success: true, data: result.rows[0] }
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
    const db = getDb()

    const result = await db`
      SELECT a.*, p.name as patient_name
      FROM anamnesis a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.patient_id = ${patient_id}
      AND a.tenant_id = ${user.tenant_id}
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
    const db = getDb()

    const result = await db`
      SELECT a.*, p.name as patient_name
      FROM anamnesis a
      JOIN patients p ON a.patient_id = p.id
      WHERE a.id = ${id}
      AND a.tenant_id = ${user.tenant_id}
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
    const db = getDb()

    let query = `
      SELECT * FROM anamnesis_templates
      WHERE (is_public = true OR tenant_id = $1)
      AND is_active = true
    `
    const params = [user.tenant_id]

    if (specialty) {
      query += ` AND specialty = $2`
      params.push(specialty)
    }

    query += ` ORDER BY is_public DESC, name`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
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
    const db = getDb()

    const result = await db`
      UPDATE anamnesis 
      SET deleted_at = NOW()
      WHERE id = ${id}
      AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Anamnese não encontrada' }
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao deletar anamnese:', error)
    return { error: error.message }
  }
}
