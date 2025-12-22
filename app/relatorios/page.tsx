'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NavigationHeader } from '@/components/navigation-header'
import { ReportExportPanel } from '@/components/report-export-panel'
import {
  getFinancialReport,
  exportPatientsReport,
  exportFinancialReport,
  exportAppointmentsReport
} from '@/app/actions/reports'
import {
  generateFinancialReportData,
  generateIntegratedReportData,
} from '@/app/actions/report-export'
import {
  BarChart3, TrendingUp, Users, DollarSign, Calendar, Download,
  FileText, RefreshCw, PieChart, Activity, FileSpreadsheet,
  Package, AlertTriangle, CheckCircle, Clock, Stethoscope,
  Pill, FileCheck, Microscope, ArrowUpRight, ArrowDownRight
} from 'lucide-react'
import { toast } from 'sonner'

export default function RelatoriosPage() {
  const [financialData, setFinancialData] = useState<any>(null)
  const [integratedData, setIntegratedData] = useState<any>(null)
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [period])

  async function loadData() {
    setLoading(true)
    try {
      const start = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      const end = new Date().toISOString().split('T')[0]

      const [financialResult, integratedResult] = await Promise.all([
        getFinancialReport(),
        generateIntegratedReportData(start, end)
      ])

      if (financialResult.data) setFinancialData(financialResult.data)
      if (integratedResult.data) setIntegratedData(integratedResult.data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleExport(type: 'patients' | 'financial' | 'appointments') {
    setExporting(type)
    try {
      let result
      switch (type) {
        case 'patients':
          result = await exportPatientsReport()
          break
        case 'financial':
          result = await exportFinancialReport()
          break
        case 'appointments':
          result = await exportAppointmentsReport()
          break
      }

      if (result.success && result.data) {
        const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = result.filename || `relatorio-${type}-${Date.now()}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        toast.success('Relatório exportado com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao exportar relatório')
      }
    } catch (error) {
      toast.error('Erro ao exportar relatório')
    } finally {
      setExporting(null)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0)
  }

  const formatPercent = (value: number) => {
    return `${(value || 0).toFixed(1)}%`
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            Central de Relatórios
          </h1>
          <p className="text-muted-foreground mt-2">
            Visualize métricas integradas de todos os módulos e exporte relatórios profissionais em PDF e Excel
          </p>
        </div>

        <Tabs defaultValue="export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
            <TabsTrigger value="export" className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Exportar Relatórios
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Por Módulo
            </TabsTrigger>
          </TabsList>

          {/* Aba de Exportação de Relatórios */}
          <TabsContent value="export" className="space-y-6">
            <ReportExportPanel />
          </TabsContent>

          {/* Aba de Dashboard Integrado */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Controles */}
            <div className="flex flex-wrap gap-4 items-center">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="border rounded-md p-2 bg-background"
              >
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="180">Últimos 6 meses</option>
                <option value="365">Último ano</option>
              </select>

              <Button variant="outline" onClick={loadData} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>

              <div className="flex-1" />

              <Button
                variant="outline"
                onClick={() => handleExport('patients')}
                disabled={exporting === 'patients'}
              >
                {exporting === 'patients' ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Users className="w-4 h-4 mr-2" />
                )}
                CSV Pacientes
              </Button>

              <Button
                variant="outline"
                onClick={() => handleExport('financial')}
                disabled={exporting === 'financial'}
              >
                {exporting === 'financial' ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <DollarSign className="w-4 h-4 mr-2" />
                )}
                CSV Financeiro
              </Button>
            </div>

            {loading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-muted-foreground" />
                  <p className="text-muted-foreground">Carregando dados integrados...</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* KPIs Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Receita */}
                  <Card className="border-l-4 border-l-emerald-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Receita Total</p>
                          <p className="text-2xl font-bold text-emerald-600">
                            {formatCurrency(integratedData?.financeiro?.totalReceitas || financialData?.totalRevenue)}
                          </p>
                          {integratedData?.financeiro && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                              Lucro: {formatCurrency(integratedData.financeiro.lucroLiquido)}
                            </p>
                          )}
                        </div>
                        <DollarSign className="w-10 h-10 text-emerald-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Despesas */}
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Despesas</p>
                          <p className="text-2xl font-bold text-red-600">
                            {formatCurrency(integratedData?.financeiro?.totalDespesas || 0)}
                          </p>
                          {integratedData?.financeiro && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <ArrowDownRight className="w-3 h-3 text-red-500" />
                              A pagar: {formatCurrency(integratedData.financeiro.contasAPagar)}
                            </p>
                          )}
                        </div>
                        <TrendingUp className="w-10 h-10 text-red-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pacientes */}
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Pacientes</p>
                          <p className="text-2xl font-bold">
                            {integratedData?.operacional?.totalPacientes || financialData?.totalPatients || 0}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Ticket médio: {formatCurrency(integratedData?.operacional?.ticketMedio || 0)}
                          </p>
                        </div>
                        <Users className="w-10 h-10 text-blue-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Consultas */}
                  <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Consultas</p>
                          <p className="text-2xl font-bold">
                            {integratedData?.operacional?.totalConsultas || financialData?.totalAppointments || 0}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Ocupação: {formatPercent(integratedData?.operacional?.taxaOcupacao || 0)}
                          </p>
                        </div>
                        <Calendar className="w-10 h-10 text-purple-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Segunda linha de KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Estoque */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Valor em Estoque</p>
                          <p className="text-xl font-bold">
                            {formatCurrency(integratedData?.estoque?.valorTotal || 0)}
                          </p>
                          {integratedData?.estoque?.itensAbaixoMinimo > 0 && (
                            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {integratedData.estoque.itensAbaixoMinimo} itens baixo estoque
                            </p>
                          )}
                        </div>
                        <Package className="w-8 h-8 text-amber-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Orçamentos */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Orçamentos Aprovados</p>
                          <p className="text-xl font-bold">
                            {integratedData?.faturamento?.orcamentosAprovados || 0}
                          </p>
                        </div>
                        <FileText className="w-8 h-8 text-indigo-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* NFe */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">NFe Emitidas</p>
                          <p className="text-xl font-bold">
                            {integratedData?.faturamento?.nfeEmitidas || 0}
                          </p>
                        </div>
                        <FileCheck className="w-8 h-8 text-cyan-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contratos */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Contratos Ativos</p>
                          <p className="text-xl font-bold">
                            {integratedData?.faturamento?.contratosAtivos || 0}
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Gráficos e Tabelas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Receita Mensal */}
                  {financialData?.monthlyRevenue?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5 text-emerald-600" />
                          Evolução da Receita
                        </CardTitle>
                        <CardDescription>Receita mensal nos últimos meses</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {financialData.monthlyRevenue.map((month: any) => {
                            const maxValue = Math.max(...financialData.monthlyRevenue.map((m: any) => m.value || 1))
                            const width = Math.min((month.value / maxValue) * 100, 100)
                            return (
                              <div key={month.month_key} className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground w-16">{month.month}</span>
                                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-8 relative overflow-hidden">
                                  <div
                                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full h-8 flex items-center justify-end pr-3 transition-all"
                                    style={{ width: `${width}%`, minWidth: month.value > 0 ? '80px' : '0' }}
                                  >
                                    {month.value > 0 && (
                                      <span className="text-xs text-white font-medium">
                                        {formatCurrency(month.value)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Top Pacientes */}
                  {financialData?.topPatients?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-600" />
                          Top 5 Pacientes
                        </CardTitle>
                        <CardDescription>Pacientes com maior valor gasto</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {financialData.topPatients.map((patient: any, index: number) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                  index === 0 ? 'bg-amber-500' :
                                  index === 1 ? 'bg-gray-400' :
                                  index === 2 ? 'bg-amber-700' : 'bg-slate-500'
                                }`}>
                                  {index + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{patient.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {patient.visits || 0} consultas
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-emerald-600">
                                  {formatCurrency(patient.value)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Evolução Mensal Integrada */}
                {integratedData?.evolucaoMensal?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        Evolução Mensal Consolidada
                      </CardTitle>
                      <CardDescription>Visão integrada de todos os indicadores por mês</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-3 font-medium">Mês</th>
                              <th className="text-right p-3 font-medium text-emerald-600">Receitas</th>
                              <th className="text-right p-3 font-medium text-red-600">Despesas</th>
                              <th className="text-right p-3 font-medium">Consultas</th>
                              <th className="text-right p-3 font-medium">Novos Pacientes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {integratedData.evolucaoMensal.map((m: any, i: number) => (
                              <tr key={i} className="border-b hover:bg-muted/50">
                                <td className="p-3 font-medium">{m.mes}</td>
                                <td className="p-3 text-right text-emerald-600 font-medium">
                                  {formatCurrency(m.receitas)}
                                </td>
                                <td className="p-3 text-right text-red-600">
                                  {formatCurrency(m.despesas)}
                                </td>
                                <td className="p-3 text-right">{m.consultas}</td>
                                <td className="p-3 text-right">
                                  <Badge variant="secondary">{m.novosPacientes}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* Aba de Métricas por Módulo */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Módulo Financeiro */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-emerald-600">
                    <DollarSign className="w-5 h-5" />
                    Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Receitas</span>
                      <span className="font-medium text-emerald-600">
                        {formatCurrency(integratedData?.financeiro?.totalReceitas || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Despesas</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(integratedData?.financeiro?.totalDespesas || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Lucro Líquido</span>
                      <span className="font-bold text-emerald-600">
                        {formatCurrency(integratedData?.financeiro?.lucroLiquido || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">A Receber</span>
                      <span>{formatCurrency(integratedData?.financeiro?.contasAReceber || 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">A Pagar</span>
                      <span>{formatCurrency(integratedData?.financeiro?.contasAPagar || 0)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Módulo Operacional */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Users className="w-5 h-5" />
                    Operacional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Pacientes</span>
                      <span className="font-medium">
                        {integratedData?.operacional?.totalPacientes || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Consultas</span>
                      <span className="font-medium">
                        {integratedData?.operacional?.totalConsultas || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa Ocupação</span>
                      <span className="font-medium">
                        {formatPercent(integratedData?.operacional?.taxaOcupacao || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Ticket Médio</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(integratedData?.operacional?.ticketMedio || 0)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Módulo Estoque */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-amber-600">
                    <Package className="w-5 h-5" />
                    Estoque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor Total</span>
                      <span className="font-bold text-amber-600">
                        {formatCurrency(integratedData?.estoque?.valorTotal || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Abaixo do Mínimo</span>
                      <span className={`font-medium ${(integratedData?.estoque?.itensAbaixoMinimo || 0) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {integratedData?.estoque?.itensAbaixoMinimo || 0} itens
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Módulo Faturamento */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-indigo-600">
                    <FileText className="w-5 h-5" />
                    Faturamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orçamentos Aprovados</span>
                      <span className="font-medium">
                        {integratedData?.faturamento?.orcamentosAprovados || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NFe Emitidas</span>
                      <span className="font-medium">
                        {integratedData?.faturamento?.nfeEmitidas || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contratos Ativos</span>
                      <span className="font-medium">
                        {integratedData?.faturamento?.contratosAtivos || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Módulo Clínico */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Stethoscope className="w-5 h-5" />
                    Clínico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Pill className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Prescrições</span>
                      <span className="ml-auto font-medium">-</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileCheck className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Guias TISS</span>
                      <span className="ml-auto font-medium">-</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Microscope className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Exames</span>
                      <span className="ml-auto font-medium">-</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center pt-2 border-t">
                      Use a aba "Exportar Relatórios" para dados detalhados
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Ações Rápidas */}
              <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Exportação Rápida
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleExport('patients')}
                      disabled={exporting === 'patients'}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      CSV Pacientes
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleExport('financial')}
                      disabled={exporting === 'financial'}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      CSV Financeiro
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => handleExport('appointments')}
                      disabled={exporting === 'appointments'}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      CSV Atendimentos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
