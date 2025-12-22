'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createCalendarEvent(data: {
  title: string
  description?: string
  start_time: string
  end_time: string
  patient_id?: string
  event_type: string
  location?: string
  reminders?: any[]
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Check for conflicts
    const conflicts = await db`
      SELECT id, title, start_time, end_time
      FROM appointments_schedule
      WHERE user_id = ${user.id}
      AND status != 'cancelled'
      AND (
        (appointment_date >= ${data.start_time} AND appointment_date < ${data.end_time})
        OR (appointment_date + (duration_minutes || ' minutes')::interval > ${data.start_time}
            AND appointment_date < ${data.end_time})
      )
    `

    if (conflicts.length > 0) {
      return { error: 'Conflito de agenda detectado', conflicts }
    }

    // Create as appointment schedule
    const result = await db`
      INSERT INTO appointments_schedule (
        user_id, patient_id, appointment_date, duration_minutes,
        appointment_type, status, notes
      ) VALUES (
        ${user.id}, ${data.patient_id || null}, ${data.start_time},
        ${Math.round((new Date(data.end_time).getTime() - new Date(data.start_time).getTime()) / 60000)},
        ${data.event_type}, 'scheduled', ${data.description || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar evento:', error)
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

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT
        s.id,
        s.appointment_date as start_time,
        s.appointment_date + (s.duration_minutes || ' minutes')::interval as end_time,
        s.appointment_type as event_type,
        s.appointment_type as title,
        s.notes as description,
        s.status,
        s.patient_id,
        p.full_name as patient_name
      FROM appointments_schedule s
      LEFT JOIN patients p ON s.patient_id = p.id
      WHERE s.user_id = ${user.id}
      ${filters?.start_date ? db`AND s.appointment_date >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND s.appointment_date <= ${filters.end_date}` : db``}
      ${filters?.event_type ? db`AND s.appointment_type = ${filters.event_type}` : db``}
      ${filters?.patient_id ? db`AND s.patient_id = ${filters.patient_id}` : db``}
      ORDER BY s.appointment_date ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar eventos:', error)
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

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE appointments_schedule
      SET
        appointment_date = COALESCE(${data.start_time || null}, appointment_date),
        appointment_type = COALESCE(${data.title || null}, appointment_type),
        status = COALESCE(${data.status || null}, status),
        notes = COALESCE(${data.notes || null}, notes),
        updated_at = NOW()
      WHERE id = ${data.event_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Evento nao encontrado' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar evento:', error)
    return { error: error.message }
  }
}

export async function deleteCalendarEvent(event_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    await db`
      UPDATE appointments_schedule
      SET status = 'cancelled', updated_at = NOW()
      WHERE id = ${event_id} AND user_id = ${user.id}
    `

    return { success: true }
  } catch (error: any) {
    console.error('Erro ao deletar evento:', error)
    return { error: error.message }
  }
}

export async function getAgendaDay(date: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT
        s.id,
        s.appointment_date as start_time,
        s.appointment_date + (s.duration_minutes || ' minutes')::interval as end_time,
        s.appointment_type as event_type,
        s.appointment_type as title,
        s.notes as description,
        s.status,
        s.patient_id,
        p.full_name as patient_name
      FROM appointments_schedule s
      LEFT JOIN patients p ON s.patient_id = p.id
      WHERE s.user_id = ${user.id}
      AND DATE(s.appointment_date) = ${date}::date
      ORDER BY s.appointment_date ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar agenda:', error)
    return { error: error.message }
  }
}
