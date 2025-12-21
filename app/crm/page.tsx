"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, TrendingUp, Calendar, DollarSign, Search, Plus, AlertCircle, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"
import { getPatientsList, getFinancialDashboard } from "@/app/actions/crm"
import Link from "next/link"
import { toast } from "sonner"

export default function CRMPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    setError(null)

    try {
      const [patientsResult, dashboardResult] = await Promise.all([
        getPatientsList(),
        getFinancialDashboard()
      ])

      if (patientsResult.success) {
        setPatients(patientsResult.patients || [])
      } else {
        console.error("Erro ao carregar pacientes:", patientsResult.error)
        setError(patientsResult.error || "Erro ao carregar pacientes")
        toast.error(patientsResult.error || "Erro ao carregar pacientes")
      }

      if (dashboardResult.success) {
        setMetrics(dashboardResult.metrics)
      }
    } catch (err: any) {
      console.error("Erro ao carregar dados:", err)
      setError("Erro de conexão. Tente novamente.")
      toast.error("Erro de conexão. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(
    (p) => p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.cpf?.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">CRM - Gestão de Pacientes</h1>
            <p className="text-muted-foreground mt-1">Controle completo dos seus pacientes e finanças</p>
          </div>
          <div className="flex gap-3">
            <Link href="/crm/calendario">
              <Button variant="outline" className="rounded-2xl bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                Calendário
              </Button>
            </Link>
            <Link href="/crm/relatorios">
              <Button variant="outline" className="rounded-2xl bg-transparent">
                <TrendingUp className="w-4 h-4 mr-2" />
                Relatórios
              </Button>
            </Link>
            <Link href="/crm/novo-paciente">
              <Button className="rounded-2xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Paciente
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Financeiro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-3xl border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : `R$ ${metrics?.totalRevenue?.toFixed(2) || "0.00"}`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Todos os períodos</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : `R$ ${metrics?.monthRevenue?.toFixed(2) || "0.00"}`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Mês atual</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Consultas Agendadas</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : metrics?.scheduledCount || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Próximos agendamentos</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : metrics?.activePatients || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">Total cadastrados</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Pacientes */}
        <Card className="rounded-3xl border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Pacientes</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou CPF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Carregando pacientes...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={loadData} variant="outline" className="rounded-xl">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tentar novamente
                </Button>
              </div>
            ) : filteredPatients.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {searchTerm ? "Nenhum paciente encontrado" : "Nenhum paciente cadastrado ainda"}
              </p>
            ) : (
              <div className="space-y-2">
                {filteredPatients.map((patient) => (
                  <Link key={patient.id} href={`/crm/${patient.id}`}>
                    <div className="p-4 rounded-2xl border border-border hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{patient.full_name}</h3>
                              <p className="text-sm text-muted-foreground">CPF: {patient.cpf}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-semibold">{patient.total_appointments || 0}</p>
                            <p className="text-muted-foreground">Consultas</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold">{patient.total_prescriptions || 0}</p>
                            <p className="text-muted-foreground">Receitas</p>
                          </div>
                          {patient.last_appointment && (
                            <div className="text-center">
                              <p className="font-semibold">
                                {new Date(patient.last_appointment).toLocaleDateString("pt-BR")}
                              </p>
                              <p className="text-muted-foreground">Última consulta</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
