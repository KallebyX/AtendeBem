"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser, getUserFromToken } from "@/lib/session"
import { nanoid } from "nanoid"

export async function getDigitalPrescriptions() {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "Não autenticado" }
  }

  const db = getDb()

  try {
    const result = await db.query(
      `SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        u.name as doctor_name
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.doctor_id = u.id
      WHERE dp.user_id = $1
      ORDER BY dp.created_at DESC`,
      [user.id],
    )

    return { success: true, prescriptions: result.rows }
  } catch (error) {
    console.error("[v0] Error fetching digital prescriptions:", error)
    return { success: false, error: "Erro ao buscar receitas" }
  }
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
  diagnosis?: string
  notes?: string
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "Não autenticado" }
  }

  const db = getDb()

  try {
    const validationToken = nanoid(32)

    const result = await db.query(
      `INSERT INTO digital_prescriptions (
        user_id,
        doctor_id,
        patient_id,
        medications,
        diagnosis,
        notes,
        validation_token,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING *`,
      [
        user.id,
        user.id,
        data.patient_id,
        JSON.stringify(data.medications),
        data.diagnosis || null,
        data.notes || null,
        validationToken,
      ],
    )

    return {
      success: true,
      prescription: result.rows[0],
      validationToken,
    }
  } catch (error) {
    console.error("[v0] Error creating digital prescription:", error)
    return { success: false, error: "Erro ao criar receita" }
  }
}

export async function validatePrescription(token: string) {
  const db = getDb()

  try {
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
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.doctor_id = u.id
      WHERE dp.validation_token = $1`,
      [token],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = result.rows[0]

    // Parse medications JSON
    prescription.medications = JSON.parse(prescription.medications)

    return { success: true, prescription }
  } catch (error) {
    console.error("[v0] Error validating prescription:", error)
    return { success: false, error: "Erro ao validar receita" }
  }
}

export async function signDigitalPrescription(prescriptionId: string, signature: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { success: false, error: "Não autenticado" }
  }

  const db = getDb()

  try {
    const result = await db.query(
      `UPDATE digital_prescriptions 
      SET 
        signature = $1,
        signed_at = NOW(),
        status = 'signed'
      WHERE id = $2 AND doctor_id = $3
      RETURNING *`,
      [signature, prescriptionId, user.id],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "Receita não encontrada ou sem permissão" }
    }

    return { success: true, prescription: result.rows[0] }
  } catch (error) {
    console.error("[v0] Error signing prescription:", error)
    return { success: false, error: "Erro ao assinar receita" }
  }
}

export async function generatePrescriptionPDF(prescriptionId: string) {
  const user = await getUserFromToken()
  if (!user) {
    return { success: false, error: "Não autenticado" }
  }

  const db = getDb()

  try {
    const result = await db.query(
      `SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.birth_date as patient_birth_date,
        p.address as patient_address,
        u.name as doctor_name,
        u.crm as doctor_crm,
        u.email as doctor_email
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.doctor_id = u.id
      WHERE dp.id = $1 AND dp.user_id = $2`,
      [prescriptionId, user.id],
    )

    if (result.rows.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = result.rows[0]
    const medications = JSON.parse(prescription.medications)

    // Generate HTML for PDF
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Receita Digital - ${prescription.patient_name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0066cc; padding-bottom: 20px; }
          .header h1 { color: #0066cc; margin: 0; }
          .section { margin: 30px 0; }
          .section h2 { color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
          .info-row { margin: 10px 0; }
          .label { font-weight: bold; color: #555; display: inline-block; width: 150px; }
          .medications { background: #f9f9f9; padding: 20px; border-radius: 8px; }
          .medication { margin: 20px 0; padding: 15px; background: white; border-left: 4px solid #0066cc; }
          .medication-name { font-weight: bold; font-size: 18px; color: #0066cc; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
          .signature { margin-top: 60px; text-align: center; }
          .signature-line { border-top: 1px solid #333; width: 300px; margin: 0 auto; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Receita Digital</h1>
          <p>Data: ${new Date(prescription.created_at).toLocaleDateString("pt-BR")}</p>
        </div>

        <div class="section">
          <h2>Dados do Paciente</h2>
          <div class="info-row"><span class="label">Nome:</span> ${prescription.patient_name}</div>
          <div class="info-row"><span class="label">CPF:</span> ${prescription.patient_cpf || "N/A"}</div>
          <div class="info-row"><span class="label">Data Nascimento:</span> ${prescription.patient_birth_date ? new Date(prescription.patient_birth_date).toLocaleDateString("pt-BR") : "N/A"}</div>
        </div>

        <div class="section">
          <h2>Dados do Médico</h2>
          <div class="info-row"><span class="label">Nome:</span> ${prescription.doctor_name}</div>
          <div class="info-row"><span class="label">CRM:</span> ${prescription.doctor_crm || "N/A"}</div>
        </div>

        ${
          prescription.diagnosis
            ? `
        <div class="section">
          <h2>Diagnóstico</h2>
          <p>${prescription.diagnosis}</p>
        </div>
        `
            : ""
        }

        <div class="section">
          <h2>Medicamentos Prescritos</h2>
          <div class="medications">
            ${medications
              .map(
                (med: any, index: number) => `
              <div class="medication">
                <div class="medication-name">${index + 1}. ${med.name}</div>
                <div style="margin-top: 10px;">
                  <div><strong>Dosagem:</strong> ${med.dosage}</div>
                  <div><strong>Frequência:</strong> ${med.frequency}</div>
                  <div><strong>Duração:</strong> ${med.duration}</div>
                  ${med.instructions ? `<div><strong>Instruções:</strong> ${med.instructions}</div>` : ""}
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        ${
          prescription.notes
            ? `
        <div class="section">
          <h2>Observações</h2>
          <p>${prescription.notes}</p>
        </div>
        `
            : ""
        }

        <div class="signature">
          <div class="signature-line">
            ${prescription.doctor_name}<br>
            CRM: ${prescription.doctor_crm || "N/A"}
          </div>
        </div>

        <div class="footer">
          <p>Receita Digital - Token de Validação: ${prescription.validation_token}</p>
          <p>Este documento pode ser validado em: ${process.env.NEXT_PUBLIC_APP_URL || "https://atendebem.io"}/validar/${prescription.validation_token}</p>
        </div>
      </body>
      </html>
    `

    return { success: true, html }
  } catch (error) {
    console.error("[v0] Error generating prescription PDF:", error)
    return { success: false, error: "Erro ao gerar PDF" }
  }
}
