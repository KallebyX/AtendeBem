"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function getDigitalPrescriptions() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Não autorizado")
  }

  const db = getDb()

  const result = await db.query(
    `SELECT 
      dp.*,
      p.name as patient_name,
      p.cpf as patient_cpf,
      u.name as doctor_name,
      u.crm as doctor_crm
    FROM digital_prescriptions dp
    JOIN patients p ON dp.patient_id = p.id
    JOIN users u ON dp.doctor_id = u.id
    WHERE dp.user_id = $1
    ORDER BY dp.created_at DESC`,
    [user.id],
  )

  return { success: true, prescriptions: result.rows }
}

export async function createDigitalPrescription(data: {
  patient_id: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }>
  notes?: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Não autorizado")
  }

  const db = getDb()

  const result = await db.query(
    `INSERT INTO digital_prescriptions (
      user_id,
      doctor_id,
      patient_id,
      medications,
      notes,
      status
    ) VALUES ($1, $2, $3, $4, $5, 'active')
    RETURNING *`,
    [user.id, user.id, data.patient_id, JSON.stringify(data.medications), data.notes],
  )

  revalidatePath("/receitas")

  return { success: true, prescription: result.rows[0] }
}

export async function validatePrescription(token: string) {
  const db = getDb()

  const result = await db.query(
    `SELECT 
      dp.*,
      p.name as patient_name,
      p.cpf as patient_cpf,
      p.birth_date as patient_birth_date,
      u.name as doctor_name,
      u.crm as doctor_crm,
      u.email as doctor_email
    FROM digital_prescriptions dp
    JOIN patients p ON dp.patient_id = p.id
    JOIN users u ON dp.doctor_id = u.id
    WHERE dp.validation_token = $1`,
    [token],
  )

  if (result.rows.length === 0) {
    return { success: false, error: "Receita não encontrada" }
  }

  const prescription = result.rows[0]

  if (prescription.status === "cancelled") {
    return { success: false, error: "Receita cancelada" }
  }

  if (prescription.expires_at && new Date(prescription.expires_at) < new Date()) {
    return { success: false, error: "Receita expirada" }
  }

  return { success: true, prescription }
}

export async function signDigitalPrescription(prescriptionId: string, signature: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Não autorizado")
  }

  const db = getDb()

  const result = await db.query(
    `UPDATE digital_prescriptions
    SET 
      signed = true,
      signed_at = NOW(),
      signature = $1
    WHERE id = $2 AND doctor_id = $3
    RETURNING *`,
    [signature, prescriptionId, user.id],
  )

  if (result.rows.length === 0) {
    throw new Error("Receita não encontrada")
  }

  revalidatePath("/receitas")

  return { success: true, prescription: result.rows[0] }
}

export async function generatePrescriptionPDF(prescriptionId: string) {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Não autorizado")
  }

  const db = getDb()

  const result = await db.query(
    `SELECT 
      dp.*,
      p.name as patient_name,
      p.cpf as patient_cpf,
      p.birth_date as patient_birth_date,
      u.name as doctor_name,
      u.crm as doctor_crm
    FROM digital_prescriptions dp
    JOIN patients p ON dp.patient_id = p.id
    JOIN users u ON dp.doctor_id = u.id
    WHERE dp.id = $1 AND dp.user_id = $2`,
    [prescriptionId, user.id],
  )

  if (result.rows.length === 0) {
    throw new Error("Receita não encontrada")
  }

  const prescription = result.rows[0]
  const medications = JSON.parse(prescription.medications)

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Receita Médica - ${prescription.patient_name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; }
        .section { margin: 25px 0; }
        .label { font-weight: bold; color: #333; display: inline-block; width: 150px; }
        .medication { background: #f8fafc; padding: 15px; margin: 10px 0; border-left: 4px solid #2563eb; border-radius: 4px; }
        .medication-name { font-weight: bold; font-size: 18px; color: #1e40af; margin-bottom: 8px; }
        .footer { margin-top: 50px; text-align: center; border-top: 2px solid #e5e7eb; padding-top: 20px; }
        .signature { margin-top: 60px; text-align: center; }
        .signature-line { border-top: 2px solid #333; width: 300px; margin: 0 auto; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Receita Médica Digital</h1>
        <p>Data de Emissão: ${new Date(prescription.created_at).toLocaleDateString("pt-BR")}</p>
      </div>
      
      <div class="section">
        <p><span class="label">Paciente:</span> ${prescription.patient_name}</p>
        <p><span class="label">CPF:</span> ${prescription.patient_cpf || "Não informado"}</p>
        <p><span class="label">Data de Nascimento:</span> ${prescription.patient_birth_date ? new Date(prescription.patient_birth_date).toLocaleDateString("pt-BR") : "Não informado"}</p>
      </div>

      <div class="section">
        <h2>Medicações Prescritas</h2>
        ${medications
          .map(
            (med: any, index: number) => `
          <div class="medication">
            <div class="medication-name">${index + 1}. ${med.name}</div>
            <p><span class="label">Dosagem:</span> ${med.dosage}</p>
            <p><span class="label">Frequência:</span> ${med.frequency}</p>
            <p><span class="label">Duração:</span> ${med.duration}</p>
            ${med.instructions ? `<p><span class="label">Instruções:</span> ${med.instructions}</p>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>

      ${
        prescription.notes
          ? `
      <div class="section">
        <h3>Observações</h3>
        <p>${prescription.notes}</p>
      </div>
      `
          : ""
      }

      <div class="signature">
        <div class="signature-line">
          <strong>${prescription.doctor_name}</strong><br>
          CRM: ${prescription.doctor_crm || "Não informado"}<br>
          ${prescription.signed ? "Assinatura Digital Certificada" : "Aguardando Assinatura"}
        </div>
      </div>

      <div class="footer">
        <p><small>Documento gerado eletronicamente - AtendeBem</small></p>
        ${prescription.validation_token ? `<p><small>Token de Validação: ${prescription.validation_token}</small></p>` : ""}
      </div>
    </body>
    </html>
  `

  return { success: true, html }
}
