"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import { ArrowLeft, Plus, Trash2, FileText, ShieldCheck, AlertCircle } from "lucide-react"
import Link from "next/link"
import { createDigitalPrescription } from "@/app/actions/digital-prescriptions"
import { useRouter } from "next/navigation"

export default function NovaReceitaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [patients, setPatients] = useState<any[]>([])
  const [searchingPatients, setSearchingPatients] = useState(false)

  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    patientCpf: "",
    patientDateOfBirth: "",
    cid10Code: "",
    cid10Description: "",
    clinicalIndication: "",
    notes: "",
    validityDays: 30,
    prescriptionType: "simple" as "simple" | "controlled_b1" | "controlled_b2" | "special",
  })

  const [medications, setMedications] = useState([
    {
      medicationId: "",
      medicationName: "",
      dosage: "",
      frequency: "",
      duration: "",
      quantity: 1,
      instructions: "",
      warnings: "",
    },
  ])

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        medicationId: "",
        medicationName: "",
        dosage: "",
        frequency: "",
        duration: "",
        quantity: 1,
        instructions: "",
        warnings: "",
      },
    ])
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const updateMedication = (index: number, field: string, value: string | number) => {
    const updated = [...medications]
    updated[index] = { ...updated[index], [field]: value }
    setMedications(updated)
  }

  const handleSubmit = async () => {
    setError("")

    if (!formData.patientId) {
      setError("Selecione um paciente")
      return
    }

    if (!formData.patientName || !formData.patientCpf || !formData.patientDateOfBirth) {
      setError("Preencha todos os dados do paciente")
      return
    }

    if (medications.length === 0 || !medications[0].medicationName) {
      setError("Adicione pelo menos um medicamento")
      return
    }

    for (const med of medications) {
      if (med.medicationName && (!med.dosage || !med.frequency || !med.duration)) {
        setError("Preencha dosagem, frequência e duração de todos os medicamentos")
        return
      }
    }

    setLoading(true)

    try {
      const result = await createDigitalPrescription({
        patientId: formData.patientId,
        medications: medications.filter((m) => m.medicationName),
        cid10Code: formData.cid10Code || undefined,
        cid10Description: formData.cid10Description || undefined,
        clinicalIndication: formData.clinicalIndication || undefined,
        notes: formData.notes || undefined,
        validityDays: formData.validityDays,
        prescriptionType: formData.prescriptionType,
      })

      if (result.error) {
        setError(result.error)
      } else {
        router.push(`/receitas/assinar/${result.digitalPrescriptionId}`)
      }
    } catch (err) {
      console.error("[v0] Error creating prescription:", err)
      setError("Erro ao criar receita")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function fetchPatients() {
      setSearchingPatients(true)
      try {
        const response = await fetch("/api/patients")
        if (response.ok) {
          const data = await response.json()
          setPatients(data.patients || [])
        }
      } catch (err) {
        console.error("[v0] Error fetching patients:", err)
      } finally {
        setSearchingPatients(false)
      }
    }
    fetchPatients()
  }, [])

  const handlePatientSelect = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId)
    if (patient) {
      setFormData({
        ...formData,
        patientId: patient.id,
        patientName: patient.full_name,
        patientCpf: patient.cpf,
        patientDateOfBirth: patient.date_of_birth?.split("T")[0] || "",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-2xl">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Logo />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Emitir Receita Médica Digital
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Preencha os dados para emitir uma receita digital com assinatura ICP-Brasil
            </p>
          </div>

          {error && (
            <Card className="rounded-3xl border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Dados do Paciente */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Dados do Paciente</CardTitle>
              <CardDescription>Informações do paciente que receberá a receita</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patientSelect">Selecionar paciente *</Label>
                <Select value={formData.patientId} onValueChange={handlePatientSelect} disabled={searchingPatients}>
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue
                      placeholder={searchingPatients ? "Carregando pacientes..." : "Selecione um paciente"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.full_name} - CPF: {patient.cpf}
                      </SelectItem>
                    ))}
                    {patients.length === 0 && !searchingPatients && (
                      <SelectItem value="none" disabled>
                        Nenhum paciente cadastrado
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Nome completo *</Label>
                  <Input
                    id="patientName"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="Nome completo do paciente"
                    className="rounded-2xl"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientCpf">CPF *</Label>
                  <Input
                    id="patientCpf"
                    value={formData.patientCpf}
                    onChange={(e) => setFormData({ ...formData, patientCpf: e.target.value })}
                    placeholder="000.000.000-00"
                    className="rounded-2xl"
                    disabled
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientDateOfBirth">Data de nascimento *</Label>
                <Input
                  id="patientDateOfBirth"
                  type="date"
                  value={formData.patientDateOfBirth}
                  onChange={(e) => setFormData({ ...formData, patientDateOfBirth: e.target.value })}
                  className="rounded-2xl"
                  disabled
                />
              </div>
            </CardContent>
          </Card>

          {/* Diagnóstico */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Diagnóstico (opcional)</CardTitle>
              <CardDescription>Informações clínicas relevantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cid10Code">CID-10</Label>
                  <Input
                    id="cid10Code"
                    value={formData.cid10Code}
                    onChange={(e) => setFormData({ ...formData, cid10Code: e.target.value })}
                    placeholder="Ex: J00"
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cid10Description">Descrição</Label>
                  <Input
                    id="cid10Description"
                    value={formData.cid10Description}
                    onChange={(e) => setFormData({ ...formData, cid10Description: e.target.value })}
                    placeholder="Ex: Nasofaringite aguda"
                    className="rounded-2xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clinicalIndication">Indicação clínica</Label>
                <Textarea
                  id="clinicalIndication"
                  value={formData.clinicalIndication}
                  onChange={(e) => setFormData({ ...formData, clinicalIndication: e.target.value })}
                  placeholder="Descreva a indicação clínica..."
                  className="rounded-2xl min-h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Medicamentos */}
          <Card className="rounded-3xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Medicamentos</CardTitle>
                  <CardDescription>Liste todos os medicamentos prescritos</CardDescription>
                </div>
                <Button onClick={addMedication} className="rounded-2xl" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar medicamento
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {medications.map((med, index) => (
                <Card key={index} className="rounded-2xl border-2">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="rounded-full">
                        Medicamento {index + 1}
                      </Badge>
                      {medications.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedication(index)}
                          className="rounded-2xl text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Nome do medicamento *</Label>
                        <Input
                          value={med.medicationName}
                          onChange={(e) => updateMedication(index, "medicationName", e.target.value)}
                          placeholder="Ex: Dipirona sódica"
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dosagem *</Label>
                        <Input
                          value={med.dosage}
                          onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                          placeholder="Ex: 500mg"
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Frequência *</Label>
                        <Input
                          value={med.frequency}
                          onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                          placeholder="Ex: De 8 em 8 horas"
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Duração *</Label>
                        <Input
                          value={med.duration}
                          onChange={(e) => updateMedication(index, "duration", e.target.value)}
                          placeholder="Ex: 7 dias"
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantidade *</Label>
                        <Input
                          type="number"
                          value={med.quantity}
                          onChange={(e) => updateMedication(index, "quantity", Number.parseInt(e.target.value))}
                          min="1"
                          className="rounded-2xl"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Instruções de uso</Label>
                        <Textarea
                          value={med.instructions}
                          onChange={(e) => updateMedication(index, "instructions", e.target.value)}
                          placeholder="Ex: Tomar com água, após as refeições"
                          className="rounded-2xl"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Configurações */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Configurações da Receita</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prescriptionType">Tipo de receita</Label>
                  <Select
                    value={formData.prescriptionType}
                    onValueChange={(value: any) => setFormData({ ...formData, prescriptionType: value })}
                  >
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">Receita Simples</SelectItem>
                      <SelectItem value="controlled_b1">Controlada B1 (Tarja Preta)</SelectItem>
                      <SelectItem value="controlled_b2">Controlada B2 (Tarja Vermelha)</SelectItem>
                      <SelectItem value="special">Receita Especial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validityDays">Validade (dias)</Label>
                  <Input
                    id="validityDays"
                    type="number"
                    value={formData.validityDays}
                    onChange={(e) => setFormData({ ...formData, validityDays: Number.parseInt(e.target.value) })}
                    min="1"
                    max="365"
                    className="rounded-2xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Observações adicionais..."
                  className="rounded-2xl min-h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Informativo Legal */}
          <Card className="rounded-3xl border-primary bg-primary/5">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Receita Digital com Assinatura ICP-Brasil</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Esta receita será assinada digitalmente com certificado ICP-Brasil e terá validade jurídica
                    equivalente à assinatura manuscrita, conforme MP 2.200-2/2001 e Lei 14.063/2020.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O documento assinado não poderá ser alterado e será aceito em farmácias de todo o Brasil.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <Button onClick={handleSubmit} disabled={loading} className="rounded-2xl flex-1 h-12 text-base">
              {loading ? "Criando..." : "Prosseguir para Assinatura Digital"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
