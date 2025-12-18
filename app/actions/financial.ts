'use server'

import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { getDb } from '@/lib/db'

/**
 * MOD-FAT: Ações do Dashboard Financeiro
 * Fornece métricas, gráficos e relatórios de faturamento
 */

export interface FinancialMetrics {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  pendingPayments: number
  paidPayments: number
  monthlyRevenue: Array<{ month: string; revenue: number; expenses: number }>
  topProcedures: Array<{ name: string; count: number; revenue: number }>
  paymentMethods: Array<{ method: string; count: number; total: number }>
  revenueBySpecialty: Array<{ specialty: string; revenue: number }>
}

export interface DREData {
  period: string
  operatingRevenue: number
  directCosts: number
  grossProfit: number
  operatingExpenses: number
  ebitda: number
  depreciation: number
  ebit: number
  financialResult: number
  profitBeforeTaxes: number
  taxes: number
  netProfit: number
}

/**
 * Buscar métricas financeiras do período
 */
export async function getFinancialMetrics(
  startDate?: string,
  endDate?: string
): Promise<{ error?: string; data?: FinancialMetrics }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) {
      return { error: 'Não autenticado' }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: 'Sessão inválida' }
    }

    const db = await getDb()
    const userId = user.id

    // Definir período padrão (últimos 12 meses)
    const start = startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
    const end = endDate || new Date().toISOString()

    // 1. Receitas totais (pagamentos recebidos)
    const revenueQuery = await db.query(`
      SELECT 
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1 
        AND status = 'paid'
        AND payment_date >= $2::timestamptz 
        AND payment_date <= $3::timestamptz
    `, [userId, start, end])

    const totalRevenue = parseFloat(revenueQuery.rows[0]?.total || 0)

    // 2. Despesas (podem vir de uma tabela expenses futura)
    // Por ora, vamos calcular despesas como % da receita (exemplo)
    const totalExpenses = totalRevenue * 0.35 // 35% de custo operacional estimado

    // 3. Pagamentos pendentes
    const pendingQuery = await db.query(`
      SELECT 
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1 
        AND status = 'pending'
        AND created_at >= $2::timestamptz
    `, [userId, start])

    const pendingPayments = parseFloat(pendingQuery.rows[0]?.total || 0)

    // 4. Faturamento mensal (últimos 12 meses)
    const monthlyQuery = await db.query(`
      SELECT 
        TO_CHAR(payment_date, 'YYYY-MM') as month,
        COALESCE(SUM(amount), 0) as revenue
      FROM payments
      WHERE user_id = $1 
        AND status = 'paid'
        AND payment_date >= $2::timestamptz
        AND payment_date <= $3::timestamptz
      GROUP BY TO_CHAR(payment_date, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `, [userId, start, end])

    const monthlyRevenue = monthlyQuery.rows.map(row => ({
      month: row.month,
      revenue: parseFloat(row.revenue),
      expenses: parseFloat(row.revenue) * 0.35 // Estimativa
    }))

    // 5. Top procedimentos por receita
    const topProceduresQuery = await db.query(`
      SELECT 
        p.tuss_code,
        p.tuss_name,
        COUNT(*) as count,
        COALESCE(SUM(pay.amount), 0) as revenue
      FROM procedures p
      LEFT JOIN appointments a ON p.appointment_id = a.id
      LEFT JOIN payments pay ON a.id = pay.appointment_id AND pay.status = 'paid'
      WHERE a.user_id = $1
        AND a.date >= $2::timestamptz
        AND a.date <= $3::timestamptz
      GROUP BY p.tuss_code, p.tuss_name
      ORDER BY revenue DESC
      LIMIT 10
    `, [userId, start, end])

    const topProcedures = topProceduresQuery.rows.map(row => ({
      name: row.tuss_name || row.tuss_code,
      count: parseInt(row.count),
      revenue: parseFloat(row.revenue)
    }))

    // 6. Métodos de pagamento
    const paymentMethodsQuery = await db.query(`
      SELECT 
        payment_method,
        COUNT(*) as count,
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1
        AND status = 'paid'
        AND payment_date >= $2::timestamptz
        AND payment_date <= $3::timestamptz
      GROUP BY payment_method
      ORDER BY total DESC
    `, [userId, start, end])

    const paymentMethods = paymentMethodsQuery.rows.map(row => ({
      method: row.payment_method || 'Não especificado',
      count: parseInt(row.count),
      total: parseFloat(row.total)
    }))

    // 7. Receita por especialidade (do usuário)
    const specialtyQuery = await db.query(`
      SELECT 
        u.specialty,
        COALESCE(SUM(pay.amount), 0) as revenue
      FROM payments pay
      JOIN users u ON pay.user_id = u.id
      WHERE pay.user_id = $1
        AND pay.status = 'paid'
        AND pay.payment_date >= $2::timestamptz
        AND pay.payment_date <= $3::timestamptz
      GROUP BY u.specialty
    `, [userId, start, end])

    const revenueBySpecialty = specialtyQuery.rows.map(row => ({
      specialty: row.specialty || 'Não especificado',
      revenue: parseFloat(row.revenue)
    }))

    return {
      data: {
        totalRevenue,
        totalExpenses,
        netProfit: totalRevenue - totalExpenses,
        pendingPayments,
        paidPayments: totalRevenue,
        monthlyRevenue: monthlyRevenue.reverse(), // Ordem cronológica
        topProcedures,
        paymentMethods,
        revenueBySpecialty
      }
    }
  } catch (error: any) {
    console.error('Erro ao buscar métricas financeiras:', error)
    return { error: error.message }
  }
}

