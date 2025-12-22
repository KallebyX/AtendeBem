"use client"

import type React from "react"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FileText, CheckCircle, Eye, PenTool, Clock, XCircle, AlertTriangle } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { createContract, getContracts, getContractTemplates, signContract } from "@/app/actions/contracts"
import { getPatientsList } from "@/app/actions/crm"
import { toast } from "sonner"
import { ContractPDFViewer } from "@/components/contract-pdf-viewer"
import { ContractTimeline, ContractTimelineCompact } from "@/components/contract-timeline"

export default function ContratosPage() {
  const [contracts, setContracts] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [previewContract, setPreviewContract] = useState<any>(null)

  // Form state
  const [selectedPatient, setSelectedPatient] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [title, setTitle] = useState("")
  const [contractType, setContractType] = useState("")
  const [content, setContent] = useState("")
  const [validUntil, setValidUntil] = useState("")

  // Signature
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [signingContract, setSigningContract] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (selectedTemplate) {
      const template = templates.find((t) => t.id === selectedTemplate)
      if (template) {
        setTitle(template.name)
        setContractType(template.contract_type)
        setContent(template.content)
      }
    }
  }, [selectedTemplate, templates])

  async function loadData() {
    setLoading(true)
    const [contractsResult, patientsResult, templatesResult] = await Promise.all([
      getContracts(),
      getPatientsList(),
      getContractTemplates(),
    ])

    if (contractsResult.success) setContracts(contractsResult.data || [])
    if (patientsResult.success) setPatients(patientsResult.patients || [])
    if (templatesResult.success) setTemplates(templatesResult.data || [])
    setLoading(false)
  }

  async function handleSubmit() {
    if (!selectedPatient || !title || !content) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const selectedPatientData = patients.find((p) => p.id === selectedPatient)

    // Substituir variáveis
    let finalContent = content
    if (selectedPatientData) {
      finalContent = finalContent
        .replace(/\{PACIENTE_NOME\}/g, selectedPatientData.full_name)
        .replace(/\{PACIENTE_CPF\}/g, selectedPatientData.cpf)
        .replace(/\{PACIENTE_RG\}/g, selectedPatientData.rg || "")
        .replace(/\{DATA_HOJE\}/g, new Date().toLocaleDateString("pt-BR"))
    }

    const result = await createContract({
      patient_id: selectedPatient,
      title,
      contract_type: contractType || "other",
      content: finalContent,
      template_id: selectedTemplate || undefined,
      valid_until: validUntil || undefined,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Contrato criado com sucesso!")
      setIsNewDialogOpen(false)
      resetForm()
      loadData()
    }
  }

  function resetForm() {
    setSelectedPatient("")
    setSelectedTemplate("")
    setTitle("")
    setContractType("")
    setContent("")
    setValidUntil("")
  }

  // Canvas signature
  function startDrawing(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  function stopDrawing() {
    setIsDrawing(false)
  }

  function clearSignature() {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  async function handleSign() {
    const canvas = canvasRef.current
    if (!canvas) return

    const signatureDataUrl = canvas.toDataURL()

    const result = await signContract({
      contract_id: signingContract.id,
      signature_url: signatureDataUrl,
      ip_address: "0.0.0.0", // TODO: Get real IP
      user_agent: navigator.userAgent,
    })

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Contrato assinado!")
      setSigningContract(null)
      loadData()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Contratos</h1>
            <p className="text-muted-foreground mt-1">Gerencie contratos e termos de consentimento</p>
          </div>

          <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                <Plus className="w-4 h-4 mr-2" />
                Novo Contrato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Contrato</DialogTitle>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Título *</Label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex: Termo de Consentimento"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={contractType} onValueChange={setContractType}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informed_consent">Consentimento Informado</SelectItem>
                        <SelectItem value="treatment_plan">Plano de Tratamento</SelectItem>
                        <SelectItem value="telemedicine_consent">Telemedicina</SelectItem>
                        <SelectItem value="service_agreement">Contrato de Serviço</SelectItem>
                        <SelectItem value="privacy_policy">Política de Privacidade</SelectItem>
                        <SelectItem value="payment_plan">Plano de Pagamento</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Conteúdo do Contrato *</Label>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Digite o conteúdo ou selecione um template..."
                    className="rounded-xl min-h-[300px] font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use variáveis: {"{PACIENTE_NOME}"}, {"{PACIENTE_CPF}"}, {"{DATA_HOJE}"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setIsNewDialogOpen(false)} className="flex-1 rounded-xl">
                    Cancelar
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1 rounded-xl">
                    Criar Contrato
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <Card className="rounded-3xl">
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Carregando...</p>
              </CardContent>
            </Card>
          ) : contracts.length === 0 ? (
            <Card className="rounded-3xl">
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">Nenhum contrato encontrado</p>
              </CardContent>
            </Card>
          ) : (
            contracts.map((contract) => (
              <Card key={contract.id} className="rounded-3xl">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {contract.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Paciente: {contract.patient_name} • {contract.contract_number}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {contract.status === "draft" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-500/10 text-gray-600 text-sm">
                          <FileText className="w-3 h-3" />
                          Rascunho
                        </span>
                      )}
                      {contract.status === "pending_signature" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-sm">
                          <Clock className="w-3 h-3" />
                          Pendente
                        </span>
                      )}
                      {contract.status === "signed" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm">
                          <CheckCircle className="w-3 h-3" />
                          Assinado
                        </span>
                      )}
                      {contract.status === "cancelled" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-sm">
                          <XCircle className="w-3 h-3" />
                          Cancelado
                        </span>
                      )}
                      {contract.status === "expired" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-sm">
                          <AlertTriangle className="w-3 h-3" />
                          Expirado
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Tipo:</span>{" "}
                    <span className="font-medium capitalize">{contract.contract_type.replace("_", " ")}</span>
                  </div>

                  {contract.professional_signed_at && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Assinado em:</span>{" "}
                      <span className="font-medium">
                        {new Date(contract.professional_signed_at).toLocaleString("pt-BR")}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" onClick={() => setPreviewContract(contract)} className="rounded-xl">
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar
                    </Button>

                    {contract.status === "draft" && (
                      <Button onClick={() => setSigningContract(contract)} className="rounded-xl">
                        <PenTool className="w-4 h-4 mr-2" />
                        Assinar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      {/* Preview Dialog */}
      {previewContract && (
        <Dialog open={!!previewContract} onOpenChange={() => setPreviewContract(null)}>
          <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {previewContract.title}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Timeline Sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <ContractTimeline contract={previewContract} />
              </div>

              {/* PDF Viewer */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <ContractPDFViewer contract={previewContract} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Signature Dialog */}
      {signingContract && (
        <Dialog open={!!signingContract} onOpenChange={() => setSigningContract(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assinar Contrato</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-xl p-1">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  className="w-full cursor-crosshair bg-white rounded-lg"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={clearSignature} className="flex-1 rounded-xl bg-transparent">
                  Limpar
                </Button>
                <Button onClick={handleSign} className="flex-1 rounded-xl">
                  <PenTool className="w-4 h-4 mr-2" />
                  Confirmar Assinatura
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
