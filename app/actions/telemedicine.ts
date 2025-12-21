"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function createTelemedicineSession(data: {
  patient_id: string
  appointment_id?: string
  scheduled_start: string
  scheduled_end?: string
  recording_consent?: boolean
}) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    // Gerar room Daily.co
    const roomName = `atendebem-${user.id}-${Date.now()}`
    const roomUrl = `https://atendebem.daily.co/${roomName}`

    const result = await db`
      INSERT INTO telemedicine_sessions (
        user_id, patient_id, appointment_id,
        room_name, room_url, scheduled_start, scheduled_end,
        recording_consent, room_config
      ) VALUES (
        ${user.id}, ${data.patient_id},
        ${data.appointment_id || null}, ${roomName}, ${roomUrl},
        ${data.scheduled_start}, ${data.scheduled_end || null},
        ${data.recording_consent || false},
        ${JSON.stringify({ enable_chat: true, enable_recording: data.recording_consent })}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("[v0] Telemedicine session create error:", error)
    return { error: error.message }
  }
}

export async function startTelemedicineSession(id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    const result = await db`
      UPDATE telemedicine_sessions
      SET status = 'in_progress', actual_start = NOW(), updated_at = NOW()
      WHERE id = ${id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: "Sessão não encontrada" }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("[v0] Telemedicine start error:", error)
    return { error: error.message }
  }
}

export async function endTelemedicineSession(data: {
  session_id: string
  clinical_notes?: string
  prescriptions_issued?: string[]
  exams_requested?: string[]
  follow_up_required?: boolean
  connection_quality?: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    // Calcular duração
    const session = await db`SELECT actual_start FROM telemedicine_sessions WHERE id = ${data.session_id}`
    if (session.length === 0) return { error: "Sessão não encontrada" }

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
      WHERE id = ${data.session_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: "Sessão não encontrada" }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("[v0] Telemedicine end error:", error)
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
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = await getDb()

    const result = await db`
      SELECT t.*, p.name as patient_name, u.name as doctor_name
      FROM telemedicine_sessions t
      JOIN patients p ON t.patient_id = p.id
      JOIN users u ON t.user_id = u.id
      WHERE t.user_id = ${user.id}
      ${filters?.status ? db`AND t.status = ${filters.status}` : db``}
      ${filters?.patient_id ? db`AND t.patient_id = ${filters.patient_id}` : db``}
      ${filters?.start_date ? db`AND t.scheduled_start >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND t.scheduled_start <= ${filters.end_date}` : db``}
      ORDER BY t.scheduled_start DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] Telemedicine sessions error:", error)
    return { error: error.message, data: [] }
  }
}

export async function joinWaitingRoom(session_id: string, patient_id: string, notes?: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    const result = await db`
      INSERT INTO telemedicine_waiting_room (
        user_id, session_id, patient_id, pre_consultation_notes
      ) VALUES (
        ${user.id}, ${session_id}, ${patient_id}, ${notes || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("[v0] Join waiting room error:", error)
    return { error: error.message }
  }
}

export async function admitFromWaitingRoom(waiting_room_id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    const result = await db`
      UPDATE telemedicine_waiting_room
      SET status = 'admitted', admitted_at = NOW()
      WHERE id = ${waiting_room_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: "Entrada não encontrada" }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("[v0] Admit from waiting room error:", error)
    return { error: error.message }
  }
}

export async function getWaitingRoom(session_id?: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = await getDb()

    const result = await db`
      SELECT w.*, p.name as patient_name, s.room_url
      FROM telemedicine_waiting_room w
      JOIN patients p ON w.patient_id = p.id
      JOIN telemedicine_sessions s ON w.session_id = s.id
      WHERE w.user_id = ${user.id}
      ${session_id ? db`AND w.session_id = ${session_id}` : db``}
      AND w.status = 'waiting'
      ORDER BY w.joined_at
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] Get waiting room error:", error)
    return { error: error.message, data: [] }
  }
}
