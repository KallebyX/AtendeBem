"use server"

import { getDb } from "@/lib/db"
import { verifyToken } from "@/lib/session"
import { cookies } from "next/headers"
import {
  generateFinancialExcel,
  generatePatientsExcel,
  generateAppointmentsExcel,
  generateInventoryExcel,
  generateIntegratedExcel,
  generateFinancialPDFHTML,
  generateIntegratedPDFHTML,
  exportWorkbookToBase64,
  formatDate,
  formatCurrency,
  type FinancialReportData,
  type PatientReportData,
  type AppointmentReportData,
  type InventoryReportData,
  type IntegratedReportData,
} from "@/lib/report-export"

// ============================================================================
// RELATÓRIO FINANCEIRO COMPLETO
// ============================================================================

export async function generateFinancialReportData(
  startDate?: string,
  endDate?: string
): Promise<{ success: boolean; error?: string; data?: FinancialReportData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { success: false, error: "Não autenticado" }

    const user = await verifyToken(token)
    if (!user) return { success: false, error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id
    const userId = user.id

    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const end = endDate || new Date().toISOString().split('T')[0]
    const today = new Date().toISOString().split('T')[0]

    // 1. Buscar transações financeiras
    const transactionsResult = await db`
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
        p.full_name as patient_name,
        ft.notes
      FROM financial_transactions ft
      LEFT JOIN patients p ON ft.patient_id = p.id
      WHERE ft.tenant_id = ${tenantId}
        AND ft.deleted_at IS NULL
        AND ft.due_date >= ${start}
        AND ft.due_date <= ${end}
      ORDER BY ft.due_date DESC
    `.catch(() => [])

    // 2. Buscar resumo de receitas e despesas
    const summaryResult = await db`
      SELECT
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'paid'), 0) as total_receitas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'paid'), 0) as total_despesas,
        COUNT(*) FILTER (WHERE type = 'income' AND payment_status = 'paid') as count_receitas
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
    `.catch(() => [{ total_receitas: 0, total_despesas: 0, count_receitas: 0 }])

    // 3. Receitas por categoria
    const receitasCategoriaResult = await db`
      SELECT
        category,
        COALESCE(SUM(amount), 0) as total
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND type = 'income'
        AND payment_status = 'paid'
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
      GROUP BY category
      ORDER BY total DESC
    `.catch(() => [])

    // 4. Despesas por categoria
    const despesasCategoriaResult = await db`
      SELECT
        category,
        COALESCE(SUM(amount), 0) as total
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND type = 'expense'
        AND payment_status = 'paid'
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
      GROUP BY category
      ORDER BY total DESC
    `.catch(() => [])

    // 5. Evolução mensal
    const mensalResult = await db`
      SELECT
        TO_CHAR(due_date, 'YYYY-MM') as mes,
        TO_CHAR(due_date, 'Mon/YY') as mes_label,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'paid'), 0) as receitas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'paid'), 0) as despesas
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
      GROUP BY TO_CHAR(due_date, 'YYYY-MM'), TO_CHAR(due_date, 'Mon/YY')
      ORDER BY mes
    `.catch(() => [])

    // 6. Contas a receber (pendentes)
    const receberResult = await db`
      SELECT
        ft.description,
        COALESCE(p.full_name, 'Não informado') as paciente,
        ft.amount,
        ft.due_date,
        CASE
          WHEN ft.due_date < ${today} THEN 'Vencido'
          ELSE 'A Vencer'
        END as status
      FROM financial_transactions ft
      LEFT JOIN patients p ON ft.patient_id = p.id
      WHERE ft.tenant_id = ${tenantId}
        AND ft.type = 'income'
        AND ft.payment_status = 'pending'
        AND ft.deleted_at IS NULL
      ORDER BY ft.due_date
      LIMIT 50
    `.catch(() => [])

    // 7. Contas a pagar (pendentes)
    const pagarResult = await db`
      SELECT
        ft.description,
        COALESCE(ft.notes, 'Não informado') as fornecedor,
        ft.amount,
        ft.due_date,
        CASE
          WHEN ft.due_date < ${today} THEN 'Vencido'
          ELSE 'A Vencer'
        END as status
      FROM financial_transactions ft
      WHERE ft.tenant_id = ${tenantId}
        AND ft.type = 'expense'
        AND ft.payment_status = 'pending'
        AND ft.deleted_at IS NULL
      ORDER BY ft.due_date
      LIMIT 50
    `.catch(() => [])

    // 8. Incluir pagamentos da tabela payments
    const paymentsResult = await db`
      SELECT
        pay.id,
        'income' as type,
        'Pagamento' as category,
        pay.amount,
        pay.description,
        pay.payment_method,
        pay.status as payment_status,
        pay.payment_date as due_date,
        pay.payment_date as paid_date,
        p.full_name as patient_name
      FROM payments pay
      LEFT JOIN patients p ON pay.patient_id = p.id
      WHERE pay.user_id = ${userId}
        AND pay.payment_date >= ${start}
        AND pay.payment_date <= ${end}
      ORDER BY pay.payment_date DESC
    `.catch(() => [])

    // Combinar transações
    const allTransactions = [...transactionsResult, ...paymentsResult]

    // Calcular totais
    const summary = summaryResult[0] || { total_receitas: 0, total_despesas: 0, count_receitas: 0 }
    const paymentsTotal = paymentsResult
      .filter((p: any) => p.payment_status === 'paid')
      .reduce((acc: number, p: any) => acc + Number(p.amount || 0), 0)

    const totalReceitas = Number(summary.total_receitas) + paymentsTotal
    const totalDespesas = Number(summary.total_despesas)
    const countReceitas = Number(summary.count_receitas) + paymentsResult.filter((p: any) => p.payment_status === 'paid').length

    // Calcular percentuais de categorias
    const receitasTotal = receitasCategoriaResult.reduce((acc: number, r: any) => acc + Number(r.total), 0) + paymentsTotal
    const despesasTotal = despesasCategoriaResult.reduce((acc: number, d: any) => acc + Number(d.total), 0)

    const reportData: FinancialReportData = {
      title: "Relatório Financeiro Detalhado",
      subtitle: "Análise completa de receitas, despesas e fluxo de caixa",
      period: `${formatDate(start)} a ${formatDate(end)}`,
      generatedAt: new Date().toLocaleString('pt-BR'),
      generatedBy: user.name || user.email,
      summary: {
        totalReceitas,
        totalDespesas,
        lucroLiquido: totalReceitas - totalDespesas,
        ticketMedio: countReceitas > 0 ? totalReceitas / countReceitas : 0,
        totalTransacoes: allTransactions.length
      },
      receitasPorCategoria: [
        ...receitasCategoriaResult.map((r: any) => ({
          categoria: r.category || 'Outros',
          valor: Number(r.total),
          percentual: receitasTotal > 0 ? (Number(r.total) / receitasTotal) * 100 : 0
        })),
        ...(paymentsTotal > 0 ? [{
          categoria: 'Pagamentos CRM',
          valor: paymentsTotal,
          percentual: receitasTotal > 0 ? (paymentsTotal / receitasTotal) * 100 : 0
        }] : [])
      ],
      despesasPorCategoria: despesasCategoriaResult.map((d: any) => ({
        categoria: d.category || 'Outros',
        valor: Number(d.total),
        percentual: despesasTotal > 0 ? (Number(d.total) / despesasTotal) * 100 : 0
      })),
      receitasMensais: mensalResult.map((m: any) => ({
        mes: m.mes_label,
        receitas: Number(m.receitas),
        despesas: Number(m.despesas),
        lucro: Number(m.receitas) - Number(m.despesas)
      })),
      contasAReceber: receberResult.map((c: any) => ({
        descricao: c.description || 'Sem descrição',
        paciente: c.paciente,
        valor: Number(c.amount),
        vencimento: formatDate(c.due_date),
        status: c.status
      })),
      contasAPagar: pagarResult.map((c: any) => ({
        descricao: c.description || 'Sem descrição',
        fornecedor: c.fornecedor,
        valor: Number(c.amount),
        vencimento: formatDate(c.due_date),
        status: c.status
      })),
      transacoes: allTransactions.map((t: any) => ({
        data: formatDate(t.due_date || t.paid_date),
        descricao: t.description || t.category || 'Sem descrição',
        categoria: t.category || 'Outros',
        tipo: t.type === 'income' ? 'receita' as const : 'despesa' as const,
        valor: Number(t.amount),
        status: t.payment_status === 'paid' ? 'Pago' : 'Pendente',
        formaPagamento: t.payment_method || 'Não informado'
      }))
    }

    return { success: true, data: reportData }
  } catch (error: any) {
    console.error("Erro ao gerar relatório financeiro:", error)
    return { success: false, error: error.message }
  }
}

