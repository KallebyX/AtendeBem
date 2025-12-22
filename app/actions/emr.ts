'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

// Get comprehensive EMR data for a patient
export async function getEMR(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get patient basic info
    const patient = await db`
      SELECT * FROM patients
      WHERE id = ${patient_id} AND user_id = ${user.id}
    `

    if (patient.length === 0) {
      return { error: 'Paciente nao encontrado' }
    }

    // Get recent appointments (clinical history)
    const appointments = await db`
      SELECT * FROM appointments
      WHERE user_id = ${user.id}
      AND patient_cpf = ${patient[0].cpf}
      ORDER BY appointment_date DESC
      LIMIT 20
    `

    // Get medical history (diagnoses)
    const medicalHistory = await db`
      SELECT * FROM patient_medical_history
      WHERE patient_id = ${patient_id}
      ORDER BY diagnosis_date DESC
    `

    // Get exams
    const exams = await db`
      SELECT * FROM patient_exams
      WHERE patient_id = ${patient_id} AND user_id = ${user.id}
      ORDER BY exam_date DESC
      LIMIT 50
    `

    // Get prescriptions
    const prescriptions = await db`
      SELECT * FROM medical_prescriptions
      WHERE patient_id = ${patient_id} AND user_id = ${user.id}
      ORDER BY prescription_date DESC
      LIMIT 50
    `

    // Build EMR response
    const emr = {
      patient: patient[0],
      allergies: patient[0].allergies ? patient[0].allergies.split(',').map((a: string) => a.trim()) : [],
      chronic_conditions: patient[0].chronic_conditions ? patient[0].chronic_conditions.split(',').map((c: string) => c.trim()) : [],
      blood_type: patient[0].blood_type,
      appointments,
      medical_history: medicalHistory,
      exams,
      prescriptions,
      last_visit: appointments.length > 0 ? appointments[0].appointment_date : null
    }

    return { success: true, data: emr }
  } catch (error: any) {
    console.error('Erro ao buscar prontuario:', error)
    return { error: error.message }
  }
}

// Update patient medical info
export async function updateEMR(data: {
  patient_id: string
  allergies?: string[]
  chronic_conditions?: string[]
  blood_type?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE patients
      SET
        allergies = COALESCE(${data.allergies?.join(', ') || null}, allergies),
        chronic_conditions = COALESCE(${data.chronic_conditions?.join(', ') || null}, chronic_conditions),
        blood_type = COALESCE(${data.blood_type || null}, blood_type),
        emergency_contact_name = COALESCE(${data.emergency_contact_name || null}, emergency_contact_name),
        emergency_contact_phone = COALESCE(${data.emergency_contact_phone || null}, emergency_contact_phone),
        updated_at = NOW()
      WHERE id = ${data.patient_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) {
      return { error: 'Paciente nao encontrado' }
    }

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar prontuario:', error)
    return { error: error.message }
  }
}

// Add a new problem/diagnosis to patient history
export async function addProblem(data: {
  patient_id: string
  appointment_id?: string
  icd10_code?: string
  icd11_code?: string
  description: string
  diagnosis_date?: string
  status?: string
  notes?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO patient_medical_history (
        patient_id, appointment_id, cid10_code, cid11_code,
        diagnosis, diagnosis_date, status, notes, created_by
      ) VALUES (
        ${data.patient_id}, ${data.appointment_id || null},
        ${data.icd10_code || null}, ${data.icd11_code || null},
        ${data.description}, ${data.diagnosis_date || new Date().toISOString().split('T')[0]},
        ${data.status || 'active'}, ${data.notes || null}, ${user.id}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao adicionar problema:', error)
    return { error: error.message }
  }
}

// Get active problems for a patient
export async function getActiveProblems(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT h.*, u.name as created_by_name
      FROM patient_medical_history h
      LEFT JOIN users u ON h.created_by = u.id
      WHERE h.patient_id = ${patient_id}
      AND h.status = 'active'
      ORDER BY h.diagnosis_date DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar problemas ativos:', error)
    return { error: error.message }
  }
}

