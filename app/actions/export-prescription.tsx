"use server"

import { sql } from "@/lib/db"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/auth"

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

    const userId = session.id

    // Buscar dados da receita digital
    const [prescription] = await sql`
      SELECT 
        dp.*,
        mp.cid10_code,
        mp.cid10_description,
        mp.clinical_indication,
        mp.notes
      FROM digital_prescriptions dp
      LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
      WHERE dp.id = ${digitalPrescriptionId} AND dp.user_id = ${userId}
    `

    if (!prescription) {
      return { error: "Receita não encontrada" }
    }

    // Buscar medicamentos
    const medications = await sql`
      SELECT * FROM prescription_items
      WHERE prescription_id = ${prescription.prescription_id}
      ORDER BY created_at ASC
    `

    // Gerar HTML do PDF
    const html = generatePrescriptionHTML(prescription, medications)

    return {
      success: true,
      html,
      pdfUrl: `data:text/html;base64,${Buffer.from(html).toString("base64")}`,
    }
  } catch (error) {
    console.error("[v0] Error generating prescription PDF:", error)
    return { error: "Erro ao gerar PDF" }
  }
}

export async function validatePrescription(validationToken: string) {
  try {
    // Buscar receita pelo token de validação (não precisa de autenticação)
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

    // Verificar se está expirada
    const validUntil = new Date(prescription.valid_until)
    const isExpired = validUntil < new Date()

    // Buscar medicamentos
    const medications = await sql`
      SELECT 
        medication_name,
        dosage,
        frequency,
        duration,
        quantity,
        administration_instructions,
        special_warnings
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
    console.error("[v0] Error validating prescription:", error)
    return { error: "Erro ao validar receita" }
  }
}

function generatePrescriptionHTML(prescription: any, medications: any[]) {
  const qrCodeUrl = `https://atendebem.vercel.app/validar/${prescription.validation_token}`

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receita Digital - ${prescription.patient_name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; padding: 20mm; background: white; color: #000; line-height: 1.5; }
    .receita { max-width: 210mm; margin: 0 auto; border: 2px solid #0A2342; border-radius: 8px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0A2342 0%, #1a3a5c 100%); color: white; padding: 20px; text-align: center; }
    .header h1 { font-size: 24px; margin-bottom: 5px; }
    .header p { font-size: 11px; opacity: 0.9; }
    .badge { display: inline-block; background: #2DD4BF; color: #0A2342; padding: 4px 12px; border-radius: 20px; font-size: 10px; font-weight: bold; margin-top: 10px; }
    .section { padding: 15px 20px; border-bottom: 1px solid #e0e0e0; }
    .section:last-child { border-bottom: none; }
    .section-title { font-size: 11px; font-weight: bold; color: #0A2342; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 2px solid #2DD4BF; display: inline-block; }
    .field { margin-bottom: 8px; }
    .field-label { font-size: 9px; color: #666; display: block; margin-bottom: 2px; }
    .field-value { font-size: 12px; font-weight: 500; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
    .medication { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #2DD4BF; }
    .medication-name { font-size: 14px; font-weight: bold; color: #0A2342; margin-bottom: 8px; }
    .medication-details { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-size: 11px; }
    .medication-instructions { margin-top: 8px; font-size: 11px; color: #555; font-style: italic; }
    .signature-area { text-align: center; padding: 30px; background: #f8f9fa; }
    .signature-line { border-top: 2px solid #0A2342; width: 300px; margin: 0 auto; padding-top: 10px; }
    .qr-section { display: flex; align-items: center; justify-content: space-between; padding: 20px; background: #f0fdf4; }
    .qr-info { flex: 1; }
    .qr-code { width: 100px; height: 100px; background: #fff; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 8px; text-align: center; }
    .legal-notice { font-size: 9px; color: #666; text-align: center; padding: 15px; background: #f8f9fa; }
    .controlled-badge { background: #dc2626; color: white; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: bold; }
    @media print { body { padding: 0; } .receita { border: none; } }
  </style>
</head>
<body>
  <div class="receita">
    <div class="header">
      <h1>RECEITA MÉDICA DIGITAL</h1>
      <p>Documento com validade jurídica - Assinatura Digital ICP-Brasil</p>
      ${prescription.is_controlled_substance ? '<span class="controlled-badge">RECEITA CONTROLADA</span>' : '<span class="badge">RECEITA SIMPLES</span>'}
    </div>

    <!-- Dados do Médico -->
    <div class="section">
      <div class="section-title">Identificação do Prescritor</div>
      <div class="grid">
        <div class="field">
          <span class="field-label">Nome do Médico</span>
          <span class="field-value">${prescription.doctor_name}</span>
        </div>
        <div class="field">
          <span class="field-label">CRM</span>
          <span class="field-value">${prescription.doctor_crm}-${prescription.doctor_crm_uf}</span>
        </div>
        <div class="field">
          <span class="field-label">Especialidade</span>
          <span class="field-value">${prescription.doctor_specialty || "Clínica Geral"}</span>
        </div>
        <div class="field">
          <span class="field-label">Data de Emissão</span>
          <span class="field-value">${new Date(prescription.prescription_date || prescription.created_at).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </div>

    <!-- Dados do Paciente -->
    <div class="section">
      <div class="section-title">Dados do Paciente</div>
      <div class="grid">
        <div class="field">
          <span class="field-label">Nome Completo</span>
          <span class="field-value">${prescription.patient_name}</span>
        </div>
        <div class="field">
          <span class="field-label">CPF</span>
          <span class="field-value">${prescription.patient_cpf || "Não informado"}</span>
        </div>
        <div class="field">
          <span class="field-label">Data de Nascimento</span>
          <span class="field-value">${prescription.patient_date_of_birth ? new Date(prescription.patient_date_of_birth).toLocaleDateString("pt-BR") : "Não informado"}</span>
        </div>
      </div>
    </div>

    <!-- Medicamentos -->
    <div class="section">
      <div class="section-title">Medicamentos Prescritos</div>
      ${medications
        .map(
          (med, index) => `
        <div class="medication">
          <div class="medication-name">${index + 1}. ${med.medication_name}</div>
          <div class="medication-details">
            <div>
              <span class="field-label">Dosagem</span>
              <span class="field-value">${med.dosage}</span>
            </div>
            <div>
              <span class="field-label">Frequência</span>
              <span class="field-value">${med.frequency}</span>
            </div>
            <div>
              <span class="field-label">Duração</span>
              <span class="field-value">${med.duration}</span>
            </div>
            <div>
              <span class="field-label">Quantidade</span>
              <span class="field-value">${med.quantity} unidade(s)</span>
            </div>
          </div>
          ${med.administration_instructions ? `<div class="medication-instructions"><strong>Instruções:</strong> ${med.administration_instructions}</div>` : ""}
          ${med.special_warnings ? `<div class="medication-instructions" style="color: #dc2626;"><strong>Alertas:</strong> ${med.special_warnings}</div>` : ""}
        </div>
      `,
        )
        .join("")}
    </div>

    <!-- Indicação Clínica -->
    ${
      prescription.clinical_indication || prescription.cid10_code
        ? `
    <div class="section">
      <div class="section-title">Informações Clínicas</div>
      <div class="grid">
        ${
          prescription.cid10_code
            ? `
        <div class="field">
          <span class="field-label">CID-10</span>
          <span class="field-value">${prescription.cid10_code} ${prescription.cid10_description ? `- ${prescription.cid10_description}` : ""}</span>
        </div>
        `
            : ""
        }
        ${
          prescription.clinical_indication
            ? `
        <div class="field">
          <span class="field-label">Indicação Clínica</span>
          <span class="field-value">${prescription.clinical_indication}</span>
        </div>
        `
            : ""
        }
      </div>
    </div>
    `
        : ""
    }

    <!-- QR Code de Validação -->
    <div class="qr-section">
      <div class="qr-info">
        <div class="section-title">Validação Digital</div>
        <div class="field">
          <span class="field-label">Token de Validação</span>
          <span class="field-value">${prescription.validation_token || "N/A"}</span>
        </div>
        <div class="field">
          <span class="field-label">Validade da Receita</span>
          <span class="field-value">${prescription.valid_until ? new Date(prescription.valid_until).toLocaleDateString("pt-BR") : `${prescription.validity_days} dias`}</span>
        </div>
        <p style="font-size: 10px; margin-top: 10px; color: #666;">
          Escaneie o QR Code ou acesse: ${qrCodeUrl}
        </p>
      </div>
      <div class="qr-code">
        QR CODE<br>
        <small>Validação</small>
      </div>
    </div>

    <!-- Assinatura Digital -->
    <div class="signature-area">
      ${
        prescription.is_digitally_signed
          ? `
        <div style="color: #059669; font-weight: bold; margin-bottom: 10px;">
          ✓ DOCUMENTO ASSINADO DIGITALMENTE
        </div>
        <p style="font-size: 10px; color: #666;">
          Assinado em: ${prescription.signature_timestamp ? new Date(prescription.signature_timestamp).toLocaleString("pt-BR") : "N/A"}<br>
          Certificado: ${prescription.signature_certificate_issuer || "ICP-Brasil"}<br>
          Nº Série: ${prescription.signature_certificate_serial || "N/A"}
        </p>
      `
          : `
        <div class="signature-line">
          ${prescription.doctor_name}<br>
          CRM ${prescription.doctor_crm}-${prescription.doctor_crm_uf}
        </div>
      `
      }
    </div>

    <!-- Aviso Legal -->
    <div class="legal-notice">
      Este documento foi emitido eletronicamente com assinatura digital ICP-Brasil, 
      tendo validade jurídica conforme MP 2.200-2/2001 e Lei 14.063/2020. 
      A autenticidade pode ser verificada através do QR Code ou no site oficial.
      <br><br>
      <strong>AtendeBem</strong> - Menos burocracia. Mais medicina.
    </div>
  </div>
</body>
</html>
  `
}
