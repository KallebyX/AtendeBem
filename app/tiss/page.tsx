"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Search,
  FileDown,
  Filter,
  Send,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  FileSearch,
  Upload,
  Plus,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Building2,
  Receipt,
  FileWarning,
  Loader2,
  Download,
  Eye,
  X
} from "lucide-react"
import { searchTUSS, tussStats, tussGroups, type TUSSProcedure } from "@/lib/tuss-complete"
import { NavigationHeader } from "@/components/navigation-header"
import { PatientSearchSelect } from "@/components/patient-search-select"
import {
  getTISSGuides,
  getTISSSubmissions,
  getTISSDashboard,
  getTISSGlosas,
  generateTISSSubmissionXML,
  processReturnXML,
  searchTUSSProcedures
} from "@/app/actions/tiss"

// Tipos
interface Guide {
  id: string
  guide_number: string
  guide_type: string
  patient_name: string
  beneficiary_card_number?: string
  procedures: any[]
  total_value: number
  status: string
  payment_status: string
  created_at: string
}

interface Submission {
  id: string
  lote_number: string
  guide_type: string
  operadora_codigo: string
  total_guides: number
  total_value: number
  status: string
  protocol_number?: string
  sent_at?: string
  total_glosas?: number
  valor_glosado?: number
  created_at: string
}

interface Glosa {
  id: string
  codigo_glosa: string
  descricao_glosa: string
  categoria: string
  valor_glosado: number
  status: string
  acao_sugerida: string
  created_at: string
}

interface DashboardStats {
  guias: {
    total: number
    rascunho: number
    pendente: number
    enviado: number
    processado: number
    valor_total: number
    valor_pago: number
    valor_glosado: number
  }
  submissoes: {
    total: number
    pendente: number
    enviado: number
    processado: number
    rejeitado: number
  }
  glosas: {
    total: number
    valor_total: number
    pendentes: number
  }
}

