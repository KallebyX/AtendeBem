"use server"

import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"

export async function sendWhatsAppMessage(data: {
  patient_id?: string
  phone_number: string
  message_text: string
  template_name?: string
  template_params?: Record<string, string>
}) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    // Buscar ou criar conversa (removed tenant_id)
    let conversation = await db`
      SELECT * FROM whatsapp_conversations
      WHERE phone_number = ${data.phone_number}
      AND user_id = ${user.id}
    `

    if (conversation.length === 0) {
      conversation = await db`
        INSERT INTO whatsapp_conversations (
          user_id, patient_id, phone_number, last_message_at, last_message_text, last_message_from
        ) VALUES (
          ${user.id}, ${data.patient_id || null}, ${data.phone_number},
          NOW(), ${data.message_text}, 'clinic'
        ) RETURNING *
      `
    } else {
      await db`
        UPDATE whatsapp_conversations
        SET last_message_at = NOW(), last_message_text = ${data.message_text}, last_message_from = 'clinic', updated_at = NOW()
        WHERE id = ${conversation[0].id}
      `
    }

    // Salvar mensagem (removed tenant_id)
    await db`
      INSERT INTO whatsapp_messages (
        user_id, conversation_id, direction, from_number, to_number,
        content_text, template_name, template_params, status, sent_by
      ) VALUES (
        ${user.id}, ${conversation[0].id}, 'outbound',
        'clinic', ${data.phone_number}, ${data.message_text},
        ${data.template_name || null}, ${data.template_params ? JSON.stringify(data.template_params) : null},
        'sent', ${user.id}
      )
    `

    return { success: true, message: "Mensagem enviada" }
  } catch (error: any) {
    console.error("[v0] WhatsApp send error:", error)
    return { error: error.message }
  }
}

export async function getWhatsAppConversations(filters?: { status?: string }) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = await getDb()

    const result = await db`
      SELECT c.*, p.name as patient_name, p.email as patient_email
      FROM whatsapp_conversations c
      LEFT JOIN patients p ON c.patient_id = p.id
      WHERE c.user_id = ${user.id}
      ${filters?.status ? db`AND c.status = ${filters.status}` : db``}
      ORDER BY c.last_message_at DESC NULLS LAST
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] WhatsApp conversations error:", error)
    return { error: error.message, data: [] }
  }
}

export async function getWhatsAppMessages(conversation_id: string, limit = 100) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado", data: [] }

    const db = await getDb()

    const result = await db`
      SELECT m.*, u.name as sent_by_name
      FROM whatsapp_messages m
      LEFT JOIN users u ON m.sent_by = u.id
      WHERE m.conversation_id = ${conversation_id}
      AND m.user_id = ${user.id}
      ORDER BY m.created_at ASC
      LIMIT ${limit}
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error("[v0] WhatsApp messages error:", error)
    return { error: error.message, data: [] }
  }
}

export async function markConversationAsRead(conversation_id: string) {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Não autenticado" }

    const db = await getDb()

    await db`
      UPDATE whatsapp_conversations
      SET unread_count = 0, updated_at = NOW()
      WHERE id = ${conversation_id} AND user_id = ${user.id}
    `

    return { success: true }
  } catch (error: any) {
    console.error("[v0] Mark conversation read error:", error)
    return { error: error.message }
  }
}

export async function getWhatsAppStatus() {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Nao autenticado", data: null }

    // Simulated WhatsApp Business API status
    // In production, this would check the actual WhatsApp Business API connection
    return {
      success: true,
      data: {
        connected: false,
        phone_number: null,
        business_name: null,
        status: "disconnected",
        qr_code: null,
        last_connected_at: null
      }
    }
  } catch (error: any) {
    console.error("[v0] WhatsApp status error:", error)
    return { error: error.message, data: null }
  }
}

export async function connectWhatsApp() {
  try {
    const user = await getCurrentUser()
    if (!user) return { error: "Nao autenticado" }

    // Simulated QR code generation for WhatsApp Web connection
    // In production, this would integrate with WhatsApp Business API
    const mockQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-connect-${user.id}-${Date.now()}`

    return {
      success: true,
      data: {
        qr_code: mockQRCode,
        expires_at: new Date(Date.now() + 60000).toISOString() // 1 minute expiry
      }
    }
  } catch (error: any) {
    console.error("[v0] WhatsApp connect error:", error)
    return { error: error.message }
  }
}
