'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
import { sendWhatsAppTemplate, sendWhatsAppText } from '@/lib/whatsapp'

export async function sendWhatsAppMessage(data: {
  patient_id?: string
  phone_number: string
  message_text: string
  template_name?: string
  template_params?: Record<string, string>
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar ou criar conversa
    let conversation = await db`
      SELECT * FROM whatsapp_conversations
      WHERE phone_number = ${data.phone_number}
      AND tenant_id = ${user.tenant_id}
    `

    if (conversation.length === 0) {
      conversation = await db`
        INSERT INTO whatsapp_conversations (
          tenant_id, patient_id, phone_number, last_message_at, last_message_text, last_message_from
        ) VALUES (
          ${user.tenant_id}, ${data.patient_id || null}, ${data.phone_number},
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

    // Enviar via WhatsApp API
    let result
    if (data.template_name) {
      result = await sendWhatsAppTemplate(data.phone_number, data.template_name, data.template_params || {})
    } else {
      result = await sendWhatsAppText(data.phone_number, data.message_text)
    }

    // Salvar mensagem
    await db`
      INSERT INTO whatsapp_messages (
        tenant_id, conversation_id, direction, from_number, to_number,
        content_text, template_name, template_params, status, sent_by
      ) VALUES (
        ${user.tenant_id}, ${conversation[0].id}, 'outbound',
        'clinic', ${data.phone_number}, ${data.message_text},
        ${data.template_name || null}, ${data.template_params ? JSON.stringify(data.template_params) : null},
        ${result.success ? 'sent' : 'failed'}, ${user.id}
      )
    `

    return result
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getWhatsAppConversations(filters?: { status?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT c.*, p.name as patient_name
      FROM whatsapp_conversations c
      LEFT JOIN patients p ON c.patient_id = p.id
      WHERE c.tenant_id = $1
    `
    const params = [user.tenant_id]

    if (filters?.status) {
      query += ` AND c.status = $2`
      params.push(filters.status)
    }

    query += ` ORDER BY c.last_message_at DESC NULLS LAST`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getWhatsAppMessages(conversation_id: string, limit: number = 100) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT m.*, u.name as sent_by_name
      FROM whatsapp_messages m
      LEFT JOIN users u ON m.sent_by = u.id
      WHERE m.conversation_id = ${conversation_id}
      AND m.tenant_id = ${user.tenant_id}
      ORDER BY m.created_at ASC
      LIMIT ${limit}
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function markConversationAsRead(conversation_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    await db`
      UPDATE whatsapp_conversations
      SET unread_count = 0, updated_at = NOW()
      WHERE id = ${conversation_id} AND tenant_id = ${user.tenant_id}
    `

    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}
