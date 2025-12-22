"use server"

import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import { getDb } from "@/lib/db"

/**
 * MOD-FAT: Ações do Dashboard Financeiro
 * Fornece métricas, gráficos e relatórios de faturamento
 *
 * INTEGRAÇÃO TOTAL COM MÓDULOS:
 * - Orçamentos (budgets) → Receitas a receber quando aprovados
 * - NFe/NFSe → Receitas quando autorizadas
 * - Estoque (inventory) → Despesas nas movimentações de entrada
 * - Contratos → Receitas quando plano de pagamento assinado
 * - Agendamentos → Receitas das consultas
 */

// ============================================================================
// TIPOS DE INTEGRAÇÃO
// ============================================================================

export interface IntegratedFinancialSummary {
  // Resumo principal
  totalReceitas: number
  totalDespesas: number
  lucroLiquido: number

  // Detalhamento por origem
  receitasPorOrigem: {
    consultas: number
    procedimentos: number
    orcamentos: number
    nfe: number
    contratos: number
    outros: number
  }

  despesasPorOrigem: {
    estoque: number
    fornecedores: number
    operacional: number
    outros: number
  }

  // Pendências
  contasAReceber: {
    total: number
    count: number
    vencidas: number
    aVencer: number
  }

  contasAPagar: {
    total: number
    count: number
    vencidas: number
    aVencer: number
  }

  // Estatísticas dos módulos
  estatisticas: {
    orcamentosAprovados: number
    orcamentosPendentes: number
    nfeAutorizadas: number
    nfePendentes: number
    valorEstoque: number
    contratosAtivos: number
    consultasRealizadas: number
  }
}

export interface TransactionSource {
  module: 'budget' | 'nfe' | 'inventory' | 'contract' | 'appointment' | 'manual'
  source_id: string
  source_number?: string
}

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
  endDate?: string,
): Promise<{ error?: string; data?: FinancialMetrics }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const userId = user.id

    // Definir período padrão (últimos 12 meses)
    const start = startDate || new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString()
    const end = endDate || new Date().toISOString()

    // 1. Receitas totais (pagamentos recebidos)
    const revenueQuery = await db.query(
      `
      SELECT 
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1 
        AND status = 'paid'
        AND payment_date >= $2::timestamptz 
        AND payment_date <= $3::timestamptz
    `,
      [userId, start, end],
    )

    const totalRevenue = Number.parseFloat(revenueQuery.rows[0]?.total || 0)

    // 2. Despesas (podem vir de uma tabela expenses futura)
    // Por ora, vamos calcular despesas como % da receita (exemplo)
    const totalExpenses = totalRevenue * 0.35 // 35% de custo operacional estimado

    // 3. Pagamentos pendentes
    const pendingQuery = await db.query(
      `
      SELECT 
        COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1 
        AND status = 'pending'
        AND created_at >= $2::timestamptz
    `,
      [userId, start],
    )

    const pendingPayments = Number.parseFloat(pendingQuery.rows[0]?.total || 0)

    // 4. Faturamento mensal (últimos 12 meses)
    const monthlyQuery = await db.query(
      `
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
    `,
      [userId, start, end],
    )

    const monthlyRevenue = monthlyQuery.rows.map((row) => ({
      month: row.month,
      revenue: Number.parseFloat(row.revenue),
      expenses: Number.parseFloat(row.revenue) * 0.35, // Estimativa
    }))

    // 5. Top procedimentos por receita
    const topProceduresQuery = await db.query(
      `
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
    `,
      [userId, start, end],
    )

    const topProcedures = topProceduresQuery.rows.map((row) => ({
      name: row.tuss_name || row.tuss_code,
      count: Number.parseInt(row.count),
      revenue: Number.parseFloat(row.revenue),
    }))

    // 6. Métodos de pagamento
    const paymentMethodsQuery = await db.query(
      `
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
    `,
      [userId, start, end],
    )

    const paymentMethods = paymentMethodsQuery.rows.map((row) => ({
      method: row.payment_method || "Não especificado",
      count: Number.parseInt(row.count),
      total: Number.parseFloat(row.total),
    }))

    // 7. Receita por especialidade (do usuário)
    const specialtyQuery = await db.query(
      `
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
    `,
      [userId, start, end],
    )

    const revenueBySpecialty = specialtyQuery.rows.map((row) => ({
      specialty: row.specialty || "Não especificado",
      revenue: Number.parseFloat(row.revenue),
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
        revenueBySpecialty,
      },
    }
  } catch (error: any) {
    console.error("Erro ao buscar métricas financeiras:", error)
    return { error: error.message }
  }
}

/**
 * Gerar DRE (Demonstração do Resultado do Exercício)
 */
