"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { NavigationHeader } from "@/components/navigation-header"
import { PatientSearchSelect } from "@/components/patient-search-select"
import { Smile, Plus, Search, Calendar, Save, X, FileText, History } from "lucide-react"
import {
  getOdontograms,
  createOdontogram,
  updateOdontogram,
  addOdontogramProcedure,
  getOdontogramProcedures,
  getOdontogramById
} from "@/app/actions/odontogram"
import { toast } from "sonner"

// Dental procedures with colors
const PROCEDURES = [
  { code: "REST", name: "Restauracao", color: "#3B82F6" },
  { code: "EXTR", name: "Extracao", color: "#EF4444" },
  { code: "ENDO", name: "Endodontia", color: "#F59E0B" },
  { code: "PROT", name: "Protese", color: "#8B5CF6" },
  { code: "IMPL", name: "Implante", color: "#10B981" },
  { code: "ORTH", name: "Ortodontia", color: "#EC4899" },
  { code: "PERI", name: "Periodontia", color: "#6366F1" },
  { code: "CARI", name: "Carie", color: "#000000" },
  { code: "AUSE", name: "Ausente", color: "#6B7280" },
  { code: "FRAT", name: "Fratura", color: "#DC2626" },
]

// Tooth faces
const TOOTH_FACES = [
  { code: "M", name: "Mesial" },
  { code: "D", name: "Distal" },
  { code: "V", name: "Vestibular" },
  { code: "L", name: "Lingual/Palatina" },
  { code: "O", name: "Oclusal/Incisal" },
]

// Adult teeth numbers (FDI notation)
const ADULT_TEETH = {
  upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
  upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
  lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
}

// Child teeth numbers (FDI notation)
const CHILD_TEETH = {
  upperRight: [55, 54, 53, 52, 51],
  upperLeft: [61, 62, 63, 64, 65],
  lowerLeft: [71, 72, 73, 74, 75],
  lowerRight: [85, 84, 83, 82, 81],
}

