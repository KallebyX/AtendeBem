"use server"

import { neon } from "@neondatabase/serverless"
import { verifySession } from "@/lib/auth"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

export async function getPatientsList() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.userId) {
    return { success: false, error: "Sessão inválida" }
  }

  try {
    const patients = await sql`
      SELECT 
        p.*,
        COUNT(DISTINCT a.id) as total_appointments,
        COUNT(DISTINCT pr.id) as total_prescriptions,
        MAX(a.appointment_date) as last_appointment
      FROM patients p
      LEFT JOIN appointments a ON a.user_id = p.user_id AND 
        (a.patient_cpf = p.cpf OR a.patient_name = p.full_name)
      LEFT JOIN medical_prescriptions pr ON pr.patient_id = p.id
      WHERE p.user_id = ${session.userId}
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `

    return { success: true, patients }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getPatientDetails(patientId: string) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.userId) {
    return { success: false, error: "Sessão inválida" }
  }

  try {
    // Dados do paciente
    const [patient] = await sql`
      SELECT * FROM patients 
      WHERE id = ${patientId} AND user_id = ${session.userId}
    `

    if (!patient) {
      return { success: false, error: "Paciente não encontrado" }
    }

    // Histórico de consultas
    const appointments = await sql`
      SELECT * FROM appointments 
      WHERE user_id = ${session.userId} 
      AND (patient_cpf = ${patient.cpf} OR patient_name = ${patient.full_name})
      ORDER BY appointment_date DESC
    `

    // Prescrições
    const prescriptions = await sql`
      SELECT * FROM medical_prescriptions 
      WHERE patient_id = ${patientId}
      ORDER BY prescription_date DESC
    `

    // Exames
    const exams = await sql`
      SELECT * FROM patient_exams 
      WHERE patient_id = ${patientId}
      ORDER BY exam_date DESC
    `

    // Agendamentos futuros
    const schedules = await sql`
      SELECT * FROM appointments_schedule 
      WHERE patient_id = ${patientId}
      AND appointment_date >= NOW()
      ORDER BY appointment_date ASC
    `

    // Histórico médico
    const medicalHistory = await sql`
      SELECT * FROM patient_medical_history 
      WHERE patient_id = ${patientId}
      ORDER BY diagnosis_date DESC
    `

    // Pagamentos
    const payments = await sql`
      SELECT * FROM payments 
      WHERE patient_id = ${patientId}
      ORDER BY payment_date DESC
    `

    return {
      success: true,
      patient,
      appointments,
      prescriptions,
      exams,
      schedules,
      medicalHistory,
      payments,
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getFinancialDashboard() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.userId) {
    return { success: false, error: "Sessão inválida" }
  }

  try {
    // Receita total
    const [totalRevenue] = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${session.userId}
      AND status = 'completed'
    `

    // Receita do mês atual
    const [monthRevenue] = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${session.userId}
      AND status = 'completed'
      AND EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    `

    // Consultas agendadas
    const [scheduledCount] = await sql`
      SELECT COUNT(*) as count
      FROM appointments_schedule
      WHERE user_id = ${session.userId}
      AND status = 'scheduled'
      AND appointment_date >= NOW()
    `

    // Total de pacientes ativos
    const [activePatients] = await sql`
      SELECT COUNT(*) as count
      FROM patients
      WHERE user_id = ${session.userId}
      AND is_active = true
    `

    // Pagamentos pendentes
    const [pendingPayments] = await sql`
      SELECT COALESCE(SUM(value), 0) as total
      FROM appointments_schedule
      WHERE user_id = ${session.userId}
      AND payment_status = 'pending'
    `

    // Receita por mês (últimos 6 meses)
    const monthlyRevenue = await sql`
      SELECT 
        TO_CHAR(payment_date, 'YYYY-MM') as month,
        SUM(amount) as revenue
      FROM payments
      WHERE user_id = ${session.userId}
      AND status = 'completed'
      AND payment_date >= NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR(payment_date, 'YYYY-MM')
      ORDER BY month ASC
    `

    // Top 5 pacientes por valor gasto
    const topPatients = await sql`
      SELECT 
        p.full_name,
        p.cpf,
        COALESCE(SUM(pay.amount), 0) as total_spent
      FROM patients p
      LEFT JOIN payments pay ON pay.patient_id = p.id
      WHERE p.user_id = ${session.userId}
      GROUP BY p.id, p.full_name, p.cpf
      ORDER BY total_spent DESC
      LIMIT 5
    `

    return {
      success: true,
      metrics: {
        totalRevenue: totalRevenue.total,
        monthRevenue: monthRevenue.total,
        scheduledCount: scheduledCount.count,
        activePatients: activePatients.count,
        pendingPayments: pendingPayments.total,
      },
      monthlyRevenue,
      topPatients,
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createSchedule(data: any) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.userId) {
    return { success: false, error: "Sessão inválida" }
  }

  try {
    const [schedule] = await sql`
      INSERT INTO appointments_schedule (
        user_id, patient_id, appointment_date, duration_minutes,
        appointment_type, value, payment_method, notes
      ) VALUES (
        ${session.userId}, ${data.patient_id}, ${data.appointment_date},
        ${data.duration_minutes || 60}, ${data.appointment_type},
        ${data.value || null}, ${data.payment_method || null}, ${data.notes || null}
      )
      RETURNING *
    `

    return { success: true, schedule }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function addPatientExam(data: any) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.userId) {
    return { success: false, error: "Sessão inválida" }
  }

  try {
    const [exam] = await sql`
      INSERT INTO patient_exams (
        patient_id, user_id, exam_type, exam_name, exam_date,
        laboratory, observations, status
      ) VALUES (
        ${data.patient_id}, ${session.userId}, ${data.exam_type},
        ${data.exam_name}, ${data.exam_date}, ${data.laboratory || null},
        ${data.observations || null}, ${data.status || "requested"}
      )
      RETURNING *
    `

    return { success: true, exam }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
