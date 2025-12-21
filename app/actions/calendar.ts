'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
// import { syncToGoogleCalendar } from '@/lib/google-calendar' // TODO: Implementar

export async function createCalendarEvent(data: {
  title: string
  description?: string
  start_time: string
  end_time: string
  patient_id?: string
  event_type: string
  location?: string
  reminders?: any[]
  sync_google?: boolean
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Verificar conflitos
    const conflicts = await db.query(
      `SELECT * FROM check_calendar_conflicts($1, $2, $3)`,
      [user.id, data.start_time, data.end_time]
    )

    if (conflicts.rows.length > 0) {
      return {
        error: 'Conflito de agenda detectado',
        conflicts: conflicts.rows
      }
    }

    // Criar evento
    const result = await db`
      INSERT INTO calendar_events (
        tenant_id, user_id, patient_id, title, description,
        start_time, end_time, event_type, location, reminders, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id || null},
        ${data.title}, ${data.description || null}, ${data.start_time},
        ${data.end_time}, ${data.event_type}, ${data.location || null},
        ${data.reminders ? JSON.stringify(data.reminders) : '[]'}::jsonb,
        'scheduled'
      ) RETURNING *
    `

    // TODO: Sincronizar com Google Calendar se habilitado
    // if (data.sync_google) {
    //   await syncToGoogleCalendar(result[0])
    // }

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getCalendarEvents(filters?: {
  start_date?: string
  end_date?: string
  event_type?: string
  patient_id?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    let query = `
      SELECT e.*, p.name as patient_name, u.name as user_name
      FROM calendar_events e
      LEFT JOIN patients p ON e.patient_id = p.id
      JOIN users u ON e.user_id = u.id
      WHERE e.tenant_id = $1
    `
    const params: any[] = [user.tenant_id]
    let paramIndex = 2

    if (filters?.start_date) {
      query += ` AND e.start_time >= $${paramIndex}`
      params.push(filters.start_date)
      paramIndex++
    }

    if (filters?.end_date) {
      query += ` AND e.end_time <= $${paramIndex}`
      params.push(filters.end_date)
      paramIndex++
    }

    if (filters?.event_type) {
      query += ` AND e.event_type = $${paramIndex}`
      params.push(filters.event_type)
      paramIndex++
    }

    if (filters?.patient_id) {
      query += ` AND e.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    query += ` ORDER BY e.start_time ASC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateCalendarEvent(data: {
  event_id: string
  title?: string
  start_time?: string
  end_time?: string
  status?: string
  notes?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Se mudou horário, verificar conflitos
    if (data.start_time || data.end_time) {
      const current = await db`
        SELECT start_time, end_time FROM calendar_events WHERE id = ${data.event_id}
      `
      
      const newStart = data.start_time || current[0].start_time
      const newEnd = data.end_time || current[0].end_time

      const conflicts = await db.query(
        `SELECT * FROM check_calendar_conflicts($1, $2, $3, $4)`,
        [user.id, newStart, newEnd, data.event_id]
      )

      if (conflicts.rows.length > 0) {
        return {
          error: 'Conflito de agenda detectado',
          conflicts: conflicts.rows
        }
      }
    }

    const result = await db`
      UPDATE calendar_events
      SET 
        title = COALESCE(${data.title}, title),
        start_time = COALESCE(${data.start_time}, start_time),
        end_time = COALESCE(${data.end_time}, end_time),
        status = COALESCE(${data.status}, status),
        notes = COALESCE(${data.notes}, notes),
        updated_at = NOW()
      WHERE id = ${data.event_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteCalendarEvent(event_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    await db`
      DELETE FROM calendar_events
      WHERE id = ${event_id} AND tenant_id = ${user.tenant_id}
    `

    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getAgendaDay(date: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const startOfDay = `${date}T00:00:00Z`
    const endOfDay = `${date}T23:59:59Z`

    const result = await db`
      SELECT e.*, p.name as patient_name
      FROM calendar_events e
      LEFT JOIN patients p ON e.patient_id = p.id
      WHERE e.tenant_id = ${user.tenant_id}
        AND e.start_time >= ${startOfDay}
        AND e.start_time <= ${endOfDay}
      ORDER BY e.start_time ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
