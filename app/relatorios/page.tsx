'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { NavigationHeader } from '@/components/navigation-header'
import {
  getAnalyticsDashboard,
  getSavedReports
} from '@/app/actions/analytics'
import {
  getFinancialReport,
  exportPatientsReport,
  exportFinancialReport,
  exportAppointmentsReport
} from '@/app/actions/reports'
import {
  BarChart3, TrendingUp, Users, DollarSign, Calendar, Download,
  FileText, RefreshCw, PieChart, Activity
} from 'lucide-react'
import { toast } from 'sonner'

export default function RelatoriosPage() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [financialData, setFinancialData] = useState<any>(null)
  const [savedReports, setSavedReports] = useState<any[]>([])
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [period])

  async function loadData() {
    setLoading(true)
    const start = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000).toISOString()
    const end = new Date().toISOString()

    const [dashResult, reportsResult, financialResult] = await Promise.all([
      getAnalyticsDashboard({ start, end }),
      getSavedReports(),
      getFinancialReport()
    ])

    if (dashResult.data) setDashboardData(dashResult.data)
    if (reportsResult.data) setSavedReports(reportsResult.data)
    if (financialResult.data) setFinancialData(financialResult.data)
    setLoading(false)
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
        // Create and download the CSV file
        const blob = new Blob([result.data], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = result.filename || `relatorio-${type}-${Date.now()}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        toast.success('Relatorio exportado com sucesso!')
      } else {
        toast.error(result.error || 'Erro ao exportar relatorio')
      }
    } catch (error) {
      toast.error('Erro ao exportar relatorio')
    } finally {
      setExporting(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            Analytics e Relatorios
          </h1>
          <p className="text-muted-foreground mt-2">
            Visualize dados e exporte relatorios do seu consultorio
          </p>
        </div>

        {/* Period Selector & Export Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border rounded-md p-2"
          >
            <option value="7">Ultimos 7 dias</option>
            <option value="30">Ultimos 30 dias</option>
            <option value="90">Ultimos 90 dias</option>
            <option value="365">Ultimo ano</option>
          </select>

          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-2" />
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
            Exportar Pacientes
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
            Exportar Financeiro
          </Button>

          <Button
            variant="outline"
            onClick={() => handleExport('appointments')}
            disabled={exporting === 'appointments'}
          >
            {exporting === 'appointments' ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Calendar className="w-4 h-4 mr-2" />
            )}
            Exportar Atendimentos
          </Button>
        </div>

        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <RefreshCw className="w-8 h-8 mx-auto mb-4 animate-spin text-muted-foreground" />
              <p className="text-muted-foreground">Carregando dados...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* KPIs */}
            {financialData && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Pacientes</p>
                        <p className="text-3xl font-bold">{financialData.totalPatients}</p>
                      </div>
                      <Users className="w-10 h-10 text-blue-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Atendimentos</p>
                        <p className="text-3xl font-bold">{financialData.totalAppointments}</p>
                      </div>
                      <Calendar className="w-10 h-10 text-green-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Receita Total</p>
                        <p className="text-3xl font-bold">
                          R$ {financialData.totalRevenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <DollarSign className="w-10 h-10 text-emerald-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Receita Mes Atual</p>
                        <p className="text-3xl font-bold">
                          R$ {financialData.currentMonthRevenue?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <TrendingUp className="w-10 h-10 text-purple-600 opacity-50" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Monthly Revenue Chart */}
              {financialData?.monthlyRevenue?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      Receita Mensal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {financialData.monthlyRevenue.map((month: any) => (
                        <div key={month.month_key} className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground w-16">{month.month}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                            <div
                              className="bg-emerald-500 rounded-full h-6 flex items-center justify-end pr-2"
                              style={{
                                width: `${Math.min((month.value / Math.max(...financialData.monthlyRevenue.map((m: any) => m.value || 1))) * 100, 100)}%`,
                                minWidth: month.value > 0 ? '60px' : '0'
                              }}
                            >
                              {month.value > 0 && (
                                <span className="text-xs text-white font-medium">
                                  R$ {month.value.toFixed(0)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Top Patients */}
              {financialData?.topPatients?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Top 5 Pacientes por Valor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {financialData.topPatients.map((patient: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <Badge className="w-8 h-8 flex items-center justify-center">
                              {index + 1}
                            </Badge>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {patient.visits || 0} visitas
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-600">
                              R$ {patient.value?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Analytics Data */}
            {dashboardData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Event Types */}
                {dashboardData.eventsByType?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-purple-600" />
                        Eventos por Tipo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {dashboardData.eventsByType.map((event: any) => (
                          <div key={event.event_type} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="capitalize">{event.event_type.replace(/_/g, ' ')}</span>
                            </div>
                            <Badge variant="secondary">{event.count}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Timeline */}
                {dashboardData.eventsByDay?.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-orange-600" />
                        Evolucao no Tempo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {dashboardData.eventsByDay.map((day: any) => (
                          <div key={day.date} className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground w-24">
                              {new Date(day.date).toLocaleDateString('pt-BR')}
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                              <div
                                className="bg-orange-500 rounded-full h-6 flex items-center justify-end pr-2"
                                style={{ width: `${Math.min((day.count / 50) * 100, 100)}%`, minWidth: '30px' }}
                              >
                                <span className="text-xs text-white font-medium">{day.count}</span>
                              </div>
                            </div>
                            {day.revenue > 0 && (
                              <Badge variant="secondary" className="w-24 justify-center">
                                R$ {parseFloat(day.revenue).toFixed(2)}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Saved Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Relatorios Salvos ({savedReports.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedReports.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    Nenhum relatorio salvo ainda
                  </p>
                ) : (
                  <div className="space-y-3">
                    {savedReports.map(report => (
                      <div key={report.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">{report.report_type}</Badge>
                            {report.is_scheduled && (
                              <Badge variant="outline">Agendado ({report.schedule_frequency})</Badge>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Ver Relatorio
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
