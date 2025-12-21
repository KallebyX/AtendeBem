'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createClinic(data: {
  name: string
  cnpj?: string
  phone?: string
  email?: string
  address?: any
  opening_hours?: any
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO clinics (
        tenant_id, name, cnpj, phone, email,
        address_street, address_number, address_city, address_state,
        opening_hours, is_active
      ) VALUES (
        ${user.tenant_id}, ${data.name}, ${data.cnpj || null},
        ${data.phone || null}, ${data.email || null},
        ${data.address?.street || null}, ${data.address?.number || null},
        ${data.address?.city || null}, ${data.address?.state || null},
        ${data.opening_hours ? JSON.stringify(data.opening_hours) : '{}'}::jsonb,
        true
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getClinics() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT * FROM clinics
      WHERE tenant_id = ${user.tenant_id} AND is_active = true
      ORDER BY is_primary DESC, name ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createRoom(data: {
  clinic_id: string
  name: string
  room_number?: string
  room_type: string
  capacity?: number
  equipment?: any[]
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO rooms (
        clinic_id, tenant_id, name, room_number, room_type,
        capacity, equipment, is_active
      ) VALUES (
        ${data.clinic_id}, ${user.tenant_id}, ${data.name},
        ${data.room_number || null}, ${data.room_type},
        ${data.capacity || 1},
        ${data.equipment ? JSON.stringify(data.equipment) : '[]'}::jsonb,
        true
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getRoomsByClinic(clinic_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT * FROM rooms
      WHERE clinic_id = ${clinic_id} AND tenant_id = ${user.tenant_id} AND is_active = true
      ORDER BY room_number ASC, name ASC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function updateRoomStatus(room_id: string, status: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE rooms
      SET current_status = ${status}, updated_at = NOW()
      WHERE id = ${room_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createStaffSchedule(data: {
  user_id: string
  clinic_id: string
  room_id?: string
  day_of_week: number
  start_time: string
  end_time: string
  effective_from: string
  effective_until?: string
  slot_duration?: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      INSERT INTO staff_schedules (
        tenant_id, user_id, clinic_id, room_id, day_of_week,
        start_time, end_time, effective_from, effective_until,
        slot_duration, is_active
      ) VALUES (
        ${user.tenant_id}, ${data.user_id}, ${data.clinic_id},
        ${data.room_id || null}, ${data.day_of_week},
        ${data.start_time}, ${data.end_time}, ${data.effective_from},
        ${data.effective_until || null}, ${data.slot_duration || 30}, true
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getStaffSchedules(user_id?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const currentUser = await verifyToken(token)
    if (!currentUser) return { error: 'Token inválido' }

    await setUserContext(currentUser.id)
    const db = await getDb()

    const targetUserId = user_id || currentUser.id

    const result = await db`
      SELECT s.*, c.name as clinic_name, r.name as room_name, u.name as user_name
      FROM staff_schedules s
      JOIN clinics c ON s.clinic_id = c.id
      LEFT JOIN rooms r ON s.room_id = r.id
      JOIN users u ON s.user_id = u.id
      WHERE s.tenant_id = ${currentUser.tenant_id}
        AND s.user_id = ${targetUserId}
        AND s.is_active = true
      ORDER BY s.day_of_week, s.start_time
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
