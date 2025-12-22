'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function getNFeConfiguration() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT * FROM user_settings
      WHERE user_id = ${user.id}
    `

    // Return NFe config from user settings
    const settings = result[0] || {}
    return {
      success: true,
      data: {
        company_name: settings.clinic_name || '',
        company_cnpj: settings.preferences?.cnpj || '',
        company_ie: settings.preferences?.ie || '',
        address: settings.clinic_address || '',
        phone: settings.clinic_phone || '',
        email: user.email,
        environment: 'sandbox',
        configured: !!settings.preferences?.cnpj
      }
    }
  } catch (error: any) {
    console.error('Erro ao buscar configuracao NFe:', error)
    return { error: error.message }
  }
}

export async function updateNFeConfiguration(data: {
  company_name: string
  company_cnpj: string
  company_ie?: string
  company_im?: string
  address?: any
  phone?: string
  email?: string
  environment?: 'sandbox' | 'production'
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Store NFe config in user settings preferences
    const preferences = {
      cnpj: data.company_cnpj,
      ie: data.company_ie,
      im: data.company_im,
      nfe_environment: data.environment || 'sandbox'
    }

    const result = await db`
      INSERT INTO user_settings (user_id, clinic_name, clinic_address, clinic_phone, preferences)
      VALUES (${user.id}, ${data.company_name}, ${JSON.stringify(data.address) || null}, ${data.phone || null}, ${JSON.stringify(preferences)}::jsonb)
      ON CONFLICT (user_id) DO UPDATE SET
        clinic_name = ${data.company_name},
        clinic_address = COALESCE(${JSON.stringify(data.address) || null}, user_settings.clinic_address),
        clinic_phone = COALESCE(${data.phone || null}, user_settings.clinic_phone),
        preferences = user_settings.preferences || ${JSON.stringify(preferences)}::jsonb,
        updated_at = NOW()
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar configuracao NFe:', error)
    return { error: error.message }
  }
}

export async function createNFe(data: {
  patient_id: string
  appointment_id?: string
  services: any[]
  customer_name?: string
  customer_cpf_cnpj?: string
  invoice_type?: 'nfe' | 'nfse'
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get patient info
    const patient = await db`
      SELECT full_name, cpf FROM patients WHERE id = ${data.patient_id} AND user_id = ${user.id}
    `

    if (!patient.length) return { error: 'Paciente nao encontrado' }

    const invoiceType = data.invoice_type || 'nfse'

    // Calculate values
    const servicesValue = data.services.reduce((sum: number, s: any) => sum + (s.quantity || 1) * (s.unit_price || 0), 0)
    const issRate = 2.0 // 2% ISS
    const issValue = servicesValue * (issRate / 100)
    const netValue = servicesValue - issValue

    // Generate invoice number
    const count = await db`SELECT COUNT(*) FROM nfe_invoices WHERE user_id = ${user.id}`
    const invoiceNumber = `${invoiceType.toUpperCase()}-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    const result = await db`
      INSERT INTO nfe_invoices (
        user_id, patient_id, invoice_number, series, issue_date,
        operation_type, items, total_value, payment_method, status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${invoiceNumber}, '1',
        NOW(), 'servico', ${JSON.stringify(data.services)}::jsonb,
        ${servicesValue}, 'dinheiro', 'draft'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar NFe:', error)
    return { error: error.message }
  }
}

export async function getNFeInvoices(filters?: {
  patient_id?: string
  status?: string
  start_date?: string
  end_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT n.*, p.full_name as patient_name
      FROM nfe_invoices n
      LEFT JOIN patients p ON n.patient_id = p.id
      WHERE n.user_id = ${user.id}
      ${filters?.patient_id ? db`AND n.patient_id = ${filters.patient_id}` : db``}
      ${filters?.status ? db`AND n.status = ${filters.status}` : db``}
      ${filters?.start_date ? db`AND n.issue_date >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND n.issue_date <= ${filters.end_date}` : db``}
      ORDER BY n.issue_date DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar NFes:', error)
    return { error: error.message }
  }
}

export async function getNFes(filters?: {
  patient_id?: string
  status?: string
  start_date?: string
  end_date?: string
}) {
  return getNFeInvoices(filters)
}

export async function sendNFeToAPI(invoice_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get invoice
    const invoice = await db`
      SELECT * FROM nfe_invoices WHERE id = ${invoice_id} AND user_id = ${user.id}
    `

    if (!invoice.length) return { error: 'Nota fiscal nao encontrada' }

    // Simulate sending to API
    const simulatedProtocol = `PROT-${Date.now()}`
    const simulatedAccessKey = String(Math.random()).slice(2, 46).padEnd(44, '0')

    await db`
      UPDATE nfe_invoices
      SET status = 'authorized',
          protocol_number = ${simulatedProtocol},
          access_key = ${simulatedAccessKey},
          updated_at = NOW()
      WHERE id = ${invoice_id} AND user_id = ${user.id}
    `

    return {
      success: true,
      message: 'Nota fiscal enviada com sucesso (simulado)',
      protocol: simulatedProtocol
    }
  } catch (error: any) {
    console.error('Erro ao enviar NFe:', error)
    return { error: error.message }
  }
}

export async function cancelNFe(invoice_id: string, reason: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE nfe_invoices
      SET status = 'cancelled', updated_at = NOW()
      WHERE id = ${invoice_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Nota fiscal nao encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao cancelar NFe:', error)
    return { error: error.message }
  }
}
