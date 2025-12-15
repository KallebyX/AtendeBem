"use server"

import { sql } from "@/lib/db"
import { verifySession } from "@/lib/auth"
import { cookies } from "next/headers"

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
    const patientResult = await sql`
      SELECT * FROM patients 
      WHERE id = ${patientId} AND user_id = ${session.userId}
    `

    const patient = patientResult[0]

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
    const totalRevenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${session.userId}
      AND status = 'completed'
    `
    const totalRevenue = totalRevenueResult[0]

    // Receita do mês atual
    const monthRevenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${session.userId}
      AND status = 'completed'
      AND EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    `
    const monthRevenue = monthRevenueResult[0]

    // Consultas agendadas
    const scheduledCountResult = await sql`
      SELECT COUNT(*) as count
      FROM appointments_schedule
      WHERE user_id = ${session.userId}
      AND status = 'scheduled'
      AND appointment_date >= NOW()
    `
    const scheduledCount = scheduledCountResult[0]

    // Total de pacientes ativos
    const activePatientsResult = await sql`
      SELECT COUNT(*) as count
      FROM patients
      WHERE user_id = ${session.userId}
      AND is_active = true
    `
    const activePatients = activePatientsResult[0]

    // Pagamentos pendentes
    const pendingPaymentsResult = await sql`
      SELECT COALESCE(SUM(value), 0) as total
      FROM appointments_schedule
      WHERE user_id = ${session.userId}
      AND payment_status = 'pending'
    `
    const pendingPayments = pendingPaymentsResult[0]

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
        totalRevenue: Number(totalRevenue.total) || 0,
        monthRevenue: Number(monthRevenue.total) || 0,
        scheduledCount: Number(scheduledCount.count) || 0,
        activePatients: Number(activePatients.count) || 0,
        pendingPayments: Number(pendingPayments.total) || 0,
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
    const scheduleResult = await sql`
      INSERT INTO appointments_schedule (
        user_id, patient_id, appointment_date, duration_minutes,
        appointment_type, value, payment_method, notes, status
      ) VALUES (
        ${session.userId}, ${data.patient_id}, ${data.appointment_date},
        ${data.duration_minutes || 60}, ${data.appointment_type},
        ${data.value || null}, ${data.payment_method || null}, ${data.notes || null},
        'scheduled'
      )
      RETURNING *
    `

    return { success: true, schedule: scheduleResult[0] }
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
    const examResult = await sql`
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

    return { success: true, exam: examResult[0] }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function createPatient(data: {
  fullName: string
  cpf: string
  dateOfBirth: string
  gender: string
  phone?: string
  email?: string
  address?: string
  city?: string
  state?: string
  cep?: string
  insuranceProvider?: string
  insuranceNumber?: string
  bloodType?: string
  allergies?: string
  chronicConditions?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
}) {
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
    const result = await sql`
      INSERT INTO patients (
        user_id, full_name, cpf, date_of_birth, gender, phone, email,
        address, city, state, cep, insurance_provider, insurance_number,
        blood_type, allergies, chronic_conditions, emergency_contact_name,
        emergency_contact_phone
      ) VALUES (
        ${session.userId}, ${data.fullName}, ${data.cpf}, ${data.dateOfBirth}::date, 
        ${data.gender}, ${data.phone || null}, ${data.email || null},
        ${data.address || null}, ${data.city || null}, ${data.state || null}, 
        ${data.cep || null}, ${data.insuranceProvider || null}, ${data.insuranceNumber || null},
        ${data.bloodType || null}, ${data.allergies || null}, ${data.chronicConditions || null},
        ${data.emergencyContactName || null}, ${data.emergencyContactPhone || null}
      )
      RETURNING id, full_name, cpf
    `

    return { success: true, patient: result[0] }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getSchedules(startDate?: string, endDate?: string) {
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
    let schedules
    if (startDate && endDate) {
      schedules = await sql`
        SELECT s.*, p.full_name as patient_name, p.phone as patient_phone
        FROM appointments_schedule s
        LEFT JOIN patients p ON s.patient_id = p.id
        WHERE s.user_id = ${session.userId}
        AND s.appointment_date >= ${startDate}::date
        AND s.appointment_date <= ${endDate}::date
        ORDER BY s.appointment_date ASC
      `
    } else {
      schedules = await sql`
        SELECT s.*, p.full_name as patient_name, p.phone as patient_phone
        FROM appointments_schedule s
        LEFT JOIN patients p ON s.patient_id = p.id
        WHERE s.user_id = ${session.userId}
        ORDER BY s.appointment_date ASC
      `
    }

    return { success: true, schedules }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