// ============================================================================
// RELATÓRIO DE PACIENTES COMPLETO
// ============================================================================

export async function generatePatientsReportData(): Promise<{ success: boolean; error?: string; data?: PatientReportData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { success: false, error: "Não autenticado" }

    const user = await verifyToken(token)
    if (!user) return { success: false, error: "Sessão inválida" }

    const db = await getDb()
    const userId = user.id
    const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]

    // 1. Buscar todos os pacientes
    const patientsResult = await db`
      SELECT
        p.id,
        p.full_name,
        p.cpf,
        p.birth_date,
        p.phone,
        p.email,
        p.health_insurance,
        p.created_at,
        (SELECT MAX(a.appointment_date) FROM appointments a WHERE a.patient_id = p.id) as ultima_consulta,
        (SELECT COUNT(*) FROM appointments a WHERE a.patient_id = p.id) as total_consultas,
        (SELECT COALESCE(SUM(pay.amount), 0) FROM payments pay WHERE pay.patient_id = p.id AND pay.status = 'paid') as total_gasto
      FROM patients p
      WHERE p.user_id = ${userId}
      ORDER BY p.full_name
    `.catch(() => [])

    // 2. Contadores
    const totalPacientes = patientsResult.length
    const novosNoMes = patientsResult.filter((p: any) =>
      p.created_at && new Date(p.created_at) >= new Date(firstDayOfMonth)
    ).length

    // Considerar ativo se teve consulta nos últimos 6 meses
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const ativos = patientsResult.filter((p: any) =>
      p.ultima_consulta && new Date(p.ultima_consulta) >= sixMonthsAgo
    ).length

    // 3. Distribuição por convênio
    const convenioCount: Record<string, number> = {}
    patientsResult.forEach((p: any) => {
      const convenio = p.health_insurance || 'Particular'
      convenioCount[convenio] = (convenioCount[convenio] || 0) + 1
    })

    // 4. Distribuição por idade
    const idadeCount: Record<string, number> = {
      '0-17': 0,
      '18-30': 0,
      '31-45': 0,
      '46-60': 0,
      '60+': 0
    }

    patientsResult.forEach((p: any) => {
      if (p.birth_date) {
        const age = Math.floor((Date.now() - new Date(p.birth_date).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
        if (age < 18) idadeCount['0-17']++
        else if (age <= 30) idadeCount['18-30']++
        else if (age <= 45) idadeCount['31-45']++
        else if (age <= 60) idadeCount['46-60']++
        else idadeCount['60+']++
      }
    })

    const reportData: PatientReportData = {
      title: "Relatório de Pacientes",
      generatedAt: new Date().toLocaleString('pt-BR'),
      generatedBy: user.name || user.email,
      summary: {
        totalPacientes,
        novosNoMes,
        ativos,
        inativos: totalPacientes - ativos
      },
      pacientes: patientsResult.map((p: any) => ({
        nome: p.full_name,
        cpf: p.cpf || '-',
        dataNascimento: p.birth_date ? formatDate(p.birth_date) : '-',
        telefone: p.phone || '-',
        email: p.email || '-',
        convenio: p.health_insurance || 'Particular',
        ultimaConsulta: p.ultima_consulta ? formatDate(p.ultima_consulta) : 'Nunca',
        totalConsultas: Number(p.total_consultas) || 0,
        totalGasto: Number(p.total_gasto) || 0
      })),
      distribuicaoPorConvenio: Object.entries(convenioCount).map(([convenio, quantidade]) => ({
        convenio,
        quantidade,
        percentual: totalPacientes > 0 ? (quantidade / totalPacientes) * 100 : 0
      })),
      distribuicaoPorIdade: Object.entries(idadeCount).map(([faixa, quantidade]) => ({
        faixa: faixa + ' anos',
        quantidade,
        percentual: totalPacientes > 0 ? (quantidade / totalPacientes) * 100 : 0
      }))
    }

    return { success: true, data: reportData }
  } catch (error: any) {
    console.error("Erro ao gerar relatório de pacientes:", error)
    return { success: false, error: error.message }
  }
}

