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
  updateClinic,
  deleteClinic,
  createRoom,
  getRoomsByClinic,
  updateRoomStatus,
} from "@/app/actions/clinic-management"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Building, Plus, DoorOpen, MapPin, Phone, Mail, Pencil, Trash2, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ClinicsPage() {
  const [clinics, setClinics] = useState<any[]>([])
  const [selectedClinic, setSelectedClinic] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewClinicOpen, setIsNewClinicOpen] = useState(false)
  const [isNewRoomOpen, setIsNewRoomOpen] = useState(false)
  const [isEditClinicOpen, setIsEditClinicOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [clinicToDelete, setClinicToDelete] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  const [editClinic, setEditClinic] = useState({
    id: "",
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

  const handleOpenEditClinic = (clinic: any) => {
    setEditClinic({
      id: clinic.id,
      name: clinic.name || "",
      cnpj: clinic.cnpj || "",
      phone: clinic.phone || "",
      email: clinic.email || "",
      address_street: clinic.address_street || "",
      address_number: clinic.address_number || "",
      address_city: clinic.address_city || "",
      address_state: clinic.address_state || "",
      address_zipcode: clinic.address_zipcode || "",
    })
    setIsEditClinicOpen(true)
  }

  const handleUpdateClinic = async () => {
    setSaving(true)
    try {
      const result = await updateClinic(editClinic.id, {
        name: editClinic.name,
        cnpj: editClinic.cnpj,
        phone: editClinic.phone,
        email: editClinic.email,
        address: {
          street: editClinic.address_street,
          number: editClinic.address_number,
          city: editClinic.address_city,
          state: editClinic.address_state,
        },
      })

      if (result.success) {
        toast.success("Clinica atualizada com sucesso")
        setIsEditClinicOpen(false)
        loadClinics()
        if (selectedClinic?.id === editClinic.id) {
          setSelectedClinic(result.data)
        }
      } else {
        toast.error(result.error || "Erro ao atualizar clinica")
      }
    } catch (error) {
      toast.error("Erro ao atualizar clinica")
    } finally {
      setSaving(false)
    }
  }

  const handleOpenDeleteDialog = (clinic: any) => {
    setClinicToDelete(clinic)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteClinic = async () => {
    if (!clinicToDelete) return

    setSaving(true)
    try {
      const result = await deleteClinic(clinicToDelete.id)
      if (result.success) {
        toast.success("Clinica excluida com sucesso")
        setIsDeleteDialogOpen(false)
        setClinicToDelete(null)
        if (selectedClinic?.id === clinicToDelete.id) {
          setSelectedClinic(null)
          setRooms([])
        }
        loadClinics()
      } else {
        toast.error(result.error || "Erro ao excluir clinica")
      }
    } catch (error) {
      toast.error("Erro ao excluir clinica")
    } finally {
      setSaving(false)
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
                <div
                  key={clinic.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedClinic?.id === clinic.id
                      ? "bg-secondary border-secondary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleSelectClinic(clinic)}
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block truncate">{clinic.name}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{clinic.address_city}, {clinic.address_state}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenEditClinic(clinic)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDeleteDialog(clinic)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {clinics.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma clinica cadastrada
                </div>
              )}
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
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{selectedClinic.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEditClinic(selectedClinic)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleOpenDeleteDialog(selectedClinic)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClinic.phone || "Não informado"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClinic.email || "Não informado"}</span>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedClinic.address_street ? (
                          `${selectedClinic.address_street}, ${selectedClinic.address_number} - ${selectedClinic.address_city}, ${selectedClinic.address_state}`
                        ) : (
                          "Endereço não informado"
                        )}
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

      {/* Modal: Editar Clínica */}
      <Dialog open={isEditClinicOpen} onOpenChange={setIsEditClinicOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Clínica</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome da Clínica</Label>
                <Input
                  value={editClinic.name}
                  onChange={(e) => setEditClinic({ ...editClinic, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>CNPJ</Label>
                <Input
                  value={editClinic.cnpj}
                  onChange={(e) => setEditClinic({ ...editClinic, cnpj: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={editClinic.phone}
                  onChange={(e) => setEditClinic({ ...editClinic, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  value={editClinic.email}
                  onChange={(e) => setEditClinic({ ...editClinic, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-2">
                <Label>Rua</Label>
                <Input
                  value={editClinic.address_street}
                  onChange={(e) => setEditClinic({ ...editClinic, address_street: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Número</Label>
                <Input
                  value={editClinic.address_number}
                  onChange={(e) => setEditClinic({ ...editClinic, address_number: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input
                  value={editClinic.address_city}
                  onChange={(e) => setEditClinic({ ...editClinic, address_city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Input
                  value={editClinic.address_state}
                  onChange={(e) => setEditClinic({ ...editClinic, address_state: e.target.value })}
                  maxLength={2}
                />
              </div>
              <div className="space-y-2">
                <Label>CEP</Label>
                <Input
                  value={editClinic.address_zipcode}
                  onChange={(e) => setEditClinic({ ...editClinic, address_zipcode: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditClinicOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateClinic} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog: Confirmar Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Clínica</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a clínica <strong>{clinicToDelete?.name}</strong>?
              Esta ação não pode ser desfeita e todas as salas associadas também serão desativadas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={saving}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClinic}
              disabled={saving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                "Excluir"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
