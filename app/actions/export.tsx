"use server"

import { sql } from "@/lib/db"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"

export async function exportAppointmentPDF(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifySession(token)
    if (!user) {
      return { success: false, error: "Sessão inválida" }
    }

    // Buscar dados do atendimento
    const [appointment] = await sql`
      SELECT 
        a.*,
        u.name as doctor_name,
        u.crm,
        u.crm_uf,
        u.specialty
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId}
    `

    if (!appointment) {
      return { success: false, error: "Atendimento não encontrado" }
    }

    // Buscar procedimentos
    const procedures = await sql`
      SELECT * FROM procedures
      WHERE appointment_id = ${appointmentId}
      ORDER BY created_at ASC
    `

    const html = generatePDFHTML(appointment, procedures)

    return {
      success: true,
      html,
      filename: `guia-tiss-${appointmentId}-${Date.now()}.pdf`,
    }
  } catch (error: any) {
    console.error("Erro ao gerar PDF:", error)
    return { success: false, error: error.message }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifySession(token)
    if (!user) {
      return { success: false, error: "Sessão inválida" }
    }

    const [appointment] = await sql`
      SELECT 
        a.*,
        u.name as doctor_name,
        u.crm,
        u.crm_uf,
        u.specialty
      FROM appointments a
      JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId}
    `

    if (!appointment) {
      return { success: false, error: "Atendimento não encontrado" }
    }

    const procedures = await sql`
      SELECT * FROM procedures
      WHERE appointment_id = ${appointmentId}
      ORDER BY created_at ASC
    `

    const data = {
      guia: {
        registroANS: "000000",
        numeroGuia: appointmentId,
        dataAtendimento: new Date(appointment.appointment_date).toLocaleDateString("pt-BR"),
      },
      beneficiario: {
        numeroCarteira: appointment.patient_cpf || "N/A",
        nome: appointment.patient_name,
        cns: "-",
      },
      prestador: {
        codigo: "-",
        nome: appointment.doctor_name,
        crm: appointment.crm,
        uf: appointment.crm_uf,
        cbos: "225125",
      },
      procedimentos: procedures.map((proc: any) => ({
        data: new Date(proc.procedure_date || proc.created_at).toLocaleDateString("pt-BR"),
        tabela: "TUSS",
        codigo: proc.procedure_code || "-",
        descricao: proc.procedure_name,
        quantidade: 1,
      })),
      observacoes: appointment.observations || "",
    }

    return {
      success: true,
      data,
      filename: `guia-tiss-${appointmentId}-${Date.now()}.xlsx`,
    }
  } catch (error: any) {
    console.error("Erro ao gerar Excel:", error)
    return { success: false, error: error.message }
  }
}