export async function generateDRE(year: number, month?: number): Promise<{ error?: string; data?: DREData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
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
      periodLabel = `${month.toString().padStart(2, "0")}/${year}`
    } else {
      start = new Date(year, 0, 1)
      end = new Date(year, 11, 31, 23, 59, 59)
      periodLabel = `${year}`
    }

    // Receita operacional (pagamentos recebidos)
    const revenueQuery = await db.query(
      `
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = $1
        AND status = 'paid'
        AND payment_date >= $2::timestamptz
        AND payment_date <= $3::timestamptz
    `,
      [userId, start.toISOString(), end.toISOString()],
    )

    const operatingRevenue = Number.parseFloat(revenueQuery.rows[0]?.total || 0)

    // Custos diretos (exemplo: 15% da receita)
    const directCosts = operatingRevenue * 0.15

    // Lucro bruto
    const grossProfit = operatingRevenue - directCosts

    // Despesas operacionais (exemplo: 20% da receita)
    const operatingExpenses = operatingRevenue * 0.2

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
        netProfit,
      },
    }
  } catch (error: any) {
    console.error("Erro ao gerar DRE:", error)
    return { error: error.message }
  }
}

/**
 * Exportar relatório financeiro (CSV ou PDF)
 */
export async function exportFinancialReport(
  format: "csv" | "pdf",
  startDate: string,
  endDate: string,
): Promise<{ error?: string; data?: { url: string } }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    // Buscar métricas
    const metrics = await getFinancialMetrics(startDate, endDate)
    if (metrics.error || !metrics.data) {
      return { error: metrics.error || "Erro ao buscar dados" }
    }

    // Gerar URL temporária para download (API route)
    const params = new URLSearchParams({
      format,
      startDate,
      endDate,
      token,
    })

    return {
      data: {
        url: `/api/export-financial?${params.toString()}`,
      },
    }
  } catch (error: any) {
    console.error("Erro ao exportar relatório:", error)
    return { error: error.message }
  }
}

/**
 * Buscar métricas do dashboard financeiro
 */
export async function getDashboardMetrics() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Últimos 30 dias
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const today = new Date()

    // Total de receitas (income) pagas
    const revenueQuery = await db`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND type = 'income'
        AND payment_status = 'paid'
        AND due_date >= ${thirtyDaysAgo.toISOString().split('T')[0]}
        AND deleted_at IS NULL
    `

    // Total de despesas (expense) pagas
    const expensesQuery = await db`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND type = 'expense'
        AND payment_status = 'paid'
        AND due_date >= ${thirtyDaysAgo.toISOString().split('T')[0]}
        AND deleted_at IS NULL
    `

    // Contas a receber vencidas (income pendente com due_date passada)
    const receivableQuery = await db`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND type = 'income'
        AND payment_status = 'pending'
        AND due_date < ${today.toISOString().split('T')[0]}
        AND deleted_at IS NULL
    `

    // Contas a pagar vencidas (expense pendente com due_date passada)
    const payableQuery = await db`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND type = 'expense'
        AND payment_status = 'pending'
        AND due_date < ${today.toISOString().split('T')[0]}
        AND deleted_at IS NULL
    `

    const totalRevenue = Number.parseFloat(revenueQuery[0]?.total || 0)
    const totalExpenses = Number.parseFloat(expensesQuery[0]?.total || 0)
    const revenueCount = Number.parseInt(revenueQuery[0]?.count || 0)

    return {
      success: true,
      data: {
        totalRevenue,
        totalExpenses,
        profit: totalRevenue - totalExpenses,
        revenueCount,
        expensesCount: Number.parseInt(expensesQuery[0]?.count || 0),
        avgTicket: revenueCount > 0 ? totalRevenue / revenueCount : 0,
        accountsReceivable: {
          total: Number.parseFloat(receivableQuery[0]?.total || 0),
          count: Number.parseInt(receivableQuery[0]?.count || 0),
        },
        accountsPayable: {
          total: Number.parseFloat(payableQuery[0]?.total || 0),
          count: Number.parseInt(payableQuery[0]?.count || 0),
        },
      },
    }
  } catch (error: any) {
    console.error("Erro ao buscar métricas do dashboard:", error)
    return { error: error.message }
  }
}

/**
 * Buscar transações financeiras
 */
export async function getFinancialTransactions(filters?: {
  startDate?: string
  endDate?: string
  status?: string
  paymentMethod?: string
  type?: string
  category?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    let query = `
      SELECT
        ft.id,
        ft.type,
        ft.category,
        ft.amount,
        ft.description,
        ft.payment_method,
        ft.payment_status,
        ft.due_date,
        ft.paid_date,
        ft.receipt_number,
        ft.notes,
        ft.created_at,
        p.full_name as patient_name
      FROM financial_transactions ft
      LEFT JOIN patients p ON ft.patient_id = p.id
      WHERE ft.tenant_id = $1
        AND ft.deleted_at IS NULL
    `

    const params: any[] = [tenantId]
    let paramIndex = 2

    if (filters?.startDate) {
      query += ` AND ft.due_date >= $${paramIndex}`
      params.push(filters.startDate)
      paramIndex++
    }

    if (filters?.endDate) {
      query += ` AND ft.due_date <= $${paramIndex}`
      params.push(filters.endDate)
      paramIndex++
    }

    if (filters?.status) {
      query += ` AND ft.payment_status = $${paramIndex}`
      params.push(filters.status)
      paramIndex++
    }

    if (filters?.paymentMethod) {
      query += ` AND ft.payment_method = $${paramIndex}`
      params.push(filters.paymentMethod)
      paramIndex++
    }

    if (filters?.type) {
      query += ` AND ft.type = $${paramIndex}`
      params.push(filters.type)
      paramIndex++
    }

    if (filters?.category) {
      query += ` AND ft.category = $${paramIndex}`
      params.push(filters.category)
      paramIndex++
    }

    query += " ORDER BY ft.due_date DESC, ft.created_at DESC LIMIT 100"

    const result = await db.query(query, params)

    return {
      success: true,
      data: result.rows.map((row) => ({
        id: row.id,
        type: row.type,
        category: row.category,
        amount: Number.parseFloat(row.amount || 0),
        description: row.description || row.category,
        payment_method: row.payment_method || "Não especificado",
        payment_status: row.payment_status || "pending",
        due_date: row.due_date,
        paid_date: row.paid_date,
        receipt_number: row.receipt_number,
        notes: row.notes,
        patient_name: row.patient_name,
        created_at: row.created_at,
      })),
    }
  } catch (error: any) {
    console.error("Erro ao buscar transações:", error)
    return { error: error.message }
  }
}

