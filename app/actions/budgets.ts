'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createBudget(data: {
  patient_id: string
  title: string
  description?: string
  valid_until: string
  items: Array<{
    item_type: string
    code?: string
    name: string
    quantity: number
    unit_price: number
  }>
  payment_type?: string
  installments?: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Calcular totais
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
    const finalAmount = totalAmount // TODO: aplicar descontos

    // Gerar número do orçamento
    const count = await db`SELECT COUNT(*) FROM budgets WHERE tenant_id = ${user.tenant_id}`
    const budgetNumber = `ORC-${user.tenant_id.slice(0, 8)}-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    // Criar orçamento
    const budget = await db`
      INSERT INTO budgets (
        tenant_id, user_id, patient_id, budget_number, title, description,
        total_amount, final_amount, valid_until, payment_type, installments,
        installment_amount, status
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.patient_id}, ${budgetNumber},
        ${data.title}, ${data.description || null}, ${totalAmount}, ${finalAmount},
        ${data.valid_until}, ${data.payment_type || 'cash'},
        ${data.installments || 1},
        ${data.installments ? finalAmount / data.installments : finalAmount},
        'draft'
      ) RETURNING *
    `

    // Criar itens
    for (const [index, item] of data.items.entries()) {
      await db`
        INSERT INTO budget_items (
          budget_id, tenant_id, item_type, code, name,
          quantity, unit_price, total_price, sequence_order
        ) VALUES (
          ${budget[0].id}, ${user.tenant_id}, ${item.item_type},
          ${item.code || null}, ${item.name}, ${item.quantity},
          ${item.unit_price}, ${item.quantity * item.unit_price}, ${index + 1}
        )
      `
    }

    return { success: true, data: budget[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getBudgets(filters?: { patient_id?: string; status?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    let query = `
      SELECT b.*, p.name as patient_name,
        COUNT(bi.id) as items_count
      FROM budgets b
      JOIN patients p ON b.patient_id = p.id
      LEFT JOIN budget_items bi ON b.id = bi.budget_id
      WHERE b.tenant_id = $1
    `
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.patient_id) {
      query += ` AND b.patient_id = $${paramIndex}`
      params.push(filters.patient_id)
      paramIndex++
    }

    if (filters?.status) {
      query += ` AND b.status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    query += ` GROUP BY b.id, p.name ORDER BY b.created_at DESC`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function approveBudget(budget_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE budgets
      SET status = 'approved', approved_at = NOW(), updated_at = NOW()
      WHERE id = ${budget_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}
