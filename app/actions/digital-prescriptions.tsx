"use server"

import { getDb, setUserContext } from "@/lib/db"
import { getUserFromToken } from "@/lib/session"
import { revalidatePath } from "next/cache"

export async function createDigitalPrescription(data: {
  patientId: string
  medications: Array<{
    medication_name: string
    dosage: string
    frequency: string
    duration: string
    quantity: string
    instructions?: string
  }>
  clinicalIndication?: string
  validityDays?: number
}) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return { error: "Não autenticado" }
    }

    await setUserContext(user.id)
    const sql = await getDb()

    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + (data.validityDays || 30))

    const validationToken = crypto.randomUUID()
    const qrCodeData = `${process.env.NEXT_PUBLIC_APP_URL || "https://atendebem.io"}/validar/${validationToken}`

    const prescription = await sql`
      INSERT INTO digital_prescriptions (
        user_id,
        patient_id,
        medications,
        clinical_indication,
        valid_until,
        validation_token,
        qr_code_data
      ) VALUES (
        ${user.id},
        ${data.patientId},
        ${JSON.stringify(data.medications)},
        ${data.clinicalIndication || null},
        ${validUntil.toISOString()},
        ${validationToken},
        ${qrCodeData}
      )
      RETURNING *
    `

    revalidatePath("/receitas")
    return { success: true, prescription: prescription[0] }
  } catch (error: any) {
    console.error("[v0] Error creating digital prescription:", error)
    return { error: error.message || "Erro ao criar receita digital" }
  }
}

export async function getDigitalPrescriptions(filters?: { patientId?: string; status?: string }) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return { error: "Não autenticado" }
    }

    await setUserContext(user.id)
    const sql = await getDb()

    let query = sql`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      WHERE dp.user_id = ${user.id}
    `

    if (filters?.patientId) {
      query = sql`
        SELECT 
          dp.*,
          p.name as patient_name,
          p.cpf as patient_cpf
        FROM digital_prescriptions dp
        LEFT JOIN patients p ON dp.patient_id = p.id
        WHERE dp.user_id = ${user.id}
        AND dp.patient_id = ${filters.patientId}
      `
    }

    const prescriptions = await query

    return { success: true, prescriptions }
  } catch (error: any) {
    console.error("[v0] Error fetching digital prescriptions:", error)
    return { error: error.message || "Erro ao buscar receitas digitais" }
  }
}

export async function signDigitalPrescription(data: {
  digitalPrescriptionId: string
  certificateSerial: string
  certificateIssuer: string
  signatureHash: string
  digitalSignatureData: string
}) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return { error: "Não autenticado" }
    }

    await setUserContext(user.id)
    const sql = await getDb()

    const signatureTimestamp = new Date().toISOString()

    await sql`
      UPDATE digital_prescriptions
      SET 
        is_digitally_signed = true,
        signature_timestamp = ${signatureTimestamp},
        signature_certificate_serial = ${data.certificateSerial},
        signature_certificate_issuer = ${data.certificateIssuer},
        signature_hash = ${data.signatureHash},
        digital_signature_data = ${data.digitalSignatureData}
      WHERE id = ${data.digitalPrescriptionId}
      AND user_id = ${user.id}
    `

    revalidatePath("/receitas")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error signing digital prescription:", error)
    return { error: error.message || "Erro ao assinar receita digital" }
  }
}

export async function revokeDigitalPrescription(prescriptionId: string, reason: string) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return { error: "Não autenticado" }
    }

    await setUserContext(user.id)
    const sql = await getDb()

    const revokedAt = new Date().toISOString()

    await sql`
      UPDATE digital_prescriptions
      SET 
        is_revoked = true,
        revocation_timestamp = ${revokedAt},
        revocation_reason = ${reason}
      WHERE id = ${prescriptionId}
      AND user_id = ${user.id}
    `

    revalidatePath("/receitas")
    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error revoking digital prescription:", error)
    return { error: error.message || "Erro ao revogar receita digital" }
  }
}

export async function auditDigitalPrescription(prescriptionId: string, action: string, details?: string) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return { error: "Não autenticado" }
    }

    await setUserContext(user.id)
    const sql = await getDb()

    await sql`
      INSERT INTO prescription_audit_log (
        prescription_id,
        user_id,
        action,
        details,
        ip_address
      ) VALUES (
        ${prescriptionId},
        ${user.id},
        ${action},
        ${details || null},
        ${null}
      )
    `

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Error auditing digital prescription:", error)
    return { error: error.message || "Erro ao registrar auditoria" }
  }
}

export async function validatePrescription(validationToken: string) {
  try {
    const sql = await getDb()

    const prescriptions = await sql`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        u.name as doctor_name,
        u.email as doctor_email,
        u.medical_license as doctor_crm,
        u.specialty as doctor_specialty
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.validation_token = ${validationToken}
      AND dp.is_revoked = false
    `

    if (prescriptions.length === 0) {
      return { error: "Receita não encontrada ou foi revogada" }
    }

    const prescription = prescriptions[0]
    const isExpired = new Date(prescription.valid_until) < new Date()

    return {
      success: true,
      prescription: {
        ...prescription,
        isExpired,
        medications:
          typeof prescription.medications === "string"
            ? JSON.parse(prescription.medications)
            : prescription.medications,
        doctorCrm: prescription.doctor_crm?.split("-")[0] || "",
        doctorCrmUf: prescription.doctor_crm?.split("-")[1] || "",
      },
    }
  } catch (error: any) {
    console.error("[v0] Error validating prescription:", error)
    return { error: error.message || "Erro ao validar receita" }
  }
}

