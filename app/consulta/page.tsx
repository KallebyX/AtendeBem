"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/navigation-header"
import { PatientSearchSelect } from "@/components/patient-search-select"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Stethoscope,
  FileText,
  Pill,
  TestTube,
  ClipboardList,
  Save,
  Loader2,
  User,
  Heart,
  AlertTriangle,
  Plus,
  X,
  Calendar,
  Activity,
  FileCheck,
  Printer,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { createAppointment } from "@/app/actions/appointments"
import { createAnamnesis } from "@/app/actions/anamnesis"
import { createPrescription } from "@/app/actions/prescriptions"
import { createLabOrder } from "@/app/actions/laboratory"

// Types
interface Patient {
  id: string
  full_name: string
  cpf: string
  date_of_birth?: string
  gender?: string
  phone?: string
  email?: string
  blood_type?: string
  allergies?: string
  chronic_conditions?: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  quantity: string
  instructions: string
}

interface ExamRequest {
  id: string
  name: string
  type: string
  urgency: string
  notes: string
}

// Steps configuration
const STEPS = [
  { id: 1, name: "Paciente", icon: User, description: "Identificar paciente" },
  { id: 2, name: "Anamnese", icon: ClipboardList, description: "Queixa e histórico" },
  { id: 3, name: "Exame Físico", icon: Stethoscope, description: "Avaliação clínica" },
  { id: 4, name: "Diagnóstico", icon: Activity, description: "CID e conduta" },
  { id: 5, name: "Receitas", icon: Pill, description: "Prescrições médicas" },
  { id: 6, name: "Exames", icon: TestTube, description: "Solicitações" },
  { id: 7, name: "Finalizar", icon: FileCheck, description: "Resumo e salvar" },
]

