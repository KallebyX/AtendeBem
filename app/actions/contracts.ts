'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setFullContext } from '@/lib/db-init'
import { createTransactionFromContract } from './financial'

export async function createContract(data: {
  patient_id: string
  title: string
  contract_type: string
  content: string
  template_id?: string
  valid_from?: string
  valid_until?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setFullContext(user.id)
    const db = await getDb()

    // Gerar numero do contrato
    const count = await db`SELECT COUNT(*) FROM contracts WHERE user_id = ${user.id}`
    const contractNumber = `CTR-${user.id.slice(0, 8)}-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    const result = await db`
      INSERT INTO contracts (
        user_id, patient_id, contract_number, title,
        contract_type, content, template_id, valid_from, valid_until, status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${contractNumber},
        ${data.title}, ${data.contract_type}, ${data.content},
        ${data.template_id || null}, ${data.valid_from || null}, ${data.valid_until || null}, 'draft'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar contrato:', error)
    return { error: error.message }
  }
}

export async function getContracts(filters?: { patient_id?: string; status?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setFullContext(user.id)
    const db = await getDb()

    const result = filters?.patient_id && filters?.status
      ? await db`
          SELECT c.*, p.full_name as patient_name, p.cpf as patient_cpf
          FROM contracts c
          JOIN patients p ON c.patient_id = p.id
          WHERE c.user_id = ${user.id}
          AND c.patient_id = ${filters.patient_id}
          AND c.status = ${filters.status}
          ORDER BY c.created_at DESC
        `
      : filters?.patient_id
      ? await db`
          SELECT c.*, p.full_name as patient_name, p.cpf as patient_cpf
          FROM contracts c
          JOIN patients p ON c.patient_id = p.id
          WHERE c.user_id = ${user.id}
          AND c.patient_id = ${filters.patient_id}
          ORDER BY c.created_at DESC
        `
      : filters?.status
      ? await db`
          SELECT c.*, p.full_name as patient_name, p.cpf as patient_cpf
          FROM contracts c
          JOIN patients p ON c.patient_id = p.id
          WHERE c.user_id = ${user.id}
          AND c.status = ${filters.status}
          ORDER BY c.created_at DESC
        `
      : await db`
          SELECT c.*, p.full_name as patient_name, p.cpf as patient_cpf
          FROM contracts c
          JOIN patients p ON c.patient_id = p.id
          WHERE c.user_id = ${user.id}
          ORDER BY c.created_at DESC
        `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar contratos:', error)
    return { error: error.message }
  }
}

export async function getContractById(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setFullContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT c.*, p.full_name as patient_name, p.cpf as patient_cpf
      FROM contracts c
      JOIN patients p ON c.patient_id = p.id
      WHERE c.id = ${id} AND c.user_id = ${user.id}
    `

    if (result.length === 0) return { error: 'Contrato nao encontrado' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao buscar contrato:', error)
    return { error: error.message }
  }
}

export async function getContractTemplates(type?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setFullContext(user.id)
    const db = await getDb()

    const result = type
      ? await db`
          SELECT * FROM contract_templates
          WHERE (user_id = ${user.id} OR is_public = true) AND is_active = true
          AND contract_type = ${type}
          ORDER BY is_public DESC, name ASC
        `
      : await db`
          SELECT * FROM contract_templates
          WHERE (user_id = ${user.id} OR is_public = true) AND is_active = true
          ORDER BY is_public DESC, name ASC
        `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar templates:', error)
    return { error: error.message }
  }
}

export async function signContract(data: {
  contract_id: string
  signature_url: string
  ip_address?: string
  user_agent?: string
  // Dados financeiros para contratos tipo payment_plan
  payment_plan?: {
    total_amount: number
    installments?: number
    payment_method?: string
    first_due_date?: string
  }
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setFullContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE contracts
      SET
        professional_signed_at = NOW(),
        professional_signature_url = ${data.signature_url},
        status = CASE
          WHEN patient_signed_at IS NOT NULL THEN 'signed'
          ELSE 'pending_signature'
        END,
        updated_at = NOW()
      WHERE id = ${data.contract_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Contrato nao encontrado' }

    // INTEGRAÇÃO FINANCEIRA: Criar transações para contratos payment_plan assinados
    let financialResult = null
    const contract = result[0]
    if (contract.status === 'signed' && data.payment_plan && data.payment_plan.total_amount > 0) {
      try {
        financialResult = await createTransactionFromContract(data.contract_id, data.payment_plan)
        if (financialResult.error) {
          console.warn('Aviso ao criar transação financeira do contrato:', financialResult.error)
        }
      } catch (err) {
        console.warn('Aviso ao criar transação financeira:', err)
      }
    }

    return {
      success: true,
      data: result[0],
      financial: financialResult?.data || null
    }
  } catch (error: any) {
    console.error('Erro ao assinar contrato:', error)
    return { error: error.message }
  }
}

export async function signContractPatient(data: {
  contract_id: string
  signature_url: string
  ip_address?: string
  user_agent?: string
  // Dados financeiros para contratos tipo payment_plan
  payment_plan?: {
    total_amount: number
    installments?: number
    payment_method?: string
    first_due_date?: string
  }
}) {
  try {
    const db = await getDb()

    const result = await db`
      UPDATE contracts
      SET
        patient_signed_at = NOW(),
        patient_signature_url = ${data.signature_url},
        patient_ip_address = ${data.ip_address || null}::inet,
        patient_user_agent = ${data.user_agent || null},
        status = CASE
          WHEN professional_signed_at IS NOT NULL THEN 'signed'
          ELSE 'pending_signature'
        END,
        updated_at = NOW()
      WHERE id = ${data.contract_id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Contrato nao encontrado' }

    // INTEGRAÇÃO FINANCEIRA: Criar transações para contratos payment_plan assinados
    let financialResult = null
    const contract = result[0]
    if (contract.status === 'signed' && data.payment_plan && data.payment_plan.total_amount > 0) {
      try {
        financialResult = await createTransactionFromContract(data.contract_id, data.payment_plan)
        if (financialResult.error) {
          console.warn('Aviso ao criar transação financeira do contrato:', financialResult.error)
        }
      } catch (err) {
        console.warn('Aviso ao criar transação financeira:', err)
      }
    }

    return {
      success: true,
      data: result[0],
      financial: financialResult?.data || null
    }
  } catch (error: any) {
    console.error('Erro ao assinar contrato (paciente):', error)
    return { error: error.message }
  }
}

export async function deleteContract(contract_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setFullContext(user.id)
    const db = await getDb()

    const result = await db`
      DELETE FROM contracts
      WHERE id = ${contract_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Contrato nao encontrado' }
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao deletar contrato:', error)
    return { error: error.message }
  }
}
