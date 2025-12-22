'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NavigationHeader } from '@/components/navigation-header'
import { PatientSearchSelect } from '@/components/patient-search-select'
import {
  createAnamnesis,
  updateAnamnesisStep,
  getAnamnesisTemplates
} from '@/app/actions/anamnesis'
import { ChevronLeft, ChevronRight, Check, FileText, User, Activity, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const STEPS = [
  { id: 1, name: 'Identificacao', icon: User },
  { id: 2, name: 'Queixa Principal', icon: FileText },
  { id: 3, name: 'Historia da Doenca', icon: Activity },
  { id: 4, name: 'Antecedentes', icon: FileText },
  { id: 5, name: 'Revisao de Sistemas', icon: Activity },
  { id: 6, name: 'Exame Fisico', icon: Activity },
  { id: 7, name: 'Conduta', icon: Check }
]

export default function AnamnesiPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [anamnesisId, setAnamnesisId] = useState<string | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState({
    identification: {},
    chief_complaint: '',
    complaint_duration: '',
    history_present_illness: '',
    associated_symptoms: [] as string[],
    past_medical_history: {},
    family_history: {},
    social_history: {},
    systems_review: {},
    physical_examination: {},
    vital_signs: { bp: '', hr: '', temp: '', rr: '', spo2: '' },
    diagnostic_hypothesis: [] as string[],
    treatment_plan: '',
    prescriptions: ''
  })

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    if (!anamnesisId) return
    const interval = setInterval(() => { autoSave() }, 30000)
    return () => clearInterval(interval)
  }, [anamnesisId, formData, currentStep])

  async function loadTemplates() {
    const result = await getAnamnesisTemplates()
    if (result.data) setTemplates(result.data)
  }

  async function autoSave() {
    if (!anamnesisId) return
    setAutoSaving(true)
    await updateAnamnesisStep({
      anamnesis_id: anamnesisId,
      step: currentStep,
      data: getStepData()
    })
    setAutoSaving(false)
  }

  function getStepData() {
    switch (currentStep) {
      case 1: return { identification: formData.identification }
      case 2: return { chief_complaint: formData.chief_complaint, complaint_duration: formData.complaint_duration }
      case 3: return { history_present_illness: formData.history_present_illness, associated_symptoms: formData.associated_symptoms }
      case 4: return { past_medical_history: formData.past_medical_history, family_history: formData.family_history, social_history: formData.social_history }
      case 5: return { systems_review: formData.systems_review }
      case 6: return { physical_examination: { ...formData.physical_examination, vital_signs: formData.vital_signs } }
      case 7: return { diagnostic_hypothesis: formData.diagnostic_hypothesis, treatment_plan: formData.treatment_plan, prescriptions: formData.prescriptions }
      default: return {}
    }
  }

  async function handleNext() {
    if (currentStep === 1 && !selectedPatient) {
      toast.error('Selecione um paciente para continuar')
      return
    }

    setLoading(true)

    if (!anamnesisId && currentStep === 1) {
      const result = await createAnamnesis({ patient_id: selectedPatient.id })
      if (result.data) {
        setAnamnesisId(result.data.id)
        toast.success('Anamnese iniciada!')
      } else {
        toast.error(result.error || 'Erro ao criar anamnese')
        setLoading(false)
        return
      }
    }

    if (anamnesisId) {
      const result = await updateAnamnesisStep({
        anamnesis_id: anamnesisId,
        step: currentStep,
        data: getStepData()
      })
      if (!result.success) {
        toast.error(result.error || 'Erro ao salvar')
        setLoading(false)
        return
      }
    }

    if (currentStep < 7) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowSuccess(true)
      toast.success('Anamnese concluida com sucesso!')
    }

    setLoading(false)
  }

  function handlePrevious() {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  function handlePatientSelect(patient: any) {
    setSelectedPatient(patient)
    if (patient) {
      setFormData({
        ...formData,
        identification: {
          name: patient.full_name,
          cpf: patient.cpf,
          date_of_birth: patient.date_of_birth,
          gender: patient.gender,
          phone: patient.phone
        }
      })
    }
  }

  function resetForm() {
    setShowSuccess(false)
    setCurrentStep(1)
    setAnamnesisId(null)
    setSelectedPatient(null)
    setFormData({
      identification: {},
      chief_complaint: '',
      complaint_duration: '',
      history_present_illness: '',
      associated_symptoms: [],
      past_medical_history: {},
      family_history: {},
      social_history: {},
      systems_review: {},
      physical_examination: {},
      vital_signs: { bp: '', hr: '', temp: '', rr: '', spo2: '' },
      diagnostic_hypothesis: [],
      treatment_plan: '',
      prescriptions: ''
    })
  }

  const StepIcon = STEPS[currentStep - 1].icon

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="container mx-auto p-6 max-w-2xl">
          <Card className="text-center p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Anamnese Concluida!</h2>
            <p className="text-muted-foreground mb-6">
              A anamnese de {selectedPatient?.full_name} foi salva com sucesso.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={resetForm}>Nova Anamnese</Button>
              <Button onClick={() => window.location.href = '/dashboard'}>Voltar ao Dashboard</Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8" />
            Anamnese Clinica
          </h1>
          <p className="text-muted-foreground mt-2">Registro completo da historia clinica do paciente</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex items-center min-w-max">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
                    ${currentStep > step.id ? 'bg-green-500 text-white' :
                      currentStep === step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                  </div>
                  <span className="text-xs mt-2 text-center max-w-[80px]">{step.name}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`h-1 w-12 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {autoSaving && <Badge variant="secondary" className="mb-4">Salvando automaticamente...</Badge>}

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <StepIcon className="w-6 h-6" />
              {STEPS[currentStep - 1].name}
            </h2>
          </div>

          {/* Step 1: Identificacao */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label>Selecionar Paciente *</Label>
                <PatientSearchSelect
                  onPatientSelect={handlePatientSelect}
                  selectedPatient={selectedPatient}
                  required
                />
              </div>

              {selectedPatient && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Dados do Paciente</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Nome:</span>
                        <p className="font-medium">{selectedPatient.full_name}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CPF:</span>
                        <p className="font-medium">{selectedPatient.cpf}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data de Nascimento:</span>
                        <p className="font-medium">{selectedPatient.date_of_birth ? new Date(selectedPatient.date_of_birth).toLocaleDateString('pt-BR') : 'Nao informado'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Telefone:</span>
                        <p className="font-medium">{selectedPatient.phone || 'Nao informado'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <Label>Template de Anamnese</Label>
                <Select onValueChange={(v) => console.log('Template:', v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione um template (opcional)" /></SelectTrigger>
                  <SelectContent>
                    {templates.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name} - {t.specialty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 2: Queixa Principal */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Queixa Principal *</Label>
                <Textarea
                  value={formData.chief_complaint}
                  onChange={(e) => setFormData({ ...formData, chief_complaint: e.target.value })}
                  placeholder="Descreva a queixa principal do paciente..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Duracao da Queixa</Label>
                <Input
                  value={formData.complaint_duration}
                  onChange={(e) => setFormData({ ...formData, complaint_duration: e.target.value })}
                  placeholder="Ex: 3 dias, 2 semanas..."
                />
              </div>
            </div>
          )}

          {/* Step 3: Historia da Doenca Atual */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label>Historia da Doenca Atual (HDA)</Label>
                <Textarea
                  value={formData.history_present_illness}
                  onChange={(e) => setFormData({ ...formData, history_present_illness: e.target.value })}
                  placeholder="Descreva o inicio, evolucao e caracteristicas da doenca..."
                  rows={8}
                />
              </div>
              <div>
                <Label>Sintomas Associados</Label>
                <Input
                  placeholder="Digite sintomas e pressione Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      e.preventDefault()
                      setFormData({ ...formData, associated_symptoms: [...formData.associated_symptoms, e.currentTarget.value.trim()] })
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.associated_symptoms.map((s, i) => (
                    <Badge key={i} variant="secondary">
                      {s}
                      <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => setFormData({ ...formData, associated_symptoms: formData.associated_symptoms.filter((_, idx) => idx !== i) })}>x</button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Antecedentes */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label>Antecedentes Pessoais</Label>
                <Textarea placeholder="Doencas previas, cirurgias, alergias, medicamentos em uso..." rows={4} />
              </div>
              <div>
                <Label>Antecedentes Familiares</Label>
                <Textarea placeholder="Historico familiar de doencas..." rows={3} />
              </div>
              <div>
                <Label>Historia Social</Label>
                <Textarea placeholder="Tabagismo, etilismo, atividade fisica, profissao..." rows={3} />
              </div>
            </div>
          )}

          {/* Step 5: Revisao de Sistemas */}
          {currentStep === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Cardiovascular', 'Respiratorio', 'Digestivo', 'Urinario', 'Neurologico', 'Musculoesqueletico', 'Pele', 'Endocrino'].map(system => (
                <div key={system}>
                  <Label>{system}</Label>
                  <Textarea placeholder="Sem alteracoes ou descrever..." rows={2} />
                </div>
              ))}
            </div>
          )}

          {/* Step 6: Exame Fisico */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label>PA (mmHg)</Label>
                  <Input placeholder="120/80" value={formData.vital_signs.bp} onChange={(e) => setFormData({ ...formData, vital_signs: { ...formData.vital_signs, bp: e.target.value } })} />
                </div>
                <div>
                  <Label>FC (bpm)</Label>
                  <Input placeholder="72" value={formData.vital_signs.hr} onChange={(e) => setFormData({ ...formData, vital_signs: { ...formData.vital_signs, hr: e.target.value } })} />
                </div>
                <div>
                  <Label>Temp (C)</Label>
                  <Input placeholder="36.5" value={formData.vital_signs.temp} onChange={(e) => setFormData({ ...formData, vital_signs: { ...formData.vital_signs, temp: e.target.value } })} />
                </div>
                <div>
                  <Label>FR (irpm)</Label>
                  <Input placeholder="16" value={formData.vital_signs.rr} onChange={(e) => setFormData({ ...formData, vital_signs: { ...formData.vital_signs, rr: e.target.value } })} />
                </div>
                <div>
                  <Label>SpO2 (%)</Label>
                  <Input placeholder="98" value={formData.vital_signs.spo2} onChange={(e) => setFormData({ ...formData, vital_signs: { ...formData.vital_signs, spo2: e.target.value } })} />
                </div>
              </div>
              <div>
                <Label>Exame Geral</Label>
                <Textarea placeholder="Estado geral, nivel de consciencia, hidratacao..." rows={3} />
              </div>
              <div>
                <Label>Exame Especifico</Label>
                <Textarea placeholder="Exame especifico de acordo com a queixa..." rows={6} />
              </div>
            </div>
          )}

          {/* Step 7: Conduta */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div>
                <Label>Hipoteses Diagnosticas</Label>
                <Input
                  placeholder="Digite CID-10 e pressione Enter"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      e.preventDefault()
                      setFormData({ ...formData, diagnostic_hypothesis: [...formData.diagnostic_hypothesis, e.currentTarget.value.trim()] })
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.diagnostic_hypothesis.map((h, i) => (
                    <Badge key={i} variant="outline">
                      {h}
                      <button className="ml-2 text-red-500 hover:text-red-700" onClick={() => setFormData({ ...formData, diagnostic_hypothesis: formData.diagnostic_hypothesis.filter((_, idx) => idx !== i) })}>x</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Plano Terapeutico</Label>
                <Textarea value={formData.treatment_plan} onChange={(e) => setFormData({ ...formData, treatment_plan: e.target.value })} placeholder="Conduta, exames solicitados, orientacoes..." rows={5} />
              </div>
              <div>
                <Label>Prescricoes</Label>
                <Textarea value={formData.prescriptions} onChange={(e) => setFormData({ ...formData, prescriptions: e.target.value })} placeholder="Medicamentos prescritos..." rows={4} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrevious} disabled={currentStep === 1 || loading} variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            <Button onClick={handleNext} disabled={loading}>
              {loading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Salvando...</>
              ) : (
                <>{currentStep === 7 ? 'Concluir' : 'Proximo'}{currentStep < 7 && <ChevronRight className="w-4 h-4 ml-2" />}</>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
