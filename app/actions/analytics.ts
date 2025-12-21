'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function trackEvent(data: {
  event_type: string
  event_data?: any
  patient_id?: string
  appointment_id?: string
  revenue_amount?: number
  cost_amount?: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    await db`
      INSERT INTO analytics_events (
        tenant_id, user_id, event_type, event_data, patient_id,
        appointment_id, revenue_amount, cost_amount
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.event_type},
        ${data.event_data ? JSON.stringify(data.event_data) : null},
        ${data.patient_id || null}, ${data.appointment_id || null},
        ${data.revenue_amount || null}, ${data.cost_amount || null}
      )
    `

    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getAnalyticsDashboard(period?: { start: string; end: string }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const startDate = period?.start || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = period?.end || new Date().toISOString()

    // Eventos por tipo
    const eventsByType = await db`
      SELECT event_type, COUNT(*) as count
      FROM analytics_events
      WHERE tenant_id = ${user.tenant_id}
      AND created_at >= ${startDate}
      AND created_at <= ${endDate}
      GROUP BY event_type
      ORDER BY count DESC
    `

    // Eventos por dia
    const eventsByDay = await db`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        SUM(revenue_amount) as revenue,
        SUM(cost_amount) as cost
      FROM analytics_events
      WHERE tenant_id = ${user.tenant_id}
      AND created_at >= ${startDate}
      AND created_at <= ${endDate}
      GROUP BY DATE(created_at)
      ORDER BY date
    `

    // Top pacientes
    const topPatients = await db`
      SELECT 
        p.id, p.name,
        COUNT(*) as visit_count,
        SUM(ae.revenue_amount) as total_revenue
      FROM analytics_events ae
      JOIN patients p ON ae.patient_id = p.id
      WHERE ae.tenant_id = ${user.tenant_id}
      AND ae.created_at >= ${startDate}
      AND ae.created_at <= ${endDate}
      AND ae.patient_id IS NOT NULL
      GROUP BY p.id, p.name
      ORDER BY total_revenue DESC
      LIMIT 10
    `

    return {
      success: true,
      data: {
        eventsByType,
        eventsByDay,
        topPatients
      }
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function createSavedReport(data: {
  name: string
  description?: string
  report_type: string
  filters?: any
  date_range?: any
  grouping?: string
  is_scheduled?: boolean
  schedule_frequency?: string
  schedule_recipients?: string[]
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
      INSERT INTO saved_reports (
        tenant_id, user_id, name, description, report_type,
        filters, date_range, grouping, is_scheduled,
        schedule_frequency, schedule_recipients
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.name},
        ${data.description || null}, ${data.report_type},
        ${data.filters ? JSON.stringify(data.filters) : null},
        ${data.date_range ? JSON.stringify(data.date_range) : null},
        ${data.grouping || null}, ${data.is_scheduled || false},
        ${data.schedule_frequency || null}, ${data.schedule_recipients || []}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getSavedReports() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT r.*, u.name as created_by_name
      FROM saved_reports r
      JOIN users u ON r.user_id = u.id
      WHERE r.tenant_id = ${user.tenant_id}
      AND r.is_active = true
      ORDER BY r.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
