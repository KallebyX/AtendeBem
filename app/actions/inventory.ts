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
  unit_cost?: number
  sale_price?: number
  supplier_name?: string
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
      INSERT INTO inventory_items (
        tenant_id, name, description, sku, category, unit,
        current_stock, min_stock, max_stock, unit_cost,
        sale_price, supplier_name
      ) VALUES (
        ${user.tenant_id}, ${data.name}, ${data.description || null},
        ${data.sku || null}, ${data.category}, ${data.unit || 'un'},
        ${data.current_stock || 0}, ${data.min_stock || 0},
        ${data.max_stock || null}, ${data.unit_cost || null},
        ${data.sale_price || null}, ${data.supplier_name || null}
      ) RETURNING *
    `

    // Verificar alerta de estoque baixo
    if (result[0].current_stock <= result[0].min_stock) {
      await db`
        INSERT INTO inventory_alerts (tenant_id, item_id, alert_type, alert_message)
        VALUES (
          ${user.tenant_id}, ${result[0].id}, 'low_stock',
          ${`Estoque baixo: ${result[0].name} (${result[0].current_stock} ${result[0].unit})`}
        )
      `
    }

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateInventoryItem(id: string, data: any) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const updates = Object.keys(data)
      .filter(k => data[k] !== undefined)
      .map((k, i) => `${k} = $${i + 2}`)
      .join(', ')
    
    const values = [id, ...Object.values(data).filter(v => v !== undefined)]
    
    const result = await db.query(
      `UPDATE inventory_items SET ${updates}, updated_at = NOW() WHERE id = $1 AND tenant_id = '${user.tenant_id}' RETURNING *`,
      values
    )

    if (result.rows.length === 0) return { error: 'Item não encontrado' }
    return { success: true, data: result.rows[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createInventoryMovement(data: {
  item_id: string
  type: 'entry' | 'exit' | 'adjustment'
  quantity: number
  unit_cost?: number
  reason?: string
  notes?: string
  appointment_id?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar estoque atual
    const item = await db`SELECT * FROM inventory_items WHERE id = ${data.item_id}`
    if (item.length === 0) return { error: 'Item não encontrado' }

    const currentStock = item[0].current_stock
    let newStock = currentStock

    if (data.type === 'entry') {
      newStock = currentStock + data.quantity
    } else if (data.type === 'exit') {
      if (currentStock < data.quantity) {
        return { error: 'Estoque insuficiente' }
      }
      newStock = currentStock - data.quantity
    } else if (data.type === 'adjustment') {
      newStock = data.quantity
    }

    const totalCost = data.unit_cost ? data.unit_cost * data.quantity : null

    // Criar movimentação
    const movement = await db`
      INSERT INTO inventory_movements (
        tenant_id, user_id, item_id, type, quantity, unit_cost,
        total_cost, reason, notes, appointment_id, stock_after
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.item_id}, ${data.type},
        ${data.quantity}, ${data.unit_cost || null}, ${totalCost},
        ${data.reason || null}, ${data.notes || null},
        ${data.appointment_id || null}, ${newStock}
      ) RETURNING *
    `

    // Atualizar estoque
    await db`
      UPDATE inventory_items
      SET current_stock = ${newStock}, updated_at = NOW()
      WHERE id = ${data.item_id}
    `

    // Verificar alertas
    if (newStock <= item[0].min_stock) {
      await db`
        INSERT INTO inventory_alerts (tenant_id, item_id, alert_type, alert_message)
        VALUES (
          ${user.tenant_id}, ${data.item_id}, 'low_stock',
          ${`Estoque baixo: ${item[0].name} (${newStock} ${item[0].unit})`}
        )
      `
    }

    return { success: true, data: movement[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getInventoryItems(filters?: {
  category?: string
  low_stock?: boolean
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `SELECT * FROM inventory_items WHERE tenant_id = $1 AND deleted_at IS NULL`
    const params = [user.tenant_id]
    let paramIndex = 2

    if (filters?.category) {
      query += ` AND category = $${paramIndex}`
      params.push(filters.category)
      paramIndex++
    }

    if (filters?.low_stock) {
      query += ` AND current_stock <= min_stock`
    }

    query += ` ORDER BY name`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getInventoryAlerts() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT a.*, i.name as item_name, i.current_stock, i.min_stock, i.unit
      FROM inventory_alerts a
      JOIN inventory_items i ON a.item_id = i.id
      WHERE a.tenant_id = ${user.tenant_id}
      AND a.is_resolved = false
      ORDER BY a.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getInventoryMovements(item_id?: string, limit: number = 50) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    let query = `
      SELECT m.*, i.name as item_name, u.name as user_name
      FROM inventory_movements m
      JOIN inventory_items i ON m.item_id = i.id
      JOIN users u ON m.user_id = u.id
      WHERE m.tenant_id = $1
    `
    const params = [user.tenant_id]

    if (item_id) {
      query += ` AND m.item_id = $2`
      params.push(item_id)
    }

    query += ` ORDER BY m.created_at DESC LIMIT ${limit}`

    const result = await db.query(query, params)
    return { success: true, data: result.rows }
  } catch (error: any) {
    return { error: error.message }
  }
}
