"use server"

import { sql } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"

export async function createAppointment(data: {
  patientName: string
  patientCpf?: string
  patientAge?: number
  patientGender?: string
  appointmentType: string
  context: string
  urgency: string
  procedures: Array<{
    code: string
    friendlyName: string
    laterality?: string
    location?: string
  }>
  observations?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Token inválido" }
    }

    // Criar registro de atendimento
    const result = await sql`
      INSERT INTO appointments (
        user_id, 
        patient_name, 
        patient_cpf,
        patient_age,
        patient_gender,
        appointment_type, 
        specialty,
        appointment_date,
        status
      )
      VALUES (
        ${user.id},
        ${data.patientName},
        ${data.patientCpf || null},
        ${data.patientAge || null},
        ${data.patientGender || null},
        ${data.appointmentType},
        ${user.specialty || "Clínica Geral"},
        NOW(),
        'completed'
      )
      RETURNING id
    `

    const appointmentId = result[0].id

    // Criar registros de procedimentos
    for (const proc of data.procedures) {
      await sql`
        INSERT INTO procedures (
          appointment_id,
          user_id,
          procedure_code,
          procedure_name,
          patient_name,
          patient_cpf,
          procedure_date
        )
        VALUES (
          ${appointmentId},
          ${user.id},
          ${proc.code},
          ${proc.friendlyName},
          ${data.patientName},
          ${data.patientCpf || null},
          NOW()
        )
      `
    }

    // Registrar auditoria
    await sql`
      INSERT INTO audit_logs (
        user_id,
        entity_type,
        entity_id,
        action,
        details
      )
      VALUES (
        ${user.id},
        'appointment',
        ${appointmentId},
        'create',
        ${JSON.stringify({ appointmentType: data.appointmentType, proceduresCount: data.procedures.length })}
      )
    `

    return { success: true, appointmentId }
  } catch (error) {
    console.error("[v0] Error creating appointment:", error)
    return { error: "Erro ao criar atendimento" }
  }
}

export async function getAppointmentHistory(limit = 50, offset = 0) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Token inválido" }
    }

    const appointments = await sql`
      SELECT 
        a.id,
        a.patient_name,
        a.appointment_type,
        a.specialty,
        a.appointment_date,
        a.status,
        COUNT(p.id) as procedures_count
      FROM appointments a
      LEFT JOIN procedures p ON p.appointment_id = a.id
      WHERE a.user_id = ${user.id}
      GROUP BY a.id
      ORDER BY a.appointment_date DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    return { success: true, appointments }
  } catch (error) {
    console.error("[v0] Error fetching appointments:", error)
    return { error: "Erro ao buscar histórico" }
  }
}

export async function getAppointmentDetails(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Token inválido" }
    }

    const [appointment] = await sql`
      SELECT * FROM appointments
      WHERE id = ${appointmentId} AND user_id = ${user.id}
    `

    if (!appointment) {
      return { error: "Atendimento não encontrado" }
    }

    const procedures = await sql`
      SELECT * FROM procedures
      WHERE appointment_id = ${appointmentId}
      ORDER BY created_at ASC
    `

    return { success: true, appointment, procedures }
  } catch (error) {
    console.error("[v0] Error fetching appointment details:", error)
    return { error: "Erro ao buscar detalhes" }
  }
}
