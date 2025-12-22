"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PatientSearchSelect } from "@/components/patient-search-select"
import { getEMR, createClinicalNote, getClinicalNotes, addProblem, getActiveProblems } from "@/app/actions/emr"
import { FileHeart, AlertCircle, UserCircle, FileText, Plus, Save, Download, History } from "lucide-react"
import { toast } from "sonner"

export default function EMRPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [emr, setEmr] = useState<any>(null)
  const [clinicalNotes, setClinicalNotes] = useState<any[]>([])
  const [activeProblems, setActiveProblems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [newProblem, setNewProblem] = useState({
    description: "",
    icd10_code: "",
    severity: "moderate",
    onset_date: new Date().toISOString().split("T")[0],
  })

  const [newNote, setNewNote] = useState({
    content: "",
    note_type: "clinical",
    subject: "",
  })

  const loadPatientEMR = async (patientId: string) => {
    setLoading(true)
    try {
      const [emrResult, notesResult, problemsResult] = await Promise.all([
        getEMR(patientId),
        getClinicalNotes(patientId),
        getActiveProblems(patientId),
      ])

      if (emrResult.success) setEmr(emrResult.data)
      if (notesResult.success) setClinicalNotes(notesResult.data || [])
      if (problemsResult.success) setActiveProblems(problemsResult.data || [])
    } catch (error) {
      toast.error("Erro ao carregar prontuario")
    } finally {
      setLoading(false)
    }
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
    if (patient) {
      loadPatientEMR(patient.id)
    } else {
      setEmr(null)
      setClinicalNotes([])
      setActiveProblems([])
    }
  }

  const handleAddProblem = async () => {
    if (!selectedPatient || !newProblem.description) {
      toast.error("Preencha a descricao do problema")
      return
    }

    try {
      const result = await addProblem({
        emr_id: emr?.id,
        patient_id: selectedPatient.id,
        ...newProblem,
      })

      if (result.success) {
        toast.success("Problema adicionado")
        loadPatientEMR(selectedPatient.id)
        setNewProblem({
          description: "",
          icd10_code: "",
          severity: "moderate",
          onset_date: new Date().toISOString().split("T")[0],
        })
      } else {
        toast.error(result.error || "Erro ao adicionar problema")
      }
    } catch (error) {
      toast.error("Erro ao adicionar problema")
    }
  }

  const handleAddNote = async () => {
    if (!selectedPatient || !newNote.content) {
      toast.error("Preencha o conteudo da nota")
      return
    }

    try {
      const result = await createClinicalNote({
        emr_id: emr?.id,
        patient_id: selectedPatient.id,
        ...newNote,
      })

      if (result.success) {
        toast.success("Nota clinica adicionada")
        loadPatientEMR(selectedPatient.id)
        setNewNote({ content: "", note_type: "clinical", subject: "" })
      } else {
        toast.error(result.error || "Erro ao adicionar nota")
      }
    } catch (error) {
      toast.error("Erro ao adicionar nota")
    }
  }

  const exportToPDF = () => {
    toast.info("Exportando prontuario para PDF...")
    // TODO: Implementar exportacao
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileHeart className="h-8 w-8 text-rose-600" />
            Prontuario Eletronico (EMR)
          </h1>
          <p className="text-muted-foreground mt-2">Registro medico eletronico completo do paciente</p>
        </div>

        {/* Selecao de Paciente */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Selecionar Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientSearchSelect
              onPatientSelect={handlePatientSelect}
              selectedPatient={selectedPatient}
              label="Buscar paciente por nome ou CPF"
              required
            />
          </CardContent>
        </Card>

        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando prontuario...</p>
            </CardContent>
          </Card>
        ) : !selectedPatient ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Selecione um paciente para visualizar o prontuario
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informacoes do Paciente */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    Dados do Paciente
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={exportToPDF}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                  <p className="font-medium">{selectedPatient.full_name}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">CPF</Label>
                  <p className="font-medium">{selectedPatient.cpf}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Data de Nascimento</Label>
                  <p className="font-medium">
                    {selectedPatient.date_of_birth
                      ? new Date(selectedPatient.date_of_birth).toLocaleDateString("pt-BR")
                      : "Nao informado"}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Tipo Sanguineo</Label>
                  <p className="font-medium">{selectedPatient.blood_type || "Nao informado"}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-xs text-muted-foreground">Alergias</Label>
                  <p className="font-medium">{selectedPatient.allergies || "Nenhuma informada"}</p>
                </div>
              </CardContent>
            </Card>

            {/* Problemas Ativos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  Problemas Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {activeProblems.length === 0 ? (
                    <p className="text-muted-foreground text-sm">Nenhum problema ativo registrado</p>
                  ) : (
                    activeProblems.map((problem) => (
                      <div key={problem.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{problem.description}</p>
                          {problem.icd10_code && (
                            <p className="text-sm text-muted-foreground">CID-10: {problem.icd10_code}</p>
                          )}
                        </div>
                        <Badge variant={problem.severity === "critical" ? "destructive" : "outline"}>
                          {problem.severity === "mild" ? "Leve" : problem.severity === "moderate" ? "Moderado" : problem.severity === "severe" ? "Grave" : "Critico"}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>

                <div className="space-y-3 border-t pt-4">
                  <Label>Adicionar Novo Problema</Label>
                  <Input
                    placeholder="Descricao do problema"
                    value={newProblem.description}
                    onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="CID-10 (opcional)"
                      value={newProblem.icd10_code}
                      onChange={(e) => setNewProblem({ ...newProblem, icd10_code: e.target.value })}
                    />
                    <select
                      className="border rounded-md p-2"
                      value={newProblem.severity}
                      onChange={(e) => setNewProblem({ ...newProblem, severity: e.target.value })}
                    >
                      <option value="mild">Leve</option>
                      <option value="moderate">Moderado</option>
                      <option value="severe">Grave</option>
                      <option value="critical">Critico</option>
                    </select>
                  </div>
                  <Button onClick={handleAddProblem} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Problema
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notas Clinicas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Notas Clinicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid lg:grid-cols-2 gap-4">
                  {/* Lista de notas */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {clinicalNotes.length === 0 ? (
                      <p className="text-muted-foreground text-sm">Nenhuma nota clinica registrada</p>
                    ) : (
                      clinicalNotes.map((note) => (
                        <div key={note.id} className="p-4 bg-muted rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{note.subject || "Nota Clinica"}</p>
                            <Badge variant="outline">{note.note_type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <History className="w-3 h-3" />
                            {new Date(note.created_at).toLocaleString("pt-BR")}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Formulario nova nota */}
                  <div className="space-y-3 border-l pl-4">
                    <Label>Adicionar Nova Nota</Label>
                    <Input
                      placeholder="Assunto da nota"
                      value={newNote.subject}
                      onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                    />
                    <select
                      className="w-full border rounded-md p-2"
                      value={newNote.note_type}
                      onChange={(e) => setNewNote({ ...newNote, note_type: e.target.value })}
                    >
                      <option value="clinical">Nota Clinica</option>
                      <option value="progress">Evolucao</option>
                      <option value="prescription">Prescricao</option>
                      <option value="exam">Exame</option>
                      <option value="surgical">Cirurgico</option>
                      <option value="discharge">Alta</option>
                    </select>
                    <Textarea
                      placeholder="Conteudo da nota clinica..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      rows={6}
                    />
                    <Button onClick={handleAddNote} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Nota
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