/**
 * Atualizar status de transação
 */
export async function updateTransactionStatus(transactionId: string, status: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Atualizar na tabela financial_transactions
    const paidDate = status === 'paid' ? new Date().toISOString().split('T')[0] : null

    await db`
      UPDATE financial_transactions
      SET payment_status = ${status},
          paid_date = ${paidDate},
          updated_at = NOW()
      WHERE id = ${transactionId}
        AND tenant_id = ${tenantId}
    `

    return { success: true }
  } catch (error: any) {
    console.error("Erro ao atualizar status:", error)
    return { error: error.message }
  }
}

/**
 * Buscar categorias de receita
 */
export async function getRevenueCategories() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar categorias do banco
    const result = await db`
      SELECT
        id,
        name,
        type,
        color,
        icon
      FROM revenue_categories
      WHERE tenant_id = ${tenantId}
        AND is_active = true
      ORDER BY type, name
    `

    // Se não houver categorias no banco, retorna array vazio (página usará fallback local)
    if (!result || result.length === 0) {
      return { success: true, data: [] }
    }

    return {
      success: true,
      data: result.map((row) => ({
        id: row.id,
        name: row.name,
        type: row.type,
        color: row.color,
        icon: row.icon,
      })),
    }
  } catch (error: any) {
    console.error("Erro ao buscar categorias:", error)
    return { success: true, data: [] } // Retorna vazio para usar fallback local
  }
}

/**
 * Buscar métodos de pagamento
 */
export async function getPaymentMethods() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar métodos de pagamento do banco
    const result = await db`
      SELECT
        id,
        name,
        type,
        fees_percentage
      FROM payment_methods
      WHERE tenant_id = ${tenantId}
        AND is_active = true
      ORDER BY name
    `

    // Se não houver métodos no banco, retorna array vazio (página usará fallback local)
    if (!result || result.length === 0) {
      return { success: true, data: [] }
    }

    return {
      success: true,
      data: result.map((row) => ({
        id: row.id,
        name: row.name,
        type: row.type,
        fees: Number.parseFloat(row.fees_percentage || 0),
      })),
    }
  } catch (error: any) {
    console.error("Erro ao buscar métodos de pagamento:", error)
    return { success: true, data: [] } // Retorna vazio para usar fallback local
  }
}

/**
 * Criar transação financeira
 */
export async function createFinancialTransaction(data: {
  type: 'income' | 'expense'
  category?: string
  amount: number
  description?: string
  payment_method?: string
  payment_status?: string
  due_date?: string
  paid_date?: string
  notes?: string
  patient_id?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()

    // Obter tenant_id do usuário
    const tenantId = user.tenantId || user.tenant_id
    if (!tenantId) {
      console.error("Erro: tenant_id não encontrado no usuário", { userId: user.id })
      return { error: "Tenant não configurado para o usuário" }
    }

    // Validações básicas
    if (!data.amount || data.amount <= 0) {
      return { error: "Valor deve ser maior que zero" }
    }

    if (!data.type || !['income', 'expense'].includes(data.type)) {
      return { error: "Tipo deve ser 'income' ou 'expense'" }
    }

    const dueDate = data.due_date || new Date().toISOString().split('T')[0]
    const paidDate = data.payment_status === 'paid'
      ? (data.paid_date || new Date().toISOString().split('T')[0])
      : null

    const result = await db`
      INSERT INTO financial_transactions (
        tenant_id,
        user_id,
        type,
        category,
        amount,
        description,
        payment_method,
        payment_status,
        due_date,
        paid_date,
        patient_id,
        notes
      ) VALUES (
        ${tenantId},
        ${user.id},
        ${data.type},
        ${data.category || (data.type === 'income' ? 'Receita Avulsa' : 'Despesa Avulsa')},
        ${data.amount},
        ${data.description || data.category || 'Transação'},
        ${data.payment_method || 'Dinheiro'},
        ${data.payment_status || 'pending'},
        ${dueDate},
        ${paidDate},
        ${data.patient_id || null},
        ${data.notes || null}
      )
      RETURNING id
    `

    return {
      success: true,
      data: { id: result[0].id },
    }
  } catch (error: any) {
    console.error("Erro ao criar transação:", error)
    return { error: error.message }
  }
}

