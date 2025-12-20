"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getEMR, createClinicalNote, getClinicalNotes, addProblem, getActiveProblems } from "@/app/actions/emr"
import { getPatients } from "@/app/actions/patients"
import { Search, FileHeart, AlertCircle, UserCircle, FileText, Plus, Save } from "lucide-react"
import { toast } from "sonner"

export default function EMRPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [emr, setEmr] = useState<any>(null)
  const [clinicalNotes, setClinicalNotes] = useState<any[]>([])
  const [activeProblems, setActiveProblems] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  // Forms
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

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const result = await getPatients()
      if (result.success) {
        setPatients(result.data || [])
      }
    } catch (error) {
      toast.error("Erro ao carregar pacientes")
    } finally {
      setLoading(false)
    }
  }

  const loadPatientEMR = async (patientId: string) => {
    try {
      const [emrResult, notesResult, problemsResult] = await Promise.all([
        getEMR(patientId),
        getClinicalNotes(patientId),
        getActiveProblems(patientId),
      ])

      if (emrResult.success) {
        setEmr(emrResult.data)
      }
      if (notesResult.success) {
        setClinicalNotes(notesResult.data || [])
      }
      if (problemsResult.success) {
        setActiveProblems(problemsResult.data || [])
      }
    } catch (error) {
      toast.error("Erro ao carregar prontuário")
    }
  }

  const handleSelectPatient = (patient: any) => {
    setSelectedPatient(patient)
    loadPatientEMR(patient.id)
  }

  const handleAddProblem = async () => {
    if (!selectedPatient || !newProblem.description) return

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
    if (!selectedPatient || !newNote.content) return

    try {
      const result = await createClinicalNote({
        emr_id: emr?.id,
        patient_id: selectedPatient.id,
        ...newNote,
      })

      if (result.success) {
        toast.success("Nota clínica adicionada")
        loadPatientEMR(selectedPatient.id)
        setNewNote({ content: "", note_type: "clinical", subject: "" })
      } else {
        toast.error(result.error || "Erro ao adicionar nota")
      }
    } catch (error) {
      toast.error("Erro ao adicionar nota")
    }
  }

  const filteredPatients = patients.filter(
    (p) => p.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.cpf?.includes(searchQuery),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FileHeart className="h-8 w-8 text-rose-600" />
            Prontuário Eletrônico (EMR)
          </h1>
          <p className="text-muted-foreground mt-2">Registro médico eletrônico completo do paciente</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Busca de Pacientes */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Search className="h-5 w-5" />
                Selecionar Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Buscar por nome ou CPF..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredPatients.map((patient) => (
                  <Button
                    key={patient.id}
                    variant={selectedPatient?.id === patient.id ? "secondary" : "outline"}
                    className="w-full justify-start h-auto py-3"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-medium">{patient.full_name}</span>
                      <span className="text-xs text-muted-foreground">{patient.cpf}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prontuário */}
          <div className="lg:col-span-2 space-y-6">
            {!selectedPatient ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  Selecione um paciente para visualizar o prontuário
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Informações do Paciente */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCircle className="h-5 w-5" />
                      Dados do Paciente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Nome Completo</Label>
                      <p className="font-medium">{selectedPatient.full_name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Data de Nascimento</Label>
                      <p className="font-medium">{selectedPatient.date_of_birth}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Tipo Sanguíneo</Label>
                      <p className="font-medium">{selectedPatient.blood_type || "Não informado"}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Alergias</Label>
                      <p className="font-medium">{selectedPatient.allergies || "Nenhuma"}</p>
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
                    <div className="space-y-2">
                      {activeProblems.map((problem) => (
                        <div key={problem.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{problem.description}</p>
                            {problem.icd10_code && (
                              <p className="text-sm text-muted-foreground">CID-10: {problem.icd10_code}</p>
                            )}
                          </div>
                          <Badge variant={problem.severity === "critical" ? "destructive" : "outline"}>
                            {problem.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      <Label>Adicionar Novo Problema</Label>
                      <Input
                        placeholder="Descrição do problema"
                        value={newProblem.description}
                        onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="CID-10 (opcional)"
                          value={newProblem.icd10_code}
                          onChange={(e) => setNewProblem({ ...newProblem, icd10_code: e.target.value })}
                        />
                        <Input
                          type="date"
                          value={newProblem.onset_date}
                          onChange={(e) => setNewProblem({ ...newProblem, onset_date: e.target.value })}
                        />
                      </div>
                      <Button onClick={handleAddProblem} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Problema
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Notas Clínicas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Notas Clínicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {clinicalNotes.map((note) => (
                        <div key={note.id} className="p-4 bg-muted rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{note.subject || "Nota Clínica"}</p>
                            <Badge variant="outline">{note.note_type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(note.created_at).toLocaleString("pt-BR")}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 border-t pt-4">
                      <Label>Adicionar Nova Nota</Label>
                      <Input
                        placeholder="Assunto da nota"
                        value={newNote.subject}
                        onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                      />
                      <Textarea
                        placeholder="Conteúdo da nota clínica..."
                        value={newNote.content}
                        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                        rows={4}
                      />
                      <Button onClick={handleAddNote} className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar Nota
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
