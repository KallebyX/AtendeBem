"use server"

import { sql } from "@/lib/db"
import { verifySession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function getFinancialReport() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    // Receita por mês (últimos 6 meses)
    const monthlyRevenue = await sql`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', p.payment_date), 'Mon') as month,
        TO_CHAR(DATE_TRUNC('month', p.payment_date), 'YYYY-MM') as month_key,
        COALESCE(SUM(p.amount), 0)::float as value
      FROM payments p
      JOIN patients pt ON p.patient_id = pt.id
      WHERE pt.user_id = ${session.id}
        AND p.payment_date >= NOW() - INTERVAL '6 months'
        AND p.status = 'paid'
      GROUP BY DATE_TRUNC('month', p.payment_date)
      ORDER BY DATE_TRUNC('month', p.payment_date)
    `

    // Total de receita
    const totalRevenue = await sql`
      SELECT COALESCE(SUM(p.amount), 0)::float as total
      FROM payments p
      JOIN patients pt ON p.patient_id = pt.id
      WHERE pt.user_id = ${session.id}
        AND p.status = 'paid'
    `

    // Receita do mês atual
    const currentMonthRevenue = await sql`
      SELECT COALESCE(SUM(p.amount), 0)::float as total
      FROM payments p
      JOIN patients pt ON p.patient_id = pt.id
      WHERE pt.user_id = ${session.id}
        AND p.status = 'paid'
        AND DATE_TRUNC('month', p.payment_date) = DATE_TRUNC('month', NOW())
    `

    // Top 5 pacientes por valor
    const topPatients = await sql`
      SELECT 
        pt.full_name as name,
        COALESCE(SUM(p.amount), 0)::float as value,
        COUNT(DISTINCT a.id)::int as visits
      FROM patients pt
      LEFT JOIN payments p ON p.patient_id = pt.id AND p.status = 'paid'
      LEFT JOIN appointments a ON a.patient_id = pt.id
      WHERE pt.user_id = ${session.id}
      GROUP BY pt.id, pt.full_name
      ORDER BY value DESC
      LIMIT 5
    `

    // Total de atendimentos
    const totalAppointments = await sql`
      SELECT COUNT(*)::int as total
      FROM appointments a
      WHERE a.user_id = ${session.id}
    `

    // Total de pacientes
    const totalPatients = await sql`
      SELECT COUNT(*)::int as total
      FROM patients
      WHERE user_id = ${session.id}
    `

    return {
      success: true,
      data: {
        monthlyRevenue: monthlyRevenue || [],
        totalRevenue: totalRevenue[0]?.total || 0,
        currentMonthRevenue: currentMonthRevenue[0]?.total || 0,
        topPatients: topPatients || [],
        totalAppointments: totalAppointments[0]?.total || 0,
        totalPatients: totalPatients[0]?.total || 0,
      },
    }
  } catch (error: any) {
    console.error("Erro ao buscar relatório financeiro:", error)
    return { success: false, error: error.message }
  }
}

export async function exportPatientsReport() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    const patients = await sql`
      SELECT 
        full_name,
        cpf,
        birth_date,
        gender,
        phone,
        email,
        health_insurance,
        created_at
      FROM patients
      WHERE user_id = ${session.id}
      ORDER BY full_name
    `

    // Generate CSV
    const headers = ["Nome", "CPF", "Data Nascimento", "Sexo", "Telefone", "Email", "Convênio", "Cadastrado em"]
    const rows = patients.map((p: any) => [
      p.full_name,
      p.cpf,
      p.birth_date ? new Date(p.birth_date).toLocaleDateString("pt-BR") : "",
      p.gender === "male" ? "Masculino" : p.gender === "female" ? "Feminino" : "Outro",
      p.phone || "",
      p.email || "",
      p.health_insurance || "Particular",
      new Date(p.created_at).toLocaleDateString("pt-BR"),
    ])

    const csv = [headers.join(";"), ...rows.map((r: string[]) => r.join(";"))].join("\n")

    return {
      success: true,
      data: csv,
      filename: `relatorio-pacientes-${Date.now()}.csv`,
    }
  } catch (error: any) {
    console.error("Erro ao exportar pacientes:", error)
    return { success: false, error: error.message }
  }
}

export async function exportFinancialReport() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    const payments = await sql`
      SELECT 
        pt.full_name as patient_name,
        p.amount,
        p.payment_date,
        p.payment_method,
        p.status,
        p.description
      FROM payments p
      JOIN patients pt ON p.patient_id = pt.id
      WHERE pt.user_id = ${session.id}
      ORDER BY p.payment_date DESC
    `

    // Generate CSV
    const headers = ["Paciente", "Valor", "Data", "Método", "Status", "Descrição"]
    const rows = payments.map((p: any) => [
      p.patient_name,
      `R$ ${p.amount.toFixed(2)}`,
      new Date(p.payment_date).toLocaleDateString("pt-BR"),
      p.payment_method || "Não informado",
      p.status === "paid" ? "Pago" : p.status === "pending" ? "Pendente" : "Cancelado",
      p.description || "",
    ])

    const csv = [headers.join(";"), ...rows.map((r: string[]) => r.join(";"))].join("\n")

    return {
      success: true,
      data: csv,
      filename: `relatorio-financeiro-${Date.now()}.csv`,
    }
  } catch (error: any) {
    console.error("Erro ao exportar financeiro:", error)
    return { success: false, error: error.message }
  }
}

export async function exportAppointmentsReport() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    const appointments = await sql`
      SELECT 
        a.appointment_date,
        a.appointment_type,
        a.status,
        pt.full_name as patient_name,
        pt.cpf as patient_cpf,
        COUNT(pr.id)::int as procedure_count
      FROM appointments a
      LEFT JOIN patients pt ON a.patient_id = pt.id
      LEFT JOIN procedures pr ON pr.appointment_id = a.id
      WHERE a.user_id = ${session.id}
      GROUP BY a.id, pt.full_name, pt.cpf
      ORDER BY a.appointment_date DESC
    `

    // Generate CSV
    const headers = ["Data", "Tipo", "Status", "Paciente", "CPF", "Procedimentos"]
    const rows = appointments.map((a: any) => [
      new Date(a.appointment_date).toLocaleDateString("pt-BR"),
      a.appointment_type || "Consulta",
      a.status === "completed" ? "Concluído" : a.status === "pending" ? "Pendente" : "Cancelado",
      a.patient_name || "Não informado",
      a.patient_cpf || "",
      a.procedure_count.toString(),
    ])

    const csv = [headers.join(";"), ...rows.map((r: string[]) => r.join(";"))].join("\n")

    return {
      success: true,
      data: csv,
      filename: `relatorio-atendimentos-${Date.now()}.csv`,
    }
  } catch (error: any) {
    console.error("Erro ao exportar atendimentos:", error)
    return { success: false, error: error.message }
  }
}
