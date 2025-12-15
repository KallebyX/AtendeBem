"use client"

import { useState } from "react"
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
  ChevronDown,
  FileCheck,
  AlertCircle,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { appointmentContexts, urgencyLevels, lateralityOptions, locationOptions } from "@/lib/tuss-data"
import { createAppointment } from "@/app/actions/appointments"
import { searchTUSSComplete, TUSS_CATEGORIES, TUSS_SPECIALTIES, type TUSSProcedureComplete } from "@/lib/tuss-complete"

type AppointmentType = "consulta" | "retorno" | "procedimento" | "exame"

export default function NovoAtendimentoPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [appointmentType, setAppointmentType] = useState<AppointmentType | null>(null)
  const [context, setContext] = useState("")
  const [urgency, setUrgency] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [selectedProcedures, setSelectedProcedures] = useState<TUSSProcedureComplete[]>([])
  const [procedureDetails, setProcedureDetails] = useState<Record<string, any>>({})
  const [showTussCodes, setShowTussCodes] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [patientName, setPatientName] = useState("")

  const filteredProcedures = searchTUSSComplete(searchQuery, {
    category: selectedCategory === "all" ? undefined : selectedCategory,
    specialty: selectedSpecialty === "all" ? undefined : selectedSpecialty,
  })

  const handleProcedureToggle = (proc: TUSSProcedureComplete) => {
    if (selectedProcedures.find((p) => p.code === proc.code)) {
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
    if (step === 4) {
      // Validar que todos procedimentos com requisitos obrigatórios foram preenchidos
      return selectedProcedures.every((proc) => {
        const details = procedureDetails[proc.code] || {}
        if (proc.requiresLaterality && !details.laterality) return false
        if (proc.requiresLocation && !details.location) return false
        return true
      })
    }
    if (step === 5) return patientName.trim() !== ""
    return true
  }

  const handleSaveAppointment = async () => {
    setIsSubmitting(true)

    try {
      const result = await createAppointment({
        patientName,
        appointmentType: appointmentType!,
        context,
        urgency,
        procedures: selectedProcedures.map((proc) => ({
          code: proc.code,
          friendlyName: proc.friendlyName,
          laterality: procedureDetails[proc.code]?.laterality,
          location: procedureDetails[proc.code]?.location,
        })),
      })

      if (result.error) {
        alert(result.error)
        setIsSubmitting(false)
        return
      }

      // Ir para tela de sucesso
      setStep(6)
    } catch (error) {
      console.error("[v0] Error saving appointment:", error)
      alert("Erro ao salvar atendimento")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
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
                <p className="text-lg text-muted-foreground">{filteredProcedures.length} procedimentos encontrados</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-12 rounded-3xl">
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {TUSS_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="h-12 rounded-3xl">
                    <SelectValue placeholder="Todas as especialidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {TUSS_SPECIALTIES.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Busque por nome, código TUSS ou palavra-chave"
                  className="pl-12 h-14 rounded-3xl text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2">
                {filteredProcedures.map((proc) => (
                  <Card
                    key={proc.code}
                    className={cn(
                      "rounded-3xl cursor-pointer transition-all hover:shadow-md",
                      selectedProcedures.find((p) => p.code === proc.code)
                        ? "border-secondary border-2 shadow-md"
                        : "border-border",
                    )}
                    onClick={() => {
                      if (selectedProcedures.find((p) => p.code === proc.code)) {
                        setSelectedProcedures(selectedProcedures.filter((p) => p.code !== proc.code))
                      } else {
                        setSelectedProcedures([...selectedProcedures, proc])
                      }
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5",
                            selectedProcedures.find((p) => p.code === proc.code)
                              ? "border-secondary bg-secondary"
                              : "border-muted-foreground",
                          )}
                        >
                          {selectedProcedures.find((p) => p.code === proc.code) && (
                            <Check className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="font-semibold">{proc.friendlyName}</p>
                          <p className="text-sm text-muted-foreground">{proc.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {proc.subcategory}
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
                ))}
              </div>

              {filteredProcedures.length === 0 && (
                <div className="text-center py-12">
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
                      <h3 className="font-semibold text-lg">{proc.friendlyName}</h3>

                      {proc.requiresLaterality && (
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

                      {proc.requiresLocation && (
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
                <p className="text-lg text-muted-foreground text-balance">Informe os dados básicos para o registro</p>
              </div>

              <Card className="rounded-3xl border-border">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nome do paciente</label>
                    <Input
                      placeholder="Nome completo"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="rounded-2xl h-12"
                    />
                  </div>
                </CardContent>
              </Card>

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
                            <p className="font-medium">{proc.friendlyName}</p>
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
                          <span className="text-muted-foreground">{proc.friendlyName}</span>
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

          {/* Navigation */}
          {step < 6 && (
            <div className="flex justify-between pt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="rounded-3xl bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={step === 5 ? handleSaveAppointment : handleNext}
                disabled={!canProceed() || isSubmitting}
                className="rounded-3xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : step === 5 ? (
                  <>
                    Gerar registro
                    <FileCheck className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
