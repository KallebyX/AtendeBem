"use server"

import { cookies } from "next/headers"
import { verifySession } from "@/lib/auth"
import { sql } from "@/lib/db"

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

    // Buscar dados completos da receita
    const prescriptionResult = await sql(
      `SELECT 
        dp.*,
        json_agg(
          json_build_object(
            'medication_name', pi.medication_name,
            'dosage', pi.dosage,
            'frequency', pi.frequency,
            'duration', pi.duration,
            'quantity', pi.quantity,
            'instructions', pi.administration_instructions,
            'warnings', pi.special_warnings
          )
        ) as medications
       FROM digital_prescriptions dp
       JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
       JOIN prescription_items pi ON mp.id = pi.prescription_id
       WHERE dp.id = $1 AND dp.user_id = $2
       GROUP BY dp.id`,
      [digitalPrescriptionId, session.userId],
    )

    if (prescriptionResult.rows.length === 0) {
      return { error: "Receita não encontrada" }
    }

    const prescription = prescriptionResult.rows[0]

    // Gerar HTML do PDF seguindo padrão ANS
    const htmlContent = generatePrescriptionHTML(prescription)

    // TODO: Em produção, usar biblioteca de geração de PDF (ex: puppeteer, pdfkit)
    // Por enquanto, retornamos o HTML que seria convertido

    return {
      success: true,
      pdfUrl: `/api/generate-pdf?id=${digitalPrescriptionId}`,
      htmlContent,
    }
  } catch (error) {
    console.error("[v0] Error generating PDF:", error)
    return { error: "Erro ao gerar PDF" }
  }
}

