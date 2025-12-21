"use server"

import { getDb } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/session"

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

    const sql = await getDb()

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
          procedure_date,
          procedure_type
        )
        VALUES (
          ${appointmentId},
          ${user.id},
          ${proc.code},
          ${proc.friendlyName},
          ${data.patientName},
          ${data.patientCpf || null},
          NOW(),
          ${data.appointmentType || 'consulta'}
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

    const sql = await getDb()

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

    const sql = await getDb()

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

export async function updateAppointment(appointmentId: string, data: {
  patientName?: string
  diagnosis?: string
  treatmentPlan?: string
  observations?: string
  status?: string
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

    const sql = await getDb()

    await sql`
      UPDATE appointments
      SET 
        patient_name = COALESCE(${data.patientName}, patient_name),
        diagnosis = COALESCE(${data.diagnosis}, diagnosis),
        treatment_plan = COALESCE(${data.treatmentPlan}, treatment_plan),
        observations = COALESCE(${data.observations}, observations),
        status = COALESCE(${data.status}, status),
        updated_at = NOW()
      WHERE id = ${appointmentId} AND user_id = ${user.id}
    `

    return { success: true }
  } catch (error) {
    console.error("[v0] Error updating appointment:", error)
    return { error: "Erro ao atualizar atendimento" }
  }
}

export async function deleteAppointment(appointmentId: string) {
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

    const sql = await getDb()

    // Soft delete - apenas marca como arquivado
    await sql`
      UPDATE appointments
      SET status = 'archived', updated_at = NOW()
      WHERE id = ${appointmentId} AND user_id = ${user.id}
    `

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting appointment:", error)
    return { error: "Erro ao excluir atendimento" }
  }
}

export async function duplicateAppointment(appointmentId: string) {
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

    const sql = await getDb()

    // Buscar atendimento original
    const [original] = await sql`
      SELECT * FROM appointments
      WHERE id = ${appointmentId} AND user_id = ${user.id}
    `

    if (!original) {
      return { error: "Atendimento não encontrado" }
    }

    // Criar cópia
    const [newAppointment] = await sql`
      INSERT INTO appointments (
        user_id, patient_name, patient_cpf, patient_age, patient_gender,
        appointment_type, specialty, main_complaint, clinical_history,
        physical_exam, diagnosis, treatment_plan, observations, status
      )
      VALUES (
        ${user.id},
        ${original.patient_name},
        ${original.patient_cpf},
        ${original.patient_age},
        ${original.patient_gender},
        ${original.appointment_type},
        ${original.specialty},
        ${original.main_complaint},
        ${original.clinical_history},
        ${original.physical_exam},
        ${original.diagnosis},
        ${original.treatment_plan},
        ${original.observations},
        'draft'
      )
      RETURNING id
    `

    // Copiar procedimentos
    const procedures = await sql`
      SELECT * FROM procedures
      WHERE appointment_id = ${appointmentId}
    `

    for (const proc of procedures) {
      await sql`
        INSERT INTO procedures (
          appointment_id, user_id, procedure_code, procedure_name,
          patient_name, patient_cpf, procedure_date
        )
        VALUES (
          ${newAppointment.id},
          ${user.id},
          ${proc.procedure_code},
          ${proc.procedure_name},
          ${original.patient_name},
          ${original.patient_cpf},
          NOW()
        )
      `
    }

    return { success: true, appointmentId: newAppointment.id }
  } catch (error) {
    console.error("[v0] Error duplicating appointment:", error)
    return { error: "Erro ao duplicar atendimento" }
  }
}

export async function searchAppointments(query: string, filters?: {
  startDate?: string
  endDate?: string
  appointmentType?: string
  status?: string
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

    const sql = await getDb()

    let appointments
    if (query) {
      appointments = await sql`
        SELECT 
          a.id,
          a.patient_name,
          a.patient_cpf,
          a.appointment_type,
          a.specialty,
          a.appointment_date,
          a.status,
          a.diagnosis,
          COUNT(p.id) as procedures_count
        FROM appointments a
        LEFT JOIN procedures p ON p.appointment_id = a.id
        WHERE a.user_id = ${user.id}
        AND a.status != 'archived'
        AND (
          a.patient_name ILIKE ${"%" + query + "%"}
          OR a.patient_cpf LIKE ${"%" + query + "%"}
          OR a.diagnosis ILIKE ${"%" + query + "%"}
        )
        GROUP BY a.id
        ORDER BY a.appointment_date DESC
        LIMIT 100
      `
    } else {
      appointments = await sql`
        SELECT 
          a.id,
          a.patient_name,
          a.patient_cpf,
          a.appointment_type,
          a.specialty,
          a.appointment_date,
          a.status,
          a.diagnosis,
          COUNT(p.id) as procedures_count
        FROM appointments a
        LEFT JOIN procedures p ON p.appointment_id = a.id
        WHERE a.user_id = ${user.id}
        AND a.status != 'archived'
        GROUP BY a.id
        ORDER BY a.appointment_date DESC
        LIMIT 100
      `
    }

    return { success: true, appointments }
  } catch (error) {
    console.error("[v0] Error searching appointments:", error)
    return { error: "Erro ao buscar atendimentos" }
  }
}
