"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import { getSchedules, createSchedule, getPatientsList } from "@/app/actions/crm"

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedules, setSchedules] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    patientId: "",
    time: "",
    type: "consulta",
    notes: "",
    value: "",
  })

  useEffect(() => {
    async function loadData() {
      try {
        const [schedulesResult, patientsResult] = await Promise.all([getSchedules(), getPatientsList()])

        if (schedulesResult.schedules) {
          setSchedules(schedulesResult.schedules)
        }
        if (patientsResult.patients) {
          setPatients(patientsResult.patients)
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Marco",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getSchedulesForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return schedules.filter((s) => s.scheduled_date?.startsWith(dateStr))
  }

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(date)
    setShowModal(true)
  }

  const handleCreateSchedule = async () => {
    if (!selectedDate || !formData.patientId || !formData.time) return

    try {
      const result = await createSchedule({
        patientId: formData.patientId,
        scheduledDate: selectedDate.toISOString().split("T")[0],
        scheduledTime: formData.time,
        appointmentType: formData.type,
        notes: formData.notes,
        estimatedValue: formData.value ? Number.parseFloat(formData.value) : undefined,
      })

      if (result.success) {
        // Reload schedules
        const schedulesResult = await getSchedules()
        if (schedulesResult.schedules) {
          setSchedules(schedulesResult.schedules)
        }
        setShowModal(false)
        setFormData({ patientId: "", time: "", type: "consulta", notes: "", value: "" })
      }
    } catch (error) {
      console.error("Error creating schedule:", error)
    }
  }

  const todaysSchedules = schedules
    .filter((s) => {
      const today = new Date().toISOString().split("T")[0]
      return s.scheduled_date?.startsWith(today)
    })
    .sort((a, b) => (a.scheduled_time || "").localeCompare(b.scheduled_time || ""))

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Calendario de Agendamentos</h1>
            <p className="text-muted-foreground mt-1">Visualize e gerencie suas consultas</p>
          </div>
          <Button
            className="rounded-2xl"
            onClick={() => {
              setSelectedDate(new Date())
              setShowModal(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendario */}
          <Card className="lg:col-span-2 rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-xl bg-transparent" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-xl bg-transparent" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before the 1st */}
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {/* Days of the month */}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
                  const today = new Date()
                  const isToday =
                    day === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear()
                  const daySchedules = getSchedulesForDay(day)
                  const hasAppointment = daySchedules.length > 0

                  return (
                    <button
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`
                        aspect-square p-2 rounded-xl text-sm transition-colors relative
                        ${isToday ? "bg-primary text-primary-foreground font-bold" : "hover:bg-accent"}
                        ${hasAppointment && !isToday ? "bg-accent border-2 border-primary" : ""}
                      `}
                    >
                      {day}
                      {hasAppointment && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                          {daySchedules.slice(0, 3).map((_, idx) => (
                            <div key={idx} className="w-1 h-1 rounded-full bg-primary" />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Proximas Consultas */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Consultas de Hoje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
                </div>
              ) : todaysSchedules.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhuma consulta agendada para hoje</p>
              ) : (
                todaysSchedules.map((schedule, i) => (
                  <div key={i} className="p-3 rounded-2xl border border-border hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{schedule.scheduled_time?.slice(0, 5) || "00:00"}</p>
                        <p className="text-sm text-muted-foreground">{schedule.patient_name || "Paciente"}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {schedule.appointment_type || "Consulta"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal de Agendamento */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Novo Agendamento</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)} className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Data Selecionada</Label>
                <Input value={selectedDate?.toLocaleDateString("pt-BR") || ""} disabled className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label>Paciente</Label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="">Selecione um paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Horario</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Tipo</Label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="consulta">Consulta</option>
                  <option value="retorno">Retorno</option>
                  <option value="exame">Exame</option>
                  <option value="procedimento">Procedimento</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Valor Estimado (R$)</Label>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="0,00"
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label>Observacoes</Label>
                <Input
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observacoes opcionais"
                  className="rounded-xl"
                />
              </div>

              <Button onClick={handleCreateSchedule} className="w-full rounded-2xl">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
