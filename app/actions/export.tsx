"use server"

import { getDb } from "@/lib/db"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/session"

export async function exportAppointmentPDF(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const sql = await getDb()

    // Buscar dados do atendimento
    const [appointment] = await sql`
      SELECT * FROM appointments
      WHERE id = ${appointmentId} AND user_id = ${user.id}
    `

    if (!appointment) {
      return { success: false, error: "Atendimento não encontrado" }
    }

    const procedures = await sql`
      SELECT * FROM procedures
      WHERE appointment_id = ${appointmentId}
    `

    // Gerar HTML formatado para PDF
    const html = generateTISSHTML({
      appointment,
      procedures,
      user,
    })

    return { success: true, html }
  } catch (error) {
    console.error("[v0] Error exporting PDF:", error)
    return { success: false, error: "Erro ao gerar PDF" }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const sql = await getDb()

    const [appointment] = await sql`
      SELECT * FROM appointments
      WHERE id = ${appointmentId} AND user_id = ${user.id}
    `

    if (!appointment) {
      return { success: false, error: "Atendimento não encontrado" }
    }

    const procedures = await sql`
      SELECT * FROM procedures
      WHERE appointment_id = ${appointmentId}
    `

    const data = {
      guia: {
        registroANS: user.ans_code || "000000",
        numeroGuia: `G${appointmentId.slice(0, 8).toUpperCase()}`,
        dataAtendimento: new Date(appointment.appointment_date).toLocaleDateString("pt-BR"),
      },
      beneficiario: {
        numeroCarteira: appointment.patient_cpf || "N/A",
        nome: appointment.patient_name,
        cns: appointment.patient_cpf || "N/A",
      },
      prestador: {
        codigo: user.professional_code || "000000",
        nome: user.name,
        crm: user.crm || "N/A",
        uf: user.crm_state || "SP",
        cbos: user.cbos_code || "225125",
      },
      procedimentos: procedures.map((p: any) => ({
        data: new Date(p.procedure_date).toLocaleDateString("pt-BR"),
        tabela: "TUSS",
        codigo: p.procedure_code,
        descricao: p.procedure_name,
        quantidade: 1,
      })),
      observacoes: appointment.observations || "",
    }

    return {
      success: true,
      data,
      filename: `TISS_${appointmentId.slice(0, 8)}_${Date.now()}.xlsx`,
    }
  } catch (error) {
    console.error("[v0] Error exporting Excel:", error)
    return { success: false, error: "Erro ao gerar Excel" }
  }
}

