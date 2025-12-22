"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import {
  FileText,
  Plus,
  Search,
  Download,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Package,
  RefreshCw,
  Eye,
  Trash2,
  Mail,
  FileCode,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Ban,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"
import {
  getNFeInvoices,
  getNFeStats,
  createNFe,
  sendNFeToAPI,
  cancelNFe,
  downloadNFeXML,
  getNFeById,
  getNFeFullConfiguration,
} from "@/app/actions/nfe"
import { getNFeServices } from "@/app/actions/nfe-services"
import { getPatients } from "@/app/actions/patients"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NFeInvoice {
  id: string
  invoice_number: string
  invoice_type: string
  customer_name: string
  customer_cpf_cnpj: string
  services_value: number
  iss_value: number
  net_value: number
  status: string
  authorization_protocol?: string
  access_key?: string
  verification_code?: string
  created_at: string
  patient_name?: string
}

interface NFeStats {
  drafts: number
  processing: number
  authorized: number
  rejected: number
  cancelled: number
  errors: number
  total_value: number
  month_count: number
  month_value: number
}

interface Service {
  id: string
  code: string
  description: string
  lc116_code: string
  iss_rate: number
  unit_price: number
}

interface Patient {
  id: string
  full_name: string
  cpf: string
  email?: string
}