// ============================================================================
// FUNÇÕES DE INTEGRAÇÃO COM OUTROS MÓDULOS
// ============================================================================

/**
 * Buscar resumo financeiro integrado de todos os módulos
 * Consolida dados de: orçamentos, NFe, estoque, contratos e agendamentos
 */
export async function getIntegratedFinancialSummary(
  startDate?: string,
  endDate?: string
): Promise<{ error?: string; data?: IntegratedFinancialSummary }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { error: "Sessão inválida" }
    }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id
    const userId = user.id

    // Definir período padrão (últimos 30 dias)
    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const end = endDate || new Date().toISOString().split('T')[0]
    const today = new Date().toISOString().split('T')[0]

    // ========== 1. TRANSAÇÕES FINANCEIRAS (tabela principal) ==========
    const transactionsQuery = await db`
      SELECT
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'paid'), 0) as receitas_pagas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'paid'), 0) as despesas_pagas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'pending'), 0) as receitas_pendentes,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'pending'), 0) as despesas_pendentes,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'pending' AND due_date < ${today}), 0) as receitas_vencidas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'pending' AND due_date < ${today}), 0) as despesas_vencidas,
        COUNT(*) FILTER (WHERE type = 'income' AND payment_status = 'pending') as count_receitas_pendentes,
        COUNT(*) FILTER (WHERE type = 'expense' AND payment_status = 'pending') as count_despesas_pendentes,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND category ILIKE '%consult%'), 0) as receitas_consultas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND category ILIKE '%procedimento%'), 0) as receitas_procedimentos,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND category ILIKE '%estoque%' OR category ILIKE '%material%'), 0) as despesas_estoque,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND category ILIKE '%fornec%'), 0) as despesas_fornecedores,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND category ILIKE '%operacion%' OR category ILIKE '%aluguel%' OR category ILIKE '%energia%'), 0) as despesas_operacional
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
    `

    // ========== 2. ORÇAMENTOS ==========
    const budgetsQuery = await db`
      SELECT
        COALESCE(SUM(final_amount) FILTER (WHERE status = 'approved'), 0) as orcamentos_aprovados_valor,
        COALESCE(SUM(final_amount) FILTER (WHERE status = 'pending_approval'), 0) as orcamentos_pendentes_valor,
        COUNT(*) FILTER (WHERE status = 'approved') as orcamentos_aprovados_count,
        COUNT(*) FILTER (WHERE status = 'pending_approval') as orcamentos_pendentes_count
      FROM budgets
      WHERE user_id = ${userId}
        AND created_at >= ${start}
        AND created_at <= ${end}
    `.catch(() => [{ orcamentos_aprovados_valor: 0, orcamentos_pendentes_valor: 0, orcamentos_aprovados_count: 0, orcamentos_pendentes_count: 0 }])

    // ========== 3. NFE/NFSE ==========
    const nfeQuery = await db`
      SELECT
        COALESCE(SUM(net_value) FILTER (WHERE status = 'authorized'), 0) as nfe_autorizadas_valor,
        COALESCE(SUM(net_value) FILTER (WHERE status IN ('draft', 'processing')), 0) as nfe_pendentes_valor,
        COUNT(*) FILTER (WHERE status = 'authorized') as nfe_autorizadas_count,
        COUNT(*) FILTER (WHERE status IN ('draft', 'processing')) as nfe_pendentes_count
      FROM nfe_invoices
      WHERE user_id = ${userId}
        AND created_at >= ${start}
        AND created_at <= ${end}
    `.catch(() => [{ nfe_autorizadas_valor: 0, nfe_pendentes_valor: 0, nfe_autorizadas_count: 0, nfe_pendentes_count: 0 }])

    // ========== 4. ESTOQUE ==========
    const inventoryQuery = await db`
      SELECT
        COALESCE(SUM(current_stock * COALESCE(unit_cost, 0)), 0) as valor_estoque,
        COALESCE(SUM(total_cost) FILTER (WHERE type = 'entry'), 0) as compras_estoque
      FROM inventory_items i
      LEFT JOIN (
        SELECT item_id, type, SUM(total_cost) as total_cost
        FROM inventory_movements
        WHERE user_id = ${userId}
          AND created_at >= ${start}
          AND created_at <= ${end}
        GROUP BY item_id, type
      ) m ON i.id = m.item_id
      WHERE i.user_id = ${userId}
        AND i.is_active = true
    `.catch(() => [{ valor_estoque: 0, compras_estoque: 0 }])

    // ========== 5. CONTRATOS ==========
    const contractsQuery = await db`
      SELECT
        COUNT(*) FILTER (WHERE status = 'signed') as contratos_ativos
      FROM contracts
      WHERE user_id = ${userId}
        AND (valid_until IS NULL OR valid_until >= ${today})
    `.catch(() => [{ contratos_ativos: 0 }])

    // ========== 6. AGENDAMENTOS/CONSULTAS ==========
    const appointmentsQuery = await db`
      SELECT
        COUNT(*) FILTER (WHERE status = 'completed') as consultas_realizadas,
        COALESCE(SUM(value) FILTER (WHERE status = 'completed'), 0) as valor_consultas
      FROM appointments_schedule
      WHERE user_id = ${userId}
        AND date >= ${start}
        AND date <= ${end}
    `.catch(() => [{ consultas_realizadas: 0, valor_consultas: 0 }])

    // ========== 7. PAGAMENTOS (tabela payments do CRM) ==========
    const paymentsQuery = await db`
      SELECT
        COALESCE(SUM(amount) FILTER (WHERE status = 'paid'), 0) as pagamentos_recebidos
      FROM payments
      WHERE user_id = ${userId}
        AND payment_date >= ${start}
        AND payment_date <= ${end}
    `.catch(() => [{ pagamentos_recebidos: 0 }])

    // Consolidar dados
    const trans = transactionsQuery[0] || {}
    const budgets = budgetsQuery[0] || {}
    const nfe = nfeQuery[0] || {}
    const inventory = inventoryQuery[0] || {}
    const contracts = contractsQuery[0] || {}
    const appointments = appointmentsQuery[0] || {}
    const payments = paymentsQuery[0] || {}

    // Calcular totais consolidados
    const totalReceitas = Number(trans.receitas_pagas || 0) +
      Number(payments.pagamentos_recebidos || 0)

    const totalDespesas = Number(trans.despesas_pagas || 0) +
      Number(inventory.compras_estoque || 0)

    const receitasOrcamentos = Number(budgets.orcamentos_aprovados_valor || 0)
    const receitasNfe = Number(nfe.nfe_autorizadas_valor || 0)

    return {
      data: {
        totalReceitas,
        totalDespesas,
        lucroLiquido: totalReceitas - totalDespesas,

        receitasPorOrigem: {
          consultas: Number(trans.receitas_consultas || 0) + Number(appointments.valor_consultas || 0),
          procedimentos: Number(trans.receitas_procedimentos || 0),
          orcamentos: receitasOrcamentos,
          nfe: receitasNfe,
          contratos: 0, // Contratos não têm valor associado atualmente
          outros: totalReceitas - Number(trans.receitas_consultas || 0) - Number(trans.receitas_procedimentos || 0)
        },

        despesasPorOrigem: {
          estoque: Number(trans.despesas_estoque || 0) + Number(inventory.compras_estoque || 0),
          fornecedores: Number(trans.despesas_fornecedores || 0),
          operacional: Number(trans.despesas_operacional || 0),
          outros: totalDespesas - Number(trans.despesas_estoque || 0) - Number(trans.despesas_fornecedores || 0) - Number(trans.despesas_operacional || 0)
        },

        contasAReceber: {
          total: Number(trans.receitas_pendentes || 0),
          count: Number(trans.count_receitas_pendentes || 0),
          vencidas: Number(trans.receitas_vencidas || 0),
          aVencer: Number(trans.receitas_pendentes || 0) - Number(trans.receitas_vencidas || 0)
        },

        contasAPagar: {
          total: Number(trans.despesas_pendentes || 0),
          count: Number(trans.count_despesas_pendentes || 0),
          vencidas: Number(trans.despesas_vencidas || 0),
          aVencer: Number(trans.despesas_pendentes || 0) - Number(trans.despesas_vencidas || 0)
        },

        estatisticas: {
          orcamentosAprovados: Number(budgets.orcamentos_aprovados_count || 0),
          orcamentosPendentes: Number(budgets.orcamentos_pendentes_count || 0),
          nfeAutorizadas: Number(nfe.nfe_autorizadas_count || 0),
          nfePendentes: Number(nfe.nfe_pendentes_count || 0),
          valorEstoque: Number(inventory.valor_estoque || 0),
          contratosAtivos: Number(contracts.contratos_ativos || 0),
          consultasRealizadas: Number(appointments.consultas_realizadas || 0)
        }
      }
    }
  } catch (error: any) {
    console.error("Erro ao buscar resumo financeiro integrado:", error)
    return { error: error.message }
  }
}

