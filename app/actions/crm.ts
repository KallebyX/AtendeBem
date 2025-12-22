"use server"

import { getDb } from "@/lib/db"
import { verifySession } from "@/lib/session"
import { cookies } from "next/headers"

export async function getPatientsList() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()

    // Query simplificada - sem JOINs complexos para evitar travamento
    const patients = await sql`
      SELECT
        id,
        user_id,
        full_name,
        cpf,
        date_of_birth,
        gender,
        phone,
        email,
        address,
        city,
        state,
        cep,
        insurance_provider,
        insurance_number,
        blood_type,
        allergies,
        chronic_conditions,
        emergency_contact_name,
        emergency_contact_phone,
        is_active,
        created_at,
        updated_at
      FROM patients
      WHERE user_id = ${userId} AND is_active = true
      ORDER BY created_at DESC
      LIMIT 100
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
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()

    // Dados do paciente
    const patientResult = await sql`
      SELECT * FROM patients 
      WHERE id = ${patientId} AND user_id = ${userId}
    `

    const patient = patientResult[0]

    if (!patient) {
      return { success: false, error: "Paciente não encontrado" }
    }

    // Histórico de consultas - buscar por patient_id ou fallback para CPF/nome
    const appointments = await sql`
      SELECT * FROM appointments
      WHERE user_id = ${userId}
      AND (
        patient_id = ${patientId}
        OR (patient_id IS NULL AND (patient_cpf = ${patient.cpf} OR patient_name = ${patient.full_name}))
      )
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

    // Anamneses
    let anamneses: any[] = []
    try {
      anamneses = await sql`
        SELECT * FROM anamnesis
        WHERE patient_id = ${patientId}
        ORDER BY created_at DESC
      `
    } catch (e) {
      // Table may not exist yet
      anamneses = []
    }

    // Lab Orders
    let labOrders: any[] = []
    try {
      labOrders = await sql`
        SELECT lo.*
        FROM lab_orders lo
        WHERE lo.patient_id = ${patientId}
        ORDER BY lo.created_at DESC
      `
    } catch (e) {
      labOrders = []
    }

    return {
      success: true,
      patient,
      appointments,
      prescriptions,
      exams,
      schedules,
      medicalHistory,
      payments,
      anamneses,
      labOrders,
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
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()

    // Receita total
    const totalRevenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${userId}
      AND status = 'completed'
    `
    const totalRevenue = totalRevenueResult[0]

    // Receita do mês atual
    const monthRevenueResult = await sql`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${userId}
      AND status = 'completed'
      AND EXTRACT(MONTH FROM payment_date) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    `
    const monthRevenue = monthRevenueResult[0]

    // Consultas agendadas
    const scheduledCountResult = await sql`
      SELECT COUNT(*) as count
      FROM appointments_schedule
      WHERE user_id = ${userId}
      AND status = 'scheduled'
      AND appointment_date >= NOW()
    `
    const scheduledCount = scheduledCountResult[0]

    // Total de pacientes ativos
    const activePatientsResult = await sql`
      SELECT COUNT(*) as count
      FROM patients
      WHERE user_id = ${userId}
      AND is_active = true
    `
    const activePatients = activePatientsResult[0]

    // Pagamentos pendentes
    const pendingPaymentsResult = await sql`
      SELECT COALESCE(SUM(value), 0) as total
      FROM appointments_schedule
      WHERE user_id = ${userId}
      AND payment_status = 'pending'
    `
    const pendingPayments = pendingPaymentsResult[0]

    // Receita por mês (últimos 6 meses)
    const monthlyRevenue = await sql`
      SELECT 
        TO_CHAR(payment_date, 'YYYY-MM') as month,
        SUM(amount) as revenue
      FROM payments
      WHERE user_id = ${userId}
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
      WHERE p.user_id = ${userId}
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

export async function createSchedule(data: {
  patient_id: string
  appointment_date: string
  duration_minutes?: number
  appointment_type: string
  notes?: string | null
  value?: number | null
  payment_method?: string | null
}) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()
    const scheduleResult = await sql`
      INSERT INTO appointments_schedule (
        user_id, patient_id, appointment_date, duration_minutes,
        appointment_type, value, payment_method, notes, status, payment_status
      ) VALUES (
        ${userId}, 
        ${data.patient_id}, 
        ${data.appointment_date}::timestamp with time zone,
        ${data.duration_minutes || 60}, 
        ${data.appointment_type},
        ${data.value || null}, 
        ${data.payment_method || null}, 
        ${data.notes || null},
        'scheduled',
        'pending'
      )
      RETURNING *
    `

    return { success: true, schedule: scheduleResult[0] }
  } catch (error: any) {
    console.error("Error creating schedule:", error)
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
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()
    const examResult = await sql`
      INSERT INTO patient_exams (
        patient_id, user_id, exam_type, exam_name, exam_date,
        laboratory, observations, status
      ) VALUES (
        ${data.patient_id}, ${userId}, ${data.exam_type},
        ${data.exam_name}, ${data.exam_date}, ${data.laboratory || null},
        ${data.observations || null}, 'requested'
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
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()

    // Log para debug
    console.log('[createPatient] Creating patient:', data.fullName, 'for user:', userId)
    
    const result = await sql`
      INSERT INTO patients (
        user_id, full_name, cpf, date_of_birth, gender, phone, email,
        address, city, state, cep, insurance_provider, insurance_number,
        blood_type, allergies, chronic_conditions, emergency_contact_name,
        emergency_contact_phone
      ) VALUES (
        ${userId}, ${data.fullName}, ${data.cpf}, ${data.dateOfBirth}::date, 
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
    return { success: false, error: "Não autenticado", schedules: [] }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida", schedules: [] }
  }

  const userId = session.id

  try {
    const sql = await getDb()
    let schedules

    if (startDate && endDate) {
      schedules = await sql`
        SELECT 
          s.*,
          p.full_name as patient_name, 
          p.phone as patient_phone,
          p.cpf as patient_cpf
        FROM appointments_schedule s
        LEFT JOIN patients p ON s.patient_id = p.id
        WHERE s.user_id = ${userId}
        AND s.appointment_date >= ${startDate}::date
        AND s.appointment_date < (${endDate}::date + INTERVAL '1 day')
        ORDER BY s.appointment_date ASC
      `
    } else {
      schedules = await sql`
        SELECT 
          s.*,
          p.full_name as patient_name, 
          p.phone as patient_phone,
          p.cpf as patient_cpf
        FROM appointments_schedule s
        LEFT JOIN patients p ON s.patient_id = p.id
        WHERE s.user_id = ${userId}
        ORDER BY s.appointment_date ASC
      `
    }

    return { success: true, schedules }
  } catch (error: any) {
    console.error("Error getting schedules:", error)
    return { success: false, error: error.message, schedules: [] }
  }
}

