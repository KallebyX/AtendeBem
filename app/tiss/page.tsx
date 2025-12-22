"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Filter, Send, FileText, CheckCircle, XCircle, Clock, FileSearch } from "lucide-react"
import { searchTUSS, tussStats, tussGroups, type TUSSProcedure } from "@/lib/tuss-complete"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavigationHeader } from "@/components/navigation-header"

export default function TISSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [results, setResults] = useState<TUSSProcedure[]>([])
  const [activeTab, setActiveTab] = useState("procedimentos")

  // Mock data para guias TISS
  const [guias] = useState([
    { id: "1", numero: "TISS-2024-001", paciente: "Maria Silva", procedimento: "Consulta Medica", status: "aprovada", data: "2024-12-20" },
    { id: "2", numero: "TISS-2024-002", paciente: "Joao Santos", procedimento: "Exame de Sangue", status: "pendente", data: "2024-12-19" },
    { id: "3", numero: "TISS-2024-003", paciente: "Ana Costa", procedimento: "Raio-X Torax", status: "negada", data: "2024-12-18" },
  ])

  const handleSearch = () => {
    let filtered = searchTUSS(searchQuery, 100)
    if (selectedGroup !== "all") {
      filtered = filtered.filter((p) => p.group === selectedGroup)
    }
    setResults(filtered)
  }

  const handleExport = () => {
    const csv = [
      "Codigo,Descricao,Grupo,Capitulo,CBOS",
      ...results.map((r) => `${r.code},"${r.description}","${r.group || ""}","${r.chapter || ""}","${r.cbos || ""}"`),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `tiss_export_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovada": return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Aprovada</Badge>
      case "pendente": return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>
      case "negada": return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" />Negada</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <FileText className="w-8 h-8" />
              TISS - Troca de Informacoes em Saude Suplementar
            </h1>
            <p className="text-muted-foreground">
              Gestao de guias e procedimentos TISS/TUSS
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="procedimentos">Procedimentos TUSS</TabsTrigger>
              <TabsTrigger value="guias">Guias TISS</TabsTrigger>
              <TabsTrigger value="lotes">Lotes XML</TabsTrigger>
            </TabsList>

            {/* Tab: Procedimentos TUSS */}
            <TabsContent value="procedimentos" className="space-y-4">
              <Card className="p-4 md:p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Grupo</label>
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
                    <label className="text-sm font-medium">Buscar</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Codigo ou descricao..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1"
                      />
                      <Button onClick={handleSearch}><Search className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {tussStats.total.toLocaleString("pt-BR")} procedimentos disponiveis
                  </p>
                  {results.length > 0 && (
                    <Button onClick={handleExport} variant="outline" size="sm">
                      <FileDown className="w-4 h-4 mr-2" />Exportar CSV
                    </Button>
                  )}
                </div>
              </Card>

              {results.length > 0 && (
                <Card className="p-4 md:p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    {results.length} resultado{results.length !== 1 ? "s" : ""}
                  </h2>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {results.map((proc, index) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {results.length === 0 && searchQuery && (
                <Card className="p-12 text-center">
                  <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
                </Card>
              )}
            </TabsContent>

            {/* Tab: Guias TISS */}
            <TabsContent value="guias" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Guias TISS</h2>
                <Button><Send className="w-4 h-4 mr-2" />Nova Guia</Button>
              </div>

              <div className="grid gap-4">
                {guias.map((guia) => (
                  <Card key={guia.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-primary" />
                            <span className="font-semibold">{guia.numero}</span>
                            {getStatusBadge(guia.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">Paciente: {guia.paciente}</p>
                          <p className="text-sm text-muted-foreground">Procedimento: {guia.procedimento}</p>
                          <p className="text-xs text-muted-foreground mt-2">Data: {new Date(guia.data).toLocaleDateString("pt-BR")}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm"><FileSearch className="w-4 h-4" /></Button>
                          <Button variant="outline" size="sm"><FileDown className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tab: Lotes XML */}
            <TabsContent value="lotes" className="space-y-4">
              <Card className="p-8 text-center">
                <Send className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Envio de Lotes XML</h3>
                <p className="text-muted-foreground mb-4">
                  Envie lotes de guias TISS no formato XML para as operadoras de saude
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />Gerar Lote XML
                  </Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />Enviar para Operadora
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
