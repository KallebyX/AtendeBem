"use server"

import { getDb } from "@/lib/db"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"

export async function generatePrescriptionPDF(digitalPrescriptionId: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { error: "Sessão inválida" }
    }

    const sql = await getDb()
    const userId = session.id

    const [prescription] = await sql`
      SELECT 
        dp.*,
        mp.cid10_code,
        mp.cid10_description,
        mp.clinical_indication
      FROM digital_prescriptions dp
      LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
      WHERE dp.id = ${digitalPrescriptionId} AND dp.user_id = ${userId}
    `

    if (!prescription) {
      return { error: "Receita não encontrada" }
    }

    const medications = await sql`
      SELECT * FROM prescription_items
      WHERE prescription_id = ${prescription.prescription_id}
      ORDER BY created_at ASC
    `

    const html = generatePrescriptionHTML(prescription, medications)

    return {
      success: true,
      html,
      pdfUrl: `data:text/html;base64,${Buffer.from(html).toString("base64")}`,
    }
  } catch (error) {
    console.error("Error generating prescription PDF:", error)
    return { error: "Erro ao gerar PDF" }
  }
}

export async function validatePrescription(validationToken: string) {
  try {
    const sql = await getDb()

    const [prescription] = await sql`
      SELECT 
        dp.*,
        mp.cid10_code,
        mp.cid10_description,
        mp.clinical_indication
      FROM digital_prescriptions dp
      LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
      WHERE dp.validation_token = ${validationToken}
    `

    if (!prescription) {
      return { error: "Receita não encontrada ou token inválido" }
    }

    const validUntil = new Date(prescription.valid_until)
    const isExpired = validUntil < new Date()

    const medications = await sql`
      SELECT medication_name, dosage, frequency, duration, quantity, administration_instructions, special_warnings
      FROM prescription_items
      WHERE prescription_id = ${prescription.prescription_id}
      ORDER BY created_at ASC
    `

    return {
      success: true,
      prescription: {
        id: prescription.id,
        doctorName: prescription.doctor_name,
        doctorCrm: prescription.doctor_crm,
        doctorCrmUf: prescription.doctor_crm_uf,
        doctorSpecialty: prescription.doctor_specialty,
        patientName: prescription.patient_name,
        patientCpf: prescription.patient_cpf ? `***.***.${prescription.patient_cpf.slice(-6)}` : null,
        prescriptionDate: prescription.created_at,
        validUntil: prescription.valid_until,
        validityDays: prescription.validity_days,
        isExpired,
        isDigitallySigned: prescription.is_digitally_signed,
        signatureTimestamp: prescription.signature_timestamp,
        signatureCertificateIssuer: prescription.signature_certificate_issuer,
        isControlledSubstance: prescription.is_controlled_substance,
        prescriptionType: prescription.prescription_type,
        status: prescription.status,
        cid10Code: prescription.cid10_code,
        cid10Description: prescription.cid10_description,
        clinicalIndication: prescription.clinical_indication,
        medications: medications.map((med: any) => ({
          name: med.medication_name,
          dosage: med.dosage,
          frequency: med.frequency,
          duration: med.duration,
          quantity: med.quantity,
          instructions: med.administration_instructions,
          warnings: med.special_warnings,
        })),
      },
    }
  } catch (error) {
    console.error("Error validating prescription:", error)
    return { error: "Erro ao validar receita" }
  }
}

function generatePrescriptionHTML(prescription: any, medications: any[]) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Receita Digital - ${prescription.patient_name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; padding: 20mm; background: white; }
    .receita { max-width: 210mm; margin: 0 auto; border: 2px solid #0A2342; border-radius: 8px; overflow: hidden; }
    .header { background: #0A2342; color: white; padding: 20px; text-align: center; }
    .header h1 { font-size: 24px; margin-bottom: 5px; }
    .badge { display: inline-block; background: #2DD4BF; color: #0A2342; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: bold; margin-top: 10px; }
    .section { padding: 15px 20px; border-bottom: 1px solid #e0e0e0; }
    .section-title { font-size: 11px; font-weight: bold; color: #0A2342; text-transform: uppercase; margin-bottom: 10px; border-bottom: 2px solid #2DD4BF; display: inline-block; padding-bottom: 5px; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .field-label { font-size: 9px; color: #666; display: block; margin-bottom: 2px; }
    .field-value { font-size: 12px; font-weight: 500; }
    .medication { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #2DD4BF; }
    .medication-name { font-size: 14px; font-weight: bold; color: #0A2342; margin-bottom: 8px; }
    .medication-details { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size: 11px; }
    .signature-area { text-align: center; padding: 30px; background: #f8f9fa; }
    .signature-line { border-top: 2px solid #0A2342; width: 300px; margin: 0 auto; padding-top: 10px; }
    .legal-notice { font-size: 9px; color: #666; text-align: center; padding: 15px; }
  </style>
</head>
<body>
  <div class="receita">
    <div class="header">
      <h1>RECEITA MÉDICA DIGITAL</h1>
      <p style="font-size: 11px; opacity: 0.9;">Documento com validade jurídica - ICP-Brasil</p>
      <span class="badge">${prescription.is_controlled_substance ? "CONTROLADA" : "SIMPLES"}</span>
    </div>
    <div class="section">
      <div class="section-title">Prescritor</div>
      <div class="grid">
        <div><span class="field-label">Médico</span><span class="field-value">${prescription.doctor_name}</span></div>
        <div><span class="field-label">CRM</span><span class="field-value">${prescription.doctor_crm}-${prescription.doctor_crm_uf}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Paciente</div>
      <div class="grid">
        <div><span class="field-label">Nome</span><span class="field-value">${prescription.patient_name}</span></div>
        <div><span class="field-label">CPF</span><span class="field-value">${prescription.patient_cpf || "N/A"}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">Medicamentos</div>
      ${medications
        .map(
          (med: any, i: number) => `
        <div class="medication">
          <div class="medication-name">${i + 1}. ${med.medication_name}</div>
          <div class="medication-details">
            <div><span class="field-label">Dosagem</span><span class="field-value">${med.dosage}</span></div>
            <div><span class="field-label">Frequência</span><span class="field-value">${med.frequency}</span></div>
            <div><span class="field-label">Duração</span><span class="field-value">${med.duration}</span></div>
            <div><span class="field-label">Quantidade</span><span class="field-value">${med.quantity}</span></div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="signature-area">
      <div class="signature-line">${prescription.doctor_name}<br>CRM ${prescription.doctor_crm}-${prescription.doctor_crm_uf}</div>
    </div>
    <div class="legal-notice">
      Documento emitido com assinatura digital ICP-Brasil conforme MP 2.200-2/2001.<br>
      <strong>AtendeBem</strong> - Menos burocracia. Mais medicina.
    </div>
  </div>
</body>
</html>`
}