export async function updateScheduleStatus(scheduleId: string, status: string) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()
    const result = await sql`
      UPDATE appointments_schedule 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${scheduleId} AND user_id = ${userId}
      RETURNING *
    `

    if (result.length === 0) {
      return { success: false, error: "Agendamento não encontrado" }
    }

    return { success: true, schedule: result[0] }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function recordPayment(data: {
  scheduleId: string
  patientId: string
  amount: number
  paymentMethod: string
  notes?: string
}) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()

    // Insert payment record
    const paymentResult = await sql`
      INSERT INTO payments (
        user_id, patient_id, appointment_schedule_id, amount, 
        payment_method, payment_date, status, notes
      ) VALUES (
        ${userId}, ${data.patientId}, ${data.scheduleId}, ${data.amount},
        ${data.paymentMethod}, NOW(), 'completed', ${data.notes || null}
      )
      RETURNING *
    `

    // Update schedule payment status
    await sql`
      UPDATE appointments_schedule 
      SET payment_status = 'paid', updated_at = NOW()
      WHERE id = ${data.scheduleId}
    `

    return { success: true, payment: paymentResult[0] }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function addExam(data: {
  patient_id: string
  exam_name: string
  exam_type: string
  exam_date: string
  laboratory?: string | null
  notes?: string | null
}) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()
    const examResult = await sql`
      INSERT INTO patient_exams (
        patient_id, user_id, exam_type, exam_name, exam_date,
        laboratory, observations, status
      ) VALUES (
        ${data.patient_id}, ${userId}, ${data.exam_type},
        ${data.exam_name}, ${data.exam_date}::date, ${data.laboratory || null},
        ${data.notes || null}, 'pendente'
      )
      RETURNING *
    `

    return { success: true, exam: examResult[0] }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updatePatient(
  patientId: string,
  data: {
    full_name?: string
    phone?: string
    email?: string
    address?: string
    allergies?: string
    chronic_conditions?: string
  },
) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()
    const result = await sql`
      UPDATE patients SET
        full_name = COALESCE(${data.full_name || null}, full_name),
        phone = COALESCE(${data.phone || null}, phone),
        email = COALESCE(${data.email || null}, email),
        address = COALESCE(${data.address || null}, address),
        allergies = ${data.allergies || null},
        chronic_conditions = ${data.chronic_conditions || null},
        updated_at = NOW()
      WHERE id = ${patientId} AND user_id = ${userId}
      RETURNING *
    `

    if (result.length === 0) {
      return { success: false, error: "Paciente não encontrado" }
    }

    return { success: true, patient: result[0] }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deletePatient(patientId: string) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return { success: false, error: "Não autenticado" }
  }

  const session = await verifySession(sessionCookie.value)
  if (!session || !session.id) {
    return { success: false, error: "Sessão inválida" }
  }

  const userId = session.id

  try {
    const sql = await getDb()

    // Soft delete - just mark as inactive
    const result = await sql`
      UPDATE patients SET
        is_active = false,
        updated_at = NOW()
      WHERE id = ${patientId} AND user_id = ${userId}
      RETURNING id
    `

    if (result.length === 0) {
      return { success: false, error: "Paciente não encontrado" }
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
