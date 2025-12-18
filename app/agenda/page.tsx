'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  createCalendarEvent,
  getCalendarEvents,
  updateCalendarEvent,
  getAgendaDay
} from '@/app/actions/calendar'
import { Calendar as CalendarIcon, Clock, Plus, Video, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

const HOURS = Array.from({ length: 13 }, (_, i) => i + 7) // 7h às 19h

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<any[]>([])
  const [dayEvents, setDayEvents] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: '',
    start_time: '',
    end_time: '',
    event_type: 'appointment',
    patient_id: '',
    location: '',
    description: ''
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
    const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString()
    const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString()
    
    const result = await getCalendarEvents({ start_date: start, end_date: end })
    if (result.data) setEvents(result.data)
  }

  async function loadDayEvents(date: string) {
    const result = await getAgendaDay(date)
    if (result.data) setDayEvents(result.data)
  }

  async function handleCreateEvent() {
    const result = await createCalendarEvent(newEvent)
    if (result.success) {
      setShowNewEvent(false)
      setNewEvent({ title: '', start_time: '', end_time: '', event_type: 'appointment', patient_id: '', location: '', description: '' })
      loadMonthEvents()
      if (selectedDate) loadDayEvents(selectedDate)
    } else {
      if (result.conflicts) {
        alert(`Conflito de agenda detectado! Eventos em conflito: ${result.conflicts.length}`)
      } else {
        alert(result.error)
      }
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
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(e => e.start_time.split('T')[0] === dateStr)
  }

  function getStatusColor(status: string) {
    const colors = {
      scheduled: 'bg-blue-500',
      confirmed: 'bg-green-500',
      in_progress: 'bg-yellow-500',
      completed: 'bg-gray-500',
      cancelled: 'bg-red-500',
      no_show: 'bg-orange-500'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500'
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <CalendarIcon className="w-8 h-8" />
          Agenda Médica
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-semibold">
                {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="text-center font-semibold text-sm text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const dayEvents = day ? getEventsForDay(day) : []
                const isToday = day && day.toDateString() === new Date().toDateString()
                const isSelected = day && selectedDate === day.toISOString().split('T')[0]
                
                return (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(day.toISOString().split('T')[0])}
                    className={`
                      min-h-24 p-2 border rounded cursor-pointer hover:bg-accent transition
                      ${isToday ? 'border-primary border-2' : ''}
                      ${isSelected ? 'bg-accent' : ''}
                      ${!day ? 'bg-gray-50 cursor-default' : ''}
                    `}
                  >
                    {day && (
                      <>
                        <div className="text-sm font-medium mb-1">{day.getDate()}</div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <div
                              key={event.id}
                              className="text-xs bg-primary/10 rounded px-1 py-0.5 truncate"
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayEvents.length - 3} mais
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Day Schedule */}
        <div className="col-span-1">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">
                {selectedDate
                  ? new Date(selectedDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })
                  : 'Selecione um dia'}
              </h3>
              <Button size="sm" onClick={() => setShowNewEvent(true)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {selectedDate ? (
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {dayEvents.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhum evento agendado
                  </p>
                ) : (
                  dayEvents.map(event => (
                    <div key={event.id} className="border rounded p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{event.title}</span>
                        <Badge className={getStatusColor(event.status)} variant="secondary">
                          {event.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(event.start_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          {' - '}
                          {new Date(event.end_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {event.patient_name && (
                          <div>Paciente: {event.patient_name}</div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Clique em um dia para ver os eventos
              </p>
            )}
          </Card>
        </div>
      </div>

      {/* New Event Modal */}
      {showNewEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Novo Evento</h3>
            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Ex: Consulta com paciente"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Início</Label>
                  <Input
                    type="datetime-local"
                    value={newEvent.start_time}
                    onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Fim</Label>
                  <Input
                    type="datetime-local"
                    value={newEvent.end_time}
                    onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Tipo</Label>
                <select
                  className="w-full border rounded p-2"
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
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleCreateEvent}>Criar Evento</Button>
              <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
