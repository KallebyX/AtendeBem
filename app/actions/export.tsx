"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function exportAppointmentPDF(appointmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "Não autenticado" }
  }

  const db = getDb()

  try {
    const appointment = await db.query(
      `SELECT 
        a.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.birth_date as patient_birth_date,
        u.name as doctor_name,
        u.crm as doctor_crm
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.doctor_id = u.id
      WHERE a.id = $1 AND a.user_id = $2`,
      [appointmentId, user.id],
    )

    if (appointment.rows.length === 0) {
      return { success: false, error: "Consulta não encontrada" }
    }

    const data = appointment.rows[0]

    // Generate HTML for PDF (browser will handle printing)
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Consulta - ${data.patient_name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .section { margin: 20px 0; }
          .label { font-weight: bold; color: #555; }
          .value { margin-left: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Relatório de Consulta</h1>
          <p>Data: ${new Date(data.date).toLocaleDateString("pt-BR")}</p>
        </div>
        <div class="section">
          <h2>Dados do Paciente</h2>
          <p><span class="label">Nome:</span><span class="value">${data.patient_name}</span></p>
          <p><span class="label">CPF:</span><span class="value">${data.patient_cpf || "N/A"}</span></p>
          <p><span class="label">Data Nascimento:</span><span class="value">${data.patient_birth_date ? new Date(data.patient_birth_date).toLocaleDateString("pt-BR") : "N/A"}</span></p>
        </div>
        <div class="section">
          <h2>Dados da Consulta</h2>
          <p><span class="label">Médico:</span><span class="value">${data.doctor_name}</span></p>
          <p><span class="label">CRM:</span><span class="value">${data.doctor_crm || "N/A"}</span></p>
          <p><span class="label">Data/Hora:</span><span class="value">${new Date(data.date).toLocaleString("pt-BR")}</span></p>
          <p><span class="label">Status:</span><span class="value">${data.status}</span></p>
        </div>
        ${
          data.notes
            ? `
        <div class="section">
          <h2>Observações</h2>
          <p>${data.notes}</p>
        </div>
        `
            : ""
        }
      </body>
      </html>
    `

    return { success: true, html }
  } catch (error) {
    console.error("[v0] Error exporting appointment PDF:", error)
    return { success: false, error: "Erro ao exportar PDF" }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "Não autenticado" }
  }

  const db = getDb()

  try {
    const appointment = await db.query(
      `SELECT 
        a.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        u.name as doctor_name,
        u.crm as doctor_crm
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.doctor_id = u.id
      WHERE a.id = $1 AND a.user_id = $2`,
      [appointmentId, user.id],
    )

    if (appointment.rows.length === 0) {
      return { success: false, error: "Consulta não encontrada" }
    }

    const data = appointment.rows[0]

    // Generate CSV format
    const csv = [
      ["Campo", "Valor"],
      ["Paciente", data.patient_name],
      ["CPF", data.patient_cpf || "N/A"],
      ["Médico", data.doctor_name],
      ["CRM", data.doctor_crm || "N/A"],
      ["Data", new Date(data.date).toLocaleString("pt-BR")],
      ["Status", data.status],
      ["Observações", data.notes || "N/A"],
    ]
      .map((row) => row.join(","))
      .join("\n")

    return { success: true, csv, filename: `consulta-${appointmentId}.csv` }
  } catch (error) {
    console.error("[v0] Error exporting appointment Excel:", error)
    return { success: false, error: "Erro ao exportar Excel" }
  }
}