/**
 * Gerar DRE (Demonstração do Resultado do Exercício)
 */
export async function generateDRE(
  year: number,
  month?: number
): Promise<{ error?: string; data?: DREData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) {
      return { error: 'Não autenticado' }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: 'Sessão inválida' }
    }

    const db = await getDb()
    const userId = user.id

    // Definir período
    let start: Date
    let end: Date
    let periodLabel: string

    if (month) {
      start = new Date(year, month - 1, 1)
      end = new Date(year, month, 0, 23, 59, 59)
      periodLabel = `${month.toString().padStart(2, '0')}/${year}`
    } else {
      start = new Date(year, 0, 1)
      end = new Date(year, 11, 31, 23, 59, 59)
      periodLabel = `${year}`
    }

    // Receita operacional (pagamentos recebidos)
    const revenueQuery = await db.query(`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1
        AND status = 'paid'
        AND payment_date >= $2::timestamptz
        AND payment_date <= $3::timestamptz
    `, [userId, start.toISOString(), end.toISOString()])

    const operatingRevenue = parseFloat(revenueQuery.rows[0]?.total || 0)

    // Custos diretos (exemplo: 15% da receita)
    const directCosts = operatingRevenue * 0.15

    // Lucro bruto
    const grossProfit = operatingRevenue - directCosts

    // Despesas operacionais (exemplo: 20% da receita)
    const operatingExpenses = operatingRevenue * 0.20

    // EBITDA
    const ebitda = grossProfit - operatingExpenses

    // Depreciação (exemplo: 2% da receita)
    const depreciation = operatingRevenue * 0.02

    // EBIT
    const ebit = ebitda - depreciation

    // Resultado financeiro (exemplo: 1% da receita)
    const financialResult = operatingRevenue * 0.01

    // Lucro antes dos impostos
    const profitBeforeTaxes = ebit + financialResult

    // Impostos (exemplo: 15%)
    const taxes = profitBeforeTaxes * 0.15

    // Lucro líquido
    const netProfit = profitBeforeTaxes - taxes

    return {
      data: {
        period: periodLabel,
        operatingRevenue,
        directCosts,
        grossProfit,
        operatingExpenses,
        ebitda,
        depreciation,
        ebit,
        financialResult,
        profitBeforeTaxes,
        taxes,
        netProfit
      }
    }
  } catch (error: any) {
    console.error('Erro ao gerar DRE:', error)
    return { error: error.message }
  }
}

/**
 * Exportar relatório financeiro (CSV ou PDF)
 */
export async function exportFinancialReport(
  format: 'csv' | 'pdf',
  startDate: string,
  endDate: string
): Promise<{ error?: string; data?: { url: string } }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) {
      return { error: 'Não autenticado' }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: 'Sessão inválida' }
    }

    // Buscar métricas
    const metrics = await getFinancialMetrics(startDate, endDate)
    if (metrics.error || !metrics.data) {
      return { error: metrics.error || 'Erro ao buscar dados' }
    }

    // Gerar URL temporária para download (API route)
    const params = new URLSearchParams({
      format,
      startDate,
      endDate,
      token
    })

    return {
      data: {
        url: `/api/export-financial?${params.toString()}`
      }
    }
  } catch (error: any) {
    console.error('Erro ao exportar relatório:', error)
    return { error: error.message }
  }
}
