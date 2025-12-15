import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarioPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendário de Agendamentos</h1>
            <p className="text-muted-foreground mt-1">Visualize e gerencie suas consultas</p>
          </div>
          <Button className="rounded-2xl">Nova Consulta</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="lg:col-span-2 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Janeiro 2025</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl bg-transparent">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2
                  const isToday = day === 15
                  const hasAppointment = [10, 15, 18, 22].includes(day)

                  return (
                    <button
                      key={i}
                      className={`
                        aspect-square p-2 rounded-xl text-sm transition-colors
                        ${day < 1 || day > 31 ? "text-muted-foreground/50" : ""}
                        ${isToday ? "bg-primary text-primary-foreground font-bold" : "hover:bg-accent"}
                        ${hasAppointment && !isToday ? "bg-accent border-2 border-primary" : ""}
                      `}
                      disabled={day < 1 || day > 31}
                    >
                      {day > 0 && day <= 31 ? day : ""}
                      {hasAppointment && !isToday && (
                        <div className="flex justify-center mt-1">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Próximas Consultas */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { time: "09:00", patient: "Maria Silva", type: "Consulta" },
                { time: "10:30", patient: "João Santos", type: "Retorno" },
                { time: "14:00", patient: "Ana Costa", type: "Consulta" },
                { time: "15:30", patient: "Pedro Oliveira", type: "Exame" },
              ].map((appointment, i) => (
                <div key={i} className="p-3 rounded-2xl border border-border hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{appointment.time}</p>
                      <p className="text-sm text-muted-foreground">{appointment.patient}</p>
                      <p className="text-xs text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