function generateTISSHTML(data: { appointment: any; procedures: any[]; user: any }): string {
  const { appointment, procedures, user } = data

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guia TISS - ${appointment.patient_name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      padding: 40px; 
      background: #fff;
      color: #333;
    }
    .container { max-width: 800px; margin: 0 auto; }
    .header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      margin-bottom: 0;
    }
    .header h1 { font-size: 28px; margin-bottom: 8px; }
    .header p { opacity: 0.9; font-size: 14px; }
    .content { 
      border: 2px solid #e5e7eb;
      border-top: none;
      border-radius: 0 0 12px 12px;
      padding: 30px;
      background: #fafafa;
    }
    .section { 
      background: white;
      padding: 20px; 
      margin-bottom: 20px; 
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .section-title { 
      font-size: 16px;
      font-weight: 600;
      color: #667eea;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #667eea;
    }
    .info-grid { 
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      gap: 16px; 
    }
    .info-item { }
    .info-label { 
      font-size: 11px;
      text-transform: uppercase;
      color: #6b7280;
      font-weight: 600;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    .info-value { 
      font-size: 14px;
      color: #111827;
      font-weight: 500;
    }
    .procedures-table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-top: 12px;
    }
    .procedures-table th { 
      background: #f3f4f6;
      padding: 12px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #374151;
      border-bottom: 2px solid #e5e7eb;
    }
    .procedures-table td { 
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 13px;
    }
    .procedures-table tr:last-child td { border-bottom: none; }
    .procedures-table tr:hover { background: #f9fafb; }
    .footer { 
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
    }
    .badge { 
      display: inline-block;
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
    }
    @media print {
      body { padding: 20px; }
      .header { border-radius: 8px 8px 0 0; }
      .content { border-radius: 0 0 8px 8px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 Guia de Consulta TISS</h1>
      <p>Padrão TISS - Troca de Informações na Saúde Suplementar</p>
    </div>
    
    <div class="content">
      <!-- Dados da Guia -->
      <div class="section">
        <div class="section-title">📄 Dados da Guia</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Registro ANS</div>
            <div class="info-value">${user.ans_code || "000000"}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Número da Guia</div>
            <div class="info-value">G${appointment.id.slice(0, 8).toUpperCase()}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Data do Atendimento</div>
            <div class="info-value">${new Date(appointment.appointment_date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Tipo de Atendimento</div>
            <div class="info-value"><span class="badge">${appointment.appointment_type}</span></div>
          </div>
        </div>
      </div>

      <!-- Dados do Beneficiário -->
      <div class="section">
        <div class="section-title">👤 Dados do Beneficiário</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Nome Completo</div>
            <div class="info-value">${appointment.patient_name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">CPF</div>
            <div class="info-value">${appointment.patient_cpf || "Não informado"}</div>
          </div>
          ${
            appointment.patient_age
              ? `
          <div class="info-item">
            <div class="info-label">Idade</div>
            <div class="info-value">${appointment.patient_age} anos</div>
          </div>
          `
              : ""
          }
          ${
            appointment.patient_gender
              ? `
          <div class="info-item">
            <div class="info-label">Sexo</div>
            <div class="info-value">${appointment.patient_gender === "M" ? "Masculino" : "Feminino"}</div>
          </div>
          `
              : ""
          }
        </div>
      </div>

      <!-- Dados do Prestador -->
      <div class="section">
        <div class="section-title">⚕️ Dados do Prestador</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Nome do Profissional</div>
            <div class="info-value">${user.name}</div>
          </div>
          <div class="info-item">
            <div class="info-label">CRM</div>
            <div class="info-value">${user.crm || "N/A"} - ${user.crm_state || "SP"}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Especialidade</div>
            <div class="info-value">${appointment.specialty || user.specialty || "Clínica Geral"}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Código CBOS</div>
            <div class="info-value">${user.cbos_code || "225125"}</div>
          </div>
        </div>
      </div>

      <!-- Procedimentos Realizados -->
      <div class="section">
        <div class="section-title">🏥 Procedimentos Realizados</div>
        <table class="procedures-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tabela</th>
              <th>Código</th>
              <th>Descrição do Procedimento</th>
              <th style="text-align: center;">Qtd</th>
            </tr>
          </thead>
          <tbody>
            ${procedures
              .map(
                (proc) => `
              <tr>
                <td>${new Date(proc.procedure_date).toLocaleDateString("pt-BR")}</td>
                <td>TUSS</td>
                <td style="font-family: monospace; font-weight: 600;">${proc.procedure_code}</td>
                <td>${proc.procedure_name}</td>
                <td style="text-align: center;">1</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>

      ${
        appointment.observations
          ? `
      <!-- Observações -->
      <div class="section">
        <div class="section-title">📝 Observações</div>
        <p style="font-size: 14px; line-height: 1.6; color: #374151;">${appointment.observations}</p>
      </div>
      `
          : ""
      }

      <div class="footer">
        <p><strong>AtendeBem</strong> - Sistema de Gestão em Saúde</p>
        <p>Documento gerado em ${new Date().toLocaleString("pt-BR")}</p>
        <p style="margin-top: 8px; font-size: 11px;">Este documento segue o padrão TISS versão 4.0 da ANS</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}
