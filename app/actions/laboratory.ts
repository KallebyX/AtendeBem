'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createLabOrder(data: {
  patient_id: string
  appointment_id?: string
  lab_name?: string
  exams: Array<{
    exam_code?: string
    exam_name: string
    exam_type?: string
    urgency?: string
    notes?: string
  }>
  clinical_indication?: string
  expected_result_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Create exams using patient_exams table
    const createdExams = []
    for (const exam of data.exams) {
      // Build observations from clinical_indication, urgency and notes
      const observations = [
        data.clinical_indication,
        exam.urgency ? `Urgência: ${exam.urgency}` : null,
        exam.notes
      ].filter(Boolean).join(' | ') || null

      const result = await db`
        INSERT INTO patient_exams (
          patient_id, user_id, appointment_id, exam_type,
          exam_name, exam_date, laboratory, requested_by, status, observations
        ) VALUES (
          ${data.patient_id}, ${user.id}, ${data.appointment_id || null},
          ${exam.exam_type || 'laboratorio'}, ${exam.exam_name},
          ${new Date().toISOString().split('T')[0]}, ${data.lab_name || 'A definir'},
          ${user.name}, 'requested', ${observations}
        ) RETURNING *
      `
      createdExams.push(result[0])
    }

    return { success: true, data: createdExams }
  } catch (error: any) {
    console.error('Erro ao criar pedido lab:', error)
    return { error: error.message }
  }
}

export async function getLabOrders(filters?: { patient_id?: string; status?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT e.*, p.full_name as patient_name
      FROM patient_exams e
      JOIN patients p ON e.patient_id = p.id
      WHERE e.user_id = ${user.id}
      ${filters?.patient_id ? db`AND e.patient_id = ${filters.patient_id}` : db``}
      ${filters?.status ? db`AND e.status = ${filters.status}` : db``}
      ORDER BY e.exam_date DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar pedidos lab:', error)
    return { error: error.message }
  }
}

export async function updateExamResult(data: {
  exam_id: string
  result_summary?: string
  result_file_url?: string
  status?: string
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
      UPDATE patient_exams
      SET
        result_summary = COALESCE(${data.result_summary || null}, result_summary),
        result_file_url = COALESCE(${data.result_file_url || null}, result_file_url),
        result_date = CASE WHEN ${data.result_summary} IS NOT NULL THEN CURRENT_DATE ELSE result_date END,
        status = COALESCE(${data.status || null}, 'completed'),
        updated_at = NOW()
      WHERE id = ${data.exam_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Exame nao encontrado' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar resultado:', error)
    return { error: error.message }
  }
}

export async function getLabTemplates() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // Return common lab exam templates
    const templates = [
      { id: '1', name: 'Hemograma Completo', exam_type: 'hematologia', is_public: true },
      { id: '2', name: 'Glicemia de Jejum', exam_type: 'bioquimica', is_public: true },
      { id: '3', name: 'Colesterol Total e Fracoes', exam_type: 'bioquimica', is_public: true },
      { id: '4', name: 'TSH e T4 Livre', exam_type: 'hormonal', is_public: true },
      { id: '5', name: 'Ureia e Creatinina', exam_type: 'bioquimica', is_public: true },
      { id: '6', name: 'TGO e TGP', exam_type: 'bioquimica', is_public: true },
      { id: '7', name: 'Urina Tipo I (EAS)', exam_type: 'urinario', is_public: true },
      { id: '8', name: 'Vitamina D', exam_type: 'bioquimica', is_public: true },
      { id: '9', name: 'Vitamina B12', exam_type: 'bioquimica', is_public: true },
      { id: '10', name: 'Ferritina', exam_type: 'hematologia', is_public: true }
    ]

    return { success: true, data: templates }
  } catch (error: any) {
    console.error('Erro ao buscar templates:', error)
    return { error: error.message }
  }
}

export async function getExamsByPatient(patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT * FROM patient_exams
      WHERE patient_id = ${patient_id} AND user_id = ${user.id}
      ORDER BY exam_date DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar exames do paciente:', error)
    return { error: error.message }
  }
}