export default function ConsultaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const patientIdFromUrl = searchParams.get("patient_id")

  // Main state
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consultationId, setConsultationId] = useState<string | null>(null)

  // Step 1: Patient
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  // Step 2: Anamnesis
  const [anamnesis, setAnamnesis] = useState({
    chiefComplaint: "",
    historyOfPresentIllness: "",
    pastMedicalHistory: "",
    familyHistory: "",
    socialHistory: "",
    currentMedications: "",
    allergies: "",
  })

  // Step 3: Physical Exam
  const [physicalExam, setPhysicalExam] = useState({
    generalAppearance: "",
    vitalSigns: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      weight: "",
      height: "",
    },
    cardiovascular: "",
    respiratory: "",
    abdominal: "",
    neurological: "",
    musculoskeletal: "",
    skin: "",
    other: "",
  })

  // Step 4: Diagnosis
  const [diagnosis, setDiagnosis] = useState({
    primaryDiagnosis: "",
    cid10Code: "",
    cid10Description: "",
    secondaryDiagnoses: [] as string[],
    clinicalNotes: "",
    treatmentPlan: "",
  })

  // Step 5: Prescriptions
  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState<Medication>({
    id: "",
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    quantity: "",
    instructions: "",
  })

  // Step 6: Exams
  const [examRequests, setExamRequests] = useState<ExamRequest[]>([])
  const [newExam, setNewExam] = useState<ExamRequest>({
    id: "",
    name: "",
    type: "laboratorial",
    urgency: "rotina",
    notes: "",
  })

  // Navigation
  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPatient !== null
      case 2:
        return anamnesis.chiefComplaint.trim() !== ""
      default:
        return true
    }
  }

  // Add medication
  const handleAddMedication = () => {
    if (!newMedication.name.trim()) {
      toast.error("Nome do medicamento obrigatório")
      return
    }
    setMedications([...medications, { ...newMedication, id: Date.now().toString() }])
    setNewMedication({
      id: "",
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      quantity: "",
      instructions: "",
    })
  }

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id))
  }

  // Add exam
  const handleAddExam = () => {
    if (!newExam.name.trim()) {
      toast.error("Nome do exame obrigatório")
      return
    }
    setExamRequests([...examRequests, { ...newExam, id: Date.now().toString() }])
    setNewExam({
      id: "",
      name: "",
      type: "laboratorial",
      urgency: "rotina",
      notes: "",
    })
  }

  const handleRemoveExam = (id: string) => {
    setExamRequests(examRequests.filter((e) => e.id !== id))
  }

  // Final submit
  const handleSubmit = async () => {
    if (!selectedPatient) {
      toast.error("Paciente não selecionado")
      return
    }

    setIsSubmitting(true)

    try {
      // 1. Create appointment
      const appointmentResult = await createAppointment({
        patientName: selectedPatient.full_name,
        patientCpf: selectedPatient.cpf,
        appointmentType: "consulta",
        context: "presencial",
        urgency: "eletivo",
        procedures: [],
        linkedAppointmentId: null,
      })

      if (appointmentResult.error) {
        throw new Error(appointmentResult.error)
      }

      const appointmentId = appointmentResult.appointment?.id

      // 2. Create anamnesis if data exists
      if (anamnesis.chiefComplaint) {
        await createAnamnesis({
          patient_id: selectedPatient.id,
          appointment_id: appointmentId,
          chief_complaint: anamnesis.chiefComplaint,
          history_present_illness: anamnesis.historyOfPresentIllness,
          past_medical_history: {
            general: anamnesis.pastMedicalHistory,
            family: anamnesis.familyHistory,
            social: anamnesis.socialHistory,
          },
          medications: anamnesis.currentMedications ? [anamnesis.currentMedications] : [],
          allergies: anamnesis.allergies ? [anamnesis.allergies] : [],
          physical_exam: JSON.stringify(physicalExam),
          assessment: diagnosis.primaryDiagnosis,
          plan: diagnosis.treatmentPlan,
        })
      }

      // 3. Create prescriptions if medications exist
      if (medications.length > 0) {
        await createPrescription({
          patientId: selectedPatient.id,
          appointmentId: appointmentId,
          cid10Code: diagnosis.cid10Code,
          cid10Description: diagnosis.cid10Description,
          clinicalIndication: diagnosis.primaryDiagnosis,
          medications: medications.map((m) => ({
            medicationName: m.name,
            dosage: m.dosage,
            frequency: m.frequency,
            duration: m.duration,
            quantity: m.quantity,
            administrationInstructions: m.instructions,
          })),
        })
      }

      // 4. Create lab orders if exams exist
      if (examRequests.length > 0) {
        await createLabOrder({
          patient_id: selectedPatient.id,
          appointment_id: appointmentId,
          clinical_indication: diagnosis.primaryDiagnosis,
          exams: examRequests.map((e) => ({
            exam_name: e.name,
            exam_type: e.type,
            urgency: e.urgency,
            notes: e.notes,
          })),
        })
      }

      setConsultationId(appointmentId)
      toast.success("Consulta salva com sucesso!")
      setCurrentStep(7) // Go to summary
    } catch (error: any) {
      console.error("Error saving consultation:", error)
      toast.error(error.message || "Erro ao salvar consulta")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate BMI
  const calculateBMI = () => {
    const weight = parseFloat(physicalExam.vitalSigns.weight)
    const height = parseFloat(physicalExam.vitalSigns.height) / 100 // cm to m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1)
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Nova Consulta</h1>
            <p className="text-muted-foreground">
              Atendimento completo integrado
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center overflow-x-auto pb-2">
            <div className="flex gap-2">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                  disabled={step.id > currentStep}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm whitespace-nowrap",
                    currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : step.id < currentStep
                        ? "bg-secondary text-secondary-foreground cursor-pointer"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{step.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="rounded-3xl">
            <CardContent className="p-6">
              {/* Step 1: Patient Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <User className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Identificar Paciente</h2>
                    <p className="text-muted-foreground">Busque ou cadastre o paciente</p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <PatientSearchSelect
                      onPatientSelect={setSelectedPatient}
                      selectedPatient={selectedPatient}
                      label="Buscar paciente"
                      required
                    />
                  </div>

                  {selectedPatient && (
                    <Card className="max-w-md mx-auto border-secondary">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <h3 className="font-semibold">{selectedPatient.full_name}</h3>
                            <p className="text-sm text-muted-foreground">CPF: {selectedPatient.cpf}</p>
                            {selectedPatient.date_of_birth && (
                              <p className="text-sm text-muted-foreground">
                                Nascimento: {new Date(selectedPatient.date_of_birth).toLocaleDateString("pt-BR")}
                              </p>
                            )}
                            {selectedPatient.phone && (
                              <p className="text-sm text-muted-foreground">Tel: {selectedPatient.phone}</p>
                            )}
                          </div>
                        </div>

                        {(selectedPatient.allergies || selectedPatient.chronic_conditions) && (
                          <div className="mt-4 pt-4 border-t space-y-2">
                            {selectedPatient.allergies && (
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-red-600">Alergias</p>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.allergies}</p>
                                </div>
                              </div>
                            )}
                            {selectedPatient.chronic_conditions && (
                              <div className="flex items-start gap-2">
                                <Heart className="w-4 h-4 text-orange-500 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-orange-600">Condições Crônicas</p>
                                  <p className="text-sm text-muted-foreground">{selectedPatient.chronic_conditions}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Step 2: Anamnesis */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <ClipboardList className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Anamnese</h2>
                    <p className="text-muted-foreground">Queixa principal e histórico</p>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Queixa Principal *</Label>
                      <Textarea
                        value={anamnesis.chiefComplaint}
                        onChange={(e) => setAnamnesis({ ...anamnesis, chiefComplaint: e.target.value })}
                        placeholder="Descreva o motivo principal da consulta..."
                        className="min-h-24 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">História da Doença Atual (HDA)</Label>
                      <Textarea
                        value={anamnesis.historyOfPresentIllness}
                        onChange={(e) => setAnamnesis({ ...anamnesis, historyOfPresentIllness: e.target.value })}
                        placeholder="Início, evolução, fatores de melhora/piora..."
                        className="min-h-24 rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Antecedentes Pessoais</Label>
                        <Textarea
                          value={anamnesis.pastMedicalHistory}
                          onChange={(e) => setAnamnesis({ ...anamnesis, pastMedicalHistory: e.target.value })}
                          placeholder="Doenças prévias, cirurgias..."
                          className="min-h-20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Antecedentes Familiares</Label>
                        <Textarea
                          value={anamnesis.familyHistory}
                          onChange={(e) => setAnamnesis({ ...anamnesis, familyHistory: e.target.value })}
                          placeholder="Histórico familiar..."
                          className="min-h-20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Medicamentos em Uso</Label>
                        <Textarea
                          value={anamnesis.currentMedications}
                          onChange={(e) => setAnamnesis({ ...anamnesis, currentMedications: e.target.value })}
                          placeholder="Lista de medicamentos atuais..."
                          className="min-h-20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Alergias</Label>
                        <Textarea
                          value={anamnesis.allergies}
                          onChange={(e) => setAnamnesis({ ...anamnesis, allergies: e.target.value })}
                          placeholder="Alergias conhecidas..."
                          className="min-h-20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Hábitos de Vida</Label>
                      <Textarea
                        value={anamnesis.socialHistory}
                        onChange={(e) => setAnamnesis({ ...anamnesis, socialHistory: e.target.value })}
                        placeholder="Tabagismo, etilismo, atividade física, dieta..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Physical Exam */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <Stethoscope className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Exame Físico</h2>
                    <p className="text-muted-foreground">Avaliação clínica do paciente</p>
                  </div>

                  {/* Vital Signs */}
                  <Card className="rounded-2xl">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Sinais Vitais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">PA (mmHg)</Label>
                          <Input
                            value={physicalExam.vitalSigns.bloodPressure}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, bloodPressure: e.target.value },
                              })
                            }
                            placeholder="120/80"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">FC (bpm)</Label>
                          <Input
                            value={physicalExam.vitalSigns.heartRate}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, heartRate: e.target.value },
                              })
                            }
                            placeholder="72"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Temp (C)</Label>
                          <Input
                            value={physicalExam.vitalSigns.temperature}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, temperature: e.target.value },
                              })
                            }
                            placeholder="36.5"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">FR (irpm)</Label>
                          <Input
                            value={physicalExam.vitalSigns.respiratoryRate}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, respiratoryRate: e.target.value },
                              })
                            }
                            placeholder="16"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">SpO2 (%)</Label>
                          <Input
                            value={physicalExam.vitalSigns.oxygenSaturation}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, oxygenSaturation: e.target.value },
                              })
                            }
                            placeholder="98"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Peso (kg)</Label>
                          <Input
                            value={physicalExam.vitalSigns.weight}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, weight: e.target.value },
                              })
                            }
                            placeholder="70"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Altura (cm)</Label>
                          <Input
                            value={physicalExam.vitalSigns.height}
                            onChange={(e) =>
                              setPhysicalExam({
                                ...physicalExam,
                                vitalSigns: { ...physicalExam.vitalSigns, height: e.target.value },
                              })
                            }
                            placeholder="170"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">IMC</Label>
                          <Input
                            value={calculateBMI() || ""}
                            readOnly
                            placeholder="--"
                            className="rounded-xl bg-muted"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Exams */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Estado Geral</Label>
                      <Textarea
                        value={physicalExam.generalAppearance}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, generalAppearance: e.target.value })}
                        placeholder="BEG, LOC, corado, hidratado..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Cardiovascular</Label>
                      <Textarea
                        value={physicalExam.cardiovascular}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, cardiovascular: e.target.value })}
                        placeholder="RCR 2T, BNF, s/ sopros..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Respiratório</Label>
                      <Textarea
                        value={physicalExam.respiratory}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, respiratory: e.target.value })}
                        placeholder="MV+ bilateral, s/ RA..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Abdome</Label>
                      <Textarea
                        value={physicalExam.abdominal}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, abdominal: e.target.value })}
                        placeholder="Plano, flácido, RHA+, indolor..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Neurológico</Label>
                      <Textarea
                        value={physicalExam.neurological}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, neurological: e.target.value })}
                        placeholder="Glasgow 15, pupilas isocóricas..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Outros Achados</Label>
                      <Textarea
                        value={physicalExam.other}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, other: e.target.value })}
                        placeholder="Outros achados relevantes..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Diagnosis */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <Activity className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Diagnóstico e Conduta</h2>
                    <p className="text-muted-foreground">Hipótese diagnóstica e plano terapêutico</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Diagnóstico Principal</Label>
                      <Textarea
                        value={diagnosis.primaryDiagnosis}
                        onChange={(e) => setDiagnosis({ ...diagnosis, primaryDiagnosis: e.target.value })}
                        placeholder="Descreva o diagnóstico principal..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Código CID-10</Label>
                        <Input
                          value={diagnosis.cid10Code}
                          onChange={(e) => setDiagnosis({ ...diagnosis, cid10Code: e.target.value })}
                          placeholder="Ex: J06.9"
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Descrição CID-10</Label>
                        <Input
                          value={diagnosis.cid10Description}
                          onChange={(e) => setDiagnosis({ ...diagnosis, cid10Description: e.target.value })}
                          placeholder="Ex: Infecção aguda das vias aéreas superiores"
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Notas Clínicas</Label>
                      <Textarea
                        value={diagnosis.clinicalNotes}
                        onChange={(e) => setDiagnosis({ ...diagnosis, clinicalNotes: e.target.value })}
                        placeholder="Observações adicionais..."
                        className="min-h-20 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base font-semibold">Plano Terapêutico / Conduta</Label>
                      <Textarea
                        value={diagnosis.treatmentPlan}
                        onChange={(e) => setDiagnosis({ ...diagnosis, treatmentPlan: e.target.value })}
                        placeholder="Descreva o plano de tratamento, orientações..."
                        className="min-h-24 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Prescriptions */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <Pill className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Prescrições Médicas</h2>
                    <p className="text-muted-foreground">Adicione os medicamentos prescritos</p>
                  </div>

                  {/* Add New Medication */}
                  <Card className="rounded-2xl border-dashed">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Adicionar Medicamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome do Medicamento *</Label>
                          <Input
                            value={newMedication.name}
                            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                            placeholder="Ex: Amoxicilina 500mg"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Dosagem</Label>
                          <Input
                            value={newMedication.dosage}
                            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                            placeholder="Ex: 1 comprimido"
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Frequência</Label>
                          <Input
                            value={newMedication.frequency}
                            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                            placeholder="Ex: 8/8h"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Duração</Label>
                          <Input
                            value={newMedication.duration}
                            onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
                            placeholder="Ex: 7 dias"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Quantidade</Label>
                          <Input
                            value={newMedication.quantity}
                            onChange={(e) => setNewMedication({ ...newMedication, quantity: e.target.value })}
                            placeholder="Ex: 21 comprimidos"
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Instruções de Uso</Label>
                        <Textarea
                          value={newMedication.instructions}
                          onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                          placeholder="Ex: Tomar após as refeições com água"
                          className="rounded-xl"
                        />
                      </div>
                      <Button onClick={handleAddMedication} className="rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Medication List */}
                  {medications.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold">Medicamentos Adicionados ({medications.length})</h3>
                      {medications.map((med, index) => (
                        <Card key={med.id} className="rounded-2xl">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{index + 1}</Badge>
                                  <h4 className="font-semibold">{med.name}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {med.dosage} - {med.frequency} - {med.duration}
                                </p>
                                {med.quantity && (
                                  <p className="text-sm text-muted-foreground">Quantidade: {med.quantity}</p>
                                )}
                                {med.instructions && (
                                  <p className="text-sm text-muted-foreground">{med.instructions}</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveMedication(med.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {medications.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Pill className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum medicamento adicionado</p>
                      <p className="text-sm">Você pode pular esta etapa se não houver prescrição</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Exams */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <TestTube className="w-12 h-12 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold">Solicitação de Exames</h2>
                    <p className="text-muted-foreground">Adicione os exames necessários</p>
                  </div>

                  {/* Add New Exam */}
                  <Card className="rounded-2xl border-dashed">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Adicionar Exame
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Nome do Exame *</Label>
                          <Input
                            value={newExam.name}
                            onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                            placeholder="Ex: Hemograma completo"
                            className="rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo</Label>
                          <select
                            value={newExam.type}
                            onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                          >
                            <option value="laboratorial">Laboratorial</option>
                            <option value="imagem">Imagem</option>
                            <option value="cardiologico">Cardiológico</option>
                            <option value="endoscopia">Endoscopia</option>
                            <option value="outros">Outros</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Urgência</Label>
                          <select
                            value={newExam.urgency}
                            onChange={(e) => setNewExam({ ...newExam, urgency: e.target.value })}
                            className="w-full h-10 px-3 rounded-xl border border-input bg-background"
                          >
                            <option value="rotina">Rotina</option>
                            <option value="urgente">Urgente</option>
                            <option value="emergencia">Emergência</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Observações</Label>
                          <Input
                            value={newExam.notes}
                            onChange={(e) => setNewExam({ ...newExam, notes: e.target.value })}
                            placeholder="Instruções especiais..."
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <Button onClick={handleAddExam} className="rounded-xl">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Exam List */}
                  {examRequests.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold">Exames Solicitados ({examRequests.length})</h3>
                      {examRequests.map((exam, index) => (
                        <Card key={exam.id} className="rounded-2xl">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{index + 1}</Badge>
                                  <h4 className="font-semibold">{exam.name}</h4>
                                  <Badge
                                    variant={exam.urgency === "urgente" ? "destructive" : "secondary"}
                                    className="text-xs"
                                  >
                                    {exam.urgency}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground capitalize">Tipo: {exam.type}</p>
                                {exam.notes && <p className="text-sm text-muted-foreground">{exam.notes}</p>}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveExam(exam.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {examRequests.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <TestTube className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum exame solicitado</p>
                      <p className="text-sm">Você pode pular esta etapa se não houver exames</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 7: Summary */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <FileCheck className="w-12 h-12 mx-auto text-green-500" />
                    <h2 className="text-2xl font-bold">Consulta Registrada!</h2>
                    <p className="text-muted-foreground">Resumo do atendimento</p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Paciente
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">{selectedPatient?.full_name}</p>
                        <p className="text-sm text-muted-foreground">CPF: {selectedPatient?.cpf}</p>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Diagnóstico
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">{diagnosis.primaryDiagnosis || "Não informado"}</p>
                        {diagnosis.cid10Code && (
                          <p className="text-sm text-muted-foreground">CID-10: {diagnosis.cid10Code}</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Pill className="w-5 h-5" />
                          Prescrições
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">{medications.length} medicamento(s)</p>
                        {medications.map((m) => (
                          <p key={m.id} className="text-sm text-muted-foreground">
                            {m.name}
                          </p>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <TestTube className="w-5 h-5" />
                          Exames
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">{examRequests.length} exame(s)</p>
                        {examRequests.map((e) => (
                          <p key={e.id} className="text-sm text-muted-foreground">
                            {e.name}
                          </p>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 justify-center pt-4">
                    <Button variant="outline" className="rounded-xl" asChild>
                      <Link href={`/crm/${selectedPatient?.id}`}>
                        <User className="w-4 h-4 mr-2" />
                        Ver Paciente
                      </Link>
                    </Button>
                    <Button variant="outline" className="rounded-xl" asChild>
                      <Link href="/receitas">
                        <Printer className="w-4 h-4 mr-2" />
                        Imprimir Receita
                      </Link>
                    </Button>
                    <Button className="rounded-xl" asChild>
                      <Link href="/consulta">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Consulta
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button variant="outline" size="lg" onClick={handleBack} className="rounded-full px-8" disabled={isSubmitting}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <Button size="lg" onClick={handleNext} disabled={!canProceed()} className="rounded-full px-8">
                  Continuar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceed()}
                  className="rounded-full px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Consulta
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
