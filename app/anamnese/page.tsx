'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { 
  createAnamnesis, 
  updateAnamnesisStep, 
  getAnamnesisByPatient,
  getAnamnesisTemplates 
} from '@/app/actions/anamnesis'
import { ChevronLeft, ChevronRight, Check, FileText, User, Activity } from 'lucide-react'

const STEPS = [
  { id: 1, name: 'Identificação', icon: User },
  { id: 2, name: 'Queixa Principal', icon: FileText },
  { id: 3, name: 'História da Doença', icon: Activity },
  { id: 4, name: 'Antecedentes', icon: FileText },
  { id: 5, name: 'Revisão de Sistemas', icon: Activity },
  { id: 6, name: 'Exame Físico', icon: Activity },
  { id: 7, name: 'Conduta', icon: Check }
]

export default function AnamnesiPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [anamnesisId, setAnamnesisId] = useState<string | null>(null)
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    // Step 1
    identification: {},
    // Step 2
    chief_complaint: '',
    complaint_duration: '',
    // Step 3
    history_present_illness: '',
    associated_symptoms: [] as string[],
    // Step 4
    past_medical_history: {},
    family_history: {},
    social_history: {},
    // Step 5
    systems_review: {},
    // Step 6
    physical_examination: {},
    // Step 7
    diagnostic_hypothesis: [] as string[],
    treatment_plan: '',
    prescriptions: ''
  })

  useEffect(() => {
    loadTemplates()
  }, [])

  // Auto-save a cada 30 segundos
  useEffect(() => {
    if (!anamnesisId) return
    
    const interval = setInterval(() => {
      autoSave()
    }, 30000)

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
      case 2: return { 
        chief_complaint: formData.chief_complaint,
        complaint_duration: formData.complaint_duration
      }
      case 3: return {
        history_present_illness: formData.history_present_illness,
        associated_symptoms: formData.associated_symptoms
      }
      case 4: return {
        past_medical_history: formData.past_medical_history,
        family_history: formData.family_history,
        social_history: formData.social_history
      }
      case 5: return { systems_review: formData.systems_review }
      case 6: return { physical_examination: formData.physical_examination }
      case 7: return {
        diagnostic_hypothesis: formData.diagnostic_hypothesis,
        treatment_plan: formData.treatment_plan,
        prescriptions: formData.prescriptions
      }
      default: return {}
    }
  }

  async function handleNext() {
    setLoading(true)

    if (!anamnesisId) {
      // Criar anamnese na primeira navegação
      const result = await createAnamnesis({ patient_id: selectedPatientId })
      if (result.data) {
        setAnamnesisId(result.data.id)
      } else {
        alert(result.error)
        setLoading(false)
        return
      }
    }

    // Salvar passo atual
    const result = await updateAnamnesisStep({
      anamnesis_id: anamnesisId!,
      step: currentStep,
      data: getStepData()
    })

    if (result.success) {
      if (currentStep < 7) {
        setCurrentStep(currentStep + 1)
      } else {
        alert('Anamnese concluída!')
      }
    } else {
      alert(result.error)
    }

    setLoading(false)
  }

  function handlePrevious() {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const StepIcon = STEPS[currentStep - 1].icon

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FileText className="w-8 h-8" />
          Anamnese Clínica
        </h1>
        <p className="text-muted-foreground mt-2">
          Registro completo da história clínica do paciente
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  ${currentStep > step.id ? 'bg-green-500 text-white' : 
                    currentStep === step.id ? 'bg-primary text-white' : 
                    'bg-gray-200 text-gray-500'}
                `}>
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </div>
                <span className="text-xs mt-2 text-center">{step.name}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-1 w-16 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {autoSaving && (
        <Badge variant="secondary" className="mb-4">
          Salvando automaticamente...
        </Badge>
      )}

      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <StepIcon className="w-6 h-6" />
            {STEPS[currentStep - 1].name}
          </h2>
        </div>

        {/* Step 1: Identificação */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <Label>Selecionar Paciente</Label>
              <Input
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                placeholder="ID do paciente"
              />
            </div>
            <div>
              <Label>Template de Anamnese</Label>
              <Select onValueChange={(v) => {
                const template = templates.find(t => t.id === v)
                if (template) {
                  // Carregar template
                  console.log('Template selecionado:', template)
                }
              }}>
                <option value="">Padrão</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </Select>
            </div>
          </div>
        )}

        {/* Step 2: Queixa Principal */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Queixa Principal</Label>
              <Textarea
                value={formData.chief_complaint}
                onChange={(e) => setFormData({ ...formData, chief_complaint: e.target.value })}
                placeholder="Descreva a queixa principal do paciente..."
                rows={4}
              />
            </div>
            <div>
              <Label>Duração da Queixa</Label>
              <Input
                value={formData.complaint_duration}
                onChange={(e) => setFormData({ ...formData, complaint_duration: e.target.value })}
                placeholder="Ex: 3 dias, 2 semanas..."
              />
            </div>
          </div>
        )}

        {/* Step 3: História da Doença Atual */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <Label>História da Doença Atual (HDA)</Label>
              <Textarea
                value={formData.history_present_illness}
                onChange={(e) => setFormData({ ...formData, history_present_illness: e.target.value })}
                placeholder="Descreva o início, evolução e características da doença..."
                rows={8}
              />
            </div>
            <div>
              <Label>Sintomas Associados</Label>
              <Input
                placeholder="Digite sintomas separados por vírgula"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    setFormData({
                      ...formData,
                      associated_symptoms: [...formData.associated_symptoms, e.currentTarget.value.trim()]
                    })
                    e.currentTarget.value = ''
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.associated_symptoms.map((s, i) => (
                  <Badge key={i} variant="secondary">
                    {s}
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => setFormData({
                        ...formData,
                        associated_symptoms: formData.associated_symptoms.filter((_, idx) => idx !== i)
                      })}
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
          <div className="space-y-6">
            <div>
              <Label>Antecedentes Pessoais</Label>
              <Textarea
                placeholder="Doenças prévias, cirurgias, alergias, medicamentos em uso..."
                rows={4}
              />
            </div>
            <div>
              <Label>Antecedentes Familiares</Label>
              <Textarea
                placeholder="Histórico familiar de doenças..."
                rows={3}
              />
            </div>
            <div>
              <Label>História Social</Label>
              <Textarea
                placeholder="Tabagismo, etilismo, atividade física, profissão..."
                rows={3}
              />
            </div>
          </div>
        )}

        {/* Step 5: Revisão de Sistemas */}
        {currentStep === 5 && (
          <div className="grid grid-cols-2 gap-4">
            {['Cardiovascular', 'Respiratório', 'Digestivo', 'Urinário', 
              'Neurológico', 'Musculoesquelético', 'Pele', 'Endócrino'].map(system => (
              <div key={system}>
                <Label>{system}</Label>
                <Textarea
                  placeholder="Sem alterações ou descrever..."
                  rows={2}
                />
              </div>
            ))}
          </div>
        )}

        {/* Step 6: Exame Físico */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>PA (mmHg)</Label>
                <Input placeholder="120/80" />
              </div>
              <div>
                <Label>FC (bpm)</Label>
                <Input placeholder="72" />
              </div>
              <div>
                <Label>Temp (°C)</Label>
                <Input placeholder="36.5" />
              </div>
            </div>
            <div>
              <Label>Exame Geral</Label>
              <Textarea
                placeholder="Estado geral, nível de consciência, hidratação..."
                rows={3}
              />
            </div>
            <div>
              <Label>Exame Específico</Label>
              <Textarea
                placeholder="Exame específico de acordo com a queixa..."
                rows={6}
              />
            </div>
          </div>
        )}

        {/* Step 7: Conduta */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <div>
              <Label>Hipóteses Diagnósticas</Label>
              <Input
                placeholder="Digite CID-10 e pressione Enter"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    setFormData({
                      ...formData,
                      diagnostic_hypothesis: [...formData.diagnostic_hypothesis, e.currentTarget.value.trim()]
                    })
                    e.currentTarget.value = ''
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.diagnostic_hypothesis.map((h, i) => (
                  <Badge key={i} variant="outline">{h}</Badge>
                ))}
              </div>
            </div>
            <div>
              <Label>Plano Terapêutico</Label>
              <Textarea
                value={formData.treatment_plan}
                onChange={(e) => setFormData({ ...formData, treatment_plan: e.target.value })}
                placeholder="Conduta, exames solicitados, orientações..."
                rows={5}
              />
            </div>
            <div>
              <Label>Prescrições</Label>
              <Textarea
                value={formData.prescriptions}
                onChange={(e) => setFormData({ ...formData, prescriptions: e.target.value })}
                placeholder="Medicamentos prescritos..."
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={loading}
          >
            {currentStep === 7 ? 'Concluir' : 'Próximo'}
            {currentStep < 7 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </Card>
    </div>
  )
}
