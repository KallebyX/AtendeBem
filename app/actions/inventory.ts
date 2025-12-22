'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createInventoryItem(data: {
  name: string
  description?: string
  sku?: string
  category: string
  unit?: string
  current_stock?: number
  min_stock?: number
  max_stock?: number
  cost_price?: number
  sale_price?: number
  supplier?: string
  location?: string
  expiration_date?: string
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
      INSERT INTO inventory_items (
        user_id, name, description, sku, category, unit,
        current_stock, min_stock, max_stock, cost_price,
        sale_price, supplier, location, expiration_date
      ) VALUES (
        ${user.id}, ${data.name}, ${data.description || null},
        ${data.sku || null}, ${data.category}, ${data.unit || 'unidade'},
        ${data.current_stock || 0}, ${data.min_stock || 0},
        ${data.max_stock || null}, ${data.cost_price || null},
        ${data.sale_price || null}, ${data.supplier || null},
        ${data.location || null}, ${data.expiration_date || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar item:', error)
    return { error: error.message }
  }
}

export async function updateInventoryItem(id: string, data: {
  name?: string
  description?: string
  sku?: string
  category?: string
  unit?: string
  current_stock?: number
  min_stock?: number
  max_stock?: number
  cost_price?: number
  sale_price?: number
  supplier?: string
  location?: string
  expiration_date?: string
  is_active?: boolean
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
      UPDATE inventory_items SET
        name = COALESCE(${data.name || null}, name),
        description = COALESCE(${data.description || null}, description),
        sku = COALESCE(${data.sku || null}, sku),
        category = COALESCE(${data.category || null}, category),
        unit = COALESCE(${data.unit || null}, unit),
        current_stock = COALESCE(${data.current_stock ?? null}, current_stock),
        min_stock = COALESCE(${data.min_stock ?? null}, min_stock),
        max_stock = COALESCE(${data.max_stock ?? null}, max_stock),
        cost_price = COALESCE(${data.cost_price ?? null}, cost_price),
        sale_price = COALESCE(${data.sale_price ?? null}, sale_price),
        supplier = COALESCE(${data.supplier || null}, supplier),
        location = COALESCE(${data.location || null}, location),
        expiration_date = COALESCE(${data.expiration_date || null}, expiration_date),
        is_active = COALESCE(${data.is_active ?? null}, is_active),
        updated_at = NOW()
      WHERE id = ${id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Item nao encontrado' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar item:', error)
    return { error: error.message }
  }
}

export async function createInventoryMovement(data: {
  item_id: string
  movement_type: 'entry' | 'exit' | 'adjustment' | 'transfer'
  quantity: number
  unit_cost?: number
  reference_type?: string
  reference_id?: string
  notes?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get current stock
    const item = await db`
      SELECT * FROM inventory_items
      WHERE id = ${data.item_id} AND user_id = ${user.id}
    `

    if (item.length === 0) return { error: 'Item nao encontrado' }

    const currentStock = Number(item[0].current_stock) || 0
    let newStock = currentStock

    if (data.movement_type === 'entry') {
      newStock = currentStock + data.quantity
    } else if (data.movement_type === 'exit') {
      if (currentStock < data.quantity) {
        return { error: 'Estoque insuficiente' }
      }
      newStock = currentStock - data.quantity
    } else if (data.movement_type === 'adjustment') {
      newStock = data.quantity
    }

    const totalCost = data.unit_cost ? data.unit_cost * data.quantity : null

    // Create movement
    const movement = await db`
      INSERT INTO inventory_movements (
        item_id, user_id, movement_type, quantity,
        unit_cost, total_cost, reference_type, reference_id, notes
      ) VALUES (
        ${data.item_id}, ${user.id}, ${data.movement_type},
        ${data.quantity}, ${data.unit_cost || null}, ${totalCost},
        ${data.reference_type || null}, ${data.reference_id || null},
        ${data.notes || null}
      ) RETURNING *
    `

    // Update stock
    await db`
      UPDATE inventory_items
      SET current_stock = ${newStock}, updated_at = NOW()
      WHERE id = ${data.item_id} AND user_id = ${user.id}
    `

    return { success: true, data: movement[0] }
  } catch (error: any) {
    console.error('Erro ao criar movimentacao:', error)
    return { error: error.message }
  }
}

export async function getInventoryItems(filters?: {
  category?: string
  low_stock?: boolean
  search?: string
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
      SELECT * FROM inventory_items
      WHERE user_id = ${user.id}
      AND is_active = true
      ${filters?.category ? db`AND category = ${filters.category}` : db``}
      ${filters?.low_stock ? db`AND current_stock <= min_stock` : db``}
      ${filters?.search ? db`AND (name ILIKE ${'%' + filters.search + '%'} OR sku ILIKE ${'%' + filters.search + '%'})` : db``}
      ORDER BY name
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar itens:', error)
    return { error: error.message }
  }
}

export async function getInventoryAlerts() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get items with low stock
    const result = await db`
      SELECT
        id, name, sku, category, unit,
        current_stock, min_stock, max_stock,
        'low_stock' as alert_type,
        CASE
          WHEN current_stock = 0 THEN 'Estoque zerado'
          ELSE 'Estoque abaixo do minimo'
        END as alert_message
      FROM inventory_items
      WHERE user_id = ${user.id}
      AND is_active = true
      AND current_stock <= min_stock
      ORDER BY current_stock ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar alertas:', error)
    return { error: error.message }
  }
}

export async function getInventoryMovements(item_id?: string, limit: number = 50) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = item_id
      ? await db`
          SELECT m.*, i.name as item_name, u.name as user_name
          FROM inventory_movements m
          JOIN inventory_items i ON m.item_id = i.id
          JOIN users u ON m.user_id = u.id
          WHERE m.user_id = ${user.id}
          AND m.item_id = ${item_id}
          ORDER BY m.created_at DESC
          LIMIT ${limit}
        `
      : await db`
          SELECT m.*, i.name as item_name, u.name as user_name
          FROM inventory_movements m
          JOIN inventory_items i ON m.item_id = i.id
          JOIN users u ON m.user_id = u.id
          WHERE m.user_id = ${user.id}
          ORDER BY m.created_at DESC
          LIMIT ${limit}
        `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar movimentacoes:', error)
    return { error: error.message }
  }
}

export async function deleteInventoryItem(item_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE inventory_items
      SET is_active = false, updated_at = NOW()
      WHERE id = ${item_id} AND user_id = ${user.id}
      RETURNING id
    `

    if (result.length === 0) return { error: 'Item nao encontrado' }
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir item:', error)
    return { error: error.message }
  }
}

export async function getInventoryStats() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const stats = await db`
      SELECT
        COUNT(*) as total_items,
        COUNT(*) FILTER (WHERE current_stock <= min_stock) as low_stock_count,
        COUNT(*) FILTER (WHERE current_stock = 0) as zero_stock_count,
        COALESCE(SUM(current_stock * cost_price), 0) as total_value
      FROM inventory_items
      WHERE user_id = ${user.id} AND is_active = true
    `

    return { success: true, data: stats[0] }
  } catch (error: any) {
    console.error('Erro ao buscar estatisticas:', error)
    return { error: error.message }
  }
}
