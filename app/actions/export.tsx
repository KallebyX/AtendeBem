"use server"

import { getCurrentUser } from "@/lib/session"
import { getDb } from "@/lib/db"

export async function exportAppointmentPDF(appointmentId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    const appointments = await db`
      SELECT 
        a.*,
        p.name as patient_name, p.cpf as patient_cpf, p.cns as patient_cns, p.birth_date,
        u.name as doctor_name, u.crm, u.crm_uf, u.specialty
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId} AND a.user_id = ${user.id}
    `

    if (appointments.length === 0) {
      return { success: false, error: "Atendimento não encontrado" }
    }

    const appointment = appointments[0]

    const procedures = await db`
      SELECT code, description, quantity, unit_price, total_price
      FROM appointment_procedures
      WHERE appointment_id = ${appointmentId}
      ORDER BY created_at
    `

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Guia de Consulta TISS - ${appointment.patient_name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; font-size: 12px; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
    .section { margin: 20px 0; }
    .section-title { font-weight: bold; background: #f0f0f0; padding: 8px; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f0f0f0; font-weight: bold; }
    .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h1>GUIA DE CONSULTA - TISS 4.0</h1>
    <p>Padrão TISS - Troca de Informações na Saúde Suplementar</p>
  </div>

  <div class="section">
    <div class="section-title">DADOS DA GUIA</div>
    <table>
      <tr><td><strong>Número da Guia:</strong></td><td>${appointment.id}</td></tr>
      <tr><td><strong>Data do Atendimento:</strong></td><td>${new Date(appointment.date).toLocaleDateString("pt-BR")}</td></tr>
      <tr><td><strong>Horário:</strong></td><td>${appointment.time || "N/A"}</td></tr>
      <tr><td><strong>Status:</strong></td><td>${appointment.status}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">DADOS DO BENEFICIÁRIO</div>
    <table>
      <tr><td><strong>Nome:</strong></td><td>${appointment.patient_name}</td></tr>
      <tr><td><strong>CPF:</strong></td><td>${appointment.patient_cpf || "N/A"}</td></tr>
      <tr><td><strong>CNS:</strong></td><td>${appointment.patient_cns || "N/A"}</td></tr>
      <tr><td><strong>Data de Nascimento:</strong></td><td>${appointment.birth_date ? new Date(appointment.birth_date).toLocaleDateString("pt-BR") : "N/A"}</td></tr>
    </table>
  </div>

  <div class="section">
    <div class="section-title">DADOS DO PRESTADOR</div>
    <table>
      <tr><td><strong>Nome:</strong></td><td>${appointment.doctor_name}</td></tr>
      <tr><td><strong>CRM:</strong></td><td>${appointment.crm}</td></tr>
      <tr><td><strong>UF:</strong></td><td>${appointment.crm_uf}</td></tr>
      <tr><td><strong>Especialidade:</strong></td><td>${appointment.specialty}</td></tr>
    </table>
  </div>

  ${
    procedures.length > 0
      ? `
  <div class="section">
    <div class="section-title">PROCEDIMENTOS REALIZADOS</div>
    <table>
      <thead>
        <tr>
          <th>Código TUSS</th>
          <th>Descrição</th>
          <th>Qtd</th>
          <th>Valor Unitário</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        ${procedures
          .map(
            (proc) => `
        <tr>
          <td>${proc.code}</td>
          <td>${proc.description}</td>
          <td>${proc.quantity}</td>
          <td>R$ ${(proc.unit_price || 0).toFixed(2)}</td>
          <td>R$ ${(proc.total_price || 0).toFixed(2)}</td>
        </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  </div>
  `
      : ""
  }

  ${
    appointment.notes
      ? `
  <div class="section">
    <div class="section-title">OBSERVAÇÕES</div>
    <p>${appointment.notes}</p>
  </div>
  `
      : ""
  }

  <div class="footer">
    <p>Documento gerado pelo sistema AtendeBem em ${new Date().toLocaleString("pt-BR")}</p>
    <p>Este documento segue os padrões TISS 4.0 da ANS</p>
  </div>
</body>
</html>
    `

    return { success: true, html, filename: `guia-${appointmentId}.pdf` }
  } catch (error: any) {
    console.error("[v0] Error exporting appointment PDF:", error)
    return { success: false, error: error.message || "Erro ao gerar PDF" }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    const appointments = await db`
      SELECT 
        a.*,
        p.name as patient_name, p.cpf as patient_cpf, p.cns as patient_cns,
        u.name as doctor_name, u.crm, u.crm_uf, u.specialty
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId} AND a.user_id = ${user.id}
    `

    if (appointments.length === 0) {
      return { success: false, error: "Atendimento não encontrado" }
    }

    const appointment = appointments[0]

    const procedures = await db`
      SELECT code, description, quantity, unit_price, total_price
      FROM appointment_procedures
      WHERE appointment_id = ${appointmentId}
      ORDER BY created_at
    `

    const data = {
      guia: {
        numeroGuia: appointment.id,
        dataAtendimento: new Date(appointment.date).toLocaleDateString("pt-BR"),
        horario: appointment.time || "N/A",
        status: appointment.status,
      },
      beneficiario: {
        nome: appointment.patient_name,
        cpf: appointment.patient_cpf || "N/A",
        cns: appointment.patient_cns || "N/A",
      },
      prestador: {
        nome: appointment.doctor_name,
        crm: appointment.crm,
        uf: appointment.crm_uf,
        especialidade: appointment.specialty,
      },
      procedimentos: procedures.map((proc) => ({
        codigo: proc.code,
        descricao: proc.description,
        quantidade: proc.quantity,
        valorUnitario: proc.unit_price || 0,
        valorTotal: proc.total_price || 0,
      })),
      observacoes: appointment.notes,
    }

    return {
      success: true,
      data,
      filename: `guia-${appointmentId}.xlsx`,
    }
  } catch (error: any) {
    console.error("[v0] Error exporting appointment Excel:", error)
    return { success: false, error: error.message || "Erro ao gerar Excel" }
  }
}