// ============================================================================
// RELATÓRIO DE AGENDAMENTOS COMPLETO
// ============================================================================

export async function generateAppointmentsReportData(
  startDate?: string,
  endDate?: string
): Promise<{ success: boolean; error?: string; data?: AppointmentReportData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { success: false, error: "Não autenticado" }

    const user = await verifyToken(token)
    if (!user) return { success: false, error: "Sessão inválida" }

    const db = await getDb()
    const userId = user.id

    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const end = endDate || new Date().toISOString().split('T')[0]

    // 1. Buscar agendamentos
    const appointmentsResult = await db`
      SELECT
        a.id,
        a.appointment_date,
        a.appointment_type,
        a.status,
        a.notes,
        p.full_name as patient_name,
        u.name as professional_name,
        (SELECT COALESCE(SUM(pay.amount), 0) FROM payments pay WHERE pay.appointment_id = a.id) as valor,
        (SELECT string_agg(pr.tuss_name, ', ') FROM procedures pr WHERE pr.appointment_id = a.id) as procedimentos
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE a.user_id = ${userId}
        AND a.appointment_date >= ${start}
        AND a.appointment_date <= ${end}
      ORDER BY a.appointment_date DESC
    `.catch(() => [])

    // 2. Contadores
    const total = appointmentsResult.length
    const realizados = appointmentsResult.filter((a: any) => a.status === 'completed').length
    const cancelados = appointmentsResult.filter((a: any) => a.status === 'cancelled').length
    const pendentes = appointmentsResult.filter((a: any) => a.status === 'pending' || a.status === 'scheduled').length

    // 3. Por tipo
    const tipoCount: Record<string, number> = {}
    appointmentsResult.forEach((a: any) => {
      const tipo = a.appointment_type || 'Consulta'
      tipoCount[tipo] = (tipoCount[tipo] || 0) + 1
    })

    // 4. Por profissional
    const profissionalData: Record<string, { quantidade: number; receita: number }> = {}
    appointmentsResult.forEach((a: any) => {
      const prof = a.professional_name || 'Não informado'
      if (!profissionalData[prof]) {
        profissionalData[prof] = { quantidade: 0, receita: 0 }
      }
      profissionalData[prof].quantidade++
      profissionalData[prof].receita += Number(a.valor) || 0
    })

    const reportData: AppointmentReportData = {
      title: "Relatório de Agendamentos",
      period: `${formatDate(start)} a ${formatDate(end)}`,
      generatedAt: new Date().toLocaleString('pt-BR'),
      generatedBy: user.name || user.email,
      summary: {
        totalAgendamentos: total,
        realizados,
        cancelados,
        pendentes,
        taxaComparecimento: total > 0 ? (realizados / (total - pendentes)) * 100 : 0
      },
      agendamentos: appointmentsResult.map((a: any) => ({
        data: formatDate(a.appointment_date),
        horario: a.appointment_date ? new Date(a.appointment_date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '-',
        paciente: a.patient_name || 'Não informado',
        tipo: a.appointment_type || 'Consulta',
        status: a.status === 'completed' ? 'Realizado' : a.status === 'cancelled' ? 'Cancelado' : 'Pendente',
        profissional: a.professional_name || 'Não informado',
        valor: Number(a.valor) || 0,
        procedimentos: a.procedimentos || '-'
      })),
      porTipo: Object.entries(tipoCount).map(([tipo, quantidade]) => ({
        tipo,
        quantidade,
        percentual: total > 0 ? (quantidade / total) * 100 : 0
      })),
      porProfissional: Object.entries(profissionalData).map(([profissional, data]) => ({
        profissional,
        quantidade: data.quantidade,
        receita: data.receita
      }))
    }

    return { success: true, data: reportData }
  } catch (error: any) {
    console.error("Erro ao gerar relatório de agendamentos:", error)
    return { success: false, error: error.message }
  }
}

