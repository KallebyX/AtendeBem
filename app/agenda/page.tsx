"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { createCalendarEvent, getCalendarEvents, getAgendaDay } from "@/app/actions/calendar"
import { CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { toast } from "sonner"

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<any[]>([])
  const [dayEvents, setDayEvents] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const [newEvent, setNewEvent] = useState({
    title: "",
    start_time: "",
    end_time: "",
    event_type: "appointment",
    location: "",
    description: "",
  })

  useEffect(() => {
    loadMonthEvents()
  }, [currentDate])

  useEffect(() => {
    if (selectedDate) {
      loadDayEvents(selectedDate)
    }
  }, [selectedDate])

  async function loadMonthEvents() {
    setLoading(true)
    try {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59).toISOString()

      const result = await getCalendarEvents({ start_date: start, end_date: end })
      if (result.success && result.data) {
        setEvents(result.data)
      } else {
        toast.error(result.error || "Erro ao carregar eventos")
      }
    } catch (error) {
      toast.error("Erro ao carregar eventos")
    } finally {
      setLoading(false)
    }
  }

  async function loadDayEvents(date: string) {
    try {
      const result = await getAgendaDay(date)
      if (result.success && result.data) {
        setDayEvents(result.data)
      }
    } catch (error) {
      toast.error("Erro ao carregar eventos do dia")
    }
  }

  async function handleCreateEvent() {
    if (!newEvent.title || !newEvent.start_time || !newEvent.end_time) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    try {
      const result = await createCalendarEvent(newEvent)
      if (result.success) {
        toast.success("Evento criado com sucesso")
        setIsDialogOpen(false)
        setNewEvent({
          title: "",
          start_time: "",
          end_time: "",
          event_type: "appointment",
          location: "",
          description: "",
        })
        loadMonthEvents()
        if (selectedDate) loadDayEvents(selectedDate)
      } else {
        if (result.conflicts) {
          toast.error(`Conflito de agenda! ${result.conflicts.length} evento(s) em conflito`)
        } else {
          toast.error(result.error || "Erro ao criar evento")
        }
      }
    } catch (error) {
      toast.error("Erro ao criar evento")
    }
  }

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  function getEventsForDay(date: Date | null) {
    if (!date) return []
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((e) => e.start_time?.split("T")[0] === dateStr)
  }

  function getStatusColor(status: string) {
    const colors: Record<string, string> = {
      scheduled: "bg-blue-500",
      confirmed: "bg-green-500",
      in_progress: "bg-yellow-500",
      completed: "bg-gray-500",
      cancelled: "bg-red-500",
      no_show: "bg-orange-500",
    }
    return colors[status] || "bg-gray-500"
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <CalendarIcon className="h-8 w-8 text-blue-600" />
              Agenda Médica
            </h1>
            <p className="text-muted-foreground mt-2">Gerencie seus compromissos e consultas</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Evento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Evento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Título *</Label>
                  <Input
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Ex: Consulta com paciente"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Início *</Label>
                    <Input
                      type="datetime-local"
                      value={newEvent.start_time}
                      onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Fim *</Label>
                    <Input
                      type="datetime-local"
                      value={newEvent.end_time}
                      onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Tipo de Evento</Label>
                  <select
                    className="w-full border rounded-lg p-2"
                    value={newEvent.event_type}
                    onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value })}
                  >
                    <option value="appointment">Consulta</option>
                    <option value="procedure">Procedimento</option>
                    <option value="surgery">Cirurgia</option>
                    <option value="exam">Exame</option>
                    <option value="meeting">Reunião</option>
                    <option value="break">Pausa</option>
                  </select>
                </div>
                <div>
                  <Label>Local</Label>
                  <Input
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    placeholder="Ex: Consultório 1"
                  />
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={3}
                    placeholder="Informações adicionais sobre o evento..."
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleCreateEvent} className="flex-1">
                  Criar Evento
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-xl">
                    {currentDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {WEEKDAYS.map((day) => (
                        <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {days.map((day, index) => {
                        const dayEvents = day ? getEventsForDay(day) : []
                        const isToday = day && day.toDateString() === new Date().toDateString()
                        const isSelected = day && selectedDate === day.toISOString().split("T")[0]

                        return (
                          <div
                            key={index}
                            onClick={() => day && setSelectedDate(day.toISOString().split("T")[0])}
                            className={`
                              min-h-24 p-2 border rounded-lg cursor-pointer hover:bg-accent transition-colors
                              ${isToday ? "border-primary border-2 bg-primary/5" : ""}
                              ${isSelected ? "bg-accent" : ""}
                              ${!day ? "bg-muted/30 cursor-default" : ""}
                            `}
                          >
                            {day && (
                              <>
                                <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : ""}`}>
                                  {day.getDate()}
                                </div>
                                <div className="space-y-1">
                                  {dayEvents.slice(0, 2).map((event) => (
                                    <div
                                      key={event.id}
                                      className="text-xs bg-primary/10 rounded px-1 py-0.5 truncate"
                                      title={event.title}
                                    >
                                      {event.title}
                                    </div>
                                  ))}
                                  {dayEvents.length > 2 && (
                                    <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} mais</div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Day Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "Selecione um dia"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {dayEvents.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Nenhum evento agendado</p>
                  ) : (
                    dayEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{event.title}</span>
                          <Badge className={getStatusColor(event.status)} variant="secondary">
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {new Date(event.start_time).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            -{" "}
                            {new Date(event.end_time).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          {event.patient_name && <div>Paciente: {event.patient_name}</div>}
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">Clique em um dia para ver os eventos</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
