"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PatientSearchSelect } from "@/components/patient-search-select"
import { NavigationHeader } from "@/components/navigation-header"
import {
  startTelemedicineSession,
  endTelemedicineSession,
  getTelemedicineSessions,
  getWaitingRoom,
  createTelemedicineSession,
} from "@/app/actions/telemedicine"
import { Video, Users, Clock, CheckCircle, Calendar, Plus, Phone, PhoneOff, Mic, MicOff, Camera, CameraOff, Settings } from "lucide-react"
import { toast } from "sonner"

export default function TelemedicinaPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [waitingRoom, setWaitingRoom] = useState<any[]>([])
  const [activeSession, setActiveSession] = useState<any | null>(null)
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showNewSessionModal, setShowNewSessionModal] = useState(false)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(true)

  const [newSession, setNewSession] = useState({
    patient: null as any,
    scheduled_start: "",
    scheduled_end: "",
    notes: ""
  })

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 10000)
    return () => clearInterval(interval)
  }, [filter])

  async function loadData() {
    setLoading(true)
    const status = filter === "all" ? undefined : filter
    const [sessionsResult, waitingResult] = await Promise.all([
      getTelemedicineSessions({ status }),
      getWaitingRoom()
    ])

    if (sessionsResult.data) setSessions(sessionsResult.data)
    if (waitingResult.data) setWaitingRoom(waitingResult.data)
    setLoading(false)
  }

  async function handleCreateSession() {
    if (!newSession.patient) {
      toast.error("Selecione um paciente")
      return
    }
    if (!newSession.scheduled_start) {
      toast.error("Informe a data e hora de inicio")
      return
    }

    const result = await createTelemedicineSession({
      patient_id: newSession.patient.id,
      scheduled_start: newSession.scheduled_start,
      scheduled_end: newSession.scheduled_end || undefined,
      notes: newSession.notes || undefined
    })

    if (result.success) {
      toast.success("Sessao agendada com sucesso!")
      setShowNewSessionModal(false)
      setNewSession({ patient: null, scheduled_start: "", scheduled_end: "", notes: "" })
      loadData()
    } else {
      toast.error(result.error || "Erro ao agendar sessao")
    }
  }

  async function handleStartSession(sessionId: string) {
    const result = await startTelemedicineSession(sessionId)
    if (result.success && result.data) {
      setActiveSession(result.data)
      toast.success("Consulta iniciada!")
      loadData()
    } else {
      toast.error(result.error || "Erro ao iniciar consulta")
    }
  }

  async function handleEndSession(sessionId: string) {
    const notes = prompt("Notas clinicas da consulta (opcional):")

    const result = await endTelemedicineSession({
      session_id: sessionId,
      clinical_notes: notes || "",
    })

    if (result.success) {
      setActiveSession(null)
      toast.success("Consulta finalizada com sucesso!")
      loadData()
    } else {
      toast.error(result.error || "Erro ao finalizar consulta")
    }
  }

  function getStatusBadge(status: string) {
    const statusMap: Record<string, { label: string, color: string }> = {
      scheduled: { label: "Agendada", color: "bg-blue-500" },
      waiting: { label: "Aguardando", color: "bg-yellow-500" },
      in_progress: { label: "Em Andamento", color: "bg-green-500" },
      completed: { label: "Concluida", color: "bg-gray-500" },
      cancelled: { label: "Cancelada", color: "bg-red-500" },
      no_show: { label: "Nao Compareceu", color: "bg-orange-500" },
    }
    const s = statusMap[status] || { label: status, color: "bg-gray-500" }
    return <Badge className={s.color}>{s.label}</Badge>
  }

  const filterLabels: Record<string, string> = {
    all: "Todas",
    scheduled: "Agendadas",
    waiting: "Aguardando",
    in_progress: "Em Andamento",
    completed: "Concluidas"
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Video className="w-8 h-8" />
              Telemedicina
            </h1>
            <p className="text-muted-foreground">Consultas por video online</p>
          </div>
          <Button onClick={() => setShowNewSessionModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Consulta
          </Button>
        </div>

        {/* Sessao Ativa */}
        {activeSession && (
          <Card className="mb-6 border-green-500 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-green-500" />
                  Consulta em Andamento
                </CardTitle>
                <Badge className="bg-green-500 animate-pulse">AO VIVO</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-lg font-medium">Paciente: {activeSession.patient_name}</p>
                <p className="text-sm text-muted-foreground">
                  Iniciada: {new Date(activeSession.actual_start).toLocaleTimeString("pt-BR")}
                </p>
              </div>

              {/* Video Area */}
              <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative overflow-hidden">
                {activeSession.room_url ? (
                  <iframe
                    src={activeSession.room_url}
                    allow="camera; microphone; fullscreen; speaker; display-capture"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Aguardando conexao...</p>
                      <p className="text-sm opacity-70 mt-2">A sala de video sera carregada automaticamente</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controles */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  variant={micEnabled ? "outline" : "destructive"}
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => setMicEnabled(!micEnabled)}
                >
                  {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>
                <Button
                  variant={cameraEnabled ? "outline" : "destructive"}
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => setCameraEnabled(!cameraEnabled)}
                >
                  {cameraEnabled ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full w-14 h-14">
                  <Settings className="w-6 h-6" />
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded-full w-14 h-14"
                  onClick={() => handleEndSession(activeSession.id)}
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
              </div>

              <Button
                onClick={() => handleEndSession(activeSession.id)}
                variant="outline"
                className="w-full"
              >
                Finalizar e Salvar Consulta
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Sala de Espera */}
        {waitingRoom.length > 0 && (
          <Card className="mb-6 border-yellow-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-500" />
                Sala de Espera ({waitingRoom.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {waitingRoom.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{patient.patient_name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Aguardando ha {Math.round((Date.now() - new Date(patient.joined_at).getTime()) / 60000)} minutos
                      </p>
                    </div>
                    <Button size="sm" onClick={() => handleStartSession(patient.session_id)}>
                      <Phone className="w-4 h-4 mr-2" />
                      Admitir
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {Object.entries(filterLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={filter === key ? "default" : "outline"}
              onClick={() => setFilter(key)}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Lista de Sessoes */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : sessions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Nenhuma consulta encontrada</p>
              <Button variant="outline" onClick={() => setShowNewSessionModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Agendar primeira consulta
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sessions.map((session) => (
              <Card key={session.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{session.patient_name}</h3>
                        {getStatusBadge(session.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(session.scheduled_start).toLocaleString("pt-BR")}
                        </div>
                        {session.duration_minutes && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.duration_minutes} minutos
                          </div>
                        )}
                      </div>
                      {session.clinical_notes && (
                        <p className="mt-2 text-sm italic text-muted-foreground">{session.clinical_notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {session.status === "scheduled" && (
                        <Button size="sm" onClick={() => handleStartSession(session.id)}>
                          <Video className="w-4 h-4 mr-1" />
                          Iniciar Consulta
                        </Button>
                      )}
                      {session.status === "waiting" && (
                        <Button size="sm" onClick={() => handleStartSession(session.id)}>
                          <Phone className="w-4 h-4 mr-1" />
                          Atender
                        </Button>
                      )}
                      {session.status === "completed" && session.is_recorded && (
                        <Badge variant="secondary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Gravada
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Modal Nova Sessao */}
        <Dialog open={showNewSessionModal} onOpenChange={setShowNewSessionModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Nova Consulta de Telemedicina
              </DialogTitle>
              <DialogDescription>
                Agende uma nova consulta por video com seu paciente
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Paciente *</Label>
                <PatientSearchSelect
                  onPatientSelect={(p) => setNewSession({ ...newSession, patient: p })}
                  selectedPatient={newSession.patient}
                  required
                />
              </div>

              <div>
                <Label>Data e Hora de Inicio *</Label>
                <Input
                  type="datetime-local"
                  value={newSession.scheduled_start}
                  onChange={(e) => setNewSession({ ...newSession, scheduled_start: e.target.value })}
                />
              </div>

              <div>
                <Label>Data e Hora de Fim (opcional)</Label>
                <Input
                  type="datetime-local"
                  value={newSession.scheduled_end}
                  onChange={(e) => setNewSession({ ...newSession, scheduled_end: e.target.value })}
                />
              </div>

              <div>
                <Label>Observacoes</Label>
                <Textarea
                  value={newSession.notes}
                  onChange={(e) => setNewSession({ ...newSession, notes: e.target.value })}
                  placeholder="Motivo da consulta, instrucoes para o paciente..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewSessionModal(false)} className="flex-1">
                  Cancelar
                </Button>
                <Button onClick={handleCreateSession} className="flex-1">
                  Agendar Consulta
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
