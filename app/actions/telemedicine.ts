'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createTelemedicineSession(data: {
  patient_id: string
  appointment_id?: string
  scheduled_start: string
  scheduled_end?: string
  recording_consent?: boolean
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Gerar room Daily.co
    const roomName = `atendebem-${user.tenant_id}-${Date.now()}`
    const roomUrl = `https://atendebem.daily.co/${roomName}`

    const result = await db`
      INSERT INTO telemedicine_sessions (
        tenant_id, user_id, patient_id, appointment_id,
        room_name, room_url, scheduled_start, scheduled_end,
        recording_consent, room_config
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id},
        ${data.appointment_id || null}, ${roomName}, ${roomUrl},
        ${data.scheduled_start}, ${data.scheduled_end || null},
        ${data.recording_consent || false},
        ${JSON.stringify({ enable_chat: true, enable_recording: data.recording_consent })}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function startTelemedicineSession(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE telemedicine_sessions
      SET status = 'in_progress', actual_start = NOW(), updated_at = NOW()
      WHERE id = ${id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Sessão não encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function endTelemedicineSession(id: string, data: {
  clinical_notes?: string
  prescriptions_issued?: string[]
  exams_requested?: string[]
  follow_up_required?: boolean
  connection_quality?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Calcular duração
    const session = await db`SELECT actual_start FROM telemedicine_sessions WHERE id = ${id}`
    if (session.length === 0) return { error: 'Sessão não encontrada' }

    const duration = session[0].actual_start 
      ? Math.round((new Date().getTime() - new Date(session[0].actual_start).getTime()) / 60000)
      : null

    const result = await db`
      UPDATE telemedicine_sessions
      SET 
        status = 'completed',
        actual_end = NOW(),
        duration_minutes = ${duration},
        clinical_notes = ${data.clinical_notes || null},
        prescriptions_issued = ${data.prescriptions_issued || []},
        exams_requested = ${data.exams_requested || []},
        follow_up_required = ${data.follow_up_required || false},
        connection_quality = ${data.connection_quality || null},
        updated_at = NOW()
      WHERE id = ${id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Sessão não encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getTelemedicineSessions(filters?: {
  status?: string
  patient_id?: string
  start_date?: string
  end_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT t.*, p.name as patient_name, u.name as doctor_name
      FROM telemedicine_sessions t
      JOIN patients p ON t.patient_id = p.id
      JOIN users u ON t.user_id = u.id
      WHERE t.tenant_id = $1
    `
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.status) {
      query += ` AND t.status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    if (filters?.patient_id) {
      query += ` AND t.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    if (filters?.start_date) {
      query += ` AND t.scheduled_start >= $${paramIndex}`
      params.push(filters.start_date)
      paramIndex++
    }

    if (filters?.end_date) {
      query += ` AND t.scheduled_start <= $${paramIndex}`
      params.push(filters.end_date)
      paramIndex++
    }

    query += ` ORDER BY t.scheduled_start DESC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function joinWaitingRoom(session_id: string, patient_id: string, notes?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      INSERT INTO telemedicine_waiting_room (
        tenant_id, session_id, patient_id, pre_consultation_notes
      ) VALUES (
        ${user.tenant_id}, ${session_id}, ${patient_id}, ${notes || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function admitFromWaitingRoom(waiting_room_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE telemedicine_waiting_room
      SET status = 'admitted', admitted_at = NOW()
      WHERE id = ${waiting_room_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Entrada não encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getWaitingRoom(session_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT w.*, p.name as patient_name
      FROM telemedicine_waiting_room w
      JOIN patients p ON w.patient_id = p.id
      WHERE w.session_id = ${session_id}
      AND w.tenant_id = ${user.tenant_id}
      AND w.status = 'waiting'
      ORDER BY w.joined_at
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
