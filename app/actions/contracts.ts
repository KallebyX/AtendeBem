'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createContract(data: {
  patient_id: string
  title: string
  contract_type: string
  content: string
  template_id?: string
  valid_until?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Gerar número do contrato
    const count = await db`SELECT COUNT(*) FROM contracts WHERE tenant_id = ${user.tenant_id}`
    const contractNumber = `CTR-${user.tenant_id.slice(0, 8)}-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    const result = await db`
      INSERT INTO contracts (
        tenant_id, user_id, patient_id, contract_number, title,
        contract_type, content, template_id, valid_until, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id}, ${contractNumber},
        ${data.title}, ${data.contract_type}, ${data.content},
        ${data.template_id || null}, ${data.valid_until || null}, 'draft'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getContracts(filters?: { patient_id?: string; status?: string }) {
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
      FROM contracts c
      JOIN patients p ON c.patient_id = p.id
      WHERE c.tenant_id = $1
    `
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.patient_id) {
      query += ` AND c.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    if (filters?.status) {
      query += ` AND c.status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    query += ` ORDER BY c.created_at DESC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getContractTemplates(type?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT * FROM contract_templates
      WHERE (tenant_id = $1 OR is_public = true) AND is_active = true
    `
    const params = [user.tenant_id]

    if (type) {
      query += ` AND contract_type = $2`
      params.push(type)
    }

    query += ` ORDER BY is_public DESC, name ASC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function signContract(data: {
  contract_id: string
  signature_url: string
  ip_address: string
  user_agent: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      UPDATE contracts
      SET 
        professional_signed_at = NOW(),
        professional_signature_url = ${data.signature_url},
        professional_ip_address = ${data.ip_address}::inet,
        status = 'signed',
        updated_at = NOW()
      WHERE id = ${data.contract_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}