// ============================================================================
// RELATÓRIO DE ESTOQUE COMPLETO
// ============================================================================

export async function generateInventoryReportData(): Promise<{ success: boolean; error?: string; data?: InventoryReportData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { success: false, error: "Não autenticado" }

    const user = await verifyToken(token)
    if (!user) return { success: false, error: "Sessão inválida" }

    const db = await getDb()
    const userId = user.id
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    // 1. Buscar itens do estoque
    const itemsResult = await db`
      SELECT
        i.id,
        i.code,
        i.name,
        i.category,
        i.current_stock,
        i.minimum_stock,
        i.unit,
        i.unit_cost,
        i.supplier_name,
        i.last_purchase_date,
        i.expiration_date,
        i.is_active
      FROM inventory_items i
      WHERE i.user_id = ${userId}
        AND i.is_active = true
      ORDER BY i.name
    `.catch(() => [])

    // 2. Buscar movimentações recentes
    const movementsResult = await db`
      SELECT
        m.id,
        m.type,
        m.quantity,
        m.unit_cost,
        m.total_cost,
        m.reason,
        m.created_at,
        i.name as item_name
      FROM inventory_movements m
      JOIN inventory_items i ON m.item_id = i.id
      WHERE m.user_id = ${userId}
      ORDER BY m.created_at DESC
      LIMIT 100
    `.catch(() => [])

    // 3. Calcular totais
    const totalItens = itemsResult.length
    let valorTotalEstoque = 0
    let itensAbaixoMinimo = 0
    let itensVencendo = 0

    itemsResult.forEach((item: any) => {
      valorTotalEstoque += (Number(item.current_stock) || 0) * (Number(item.unit_cost) || 0)

      if (Number(item.current_stock) < Number(item.minimum_stock)) {
        itensAbaixoMinimo++
      }

      if (item.expiration_date && new Date(item.expiration_date) <= new Date(thirtyDaysFromNow)) {
        itensVencendo++
      }
    })

    const reportData: InventoryReportData = {
      title: "Relatório de Estoque",
      generatedAt: new Date().toLocaleString('pt-BR'),
      generatedBy: user.name || user.email,
      summary: {
        totalItens,
        valorTotalEstoque,
        itensAbaixoMinimo,
        itensVencendo
      },
      itens: itemsResult.map((item: any) => {
        const estoqueAtual = Number(item.current_stock) || 0
        const estoqueMinimo = Number(item.minimum_stock) || 0
        const custoUnitario = Number(item.unit_cost) || 0

        let status = 'Normal'
        if (estoqueAtual < estoqueMinimo) status = 'Abaixo do Mínimo'
        if (estoqueAtual === 0) status = 'Sem Estoque'
        if (item.expiration_date && new Date(item.expiration_date) <= new Date(thirtyDaysFromNow)) {
          status = 'Próximo ao Vencimento'
        }

        return {
          codigo: item.code || '-',
          nome: item.name,
          categoria: item.category || 'Geral',
          estoqueAtual,
          estoqueMinimo,
          unidade: item.unit || 'UN',
          custoUnitario,
          valorTotal: estoqueAtual * custoUnitario,
          fornecedor: item.supplier_name || 'Não informado',
          ultimaCompra: item.last_purchase_date ? formatDate(item.last_purchase_date) : '-',
          validade: item.expiration_date ? formatDate(item.expiration_date) : 'N/A',
          status
        }
      }),
      movimentacoes: movementsResult.map((m: any) => ({
        data: formatDate(m.created_at),
        item: m.item_name,
        tipo: m.type === 'entry' ? 'entrada' as const : 'saida' as const,
        quantidade: Number(m.quantity) || 0,
        custoUnitario: Number(m.unit_cost) || 0,
        total: Number(m.total_cost) || 0,
        motivo: m.reason || '-'
      }))
    }

    return { success: true, data: reportData }
  } catch (error: any) {
    console.error("Erro ao gerar relatório de estoque:", error)
    return { success: false, error: error.message }
  }
}

