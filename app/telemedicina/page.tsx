"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  startTelemedicineSession,
  endTelemedicineSession,
  getTelemedicineSessions,
  getWaitingRoom,
} from "@/app/actions/telemedicine"
import { Video, Users, Clock, CheckCircle, Calendar } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"

export default function TelemedicinaPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [waitingRoom, setWaitingRoom] = useState<any[]>([])
  const [activeSession, setActiveSession] = useState<any | null>(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000) // Atualiza a cada 5s
    return () => clearInterval(interval)
  }, [filter])

  async function loadData() {
    const status = filter === "all" ? undefined : filter
    const [sessionsResult, waitingResult] = await Promise.all([getTelemedicineSessions({ status }), getWaitingRoom()])

    if (sessionsResult.data) setSessions(sessionsResult.data)
    if (waitingResult.data) setWaitingRoom(waitingResult.data)
  }

  async function handleStartSession(sessionId: string) {
    const result = await startTelemedicineSession(sessionId)
    if (result.success && result.data) {
      setActiveSession(result.data)
      loadData()
    } else {
      alert(result.error)
    }
  }

  async function handleEndSession(sessionId: string) {
    const notes = prompt("Notas clínicas da consulta:")
    if (!notes) return

    const result = await endTelemedicineSession({
      session_id: sessionId,
      clinical_notes: notes,
    })

    if (result.success) {
      setActiveSession(null)
      loadData()
      alert("Sessão finalizada com sucesso!")
    } else {
      alert(result.error)
    }
  }

  function getStatusBadge(status: string) {
    const colors = {
      scheduled: "bg-blue-500",
      waiting: "bg-yellow-500",
      in_progress: "bg-green-500",
      completed: "bg-gray-500",
      cancelled: "bg-red-500",
      no_show: "bg-orange-500",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* NavigationHeader for consistent navigation */}
      <NavigationHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Video className="w-8 h-8" />
            Telemedicina
          </h1>
        </div>

        {/* Active Session */}
        {activeSession && (
          <Card className="p-6 mb-6 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Consulta em Andamento</h2>
              <Badge className="bg-green-500">
                <Video className="w-4 h-4 mr-2" />
                AO VIVO
              </Badge>
            </div>

            <div className="mb-4">
              <p className="text-lg">Paciente: {activeSession.patient_name}</p>
              <p className="text-sm text-muted-foreground">
                Início: {new Date(activeSession.actual_start).toLocaleTimeString("pt-BR")}
              </p>
            </div>

            {/* Daily.co Room Embed */}
            <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
              <iframe
                src={activeSession.room_url}
                allow="camera; microphone; fullscreen; speaker; display-capture"
                className="w-full h-full rounded-lg"
              />
            </div>

            <Button onClick={() => handleEndSession(activeSession.id)} variant="destructive" className="w-full">
              Finalizar Consulta
            </Button>
          </Card>
        )}

        {/* Waiting Room */}
        {waitingRoom.length > 0 && (
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" />
              <h3 className="font-semibold">Sala de Espera ({waitingRoom.length})</h3>
            </div>
            <div className="space-y-2">
              {waitingRoom.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{patient.patient_name}</p>
                    <p className="text-sm text-muted-foreground">
                      Aguardando há {Math.round((Date.now() - new Date(patient.joined_at).getTime()) / 60000)} min
                    </p>
                  </div>
                  <Button size="sm" onClick={() => handleStartSession(patient.session_id)}>
                    Admitir
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["all", "scheduled", "waiting", "in_progress", "completed"].map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} size="sm">
              {f === "all" ? "Todas" : f.replace("_", " ")}
            </Button>
          ))}
        </div>

        {/* Sessions List */}
        <div className="grid gap-4">
          {sessions.map((session) => (
            <Card key={session.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{session.patient_name}</h3>
                    <Badge className={getStatusBadge(session.status)}>{session.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(session.scheduled_start).toLocaleString("pt-BR")}
                    </div>
                    {session.duration_minutes && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {session.duration_minutes} min
                      </div>
                    )}
                  </div>
                  {session.clinical_notes && <p className="mt-2 text-sm italic">{session.clinical_notes}</p>}
                </div>
                <div className="flex gap-2">
                  {session.status === "scheduled" && (
                    <Button size="sm" onClick={() => handleStartSession(session.id)}>
                      <Video className="w-4 h-4 mr-1" />
                      Iniciar
                    </Button>
                  )}
                  {session.status === "completed" && session.is_recorded && (
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Gravado
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