function generatePDFHTML(appointment: any, procedures: any[]): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guia de Consulta TISS - ${appointment.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; font-size: 11px; padding: 20mm; background: white; color: #000; }
    .guia { width: 100%; max-width: 210mm; margin: 0 auto; border: 2px solid #000; }
    .header { background: #e8e8e8; padding: 8px; border-bottom: 2px solid #000; text-align: center; font-weight: bold; font-size: 14px; }
    .section { border-bottom: 1px solid #000; }
    .section-title { background: #f5f5f5; padding: 4px 8px; font-weight: bold; font-size: 10px; border-bottom: 1px solid #ccc; }
    .row { display: flex; border-bottom: 1px solid #ccc; }
    .field { flex: 1; padding: 4px 8px; border-right: 1px solid #ccc; min-height: 30px; }
    .field:last-child { border-right: none; }
    .field-label { font-size: 8px; color: #666; display: block; margin-bottom: 2px; }
    .field-value { font-size: 11px; font-weight: 500; }
    table { width: 100%; border-collapse: collapse; }
    table td, table th { border: 1px solid #000; padding: 4px; text-align: left; font-size: 10px; }
    table th { background: #f5f5f5; font-weight: bold; }
    .signature-area { margin-top: 40px; padding: 20px; }
    .signature-line { border-top: 1px solid #000; width: 300px; margin: 40px auto 0; padding-top: 8px; text-align: center; }
    @media print { body { padding: 0; } .guia { border: none; } }
  </style>
</head>
<body>
  <div class="guia">
    <div class="header">GUIA DE CONSULTA - PADRÃO TISS</div>
    
    <div class="section">
      <div class="section-title">1 - Registro ANS</div>
      <div class="row">
        <div class="field">
          <span class="field-label">Número de Registro na ANS</span>
          <span class="field-value">000000</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">2 - Dados do Beneficiário</div>
      <div class="row">
        <div class="field" style="flex: 2;">
          <span class="field-label">2.1 - Número da Carteira</span>
          <span class="field-value">${appointment.patient_cpf || "N/A"}</span>
        </div>
        <div class="field">
          <span class="field-label">2.2 - Validade da Carteira</span>
          <span class="field-value">-</span>
        </div>
      </div>
      <div class="row">
        <div class="field" style="flex: 3;">
          <span class="field-label">2.3 - Nome</span>
          <span class="field-value">${appointment.patient_name}</span>
        </div>
        <div class="field">
          <span class="field-label">2.4 - Cartão Nacional de Saúde</span>
          <span class="field-value">-</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">3 - Dados do Contratado</div>
      <div class="row">
        <div class="field">
          <span class="field-label">3.1 - Código na Operadora</span>
          <span class="field-value">-</span>
        </div>
        <div class="field" style="flex: 2;">
          <span class="field-label">3.2 - Nome do Contratado</span>
          <span class="field-value">${appointment.doctor_name}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">4 - Dados da Consulta</div>
      <div class="row">
        <div class="field">
          <span class="field-label">4.1 - Data do Atendimento</span>
          <span class="field-value">${new Date(appointment.appointment_date).toLocaleDateString("pt-BR")}</span>
        </div>
        <div class="field">
          <span class="field-label">4.2 - Hora Inicial</span>
          <span class="field-value">${new Date(appointment.appointment_date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
        <div class="field">
          <span class="field-label">4.3 - Hora Final</span>
          <span class="field-value">-</span>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <span class="field-label">4.4 - Tipo de Consulta</span>
          <span class="field-value">${appointment.appointment_type}</span>
        </div>
        <div class="field" style="flex: 2;">
          <span class="field-label">4.5 - Especialidade</span>
          <span class="field-value">${appointment.specialty}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">5 - Procedimentos e Exames Realizados</div>
      <table>
        <thead>
          <tr>
            <th style="width: 15%;">5.1 - Data</th>
            <th style="width: 10%;">5.2 - Tabela</th>
            <th style="width: 15%;">5.3 - Código</th>
            <th style="width: 50%;">5.4 - Descrição</th>
            <th style="width: 10%;">5.5 - Qtde</th>
          </tr>
        </thead>
        <tbody>
          ${procedures
            .map(
              (proc: any) => `
            <tr>
              <td>${new Date(proc.procedure_date || proc.created_at).toLocaleDateString("pt-BR")}</td>
              <td>TUSS</td>
              <td>${proc.procedure_code || "-"}</td>
              <td>${proc.procedure_name}</td>
              <td>1</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">6 - Identificação do Profissional Executante</div>
      <div class="row">
        <div class="field" style="flex: 2;">
          <span class="field-label">6.1 - Nome do Profissional</span>
          <span class="field-value">${appointment.doctor_name}</span>
        </div>
        <div class="field">
          <span class="field-label">6.2 - Conselho Profissional</span>
          <span class="field-value">CRM</span>
        </div>
      </div>
      <div class="row">
        <div class="field">
          <span class="field-label">6.3 - Número no Conselho</span>
          <span class="field-value">${appointment.crm}</span>
        </div>
        <div class="field">
          <span class="field-label">6.4 - UF</span>
          <span class="field-value">${appointment.crm_uf}</span>
        </div>
        <div class="field">
          <span class="field-label">6.5 - Código CBO</span>
          <span class="field-value">225125</span>
        </div>
      </div>
    </div>

    ${
      appointment.observations
        ? `
    <div class="section">
      <div class="section-title">7 - Observações</div>
      <div class="field" style="min-height: 60px;">
        <span class="field-value">${appointment.observations}</span>
      </div>
    </div>
    `
        : ""
    }

    <div class="signature-area">
      <div class="signature-line">
        ${appointment.doctor_name}<br>
        CRM ${appointment.crm}-${appointment.crm_uf}
      </div>
    </div>
  </div>
</body>
</html>
  `
}
