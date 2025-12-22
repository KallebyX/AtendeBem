'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
import { createTransactionFromBudget } from './financial'

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
  discount_percentage?: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Calcular totais
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
    const discountPercentage = data.discount_percentage || 0
    const discountAmount = totalAmount * (discountPercentage / 100)
    const finalAmount = totalAmount - discountAmount

    // Gerar numero do orcamento
    const count = await db`SELECT COUNT(*) FROM budgets WHERE user_id = ${user.id}`
    const budgetNumber = `ORC-${user.id.slice(0, 8)}-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    // Criar orcamento
    const budget = await db`
      INSERT INTO budgets (
        user_id, patient_id, budget_number, title, description,
        total_amount, discount_amount, discount_percentage, final_amount,
        valid_until, payment_type, installments, installment_amount, status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${budgetNumber},
        ${data.title}, ${data.description || null}, ${totalAmount},
        ${discountAmount}, ${discountPercentage}, ${finalAmount},
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
          budget_id, item_type, code, name,
          quantity, unit_price, total_price, sequence_order
        ) VALUES (
          ${budget[0].id}, ${item.item_type},
          ${item.code || null}, ${item.name}, ${item.quantity},
          ${item.unit_price}, ${item.quantity * item.unit_price}, ${index + 1}
        )
      `
    }

    return { success: true, data: budget[0] }
  } catch (error: any) {
    console.error('Erro ao criar orcamento:', error)
    return { error: error.message }
  }
}

export async function getBudgets(filters?: { patient_id?: string; status?: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = filters?.patient_id && filters?.status
      ? await db`
          SELECT b.*, p.full_name as patient_name,
            (SELECT COUNT(*) FROM budget_items bi WHERE bi.budget_id = b.id) as items_count
          FROM budgets b
          JOIN patients p ON b.patient_id = p.id
          WHERE b.user_id = ${user.id}
          AND b.patient_id = ${filters.patient_id}
          AND b.status = ${filters.status}
          ORDER BY b.created_at DESC
        `
      : filters?.patient_id
      ? await db`
          SELECT b.*, p.full_name as patient_name,
            (SELECT COUNT(*) FROM budget_items bi WHERE bi.budget_id = b.id) as items_count
          FROM budgets b
          JOIN patients p ON b.patient_id = p.id
          WHERE b.user_id = ${user.id}
          AND b.patient_id = ${filters.patient_id}
          ORDER BY b.created_at DESC
        `
      : filters?.status
      ? await db`
          SELECT b.*, p.full_name as patient_name,
            (SELECT COUNT(*) FROM budget_items bi WHERE bi.budget_id = b.id) as items_count
          FROM budgets b
          JOIN patients p ON b.patient_id = p.id
          WHERE b.user_id = ${user.id}
          AND b.status = ${filters.status}
          ORDER BY b.created_at DESC
        `
      : await db`
          SELECT b.*, p.full_name as patient_name,
            (SELECT COUNT(*) FROM budget_items bi WHERE bi.budget_id = b.id) as items_count
          FROM budgets b
          JOIN patients p ON b.patient_id = p.id
          WHERE b.user_id = ${user.id}
          ORDER BY b.created_at DESC
        `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar orcamentos:', error)
    return { error: error.message }
  }
}

export async function getBudgetById(id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const budget = await db`
      SELECT b.*, p.full_name as patient_name, p.cpf as patient_cpf
      FROM budgets b
      JOIN patients p ON b.patient_id = p.id
      WHERE b.id = ${id} AND b.user_id = ${user.id}
    `

    if (budget.length === 0) return { error: 'Orcamento nao encontrado' }

    const items = await db`
      SELECT * FROM budget_items
      WHERE budget_id = ${id}
      ORDER BY sequence_order
    `

    return { success: true, data: { ...budget[0], items } }
  } catch (error: any) {
    console.error('Erro ao buscar orcamento:', error)
    return { error: error.message }
  }
}

export async function approveBudget(budget_id: string, createFinancialTransaction: boolean = true) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE budgets
      SET status = 'approved', approved_at = NOW(), updated_at = NOW()
      WHERE id = ${budget_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Orcamento nao encontrado' }

    // INTEGRAÇÃO FINANCEIRA: Criar transações automaticamente
    let financialResult = null
    if (createFinancialTransaction) {
      try {
        financialResult = await createTransactionFromBudget(budget_id)
        if (financialResult.error) {
          console.warn('Aviso ao criar transação financeira do orçamento:', financialResult.error)
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
    console.error('Erro ao aprovar orcamento:', error)
    return { error: error.message }
  }
}

export async function rejectBudget(budget_id: string, reason: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE budgets
      SET status = 'rejected', rejected_at = NOW(), rejection_reason = ${reason}, updated_at = NOW()
      WHERE id = ${budget_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Orcamento nao encontrado' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao rejeitar orcamento:', error)
    return { error: error.message }
  }
}

export async function deleteBudget(budget_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Deletar itens primeiro
    await db`DELETE FROM budget_items WHERE budget_id = ${budget_id}`

    // Deletar orcamento
    const result = await db`
      DELETE FROM budgets
      WHERE id = ${budget_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Orcamento nao encontrado' }
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao deletar orcamento:', error)
    return { error: error.message }
  }
}
