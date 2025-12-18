'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
import { sendSMS, isValidBrazilianPhone } from '@/lib/twilio'

export async function sendSingleSMS(data: {
  patient_id?: string
  to_number: string
  message_text: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Verificar opt-out
    const optOut = await db`
      SELECT * FROM sms_opt_outs
      WHERE tenant_id = ${user.tenant_id}
      AND phone_number = ${data.to_number}
    `

    if (optOut.length > 0) {
      return { error: 'Número optou por não receber SMS' }
    }

    if (!isValidBrazilianPhone(data.to_number)) {
      return { error: 'Número de telefone inválido' }
    }

    // Enviar SMS
    const result = await sendSMS(data.to_number, data.message_text)

    // Salvar registro
    await db`
      INSERT INTO sms_messages (
        tenant_id, user_id, patient_id, to_number, message_text,
        twilio_sid, status, sent_at
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id || null},
        ${data.to_number}, ${data.message_text}, ${result.messageSid || null},
        ${result.success ? 'sent' : 'failed'}, NOW()
      )
    `

    return result
  } catch (error: any) {
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
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Calcular total de destinatários
    let totalRecipients = 0
    if (data.recipient_filter) {
      const count = await db.query(
        `SELECT COUNT(*) FROM patients WHERE tenant_id = $1 AND phone IS NOT NULL`,
        [user.tenant_id]
      )
      totalRecipients = parseInt(count.rows[0].count)
    }

    const result = await db`
      INSERT INTO sms_campaigns (
        tenant_id, user_id, name, message_template, scheduled_for,
        recipient_filter, total_recipients, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.name}, ${data.message_template},
        ${data.scheduled_for || null}, ${data.recipient_filter ? JSON.stringify(data.recipient_filter) : null},
        ${totalRecipients}, ${data.scheduled_for ? 'scheduled' : 'draft'}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getSMSCampaigns() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT c.*, u.name as created_by_name
      FROM sms_campaigns c
      JOIN users u ON c.user_id = u.id
      WHERE c.tenant_id = ${user.tenant_id}
      ORDER BY c.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getSMSMessages(filters?: {
  patient_id?: string
  campaign_id?: string
  status?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT s.*, p.name as patient_name, u.name as sent_by_name
      FROM sms_messages s
      LEFT JOIN patients p ON s.patient_id = p.id
      LEFT JOIN users u ON s.user_id = u.id
      WHERE s.tenant_id = $1
    `
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.patient_id) {
      query += ` AND s.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    if (filters?.campaign_id) {
      query += ` AND s.campaign_id = $${paramIndex}`
      params.push(filters.campaign_id)
      paramIndex++
    }

    if (filters?.status) {
      query += ` AND s.status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    query += ` ORDER BY s.created_at DESC LIMIT 100`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function addSMSOptOut(phone_number: string, reason?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    await db`
      INSERT INTO sms_opt_outs (tenant_id, phone_number, reason)
      VALUES (${user.tenant_id}, ${phone_number}, ${reason || null})
      ON CONFLICT (tenant_id, phone_number) DO NOTHING
    `

    // Marcar mensagens futuras
    await db`
      UPDATE sms_messages
      SET is_opt_out = true
      WHERE tenant_id = ${user.tenant_id}
      AND to_number = ${phone_number}
      AND status = 'queued'
    `

    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getSMSOptOuts() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT * FROM sms_opt_outs
      WHERE tenant_id = ${user.tenant_id}
      ORDER BY opted_out_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
