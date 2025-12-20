"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function exportAppointmentPDF(appointmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Não autorizado")
  }

  const db = getDb()

  const appointment = await db.query(
    `SELECT 
      a.*,
      p.name as patient_name,
      p.cpf as patient_cpf,
      p.birth_date as patient_birth_date,
      u.name as doctor_name,
      u.crm
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN users u ON a.doctor_id = u.id
    WHERE a.id = $1 AND a.user_id = $2`,
    [appointmentId, user.id],
  )

  if (appointment.rows.length === 0) {
    throw new Error("Consulta não encontrada")
  }

  const data = appointment.rows[0]

  const procedures = await db.query(`SELECT * FROM appointment_procedures WHERE appointment_id = $1`, [appointmentId])

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Consulta - ${data.patient_name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
        .section { margin: 20px 0; }
        .label { font-weight: bold; color: #555; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Relatório de Consulta</h1>
        <p>Data: ${new Date(data.date).toLocaleDateString("pt-BR")}</p>
      </div>
      
      <div class="section">
        <h2>Dados do Paciente</h2>
        <p><span class="label">Nome:</span> ${data.patient_name}</p>
        <p><span class="label">CPF:</span> ${data.patient_cpf || "Não informado"}</p>
        <p><span class="label">Data de Nascimento:</span> ${data.patient_birth_date ? new Date(data.patient_birth_date).toLocaleDateString("pt-BR") : "Não informado"}</p>
      </div>

      <div class="section">
        <h2>Dados da Consulta</h2>
        <p><span class="label">Médico:</span> ${data.doctor_name}</p>
        <p><span class="label">CRM:</span> ${data.crm || "Não informado"}</p>
        <p><span class="label">Tipo:</span> ${data.type}</p>
        <p><span class="label">Status:</span> ${data.status}</p>
      </div>

      ${
        procedures.rows.length > 0
          ? `
      <div class="section">
        <h2>Procedimentos TUSS</h2>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${procedures.rows
              .map(
                (proc) => `
              <tr>
                <td>${proc.tuss_code}</td>
                <td>${proc.description}</td>
                <td>${proc.quantity}</td>
                <td>R$ ${Number.parseFloat(proc.unit_price || 0).toFixed(2)}</td>
                <td>R$ ${(Number.parseFloat(proc.unit_price || 0) * proc.quantity).toFixed(2)}</td>
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
}

export async function exportAppointmentExcel(appointmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Não autorizado")
  }

  const db = getDb()

  const appointment = await db.query(
    `SELECT 
      a.*,
      p.name as patient_name,
      p.cpf as patient_cpf,
      u.name as doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN users u ON a.doctor_id = u.id
    WHERE a.id = $1 AND a.user_id = $2`,
    [appointmentId, user.id],
  )

  if (appointment.rows.length === 0) {
    throw new Error("Consulta não encontrada")
  }

  const data = appointment.rows[0]

  const procedures = await db.query(`SELECT * FROM appointment_procedures WHERE appointment_id = $1`, [appointmentId])

  let csv = "Código TUSS,Descrição,Quantidade,Valor Unitário,Total\n"

  procedures.rows.forEach((proc) => {
    const total = Number.parseFloat(proc.unit_price || 0) * proc.quantity
    csv += `"${proc.tuss_code}","${proc.description}",${proc.quantity},${Number.parseFloat(proc.unit_price || 0).toFixed(2)},${total.toFixed(2)}\n`
  })

  return {
    success: true,
    csv,
    filename: `consulta-${data.patient_name.replace(/\s/g, "-")}-${new Date().toISOString().split("T")[0]}.csv`,
  }
}