/**
 * Criar transação financeira a partir de ORÇAMENTO APROVADO
 */
export async function createTransactionFromBudget(budgetId: string): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar orçamento
    const budget = await db`
      SELECT b.*, p.full_name as patient_name
      FROM budgets b
      LEFT JOIN patients p ON b.patient_id = p.id
      WHERE b.id = ${budgetId} AND b.user_id = ${user.id}
    `

    if (!budget.length) return { error: "Orçamento não encontrado" }
    if (budget[0].status !== 'approved') return { error: "Orçamento não está aprovado" }

    const b = budget[0]

    // Verificar se já existe transação para este orçamento
    const existing = await db`
      SELECT id FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND metadata->>'source_module' = 'budget'
        AND metadata->>'source_id' = ${budgetId}
        AND deleted_at IS NULL
    `

    if (existing.length > 0) {
      return { error: "Já existe transação financeira para este orçamento" }
    }

    // Se parcelado, criar múltiplas transações
    const installments = b.installments || 1
    const installmentAmount = Number(b.installment_amount) || Number(b.final_amount) / installments

    const transactions = []
    const baseDate = new Date()

    for (let i = 0; i < installments; i++) {
      const dueDate = new Date(baseDate)
      dueDate.setMonth(dueDate.getMonth() + i)

      const result = await db`
        INSERT INTO financial_transactions (
          tenant_id, user_id, type, category, amount, description,
          payment_method, payment_status, due_date, patient_id, metadata
        ) VALUES (
          ${tenantId}, ${user.id}, 'income', 'Orçamento',
          ${installmentAmount},
          ${`Orçamento ${b.budget_number} - ${b.title}${installments > 1 ? ` (Parcela ${i + 1}/${installments})` : ''} - ${b.patient_name || 'Paciente'}`},
          ${b.payment_type === 'credit_card' ? 'Cartão de Crédito' : b.payment_type === 'pix' ? 'PIX' : 'Dinheiro'},
          'pending',
          ${dueDate.toISOString().split('T')[0]},
          ${b.patient_id},
          ${JSON.stringify({
            source_module: 'budget',
            source_id: budgetId,
            source_number: b.budget_number,
            installment: i + 1,
            total_installments: installments
          })}::jsonb
        )
        RETURNING id
      `
      transactions.push(result[0])
    }

    return {
      success: true,
      data: {
        transactionIds: transactions.map(t => t.id),
        installments,
        totalAmount: Number(b.final_amount)
      }
    }
  } catch (error: any) {
    console.error("Erro ao criar transação de orçamento:", error)
    return { error: error.message }
  }
}

