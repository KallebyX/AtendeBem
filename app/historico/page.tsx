"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Stethoscope, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { ExportButtons } from "@/components/export-buttons"
import { NavigationHeader } from "@/components/navigation-header"
import { useEffect, useState } from "react"
import { getAppointmentHistory } from "@/app/actions/appointments"

export default function HistoricoPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAppointments() {
      setLoading(true)
      const result = await getAppointmentHistory()
      if (result.success && result.appointments) {
        setAppointments(result.appointments)
      }
      setLoading(false)
    }
    loadAppointments()
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold">Histórico de atendimentos</h1>
            <p className="text-lg text-muted-foreground">Todos os seus atendimentos registrados</p>
          </div>

          {loading ? (
            <Card className="rounded-3xl border-border">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">Carregando histórico...</p>
              </CardContent>
            </Card>
          ) : appointments.length === 0 ? (
            <Card className="rounded-3xl border-border">
              <CardContent className="p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-muted mx-auto flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Nenhum atendimento ainda</h3>
                  <p className="text-muted-foreground">Registre seu primeiro atendimento para começar</p>
                </div>
                <Button asChild className="rounded-3xl">
                  <Link href="/atendimento/novo">Novo atendimento</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="rounded-3xl border-border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Stethoscope className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {new Date(appointment.appointment_date).toLocaleString("pt-BR")}
                          </p>
                          <h3 className="font-semibold text-lg">{appointment.patient_name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <FileText className="w-3 h-3" />
                            {appointment.appointment_type} • {appointment.specialty}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {appointment.procedures_count} procedimento(s) realizado(s)
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <ExportButtons appointmentId={appointment.id} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
