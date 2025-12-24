"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { createPatient } from "@/app/actions/crm"
import { toast } from "sonner"

interface Patient {
  id: string
  full_name: string
  cpf: string
  phone?: string
  date_of_birth?: string
  email?: string
}

interface PatientCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (patient: Patient) => void
  initialName?: string
}

export function PatientCreationModal({
  isOpen,
  onClose,
  onSuccess,
  initialName = "",
}: PatientCreationModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    full_name: initialName,
    cpf: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    blood_type: "",
    allergies: "",
    chronic_conditions: "",
    emergency_contact: "",
    emergency_phone: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      full_name: "",
      cpf: "",
      date_of_birth: "",
      gender: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      blood_type: "",
      allergies: "",
      chronic_conditions: "",
      emergency_contact: "",
      emergency_phone: "",
    })
    setError("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.full_name || !formData.cpf || !formData.date_of_birth) {
      setError("Nome completo, CPF e data de nascimento sao obrigatorios")
      toast.error("Preencha todos os campos obrigatorios")
      setLoading(false)
      return
    }

    try {
      const result = await createPatient({
        fullName: formData.full_name,
        cpf: formData.cpf,
        dateOfBirth: formData.date_of_birth,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        cep: formData.zip_code,
        bloodType: formData.blood_type,
        allergies: formData.allergies,
        chronicConditions: formData.chronic_conditions,
        emergencyContactName: formData.emergency_contact,
        emergencyContactPhone: formData.emergency_phone,
      })

      if (result.success && result.patient) {
        toast.success("Paciente cadastrado com sucesso!")
        const newPatient: Patient = {
          id: result.patient.id,
          full_name: result.patient.full_name,
          cpf: result.patient.cpf,
          phone: result.patient.phone || undefined,
          date_of_birth: result.patient.date_of_birth || undefined,
          email: result.patient.email || undefined,
        }
        resetForm()
        onSuccess(newPatient)
      } else {
        setError(result.error || "Erro ao cadastrar paciente")
        toast.error(result.error || "Erro ao cadastrar paciente")
        setLoading(false)
      }
    } catch (err: any) {
      console.error("Erro ao cadastrar paciente:", err)
      setError("Erro de conexao. Tente novamente.")
      toast.error("Erro de conexao. Tente novamente.")
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="w-full max-w-[calc(100%-1rem)] sm:max-w-lg md:max-w-2xl lg:max-w-3xl flex flex-col max-h-[90vh]">
        <DialogHeader className="shrink-0">
          <DialogTitle>Cadastrar Novo Paciente</DialogTitle>
          <DialogDescription>
            Preencha os dados do paciente. Campos com * sao obrigatorios.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2">
          <form id="patient-creation-form" onSubmit={handleSubmit} className="space-y-6 pb-4">
            {error && (
              <div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Dados Pessoais */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Dados Pessoais</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal_full_name">Nome Completo *</Label>
                  <Input
                    id="modal_full_name"
                    value={formData.full_name}
                    onChange={(e) => handleChange("full_name", e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_cpf">CPF *</Label>
                  <Input
                    id="modal_cpf"
                    value={formData.cpf}
                    onChange={(e) => handleChange("cpf", e.target.value)}
                    className="rounded-xl"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_date_of_birth">Data de Nascimento *</Label>
                  <Input
                    id="modal_date_of_birth"
                    type="date"
                    value={formData.date_of_birth}
                    onChange={(e) => handleChange("date_of_birth", e.target.value)}
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_gender">Sexo</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_blood_type">Tipo Sanguineo</Label>
                  <Select value={formData.blood_type} onValueChange={(value) => handleChange("blood_type", value)}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contato</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal_phone">Telefone</Label>
                  <Input
                    id="modal_phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="rounded-xl"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_email">E-mail</Label>
                  <Input
                    id="modal_email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Endereco */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Endereco</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="modal_address">Endereco Completo</Label>
                  <Input
                    id="modal_address"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_city">Cidade</Label>
                  <Input
                    id="modal_city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_state">Estado</Label>
                  <Input
                    id="modal_state"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="rounded-xl"
                    maxLength={2}
                    placeholder="RS"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_zip_code">CEP</Label>
                  <Input
                    id="modal_zip_code"
                    value={formData.zip_code}
                    onChange={(e) => handleChange("zip_code", e.target.value)}
                    className="rounded-xl"
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>

            {/* Historico Medico */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Historico Medico</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="modal_allergies">Alergias</Label>
                  <Textarea
                    id="modal_allergies"
                    value={formData.allergies}
                    onChange={(e) => handleChange("allergies", e.target.value)}
                    className="rounded-xl"
                    rows={2}
                    placeholder="Liste todas as alergias conhecidas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_chronic_conditions">Condicoes Cronicas</Label>
                  <Textarea
                    id="modal_chronic_conditions"
                    value={formData.chronic_conditions}
                    onChange={(e) => handleChange("chronic_conditions", e.target.value)}
                    className="rounded-xl"
                    rows={2}
                    placeholder="Diabetes, hipertensao, etc."
                  />
                </div>
              </div>
            </div>

            {/* Contato de Emergencia */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Contato de Emergencia</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="modal_emergency_contact">Nome</Label>
                  <Input
                    id="modal_emergency_contact"
                    value={formData.emergency_contact}
                    onChange={(e) => handleChange("emergency_contact", e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modal_emergency_phone">Telefone</Label>
                  <Input
                    id="modal_emergency_phone"
                    value={formData.emergency_phone}
                    onChange={(e) => handleChange("emergency_phone", e.target.value)}
                    className="rounded-xl"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex gap-4 pt-4 shrink-0 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="rounded-xl flex-1"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="patient-creation-form"
            className="rounded-xl flex-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar Paciente"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
