"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, TrendingUp, Users, Loader2, DollarSign, Calendar } from "lucide-react"
import {
  getFinancialReport,
  exportPatientsReport,
  exportFinancialReport,
  exportAppointmentsReport,
} from "@/app/actions/reports"
import { useToast } from "@/hooks/use-toast"

export default function RelatoriosPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const result = await getFinancialReport()
    if (result.success) {
      setData(result.data)
    }
    setLoading(false)
  }

  const handleExport = async (type: string) => {
    setExporting(type)
    let result

    switch (type) {
      case "patients":
        result = await exportPatientsReport()
        break
      case "financial":
        result = await exportFinancialReport()
        break
      case "appointments":
        result = await exportAppointmentsReport()
        break
      default:
        return
    }

    if (result.success && result.data) {
      // Download CSV
      const blob = new Blob([result.data], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = result.filename || "relatorio.csv"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: "Relatório exportado",
        description: "O arquivo foi baixado com sucesso",
      })
    } else {
      toast({
        title: "Erro",
        description: result.error || "Erro ao exportar relatório",
        variant: "destructive",
      })
    }

    setExporting(null)
  }

  // Meses em português
  const monthNames: Record<string, string> = {
    Jan: "Jan",
    Feb: "Fev",
    Mar: "Mar",
    Apr: "Abr",
    May: "Mai",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Ago",
    Sep: "Set",
    Oct: "Out",
    Nov: "Nov",
    Dec: "Dez",
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader showBack backHref="/crm" />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios e Analytics</h1>
          <p className="text-muted-foreground mt-1">Análises detalhadas do seu consultório</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Cards de Resumo */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="rounded-3xl">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Receita Total</p>
                      <p className="text-2xl font-bold">R$ {(data?.totalRevenue || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Este Mês</p>
                      <p className="text-2xl font-bold">R$ {(data?.currentMonthRevenue || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Atendimentos</p>
                      <p className="text-2xl font-bold">{data?.totalAppointments || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pacientes</p>
                      <p className="text-2xl font-bold">{data?.totalPatients || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de Receita Mensal */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Receita Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                {data?.monthlyRevenue?.length > 0 ? (
                  <div className="h-64 flex items-end justify-around gap-2">
                    {data.monthlyRevenue.map((item: any, i: number) => {
                      const maxValue = Math.max(...data.monthlyRevenue.map((d: any) => d.value), 1)
                      const height = (item.value / maxValue) * 100

                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="relative w-full bg-primary/20 rounded-t-xl min-h-[20px]"
                            style={{ height: `${Math.max(height, 5)}%` }}
                          >
                            <div className="absolute inset-0 bg-primary rounded-t-xl" />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
                              R$ {(item.value / 1000).toFixed(1)}k
                            </div>
                          </div>
                          <span className="text-sm font-medium">{monthNames[item.month] || item.month}</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Nenhum dado financeiro disponível
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Exportar Relatórios */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="rounded-3xl hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Relatório Financeiro</h3>
                      <p className="text-sm text-muted-foreground">Receitas e pagamentos</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-xl"
                      onClick={() => handleExport("financial")}
                      disabled={exporting === "financial"}
                    >
                      {exporting === "financial" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Relatório de Pacientes</h3>
                      <p className="text-sm text-muted-foreground">Lista completa</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-xl"
                      onClick={() => handleExport("patients")}
                      disabled={exporting === "patients"}
                    >
                      {exporting === "patients" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">Relatório de Atendimentos</h3>
                      <p className="text-sm text-muted-foreground">Histórico mensal</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-xl"
                      onClick={() => handleExport("appointments")}
                      disabled={exporting === "appointments"}
                    >
                      {exporting === "appointments" ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Pacientes */}
            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Top 5 Pacientes por Valor</CardTitle>
              </CardHeader>
              <CardContent>
                {data?.topPatients?.length > 0 ? (
                  <div className="space-y-3">
                    {data.topPatients.map((patient: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-accent">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-muted-foreground">#{i + 1}</span>
                          <div>
                            <p className="font-semibold">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.visits} consultas</p>
                          </div>
                        </div>
                        <p className="font-bold text-primary">R$ {patient.value.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">Nenhum paciente encontrado</div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
