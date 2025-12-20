"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  getClinics,
  createClinic,
  createRoom,
  getRoomsByClinic,
  updateRoomStatus,
} from "@/app/actions/clinic-management"
import { Building, Plus, DoorOpen, MapPin, Phone, Mail } from "lucide-react"
import { toast } from "sonner"

export default function ClinicsPage() {
  const [clinics, setClinics] = useState<any[]>([])
  const [selectedClinic, setSelectedClinic] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewClinicOpen, setIsNewClinicOpen] = useState(false)
  const [isNewRoomOpen, setIsNewRoomOpen] = useState(false)

  const [newClinic, setNewClinic] = useState({
    name: "",
    cnpj: "",
    phone: "",
    email: "",
    address_street: "",
    address_number: "",
    address_city: "",
    address_state: "",
    address_zipcode: "",
  })

  const [newRoom, setNewRoom] = useState({
    name: "",
    room_number: "",
    room_type: "consultation",
    capacity: 1,
  })

  useEffect(() => {
    loadClinics()
  }, [])

  const loadClinics = async () => {
    try {
      const result = await getClinics()
      if (result.success) {
        setClinics(result.data || [])
        if (result.data && result.data.length > 0) {
          handleSelectClinic(result.data[0])
        }
      }
    } catch (error) {
      toast.error("Erro ao carregar clínicas")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectClinic = async (clinic: any) => {
    setSelectedClinic(clinic)
    try {
      const result = await getRoomsByClinic(clinic.id)
      if (result.success) {
        setRooms(result.data || [])
      }
    } catch (error) {
      toast.error("Erro ao carregar salas")
    }
  }

  const handleCreateClinic = async () => {
    try {
      const result = await createClinic(newClinic)
      if (result.success) {
        toast.success("Clínica criada com sucesso")
        setIsNewClinicOpen(false)
        loadClinics()
        setNewClinic({
          name: "",
          cnpj: "",
          phone: "",
          email: "",
          address_street: "",
          address_number: "",
          address_city: "",
          address_state: "",
          address_zipcode: "",
        })
      } else {
        toast.error(result.error || "Erro ao criar clínica")
      }
    } catch (error) {
      toast.error("Erro ao criar clínica")
    }
  }

  const handleCreateRoom = async () => {
    if (!selectedClinic) return

    try {
      const result = await createRoom({
        ...newRoom,
        clinic_id: selectedClinic.id,
      })

      if (result.success) {
        toast.success("Sala criada com sucesso")
        setIsNewRoomOpen(false)
        handleSelectClinic(selectedClinic)
        setNewRoom({
          name: "",
          room_number: "",
          room_type: "consultation",
          capacity: 1,
        })
      } else {
        toast.error(result.error || "Erro ao criar sala")
      }
    } catch (error) {
      toast.error("Erro ao criar sala")
    }
  }

  const handleUpdateRoomStatus = async (roomId: string, status: string) => {
    try {
      const result = await updateRoomStatus(roomId, status)
      if (result.success) {
        toast.success("Status atualizado")
        if (selectedClinic) {
          handleSelectClinic(selectedClinic)
        }
      } else {
        toast.error(result.error || "Erro ao atualizar status")
      }
    } catch (error) {
      toast.error("Erro ao atualizar status")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Building className="h-8 w-8 text-stone-600" />
              Gestão de Clínicas
            </h1>
            <p className="text-muted-foreground mt-2">Gerenciar múltiplas clínicas e salas de atendimento</p>
          </div>

          <Dialog open={isNewClinicOpen} onOpenChange={setIsNewClinicOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Clínica
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Clínica</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Clínica</Label>
                    <Input
                      value={newClinic.name}
                      onChange={(e) => setNewClinic({ ...newClinic, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input
                      value={newClinic.cnpj}
                      onChange={(e) => setNewClinic({ ...newClinic, cnpj: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input
                      value={newClinic.phone}
                      onChange={(e) => setNewClinic({ ...newClinic, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      value={newClinic.email}
                      onChange={(e) => setNewClinic({ ...newClinic, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label>Rua</Label>
                    <Input
                      value={newClinic.address_street}
                      onChange={(e) => setNewClinic({ ...newClinic, address_street: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Número</Label>
                    <Input
                      value={newClinic.address_number}
                      onChange={(e) => setNewClinic({ ...newClinic, address_number: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Cidade</Label>
                    <Input
                      value={newClinic.address_city}
                      onChange={(e) => setNewClinic({ ...newClinic, address_city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estado</Label>
                    <Input
                      value={newClinic.address_state}
                      onChange={(e) => setNewClinic({ ...newClinic, address_state: e.target.value })}
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CEP</Label>
                    <Input
                      value={newClinic.address_zipcode}
                      onChange={(e) => setNewClinic({ ...newClinic, address_zipcode: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateClinic} className="w-full">
                  Criar Clínica
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Clínicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Minhas Clínicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {clinics.map((clinic) => (
                <Button
                  key={clinic.id}
                  variant={selectedClinic?.id === clinic.id ? "secondary" : "outline"}
                  className="w-full justify-start h-auto py-3"
                  onClick={() => handleSelectClinic(clinic)}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-medium">{clinic.name}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {clinic.address_city}, {clinic.address_state}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Detalhes e Salas */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedClinic ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Selecione uma clínica para visualizar detalhes
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Informações da Clínica */}
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedClinic.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClinic.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClinic.email}</span>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedClinic.address_street}, {selectedClinic.address_number} - {selectedClinic.address_city}
                        , {selectedClinic.address_state}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Salas */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <DoorOpen className="h-5 w-5" />
                      Salas de Atendimento
                    </CardTitle>
                    <Dialog open={isNewRoomOpen} onOpenChange={setIsNewRoomOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Nova Sala
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cadastrar Nova Sala</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label>Nome da Sala</Label>
                            <Input
                              value={newRoom.name}
                              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Número</Label>
                              <Input
                                value={newRoom.room_number}
                                onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Capacidade</Label>
                              <Input
                                type="number"
                                value={newRoom.capacity}
                                onChange={(e) => setNewRoom({ ...newRoom, capacity: Number.parseInt(e.target.value) })}
                              />
                            </div>
                          </div>
                          <Button onClick={handleCreateRoom} className="w-full">
                            Criar Sala
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    {rooms.map((room) => (
                      <Card key={room.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{room.name}</h3>
                            <Badge variant={room.current_status === "available" ? "default" : "secondary"}>
                              {room.current_status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">
                            Sala {room.room_number} • Capacidade: {room.capacity}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateRoomStatus(room.id, "available")}
                              disabled={room.current_status === "available"}
                            >
                              Disponível
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateRoomStatus(room.id, "occupied")}
                              disabled={room.current_status === "occupied"}
                            >
                              Ocupada
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