// Update problem status
export async function updateProblemStatus(problem_id: string, status: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE patient_medical_history
      SET status = ${status}
      WHERE id = ${problem_id} AND created_by = ${user.id}
      RETURNING *
    `

    if (result.length === 0) {
      return { error: 'Problema nao encontrado' }
    }

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar status do problema:', error)
    return { error: error.message }
  }
}

// Get clinical notes (from appointments)
export async function getClinicalNotes(patient_id: string, limit: number = 50) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get patient CPF first
    const patient = await db`
      SELECT cpf FROM patients WHERE id = ${patient_id} AND user_id = ${user.id}
    `

    if (patient.length === 0) {
      return { error: 'Paciente nao encontrado' }
    }

    // Get appointments as clinical notes
    const result = await db`
      SELECT
        id,
        appointment_date as note_date,
        appointment_type as note_type,
        main_complaint,
        clinical_history,
        physical_exam,
        diagnosis,
        treatment_plan,
        observations,
        status
      FROM appointments
      WHERE user_id = ${user.id} AND patient_cpf = ${patient[0].cpf}
      ORDER BY appointment_date DESC
      LIMIT ${limit}
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar evolucoes:', error)
    return { error: error.message }
  }
}

// Create a clinical note (creates an appointment record)
export async function createClinicalNote(data: {
  patient_id: string
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

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get patient info
    const patient = await db`
      SELECT full_name, cpf FROM patients
      WHERE id = ${data.patient_id} AND user_id = ${user.id}
    `

    if (patient.length === 0) {
      return { error: 'Paciente nao encontrado' }
    }

    // Build content from SOAP notes
    const content = [
      data.soap_subjective ? `S: ${data.soap_subjective}` : '',
      data.soap_objective ? `O: ${data.soap_objective}` : '',
      data.soap_assessment ? `A: ${data.soap_assessment}` : '',
      data.soap_plan ? `P: ${data.soap_plan}` : '',
      data.content || ''
    ].filter(Boolean).join('\n\n')

    // Create appointment record as clinical note
    const result = await db`
      INSERT INTO appointments (
        user_id, patient_name, patient_cpf,
        appointment_date, appointment_type, specialty,
        main_complaint, diagnosis, treatment_plan, observations, status
      ) VALUES (
        ${user.id}, ${patient[0].full_name}, ${patient[0].cpf},
        NOW(), ${data.note_type}, ${user.specialty},
        ${data.subject || null}, ${data.soap_assessment || null},
        ${data.soap_plan || null}, ${content}, 'completed'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar evolucao:', error)
    return { error: error.message }
  }
}

// Get patient timeline (all events)
export async function getPatientTimeline(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get patient
    const patient = await db`
      SELECT * FROM patients WHERE id = ${patient_id} AND user_id = ${user.id}
    `

    if (patient.length === 0) {
      return { error: 'Paciente nao encontrado' }
    }

    // Appointments
    const appointments = await db`
      SELECT
        id, 'appointment' as event_type, appointment_date as event_date,
        appointment_type as title, diagnosis as description
      FROM appointments
      WHERE user_id = ${user.id} AND patient_cpf = ${patient[0].cpf}
    `

    // Exams
    const exams = await db`
      SELECT
        id, 'exam' as event_type, exam_date as event_date,
        exam_name as title, result_summary as description
      FROM patient_exams
      WHERE patient_id = ${patient_id} AND user_id = ${user.id}
    `

    // Diagnoses
    const diagnoses = await db`
      SELECT
        id, 'diagnosis' as event_type, diagnosis_date as event_date,
        diagnosis as title, notes as description
      FROM patient_medical_history
      WHERE patient_id = ${patient_id}
    `

    // Combine and sort
    const timeline = [...appointments, ...exams, ...diagnoses]
      .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())

    return { success: true, data: timeline }
  } catch (error: any) {
    console.error('Erro ao buscar timeline:', error)
    return { error: error.message }
  }
}
