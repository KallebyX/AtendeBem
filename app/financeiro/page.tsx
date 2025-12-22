'use client'

import { useEffect, useState } from 'react'
import {
  getDashboardMetrics,
  getFinancialTransactions,
  updateTransactionStatus,
  getRevenueCategories,
  getPaymentMethods,
  createFinancialTransaction,
  getIntegratedFinancialSummary,
  syncBudgetsToFinancial,
  syncNFeToFinancial,
  IntegratedFinancialSummary
} from '@/app/actions/financial'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/lib/financial-categories'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Plus,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  FileText,
  Package,
  ClipboardList,
  Receipt,
  Users,
  Stethoscope,
  Layers,
  ArrowRight,
  BarChart3,
  PieChart
} from 'lucide-react'

export default function FinancialDashboard() {
  const [metrics, setMetrics] = useState<any>(null)
  const [integratedSummary, setIntegratedSummary] = useState<IntegratedFinancialSummary | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [activeTab, setActiveTab] = useState('resumo')
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    startDate: '',
    endDate: ''
  })
  const [showNewTransaction, setShowNewTransaction] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    payment_method: '',
    payment_status: 'pending' as 'pending' | 'paid',
    due_date: new Date().toISOString().split('T')[0],
    paid_date: '',
    notes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [metricsRes, integratedRes, transactionsRes, categoriesRes, methodsRes] = await Promise.all([
      getDashboardMetrics(),
      getIntegratedFinancialSummary(),
      getFinancialTransactions(filters),
      getRevenueCategories(),
      getPaymentMethods()
    ])

    if (metricsRes.success) setMetrics(metricsRes.data)
    if (integratedRes.data) setIntegratedSummary(integratedRes.data)
    if (transactionsRes.success) setTransactions(transactionsRes.data)

    if (categoriesRes.success && categoriesRes.data && categoriesRes.data.length > 0) {
      setCategories(categoriesRes.data)
    } else {
      const localCategories = [
        ...INCOME_CATEGORIES.map(c => ({ ...c, id: c.name })),
        ...EXPENSE_CATEGORIES.map(c => ({ ...c, id: c.name }))
      ]
      setCategories(localCategories)
    }

    if (methodsRes.success && methodsRes.data && methodsRes.data.length > 0) {
      setPaymentMethods(methodsRes.data)
    } else {
      const localMethods = PAYMENT_METHODS.map(m => ({ ...m, id: m.name }))
      setPaymentMethods(localMethods)
    }

    setLoading(false)
  }

  async function handleSyncAll() {
    setSyncing(true)
    setSyncMessage(null)
    try {
      const [budgetsRes, nfeRes] = await Promise.all([
        syncBudgetsToFinancial(),
        syncNFeToFinancial()
      ])

      let message = 'Sincronização concluída: '
      if (budgetsRes.success && budgetsRes.data) {
        message += `${budgetsRes.data.created} orçamentos, `
      }
      if (nfeRes.success && nfeRes.data) {
        message += `${nfeRes.data.created} notas fiscais`
      }
      setSyncMessage(message)
      await loadData()
    } catch (err) {
      setSyncMessage('Erro ao sincronizar. Tente novamente.')
    } finally {
      setSyncing(false)
    }
  }

  async function handleCreateTransaction() {
    setError(null)

    if (!newTransaction.amount || parseFloat(newTransaction.amount) <= 0) {
      setError('O valor é obrigatório e deve ser maior que zero')
      return
    }

    if (!newTransaction.category) {
      setError('Selecione uma categoria')
      return
    }

    if (!newTransaction.payment_method) {
      setError('Selecione um método de pagamento')
      return
    }

    setSaving(true)

    try {
      const result = await createFinancialTransaction({
        ...newTransaction,
        amount: parseFloat(newTransaction.amount)
      })

      if (result.success) {
        setShowNewTransaction(false)
        setError(null)
        setNewTransaction({
          type: 'income',
          category: '',
          amount: '',
          description: '',
          payment_method: '',
          payment_status: 'pending',
          due_date: new Date().toISOString().split('T')[0],
          paid_date: '',
          notes: ''
        })
        loadData()
      } else {
        setError(result.error || 'Erro ao criar transação. Tente novamente.')
      }
    } catch (err: any) {
      console.error('Erro ao criar transação:', err)
      setError('Erro inesperado ao criar transação. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleUpdateStatus(id: string, status: any) {
    const result = await updateTransactionStatus(id, status)
    if (result.success) {
      loadData()
    }
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('pt-BR')
  }

  function getStatusBadge(status: string) {
    const badges = {
      paid: { label: 'Pago', variant: 'success', icon: CheckCircle },
      pending: { label: 'Pendente', variant: 'warning', icon: Clock },
      cancelled: { label: 'Cancelado', variant: 'destructive', icon: XCircle },
      refunded: { label: 'Reembolsado', variant: 'secondary', icon: AlertCircle }
    }
    const badge = badges[status as keyof typeof badges] || badges.pending
    const Icon = badge.icon

    return (
      <Badge variant={badge.variant as any} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {badge.label}
      </Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando dashboard financeiro integrado...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Financeiro Integrado</h1>
          <p className="text-muted-foreground">Visão consolidada de todos os módulos do sistema</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncAll}
            disabled={syncing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Sincronizando...' : 'Sincronizar'}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm" onClick={() => setShowNewTransaction(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>
      </div>

      {syncMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          {syncMessage}
        </div>
      )}

      {/* Tabs para diferentes visualizações */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumo" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Resumo Geral
          </TabsTrigger>
          <TabsTrigger value="modulos" className="flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Por Módulo
          </TabsTrigger>
          <TabsTrigger value="transacoes" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Transações
          </TabsTrigger>
          <TabsTrigger value="analise" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Análise
          </TabsTrigger>
        </TabsList>

        {/* Tab: Resumo Geral */}
        <TabsContent value="resumo" className="space-y-6">
          {/* KPIs Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Receitas
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(integratedSummary?.totalReceitas || metrics?.totalRevenue || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Últimos 30 dias
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Despesas
                </CardTitle>
                <TrendingDown className="w-4 h-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(integratedSummary?.totalDespesas || metrics?.totalExpenses || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Últimos 30 dias
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lucro Líquido
                </CardTitle>
                <DollarSign className="w-4 h-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${(integratedSummary?.lucroLiquido || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(integratedSummary?.lucroLiquido || metrics?.profit || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Margem: {integratedSummary?.totalReceitas ? ((integratedSummary.lucroLiquido / integratedSummary.totalReceitas) * 100).toFixed(1) : 0}%
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ticket Médio
                </CardTitle>
                <Calendar className="w-4 h-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(metrics?.avgTicket || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Por atendimento
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contas a Receber/Pagar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  Contas a Receber
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Vencidas</p>
                    <div className="text-xl font-bold text-orange-600">
                      {formatCurrency(integratedSummary?.contasAReceber?.vencidas || metrics?.accountsReceivable?.total || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {integratedSummary?.contasAReceber?.count || 0} pendências
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">A Vencer</p>
                    <div className="text-xl font-bold text-yellow-600">
                      {formatCurrency(integratedSummary?.contasAReceber?.aVencer || 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Contas a Pagar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Vencidas</p>
                    <div className="text-xl font-bold text-red-600">
                      {formatCurrency(integratedSummary?.contasAPagar?.vencidas || metrics?.accountsPayable?.total || 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {integratedSummary?.contasAPagar?.count || 0} pendências
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">A Vencer</p>
                    <div className="text-xl font-bold text-yellow-600">
                      {formatCurrency(integratedSummary?.contasAPagar?.aVencer || 0)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Por Módulo */}
        <TabsContent value="modulos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Orçamentos */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Orçamentos</CardTitle>
                  <CardDescription>Propostas aprovadas</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Aprovados</span>
                    <Badge variant="success">
                      {integratedSummary?.estatisticas?.orcamentosAprovados || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pendentes</span>
                    <Badge variant="warning">
                      {integratedSummary?.estatisticas?.orcamentosPendentes || 0}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Receita de Orçamentos</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(integratedSummary?.receitasPorOrigem?.orcamentos || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NFe */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Notas Fiscais</CardTitle>
                  <CardDescription>NFe e NFSe</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Autorizadas</span>
                    <Badge variant="success">
                      {integratedSummary?.estatisticas?.nfeAutorizadas || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pendentes</span>
                    <Badge variant="warning">
                      {integratedSummary?.estatisticas?.nfePendentes || 0}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Faturamento NFe</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(integratedSummary?.receitasPorOrigem?.nfe || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estoque */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Estoque</CardTitle>
                  <CardDescription>Materiais e insumos</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Valor em Estoque</span>
                    <span className="font-medium">
                      {formatCurrency(integratedSummary?.estatisticas?.valorEstoque || 0)}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Despesas com Estoque</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(integratedSummary?.despesasPorOrigem?.estoque || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contratos */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Contratos</CardTitle>
                  <CardDescription>Acordos ativos</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Contratos Ativos</span>
                    <Badge variant="success">
                      {integratedSummary?.estatisticas?.contratosAtivos || 0}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Receita de Contratos</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(integratedSummary?.receitasPorOrigem?.contratos || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consultas */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Consultas</CardTitle>
                  <CardDescription>Atendimentos realizados</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Realizadas</span>
                    <Badge variant="success">
                      {integratedSummary?.estatisticas?.consultasRealizadas || 0}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Receita de Consultas</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(integratedSummary?.receitasPorOrigem?.consultas || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Outros */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Layers className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Outras Fontes</CardTitle>
                  <CardDescription>Demais origens</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Outras Receitas</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(integratedSummary?.receitasPorOrigem?.outros || 0)}
                    </p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">Outras Despesas</p>
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrency(integratedSummary?.despesasPorOrigem?.outros || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab: Transações */}
        <TabsContent value="transacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transações Recentes</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar..."
                      className="pl-8 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma transação encontrada</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowNewTransaction(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Criar primeira transação
                    </Button>
                  </div>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{transaction.description}</h3>
                          {getStatusBadge(transaction.payment_status)}
                          <Badge variant="outline">{transaction.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{transaction.payment_method}</span>
                          <span>Venc: {formatDate(transaction.due_date)}</span>
                          {transaction.patient_name && (
                            <span>Paciente: {transaction.patient_name}</span>
                          )}
                          {transaction.receipt_number && (
                            <span>Recibo: {transaction.receipt_number}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                        </div>
                        {transaction.payment_status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2"
                            onClick={() => handleUpdateStatus(transaction.id, 'paid')}
                          >
                            Marcar como Pago
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Análise */}
        <TabsContent value="analise" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Receitas por Origem */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Receitas por Origem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Consultas', value: integratedSummary?.receitasPorOrigem?.consultas || 0, color: 'bg-teal-500' },
                    { label: 'Procedimentos', value: integratedSummary?.receitasPorOrigem?.procedimentos || 0, color: 'bg-blue-500' },
                    { label: 'Orçamentos', value: integratedSummary?.receitasPorOrigem?.orcamentos || 0, color: 'bg-indigo-500' },
                    { label: 'Notas Fiscais', value: integratedSummary?.receitasPorOrigem?.nfe || 0, color: 'bg-green-500' },
                    { label: 'Contratos', value: integratedSummary?.receitasPorOrigem?.contratos || 0, color: 'bg-purple-500' },
                    { label: 'Outros', value: integratedSummary?.receitasPorOrigem?.outros || 0, color: 'bg-gray-500' },
                  ].map((item) => {
                    const total = integratedSummary?.totalReceitas || 1
                    const percentage = (item.value / total) * 100
                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-medium">{formatCurrency(item.value)}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Despesas por Origem */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  Despesas por Origem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Estoque/Materiais', value: integratedSummary?.despesasPorOrigem?.estoque || 0, color: 'bg-orange-500' },
                    { label: 'Fornecedores', value: integratedSummary?.despesasPorOrigem?.fornecedores || 0, color: 'bg-yellow-500' },
                    { label: 'Operacional', value: integratedSummary?.despesasPorOrigem?.operacional || 0, color: 'bg-red-500' },
                    { label: 'Outros', value: integratedSummary?.despesasPorOrigem?.outros || 0, color: 'bg-gray-500' },
                  ].map((item) => {
                    const total = integratedSummary?.totalDespesas || 1
                    const percentage = (item.value / total) * 100
                    return (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-medium">{formatCurrency(item.value)}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo de Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Performance</CardTitle>
              <CardDescription>Indicadores consolidados do período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {integratedSummary?.estatisticas?.consultasRealizadas || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Consultas Realizadas</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {integratedSummary?.estatisticas?.nfeAutorizadas || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Notas Emitidas</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">
                    {integratedSummary?.estatisticas?.orcamentosAprovados || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Orçamentos Aprovados</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(integratedSummary?.estatisticas?.valorEstoque || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Valor em Estoque</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Nova Transação */}
      {showNewTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Nova Transação</CardTitle>
              <CardDescription>Adicione uma receita ou despesa manualmente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={newTransaction.type}
                    onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as any })}
                  >
                    <option value="income">Receita</option>
                    <option value="expense">Despesa</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    {(() => {
                      const filteredCategories = categories.filter(c => c.type === newTransaction.type)
                      const groups = [...new Set(filteredCategories.map(c => c.group).filter(Boolean))]

                      if (groups.length > 0) {
                        return groups.map(group => (
                          <optgroup key={group} label={group as string}>
                            {filteredCategories
                              .filter(c => c.group === group)
                              .map(cat => (
                                <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>
                              ))}
                          </optgroup>
                        ))
                      }
                      return filteredCategories.map(cat => (
                        <option key={cat.id || cat.name} value={cat.name}>{cat.name}</option>
                      ))
                    })()}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  placeholder="Ex: Consulta Dr. Silva"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Método de Pagamento</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={newTransaction.payment_method}
                    onChange={(e) => setNewTransaction({ ...newTransaction, payment_method: e.target.value })}
                  >
                    <option value="">Selecione...</option>
                    {paymentMethods.map(method => (
                      <option key={method.id} value={method.name}>{method.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    className="w-full border rounded-md p-2"
                    value={newTransaction.payment_status}
                    onChange={(e) => setNewTransaction({ ...newTransaction, payment_status: e.target.value as any })}
                  >
                    <option value="pending">Pendente</option>
                    <option value="paid">Pago</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Data de Vencimento</Label>
                  <Input
                    type="date"
                    value={newTransaction.due_date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, due_date: e.target.value })}
                  />
                </div>
              </div>

              {newTransaction.payment_status === 'paid' && (
                <div className="space-y-2">
                  <Label>Data de Pagamento</Label>
                  <Input
                    type="date"
                    value={newTransaction.paid_date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, paid_date: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Observações</Label>
                <textarea
                  className="w-full border rounded-md p-2 min-h-[80px]"
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                  placeholder="Observações adicionais..."
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex gap-2 justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewTransaction(false)
                    setError(null)
                  }}
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateTransaction} disabled={saving}>
                  {saving ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Salvando...
                    </>
                  ) : (
                    'Criar Transação'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
