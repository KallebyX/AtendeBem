"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Search, Download, Send, CheckCircle, XCircle, Clock } from "lucide-react"
import { getNFes } from "@/app/actions/nfe"
import { Input } from "@/components/ui/input"

export default function NFePage() {
  const [nfes, setNFes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadNFes()
  }, [])

  async function loadNFes() {
    setLoading(true)
    const result = await getNFes()
    if (result.success) {
      setNFes(result.data)
    }
    setLoading(false)
  }

  function getStatusBadge(status: string) {
    const statusConfig = {
      draft: { label: "Rascunho", variant: "secondary", icon: Clock },
      pending: { label: "Pendente", variant: "warning", icon: Clock },
      authorized: { label: "Autorizada", variant: "success", icon: CheckCircle },
      cancelled: { label: "Cancelada", variant: "destructive", icon: XCircle },
      rejected: { label: "Rejeitada", variant: "destructive", icon: XCircle },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    const Icon = config.icon

    return (
      <Badge variant={config.variant as any} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const filteredNFes = nfes.filter(
    (nfe) =>
      nfe.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nfe.number?.toString().includes(searchQuery),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8" />
            Nota Fiscal Eletrônica (NF-e)
          </h1>
          <p className="text-muted-foreground">Emissão e gestão de notas fiscais</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Emitir NF-e
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Notas Fiscais</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número ou cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNFes.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Nenhuma nota fiscal encontrada</p>
              </div>
            ) : (
              filteredNFes.map((nfe) => (
                <div
                  key={nfe.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">NF-e {nfe.number || "Sem número"}</h3>
                      {getStatusBadge(nfe.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{nfe.customer_name}</span>
                      <span>{new Date(nfe.issue_date).toLocaleDateString("pt-BR")}</span>
                      <span className="font-medium text-foreground">
                        R${" "}
                        {Number.parseFloat(nfe.total_value || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {nfe.status === "authorized" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        XML/PDF
                      </Button>
                    )}
                    {nfe.status === "draft" && (
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Enviar
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