export default function TISSPage() {
  // Estados
  const [activeTab, setActiveTab] = useState("dashboard")
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [tussResults, setTussResults] = useState<TUSSProcedure[]>([])

  // Dados
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null)
  const [guides, setGuides] = useState<Guide[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [glosas, setGlosas] = useState<Glosa[]>([])
  const [selectedGuides, setSelectedGuides] = useState<string[]>([])

  // Modais
  const [showNewGuideModal, setShowNewGuideModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showXMLPreview, setShowXMLPreview] = useState(false)
  const [generatedXML, setGeneratedXML] = useState("")

  // Nova Guia - paciente selecionado
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string
    full_name: string
    cpf: string
    phone?: string
    date_of_birth?: string
    email?: string
  } | null>(null)

  // Nova Guia - procedimentos TUSS
  const [guideTussSearch, setGuideTussSearch] = useState("")
  const [guideTussResults, setGuideTussResults] = useState<TUSSProcedure[]>([])
  const [selectedProcedures, setSelectedProcedures] = useState<TUSSProcedure[]>([])
  const [showTussSearch, setShowTussSearch] = useState(false)

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Carrega dados iniciais
  useEffect(() => {
    loadDashboard()
    loadGuides()
    loadSubmissions()
  }, [])

  const loadDashboard = async () => {
    const result = await getTISSDashboard()
    if (result.success && result.data) {
      setDashboard(result.data)
    }
  }

  const loadGuides = async () => {
    setLoading(true)
    const result = await getTISSGuides({ limit: 50 })
    if (result.success && result.data) {
      setGuides(result.data)
    }
    setLoading(false)
  }

  const loadSubmissions = async () => {
    const result = await getTISSSubmissions({})
    if (result.success && result.data) {
      setSubmissions(result.data)
    }
  }

  const loadGlosas = async () => {
    const result = await getTISSGlosas({})
    if (result.success && result.data) {
      setGlosas(result.data)
    }
  }

  // Busca TUSS
  const handleTUSSSearch = useCallback(() => {
    let filtered = searchTUSS(searchQuery, 100)
    if (selectedGroup !== "all") {
      filtered = filtered.filter((p) => p.group === selectedGroup)
    }
    setTussResults(filtered)
  }, [searchQuery, selectedGroup])

  // Busca TUSS para Nova Guia
  const handleGuideTussSearch = useCallback((query: string) => {
    setGuideTussSearch(query)
    if (query.length >= 2) {
      const results = searchTUSS(query, 20)
      setGuideTussResults(results)
    } else {
      setGuideTussResults([])
    }
  }, [])

  // Adicionar procedimento à guia
  const handleAddProcedure = (procedure: TUSSProcedure) => {
    if (!selectedProcedures.find(p => p.code === procedure.code)) {
      setSelectedProcedures([...selectedProcedures, procedure])
    }
    setGuideTussSearch("")
    setGuideTussResults([])
    setShowTussSearch(false)
  }

  // Remover procedimento da guia
  const handleRemoveProcedure = (code: string) => {
    setSelectedProcedures(selectedProcedures.filter(p => p.code !== code))
  }

  // Gera lote XML
  const handleGenerateLote = async () => {
    if (selectedGuides.length === 0) {
      alert("Selecione pelo menos uma guia para gerar o lote")
      return
    }

    setLoading(true)
    const result = await generateTISSSubmissionXML({
      guide_ids: selectedGuides,
      operadora_registro_ans: "999999" // TODO: Selecionar operadora
    })

    if (result.success && result.xml) {
      setGeneratedXML(result.xml)
      setShowXMLPreview(true)
      loadSubmissions()
    } else if (result.error) {
      alert(`Erro: ${result.error}`)
    }
    setLoading(false)
  }

  // Upload de retorno
  const handleUploadReturn = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    const reader = new FileReader()
    reader.onload = async (e) => {
      const content = e.target?.result as string
      const result = await processReturnXML({ xml_content: content })

      if (result.success && result.data) {
        alert(`Retorno processado com sucesso!
Protocolo: ${result.data.demonstrativo.protocolo}
Valor processado: R$ ${result.data.demonstrativo.valor_processado.toFixed(2)}
Glosas: ${result.data.glosas.total} (R$ ${result.data.glosas.valor_total.toFixed(2)})`)
        loadSubmissions()
        loadGlosas()
        loadDashboard()
      } else if (result.error) {
        alert(`Erro ao processar retorno: ${result.error}`)
      }
      setLoading(false)
    }
    reader.readAsText(file, "ISO-8859-1")
  }

  // Download XML
  const handleDownloadXML = (xml: string, filename: string) => {
    const blob = new Blob([xml], { type: "text/xml;charset=ISO-8859-1" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export CSV
  const handleExportCSV = () => {
    const csv = [
      "Codigo,Descricao,Grupo,Capitulo,CBOS",
      ...tussResults.map((r) => `${r.code},"${r.description}","${r.group || ""}","${r.chapter || ""}","${r.cbos || ""}"`),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `tuss_export_${new Date().toISOString().split("T")[0]}.csv`)
    link.click()
    URL.revokeObjectURL(url)
  }

  // Helpers de renderizacao
  const getStatusBadge = (status: string) => {
    const configs: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
      draft: { color: "bg-gray-500", icon: <FileText className="w-3 h-3" />, label: "Rascunho" },
      pending: { color: "bg-yellow-500", icon: <Clock className="w-3 h-3" />, label: "Pendente" },
      sent: { color: "bg-blue-500", icon: <Send className="w-3 h-3" />, label: "Enviado" },
      processing: { color: "bg-purple-500", icon: <RefreshCw className="w-3 h-3" />, label: "Processando" },
      processed: { color: "bg-green-500", icon: <CheckCircle className="w-3 h-3" />, label: "Processado" },
      accepted: { color: "bg-green-500", icon: <CheckCircle className="w-3 h-3" />, label: "Aceito" },
      rejected: { color: "bg-red-500", icon: <XCircle className="w-3 h-3" />, label: "Rejeitado" },
      error: { color: "bg-red-500", icon: <AlertTriangle className="w-3 h-3" />, label: "Erro" },
    }

    const config = configs[status] || { color: "bg-gray-500", icon: null, label: status }

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const configs: Record<string, { color: string; label: string }> = {
      pending: { color: "bg-gray-500", label: "Aguardando" },
      authorized: { color: "bg-blue-500", label: "Autorizado" },
      paid: { color: "bg-green-500", label: "Pago" },
      denied: { color: "bg-red-500", label: "Negado" },
      gloss: { color: "bg-orange-500", label: "Glosado" },
      partial: { color: "bg-yellow-500", label: "Parcial" },
    }

    const config = configs[status] || { color: "bg-gray-500", label: status }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR")
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FileText className="w-8 h-8" />
                TISS - Faturamento de Convenios
              </h1>
              <p className="text-muted-foreground">
                Gestao completa de guias, lotes XML e glosas
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowUploadModal(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Retorno
              </Button>
              <Button onClick={() => setShowNewGuideModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Guia
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="guias">Guias</TabsTrigger>
              <TabsTrigger value="lotes">Lotes XML</TabsTrigger>
              <TabsTrigger value="glosas">Glosas</TabsTrigger>
              <TabsTrigger value="tuss">Tabela TUSS</TabsTrigger>
            </TabsList>

            {/* Tab: Dashboard */}
            <TabsContent value="dashboard" className="space-y-6">
              {dashboard ? (
                <>
                  {/* Cards de Resumo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Guias (30 dias)</CardTitle>
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboard.guias.total}</div>
                        <div className="flex gap-2 mt-2 text-xs">
                          <span className="text-yellow-500">{dashboard.guias.pendente} pendentes</span>
                          <span className="text-green-500">{dashboard.guias.processado} processadas</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Valor Faturado</CardTitle>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(Number(dashboard.guias.valor_total) || 0)}</div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Pago: {formatCurrency(Number(dashboard.guias.valor_pago) || 0)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Valor Glosado</CardTitle>
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-500">
                          {formatCurrency(Number(dashboard.glosas.valor_total) || 0)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {dashboard.glosas.pendentes} glosas pendentes
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Lotes Enviados</CardTitle>
                        <Send className="w-4 h-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{dashboard.submissoes.total}</div>
                        <div className="flex gap-2 mt-2 text-xs">
                          <span className="text-blue-500">{dashboard.submissoes.enviado} enviados</span>
                          <span className="text-red-500">{dashboard.submissoes.rejeitado} rejeitados</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Acoes Rapidas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Guias Pendentes</h3>
                          <p className="text-sm text-muted-foreground">
                            {dashboard.guias.pendente} guias aguardando envio
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("guias")}>
                          Ver
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                          <FileWarning className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Glosas Pendentes</h3>
                          <p className="text-sm text-muted-foreground">
                            {dashboard.glosas.pendentes} aguardando analise
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto" onClick={() => { loadGlosas(); setActiveTab("glosas") }}>
                          Ver
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Upload className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Processar Retorno</h3>
                          <p className="text-sm text-muted-foreground">
                            Upload de arquivo XML de retorno
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto" onClick={() => setShowUploadModal(true)}>
                          Upload
                        </Button>
                      </div>
                    </Card>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              )}
            </TabsContent>

            {/* Tab: Guias */}
            <TabsContent value="guias" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="sent">Enviado</SelectItem>
                      <SelectItem value="processed">Processado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={loadGuides}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  {selectedGuides.length > 0 && (
                    <Button onClick={handleGenerateLote} disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                      Gerar Lote ({selectedGuides.length})
                    </Button>
                  )}
                  <Button onClick={() => setShowNewGuideModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Guia
                  </Button>
                </div>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGuides(guides.filter(g => g.status === 'draft' || g.status === 'pending').map(g => g.id))
                            } else {
                              setSelectedGuides([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Numero</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pagamento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="w-20">Acoes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guides.map((guide) => (
                      <TableRow key={guide.id}>
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedGuides.includes(guide.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedGuides([...selectedGuides, guide.id])
                              } else {
                                setSelectedGuides(selectedGuides.filter(id => id !== guide.id))
                              }
                            }}
                            disabled={guide.status !== 'draft' && guide.status !== 'pending'}
                          />
                        </TableCell>
                        <TableCell className="font-mono">{guide.guide_number}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{guide.guide_type.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>{guide.patient_name}</TableCell>
                        <TableCell>{formatCurrency(Number(guide.total_value) || 0)}</TableCell>
                        <TableCell>{getStatusBadge(guide.status)}</TableCell>
                        <TableCell>{getPaymentStatusBadge(guide.payment_status)}</TableCell>
                        <TableCell>{formatDate(guide.created_at)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {guides.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                          Nenhuma guia encontrada
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Tab: Lotes XML */}
            <TabsContent value="lotes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Lotes Enviados</h2>
                <Button variant="outline" onClick={loadSubmissions}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </div>

              <div className="grid gap-4">
                {submissions.map((sub) => (
                  <Card key={sub.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <span className="font-semibold font-mono">{sub.lote_number}</span>
                            {getStatusBadge(sub.status)}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Tipo:</span>{" "}
                              <span className="font-medium">{sub.guide_type.toUpperCase()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Guias:</span>{" "}
                              <span className="font-medium">{sub.total_guides}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Valor:</span>{" "}
                              <span className="font-medium">{formatCurrency(Number(sub.total_value) || 0)}</span>
                            </div>
                            {sub.protocol_number && (
                              <div>
                                <span className="text-muted-foreground">Protocolo:</span>{" "}
                                <span className="font-medium font-mono">{sub.protocol_number}</span>
                              </div>
                            )}
                          </div>
                          {(sub.total_glosas || 0) > 0 && (
                            <div className="flex items-center gap-2 text-orange-600">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm">
                                {sub.total_glosas} glosas ({formatCurrency(Number(sub.valor_glosado) || 0)})
                              </span>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Criado em {formatDate(sub.created_at)}
                            {sub.sent_at && ` | Enviado em ${formatDate(sub.sent_at)}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {submissions.length === 0 && (
                  <Card className="p-8 text-center">
                    <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum lote enviado</h3>
                    <p className="text-muted-foreground mb-4">
                      Selecione guias na aba "Guias" e gere um lote XML para enviar
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("guias")}>
                      Ver Guias
                    </Button>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Tab: Glosas */}
            <TabsContent value="glosas" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Glosas Recebidas</h2>
                <Button variant="outline" onClick={loadGlosas}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar
                </Button>
              </div>

              {glosas.length > 0 ? (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Codigo</TableHead>
                        <TableHead>Descricao</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Acao Sugerida</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {glosas.map((glosa) => (
                        <TableRow key={glosa.id}>
                          <TableCell className="font-mono">{glosa.codigo_glosa}</TableCell>
                          <TableCell className="max-w-xs truncate">{glosa.descricao_glosa}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{glosa.categoria}</Badge>
                          </TableCell>
                          <TableCell className="text-red-600">{formatCurrency(Number(glosa.valor_glosado) || 0)}</TableCell>
                          <TableCell>{getStatusBadge(glosa.status)}</TableCell>
                          <TableCell className="text-sm">{glosa.acao_sugerida?.replace(/_/g, " ")}</TableCell>
                          <TableCell>{formatDate(glosa.created_at)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              ) : (
                <Card className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma glosa pendente</h3>
                  <p className="text-muted-foreground">
                    Faca upload de um arquivo de retorno para processar glosas
                  </p>
                </Card>
              )}
            </TabsContent>

            {/* Tab: Tabela TUSS */}
            <TabsContent value="tuss" className="space-y-4">
              <Card className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Grupo</Label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os grupos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {tussGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Buscar</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Codigo ou descricao..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleTUSSSearch()}
                      />
                      <Button onClick={handleTUSSSearch}>
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {tussStats.total.toLocaleString("pt-BR")} procedimentos disponiveis
                  </p>
                  {tussResults.length > 0 && (
                    <Button onClick={handleExportCSV} variant="outline" size="sm">
                      <FileDown className="w-4 h-4 mr-2" />
                      Exportar CSV
                    </Button>
                  )}
                </div>
              </Card>

              {tussResults.length > 0 && (
                <Card className="p-4">
                  <h2 className="text-xl font-semibold mb-4">
                    {tussResults.length} resultado{tussResults.length !== 1 ? "s" : ""}
                  </h2>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {tussResults.map((proc, index) => (
                      <div key={`${proc.code}-${index}`} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col md:flex-row justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start gap-3">
                              <Badge variant="outline" className="font-mono shrink-0">{proc.code}</Badge>
                              <p className="font-medium text-sm md:text-base">{proc.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {proc.group && <Badge variant="secondary" className="text-xs">{proc.group}</Badge>}
                              {proc.cbos && proc.cbos !== "-" && <Badge variant="outline" className="text-xs">CBOS: {proc.cbos}</Badge>}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => {
                            // TODO: Adicionar procedimento à guia
                            alert(`Procedimento ${proc.code} selecionado`)
                          }}>
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {tussResults.length === 0 && searchQuery && (
                <Card className="p-12 text-center">
                  <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modal: Upload Retorno */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload de Retorno XML</DialogTitle>
            <DialogDescription>
              Faca upload do arquivo XML de retorno (demonstrativoRetorno) recebido da operadora
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Arraste um arquivo XML ou clique para selecionar
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xml"
                className="hidden"
                onChange={handleUploadReturn}
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Selecionar Arquivo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              O arquivo sera processado automaticamente e as glosas serao registradas no sistema
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal: Preview XML */}
      <Dialog open={showXMLPreview} onOpenChange={setShowXMLPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>XML Gerado</DialogTitle>
            <DialogDescription>
              Revise o XML antes de enviar para a operadora
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-auto max-h-96 bg-muted rounded-lg p-4">
            <pre className="text-xs font-mono whitespace-pre-wrap">{generatedXML}</pre>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowXMLPreview(false)}>
              Fechar
            </Button>
            <Button onClick={() => handleDownloadXML(generatedXML, `lote_tiss_${Date.now()}.xml`)}>
              <Download className="w-4 h-4 mr-2" />
              Download XML
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Nova Guia */}
      <Dialog open={showNewGuideModal} onOpenChange={(open) => {
        setShowNewGuideModal(open)
        if (!open) {
          setSelectedPatient(null)
          setSelectedProcedures([])
          setGuideTussSearch("")
          setGuideTussResults([])
          setShowTussSearch(false)
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Guia TISS</DialogTitle>
            <DialogDescription>
              Preencha os dados da guia para faturamento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo de Guia</Label>
                <Select defaultValue="consulta">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="sp_sadt">SP/SADT (Exames)</SelectItem>
                    <SelectItem value="internacao">Internacao</SelectItem>
                    <SelectItem value="honorarios">Honorarios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Operadora</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unimed">Unimed</SelectItem>
                    <SelectItem value="bradesco">Bradesco Saude</SelectItem>
                    <SelectItem value="sulamerica">SulAmerica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <PatientSearchSelect
              onPatientSelect={setSelectedPatient}
              selectedPatient={selectedPatient}
              label="Paciente"
              required
            />
            <div className="space-y-2">
              <Label>Indicacao Clinica</Label>
              <Textarea placeholder="Descreva a indicacao clinica..." />
            </div>
            <div className="space-y-2">
              <Label>Procedimentos TUSS</Label>

              {/* Campo de busca TUSS */}
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por codigo ou descricao do procedimento..."
                      value={guideTussSearch}
                      onChange={(e) => handleGuideTussSearch(e.target.value)}
                      onFocus={() => setShowTussSearch(true)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Resultados da busca */}
                {showTussSearch && guideTussResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {guideTussResults.map((proc) => (
                      <div
                        key={proc.code}
                        className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                        onClick={() => handleAddProcedure(proc)}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-mono text-xs shrink-0">
                            {proc.code}
                          </Badge>
                          <span className="text-sm truncate">{proc.description}</span>
                        </div>
                        {proc.group && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {proc.group}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Procedimentos selecionados */}
              {selectedProcedures.length > 0 ? (
                <div className="border rounded-lg divide-y max-h-40 overflow-y-auto">
                  {selectedProcedures.map((proc) => (
                    <div key={proc.code} className="p-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Badge variant="outline" className="font-mono text-xs shrink-0">
                          {proc.code}
                        </Badge>
                        <span className="text-sm truncate">{proc.description}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProcedure(proc.code)}
                        className="shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-4 text-center text-muted-foreground text-sm">
                  Nenhum procedimento adicionado. Use a busca acima para adicionar.
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setShowNewGuideModal(false)
              setSelectedPatient(null)
              setSelectedProcedures([])
              setGuideTussSearch("")
              setGuideTussResults([])
              setShowTussSearch(false)
            }}>
              Cancelar
            </Button>
            <Button disabled={!selectedPatient || selectedProcedures.length === 0}>
              Criar Guia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
