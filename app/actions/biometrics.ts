"use server"

import { getDb } from "@/lib/db"
import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import { setUserContext } from "@/lib/db-init"
import crypto from "crypto"

// Função helper para criptografar dados biométricos
function encryptBiometricData(data: string, keyId: string): string {
  const algorithm = "aes-256-gcm"
  const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex")
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(data, "utf8", "hex")
  encrypted += cipher.final("hex")

  const authTag = cipher.getAuthTag()

  return JSON.stringify({
    encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    keyId,
  })
}

// Função helper para descriptografar
function decryptBiometricData(encryptedData: string): string {
  const { encrypted, iv, authTag } = JSON.parse(encryptedData)
  const algorithm = "aes-256-gcm"
  const key = Buffer.from(process.env.ENCRYPTION_KEY || "", "hex")

  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, "hex"))
  decipher.setAuthTag(Buffer.from(authTag, "hex"))

  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}

export async function enrollBiometric(data: {
  patient_id: string
  biometric_type: "fingerprint" | "facial" | "iris" | "voice" | "palm"
  template_data: string // Dados brutos do template
  finger_position?: string
  face_angle?: string
  capture_device?: string
  device_serial?: string
  capture_quality?: number
  consent_ip?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    // Criptografar template biométrico
    const keyId = `bio-${Date.now()}`
    const encryptedTemplate = encryptBiometricData(data.template_data, keyId)

    const result = await db`
      INSERT INTO biometric_templates (
        tenant_id, patient_id, user_id, biometric_type, template_data,
        finger_position, face_angle, capture_device, device_serial,
        capture_quality, encryption_key_id, consent_given, consent_date,
        consent_ip_address
      ) VALUES (
        ${user.tenant_id}, ${data.patient_id}, ${user.id}, ${data.biometric_type},
        ${encryptedTemplate}, ${data.finger_position || null}, ${data.face_angle || null},
        ${data.capture_device || null}, ${data.device_serial || null},
        ${data.capture_quality || null}, ${keyId}, true, NOW(),
        ${data.consent_ip || null}
      ) RETURNING id, biometric_type, finger_position, created_at
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function verifyBiometric(data: {
  patient_id: string
  biometric_type: string
  template_data: string // Dados para comparação
  verification_type: "authentication" | "authorization" | "attendance" | "prescription_signature"
  appointment_id?: string
  prescription_id?: string
  device_info?: any
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar templates ativos do paciente
    const templates = await db`
      SELECT id, template_data, biometric_type
      FROM biometric_templates
      WHERE patient_id = ${data.patient_id}
        AND tenant_id = ${user.tenant_id}
        AND biometric_type = ${data.biometric_type}
        AND is_active = true
    `

    if (!templates.length) {
      return { error: "Nenhum template biométrico cadastrado" }
    }

    // Simular comparação biométrica (em produção, usar SDK do fabricante)
    let bestMatch = 0
    let matchedTemplateId = null

    for (const template of templates) {
      // Em produção, descriptografar e comparar com SDK biométrico
      // const decrypted = decryptBiometricData(template.template_data)
      // const score = await biometricSDK.compare(decrypted, data.template_data)

      // Simulação: score aleatório para demo
      const score = Math.floor(Math.random() * 40) + 60 // 60-100

      if (score > bestMatch) {
        bestMatch = score
        matchedTemplateId = template.id
      }
    }

    const verificationResult = bestMatch >= 70 // Threshold de 70%

    // Registrar verificação
    const verification = await db`
      INSERT INTO biometric_verifications (
        tenant_id, template_id, verification_result, match_score,
        verification_type, appointment_id, prescription_id,
        device_info, ip_address
      ) VALUES (
        ${user.tenant_id}, ${matchedTemplateId}, ${verificationResult},
        ${bestMatch}, ${data.verification_type}, ${data.appointment_id || null},
        ${data.prescription_id || null}, ${data.device_info ? JSON.stringify(data.device_info) : null},
        ${data.device_info?.ip || null}
      ) RETURNING *
    `

    // Atualizar contador de verificações
    if (verificationResult) {
      await db`
        UPDATE biometric_templates
        SET verified_count = verified_count + 1,
            last_verified_at = NOW()
        WHERE id = ${matchedTemplateId}
      `
    }

    return {
      success: true,
      verified: verificationResult,
      matchScore: bestMatch,
      data: verification[0],
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getBiometricTemplates(patient_id?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT bt.id, bt.biometric_type, bt.finger_position, bt.face_angle,
             bt.capture_quality, bt.is_active, bt.verified_count,
             bt.last_verified_at, bt.created_at, bt.patient_id,
             p.name as patient_name
      FROM biometric_templates bt
      JOIN patients p ON bt.patient_id = p.id
      WHERE bt.tenant_id = ${user.tenant_id}
      ${patient_id ? db`AND bt.patient_id = ${patient_id}` : db``}
      ORDER BY bt.created_at DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deactivateBiometricTemplate(template_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE biometric_templates
      SET is_active = false, updated_at = NOW()
      WHERE id = ${template_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function deleteBiometricTemplate(template_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      DELETE FROM biometric_templates
      WHERE id = ${template_id} AND tenant_id = ${user.tenant_id}
      RETURNING id
    `

    if (result.length === 0) return { error: "Template não encontrado" }
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getBiometricAuditLog(filters: {
  patient_id?: string
  start_date?: string
  end_date?: string
  limit?: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token inválido" }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT *
      FROM biometric_audit_log
      WHERE tenant_id = ${user.tenant_id}
        ${filters.patient_id ? db`AND patient_id = ${filters.patient_id}` : db``}
        ${filters.start_date ? db`AND created_at >= ${filters.start_date}` : db``}
        ${filters.end_date ? db`AND created_at <= ${filters.end_date}` : db``}
      ORDER BY created_at DESC
      LIMIT ${filters.limit || 100}
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
