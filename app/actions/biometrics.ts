"use server"

import { getDb } from "@/lib/db"
import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import { setUserContext } from "@/lib/db-init"
import crypto from "crypto"

// Função helper para gerar hash de template (simulação)
function hashTemplate(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

export async function enrollBiometric(data: {
  patient_id: string
  biometric_type: "fingerprint" | "facial" | "iris" | "voice" | "palm"
  template_data?: string
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    // Gerar template simulado se não fornecido
    const templateData = data.template_data || `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const templateHash = hashTemplate(templateData)

    const result = await db`
      INSERT INTO biometric_templates (
        user_id, patient_id, biometric_type, template_data,
        finger_position, face_angle, capture_device, device_serial,
        capture_quality, is_active, consent_given, consent_date,
        consent_ip_address
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${data.biometric_type},
        ${templateHash}, ${data.finger_position || null}, ${data.face_angle || null},
        ${data.capture_device || 'web_camera'}, ${data.device_serial || null},
        ${data.capture_quality || 85}, true, true, NOW(),
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
  template_data?: string
  verification_type: "authentication" | "authorization" | "attendance" | "prescription_signature"
  appointment_id?: string
  prescription_id?: string
  device_info?: any
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    // Buscar templates ativos do paciente
    const templates = await db`
      SELECT id, template_data, biometric_type
      FROM biometric_templates
      WHERE patient_id = ${data.patient_id}
        AND user_id = ${user.id}
        AND biometric_type = ${data.biometric_type}
        AND is_active = true
    `

    if (!templates.length) {
      return { error: "Nenhum template biometrico cadastrado" }
    }

    // Simular comparação biométrica
    // Em produção, usar SDK do fabricante
    const bestMatch = Math.floor(Math.random() * 25) + 75 // 75-100
    const matchedTemplateId = templates[0].id
    const verificationResult = bestMatch >= 70

    // Registrar verificação
    const verification = await db`
      INSERT INTO biometric_verifications (
        user_id, template_id, verification_result, match_score,
        verification_type, appointment_id, prescription_id,
        device_info, ip_address
      ) VALUES (
        ${user.id}, ${matchedTemplateId}, ${verificationResult},
        ${bestMatch}, ${data.verification_type}, ${data.appointment_id || null},
        ${data.prescription_id || null}, ${data.device_info ? JSON.stringify(data.device_info) : null},
        ${data.device_info?.ip || null}
      ) RETURNING *
    `

    // Atualizar contador de verificações
    if (verificationResult) {
      await db`
        UPDATE biometric_templates
        SET verified_count = COALESCE(verified_count, 0) + 1,
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = patient_id
      ? await db`
          SELECT bt.id, bt.biometric_type as template_type, bt.finger_position, bt.face_angle,
                 bt.capture_quality, bt.is_active, bt.verified_count,
                 bt.last_verified_at, bt.created_at, bt.patient_id,
                 p.full_name as patient_name
          FROM biometric_templates bt
          JOIN patients p ON bt.patient_id = p.id
          WHERE bt.user_id = ${user.id}
          AND bt.patient_id = ${patient_id}
          ORDER BY bt.created_at DESC
          LIMIT 100
        `
      : await db`
          SELECT bt.id, bt.biometric_type as template_type, bt.finger_position, bt.face_angle,
                 bt.capture_quality, bt.is_active, bt.verified_count,
                 bt.last_verified_at, bt.created_at, bt.patient_id,
                 p.full_name as patient_name
          FROM biometric_templates bt
          JOIN patients p ON bt.patient_id = p.id
          WHERE bt.user_id = ${user.id}
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE biometric_templates
      SET is_active = false, updated_at = NOW()
      WHERE id = ${template_id} AND user_id = ${user.id}
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

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      DELETE FROM biometric_templates
      WHERE id = ${template_id} AND user_id = ${user.id}
      RETURNING id
    `

    if (result.length === 0) return { error: "Template nao encontrado" }
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getVerificationHistory(patient_id?: string, limit: number = 50) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Nao autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Token invalido" }

    await setUserContext(user.id)
    const db = await getDb()

    const result = patient_id
      ? await db`
          SELECT bv.*, bt.biometric_type, p.full_name as patient_name
          FROM biometric_verifications bv
          JOIN biometric_templates bt ON bv.template_id = bt.id
          JOIN patients p ON bt.patient_id = p.id
          WHERE bv.user_id = ${user.id}
          AND bt.patient_id = ${patient_id}
          ORDER BY bv.created_at DESC
          LIMIT ${limit}
        `
      : await db`
          SELECT bv.*, bt.biometric_type, p.full_name as patient_name
          FROM biometric_verifications bv
          JOIN biometric_templates bt ON bv.template_id = bt.id
          JOIN patients p ON bt.patient_id = p.id
          WHERE bv.user_id = ${user.id}
          ORDER BY bv.created_at DESC
          LIMIT ${limit}
        `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