export async function generatePrescriptionPDF(prescriptionId: string) {
  try {
    const user = await getUserFromToken()
    if (!user) {
      return { error: "Não autenticado" }
    }

    await setUserContext(user.id)
    const sql = await getDb()

    const prescriptions = await sql`
      SELECT 
        dp.*,
        p.name as patient_name,
        p.cpf as patient_cpf,
        p.birth_date as patient_birth_date,
        u.name as doctor_name,
        u.email as doctor_email,
        u.medical_license as doctor_crm,
        u.specialty as doctor_specialty
      FROM digital_prescriptions dp
      LEFT JOIN patients p ON dp.patient_id = p.id
      LEFT JOIN users u ON dp.user_id = u.id
      WHERE dp.id = ${prescriptionId}
      AND dp.user_id = ${user.id}
    `

    if (prescriptions.length === 0) {
      return { error: "Receita não encontrada" }
    }

    const prescription = prescriptions[0]
    const medications =
      typeof prescription.medications === "string" ? JSON.parse(prescription.medications) : prescription.medications

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Receita Digital - ${prescription.patient_name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          .header { text-align: center; border-bottom: 3px solid #0ea5e9; padding-bottom: 20px; margin-bottom: 30px; }
          .header h1 { color: #0ea5e9; margin: 0; }
          .section { margin-bottom: 20px; }
          .section h2 { color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .info-item { margin-bottom: 10px; }
          .info-label { font-weight: bold; color: #64748b; }
          .medications { margin-top: 20px; }
          .medication-item { background: #f8fafc; padding: 15px; margin-bottom: 10px; border-left: 4px solid #0ea5e9; }
          .signature { margin-top: 40px; text-align: center; }
          .signature-line { border-top: 2px solid #334155; width: 300px; margin: 40px auto 10px; }
          .qr-code { text-align: center; margin-top: 30px; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RECEITA MÉDICA DIGITAL</h1>
          <p>Documento com validade jurídica - ICP-Brasil</p>
        </div>

        <div class="section">
          <h2>Dados do Paciente</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome:</span> ${prescription.patient_name}
            </div>
            <div class="info-item">
              <span class="info-label">CPF:</span> ${prescription.patient_cpf || "Não informado"}
            </div>
            ${
              prescription.patient_birth_date
                ? `
            <div class="info-item">
              <span class="info-label">Data de Nascimento:</span> ${new Date(prescription.patient_birth_date).toLocaleDateString("pt-BR")}
            </div>
            `
                : ""
            }
          </div>
        </div>

        <div class="section">
          <h2>Medicamentos Prescritos</h2>
          <div class="medications">
            ${medications
              .map(
                (med: any, index: number) => `
              <div class="medication-item">
                <strong>${index + 1}. ${med.medication_name}</strong><br>
                Dosagem: ${med.dosage}<br>
                Frequência: ${med.frequency}<br>
                Duração: ${med.duration}<br>
                Quantidade: ${med.quantity}
                ${med.instructions ? `<br>Instruções: ${med.instructions}` : ""}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        ${
          prescription.clinical_indication
            ? `
        <div class="section">
          <h2>Indicação Clínica</h2>
          <p>${prescription.clinical_indication}</p>
        </div>
        `
            : ""
        }

        <div class="section">
          <h2>Dados do Médico</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome:</span> ${prescription.doctor_name}
            </div>
            <div class="info-item">
              <span class="info-label">CRM:</span> ${prescription.doctor_crm}
            </div>
            ${
              prescription.doctor_specialty
                ? `
            <div class="info-item">
              <span class="info-label">Especialidade:</span> ${prescription.doctor_specialty}
            </div>
            `
                : ""
            }
          </div>
        </div>

        <div class="section">
          <h2>Validade e Autenticidade</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Data de Emissão:</span> ${new Date(prescription.created_at).toLocaleDateString("pt-BR")}
            </div>
            <div class="info-item">
              <span class="info-label">Válida até:</span> ${new Date(prescription.valid_until).toLocaleDateString("pt-BR")}
            </div>
            ${
              prescription.is_digitally_signed
                ? `
            <div class="info-item">
              <span class="info-label">Assinatura Digital:</span> Sim - ICP-Brasil
            </div>
            <div class="info-item">
              <span class="info-label">Data da Assinatura:</span> ${new Date(prescription.signature_timestamp).toLocaleDateString("pt-BR")}
            </div>
            `
                : ""
            }
          </div>
        </div>

        ${
          prescription.qr_code_data
            ? `
        <div class="qr-code">
          <p><strong>Validar Receita:</strong></p>
          <p>${prescription.qr_code_data}</p>
          <p style="font-size: 12px; color: #64748b;">Escaneie o QR Code para validar a autenticidade</p>
        </div>
        `
            : ""
        }

        <div class="signature">
          <div class="signature-line"></div>
          <p><strong>${prescription.doctor_name}</strong><br>
          CRM: ${prescription.doctor_crm}</p>
        </div>
      </body>
      </html>
    `

    return { success: true, html }
  } catch (error: any) {
    console.error("[v0] Error generating prescription PDF:", error)
    return { error: error.message || "Erro ao gerar PDF" }
  }
}
