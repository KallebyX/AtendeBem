"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Stethoscope,
  RotateCcw,
  Activity,
  TestTube,
  Search,
  FileCheck,
  AlertCircle,
  Loader2,
  Users,
  Calendar,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { appointmentContexts, urgencyLevels, lateralityOptions, locationOptions } from "@/lib/tuss-data"
import { createAppointment } from "@/app/actions/appointments"
import { searchTUSS, tussGroups, getTUSSByGroup, type TUSSProcedure } from "@/lib/tuss-complete"
import { searchPatients } from "@/app/actions/patients"
import { getAppointmentHistory } from "@/app/actions/appointments"
import { toast } from "sonner"

type AppointmentType = "consulta" | "retorno" | "procedimento" | "exame"

export default function NovoAtendimentoPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [appointmentType, setAppointmentType] = useState<AppointmentType | null>(null)
  const [context, setContext] = useState("")
  const [urgency, setUrgency] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProcedures, setSelectedProcedures] = useState<TUSSProcedure[]>([])
  const [procedureDetails, setProcedureDetails] = useState<Record<string, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [patientSearchQuery, setPatientSearchQuery] = useState("")
  const [patientSearchResults, setPatientSearchResults] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isSearchingPatients, setIsSearchingPatients] = useState(false)

  const [linkedAppointmentId, setLinkedAppointmentId] = useState<string | null>(null)
  const [availableAppointments, setAvailableAppointments] = useState<any[]>([])

  const [patientName, setPatientName] = useState("")
  const [patientCpf, setPatientCpf] = useState("")
  const [showTussCodes, setShowTussCodes] = useState(false)

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (patientSearchQuery.length >= 2) {
        setIsSearchingPatients(true)
        const result = await searchPatients(patientSearchQuery)
        if (result.success) {
          setPatientSearchResults(result.patients || [])
        }
        setIsSearchingPatients(false)
      } else {
        setPatientSearchResults([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [patientSearchQuery])

  useEffect(() => {
    const loadAppointments = async () => {
      if (selectedPatient) {
        const result = await getAppointmentHistory(20, 0)
        if (result.success && result.appointments) {
          // Filter appointments for selected patient
          const patientAppointments = result.appointments.filter(
            (apt: any) => apt.patient_name === selectedPatient.full_name,
          )
          setAvailableAppointments(patientAppointments)
        }
      }
    }
    loadAppointments()
  }, [selectedPatient])

  const filteredProcedures = useMemo(() => {
    let results: TUSSProcedure[] = []

    // First apply category filter
    if (selectedCategory !== "all") {
      results = getTUSSByGroup(selectedCategory)
    } else {
      // If no category, search all
      results = searchTUSS(searchQuery, 100)
    }

    // Then apply text search if query exists
    if (searchQuery.trim().length > 0 && selectedCategory !== "all") {
      const normalizedQuery = searchQuery.toLowerCase()
      results = results.filter(
        (p) => p.description.toLowerCase().includes(normalizedQuery) || p.code.includes(searchQuery),
      )
    }

    return results.slice(0, 50) // Limit to 50 results
  }, [searchQuery, selectedCategory])

  const handleProcedureToggle = (proc: TUSSProcedure) => {
    const isSelected = selectedProcedures.some((p) => p.code === proc.code)
    if (isSelected) {
      setSelectedProcedures(selectedProcedures.filter((p) => p.code !== proc.code))
    } else {
      setSelectedProcedures([...selectedProcedures, proc])
    }
  }

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const canProceed = () => {
    if (step === 1) return appointmentType !== null
    if (step === 2) return context !== "" && urgency !== ""
    if (step === 3) return selectedProcedures.length > 0
    if (step === 4) return true
    if (step === 5) return patientName.trim() !== "" || selectedPatient !== null
    return true
  }

  const handleSaveAppointment = async () => {
    setIsSubmitting(true)

    try {
      const result = await createAppointment({
        patientName: selectedPatient ? selectedPatient.full_name : patientName,
        patientCpf: selectedPatient ? selectedPatient.cpf : patientCpf,
        appointmentType: appointmentType!,
        context,
        urgency,
        procedures: selectedProcedures.map((proc) => ({
          code: proc.code,
          friendlyName: proc.description,
          laterality: procedureDetails[proc.code]?.laterality,
          location: procedureDetails[proc.code]?.location,
        })),
      })

      if (result.error) {
        // Verificar se é erro de autenticação
        const authErrors = ["Não autenticado", "Token inválido", "Sessão inválida"]
        if (authErrors.some((e) => result.error?.includes(e))) {
          toast.error("Sessão expirada. Redirecionando para login...")
          router.push("/login?redirect=/atendimento/novo")
          return
        }
        toast.error(result.error || "Erro ao salvar atendimento")
        setIsSubmitting(false)
        return
      }

      toast.success("Atendimento registrado com sucesso!")
      setStep(6)
    } catch (error) {
      console.error("Error saving appointment:", error)
      toast.error("Erro ao salvar atendimento. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild className="rounded-2xl">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Step 1: Tipo de Atendimento */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">Vamos montar o atendimento</h1>
                <p className="text-lg text-muted-foreground text-balance">Escolha o tipo de atendimento realizado</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: "consulta", label: "Consulta", icon: Stethoscope, desc: "Avaliação e diagnóstico" },
                  { id: "retorno", label: "Retorno", icon: RotateCcw, desc: "Reavaliação do paciente" },
                  { id: "procedimento", label: "Procedimento", icon: Activity, desc: "Intervenção ou tratamento" },
                  { id: "exame", label: "Solicitação de exame", icon: TestTube, desc: "Pedido de exames" },
                ].map((type) => (
                  <Card
                    key={type.id}
                    className={cn(
                      "rounded-3xl cursor-pointer transition-all hover:shadow-lg",
                      appointmentType === type.id ? "border-secondary border-2 shadow-lg scale-105" : "border-border",
                    )}
                    onClick={() => setAppointmentType(type.id as AppointmentType)}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                          appointmentType === type.id ? "bg-secondary text-primary" : "bg-muted text-muted-foreground",
                        )}
                      >
                        <type.icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.label}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Contexto do Atendimento */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">Contexto do atendimento</h1>
                <p className="text-lg text-muted-foreground text-balance">Ajude-nos a entender melhor a situação</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Este é um...</label>
                  <div className="flex flex-wrap gap-3">
                    {appointmentContexts.map((ctx) => (
                      <Button
                        key={ctx.id}
                        variant={context === ctx.id ? "default" : "outline"}
                        className={cn(
                          "rounded-full px-6 py-5 text-base",
                          context === ctx.id ? "bg-secondary text-primary" : "bg-transparent",
                        )}
                        onClick={() => setContext(ctx.id)}
                      >
                        {ctx.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Tipo de urgência</label>
                  <div className="flex flex-wrap gap-3">
                    {urgencyLevels.map((level) => (
                      <Button
                        key={level.id}
                        variant={urgency === level.id ? "default" : "outline"}
                        className={cn(
                          "rounded-full px-6 py-5 text-base",
                          urgency === level.id ? "bg-secondary text-primary" : "bg-transparent",
                        )}
                        onClick={() => setUrgency(level.id)}
                      >
                        {level.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Buscar Procedimentos */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">O que foi feito?</h1>
                <p className="text-lg text-muted-foreground">
                  {filteredProcedures.length} procedimentos encontrados
                  {selectedProcedures.length > 0 && ` • ${selectedProcedures.length} selecionados`}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12 rounded-3xl">
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {tussGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Busque por nome ou código TUSS (ex: 10101012)"
                  className="pl-12 h-14 rounded-3xl text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredProcedures.map((proc) => {
                  const isSelected = selectedProcedures.some((p) => p.code === proc.code)
                  return (
                    <Card
                      key={proc.code}
                      className={cn(
                        "rounded-3xl transition-all hover:shadow-md",
                        isSelected ? "border-secondary border-2 shadow-md" : "border-border",
                      )}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <button
                            type="button"
                            onClick={() => handleProcedureToggle(proc)}
                            className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5",
                              isSelected ? "border-secondary bg-secondary" : "border-muted-foreground",
                            )}
                          >
                            {isSelected && <Check className="w-4 h-4 text-primary" />}
                          </button>
                          <div className="flex-1 space-y-1">
                            <p className="font-semibold">{proc.description}</p>
                            <p className="text-sm text-muted-foreground">Código: {proc.code}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {proc.group}
                              </Badge>
                              {proc.requiresAuth && (
                                <Badge variant="secondary" className="text-xs">
                                  Requer Autorização
                                </Badge>
                              )}
                              {proc.porte && (
                                <Badge variant="outline" className="text-xs">
                                  Porte {proc.porte}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredProcedures.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Nenhum procedimento encontrado. Tente ajustar os filtros ou busca.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Detalhes dos Procedimentos */}
          {step === 4 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">Vamos ajustar os detalhes</h1>
                <p className="text-lg text-muted-foreground text-balance">
                  Algumas informações adicionais sobre o que foi feito
                </p>
              </div>

              <div className="space-y-6">
                {selectedProcedures.map((proc) => (
                  <Card key={proc.code} className="rounded-3xl border-border">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-semibold text-lg">{proc.description}</h3>

                      {true && (
                        <div>
                          <label className="text-sm font-medium mb-3 block">Localização</label>
                          <div className="flex flex-wrap gap-2">
                            {lateralityOptions.map((opt) => (
                              <Button
                                key={opt.id}
                                variant={procedureDetails[proc.code]?.laterality === opt.id ? "default" : "outline"}
                                className={cn(
                                  "rounded-full",
                                  procedureDetails[proc.code]?.laterality === opt.id
                                    ? "bg-secondary text-primary"
                                    : "bg-transparent",
                                )}
                                onClick={() =>
                                  setProcedureDetails({
                                    ...procedureDetails,
                                    [proc.code]: { ...procedureDetails[proc.code], laterality: opt.id },
                                  })
                                }
                              >
                                {opt.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {true && (
                        <div>
                          <label className="text-sm font-medium mb-3 block">Onde foi realizado?</label>
                          <div className="flex flex-wrap gap-2">
                            {locationOptions.map((opt) => (
                              <Button
                                key={opt.id}
                                variant={procedureDetails[proc.code]?.location === opt.id ? "default" : "outline"}
                                className={cn(
                                  "rounded-full",
                                  procedureDetails[proc.code]?.location === opt.id
                                    ? "bg-secondary text-primary"
                                    : "bg-transparent",
                                )}
                                onClick={() =>
                                  setProcedureDetails({
                                    ...procedureDetails,
                                    [proc.code]: { ...procedureDetails[proc.code], location: opt.id },
                                  })
                                }
                              >
                                {opt.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Dados do Paciente e Resumo */}
          {step === 5 && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-balance">Dados do paciente</h1>
                <p className="text-lg text-muted-foreground text-balance">
                  Vincule a um paciente existente ou cadastre novo
                </p>
              </div>

              <Card className="rounded-3xl border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold">Buscar paciente existente</h3>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por nome ou CPF"
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      className="pl-10 h-12 rounded-2xl"
                    />
                    {isSearchingPatients && (
                      <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                  </div>

                  {patientSearchResults.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {patientSearchResults.map((patient) => (
                        <button
                          key={patient.id}
                          type="button"
                          onClick={() => {
                            setSelectedPatient(patient)
                            setPatientSearchQuery("")
                            setPatientSearchResults([])
                          }}
                          className={cn(
                            "w-full text-left p-4 rounded-2xl border-2 transition-all hover:shadow-md",
                            selectedPatient?.id === patient.id ? "border-secondary bg-secondary/10" : "border-border",
                          )}
                        >
                          <p className="font-semibold">{patient.full_name}</p>
                          <p className="text-sm text-muted-foreground">CPF: {patient.cpf}</p>
                          <p className="text-sm text-muted-foreground">Tel: {patient.phone}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {selectedPatient && (
                    <div className="p-4 bg-secondary/10 rounded-2xl border-2 border-secondary">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-lg">{selectedPatient.full_name}</p>
                          <p className="text-sm text-muted-foreground">CPF: {selectedPatient.cpf}</p>
                          <p className="text-sm text-muted-foreground">Tel: {selectedPatient.phone}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedPatient(null)}
                          className="text-muted-foreground"
                        >
                          Remover
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {selectedPatient && availableAppointments.length > 0 && (
                <Card className="rounded-3xl border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold">Vincular a agendamento (opcional)</h3>
                    </div>

                    <Select
                      value={linkedAppointmentId || "none"}
                      onValueChange={(v) => setLinkedAppointmentId(v === "none" ? null : v)}
                    >
                      <SelectTrigger className="h-12 rounded-2xl">
                        <SelectValue placeholder="Selecione um agendamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        {availableAppointments.map((apt) => (
                          <SelectItem key={apt.id} value={apt.id}>
                            {new Date(apt.appointment_date).toLocaleDateString()} - {apt.appointment_type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              )}

              {!selectedPatient && (
                <Card className="rounded-3xl border-border">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold mb-4">Ou cadastre um novo paciente</h3>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nome completo</label>
                      <Input
                        placeholder="Nome completo do paciente"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="rounded-2xl h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">CPF (opcional)</label>
                      <Input
                        placeholder="000.000.000-00"
                        value={patientCpf}
                        onChange={(e) => setPatientCpf(e.target.value)}
                        className="rounded-2xl h-12"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resumo do Atendimento */}
              <Card className="rounded-3xl border-border">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Resumo do atendimento</h3>

                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Tipo</p>
                    <p className="text-lg font-semibold capitalize">{appointmentType}</p>
                  </div>

                  <div className="pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground mb-1">Contexto</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-3 py-1 bg-muted rounded-full text-sm">{context}</span>
                      <span className="px-3 py-1 bg-muted rounded-full text-sm">{urgency}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Procedimentos realizados</p>
                    <div className="space-y-2">
                      {selectedProcedures.map((proc) => (
                        <div key={proc.code} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium">{proc.description}</p>
                            {procedureDetails[proc.code] && (
                              <div className="flex gap-2 mt-1">
                                {procedureDetails[proc.code].laterality && (
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                    {
                                      lateralityOptions.find((o) => o.id === procedureDetails[proc.code].laterality)
                                        ?.label
                                    }
                                  </span>
                                )}
                                {procedureDetails[proc.code].location && (
                                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                    {locationOptions.find((o) => o.id === procedureDetails[proc.code].location)?.label}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Collapsible TUSS codes */}
              <Card className="rounded-3xl border-border">
                <CardContent className="p-4">
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => setShowTussCodes(!showTussCodes)}
                  >
                    <span className="text-sm font-medium text-muted-foreground">Ver códigos TUSS</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", showTussCodes && "rotate-180")} />
                  </button>
                  {showTussCodes && (
                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      {selectedProcedures.map((proc) => (
                        <div key={proc.code} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{proc.description}</span>
                          <span className="font-mono font-medium">{proc.code}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 6: Registro Pronto */}
          {step === 6 && (
            <div className="space-y-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                  <Check className="w-12 h-12 text-secondary" strokeWidth={2} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl lg:text-5xl font-bold text-balance">Registro pronto</h1>
                  <p className="text-lg text-muted-foreground text-balance">
                    O atendimento foi registrado e está pronto para uso
                  </p>
                </div>
              </div>

              <Card className="rounded-3xl border-secondary bg-secondary/5">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    O registro TUSS foi gerado automaticamente com base no atendimento realizado
                  </p>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-3xl" asChild>
                  <Link href="/historico">Ver no histórico</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-3xl bg-transparent" asChild>
                  <Link href="/dashboard">Voltar ao início</Link>
                </Button>
              </div>

              <div className="flex justify-center">
                <Button variant="ghost" asChild className="rounded-3xl">
                  <Link href="/atendimento/novo">Fazer novo atendimento</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 6 && (
            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  className="rounded-full px-8 bg-transparent"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              )}
              {step < 5 && (
                <Button size="lg" onClick={handleNext} disabled={!canProceed()} className="rounded-full px-8 ml-auto">
                  Continuar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              {step === 5 && (
                <Button
                  size="lg"
                  onClick={handleSaveAppointment}
                  disabled={!canProceed() || isSubmitting}
                  className="rounded-full px-8 ml-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4 mr-2" />
                      Finalizar Atendimento
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