/**
 * Criar transação financeira a partir de NFE AUTORIZADA
 */
export async function createTransactionFromNFe(nfeId: string): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar NFe
    const nfe = await db`
      SELECT n.*, p.full_name as patient_name
      FROM nfe_invoices n
      LEFT JOIN patients p ON n.patient_id = p.id
      WHERE n.id = ${nfeId} AND n.user_id = ${user.id}
    `

    if (!nfe.length) return { error: "Nota fiscal não encontrada" }
    if (nfe[0].status !== 'authorized') return { error: "Nota fiscal não está autorizada" }

    const n = nfe[0]

    // Verificar se já existe transação para esta NFe
    const existing = await db`
      SELECT id FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND metadata->>'source_module' = 'nfe'
        AND metadata->>'source_id' = ${nfeId}
        AND deleted_at IS NULL
    `

    if (existing.length > 0) {
      return { error: "Já existe transação financeira para esta nota fiscal" }
    }

    // Criar transação
    const result = await db`
      INSERT INTO financial_transactions (
        tenant_id, user_id, type, category, amount, description,
        payment_method, payment_status, due_date, paid_date, patient_id,
        invoice_number, metadata
      ) VALUES (
        ${tenantId}, ${user.id}, 'income',
        ${n.invoice_type === 'nfse' ? 'Nota Fiscal de Serviço' : 'Nota Fiscal'},
        ${Number(n.net_value) || Number(n.services_value)},
        ${`${n.invoice_type.toUpperCase()} ${n.invoice_number} - ${n.customer_name || n.patient_name || 'Cliente'}`},
        'Faturado',
        'paid',
        ${n.authorization_date?.split('T')[0] || new Date().toISOString().split('T')[0]},
        ${n.authorization_date?.split('T')[0] || new Date().toISOString().split('T')[0]},
        ${n.patient_id},
        ${n.invoice_number},
        ${JSON.stringify({
          source_module: 'nfe',
          source_id: nfeId,
          source_number: n.invoice_number,
          access_key: n.access_key,
          verification_code: n.verification_code,
          iss_value: n.iss_value,
          pis_value: n.pis_value,
          cofins_value: n.cofins_value
        })}::jsonb
      )
      RETURNING id
    `

    return {
      success: true,
      data: {
        transactionId: result[0].id,
        amount: Number(n.net_value) || Number(n.services_value)
      }
    }
  } catch (error: any) {
    console.error("Erro ao criar transação de NFe:", error)
    return { error: error.message }
  }
}

/**
 * Criar transação financeira a partir de MOVIMENTAÇÃO DE ESTOQUE (entrada/compra)
 */
