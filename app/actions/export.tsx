"use server"

import { getDb } from "@/lib/db"

export async function exportAppointmentPDF(appointmentId: string) {
  try {
    const db = await getDb()

    // Get appointment data
    const appointment = await db`
      SELECT 
        a.*,
        p.full_name as patient_name,
        p.cpf as patient_cpf,
        p.phone as patient_phone,
        u.full_name as doctor_name,
        u.crm as doctor_crm,
        u.crm_uf as doctor_crm_uf,
        u.specialty as doctor_specialty
      FROM appointments_schedule a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId}
      LIMIT 1
    `

    if (!appointment || appointment.length === 0) {
      return { error: "Atendimento não encontrado" }
    }

    const data = appointment[0]

    // Get procedures (TUSS codes)
    const procedures = data.procedures ? JSON.parse(data.procedures) : []

    // Generate HTML for PDF
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
    .header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    .header h1 { font-size: 28px; margin-bottom: 10px; }
    .header p { opacity: 0.9; }
    .section { 
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #667eea;
    }
    .section h2 { 
      color: #667eea;
      font-size: 18px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .info-item label { 
      display: block;
      color: #666;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .info-item value { 
      display: block;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
    .procedures-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .procedures-table th {
      background: #667eea;
      color: white;
      padding: 12px;
      text-align: left;
      font-size: 14px;
    }
    .procedures-table td {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
    }
    .procedures-table tr:last-child td { border-bottom: none; }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .badge.confirmed { background: #d4edda; color: #155724; }
    .badge.pending { background: #fff3cd; color: #856404; }
    .badge.cancelled { background: #f8d7da; color: #721c24; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📋 Relatório de Atendimento - TISS 4.0</h1>
    <p>Sistema AtendeBem - Prontuário Eletrônico</p>
  </div>

  <div class="section">
    <h2>👤 Dados do Paciente</h2>
    <div class="info-grid">
      <div class="info-item">
        <label>Nome Completo</label>
        <value>${data.patient_name || "Não informado"}</value>
      </div>
      <div class="info-item">
        <label>CPF</label>
        <value>${data.patient_cpf || "Não informado"}</value>
      </div>
      <div class="info-item">
        <label>Telefone</label>
        <value>${data.patient_phone || "Não informado"}</value>
      </div>
      <div class="info-item">
        <label>Data do Atendimento</label>
        <value>${new Date(data.appointment_date).toLocaleDateString("pt-BR")}</value>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>👨‍⚕️ Dados do Profissional</h2>
    <div class="info-grid">
      <div class="info-item">
        <label>Nome do Médico</label>
        <value>${data.doctor_name || "Não informado"}</value>
      </div>
      <div class="info-item">
        <label>CRM</label>
        <value>${data.doctor_crm || ""}${data.doctor_crm_uf ? "/" + data.doctor_crm_uf : ""}</value>
      </div>
      <div class="info-item">
        <label>Especialidade</label>
        <value>${data.doctor_specialty || "Não informado"}</value>
      </div>
      <div class="info-item">
        <label>Status</label>
        <value><span class="badge ${data.status || "pending"}">${data.status === "confirmed" ? "Confirmado" : data.status === "cancelled" ? "Cancelado" : "Pendente"}</span></value>
      </div>
    </div>
  </div>

  ${
    procedures.length > 0
      ? `
  <div class="section">
    <h2>🏥 Procedimentos Realizados (Tabela TUSS)</h2>
    <table class="procedures-table">
      <thead>
        <tr>
          <th>Código TUSS</th>
          <th>Descrição do Procedimento</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Valor Total</th>
        </tr>
      </thead>
      <tbody>
        ${procedures
          .map(
            (proc: any) => `
          <tr>
            <td><strong>${proc.code}</strong></td>
            <td>${proc.name}</td>
            <td style="text-align: center;">${proc.quantity || 1}</td>
            <td style="text-align: right;">R$ ${(proc.price || 0).toFixed(2)}</td>
            <td style="text-align: right;"><strong>R$ ${((proc.price || 0) * (proc.quantity || 1)).toFixed(2)}</strong></td>
          </tr>
        `,
          )
          .join("")}
        <tr style="background: #f0f0f0; font-weight: bold;">
          <td colspan="4" style="text-align: right; padding-right: 20px;">TOTAL GERAL:</td>
          <td style="text-align: right; color: #667eea; font-size: 18px;">
            R$ ${procedures.reduce((sum: number, p: any) => sum + (p.price || 0) * (p.quantity || 1), 0).toFixed(2)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `
      : ""
  }

  ${
    data.diagnosis
      ? `
  <div class="section">
    <h2>🔍 Diagnóstico</h2>
    <p style="line-height: 1.6; color: #555;">${data.diagnosis}</p>
  </div>
  `
      : ""
  }

  ${
    data.observations
      ? `
  <div class="section">
    <h2>📝 Observações</h2>
    <p style="line-height: 1.6; color: #555;">${data.observations}</p>
  </div>
  `
      : ""
  }

  <div class="footer">
    <p><strong>AtendeBem</strong> - Sistema de Gestão em Saúde</p>
    <p>Documento gerado em ${new Date().toLocaleString("pt-BR")} | Padrão TISS 4.0 - ANS</p>
    <p style="margin-top: 10px;">Este documento possui validade legal conforme legislação vigente</p>
  </div>
</body>
</html>
`

    return { success: true, html }
  } catch (error) {
    console.error("[v0] Export PDF error:", error)
    return { error: "Erro ao gerar PDF" }
  }
}

export async function exportAppointmentExcel(appointmentId: string) {
  try {
    const db = await getDb()

    // Get appointment data
    const appointment = await db`
      SELECT 
        a.*,
        p.full_name as patient_name,
        p.cpf as patient_cpf,
        p.phone as patient_phone,
        u.full_name as doctor_name,
        u.crm as doctor_crm,
        u.crm_uf as doctor_crm_uf,
        u.specialty as doctor_specialty
      FROM appointments_schedule a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.id = ${appointmentId}
      LIMIT 1
    `

    if (!appointment || appointment.length === 0) {
      return { error: "Atendimento não encontrado" }
    }

    const data = appointment[0]
    const procedures = data.procedures ? JSON.parse(data.procedures) : []

    // Generate CSV data
    const csvRows = [
      // Header
      ["RELATÓRIO DE ATENDIMENTO - TISS 4.0"],
      [""],
      ["DADOS DO PACIENTE"],
      ["Nome", data.patient_name || ""],
      ["CPF", data.patient_cpf || ""],
      ["Telefone", data.patient_phone || ""],
      ["Data do Atendimento", new Date(data.appointment_date).toLocaleDateString("pt-BR")],
      [""],
      ["DADOS DO PROFISSIONAL"],
      ["Médico", data.doctor_name || ""],
      ["CRM", `${data.doctor_crm || ""}${data.doctor_crm_uf ? "/" + data.doctor_crm_uf : ""}`],
      ["Especialidade", data.doctor_specialty || ""],
      ["Status", data.status || ""],
      [""],
      ["PROCEDIMENTOS REALIZADOS (TUSS)"],
      ["Código TUSS", "Descrição", "Quantidade", "Valor Unitário", "Valor Total"],
      ...procedures.map((proc: any) => [
        proc.code,
        proc.name,
        proc.quantity || 1,
        `R$ ${(proc.price || 0).toFixed(2)}`,
        `R$ ${((proc.price || 0) * (proc.quantity || 1)).toFixed(2)}`,
      ]),
      [
        "",
        "",
        "",
        "TOTAL:",
        `R$ ${procedures.reduce((sum: number, p: any) => sum + (p.price || 0) * (p.quantity || 1), 0).toFixed(2)}`,
      ],
      [""],
      ["DIAGNÓSTICO"],
      [data.diagnosis || "Não informado"],
      [""],
      ["OBSERVAÇÕES"],
      [data.observations || "Não informado"],
      [""],
      [""],
      [`Documento gerado em ${new Date().toLocaleString("pt-BR")}`],
      ["AtendeBem - Sistema de Gestão em Saúde - Padrão TISS 4.0 ANS"],
    ]

    // Convert to CSV string
    const csv = csvRows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n")

    // Create data URL
    const dataUrl = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`

    return { success: true, csv, dataUrl }
  } catch (error) {
    console.error("[v0] Export Excel error:", error)
    return { error: "Erro ao gerar Excel" }
  }
}