export default function OdontogramaPage() {
  const [odontograms, setOdontograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showProcedureModal, setShowProcedureModal] = useState(false)
  const [selectedOdontogram, setSelectedOdontogram] = useState<any>(null)
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [teethData, setTeethData] = useState<Record<string, any>>({})
  const [procedures, setProcedures] = useState<any[]>([])
  const [teethType, setTeethType] = useState<"adult" | "child">("adult")
  const [clinicalNotes, setClinicalNotes] = useState("")
  const [saving, setSaving] = useState(false)

  const [newProcedure, setNewProcedure] = useState({
    procedure_code: "",
    procedure_name: "",
    tooth_face: "",
    notes: ""
  })

  useEffect(() => {
    loadOdontograms()
  }, [])

  async function loadOdontograms() {
    setLoading(true)
    const result = await getOdontograms()
    if (result.success) {
      setOdontograms(result.data || [])
    }
    setLoading(false)
  }

  async function handleCreateOdontogram() {
    if (!selectedPatient) {
      toast.error("Selecione um paciente")
      return
    }

    setSaving(true)
    const result = await createOdontogram({
      patient_id: selectedPatient.id,
      teeth_data: {},
      clinical_notes: ""
    })

    if (result.success) {
      toast.success("Odontograma criado com sucesso!")
      setShowNewModal(false)
      setSelectedPatient(null)
      loadOdontograms()
    } else {
      toast.error(result.error || "Erro ao criar odontograma")
    }
    setSaving(false)
  }

  async function handleViewOdontogram(odontogram: any) {
    setSelectedOdontogram(odontogram)
    setTeethData(odontogram.teeth_data || {})
    setClinicalNotes(odontogram.clinical_notes || "")

    // Load procedures
    const procResult = await getOdontogramProcedures(odontogram.id)
    if (procResult.success) {
      setProcedures(procResult.data || [])
    }

    setShowDetailModal(true)
  }

  function handleToothClick(toothNumber: number) {
    setSelectedTooth(toothNumber)
    setNewProcedure({
      procedure_code: "",
      procedure_name: "",
      tooth_face: "",
      notes: ""
    })
    setShowProcedureModal(true)
  }

  async function handleAddProcedure() {
    if (!selectedTooth || !selectedOdontogram || !newProcedure.procedure_code) {
      toast.error("Selecione um procedimento")
      return
    }

    setSaving(true)
    const result = await addOdontogramProcedure({
      odontogram_id: selectedOdontogram.id,
      tooth_number: selectedTooth.toString(),
      tooth_face: newProcedure.tooth_face,
      procedure_code: newProcedure.procedure_code,
      procedure_name: newProcedure.procedure_name,
      notes: newProcedure.notes
    })

    if (result.success) {
      // Update teeth data locally
      const updatedTeethData = { ...teethData }
      if (!updatedTeethData[selectedTooth]) {
        updatedTeethData[selectedTooth] = { procedures: [] }
      }
      updatedTeethData[selectedTooth].procedures.push({
        code: newProcedure.procedure_code,
        name: newProcedure.procedure_name,
        face: newProcedure.tooth_face
      })
      setTeethData(updatedTeethData)

      // Save to database
      await updateOdontogram(selectedOdontogram.id, {
        teeth_data: updatedTeethData
      })

      // Reload procedures
      const procResult = await getOdontogramProcedures(selectedOdontogram.id)
      if (procResult.success) {
        setProcedures(procResult.data || [])
      }

      toast.success("Procedimento adicionado!")
      setShowProcedureModal(false)
    } else {
      toast.error(result.error || "Erro ao adicionar procedimento")
    }
    setSaving(false)
  }

  async function handleSaveNotes() {
    if (!selectedOdontogram) return

    setSaving(true)
    const result = await updateOdontogram(selectedOdontogram.id, {
      clinical_notes: clinicalNotes
    })

    if (result.success) {
      toast.success("Notas salvas!")
    } else {
      toast.error(result.error || "Erro ao salvar notas")
    }
    setSaving(false)
  }

  function getToothColor(toothNumber: number): string {
    const toothData = teethData[toothNumber]
    if (!toothData || !toothData.procedures || toothData.procedures.length === 0) {
      return "#FFFFFF"
    }
    const lastProcedure = toothData.procedures[toothData.procedures.length - 1]
    const procedure = PROCEDURES.find(p => p.code === lastProcedure.code)
    return procedure?.color || "#FFFFFF"
  }

  function renderTeethRow(teeth: number[], isUpper: boolean) {
    return (
      <div className="flex gap-1">
        {teeth.map((tooth) => {
          const toothData = teethData[tooth]
          const hasData = toothData && toothData.procedures && toothData.procedures.length > 0
          return (
            <div
              key={tooth}
              onClick={() => handleToothClick(tooth)}
              className={`
                w-10 h-12 border-2 rounded cursor-pointer transition-all
                flex flex-col items-center justify-center
                hover:border-primary hover:shadow-md
                ${hasData ? 'border-primary' : 'border-gray-300'}
              `}
              style={{ backgroundColor: getToothColor(tooth) }}
            >
              <span className={`text-xs font-bold ${hasData ? 'text-white' : 'text-gray-700'}`}>
                {tooth}
              </span>
              {isUpper && (
                <div className="w-6 h-1 bg-gray-400 mt-1 rounded" />
              )}
              {!isUpper && (
                <div className="w-6 h-1 bg-gray-400 mb-1 rounded" />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const filteredOdontograms = odontograms.filter((o) =>
    o.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const currentTeeth = teethType === "adult" ? ADULT_TEETH : CHILD_TEETH

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Smile className="w-8 h-8 text-cyan-600" />
              Odontograma
            </h1>
            <p className="text-muted-foreground">Mapa dental e historico de procedimentos</p>
          </div>
          <Button onClick={() => setShowNewModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Odontograma
          </Button>
        </div>

        {/* Legend */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Legenda de Procedimentos</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="flex flex-wrap gap-3">
              {PROCEDURES.map((proc) => (
                <div key={proc.code} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border"
                    style={{ backgroundColor: proc.color }}
                  />
                  <span className="text-xs">{proc.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Odontograms List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Odontogramas Cadastrados</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOdontograms.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <Smile className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Nenhum odontograma encontrado</p>
                    <Button variant="outline" className="mt-4" onClick={() => setShowNewModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Primeiro Odontograma
                    </Button>
                  </div>
                ) : (
                  filteredOdontograms.map((odontogram) => (
                    <Card key={odontogram.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Smile className="w-5 h-5 text-cyan-600" />
                            <CardTitle className="text-base">{odontogram.patient_name}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Procedimentos:</span>
                            <Badge>
                              {Object.keys(odontogram.teeth_data || {}).length} dentes
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Ultima Atualizacao:</span>
                            <span className="text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(odontogram.updated_at || odontogram.created_at).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                          <Button
                            className="w-full mt-4"
                            variant="outline"
                            onClick={() => handleViewOdontogram(odontogram)}
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* New Odontogram Modal */}
        <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Odontograma</DialogTitle>
              <DialogDescription>
                Selecione o paciente para criar um novo odontograma
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <PatientSearchSelect
                onPatientSelect={setSelectedPatient}
                selectedPatient={selectedPatient}
                label="Paciente"
                required
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowNewModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateOdontogram} disabled={saving || !selectedPatient}>
                  {saving ? "Criando..." : "Criar Odontograma"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Odontogram Detail Modal */}
        <Dialog open={showDetailModal} onOpenChange={setShowDetailModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-cyan-600" />
                Odontograma - {selectedOdontogram?.patient_name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Teeth Type Selector */}
              <div className="flex justify-center gap-4">
                <Button
                  variant={teethType === "adult" ? "default" : "outline"}
                  onClick={() => setTeethType("adult")}
                >
                  Denticao Permanente
                </Button>
                <Button
                  variant={teethType === "child" ? "default" : "outline"}
                  onClick={() => setTeethType("child")}
                >
                  Denticao Decidua
                </Button>
              </div>

              {/* Dental Chart */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Clique em um dente para adicionar procedimentos
                </p>

                {/* Upper Teeth */}
                <div className="flex justify-center gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Superior Direito</p>
                    {renderTeethRow(currentTeeth.upperRight, true)}
                  </div>
                  <div className="w-px bg-gray-300" />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Superior Esquerdo</p>
                    {renderTeethRow(currentTeeth.upperLeft, true)}
                  </div>
                </div>

                <div className="border-t border-gray-300 my-4" />

                {/* Lower Teeth */}
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Inferior Direito</p>
                    {renderTeethRow(currentTeeth.lowerRight, false)}
                  </div>
                  <div className="w-px bg-gray-300" />
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">Inferior Esquerdo</p>
                    {renderTeethRow(currentTeeth.lowerLeft, false)}
                  </div>
                </div>
              </div>

              {/* Procedures History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <History className="w-4 h-4" />
                      Historico de Procedimentos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[200px] overflow-y-auto">
                    {procedures.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Nenhum procedimento registrado
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {procedures.map((proc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div>
                              <p className="font-medium text-sm">
                                Dente {proc.tooth_number} {proc.tooth_face && `(${proc.tooth_face})`}
                              </p>
                              <p className="text-xs text-muted-foreground">{proc.procedure_name}</p>
                            </div>
                            <Badge variant="outline">{proc.procedure_code}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Notas Clinicas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={clinicalNotes}
                      onChange={(e) => setClinicalNotes(e.target.value)}
                      placeholder="Adicione observacoes clinicas..."
                      rows={5}
                    />
                    <Button
                      className="w-full mt-2"
                      size="sm"
                      onClick={handleSaveNotes}
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar Notas
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Procedure Modal */}
        <Dialog open={showProcedureModal} onOpenChange={setShowProcedureModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Procedimento - Dente {selectedTooth}</DialogTitle>
              <DialogDescription>
                Selecione o procedimento e a face do dente
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <Label>Procedimento</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {PROCEDURES.map((proc) => (
                    <Button
                      key={proc.code}
                      variant={newProcedure.procedure_code === proc.code ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => setNewProcedure({
                        ...newProcedure,
                        procedure_code: proc.code,
                        procedure_name: proc.name
                      })}
                    >
                      <div
                        className="w-3 h-3 rounded mr-2"
                        style={{ backgroundColor: proc.color }}
                      />
                      {proc.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Face do Dente (opcional)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {TOOTH_FACES.map((face) => (
                    <Button
                      key={face.code}
                      variant={newProcedure.tooth_face === face.code ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewProcedure({
                        ...newProcedure,
                        tooth_face: newProcedure.tooth_face === face.code ? "" : face.code
                      })}
                    >
                      {face.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Observacoes</Label>
                <Textarea
                  value={newProcedure.notes}
                  onChange={(e) => setNewProcedure({ ...newProcedure, notes: e.target.value })}
                  placeholder="Observacoes sobre o procedimento..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowProcedureModal(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddProcedure}
                  disabled={saving || !newProcedure.procedure_code}
                >
                  {saving ? "Salvando..." : "Adicionar"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