export async function createTransactionFromInventoryMovement(
  movementId: string,
  paymentData?: {
    payment_method?: string
    payment_status?: 'pending' | 'paid'
    due_date?: string
    supplier_name?: string
  }
): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar movimentação
    const movement = await db`
      SELECT m.*, i.name as item_name, i.supplier_name as item_supplier
      FROM inventory_movements m
      JOIN inventory_items i ON m.item_id = i.id
      WHERE m.id = ${movementId} AND m.user_id = ${user.id}
    `

    if (!movement.length) return { error: "Movimentação não encontrada" }
    if (movement[0].type !== 'entry') return { error: "Apenas movimentações de entrada geram despesas" }

    const m = movement[0]

    // Verificar se já existe transação para esta movimentação
    const existing = await db`
      SELECT id FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND metadata->>'source_module' = 'inventory'
        AND metadata->>'source_id' = ${movementId}
        AND deleted_at IS NULL
    `

    if (existing.length > 0) {
      return { error: "Já existe transação financeira para esta movimentação" }
    }

    const totalCost = Number(m.total_cost) || (Number(m.unit_cost) * Number(m.quantity))
    if (totalCost <= 0) {
      return { error: "Movimentação sem custo definido" }
    }

    // Criar transação de despesa
    const result = await db`
      INSERT INTO financial_transactions (
        tenant_id, user_id, type, category, amount, description,
        payment_method, payment_status, due_date, metadata
      ) VALUES (
        ${tenantId}, ${user.id}, 'expense', 'Compra de Materiais',
        ${totalCost},
        ${`Compra: ${m.quantity}x ${m.item_name}${m.item_supplier || paymentData?.supplier_name ? ` - Forn: ${m.item_supplier || paymentData?.supplier_name}` : ''}`},
        ${paymentData?.payment_method || 'Boleto'},
        ${paymentData?.payment_status || 'pending'},
        ${paymentData?.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]},
        ${JSON.stringify({
          source_module: 'inventory',
          source_id: movementId,
          item_id: m.item_id,
          item_name: m.item_name,
          quantity: m.quantity,
          unit_cost: m.unit_cost,
          supplier: m.item_supplier || paymentData?.supplier_name
        })}::jsonb
      )
      RETURNING id
    `

    return {
      success: true,
      data: {
        transactionId: result[0].id,
        amount: totalCost
      }
    }
  } catch (error: any) {
    console.error("Erro ao criar transação de estoque:", error)
    return { error: error.message }
  }
}

/**
 * Criar transação financeira a partir de CONTRATO ASSINADO (tipo payment_plan)
 */
export async function createTransactionFromContract(
  contractId: string,
  paymentPlanData: {
    total_amount: number
    installments?: number
    payment_method?: string
    first_due_date?: string
  }
): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar contrato
    const contract = await db`
      SELECT c.*, p.full_name as patient_name
      FROM contracts c
      LEFT JOIN patients p ON c.patient_id = p.id
      WHERE c.id = ${contractId} AND c.user_id = ${user.id}
    `

    if (!contract.length) return { error: "Contrato não encontrado" }
    if (contract[0].status !== 'signed') return { error: "Contrato não está assinado" }

    const c = contract[0]

    // Verificar se já existe transação para este contrato
    const existing = await db`
      SELECT id FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND metadata->>'source_module' = 'contract'
        AND metadata->>'source_id' = ${contractId}
        AND deleted_at IS NULL
    `

    if (existing.length > 0) {
      return { error: "Já existe transação financeira para este contrato" }
    }

    // Criar transações (parcelas se houver)
    const installments = paymentPlanData.installments || 1
    const installmentAmount = paymentPlanData.total_amount / installments

    const transactions = []
    const baseDate = paymentPlanData.first_due_date ? new Date(paymentPlanData.first_due_date) : new Date()

    for (let i = 0; i < installments; i++) {
      const dueDate = new Date(baseDate)
      dueDate.setMonth(dueDate.getMonth() + i)

      const result = await db`
        INSERT INTO financial_transactions (
          tenant_id, user_id, type, category, amount, description,
          payment_method, payment_status, due_date, patient_id, metadata
        ) VALUES (
          ${tenantId}, ${user.id}, 'income', 'Contrato',
          ${installmentAmount},
          ${`Contrato ${c.contract_number} - ${c.title}${installments > 1 ? ` (Parcela ${i + 1}/${installments})` : ''} - ${c.patient_name || 'Paciente'}`},
          ${paymentPlanData.payment_method || 'Boleto'},
          'pending',
          ${dueDate.toISOString().split('T')[0]},
          ${c.patient_id},
          ${JSON.stringify({
            source_module: 'contract',
            source_id: contractId,
            source_number: c.contract_number,
            contract_type: c.contract_type,
            installment: i + 1,
            total_installments: installments
          })}::jsonb
        )
        RETURNING id
      `
      transactions.push(result[0])
    }

    return {
      success: true,
      data: {
        transactionIds: transactions.map(t => t.id),
        installments,
        totalAmount: paymentPlanData.total_amount
      }
    }
  } catch (error: any) {
    console.error("Erro ao criar transação de contrato:", error)
    return { error: error.message }
  }
}

/**
 * Criar transação financeira a partir de AGENDAMENTO/CONSULTA
 */
