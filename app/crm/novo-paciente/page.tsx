"use client"

import type React from "react"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPatient } from "@/app/actions/crm"

export default function NewPatientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validações básicas
    if (!formData.full_name || !formData.cpf || !formData.date_of_birth) {
      setError("Nome completo, CPF e data de nascimento são obrigatórios")
      setLoading(false)
      return
    }

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

    if (result.success) {
      router.push(`/crm/${result.patient?.id}`)
    } else {
      setError(result.error || "Erro ao cadastrar paciente")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto rounded-3xl border-border">
          <CardHeader>
            <CardTitle className="text-2xl">Cadastro de Novo Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="p-4 rounded-2xl bg-destructive/10 text-destructive text-sm">{error}</div>}

              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Dados Pessoais</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Nome Completo *</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleChange("full_name", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => handleChange("cpf", e.target.value)}
                      className="rounded-xl"
                      placeholder="000.000.000-00"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Data de Nascimento *</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) => handleChange("date_of_birth", e.target.value)}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Sexo</Label>
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
                    <Label htmlFor="blood_type">Tipo Sanguíneo</Label>
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="rounded-xl"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Endereço</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="rounded-xl"
                      maxLength={2}
                      placeholder="RS"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip_code">CEP</Label>
                    <Input
                      id="zip_code"
                      value={formData.zip_code}
                      onChange={(e) => handleChange("zip_code", e.target.value)}
                      className="rounded-xl"
                      placeholder="00000-000"
                    />
                  </div>
                </div>
              </div>

              {/* Histórico Médico */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Histórico Médico</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Alergias</Label>
                    <Textarea
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => handleChange("allergies", e.target.value)}
                      className="rounded-xl"
                      rows={3}
                      placeholder="Liste todas as alergias conhecidas"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chronic_conditions">Condições Crônicas</Label>
                    <Textarea
                      id="chronic_conditions"
                      value={formData.chronic_conditions}
                      onChange={(e) => handleChange("chronic_conditions", e.target.value)}
                      className="rounded-xl"
                      rows={3}
                      placeholder="Diabetes, hipertensão, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Contato de Emergência */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Contato de Emergência</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergency_contact">Nome</Label>
                    <Input
                      id="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={(e) => handleChange("emergency_contact", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency_phone">Telefone</Label>
                    <Input
                      id="emergency_phone"
                      value={formData.emergency_phone}
                      onChange={(e) => handleChange("emergency_phone", e.target.value)}
                      className="rounded-xl"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="rounded-xl flex-1"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="rounded-xl flex-1" disabled={loading}>
                  {loading ? "Cadastrando..." : "Cadastrar Paciente"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
