"use server"

import { getDb } from "@/lib/db"
import { setUserContext } from "@/lib/db-init"

export async function exportAppointmentPDF(appointmentId: string) {
  console.log("[v0] Export PDF started for appointment:", appointmentId)

  try {
    await setUserContext()
    const sql = await getDb()

    const result = await sql`
      SELECT 
        a.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.email as patient_email,
        p.phone as patient_phone,
        u.name as doctor_name,
        u.email as doctor_email
      FROM appointments_schedule a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId}
      AND a.user_id = current_setting('app.current_user_id', true)::uuid
    `

    if (result.length === 0) {
      return { error: "Consulta não encontrada" }
    }

    const appointment = result[0]

    // Generate HTML for PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
          .header h1 { margin: 0 0 10px 0; font-size: 28px; }
          .header p { margin: 5px 0; opacity: 0.9; }
          .section { margin: 25px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
          .section h2 { color: #667eea; margin-top: 0; font-size: 18px; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .info-item { margin: 8px 0; }
          .info-label { font-weight: bold; color: #555; }
          .info-value { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background: #667eea; color: white; padding: 12px; text-align: left; }
          td { padding: 12px; border-bottom: 1px solid #ddd; }
          tr:hover { background: #f5f5f5; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏥 Relatório de Consulta TISS</h1>
          <p>Sistema AtendeBem - Gestão Médica Completa</p>
          <p>Gerado em: ${new Date().toLocaleDateString("pt-BR", { dateStyle: "full" })}</p>
        </div>
        
        <div class="section">
          <h2>📋 Informações do Paciente</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome:</span>
              <span class="info-value">${appointment.patient_name || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">CPF:</span>
              <span class="info-value">${appointment.patient_cpf || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">${appointment.patient_email || "Não informado"}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Telefone:</span>
              <span class="info-value">${appointment.patient_phone || "Não informado"}</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>👨‍⚕️ Informações do Profissional</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome:</span>
              <span class="info-value">${appointment.doctor_name}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Email:</span>
              <span class="info-value">${appointment.doctor_email}</span>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h2>🩺 Detalhes da Consulta</h2>
          <table>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
            <tr>
              <td><strong>Data/Hora</strong></td>
              <td>${new Date(appointment.start_time).toLocaleString("pt-BR")}</td>
            </tr>
            <tr>
              <td><strong>Status</strong></td>
              <td>${appointment.status === "completed" ? "Concluída" : appointment.status === "confirmed" ? "Confirmada" : "Pendente"}</td>
            </tr>
            <tr>
              <td><strong>Tipo</strong></td>
              <td>${appointment.appointment_type || "Consulta"}</td>
            </tr>
            <tr>
              <td><strong>Queixa Principal</strong></td>
              <td>${appointment.chief_complaint || "Não informado"}</td>
            </tr>
            <tr>
              <td><strong>Diagnóstico (CID)</strong></td>
              <td>${appointment.diagnosis_code || "Não informado"}</td>
            </tr>
          </table>
        </div>
        
        ${
          appointment.procedures
            ? `
        <div class="section">
          <h2>🔬 Procedimentos Realizados (TUSS)</h2>
          <table>
            <tr>
              <th>Código TUSS</th>
              <th>Descrição</th>
              <th>Quantidade</th>
            </tr>
            ${JSON.parse(appointment.procedures)
              .map(
                (proc: any) => `
              <tr>
                <td>${proc.code}</td>
                <td>${proc.description}</td>
                <td>${proc.quantity || 1}</td>
              </tr>
            `,
              )
              .join("")}
          </table>
        </div>
        `
            : ""
        }
        
        <div class="footer">
          <p><strong>AtendeBem</strong> - Sistema de Gestão Médica</p>
          <p>Este documento foi gerado eletronicamente e é válido sem assinatura física.</p>
          <p>Padrão TISS 4.0 - ANS</p>
        </div>
      </body>
      </html>
    `

    return { success: true, html, appointment }
  } catch (error: any) {
    console.error("[v0] Export PDF error:", error)
    return { error: error.message }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  console.log("[v0] Export Excel started for appointment:", appointmentId)

  try {
    await setUserContext()
    const sql = await getDb()

    const result = await sql`
      SELECT 
        a.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.email as patient_email,
        p.phone as patient_phone,
        u.name as doctor_name,
        u.crm as doctor_crm
      FROM appointments_schedule a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId}
      AND a.user_id = current_setting('app.current_user_id', true)::uuid
    `

    if (result.length === 0) {
      return { error: "Consulta não encontrada" }
    }

    const appointment = result[0]

    // Generate CSV data
    const csv = [
      ["Campo", "Valor"],
      ["ID da Consulta", appointment.id],
      ["Paciente", appointment.patient_name || "Não informado"],
      ["CPF do Paciente", appointment.patient_cpf || "Não informado"],
      ["Data/Hora", new Date(appointment.start_time).toLocaleString("pt-BR")],
      ["Profissional", appointment.doctor_name],
      ["CRM", appointment.doctor_crm || "Não informado"],
      ["Status", appointment.status],
      ["Tipo", appointment.appointment_type || "Consulta"],
      ["Queixa", appointment.chief_complaint || "Não informado"],
      ["Diagnóstico CID", appointment.diagnosis_code || "Não informado"],
      ["Observações", appointment.notes || "Nenhuma"],
    ]
      .map((row) => row.join(","))
      .join("\n")

    return { success: true, csv, appointment }
  } catch (error: any) {
    console.error("[v0] Export Excel error:", error)
    return { error: error.message }
  }
}