// ============================================================================
// RELATÓRIO INTEGRADO (TODOS OS MÓDULOS)
// ============================================================================

export async function generateIntegratedReportData(
  startDate?: string,
  endDate?: string
): Promise<{ success: boolean; error?: string; data?: IntegratedReportData }> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) return { success: false, error: "Não autenticado" }

    const user = await verifyToken(token)
    if (!user) return { success: false, error: "Sessão inválida" }

    const db = await getDb()
    const tenantId = user.tenantId || user.tenant_id
    const userId = user.id

    const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const end = endDate || new Date().toISOString().split('T')[0]
    const today = new Date().toISOString().split('T')[0]

    // 1. FINANCEIRO
    const financeiroQuery = await db`
      SELECT
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'paid'), 0) as receitas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'paid'), 0) as despesas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'pending'), 0) as a_receber,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'pending'), 0) as a_pagar
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
    `.catch(() => [{ receitas: 0, despesas: 0, a_receber: 0, a_pagar: 0 }])

    // 2. PAGAMENTOS CRM
    const paymentsQuery = await db`
      SELECT COALESCE(SUM(amount), 0) as total
      FROM payments
      WHERE user_id = ${userId}
        AND status = 'paid'
        AND payment_date >= ${start}
        AND payment_date <= ${end}
    `.catch(() => [{ total: 0 }])

    // 3. OPERACIONAL
    const patientsQuery = await db`
      SELECT COUNT(*) as total
      FROM patients
      WHERE user_id = ${userId}
    `.catch(() => [{ total: 0 }])

    const appointmentsQuery = await db`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'completed') as realizados
      FROM appointments
      WHERE user_id = ${userId}
        AND appointment_date >= ${start}
        AND appointment_date <= ${end}
    `.catch(() => [{ total: 0, realizados: 0 }])

    // 4. ESTOQUE
    const estoqueQuery = await db`
      SELECT
        COALESCE(SUM(current_stock * COALESCE(unit_cost, 0)), 0) as valor_total,
        COUNT(*) FILTER (WHERE current_stock < minimum_stock) as abaixo_minimo
      FROM inventory_items
      WHERE user_id = ${userId}
        AND is_active = true
    `.catch(() => [{ valor_total: 0, abaixo_minimo: 0 }])

    // 5. ORÇAMENTOS
    const budgetsQuery = await db`
      SELECT COUNT(*) FILTER (WHERE status = 'approved') as aprovados
      FROM budgets
      WHERE user_id = ${userId}
        AND created_at >= ${start}
        AND created_at <= ${end}
    `.catch(() => [{ aprovados: 0 }])

    // 6. NFE
    const nfeQuery = await db`
      SELECT COUNT(*) FILTER (WHERE status = 'authorized') as emitidas
      FROM nfe_invoices
      WHERE user_id = ${userId}
        AND created_at >= ${start}
        AND created_at <= ${end}
    `.catch(() => [{ emitidas: 0 }])

    // 7. CONTRATOS
    const contratosQuery = await db`
      SELECT COUNT(*) FILTER (WHERE status = 'signed') as ativos
      FROM contracts
      WHERE user_id = ${userId}
        AND (valid_until IS NULL OR valid_until >= ${today})
    `.catch(() => [{ ativos: 0 }])

    // 8. EVOLUÇÃO MENSAL
    const evolucaoQuery = await db`
      SELECT
        TO_CHAR(due_date, 'Mon/YY') as mes,
        COALESCE(SUM(amount) FILTER (WHERE type = 'income' AND payment_status = 'paid'), 0) as receitas,
        COALESCE(SUM(amount) FILTER (WHERE type = 'expense' AND payment_status = 'paid'), 0) as despesas
      FROM financial_transactions
      WHERE tenant_id = ${tenantId}
        AND deleted_at IS NULL
        AND due_date >= ${start}
        AND due_date <= ${end}
      GROUP BY TO_CHAR(due_date, 'Mon/YY'), TO_CHAR(due_date, 'YYYY-MM')
      ORDER BY TO_CHAR(due_date, 'YYYY-MM')
    `.catch(() => [])

    const evolucaoConsultasQuery = await db`
      SELECT
        TO_CHAR(appointment_date, 'Mon/YY') as mes,
        COUNT(*) as consultas
      FROM appointments
      WHERE user_id = ${userId}
        AND status = 'completed'
        AND appointment_date >= ${start}
        AND appointment_date <= ${end}
      GROUP BY TO_CHAR(appointment_date, 'Mon/YY'), TO_CHAR(appointment_date, 'YYYY-MM')
      ORDER BY TO_CHAR(appointment_date, 'YYYY-MM')
    `.catch(() => [])

    const evolucaoPacientesQuery = await db`
      SELECT
        TO_CHAR(created_at, 'Mon/YY') as mes,
        COUNT(*) as novos
      FROM patients
      WHERE user_id = ${userId}
        AND created_at >= ${start}
        AND created_at <= ${end}
      GROUP BY TO_CHAR(created_at, 'Mon/YY'), TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY TO_CHAR(created_at, 'YYYY-MM')
    `.catch(() => [])

    // Combinar evolução mensal
    const evolucaoMap = new Map<string, any>()

    evolucaoQuery.forEach((e: any) => {
      evolucaoMap.set(e.mes, {
        mes: e.mes,
        receitas: Number(e.receitas),
        despesas: Number(e.despesas),
        consultas: 0,
        novosPacientes: 0
      })
    })

    evolucaoConsultasQuery.forEach((e: any) => {
      const existing = evolucaoMap.get(e.mes) || { mes: e.mes, receitas: 0, despesas: 0, consultas: 0, novosPacientes: 0 }
      existing.consultas = Number(e.consultas)
      evolucaoMap.set(e.mes, existing)
    })

    evolucaoPacientesQuery.forEach((e: any) => {
      const existing = evolucaoMap.get(e.mes) || { mes: e.mes, receitas: 0, despesas: 0, consultas: 0, novosPacientes: 0 }
      existing.novosPacientes = Number(e.novos)
      evolucaoMap.set(e.mes, existing)
    })

    const fin = financeiroQuery[0] || {}
    const pay = paymentsQuery[0] || {}
    const totalReceitas = Number(fin.receitas || 0) + Number(pay.total || 0)
    const totalDespesas = Number(fin.despesas || 0)
    const totalConsultas = Number(appointmentsQuery[0]?.realizados || 0)

    const reportData: IntegratedReportData = {
      title: "Relatório Gerencial Integrado",
      period: `${formatDate(start)} a ${formatDate(end)}`,
      generatedAt: new Date().toLocaleString('pt-BR'),
      generatedBy: user.name || user.email,
      financeiro: {
        totalReceitas,
        totalDespesas,
        lucroLiquido: totalReceitas - totalDespesas,
        contasAReceber: Number(fin.a_receber || 0),
        contasAPagar: Number(fin.a_pagar || 0)
      },
      operacional: {
        totalPacientes: Number(patientsQuery[0]?.total || 0),
        totalConsultas,
        taxaOcupacao: totalConsultas > 0 ? 75 : 0, // Placeholder - calcular baseado em agenda
        ticketMedio: totalConsultas > 0 ? totalReceitas / totalConsultas : 0
      },
      estoque: {
        valorTotal: Number(estoqueQuery[0]?.valor_total || 0),
        itensAbaixoMinimo: Number(estoqueQuery[0]?.abaixo_minimo || 0)
      },
      faturamento: {
        orcamentosAprovados: Number(budgetsQuery[0]?.aprovados || 0),
        nfeEmitidas: Number(nfeQuery[0]?.emitidas || 0),
        contratosAtivos: Number(contratosQuery[0]?.ativos || 0)
      },
      evolucaoMensal: Array.from(evolucaoMap.values())
    }

    return { success: true, data: reportData }
  } catch (error: any) {
    console.error("Erro ao gerar relatório integrado:", error)
    return { success: false, error: error.message }
  }
}