export async function createTransactionFromAppointment(
  appointmentId: string,
  paymentData?: {
    payment_method?: string
    payment_status?: 'pending' | 'paid'
    paid_date?: string
  }
): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar agendamento
    const appointment = await db`
      SELECT a.*, p.full_name as patient_name
      FROM appointments_schedule a
      LEFT JOIN patients p ON a.patient_id = p.id
      WHERE a.id = ${appointmentId} AND a.user_id = ${user.id}
    `

    if (!appointment.length) return { error: "Agendamento não encontrado" }

    const a = appointment[0]
    const amount = Number(a.value) || 0

    if (amount <= 0) {
      return { error: "Agendamento sem valor definido" }
    }

    // Verificar se já existe transação para este agendamento
    const existing = await db`
      SELECT id FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND metadata->>'source_module' = 'appointment'
        AND metadata->>'source_id' = ${appointmentId}
        AND deleted_at IS NULL
    `

    if (existing.length > 0) {
      return { error: "Já existe transação financeira para este agendamento" }
    }

    const isPaid = paymentData?.payment_status === 'paid' || a.payment_status === 'paid'

    // Criar transação
    const result = await db`
      INSERT INTO financial_transactions (
        tenant_id, user_id, type, category, amount, description,
        payment_method, payment_status, due_date, paid_date, patient_id,
        appointment_id, metadata
      ) VALUES (
        ${tenantId}, ${user.id}, 'income', 'Consulta',
        ${amount},
        ${`Consulta - ${a.patient_name || 'Paciente'} - ${new Date(a.date).toLocaleDateString('pt-BR')}`},
        ${paymentData?.payment_method || a.payment_method || 'Dinheiro'},
        ${isPaid ? 'paid' : 'pending'},
        ${a.date?.split('T')[0] || new Date().toISOString().split('T')[0]},
        ${isPaid ? (paymentData?.paid_date || new Date().toISOString().split('T')[0]) : null},
        ${a.patient_id},
        ${appointmentId},
        ${JSON.stringify({
          source_module: 'appointment',
          source_id: appointmentId,
          appointment_type: a.type,
          professional_id: a.professional_id
        })}::jsonb
      )
      RETURNING id
    `

    return {
      success: true,
      data: {
        transactionId: result[0].id,
        amount
      }
    }
  } catch (error: any) {
    console.error("Erro ao criar transação de agendamento:", error)
    return { error: error.message }
  }
}

/**
 * Buscar transações por origem/módulo
 */
export async function getTransactionsBySource(
  module: 'budget' | 'nfe' | 'inventory' | 'contract' | 'appointment' | 'manual',
  sourceId?: string
): Promise<{ success?: boolean; error?: string; data?: any[] }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    const result = sourceId
      ? await db`
          SELECT
            ft.*,
            p.full_name as patient_name
          FROM financial_transactions ft
          LEFT JOIN patients p ON ft.patient_id = p.id
          WHERE ft.tenant_id = ${tenantId}
            AND ft.metadata->>'source_module' = ${module}
            AND ft.metadata->>'source_id' = ${sourceId}
            AND ft.deleted_at IS NULL
          ORDER BY ft.created_at DESC
        `
      : await db`
          SELECT
            ft.*,
            p.full_name as patient_name
          FROM financial_transactions ft
          LEFT JOIN patients p ON ft.patient_id = p.id
          WHERE ft.tenant_id = ${tenantId}
            AND ft.metadata->>'source_module' = ${module}
            AND ft.deleted_at IS NULL
          ORDER BY ft.created_at DESC
          LIMIT 100
        `

    return {
      success: true,
      data: result.map(row => ({
        ...row,
        amount: Number(row.amount || 0),
        metadata: row.metadata || {}
      }))
    }
  } catch (error: any) {
    console.error("Erro ao buscar transações por origem:", error)
    return { error: error.message }
  }
}

/**
 * Sincronizar todos os orçamentos aprovados sem transação financeira
 */
export async function syncBudgetsToFinancial(): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar orçamentos aprovados sem transação
    const budgets = await db`
      SELECT b.id
      FROM budgets b
      WHERE b.user_id = ${user.id}
        AND b.status = 'approved'
        AND NOT EXISTS (
          SELECT 1 FROM financial_transactions ft
          WHERE ft.tenant_id = ${tenantId}
            AND ft.metadata->>'source_module' = 'budget'
            AND ft.metadata->>'source_id' = b.id::text
            AND ft.deleted_at IS NULL
        )
    `

    let created = 0
    let errors = 0

    for (const budget of budgets) {
      const result = await createTransactionFromBudget(budget.id)
      if (result.success) {
        created++
      } else {
        errors++
      }
    }

    return {
      success: true,
      data: {
        found: budgets.length,
        created,
        errors
      }
    }
  } catch (error: any) {
    console.error("Erro ao sincronizar orçamentos:", error)
    return { error: error.message }
  }
}

/**
 * Sincronizar todas as NFes autorizadas sem transação financeira
 */
export async function syncNFeToFinancial(): Promise<{ success?: boolean; error?: string; data?: any }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { error: "Não autenticado" }
    const user = await verifyToken(token)
    if (!user) return { error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id

    // Buscar NFes autorizadas sem transação
    const nfes = await db`
      SELECT n.id
      FROM nfe_invoices n
      WHERE n.user_id = ${user.id}
        AND n.status = 'authorized'
        AND NOT EXISTS (
          SELECT 1 FROM financial_transactions ft
          WHERE ft.tenant_id = ${tenantId}
            AND ft.metadata->>'source_module' = 'nfe'
            AND ft.metadata->>'source_id' = n.id::text
            AND ft.deleted_at IS NULL
        )
    `

    let created = 0
    let errors = 0

    for (const nfe of nfes) {
      const result = await createTransactionFromNFe(nfe.id)
      if (result.success) {
        created++
      } else {
        errors++
      }
    }

    return {
      success: true,
      data: {
        found: nfes.length,
        created,
        errors
      }
    }
  } catch (error: any) {
    console.error("Erro ao sincronizar NFes:", error)
    return { error: error.message }
  }
}
