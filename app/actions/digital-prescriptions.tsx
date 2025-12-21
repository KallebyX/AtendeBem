"use server"

import { getCurrentUser } from "@/lib/session"
import { getDb } from "@/lib/db"
import { randomBytes } from "crypto"

export async function getDigitalPrescriptions() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    const prescriptions = await db`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      WHERE dp.user_id = ${user.id}
      ORDER BY dp.created_at DESC
      LIMIT 100
    `

    return { success: true, prescriptions }
  } catch (error: any) {
    console.error("[v0] Error fetching digital prescriptions:", error)
    return { success: false, error: error.message }
  }
}

export async function createDigitalPrescription(data: {
  patientId: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions?: string
  }>
  notes?: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    if (!data.patientId || !data.medications || data.medications.length === 0) {
      return { success: false, error: "Dados incompletos" }
    }

    const validationToken = randomBytes(32).toString("hex")

    const result = await db`
      INSERT INTO digital_prescriptions (
        user_id,
        patient_id,
        medications,
        notes,
        validation_token,
        status
      ) VALUES (
        ${user.id},
        ${data.patientId},
        ${JSON.stringify(data.medications)},
        ${data.notes || null},
        ${validationToken},
        'pending'
      )
      RETURNING *
    `

    return {
      success: true,
      prescription: result[0],
      validationToken,
    }
  } catch (error: any) {
    console.error("[v0] Error creating digital prescription:", error)
    return { success: false, error: error.message }
  }
}

export async function validatePrescription(token: string) {
  try {
    const db = await getDb()

    const prescriptions = await db`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        u.name as doctor_name,
        u.crm,
        u.crm_uf
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.validation_token = ${token}
    `

    if (prescriptions.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = prescriptions[0]

    await db`
      UPDATE digital_prescriptions
      SET 
        validated_at = NOW(),
        validation_count = validation_count + 1
      WHERE id = ${prescription.id}
    `

    return { success: true, prescription }
  } catch (error: any) {
    console.error("[v0] Error validating prescription:", error)
    return { success: false, error: error.message }
  }
}

export async function signDigitalPrescription(data: {
  prescriptionId: string
  signature: string
  certificateData?: any
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    const prescriptions = await db`
      SELECT * FROM digital_prescriptions
      WHERE id = ${data.prescriptionId} AND user_id = ${user.id}
    `

    if (prescriptions.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    await db`
      UPDATE digital_prescriptions
      SET 
        signature_data = ${data.signature},
        certificate_data = ${JSON.stringify(data.certificateData || {})},
        signed_at = NOW(),
        status = 'signed'
      WHERE id = ${data.prescriptionId}
    `

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error signing prescription:", error)
    return { success: false, error: error.message }
  }
}

export async function generatePrescriptionPDF(prescriptionId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    const prescriptions = await db`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.birth_date,
        u.name as doctor_name,
        u.crm,
        u.crm_uf
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.id = ${prescriptionId} AND dp.user_id = ${user.id}
    `

    if (prescriptions.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = prescriptions[0]
    const medications = JSON.parse(prescription.medications)

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Receita Digital - ${prescription.patient_name}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; }
    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
    .section { margin: 20px 0; }
    .medication { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .footer { margin-top: 40px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>RECEITA MÉDICA DIGITAL</h1>
    <p><strong>Dr(a). ${prescription.doctor_name}</strong></p>
    <p>CRM: ${prescription.crm} - ${prescription.crm_uf}</p>
  </div>

  <div class="section">
    <p><strong>Paciente:</strong> ${prescription.patient_name}</p>
    <p><strong>CPF:</strong> ${prescription.patient_cpf || "N/A"}</p>
    <p><strong>Data:</strong> ${new Date(prescription.created_at).toLocaleDateString("pt-BR")}</p>
  </div>

  <div class="section">
    <h3>MEDICAMENTOS PRESCRITOS:</h3>
    ${medications
      .map(
        (med: any, index: number) => `
      <div class="medication">
        <p><strong>${index + 1}. ${med.name}</strong></p>
        <p>Dosagem: ${med.dosage}</p>
        <p>Frequência: ${med.frequency}</p>
        <p>Duração: ${med.duration}</p>
        ${med.instructions ? `<p>Instruções: ${med.instructions}</p>` : ""}
      </div>
    `,
      )
      .join("")}
  </div>

  ${
    prescription.notes
      ? `
  <div class="section">
    <h3>OBSERVAÇÕES:</h3>
    <p>${prescription.notes}</p>
  </div>
  `
      : ""
  }

  <div class="footer">
    <p>Token de Validação: ${prescription.validation_token}</p>
    <p>Valide esta receita em: https://www.atendebem.io/validar/${prescription.validation_token}</p>
    <p>Receita gerada digitalmente em ${new Date().toLocaleString("pt-BR")}</p>
  </div>
</body>
</html>
    `

    return { success: true, html }
  } catch (error: any) {
    console.error("[v0] Error generating prescription PDF:", error)
    return { success: false, error: error.message }
  }
}
