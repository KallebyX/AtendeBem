"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FlaskConical, CheckCircle, Clock, AlertTriangle, Trash2, Upload } from "lucide-react"
import { useEffect, useState } from "react"
import { createLabOrder, getLabOrders, getLabTemplates } from "@/app/actions/laboratory"
import { getPatientsList } from "@/app/actions/crm"
import { toast } from "sonner"

export default function LaboratorioPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)

  // Form state
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [labName, setLabName] = useState("")
  const [clinicalIndication, setClinicalIndication] = useState("")
  const [expectedDate, setExpectedDate] = useState("")
  const [exams, setExams] = useState<any[]>([])

  // New exam
  const [examName, setExamName] = useState("")
  const [examCode, setExamCode] = useState("")
  const [examType, setExamType] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find((t) => t.id === selectedTemplate)
      if (template && template.exams) {
        setExams(
          template.exams.map((e: any) => ({
            exam_name: e.exam_name,
            exam_code: e.exam_code,
            exam_type: e.exam_type,
          })),
        )
      }
    }
  }, [selectedTemplate, templates])

  async function loadData() {
    setLoading(true)
    const [ordersResult, patientsResult, templatesResult] = await Promise.all([
      getLabOrders(),
      getPatientsList(),
      getLabTemplates(),
    ])

    if (ordersResult.success) setOrders(ordersResult.data || [])
    if (patientsResult.success) setPatients(patientsResult.patients || [])
    if (templatesResult.success) setTemplates(templatesResult.data || [])
    setLoading(false)
  }

  function addExam() {
    if (!examName) {
      toast.error("Digite o nome do exame")
      return
    }

    setExams([...exams, { exam_name: examName, exam_code: examCode, exam_type: examType }])
    setExamName("")
    setExamCode("")
    setExamType("")
  }

  function removeExam(index: number) {
    setExams(exams.filter((_, i) => i !== index))
  }

  async function handleSubmit() {
    if (!selectedPatient || !labName || exams.length === 0) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const result = await createLabOrder({
      patient_id: selectedPatient,
      lab_name: labName,
      exams,
      clinical_indication: clinicalIndication,
      expected_result_date: expectedDate || undefined,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Pedido de exames criado!")
      setIsNewDialogOpen(false)
      resetForm()
      loadData()
    }
  }

  function resetForm() {
    setSelectedPatient("")
    setSelectedTemplate("")
    setLabName("")
    setClinicalIndication("")
    setExpectedDate("")
    setExams([])
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Laboratório</h1>
            <p className="text-muted-foreground mt-1">Gerencie pedidos e resultados de exames laboratoriais</p>
          </div>

          <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Pedido
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Pedido de Exames</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Paciente *</Label>
                    <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Escolha um template..." />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((t) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Laboratório *</Label>
                  <Input
                    value={labName}
                    onChange={(e) => setLabName(e.target.value)}
                    placeholder="Nome do laboratório"
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Indicação Clínica</Label>
                  <Textarea
                    value={clinicalIndication}
                    onChange={(e) => setClinicalIndication(e.target.value)}
                    placeholder="Motivo do pedido..."
                    className="rounded-xl min-h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data Prevista de Resultado</Label>
                  <Input
                    type="date"
                    value={expectedDate}
                    onChange={(e) => setExpectedDate(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                {/* Adicionar Exames */}
                <div className="border rounded-2xl p-4 space-y-4">
                  <h3 className="font-semibold">Adicionar Exame</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>Nome do Exame</Label>
                      <Input
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        placeholder="Ex: Hemograma"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Código</Label>
                      <Input
                        value={examCode}
                        onChange={(e) => setExamCode(e.target.value)}
                        placeholder="Opcional"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tipo</Label>
                      <Select value={examType} onValueChange={setExamType}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blood">Sangue</SelectItem>
                          <SelectItem value="urine">Urina</SelectItem>
                          <SelectItem value="image">Imagem</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={addExam} variant="outline" className="w-full rounded-xl bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Exame
                  </Button>
                </div>

                {/* Lista de Exames */}
                {exams.length > 0 && (
                  <div className="border rounded-2xl p-4 space-y-3">
                    <h3 className="font-semibold">Exames do Pedido ({exams.length})</h3>

                    {exams.map((exam, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                        <div>
                          <div className="font-medium">{exam.exam_name}</div>
                          {exam.exam_code && (
                            <div className="text-sm text-muted-foreground">Código: {exam.exam_code}</div>
                          )}
                          {exam.exam_type && (
                            <div className="text-xs text-muted-foreground capitalize">{exam.exam_type}</div>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeExam(idx)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsNewDialogOpen(false)} className="flex-1 rounded-xl">
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 rounded-xl" disabled={exams.length === 0}>
                    Criar Pedido
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de Pedidos */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <Card className="rounded-3xl">
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Carregando...</p>
              </CardContent>
            </Card>
          ) : orders.length === 0 ? (
            <Card className="rounded-3xl">
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Nenhum pedido encontrado</p>
              </CardContent>
            </Card>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="rounded-3xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FlaskConical className="w-5 h-5" />
                        Pedido {order.order_number}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Paciente: {order.patient_name} • Lab: {order.lab_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.status === "pending" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm">
                          <Clock className="w-3 h-3" />
                          Pendente
                        </span>
                      )}
                      {order.status === "completed" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm">
                          <CheckCircle className="w-3 h-3" />
                          Completo
                        </span>
                      )}
                      {order.status === "partial" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm">
                          <AlertTriangle className="w-3 h-3" />
                          Parcial
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.clinical_indication && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Indicação:</span> <span>{order.clinical_indication}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Exames:</span>{" "}
                      <span className="font-medium">{order.exams_count}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Concluídos:</span>{" "}
                      <span className="font-medium">{order.completed_exams}</span>
                    </div>
                    {order.expected_result_date && (
                      <div>
                        <span className="text-muted-foreground">Data Prevista:</span>{" "}
                        <span className="font-medium">
                          {new Date(order.expected_result_date).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="rounded-xl bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Anexar Resultados
                    </Button>
                    <Button variant="outline" className="rounded-xl bg-transparent">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
