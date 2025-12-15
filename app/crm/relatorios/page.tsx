import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, TrendingUp, Users } from "lucide-react"

export default function RelatoriosPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios e Analytics</h1>
          <p className="text-muted-foreground mt-1">Análises detalhadas do seu consultório</p>
        </div>

        {/* Gráfico de Receita Mensal */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Receita Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { month: "Jul", value: 8500 },
                { month: "Ago", value: 12300 },
                { month: "Set", value: 9800 },
                { month: "Out", value: 15200 },
                { month: "Nov", value: 11900 },
                { month: "Dez", value: 18400 },
              ].map((data, i) => {
                const maxValue = 20000
                const height = (data.value / maxValue) * 100

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full bg-primary/20 rounded-t-xl" style={{ height: `${height}%` }}>
                      <div className="absolute inset-0 bg-primary rounded-t-xl" />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold whitespace-nowrap">
                        R$ {(data.value / 1000).toFixed(1)}k
                      </div>
                    </div>
                    <span className="text-sm font-medium">{data.month}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Exportar Relatórios */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="rounded-3xl hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Relatório Financeiro</h3>
                  <p className="text-sm text-muted-foreground">Receitas e despesas</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-xl">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Relatório de Pacientes</h3>
                  <p className="text-sm text-muted-foreground">Lista completa</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-xl">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Relatório de Atendimentos</h3>
                  <p className="text-sm text-muted-foreground">Histórico mensal</p>
                </div>
                <Button size="icon" variant="ghost" className="rounded-xl">
                  <Download className="w-4 h-4" />
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
            <div className="space-y-3">
              {[
                { name: "Maria Silva", value: 4500, visits: 12 },
                { name: "João Santos", value: 3800, visits: 9 },
                { name: "Ana Costa", value: 3200, visits: 8 },
                { name: "Pedro Oliveira", value: 2900, visits: 7 },
                { name: "Julia Lima", value: 2600, visits: 6 },
              ].map((patient, i) => (
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
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