function generatePrescriptionHTML(prescription: any): string {
  const qrCodeData = `https://atendebem.com.br/validar/${prescription.validation_token}`

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receita Médica Digital - ${prescription.patient_name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      line-height: 1.4;
      padding: 20mm;
      color: #000;
      background: #fff;
    }
    .header {
      border: 2px solid #0A2342;
      padding: 15px;
      margin-bottom: 20px;
      background: #f8fafc;
    }
    .header h1 {
      color: #0A2342;
      font-size: 18px;
      margin-bottom: 10px;
      text-align: center;
    }
    .logo {
      text-align: center;
      margin-bottom: 10px;
    }
    .section {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 15px;
    }
    .section-title {
      font-weight: bold;
      font-size: 14px;
      color: #0A2342;
      margin-bottom: 8px;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
    }
    .field {
      display: flex;
      margin-bottom: 8px;
    }
    .field-label {
      font-weight: bold;
      min-width: 150px;
      color: #333;
    }
    .field-value {
      flex: 1;
      color: #000;
    }
    .medication-item {
      border: 1px solid #ddd;
      padding: 10px;
      margin-bottom: 10px;
      background: #fafafa;
    }
    .medication-item h4 {
      color: #0A2342;
      margin-bottom: 5px;
    }
    .signature-section {
      margin-top: 30px;
      border: 2px solid #2DD4BF;
      padding: 15px;
      background: #f0fdfa;
    }
    .digital-signature {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 15px;
    }
    .qr-code {
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .signature-info {
      flex: 1;
      padding-left: 20px;
      font-size: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px solid #ccc;
      text-align: center;
      font-size: 10px;
      color: #666;
    }
    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      font-size: 80px;
      color: rgba(45, 212, 191, 0.1);
      font-weight: bold;
      z-index: -1;
      pointer-events: none;
    }
    @media print {
      body { padding: 10mm; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="watermark">ATENDEBEM</div>

  <!-- Cabeçalho -->
  <div class="header">
    <div class="logo">
      <h1>🏥 RECEITA MÉDICA DIGITAL</h1>
      <p style="text-align: center; color: #2DD4BF; font-weight: bold;">AtendeBem - Assinatura Digital ICP-Brasil</p>
    </div>
  </div>

  <!-- Dados do Profissional -->
  <div class="section">
    <div class="section-title">1. IDENTIFICAÇÃO DO PROFISSIONAL</div>
    <div class="field">
      <span class="field-label">Nome:</span>
      <span class="field-value">${prescription.doctor_name}</span>
    </div>
    <div class="field">
      <span class="field-label">CRM:</span>
      <span class="field-value">${prescription.doctor_crm} / ${prescription.doctor_crm_uf}</span>
    </div>
    <div class="field">
      <span class="field-label">Especialidade:</span>
      <span class="field-value">${prescription.doctor_specialty}</span>
    </div>
  </div>

  <!-- Dados do Paciente -->
  <div class="section">
    <div class="section-title">2. IDENTIFICAÇÃO DO PACIENTE</div>
    <div class="field">
      <span class="field-label">Nome:</span>
      <span class="field-value">${prescription.patient_name}</span>
    </div>
    <div class="field">
      <span class="field-label">CPF:</span>
      <span class="field-value">${prescription.patient_cpf}</span>
    </div>
    <div class="field">
      <span class="field-label">Data de Nascimento:</span>
      <span class="field-value">${new Date(prescription.patient_date_of_birth).toLocaleDateString("pt-BR")}</span>
    </div>
  </div>

  <!-- Medicamentos Prescritos -->
  <div class="section">
    <div class="section-title">3. MEDICAMENTOS PRESCRITOS</div>
    ${prescription.medications
      .map(
        (med: any, index: number) => `
      <div class="medication-item">
        <h4>Medicamento ${index + 1}</h4>
        <div class="field">
          <span class="field-label">Nome:</span>
          <span class="field-value">${med.medication_name}</span>
        </div>
        <div class="field">
          <span class="field-label">Dosagem:</span>
          <span class="field-value">${med.dosage}</span>
        </div>
        <div class="field">
          <span class="field-label">Frequência:</span>
          <span class="field-value">${med.frequency}</span>
        </div>
        <div class="field">
          <span class="field-label">Duração:</span>
          <span class="field-value">${med.duration}</span>
        </div>
        <div class="field">
          <span class="field-label">Quantidade:</span>
          <span class="field-value">${med.quantity}</span>
        </div>
        ${
          med.instructions
            ? `
        <div class="field">
          <span class="field-label">Instruções:</span>
          <span class="field-value">${med.instructions}</span>
        </div>
        `
            : ""
        }
        ${
          med.warnings
            ? `
        <div class="field">
          <span class="field-label">Avisos:</span>
          <span class="field-value" style="color: #d97706; font-weight: bold;">${med.warnings}</span>
        </div>
        `
            : ""
        }
      </div>
    `,
      )
      .join("")}
  </div>

  <!-- Validade -->
  <div class="section">
    <div class="section-title">4. VALIDADE</div>
    <div class="field">
      <span class="field-label">Data de Emissão:</span>
      <span class="field-value">${new Date(prescription.created_at).toLocaleDateString("pt-BR")}</span>
    </div>
    <div class="field">
      <span class="field-label">Válida até:</span>
      <span class="field-value">${new Date(prescription.valid_until).toLocaleDateString("pt-BR")} (${prescription.validity_days} dias)</span>
    </div>
    <div class="field">
      <span class="field-label">Tipo de Receita:</span>
      <span class="field-value">${getPrescriptionTypeLabel(prescription.prescription_type)}</span>
    </div>
  </div>

  <!-- Assinatura Digital -->
  <div class="signature-section">
    <div class="section-title" style="color: #2DD4BF;">✓ ASSINATURA DIGITAL ICP-BRASIL</div>
    <div class="digital-signature">
      <div class="qr-code">
        <div style="text-align: center;">
          <div style="font-size: 8px; margin-bottom: 5px;">QR CODE</div>
          <div style="font-size: 10px; font-weight: bold;">VALIDAÇÃO</div>
        </div>
      </div>
      <div class="signature-info">
        <p><strong>Status:</strong> <span style="color: #10b981;">ASSINADO DIGITALMENTE</span></p>
        <p><strong>Certificado:</strong> ${prescription.signature_certificate_issuer || "ICP-Brasil"}</p>
        <p><strong>Série:</strong> ${prescription.signature_certificate_serial || "N/A"}</p>
        <p><strong>Data/Hora:</strong> ${prescription.signature_timestamp ? new Date(prescription.signature_timestamp).toLocaleString("pt-BR") : "N/A"}</p>
        <p><strong>Hash:</strong> ${prescription.signature_hash ? prescription.signature_hash.substring(0, 32) + "..." : "N/A"}</p>
        <p><strong>Token de Validação:</strong> ${prescription.validation_token}</p>
        <p style="margin-top: 5px; color: #666;">
          Valide este documento em: <strong>atendebem.com.br/validar</strong>
        </p>
      </div>
    </div>
  </div>

  <!-- Rodapé Legal -->
  <div class="footer">
    <p><strong>AtendeBem</strong> - Sistema de Prescrição Digital Médica</p>
    <p>Documento assinado digitalmente conforme MP 2.200-2/2001 e Lei 14.063/2020</p>
    <p>Validade jurídica equivalente à assinatura manuscrita</p>
    <p style="margin-top: 10px; color: #2DD4BF;">
      <strong>Menos burocracia. Mais medicina.</strong>
    </p>
  </div>
</body>
</html>
  `
}

function getPrescriptionTypeLabel(type: string): string {
  const types: Record<string, string> = {
    simple: "Receita Simples",
    controlled_b1: "Receita de Controle Especial - B1 (Tarja Preta)",
    controlled_b2: "Receita de Controle Especial - B2 (Tarja Vermelha)",
    special: "Receita Especial",
  }
  return types[type] || "Receita Simples"
}

export async function validatePrescription(validationToken: string) {
  try {
    const result = await sql(
      `SELECT 
        dp.id,
        dp.patient_name,
        dp.doctor_name,
        dp.doctor_crm,
        dp.doctor_crm_uf,
        dp.is_digitally_signed,
        dp.signature_timestamp,
        dp.valid_until,
        dp.status
       FROM digital_prescriptions dp
       WHERE dp.validation_token = $1`,
      [validationToken],
    )

    if (result.rows.length === 0) {
      return { error: "Receita não encontrada" }
    }

    const prescription = result.rows[0]

    // Verificar se está válida
    const isValid = prescription.status === "signed" && new Date(prescription.valid_until) >= new Date()

    return {
      success: true,
      prescription: {
        ...prescription,
        isValid,
        isExpired: new Date(prescription.valid_until) < new Date(),
      },
    }
  } catch (error) {
    console.error("[v0] Error validating prescription:", error)
    return { error: "Erro ao validar receita" }
  }
}
