"use server"

import { getDb } from "@/lib/db"
import { setUserContext } from "@/lib/db-init"

export async function generatePrescriptionPDF(prescriptionId: string) {
  console.log("[v0] Generate prescription PDF:", prescriptionId)

  try {
    await setUserContext()
    const sql = await getDb()

    const result = await sql`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.date_of_birth as patient_dob,
        u.name as doctor_name,
        u.crm as doctor_crm,
        u.email as doctor_email
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.id = ${prescriptionId}
      AND dp.user_id = current_setting('app.current_user_id', true)::uuid
    `

    if (result.length === 0) {
      return { error: "Receita não encontrada" }
    }

    const prescription = result[0]

    // Generate HTML for PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Times New Roman', serif; margin: 40px; color: #000; }
          .header { text-align: center; border-bottom: 3px double #000; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; }
          .doctor-info { text-align: center; margin: 15px 0; font-size: 14px; }
          .patient-section { margin: 30px 0; padding: 15px; border: 1px solid #000; }
          .patient-section h2 { margin-top: 0; font-size: 16px; }
          .prescription-body { margin: 30px 0; min-height: 300px; }
          .prescription-body h3 { font-size: 18px; text-align: center; margin-bottom: 20px; }
          .medication { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #333; }
          .medication-name { font-weight: bold; font-size: 16px; }
          .footer { margin-top: 50px; text-align: center; }
          .signature-line { border-top: 1px solid #000; width: 300px; margin: 40px auto 10px auto; }
          .qr-code { text-align: center; margin: 30px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RECEITA MÉDICA DIGITAL</h1>
          <div class="doctor-info">
            <strong>${prescription.doctor_name}</strong><br>
            CRM: ${prescription.doctor_crm || "Não informado"}<br>
            ${prescription.doctor_email}
          </div>
        </div>
        
        <div class="patient-section">
          <h2>Dados do Paciente</h2>
          <p><strong>Nome:</strong> ${prescription.patient_name}</p>
          <p><strong>CPF:</strong> ${prescription.patient_cpf || "Não informado"}</p>
          <p><strong>Data de Nascimento:</strong> ${prescription.patient_dob ? new Date(prescription.patient_dob).toLocaleDateString("pt-BR") : "Não informado"}</p>
        </div>
        
        <div class="prescription-body">
          <h3>Rp/</h3>
          ${
            prescription.medications
              ? JSON.parse(prescription.medications)
                  .map(
                    (med: any) => `
            <div class="medication">
              <div class="medication-name">${med.name}</div>
              <div><strong>Dosagem:</strong> ${med.dosage}</div>
              <div><strong>Quantidade:</strong> ${med.quantity}</div>
              <div><strong>Posologia:</strong> ${med.instructions}</div>
            </div>
          `,
                  )
                  .join("")
              : "<p>Nenhuma medicação prescrita</p>"
          }
        </div>
        
        ${
          prescription.notes
            ? `
        <div style="margin: 20px 0; padding: 15px; background: #fff3cd; border-left: 3px solid #ffc107;">
          <strong>Observações:</strong><br>
          ${prescription.notes}
        </div>
        `
            : ""
        }
        
        <div class="footer">
          <p>Data de Emissão: ${new Date(prescription.created_at).toLocaleDateString("pt-BR")}</p>
          <p>Validade: ${prescription.valid_until ? new Date(prescription.valid_until).toLocaleDateString("pt-BR") : "30 dias"}</p>
          
          <div class="signature-line"></div>
          <p><strong>${prescription.doctor_name}</strong><br>CRM: ${prescription.doctor_crm}</p>
          
          ${
            prescription.signature_data
              ? `
          <div class="qr-code">
            <p><small>Código de Verificação: ${prescription.id}</small></p>
            <p><small>Assinado digitalmente com certificado ICP-Brasil</small></p>
          </div>
          `
              : ""
          }
        </div>
      </body>
      </html>
    `

    return { success: true, html, prescription }
  } catch (error: any) {
    console.error("[v0] Generate prescription PDF error:", error)
    return { error: error.message }
  }
}

export async function validatePrescription(token: string) {
  console.log("[v0] Validate prescription with token:", token)

  try {
    const sql = await getDb()

    const result = await sql`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        u.name as doctor_name,
        u.crm as doctor_crm
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.id = ${token}
    `

    if (result.length === 0) {
      return { error: "Receita não encontrada ou inválida" }
    }

    const prescription = result[0]

    // Check if prescription is still valid
    if (prescription.valid_until && new Date(prescription.valid_until) < new Date()) {
      return { error: "Receita expirada" }
    }

    return { success: true, prescription }
  } catch (error: any) {
    console.error("[v0] Validate prescription error:", error)
    return { error: error.message }
  }
}
