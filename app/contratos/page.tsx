"use client"

import type React from "react"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  FileText,
  CheckCircle,
  Eye,
  PenTool,
  Clock,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  User,
  MoreHorizontal,
  Download,
  Trash2,
  Send,
  X,
  Loader2,
} from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { createContract, getContracts, getContractTemplates, signContract } from "@/app/actions/contracts"
import { getPatientsList } from "@/app/actions/crm"
import { toast } from "sonner"
import { ContractPDFViewer } from "@/components/contract-pdf-viewer"
import { ContractTimeline, ContractTimelineCompact } from "@/components/contract-timeline"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const contractTypeLabels: Record<string, string> = {
  informed_consent: "Consentimento Informado",
  treatment_plan: "Plano de Tratamento",
  telemedicine_consent: "Telemedicina",
  service_agreement: "Contrato de Serviço",
  privacy_policy: "Política de Privacidade",
  payment_plan: "Plano de Pagamento",
  other: "Outro",
}

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  draft: { label: "Rascunho", icon: FileText, color: "text-gray-600", bg: "bg-gray-100" },
  pending_signature: { label: "Pendente", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  signed: { label: "Assinado", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
  cancelled: { label: "Cancelado", icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  expired: { label: "Expirado", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-100" },
}

export default function ContratosPage() {
  const [contracts, setContracts] = useState<any[]>([])
  const [patients, setPatients] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false)
  const [previewContract, setPreviewContract] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
  const [isSigning, setIsSigning] = useState(false)

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

  // Initialize canvas when signing dialog opens
  useEffect(() => {
    if (signingContract && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.strokeStyle = "#1e40af"
        ctx.lineWidth = 2
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
      }
    }
  }, [signingContract])

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

    setIsSubmitting(true)
    const selectedPatientData = patients.find((p) => p.id === selectedPatient)

    // Substituir variáveis - suporta ambos os formatos: {VAR} e {{var}}
    let finalContent = content
    const today = new Date().toLocaleDateString("pt-BR")

    if (selectedPatientData) {
      finalContent = finalContent
        // Formato antigo: {VARIAVEL}
        .replace(/\{PACIENTE_NOME\}/g, selectedPatientData.full_name)
        .replace(/\{PACIENTE_CPF\}/g, selectedPatientData.cpf || "")
        .replace(/\{PACIENTE_RG\}/g, selectedPatientData.rg || "")
        .replace(/\{DATA_HOJE\}/g, today)
        // Formato novo: {{variavel}} - templates do banco de dados
        .replace(/\{\{patient_name\}\}/gi, selectedPatientData.full_name)
        .replace(/\{\{patientname\}\}/gi, selectedPatientData.full_name)
        .replace(/\{\{patient_cpf\}\}/gi, selectedPatientData.cpf || "Não informado")
        .replace(/\{\{patientcpf\}\}/gi, selectedPatientData.cpf || "Não informado")
        .replace(/\{\{date\}\}/gi, today)
        .replace(/\{\{clinic_name\}\}/gi, "AtendeBem")
        .replace(/\{\{clinicname\}\}/gi, "AtendeBem")
    }

    // Substituir variáveis que não dependem do paciente
    finalContent = finalContent
      .replace(/\{\{date\}\}/gi, today)
      .replace(/\{\{clinic_name\}\}/gi, "AtendeBem")
      // Variáveis de procedimento - substituir por texto padrão se não preenchidas
      .replace(/\{\{procedure_name\}\}/gi, "Procedimento a ser especificado")
      .replace(/\{\{procedurename\}\}/gi, "Procedimento a ser especificado")
      .replace(/\{\{procedure_description\}\}/gi, "Descrição do procedimento será detalhada pelo profissional.")
      .replace(/\{\{proceduredescription\}\}/gi, "Descrição do procedimento será detalhada pelo profissional.")
      .replace(/\{\{risks_benefits\}\}/gi, "Os riscos e benefícios serão explicados pelo profissional responsável.")
      .replace(/\{\{risksbenefits\}\}/gi, "Os riscos e benefícios serão explicados pelo profissional responsável.")

    const result = await createContract({
      patient_id: selectedPatient,
      title,
      contract_type: contractType || "other",
      content: finalContent,
      template_id: selectedTemplate || undefined,
      valid_until: validUntil || undefined,
    })

    setIsSubmitting(false)

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

  // Canvas signature - Touch support
  function getCoordinates(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function startDrawing(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    e.preventDefault()
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!isDrawing) return
    e.preventDefault()

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
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

    // Check if canvas has any drawing
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const hasDrawing = imageData.data.some((channel, i) => i % 4 === 3 && channel !== 0)

    if (!hasDrawing) {
      toast.error("Por favor, desenhe sua assinatura")
      return
    }

    setIsSigning(true)
    const signatureDataUrl = canvas.toDataURL()

    const result = await signContract({
      contract_id: signingContract.id,
      signature_url: signatureDataUrl,
      ip_address: "0.0.0.0",
      user_agent: navigator.userAgent,
    })

    setIsSigning(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Contrato assinado com sucesso!")
      setSigningContract(null)
      loadData()
    }
  }

  // Filter contracts
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.contract_number.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || contract.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Stats
  const stats = {
    total: contracts.length,
    draft: contracts.filter((c) => c.status === "draft").length,
    pending: contracts.filter((c) => c.status === "pending_signature").length,
    signed: contracts.filter((c) => c.status === "signed").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavigationHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contratos</h1>
            <p className="text-gray-500 mt-1">Gerencie contratos e termos de consentimento</p>
          </div>

          <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                <Plus className="w-4 h-4 mr-2" />
                Novo Contrato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl w-[95vw] max-h-[85vh] overflow-hidden flex flex-col p-0">
              <DialogHeader className="px-5 py-4 border-b bg-gradient-to-r from-blue-50 to-white shrink-0">
                <DialogTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  Novo Contrato
                </DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <div className="space-y-4">
                  {/* Paciente e Template */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-gray-600">Paciente *</Label>
                      <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                        <SelectTrigger className="rounded-lg h-10 text-sm">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-48">
                          {patients.map((p) => (
                            <SelectItem key={p.id} value={p.id} className="text-sm">
                              {p.full_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-gray-600">Template</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger className="rounded-lg h-10 text-sm">
                          <SelectValue placeholder="Opcional..." />
                        </SelectTrigger>
                        <SelectContent className="max-h-48">
                          {templates.map((t) => (
                            <SelectItem key={t.id} value={t.id} className="text-sm">
                              {t.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Título e Tipo */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-gray-600">Título *</Label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Termo de Consentimento"
                        className="rounded-lg h-10 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-gray-600">Tipo</Label>
                      <Select value={contractType} onValueChange={setContractType}>
                        <SelectTrigger className="rounded-lg h-10 text-sm">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informed_consent">Consentimento</SelectItem>
                          <SelectItem value="treatment_plan">Tratamento</SelectItem>
                          <SelectItem value="telemedicine_consent">Telemedicina</SelectItem>
                          <SelectItem value="service_agreement">Serviço</SelectItem>
                          <SelectItem value="privacy_policy">Privacidade</SelectItem>
                          <SelectItem value="payment_plan">Pagamento</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Validade */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-600">Validade (opcional)</Label>
                    <Input
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      className="rounded-lg h-10 text-sm w-full sm:w-48"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-gray-600">Conteúdo *</Label>
                      <span className="text-[10px] text-gray-400">Suporta Markdown</span>
                    </div>
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Digite ou selecione um template..."
                      className="rounded-lg min-h-[140px] text-sm resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t bg-gray-50 flex gap-2 shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setIsNewDialogOpen(false)}
                  className="flex-1 rounded-lg h-9 text-sm text-gray-600"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !selectedPatient || !title || !content}
                  className="flex-1 rounded-lg h-9 text-sm bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Criar Contrato"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="rounded-2xl border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Rascunhos</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats.draft}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pendentes</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Assinados</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{stats.signed}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="rounded-2xl border-0 shadow-sm bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar por título, paciente ou número..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl h-11 border-gray-200"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] rounded-xl h-11">
                    <Filter className="w-4 h-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="draft">Rascunho</SelectItem>
                    <SelectItem value="pending_signature">Pendente</SelectItem>
                    <SelectItem value="signed">Assinado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contracts List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="rounded-2xl border-0 shadow-sm bg-white">
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-gray-500">Carregando contratos...</p>
                </div>
              </CardContent>
            </Card>
          ) : filteredContracts.length === 0 ? (
            <Card className="rounded-2xl border-0 shadow-sm bg-white">
              <CardContent className="py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-900 font-medium">Nenhum contrato encontrado</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {searchTerm || statusFilter !== "all"
                        ? "Tente ajustar os filtros de busca"
                        : "Crie seu primeiro contrato clicando no botão acima"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredContracts.map((contract) => {
              const status = statusConfig[contract.status] || statusConfig.draft
              const StatusIcon = status.icon

              return (
                <Card
                  key={contract.id}
                  className="rounded-2xl border-0 shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Contract Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-gray-900 truncate">{contract.title}</h3>
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}
                              >
                                <StatusIcon className="w-3 h-3" />
                                {status.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {contract.patient_name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(contract.created_at).toLocaleDateString("pt-BR")}
                              </span>
                              <span className="text-gray-400">{contract.contract_number}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {contractTypeLabels[contract.contract_type] || contract.contract_type}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPreviewContract(contract)}
                          className="rounded-xl"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </Button>

                        {contract.status === "draft" && (
                          <Button
                            size="sm"
                            onClick={() => setSigningContract(contract)}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700"
                          >
                            <PenTool className="w-4 h-4 mr-2" />
                            Assinar
                          </Button>
                        )}

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-xl">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="rounded-xl">
                            <DropdownMenuItem onClick={() => setPreviewContract(contract)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Baixar PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar por Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      </main>

      {/* Preview Dialog */}
      <Dialog open={!!previewContract} onOpenChange={() => setPreviewContract(null)}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col p-0">
          {/* Header compacto */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-white shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="font-medium text-gray-900 text-sm truncate">{previewContract?.title}</h2>
                <p className="text-xs text-gray-500">{previewContract?.contract_number}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {previewContract && (
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[previewContract.status]?.bg} ${statusConfig[previewContract.status]?.color}`}>
                  {statusConfig[previewContract.status]?.label}
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewContract(null)}
                className="rounded-lg h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Timeline compacta no topo - visível em mobile */}
            <div className="lg:hidden p-3 bg-white border-b">
              {previewContract && <ContractTimelineCompact contract={previewContract} />}
            </div>

            <div className="flex h-full">
              {/* Timeline Sidebar - apenas desktop */}
              <div className="hidden lg:block w-64 shrink-0 border-r bg-white p-4 overflow-y-auto">
                {previewContract && <ContractTimeline contract={previewContract} />}
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 p-4 overflow-y-auto">
                {previewContract && <ContractPDFViewer contract={previewContract} />}
              </div>
            </div>
          </div>

          {/* Footer com ações */}
          <div className="px-4 py-3 border-t bg-white flex items-center justify-between gap-2 shrink-0">
            <div className="text-xs text-gray-500">
              Criado em {previewContract && new Date(previewContract.created_at).toLocaleDateString("pt-BR")}
            </div>
            <div className="flex gap-2">
              {previewContract?.status === "draft" && (
                <Button
                  size="sm"
                  onClick={() => {
                    setPreviewContract(null)
                    setSigningContract(previewContract)
                  }}
                  className="rounded-lg h-8 text-xs bg-blue-600 hover:bg-blue-700"
                >
                  <PenTool className="w-3 h-3 mr-1" />
                  Assinar
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg h-8 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                PDF
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signature Dialog */}
      <Dialog open={!!signingContract} onOpenChange={() => setSigningContract(null)}>
        <DialogContent className="max-w-md w-[95vw] p-0 overflow-hidden">
          <DialogHeader className="px-4 py-3 border-b bg-gradient-to-r from-blue-50 to-white">
            <DialogTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <PenTool className="w-4 h-4 text-white" />
              </div>
              Assinar Contrato
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-4">
            {/* Info do contrato - mais compacto */}
            <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{signingContract?.title}</p>
                <p className="text-xs text-gray-500">{signingContract?.patient_name}</p>
              </div>
            </div>

            {/* Canvas de assinatura */}
            <div>
              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                Desenhe sua assinatura
              </Label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-lg bg-white overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={380}
                  height={150}
                  className="w-full h-[150px] cursor-crosshair touch-none"
                  style={{ touchAction: "none" }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {/* Linha guia */}
                <div className="absolute bottom-8 left-4 right-4 border-b border-gray-200 pointer-events-none" />
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                Use o mouse ou toque para assinar
              </p>
            </div>
          </div>

          {/* Footer com botões */}
          <div className="px-4 py-3 border-t bg-gray-50 flex gap-2">
            <Button
              variant="ghost"
              onClick={clearSignature}
              className="rounded-lg h-9 text-sm text-gray-600"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Limpar
            </Button>
            <Button
              onClick={handleSign}
              disabled={isSigning}
              className="flex-1 rounded-lg h-9 text-sm bg-blue-600 hover:bg-blue-700"
            >
              {isSigning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Confirmar
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