// ============================================================================
// EXPORTAR PARA EXCEL
// ============================================================================

export async function exportFinancialToExcel(startDate?: string, endDate?: string) {
  const result = await generateFinancialReportData(startDate, endDate)
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const workbook = generateFinancialExcel(result.data)
  const base64 = exportWorkbookToBase64(workbook)

  return {
    success: true,
    data: base64,
    filename: `relatorio-financeiro-${Date.now()}.xlsx`,
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
}

export async function exportPatientsToExcel() {
  const result = await generatePatientsReportData()
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const workbook = generatePatientsExcel(result.data)
  const base64 = exportWorkbookToBase64(workbook)

  return {
    success: true,
    data: base64,
    filename: `relatorio-pacientes-${Date.now()}.xlsx`,
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
}

export async function exportAppointmentsToExcel(startDate?: string, endDate?: string) {
  const result = await generateAppointmentsReportData(startDate, endDate)
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const workbook = generateAppointmentsExcel(result.data)
  const base64 = exportWorkbookToBase64(workbook)

  return {
    success: true,
    data: base64,
    filename: `relatorio-agendamentos-${Date.now()}.xlsx`,
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
}

export async function exportInventoryToExcel() {
  const result = await generateInventoryReportData()
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const workbook = generateInventoryExcel(result.data)
  const base64 = exportWorkbookToBase64(workbook)

  return {
    success: true,
    data: base64,
    filename: `relatorio-estoque-${Date.now()}.xlsx`,
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
}

export async function exportIntegratedToExcel(startDate?: string, endDate?: string) {
  const result = await generateIntegratedReportData(startDate, endDate)
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const workbook = generateIntegratedExcel(result.data)
  const base64 = exportWorkbookToBase64(workbook)

  return {
    success: true,
    data: base64,
    filename: `relatorio-gerencial-${Date.now()}.xlsx`,
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }
}

// ============================================================================
// EXPORTAR PARA PDF (HTML)
// ============================================================================

export async function exportFinancialToPDF(startDate?: string, endDate?: string) {
  const result = await generateFinancialReportData(startDate, endDate)
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const html = generateFinancialPDFHTML(result.data)

  return {
    success: true,
    data: html,
    filename: `relatorio-financeiro-${Date.now()}.html`,
    contentType: 'text/html'
  }
}

export async function exportIntegratedToPDF(startDate?: string, endDate?: string) {
  const result = await generateIntegratedReportData(startDate, endDate)
  if (!result.success || !result.data) {
    return { success: false, error: result.error }
  }

  const html = generateIntegratedPDFHTML(result.data)

  return {
    success: true,
    data: html,
    filename: `relatorio-gerencial-${Date.now()}.html`,
    contentType: 'text/html'
  }
}
