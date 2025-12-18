'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  getAnalyticsDashboard,
  createSavedReport,
  getSavedReports
} from '@/app/actions/analytics'
import { BarChart3, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'

export default function RelatoriosPage() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [savedReports, setSavedReports] = useState<any[]>([])
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [period])

  async function loadData() {
    setLoading(true)
    const start = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000).toISOString()
    const end = new Date().toISOString()

    const [dashResult, reportsResult] = await Promise.all([
      getAnalyticsDashboard({ start, end }),
      getSavedReports()
    ])

    if (dashResult.data) setDashboardData(dashResult.data)
    if (reportsResult.data) setSavedReports(reportsResult.data)
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BarChart3 className="w-8 h-8" />
          Analytics e Relatórios
        </h1>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <Select value={period} onValueChange={setPeriod}>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
          <option value="365">Último ano</option>
        </Select>
      </div>

      {loading ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Carregando dados...</p>
        </Card>
      ) : dashboardData ? (
        <>
          {/* Event Types */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Eventos por Tipo</h2>
            <div className="space-y-3">
              {dashboardData.eventsByType?.map((event: any) => (
                <div key={event.event_type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{event.event_type.replace(/_/g, ' ')}</span>
                  </div>
                  <Badge variant="secondary">{event.count}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Evolução no Tempo</h2>
            <div className="space-y-2">
              {dashboardData.eventsByDay?.map((day: any) => (
                <div key={day.date} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-24">
                    {new Date(day.date).toLocaleDateString('pt-BR')}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                    <div
                      className="bg-primary rounded-full h-6 flex items-center justify-end pr-2"
                      style={{ width: `${Math.min((day.count / 50) * 100, 100)}%` }}
                    >
                      <span className="text-xs text-white font-medium">{day.count}</span>
                    </div>
                  </div>
                  {day.revenue > 0 && (
                    <Badge variant="secondary" className="w-24 justify-center">
                      R$ {day.revenue.toFixed(2)}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Top Patients */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Top 10 Pacientes
            </h2>
            <div className="space-y-3">
              {dashboardData.topPatients?.map((patient: any, index: number) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border rounded">
                  <div className="flex items-center gap-3">
                    <Badge className="w-8 h-8 flex items-center justify-center">
                      {index + 1}
                    </Badge>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.visit_count} visitas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      R$ {patient.total_revenue?.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-xs text-muted-foreground">Receita Total</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : null}

      {/* Saved Reports */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Relatórios Salvos ({savedReports.length})
        </h2>
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
              <Button size="sm" variant="outline">Ver Relatório</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
