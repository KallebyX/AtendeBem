'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createLabOrder(data: {
  patient_id: string
  appointment_id?: string
  lab_name: string
  exams: Array<{ exam_code?: string; exam_name: string; exam_type?: string }>
  clinical_indication?: string
  expected_result_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Gerar número do pedido
    const count = await db`SELECT COUNT(*) FROM lab_orders WHERE tenant_id = ${user.tenant_id}`
    const orderNumber = `LAB-${user.tenant_id.slice(0, 8)}-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    // Criar pedido
    const order = await db`
      INSERT INTO lab_orders (
        tenant_id, user_id, patient_id, appointment_id, order_number,
        lab_name, clinical_indication, expected_result_date, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id}, ${data.appointment_id || null},
        ${orderNumber}, ${data.lab_name}, ${data.clinical_indication || null},
        ${data.expected_result_date || null}, 'pending'
      ) RETURNING *
    `

    // Criar exames
    for (const exam of data.exams) {
      await db`
        INSERT INTO lab_exams (
          order_id, tenant_id, exam_code, exam_name, exam_type, status
        ) VALUES (
          ${order[0].id}, ${user.tenant_id}, ${exam.exam_code || null},
          ${exam.exam_name}, ${exam.exam_type || null}, 'pending'
        )
      `
    }

    return { success: true, data: order[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getLabOrders(filters?: { patient_id?: string; status?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT o.*, p.name as patient_name, 
        COUNT(e.id) as exams_count,
        COUNT(CASE WHEN e.status = 'completed' THEN 1 END) as completed_exams
      FROM lab_orders o
      JOIN patients p ON o.patient_id = p.id
      LEFT JOIN lab_exams e ON o.id = e.order_id
      WHERE o.tenant_id = $1
    `
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.patient_id) {
      query += ` AND o.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    if (filters?.status) {
      query += ` AND o.status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    query += ` GROUP BY o.id, p.name ORDER BY o.created_at DESC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateExamResult(data: {
  exam_id: string
  result_value?: string
  result_text?: string
  is_abnormal?: boolean
  result_file_url?: string
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
      UPDATE lab_exams
      SET 
        result_value = COALESCE(${data.result_value}, result_value),
        result_text = COALESCE(${data.result_text}, result_text),
        is_abnormal = COALESCE(${data.is_abnormal}, is_abnormal),
        result_file_url = COALESCE(${data.result_file_url}, result_file_url),
        status = 'completed',
        resulted_at = NOW(),
        updated_at = NOW()
      WHERE id = ${data.exam_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getLabTemplates() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT * FROM lab_templates
      WHERE (tenant_id = ${user.tenant_id} OR is_public = true)
        AND is_active = true
      ORDER BY is_public DESC, name ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
