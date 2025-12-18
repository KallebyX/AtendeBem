'use client'

import { useEffect, useState } from 'react'
import { getDashboardMetrics, getFinancialTransactions, updateTransactionStatus, getRevenueCategories, getPaymentMethods, createFinancialTransaction } from '@/app/actions/financial'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
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
  AlertCircle
} from 'lucide-react'

export default function FinancialDashboard() {
  const [metrics, setMetrics] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    startDate: '',
    endDate: ''
  })
  const [showNewTransaction, setShowNewTransaction] = useState(false)
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
    const [metricsRes, transactionsRes, categoriesRes, methodsRes] = await Promise.all([
      getDashboardMetrics(),
      getFinancialTransactions(filters),
      getRevenueCategories(),
      getPaymentMethods()
    ])

    if (metricsRes.success) setMetrics(metricsRes.data)
    if (transactionsRes.success) setTransactions(transactionsRes.data)
    if (categoriesRes.success) setCategories(categoriesRes.data)
    if (methodsRes.success) setPaymentMethods(methodsRes.data)
    
    setLoading(false)
  }

  async function handleCreateTransaction() {
    const result = await createFinancialTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    })

    if (result.success) {
      setShowNewTransaction(false)
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
          <p className="text-muted-foreground">Carregando dashboard financeiro...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Financeiro</h1>
          <p className="text-muted-foreground">Gestão completa de receitas e despesas</p>
        </div>
        <div className="flex gap-2">
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

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receitas
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(metrics?.totalRevenue || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.revenueCount || 0} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Despesas
            </CardTitle>
            <TrendingDown className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(metrics?.totalExpenses || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.expensesCount || 0} transações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lucro Líquido
            </CardTitle>
            <DollarSign className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(metrics?.profit || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(metrics?.profit || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Margem: {metrics?.totalRevenue ? ((metrics.profit / metrics.totalRevenue) * 100).toFixed(1) : 0}%
            </p>
          </CardContent>
        </Card>

        <Card>
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
              Contas a Receber (Vencidas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(metrics?.accountsReceivable?.total || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.accountsReceivable?.count || 0} pendências
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              Contas a Pagar (Vencidas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(metrics?.accountsPayable?.total || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics?.accountsPayable?.count || 0} pendências
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transações */}
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
              <p className="text-center text-muted-foreground py-8">
                Nenhuma transação encontrada
              </p>
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

      {/* Modal Nova Transação */}
      {showNewTransaction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Nova Transação</CardTitle>
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
                    {categories
                      .filter(c => c.type === newTransaction.type)
                      .map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
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

              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowNewTransaction(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateTransaction}>
                  Criar Transação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