export default function NFePage() {
  const [invoices, setInvoices] = useState<NFeInvoice[]>([])
  const [stats, setStats] = useState<NFeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isConfigured, setIsConfigured] = useState(false)

  // Modal de emissão
  const [showEmitModal, setShowEmitModal] = useState(false)
  const [patients, setPatients] = useState<Patient[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [emitLoading, setEmitLoading] = useState(false)

  // Form de emissão
  const [selectedPatient, setSelectedPatient] = useState("")
  const [invoiceType, setInvoiceType] = useState<"nfse" | "nfe">("nfse")
  const [selectedServices, setSelectedServices] = useState<
    Array<{ serviceId: string; quantity: number; unitPrice: number }>
  >([])
  const [observations, setObservations] = useState("")

  // Modal de detalhes
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  // Modal de cancelamento
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelReason, setCancelReason] = useState("")
  const [cancelLoading, setCancelLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    try {
      const [invoicesResult, statsResult, configResult] = await Promise.all([
        getNFeInvoices(),
        getNFeStats(),
        getNFeFullConfiguration(),
      ])

      if (invoicesResult.success) setInvoices(invoicesResult.data || [])
      if (statsResult.success) setStats(statsResult.data)
      if (configResult.success) {
        setIsConfigured(!!configResult.data?.company_cnpj)
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    }
    setLoading(false)
  }

  async function openEmitModal() {
    // Carregar pacientes e serviços
    const [patientsResult, servicesResult] = await Promise.all([
      getPatients(),
      getNFeServices(),
    ])

    if (patientsResult.success) setPatients(patientsResult.patients || [])
    if (servicesResult.success) setServices(servicesResult.data || [])

    setSelectedPatient("")
    setSelectedServices([])
    setObservations("")
    setShowEmitModal(true)
  }

  function addService() {
    setSelectedServices([
      ...selectedServices,
      { serviceId: "", quantity: 1, unitPrice: 0 },
    ])
  }

  function updateService(index: number, field: string, value: any) {
    const updated = [...selectedServices]

    if (field === "serviceId") {
      const service = services.find((s) => s.id === value)
      if (service) {
        updated[index] = {
          ...updated[index],
          serviceId: value,
          unitPrice: service.unit_price,
        }
      }
    } else {
      updated[index] = { ...updated[index], [field]: value }
    }

    setSelectedServices(updated)
  }

  function removeService(index: number) {
    setSelectedServices(selectedServices.filter((_, i) => i !== index))
  }

  function calculateTotal() {
    return selectedServices.reduce(
      (sum, s) => sum + s.quantity * s.unitPrice,
      0
    )
  }

  async function handleEmit() {
    if (!selectedPatient) {
      toast.error("Selecione um paciente")
      return
    }

    if (selectedServices.length === 0 || !selectedServices.some((s) => s.serviceId)) {
      toast.error("Adicione pelo menos um serviço")
      return
    }

    setEmitLoading(true)
    try {
      const servicesData = selectedServices
        .filter((s) => s.serviceId)
        .map((s) => {
          const service = services.find((srv) => srv.id === s.serviceId)
          return {
            code: service?.code || "",
            description: service?.description || "",
            lc116_code: service?.lc116_code || "4.01",
            cnae_code: "",
            iss_rate: service?.iss_rate || 2.0,
            unit_price: s.unitPrice,
            quantity: s.quantity,
            total_value: s.quantity * s.unitPrice,
          }
        })

      const result = await createNFe({
        patient_id: selectedPatient,
        services: servicesData,
        invoice_type: invoiceType,
        observations,
      })

      if (result.success) {
        toast.success("Nota fiscal criada com sucesso!")
        setShowEmitModal(false)
        loadData()
      } else {
        toast.error(result.error || "Erro ao criar nota fiscal")
      }
    } catch (error) {
      toast.error("Erro ao criar nota fiscal")
    }
    setEmitLoading(false)
  }

  async function handleSendToSefaz(id: string) {
    const result = await sendNFeToAPI(id)
    if (result.success) {
      toast.success(result.message || "Nota enviada com sucesso!")
      loadData()
    } else {
      toast.error(result.error || "Erro ao enviar nota")
    }
  }

  async function handleViewDetails(id: string) {
    setDetailsLoading(true)
    setShowDetailsModal(true)

    const result = await getNFeById(id)
    if (result.success) {
      setSelectedInvoice(result.data)
    } else {
      toast.error(result.error || "Erro ao carregar detalhes")
    }
    setDetailsLoading(false)
  }

  async function handleDownloadXML(id: string) {
    const result = await downloadNFeXML(id)
    if (result.success && result.xml) {
      // Criar blob e fazer download
      const blob = new Blob([result.xml], { type: "application/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = result.filename || "nfe.xml"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("XML baixado com sucesso!")
    } else {
      toast.error(result.error || "Erro ao baixar XML")
    }
  }

  async function handleCancel() {
    if (!selectedInvoice) return

    if (cancelReason.length < 15) {
      toast.error("O motivo deve ter pelo menos 15 caracteres")
      return
    }

    setCancelLoading(true)
    const result = await cancelNFe(selectedInvoice.id, cancelReason)
    if (result.success) {
      toast.success("Nota cancelada com sucesso!")
      setShowCancelModal(false)
      setShowDetailsModal(false)
      setCancelReason("")
      loadData()
    } else {
      toast.error(result.error || "Erro ao cancelar nota")
    }
    setCancelLoading(false)
  }

  function getStatusBadge(status: string) {
    const config: Record<string, { label: string; variant: any; icon: any }> = {
      draft: { label: "Rascunho", variant: "secondary", icon: Clock },
      processing: { label: "Processando", variant: "warning", icon: RefreshCw },
      authorized: { label: "Autorizada", variant: "success", icon: CheckCircle },
      rejected: { label: "Rejeitada", variant: "destructive", icon: XCircle },
      cancelled: { label: "Cancelada", variant: "outline", icon: Ban },
      error: { label: "Erro", variant: "destructive", icon: AlertTriangle },
    }

    const cfg = config[status] || config.draft
    const Icon = cfg.icon

    return (
      <Badge variant={cfg.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {cfg.label}
      </Badge>
    )
  }

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoice_number?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Nota Fiscal Eletrônica
          </h1>
          <p className="text-muted-foreground">Emissão e gestão de NF-e e NFS-e</p>
        </div>
        <div className="flex gap-2">
          <Link href="/nfe/servicos">
            <Button variant="outline">
              <Package className="w-4 h-4 mr-2" />
              Serviços
            </Button>
          </Link>
          <Link href="/nfe/configuracao">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configuração
            </Button>
          </Link>
          <Button onClick={openEmitModal} disabled={!isConfigured}>
            <Plus className="w-4 h-4 mr-2" />
            Emitir Nota
          </Button>
        </div>
      </div>

      {/* Alerta de configuração */}
      {!isConfigured && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <CardContent className="flex items-center gap-4 py-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="font-medium">Configure sua empresa para emitir notas fiscais</p>
              <p className="text-sm text-muted-foreground">
                É necessário cadastrar os dados fiscais antes de emitir notas.
              </p>
            </div>
            <Link href="/nfe/configuracao" className="ml-auto">
              <Button variant="outline">Configurar Agora</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Dashboard Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Notas do Mês</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.month_count || 0}</div>
            <p className="text-xs text-muted-foreground">
              R$ {(stats?.month_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Autorizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.authorized || 0}</div>
            <p className="text-xs text-muted-foreground">Total geral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {(stats?.drafts || 0) + (stats?.processing || 0)}
            </div>
            <p className="text-xs text-muted-foreground">Aguardando envio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(stats?.total_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground">Notas autorizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Notas */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notas Fiscais</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="draft">Rascunho</SelectItem>
                  <SelectItem value="authorized">Autorizada</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                  <SelectItem value="rejected">Rejeitada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredInvoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Nenhuma nota fiscal encontrada</p>
              {isConfigured && (
                <Button onClick={openEmitModal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Emitir Primeira Nota
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoice_number}
                    </TableCell>
                    <TableCell>{invoice.customer_name || invoice.patient_name}</TableCell>
                    <TableCell>
                      R$ {(invoice.services_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(invoice.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          {invoice.status === "draft" && (
                            <DropdownMenuItem onClick={() => handleSendToSefaz(invoice.id)}>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar para SEFAZ
                            </DropdownMenuItem>
                          )}
                          {invoice.status === "authorized" && (
                            <>
                              <DropdownMenuItem onClick={() => handleDownloadXML(invoice.id)}>
                                <FileCode className="w-4 h-4 mr-2" />
                                Baixar XML
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadXML(invoice.id)}>
                                <Download className="w-4 h-4 mr-2" />
                                Baixar PDF
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Modal de Emissão */}
      <Dialog open={showEmitModal} onOpenChange={setShowEmitModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Emitir Nota Fiscal</DialogTitle>
            <DialogDescription>Preencha os dados para emissão da nota fiscal</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Nota</Label>
                <Select value={invoiceType} onValueChange={(v: "nfe" | "nfse") => setInvoiceType(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nfse">NFS-e (Serviços)</SelectItem>
                    <SelectItem value="nfe">NF-e (Produtos)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Cliente/Paciente *</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.full_name} {p.cpf ? `- ${p.cpf}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Serviços</Label>
                <Button type="button" variant="outline" size="sm" onClick={addService}>
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>

              {selectedServices.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Clique em "Adicionar" para incluir serviços
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedServices.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label className="text-xs">Serviço</Label>
                        <Select
                          value={item.serviceId}
                          onValueChange={(v) => updateService(index, "serviceId", v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.code} - {s.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-20">
                        <Label className="text-xs">Qtd</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateService(index, "quantity", parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="w-32">
                        <Label className="text-xs">Valor Unit.</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => updateService(index, "unitPrice", parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="w-32">
                        <Label className="text-xs">Total</Label>
                        <Input
                          value={(item.quantity * item.unitPrice).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                          disabled
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeService(index)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Valor Total</p>
                      <p className="text-2xl font-bold">
                        {calculateTotal().toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Informações adicionais para a nota fiscal..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEmitModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEmit} disabled={emitLoading}>
              {emitLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
              Criar Nota Fiscal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Detalhes da Nota {selectedInvoice?.invoice_number}
            </DialogTitle>
          </DialogHeader>

          {detailsLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : selectedInvoice ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedInvoice.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPF/CNPJ</p>
                  <p className="font-medium">{selectedInvoice.customer_cpf_cnpj}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="font-medium">
                    R$ {(selectedInvoice.services_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedInvoice.status)}
                </div>
              </div>

              {selectedInvoice.access_key && (
                <div>
                  <p className="text-sm text-muted-foreground">Chave de Acesso</p>
                  <p className="font-mono text-xs break-all">{selectedInvoice.access_key}</p>
                </div>
              )}

              {selectedInvoice.verification_code && (
                <div>
                  <p className="text-sm text-muted-foreground">Código de Verificação</p>
                  <p className="font-mono font-bold">{selectedInvoice.verification_code}</p>
                </div>
              )}

              {selectedInvoice.authorization_protocol && (
                <div>
                  <p className="text-sm text-muted-foreground">Protocolo</p>
                  <p className="font-medium">{selectedInvoice.authorization_protocol}</p>
                </div>
              )}

              {selectedInvoice.status === "authorized" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => handleDownloadXML(selectedInvoice.id)}>
                    <FileCode className="w-4 h-4 mr-2" />
                    Baixar XML
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar DANFE
                  </Button>
                  <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar por Email
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowCancelModal(true)
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}

              {selectedInvoice.status === "draft" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={() => handleSendToSefaz(selectedInvoice.id)}>
                    <Send className="w-4 h-4 mr-2" />
                    Enviar para SEFAZ
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowCancelModal(true)
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Rascunho
                  </Button>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Modal de Cancelamento */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Nota Fiscal</DialogTitle>
            <DialogDescription>
              Informe o motivo do cancelamento. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Motivo do Cancelamento *</Label>
              <Textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Mínimo 15 caracteres..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                {cancelReason.length}/15 caracteres (mínimo)
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelModal(false)}>
              Voltar
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelLoading || cancelReason.length < 15}
            >
              {cancelLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
              Confirmar Cancelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
