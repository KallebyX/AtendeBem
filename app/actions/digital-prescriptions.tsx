"use server"

import { getCurrentUser } from "@/lib/session"
import { getDb } from "@/lib/db"
import { randomBytes, createHash } from "crypto"

/**
 * Busca todas as receitas digitais do usuário autenticado
 */
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
        p.full_name as patient_name,
        p.cpf as patient_cpf,
        p.date_of_birth as patient_birth_date,
        mp.cid10_code,
        mp.cid10_description,
        mp.clinical_indication,
        mp.notes as prescription_notes
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
      WHERE dp.user_id = ${user.id}
      ORDER BY dp.created_at DESC
      LIMIT 100
    `

    // Buscar medicamentos para cada receita
    const prescriptionsWithMeds = await Promise.all(
      prescriptions.map(async (prescription: any) => {
        if (prescription.prescription_id) {
          const items = await db`
            SELECT
              pi.medication_name,
              pi.dosage,
              pi.frequency,
              pi.duration,
              pi.quantity,
              pi.administration_instructions as instructions
            FROM prescription_items pi
            WHERE pi.prescription_id = ${prescription.prescription_id}
          `
          return { ...prescription, medications: items }
        }
        return { ...prescription, medications: [] }
      })
    )

    return { success: true, prescriptions: prescriptionsWithMeds }
  } catch (error: any) {
    console.error("[v0] Error fetching digital prescriptions:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Cria uma nova receita digital com todos os dados necessários para assinatura ICP-Brasil
 */
export async function createDigitalPrescription(data: {
  patientId: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
    quantity?: number
    instructions?: string
  }>
  cid10Code?: string
  cid10Description?: string
  clinicalIndication?: string
  notes?: string
  validityDays?: number
  prescriptionType?: "simple" | "controlled_b1" | "controlled_b2" | "special"
}) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    // Validações
    if (!data.patientId || !data.medications || data.medications.length === 0) {
      return { success: false, error: "Dados incompletos: paciente e medicamentos são obrigatórios" }
    }

    // Buscar dados do paciente
    const [patient] = await db`
      SELECT id, full_name, cpf, date_of_birth FROM patients
      WHERE id = ${data.patientId} AND user_id = ${user.id}
    `

    if (!patient) {
      return { success: false, error: "Paciente não encontrado" }
    }

    // Validar CPF do paciente
    if (!patient.cpf) {
      return { success: false, error: "CPF do paciente é obrigatório para receita digital" }
    }

    // Validar dados do médico (necessários para ICP-Brasil)
    const [doctor] = await db`
      SELECT id, name, crm, crm_uf, specialty FROM users WHERE id = ${user.id}
    `

    if (!doctor.crm || !doctor.crm_uf) {
      return { success: false, error: "CRM e UF do médico são obrigatórios para emissão de receita digital" }
    }

    const validityDays = data.validityDays || 30
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + validityDays)

    // Criar prescrição médica base
    const [medicalPrescription] = await db`
      INSERT INTO medical_prescriptions (
        patient_id,
        user_id,
        prescription_date,
        cid10_code,
        cid10_description,
        clinical_indication,
        notes,
        valid_until,
        status
      ) VALUES (
        ${data.patientId},
        ${user.id},
        ${new Date().toISOString().split('T')[0]},
        ${data.cid10Code || null},
        ${data.cid10Description || null},
        ${data.clinicalIndication || null},
        ${data.notes || null},
        ${validUntil.toISOString().split('T')[0]},
        'active'
      )
      RETURNING id
    `

    // Inserir itens da prescrição
    for (const med of data.medications) {
      await db`
        INSERT INTO prescription_items (
          prescription_id,
          medication_id,
          medication_name,
          dosage,
          frequency,
          duration,
          quantity,
          administration_instructions
        ) VALUES (
          ${medicalPrescription.id},
          ${null},
          ${med.name},
          ${med.dosage},
          ${med.frequency},
          ${med.duration},
          ${med.quantity || 1},
          ${med.instructions || null}
        )
      `
    }

    // Verificar se é substância controlada
    const isControlled = data.prescriptionType !== "simple"

    // Criar receita digital
    const [digitalPrescription] = await db`
      INSERT INTO digital_prescriptions (
        prescription_id,
        patient_id,
        user_id,
        doctor_name,
        doctor_crm,
        doctor_crm_uf,
        doctor_specialty,
        patient_name,
        patient_cpf,
        patient_date_of_birth,
        prescription_date,
        validity_days,
        valid_until,
        is_digitally_signed,
        status,
        is_controlled_substance,
        prescription_type
      ) VALUES (
        ${medicalPrescription.id},
        ${data.patientId},
        ${user.id},
        ${doctor.name},
        ${doctor.crm},
        ${doctor.crm_uf},
        ${doctor.specialty || null},
        ${patient.full_name},
        ${patient.cpf},
        ${patient.date_of_birth},
        NOW(),
        ${validityDays},
        ${validUntil.toISOString()},
        false,
        'pending_signature',
        ${isControlled},
        ${data.prescriptionType || 'simple'}
      )
      RETURNING *
    `

    return {
      success: true,
      prescription: digitalPrescription,
      prescriptionId: digitalPrescription.id,
      validationToken: digitalPrescription.validation_token,
    }
  } catch (error: any) {
    console.error("[v0] Error creating digital prescription:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Valida uma receita digital pelo token de validação
 * Usado para verificar autenticidade da receita via QR Code
 */
export async function validatePrescription(token: string) {
  try {
    const db = await getDb()

    const prescriptions = await db`
      SELECT
        dp.*,
        p.full_name as patient_name,
        p.cpf as patient_cpf,
        p.date_of_birth as patient_birth_date,
        u.name as doctor_name,
        u.crm,
        u.crm_uf,
        u.specialty as doctor_specialty
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.validation_token = ${token}
    `

    if (prescriptions.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = prescriptions[0]

    // Buscar medicamentos
    if (prescription.prescription_id) {
      const items = await db`
        SELECT
          pi.medication_name,
          pi.dosage,
          pi.frequency,
          pi.duration,
          pi.quantity,
          pi.administration_instructions as instructions
        FROM prescription_items pi
        WHERE pi.prescription_id = ${prescription.prescription_id}
      `
      prescription.medications = items
    } else {
      prescription.medications = []
    }

    // Registrar validação
    await db`
      UPDATE digital_prescriptions
      SET
        validated_at = NOW()
      WHERE id = ${prescription.id}
    `

    // Registrar log de validação
    await db`
      INSERT INTO digital_signature_logs (
        digital_prescription_id,
        user_id,
        action,
        success,
        metadata
      ) VALUES (
        ${prescription.id},
        ${prescription.user_id},
        'validate',
        true,
        ${JSON.stringify({ validated_at: new Date().toISOString() })}
      )
    `

    // Verificar validade
    const isExpired = prescription.valid_until && new Date(prescription.valid_until) < new Date()
    const isValid = prescription.is_digitally_signed && !isExpired && prescription.status === 'signed'

    return {
      success: true,
      prescription,
      isValid,
      isExpired,
      isSigned: prescription.is_digitally_signed
    }
  } catch (error: any) {
    console.error("[v0] Error validating prescription:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Interface para dados de assinatura digital ICP-Brasil
 */
interface SignatureData {
  digitalPrescriptionId: string
  certificateSerial: string
  certificateIssuer: string
  signatureHash: string
  signatureTimestamp?: string
  digitalSignatureData?: string
  signedPdfBase64?: string
  certificateDetails?: {
    cpf?: string
    name?: string
    validFrom?: string
    validUntil?: string
    issuerCN?: string
    serialNumber?: string
  }
}

/**
 * Assina digitalmente uma receita com certificado ICP-Brasil
 * Esta função é chamada após o processo de autorização do VIDaaS
 */
export async function signDigitalPrescription(data: SignatureData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    const db = await getDb()

    // Verificar se a receita existe e pertence ao usuário
    const prescriptions = await db`
      SELECT * FROM digital_prescriptions
      WHERE id = ${data.digitalPrescriptionId} AND user_id = ${user.id}
    `

    if (prescriptions.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = prescriptions[0]

    // Verificar se já está assinada
    if (prescription.is_digitally_signed) {
      return { success: false, error: "Esta receita já foi assinada digitalmente" }
    }

    // Validar dados da assinatura
    if (!data.certificateSerial || !data.signatureHash) {
      return { success: false, error: "Dados de assinatura incompletos" }
    }

    // Gerar hash do PDF se fornecido
    let pdfHash = null
    if (data.signedPdfBase64) {
      pdfHash = createHash('sha256')
        .update(Buffer.from(data.signedPdfBase64, 'base64'))
        .digest('hex')
    }

    // Gerar URL de validação com QR Code
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.atendebem.io'
    const qrCodeUrl = `${baseUrl}/validar/${prescription.validation_token}`

    // Atualizar receita com dados da assinatura
    await db`
      UPDATE digital_prescriptions
      SET
        is_digitally_signed = true,
        signature_certificate_serial = ${data.certificateSerial},
        signature_certificate_issuer = ${data.certificateIssuer},
        signature_timestamp = ${data.signatureTimestamp || new Date().toISOString()},
        signature_hash = ${data.signatureHash},
        digital_signature_data = ${data.digitalSignatureData || null},
        pdf_hash = ${pdfHash},
        qr_code_data = ${qrCodeUrl},
        status = 'signed',
        metadata = ${JSON.stringify({
          certificateDetails: data.certificateDetails || {},
          signedAt: new Date().toISOString(),
          signedBy: user.id
        })}
      WHERE id = ${data.digitalPrescriptionId}
    `

    // Registrar log de assinatura
    await db`
      INSERT INTO digital_signature_logs (
        digital_prescription_id,
        user_id,
        action,
        success,
        certificate_details,
        metadata
      ) VALUES (
        ${data.digitalPrescriptionId},
        ${user.id},
        'sign',
        true,
        ${JSON.stringify({
          serial: data.certificateSerial,
          issuer: data.certificateIssuer,
          ...data.certificateDetails
        })},
        ${JSON.stringify({
          signatureHash: data.signatureHash,
          pdfHash: pdfHash,
          timestamp: new Date().toISOString()
        })}
      )
    `

    return {
      success: true,
      message: "Receita assinada digitalmente com sucesso",
      prescription: {
        id: data.digitalPrescriptionId,
        validationToken: prescription.validation_token,
        qrCodeUrl,
        signatureTimestamp: data.signatureTimestamp || new Date().toISOString()
      }
    }
  } catch (error: any) {
    console.error("[v0] Error signing prescription:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Gera o HTML/PDF da receita digital com todos os elementos necessários
 * para validação ICP-Brasil incluindo QR Code de validação
 */
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
        p.full_name as patient_name,
        p.cpf as patient_cpf,
        p.date_of_birth as patient_birth_date,
        mp.cid10_code,
        mp.cid10_description,
        mp.clinical_indication,
        mp.notes as prescription_notes
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN medical_prescriptions mp ON dp.prescription_id = mp.id
      WHERE dp.id = ${prescriptionId} AND dp.user_id = ${user.id}
    `

    if (prescriptions.length === 0) {
      return { success: false, error: "Receita não encontrada" }
    }

    const prescription = prescriptions[0]

    // Buscar medicamentos
    let medications: any[] = []
    if (prescription.prescription_id) {
      medications = await db`
        SELECT
          pi.medication_name,
          pi.dosage,
          pi.frequency,
          pi.duration,
          pi.quantity,
          pi.administration_instructions as instructions
        FROM prescription_items pi
        WHERE pi.prescription_id = ${prescription.prescription_id}
      `
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.atendebem.io'
    const validationUrl = `${baseUrl}/validar/${prescription.validation_token}`
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(validationUrl)}`

    // Formatar CPF
    const formatCPF = (cpf: string) => {
      if (!cpf) return "N/A"
      const cleaned = cpf.replace(/\D/g, '')
      if (cleaned.length !== 11) return cpf
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    // Formatar data
    const formatDate = (date: string | Date) => {
      if (!date) return "N/A"
      return new Date(date).toLocaleDateString("pt-BR")
    }

    // Calcular idade
    const calculateAge = (birthDate: string | Date) => {
      if (!birthDate) return ""
      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const m = today.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      return `${age} anos`
    }

    const signatureStatus = prescription.is_digitally_signed
      ? {
          badge: "✓ DOCUMENTO ASSINADO DIGITALMENTE",
          color: "#16a34a",
          bgColor: "#dcfce7",
          details: `
            <p><strong>Assinatura ICP-Brasil</strong></p>
            <p>Certificado: ${prescription.signature_certificate_serial || 'N/A'}</p>
            <p>Emissor: ${prescription.signature_certificate_issuer || 'N/A'}</p>
            <p>Data/Hora: ${prescription.signature_timestamp ? new Date(prescription.signature_timestamp).toLocaleString("pt-BR") : 'N/A'}</p>
            <p>Hash: ${prescription.signature_hash ? prescription.signature_hash.substring(0, 32) + '...' : 'N/A'}</p>
          `
        }
      : {
          badge: "⚠ DOCUMENTO PENDENTE DE ASSINATURA",
          color: "#ca8a04",
          bgColor: "#fef9c3",
          details: `<p>Este documento ainda não foi assinado digitalmente.</p>`
        }

    const prescriptionTypeLabels: Record<string, string> = {
      simple: "Receita Simples",
      controlled_b1: "Receita Azul (B1)",
      controlled_b2: "Receita Azul (B2)",
      special: "Receita Especial"
    }
    const prescriptionTypeLabel = prescriptionTypeLabels[prescription.prescription_type as string] || "Receita Simples"

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Receita Digital - ${prescription.patient_name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #1f2937;
      background: #fff;
      padding: 20mm;
    }

    .container { max-width: 210mm; margin: 0 auto; }

    .header {
      text-align: center;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .header h1 {
      font-size: 18pt;
      color: #1e40af;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .header .prescription-type {
      display: inline-block;
      background: #2563eb;
      color: white;
      padding: 3px 15px;
      border-radius: 15px;
      font-size: 10pt;
      margin-top: 5px;
    }

    .doctor-info {
      text-align: center;
      margin-bottom: 20px;
      padding: 10px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .doctor-info h2 {
      font-size: 14pt;
      color: #1f2937;
      margin-bottom: 5px;
    }

    .doctor-info p { font-size: 10pt; color: #6b7280; }

    .patient-info {
      background: #f0f9ff;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #2563eb;
    }

    .patient-info h3 {
      font-size: 11pt;
      color: #1e40af;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .patient-info .row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    .patient-info .label { color: #6b7280; font-size: 10pt; }
    .patient-info .value { font-weight: 600; }

    .diagnosis {
      background: #fefce8;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
      border-left: 4px solid #ca8a04;
    }

    .diagnosis h3 {
      font-size: 11pt;
      color: #854d0e;
      margin-bottom: 10px;
    }

    .medications {
      margin-bottom: 20px;
    }

    .medications h3 {
      font-size: 12pt;
      color: #1f2937;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e5e7eb;
    }

    .medication-item {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 10px;
      border: 1px solid #e5e7eb;
    }

    .medication-item .name {
      font-weight: 700;
      font-size: 12pt;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .medication-item .details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px;
      font-size: 10pt;
    }

    .medication-item .detail-item { color: #4b5563; }
    .medication-item .detail-label { color: #9ca3af; }

    .medication-item .instructions {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px dashed #d1d5db;
      font-style: italic;
      color: #6b7280;
      font-size: 10pt;
    }

    .notes {
      background: #f5f5f4;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .notes h3 {
      font-size: 11pt;
      color: #44403c;
      margin-bottom: 10px;
    }

    .signature-section {
      background: ${signatureStatus.bgColor};
      border: 2px solid ${signatureStatus.color};
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }

    .signature-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      color: ${signatureStatus.color};
      margin-bottom: 10px;
      font-size: 11pt;
    }

    .signature-details {
      font-size: 9pt;
      color: #4b5563;
    }

    .signature-details p { margin-bottom: 3px; }

    .validation-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      margin-bottom: 20px;
    }

    .qr-code {
      text-align: center;
    }

    .qr-code img {
      width: 120px;
      height: 120px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
    }

    .qr-code p {
      font-size: 8pt;
      color: #6b7280;
      margin-top: 5px;
    }

    .validation-info {
      flex: 1;
      padding-left: 20px;
    }

    .validation-info h4 {
      font-size: 10pt;
      color: #1f2937;
      margin-bottom: 5px;
    }

    .validation-info p {
      font-size: 9pt;
      color: #6b7280;
      margin-bottom: 3px;
    }

    .validation-info .token {
      font-family: monospace;
      background: #f3f4f6;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9pt;
      word-break: break-all;
    }

    .footer {
      text-align: center;
      font-size: 8pt;
      color: #9ca3af;
      padding-top: 15px;
      border-top: 1px solid #e5e7eb;
    }

    .legal-notice {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 8px;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 8pt;
      color: #166534;
    }

    @media print {
      body { padding: 10mm; }
      .container { max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Receita Médica Digital</h1>
      <span class="prescription-type">${prescriptionTypeLabel}</span>
    </div>

    <div class="doctor-info">
      <h2>Dr(a). ${prescription.doctor_name}</h2>
      <p>CRM: ${prescription.doctor_crm}/${prescription.doctor_crm_uf}${prescription.doctor_specialty ? ` | ${prescription.doctor_specialty}` : ''}</p>
    </div>

    <div class="patient-info">
      <h3>Dados do Paciente</h3>
      <div class="row">
        <span><span class="label">Nome:</span> <span class="value">${prescription.patient_name}</span></span>
        <span><span class="label">CPF:</span> <span class="value">${formatCPF(prescription.patient_cpf)}</span></span>
      </div>
      <div class="row">
        <span><span class="label">Data de Nascimento:</span> <span class="value">${formatDate(prescription.patient_date_of_birth)} (${calculateAge(prescription.patient_date_of_birth)})</span></span>
      </div>
    </div>

    ${prescription.cid10_code || prescription.clinical_indication ? `
    <div class="diagnosis">
      <h3>Diagnóstico / Indicação Clínica</h3>
      ${prescription.cid10_code ? `<p><strong>CID-10:</strong> ${prescription.cid10_code}${prescription.cid10_description ? ` - ${prescription.cid10_description}` : ''}</p>` : ''}
      ${prescription.clinical_indication ? `<p><strong>Indicação:</strong> ${prescription.clinical_indication}</p>` : ''}
    </div>
    ` : ''}

    <div class="medications">
      <h3>Medicamentos Prescritos</h3>
      ${medications.map((med, index) => `
        <div class="medication-item">
          <div class="name">${index + 1}. ${med.medication_name}</div>
          <div class="details">
            <div class="detail-item"><span class="detail-label">Dosagem:</span> ${med.dosage}</div>
            <div class="detail-item"><span class="detail-label">Frequência:</span> ${med.frequency}</div>
            <div class="detail-item"><span class="detail-label">Duração:</span> ${med.duration}</div>
            <div class="detail-item"><span class="detail-label">Quantidade:</span> ${med.quantity || 1}</div>
          </div>
          ${med.instructions ? `<div class="instructions">📝 ${med.instructions}</div>` : ''}
        </div>
      `).join('')}
    </div>

    ${prescription.prescription_notes ? `
    <div class="notes">
      <h3>Observações</h3>
      <p>${prescription.prescription_notes}</p>
    </div>
    ` : ''}

    <div class="signature-section">
      <div class="signature-badge">${signatureStatus.badge}</div>
      <div class="signature-details">
        ${signatureStatus.details}
      </div>
    </div>

    <div class="validation-section">
      <div class="qr-code">
        <img src="${qrCodeUrl}" alt="QR Code de Validação" />
        <p>Escaneie para validar</p>
      </div>
      <div class="validation-info">
        <h4>Validação da Receita</h4>
        <p>Acesse: <strong>${validationUrl}</strong></p>
        <p>Token: <span class="token">${prescription.validation_token}</span></p>
        <p>Emissão: ${formatDate(prescription.prescription_date)}</p>
        <p>Validade: ${formatDate(prescription.valid_until)} (${prescription.validity_days} dias)</p>
      </div>
    </div>

    <div class="legal-notice">
      <strong>Aviso Legal:</strong> Esta é uma receita médica digital com validade jurídica conforme MP 2.200-2/2001 e Lei 14.063/2020.
      A autenticidade deste documento pode ser verificada através do QR Code ou no endereço indicado acima.
      ${prescription.is_controlled_substance ? 'Esta receita contém medicamentos de controle especial conforme Portaria ANVISA 344/98.' : ''}
    </div>

    <div class="footer">
      <p>Documento gerado eletronicamente pelo sistema AtendeBem em ${new Date().toLocaleString("pt-BR")}</p>
      <p>ID: ${prescriptionId} | Conforme ICP-Brasil e padrões CFM para receituário eletrônico</p>
    </div>
  </div>
</body>
</html>
    `

    return {
      success: true,
      html,
      prescription: {
        id: prescriptionId,
        patientName: prescription.patient_name,
        validationToken: prescription.validation_token,
        isSigned: prescription.is_digitally_signed
      }
    }
  } catch (error: any) {
    console.error("[v0] Error generating prescription PDF:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Inicia o fluxo de assinatura digital via VIDaaS
 * Retorna a URL de autorização para o usuário autenticar com seu certificado
 */
export async function initiateSignatureFlow(prescriptionId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: "Não autenticado" }
    }

    // Verificar se a receita existe
    const db = await getDb()
    const [prescription] = await db`
      SELECT id, is_digitally_signed, status
      FROM digital_prescriptions
      WHERE id = ${prescriptionId} AND user_id = ${user.id}
    `

    if (!prescription) {
      return { success: false, error: "Receita não encontrada" }
    }

    if (prescription.is_digitally_signed) {
      return { success: false, error: "Esta receita já está assinada" }
    }

    // Chamar API de assinatura para obter URL de autorização
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/signature?action=authorize&prescriptionId=${prescriptionId}`)
    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Erro ao iniciar fluxo de assinatura",
        mockMode: data.mockMode
      }
    }

    return {
      success: true,
      authorizationUrl: data.authorizationUrl,
      message: data.message
    }
  } catch (error: any) {
    console.error("[v0] Error initiating signature flow:", error)
    return { success: false, error: error.message }
  }
}
