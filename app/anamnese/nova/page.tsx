"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { NavigationHeader } from "@/components/navigation-header"
import { PatientSearchSelect } from "@/components/patient-search-select"
import { AlertCircle, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import { createAnamnesis, updateAnamnesisStep, getAnamnesisTemplates } from "@/app/actions/anamnesis"
import { toast } from "sonner"

const STEPS = [
  { id: 1, name: "Identificação", icon: FileText },
  { id: 2, name: "Queixa Principal", icon: FileText },
  { id: 3, name: "História da Doença", icon: FileText },
  { id: 4, name: "Antecedentes", icon: FileText },
  { id: 5, name: "Revisão de Sistemas", icon: FileText },
  { id: 6, name: "Exame Físico", icon: FileText },
  { id: 7, name: "Conduta", icon: FileText },
]

export default function NovaAnamesePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [anamnesisId, setAnamnesisId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [autoSaving, setAutoSaving] = useState(false)

  const [patients, setPatients] = useState<any[]>([])
  const [searchingPatients, setSearchingPatients] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [templates, setTemplates] = useState<any[]>([])

  const [formData, setFormData] = useState({
    specialty: "Clínica Geral",
    templateId: "",
    chiefComplaint: "",
    complaintDuration: "",
    complaintSeverity: "moderate" as "mild" | "moderate" | "severe",
    historyPresentIllness: "",
    symptomOnset: "",
    symptomProgression: "",
    associatedSymptoms: [] as string[],
    aggravatingFactors: [] as string[],
    relievingFactors: [] as string[],
    pastMedicalHistory: "",
    familyHistory: "",
    socialHistory: "",
    systemsReview: {
      cardiovascular: "",
      respiratory: "",
      gastrointestinal: "",
      genitourinary: "",
      musculoskeletal: "",
      neurological: "",
      psychiatric: "",
      endocrine: "",
    },
    physicalExam: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      respiratoryRate: "",
      generalExam: "",
      specificExam: "",
    },
    assessment: "",
    plan: "",
    diagnosticHypothesis: [] as string[],
    complementaryExams: [] as string[],
    prescriptions: "",
    referrals: "",
    followUp: "",
  })

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

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const result = await getAnamnesisTemplates()
        if (result.success) {
          setTemplates(result.templates || [])
        }
      } catch (err) {
        console.error("[v0] Error fetching templates:", err)
      }
    }
    fetchTemplates()
  }, [])

  useEffect(() => {
    if (!anamnesisId) return

    const interval = setInterval(() => {
      autoSave()
    }, 30000)

    return () => clearInterval(interval)
  }, [anamnesisId, formData, currentStep])

  async function autoSave() {
    if (!anamnesisId) return
    setAutoSaving(true)
    await updateAnamnesisStep(anamnesisId, currentStep, getStepData())
    setAutoSaving(false)
  }

  function getStepData() {
    switch (currentStep) {
      case 1:
        return { identification: { specialty: formData.specialty, templateId: formData.templateId } }
      case 2:
        return {
          chief_complaint: formData.chiefComplaint,
          chief_complaint_duration: formData.complaintDuration,
          chief_complaint_severity: formData.complaintSeverity,
        }
      case 3:
        return {
          history_present_illness: formData.historyPresentIllness,
          symptom_onset: formData.symptomOnset,
          symptom_progression: formData.symptomProgression,
          associated_symptoms: formData.associatedSymptoms,
          aggravating_factors: formData.aggravatingFactors,
          relieving_factors: formData.relievingFactors,
        }
      case 4:
        return {
          past_medical_history: formData.pastMedicalHistory,
          family_history: formData.familyHistory,
          social_history: formData.socialHistory,
        }
      case 5:
        return { systems_review: formData.systemsReview }
      case 6:
        return { physical_examination: formData.physicalExam }
      case 7:
        return {
          assessment: formData.assessment,
          plan: formData.plan,
          diagnostic_hypothesis: formData.diagnosticHypothesis,
          complementary_exams: formData.complementaryExams,
          prescriptions: formData.prescriptions,
          referrals: formData.referrals,
          follow_up: formData.followUp,
        }
      default:
        return {}
    }
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
  }

  async function handleNext() {
    setError("")
    setLoading(true)

    if (currentStep === 1) {
      if (!selectedPatient) {
        setError("Selecione um paciente")
        setLoading(false)
        return
      }

      const result = await createAnamnesis({
        patientId: selectedPatient.id,
        specialty: formData.specialty,
        templateId: formData.templateId || undefined,
      })

      if (result.error) {
        setError(result.error)
        toast.error(result.error)
        setLoading(false)
        return
      }

      if (result.data) {
        setAnamnesisId(result.data.id)
      }
    }

    if (anamnesisId && currentStep > 1) {
      const result = await updateAnamnesisStep(anamnesisId, currentStep, getStepData())

      if (result.error) {
        setError(result.error)
        toast.error(result.error)
        setLoading(false)
        return
      }
    }

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/anamnese")
    }

    setLoading(false)
  }

  function handlePrevious() {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const StepIcon = STEPS[currentStep - 1].icon

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader showBack backHref="/anamnese" />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Nova Anamnese
            </h1>
            <p className="text-muted-foreground leading-relaxed">Preencha os dados da anamnese do paciente</p>
          </div>

          {error && (
            <Card className="rounded-3xl border-red-500 bg-red-50 dark:bg-red-950">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {autoSaving && (
            <Badge variant="secondary" className="rounded-full">
              Salvando automaticamente...
            </Badge>
          )}

          {/* Progress Stepper */}
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center justify-between min-w-max">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-colors
                      ${
                        currentStep > step.id
                          ? "bg-green-500 text-white"
                          : currentStep === step.id
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      }
                    `}
                    >
                      {currentStep > step.id ? <FileText className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                    </div>
                    <span className="text-xs text-center whitespace-nowrap">{step.name}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-1 w-16 mx-2 ${currentStep > step.id ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Dados do Paciente */}
          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle>Dados do Paciente</CardTitle>
              <CardDescription>Selecione o paciente para esta anamnese</CardDescription>
            </CardHeader>
            <CardContent>
              <PatientSearchSelect onPatientSelect={handlePatientSelect} selectedPatient={selectedPatient} required />
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 ? <FileText className="h-6 w-6 text-primary" /> : StepIcon}
                {STEPS[currentStep - 1].name}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Selecione o paciente e configure a anamnese"}
                {currentStep === 2 && "Registre a queixa principal do paciente"}
                {currentStep === 3 && "Detalhe a história da doença atual"}
                {currentStep === 4 && "Registre os antecedentes médicos"}
                {currentStep === 5 && "Revise os sistemas do corpo"}
                {currentStep === 6 && "Registre os achados do exame físico"}
                {currentStep === 7 && "Finalize com avaliação e plano"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Identificação */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {selectedPatient && (
                    <Card className="rounded-2xl bg-muted">
                      <CardContent className="p-4 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Nome:</span> {selectedPatient.full_name}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">CPF:</span> {selectedPatient.cpf}
                        </p>
                        {selectedPatient.date_of_birth && (
                          <p className="text-sm">
                            <span className="font-medium">Nascimento:</span>{" "}
                            {new Date(selectedPatient.date_of_birth).toLocaleDateString("pt-BR")}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select
                      value={formData.specialty}
                      onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clínica Geral">Clínica Geral</SelectItem>
                        <SelectItem value="Cardiologia">Cardiologia</SelectItem>
                        <SelectItem value="Pediatria">Pediatria</SelectItem>
                        <SelectItem value="Ortopedia">Ortopedia</SelectItem>
                        <SelectItem value="Ginecologia">Ginecologia</SelectItem>
                        <SelectItem value="Dermatologia">Dermatologia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="template">Template (opcional)</Label>
                    <Select
                      value={formData.templateId}
                      onValueChange={(value) => setFormData({ ...formData, templateId: value })}
                    >
                      <SelectTrigger className="rounded-2xl">
                        <SelectValue placeholder="Sem template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                        {templates.length === 0 && (
                          <SelectItem value="none" disabled>
                            Nenhum template disponível
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Queixa Principal */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chiefComplaint">Queixa Principal *</Label>
                    <Textarea
                      id="chiefComplaint"
                      value={formData.chiefComplaint}
                      onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                      placeholder="Descreva a queixa principal do paciente..."
                      className="rounded-2xl min-h-24"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="complaintDuration">Duração</Label>
                      <Input
                        id="complaintDuration"
                        value={formData.complaintDuration}
                        onChange={(e) => setFormData({ ...formData, complaintDuration: e.target.value })}
                        placeholder="Ex: 3 dias, 2 semanas"
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="complaintSeverity">Severidade</Label>
                      <Select
                        value={formData.complaintSeverity}
                        onValueChange={(value: any) => setFormData({ ...formData, complaintSeverity: value })}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mild">Leve</SelectItem>
                          <SelectItem value="moderate">Moderada</SelectItem>
                          <SelectItem value="severe">Grave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: História da Doença Atual */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="historyPresentIllness">História da Doença Atual (HDA)</Label>
                    <Textarea
                      id="historyPresentIllness"
                      value={formData.historyPresentIllness}
                      onChange={(e) => setFormData({ ...formData, historyPresentIllness: e.target.value })}
                      placeholder="Descreva o início, evolução e características da doença..."
                      className="rounded-2xl min-h-32"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="symptomOnset">Início dos Sintomas</Label>
                      <Input
                        id="symptomOnset"
                        value={formData.symptomOnset}
                        onChange={(e) => setFormData({ ...formData, symptomOnset: e.target.value })}
                        placeholder="Ex: Súbito, gradual"
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="symptomProgression">Progressão</Label>
                      <Input
                        id="symptomProgression"
                        value={formData.symptomProgression}
                        onChange={(e) => setFormData({ ...formData, symptomProgression: e.target.value })}
                        placeholder="Ex: Constante, intermitente"
                        className="rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Sintomas Associados</Label>
                    <Input
                      placeholder="Digite um sintoma e pressione Enter"
                      className="rounded-2xl"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault()
                          setFormData({
                            ...formData,
                            associatedSymptoms: [...formData.associatedSymptoms, e.currentTarget.value.trim()],
                          })
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.associatedSymptoms.map((s, i) => (
                        <Badge key={i} variant="secondary" className="rounded-full">
                          {s}
                          <button
                            className="ml-2 text-red-600 hover:text-red-700"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                associatedSymptoms: formData.associatedSymptoms.filter((_, idx) => idx !== i),
                              })
                            }
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Antecedentes */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pastMedicalHistory">Antecedentes Pessoais</Label>
                    <Textarea
                      id="pastMedicalHistory"
                      value={formData.pastMedicalHistory}
                      onChange={(e) => setFormData({ ...formData, pastMedicalHistory: e.target.value })}
                      placeholder="Doenças prévias, cirurgias, alergias, medicamentos em uso..."
                      className="rounded-2xl min-h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="familyHistory">Antecedentes Familiares</Label>
                    <Textarea
                      id="familyHistory"
                      value={formData.familyHistory}
                      onChange={(e) => setFormData({ ...formData, familyHistory: e.target.value })}
                      placeholder="Histórico familiar de doenças..."
                      className="rounded-2xl min-h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="socialHistory">História Social</Label>
                    <Textarea
                      id="socialHistory"
                      value={formData.socialHistory}
                      onChange={(e) => setFormData({ ...formData, socialHistory: e.target.value })}
                      placeholder="Tabagismo, etilismo, atividade física, profissão..."
                      className="rounded-2xl min-h-20"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Revisão de Sistemas */}
              {currentStep === 5 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: "cardiovascular", label: "Cardiovascular", icon: FileText },
                    { key: "respiratory", label: "Respiratório", icon: FileText },
                    { key: "gastrointestinal", label: "Digestivo", icon: FileText },
                    { key: "genitourinary", label: "Urinário", icon: FileText },
                    { key: "musculoskeletal", label: "Musculoesquelético", icon: FileText },
                    { key: "neurological", label: "Neurológico", icon: FileText },
                    { key: "psychiatric", label: "Psiquiátrico", icon: FileText },
                    { key: "endocrine", label: "Endócrino", icon: FileText },
                  ].map((system) => {
                    return (
                      <div key={system.key} className="space-y-2">
                        <Label htmlFor={system.key} className="flex items-center gap-2">
                          {system.icon}
                          {system.label}
                        </Label>
                        <Textarea
                          id={system.key}
                          value={formData.systemsReview[system.key as keyof typeof formData.systemsReview]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              systemsReview: {
                                ...formData.systemsReview,
                                [system.key]: e.target.value,
                              },
                            })
                          }
                          placeholder="Sem alterações ou descrever..."
                          className="rounded-2xl min-h-16"
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Step 6: Exame Físico */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodPressure">PA (mmHg)</Label>
                      <Input
                        id="bloodPressure"
                        value={formData.physicalExam.bloodPressure}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            physicalExam: { ...formData.physicalExam, bloodPressure: e.target.value },
                          })
                        }
                        placeholder="120/80"
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heartRate">FC (bpm)</Label>
                      <Input
                        id="heartRate"
                        value={formData.physicalExam.heartRate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            physicalExam: { ...formData.physicalExam, heartRate: e.target.value },
                          })
                        }
                        placeholder="72"
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temp (°C)</Label>
                      <Input
                        id="temperature"
                        value={formData.physicalExam.temperature}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            physicalExam: { ...formData.physicalExam, temperature: e.target.value },
                          })
                        }
                        placeholder="36.5"
                        className="rounded-2xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="respiratoryRate">FR (irpm)</Label>
                      <Input
                        id="respiratoryRate"
                        value={formData.physicalExam.respiratoryRate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            physicalExam: { ...formData.physicalExam, respiratoryRate: e.target.value },
                          })
                        }
                        placeholder="16"
                        className="rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="generalExam">Exame Geral</Label>
                    <Textarea
                      id="generalExam"
                      value={formData.physicalExam.generalExam}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalExam: { ...formData.physicalExam, generalExam: e.target.value },
                        })
                      }
                      placeholder="Estado geral, nível de consciência, hidratação, nutrição..."
                      className="rounded-2xl min-h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specificExam">Exame Específico</Label>
                    <Textarea
                      id="specificExam"
                      value={formData.physicalExam.specificExam}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          physicalExam: { ...formData.physicalExam, specificExam: e.target.value },
                        })
                      }
                      placeholder="Exame específico de acordo com a queixa..."
                      className="rounded-2xl min-h-32"
                    />
                  </div>
                </div>
              )}

              {/* Step 7: Conduta */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Hipóteses Diagnósticas (CID-10)</Label>
                    <Input
                      placeholder="Digite o CID-10 e pressione Enter (Ex: J00 - Rinofaringite aguda)"
                      className="rounded-2xl"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault()
                          setFormData({
                            ...formData,
                            diagnosticHypothesis: [...formData.diagnosticHypothesis, e.currentTarget.value.trim()],
                          })
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.diagnosticHypothesis.map((h, i) => (
                        <Badge key={i} variant="outline" className="rounded-full">
                          {h}
                          <button
                            className="ml-2 text-red-600 hover:text-red-700"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                diagnosticHypothesis: formData.diagnosticHypothesis.filter((_, idx) => idx !== i),
                              })
                            }
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="assessment">Avaliação</Label>
                    <Textarea
                      id="assessment"
                      value={formData.assessment}
                      onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
                      placeholder="Avaliação clínica geral..."
                      className="rounded-2xl min-h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plan">Plano Terapêutico</Label>
                    <Textarea
                      id="plan"
                      value={formData.plan}
                      onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                      placeholder="Conduta, tratamento proposto, orientações..."
                      className="rounded-2xl min-h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Exames Complementares</Label>
                    <Input
                      placeholder="Digite um exame e pressione Enter"
                      className="rounded-2xl"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value.trim()) {
                          e.preventDefault()
                          setFormData({
                            ...formData,
                            complementaryExams: [...formData.complementaryExams, e.currentTarget.value.trim()],
                          })
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.complementaryExams.map((exam, i) => (
                        <Badge key={i} variant="secondary" className="rounded-full">
                          {exam}
                          <button
                            className="ml-2 text-red-600 hover:text-red-700"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                complementaryExams: formData.complementaryExams.filter((_, idx) => idx !== i),
                              })
                            }
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prescriptions">Prescrições</Label>
                    <Textarea
                      id="prescriptions"
                      value={formData.prescriptions}
                      onChange={(e) => setFormData({ ...formData, prescriptions: e.target.value })}
                      placeholder="Medicamentos prescritos..."
                      className="rounded-2xl min-h-20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="followUp">Retorno / Acompanhamento</Label>
                    <Input
                      id="followUp"
                      value={formData.followUp}
                      onChange={(e) => setFormData({ ...formData, followUp: e.target.value })}
                      placeholder="Ex: Retorno em 7 dias"
                      className="rounded-2xl"
                    />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 1 || loading}
                  variant="outline"
                  className="rounded-2xl bg-transparent"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                <Button onClick={handleNext} disabled={loading} className="rounded-2xl">
                  {loading ? "Salvando..." : currentStep === 7 ? "Concluir Anamnese" : "Próximo"}
                  {currentStep < 7 && !loading && <FileText className="w-4 h-4 ml-2" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
