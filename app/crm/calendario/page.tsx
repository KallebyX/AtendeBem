"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, ChevronLeft, ChevronRight, Plus, X, Check, XCircle } from "lucide-react"
import { getSchedules, createSchedule, getPatientsList } from "@/app/actions/crm"

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [schedules, setSchedules] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    patientId: "",
    time: "09:00",
    type: "consulta",
    notes: "",
    value: "",
    duration: "60",
    paymentMethod: "",
  })

  useEffect(() => {
    loadData()
  }, [currentDate])

  async function loadData() {
    setLoading(true)
    try {
      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

      const [schedulesResult, patientsResult] = await Promise.all([
        getSchedules(firstDay.toISOString().split("T")[0], lastDay.toISOString().split("T")[0]),
        getPatientsList(),
      ])

      if (schedulesResult.success && schedulesResult.schedules) {
        setSchedules(schedulesResult.schedules)
      }
      if (patientsResult.success && patientsResult.patients) {
        setPatients(patientsResult.patients)
      }
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
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
    return schedules.filter((s) => {
      const scheduleDate = new Date(s.appointment_date).toISOString().split("T")[0]
      return scheduleDate === dateStr
    })
  }

  const handleDayClick = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(date)
    setShowModal(true)
    setError("")
  }

  const handleCreateSchedule = async () => {
    if (!selectedDate || !formData.patientId || !formData.time) {
      setError("Preencha todos os campos obrigatórios")
      return
    }

    setSaving(true)
    setError("")

    try {
      // Combine date and time into a single timestamp
      const appointmentDateTime = new Date(selectedDate)
      const [hours, minutes] = formData.time.split(":")
      appointmentDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes), 0, 0)

      const result = await createSchedule({
        patient_id: formData.patientId,
        appointment_date: appointmentDateTime.toISOString(),
        duration_minutes: Number.parseInt(formData.duration) || 60,
        appointment_type: formData.type,
        notes: formData.notes || null,
        value: formData.value ? Number.parseFloat(formData.value) : null,
        payment_method: formData.paymentMethod || null,
      })

      if (result.success) {
        await loadData()
        setShowModal(false)
        setFormData({
          patientId: "",
          time: "09:00",
          type: "consulta",
          notes: "",
          value: "",
          duration: "60",
          paymentMethod: "",
        })
      } else {
        setError(result.error || "Erro ao criar agendamento")
      }
    } catch (error: any) {
      setError(error.message || "Erro ao criar agendamento")
    } finally {
      setSaving(false)
    }
  }

  const today = new Date()
  const todayStr = today.toISOString().split("T")[0]
  const todaysSchedules = schedules
    .filter((s) => {
      const scheduleDate = new Date(s.appointment_date).toISOString().split("T")[0]
      return scheduleDate === todayStr
    })
    .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Calendário de Agendamentos</h1>
            <p className="text-muted-foreground mt-1">Visualize e gerencie suas consultas</p>
          </div>
          <Button
            className="rounded-2xl"
            onClick={() => {
              setSelectedDate(new Date())
              setShowModal(true)
              setError("")
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendário */}
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
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }, (_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = i + 1
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
                            <div key={idx} className="w-1.5 h-1.5 rounded-full bg-primary" />
                          ))}
                          {daySchedules.length > 3 && (
                            <span className="text-[10px] text-primary font-bold">+{daySchedules.length - 3}</span>
                          )}
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
                todaysSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-3 rounded-2xl border border-border hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          schedule.status === "completed"
                            ? "bg-green-500/10"
                            : schedule.status === "cancelled"
                              ? "bg-red-500/10"
                              : "bg-primary/10"
                        }`}
                      >
                        {schedule.status === "completed" ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : schedule.status === "cancelled" ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">
                          {new Date(schedule.appointment_date).toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">{schedule.patient_name || "Paciente"}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent capitalize">
                            {schedule.appointment_type || "Consulta"}
                          </span>
                          {schedule.value && (
                            <span className="text-xs text-muted-foreground">
                              R$ {Number(schedule.value).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Lista de agendamentos do dia selecionado */}
        {selectedDate && !showModal && (
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>
                Agendamentos -{" "}
                {selectedDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getSchedulesForDay(selectedDate.getDate()).length === 0 ? (
                <p className="text-muted-foreground text-center py-8">Nenhum agendamento para este dia</p>
              ) : (
                <div className="space-y-3">
                  {getSchedulesForDay(selectedDate.getDate()).map((schedule) => (
                    <div
                      key={schedule.id}
                      className="p-4 rounded-2xl border border-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">
                            {new Date(schedule.appointment_date).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">{schedule.duration_minutes || 60} min</p>
                        </div>
                        <div>
                          <p className="font-semibold">{schedule.patient_name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{schedule.appointment_type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {schedule.value && (
                          <span className="text-sm font-medium">R$ {Number(schedule.value).toFixed(2)}</span>
                        )}
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            schedule.status === "completed"
                              ? "bg-green-500/10 text-green-500"
                              : schedule.status === "cancelled"
                                ? "bg-red-500/10 text-red-500"
                                : schedule.status === "confirmed"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {schedule.status === "scheduled"
                            ? "Agendado"
                            : schedule.status === "confirmed"
                              ? "Confirmado"
                              : schedule.status === "completed"
                                ? "Concluído"
                                : schedule.status === "cancelled"
                                  ? "Cancelado"
                                  : schedule.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Modal de Agendamento */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Novo Agendamento</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)} className="rounded-xl">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-sm">{error}</div>}

              <div className="space-y-2">
                <Label>Data Selecionada</Label>
                <Input value={selectedDate?.toLocaleDateString("pt-BR") || ""} disabled className="rounded-xl" />
              </div>

              <div className="space-y-2">
                <Label>Paciente *</Label>
                <select
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="">Selecione um paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.full_name} - CPF: {patient.cpf}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Horário *</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duração (min)</Label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="30">30 minutos</option>
                    <option value="45">45 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="90">1h30</option>
                    <option value="120">2 horas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Consulta</Label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                >
                  <option value="consulta">Consulta</option>
                  <option value="retorno">Retorno</option>
                  <option value="exame">Exame</option>
                  <option value="procedimento">Procedimento</option>
                  <option value="teleconsulta">Teleconsulta</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="0,00"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Forma de Pagamento</Label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                  >
                    <option value="">Selecione</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="pix">PIX</option>
                    <option value="cartao_credito">Cartão de Crédito</option>
                    <option value="cartao_debito">Cartão de Débito</option>
                    <option value="plano_saude">Plano de Saúde</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Observações</Label>
                <Input
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações opcionais"
                  className="rounded-xl"
                />
              </div>

              <Button onClick={handleCreateSchedule} className="w-full rounded-2xl" disabled={saving}>
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {saving ? "Agendando..." : "Agendar Consulta"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
