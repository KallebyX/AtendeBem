"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function sendSingleSMS(data: {
  patient_id?: string
  to_number: string
  message_text: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = getDb()

    // Verificar opt-out
    const optOut = await db`
      SELECT * FROM sms_opt_outs
      WHERE user_id = ${user.id}
      AND phone_number = ${data.to_number}
    `

    if (optOut.length > 0) {
      return { error: "Número optou por não receber SMS" }
    }

    // Enviar SMS
    const result = await sendSMS(data.to_number, data.message_text)

    // Salvar registro
    await db`
      INSERT INTO sms_messages (
        user_id, patient_id, to_number, message_text,
        twilio_sid, status, sent_at
      ) VALUES (
        ${user.id}, ${data.patient_id || null}, ${data.to_number}, ${data.message_text},
        ${result.messageSid || null}, ${result.success ? "sent" : "failed"}, NOW()
      )
    `

    return result
  } catch (error: any) {
    console.error("[v0] SMS send error:", error)
    return { error: error.message }
  }
}

export async function createSMSCampaign(data: {
  name: string
  message_template: string
  scheduled_for?: string
  recipient_filter?: any
}) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = getDb()

    // Calcular total de destinatários
    let totalRecipients = 0
    if (data.recipient_filter) {
      const count = await db`SELECT COUNT(*) FROM patients WHERE user_id = ${user.id} AND phone IS NOT NULL`
      totalRecipients = Number(count[0].count)
    }

    const result = await db`
      INSERT INTO sms_campaigns (
        user_id, name, message_template, scheduled_for,
        recipient_filter, total_recipients, status
      ) VALUES (
        ${user.id}, ${data.name}, ${data.message_template},
        ${data.scheduled_for || null}, ${data.recipient_filter ? JSON.stringify(data.recipient_filter) : null},
        ${totalRecipients}, ${data.scheduled_for ? "scheduled" : "draft"}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("[v0] SMS campaign create error:", error)
    return { error: error.message }
  }
}

export async function getSMSCampaigns() {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = getDb()

    const result = await db`
      SELECT c.*, u.name as created_by_name
      FROM sms_campaigns c
      JOIN users u ON c.user_id = u.id
      WHERE c.user_id = ${user.id}
      ORDER BY c.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] SMS campaigns error:", error)
    return { error: error.message, data: [] }
  }
}

export async function getSMSMessages(filters?: {
  patient_id?: string
  campaign_id?: string
  status?: string
}) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = getDb()

    const result = await db`
      SELECT s.*, p.name as patient_name, u.name as sent_by_name
      FROM sms_messages s
      LEFT JOIN patients p ON s.patient_id = p.id
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.user_id = ${user.id}
      ${filters?.patient_id ? db`AND s.patient_id = ${filters.patient_id}` : db``}
      ${filters?.campaign_id ? db`AND s.campaign_id = ${filters.campaign_id}` : db``}
      ${filters?.status ? db`AND s.status = ${filters.status}` : db``}
      ORDER BY s.created_at DESC 
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] SMS messages error:", error)
    return { error: error.message, data: [] }
  }
}

export async function addSMSOptOut(phone_number: string, reason?: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = getDb()

    await db`
      INSERT INTO sms_opt_outs (user_id, phone_number, reason)
      VALUES (${user.id}, ${phone_number}, ${reason || null})
      ON CONFLICT (user_id, phone_number) DO NOTHING
    `

    await db`
      UPDATE sms_messages
      SET is_opt_out = true
      WHERE user_id = ${user.id}
      AND to_number = ${phone_number}
      AND status = 'queued'
    `

    return { success: true }
  } catch (error: any) {
    console.error("[v0] SMS opt-out error:", error)
    return { error: error.message }
  }
}

export async function getSMSOptOuts() {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = getDb()

    const result = await db`
      SELECT * FROM sms_opt_outs
      WHERE user_id = ${user.id}
      ORDER BY opted_out_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] SMS opt-outs error:", error)
    return { error: error.message, data: [] }
  }
}

function sendSMS(to_number: string, message_text: string) {
  // Placeholder for Twilio SMS sending logic
  return { messageSid: "fake-sid", success: true }
}
