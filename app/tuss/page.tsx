"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileDown, Filter } from "lucide-react"
import { searchTUSS, tussStats, tussGroups, type TUSSProcedure } from "@/lib/tuss-complete"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NavigationHeader } from "@/components/navigation-header"

export default function TUSSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGroup, setSelectedGroup] = useState<string>("all")
  const [results, setResults] = useState<TUSSProcedure[]>([])

  const handleSearch = () => {
    let filtered = searchTUSS(searchQuery, 100)

    if (selectedGroup !== "all") {
      filtered = filtered.filter((p) => p.group === selectedGroup)
    }

    setResults(filtered)
  }

  const handleExport = () => {
    const csv = [
      "Código,Descrição,Grupo,Capítulo,CBOS",
      ...results.map((r) => `${r.code},"${r.description}","${r.group || ""}","${r.chapter || ""}","${r.cbos || ""}"`),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)

    link.setAttribute("href", url)
    link.setAttribute("download", `tuss_export_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tabela TUSS Completa</h1>
            <p className="text-muted-foreground">
              Busque entre {tussStats.total.toLocaleString("pt-BR")} procedimentos médicos
            </p>
          </div>

          {/* Filters */}
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
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Código ou descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1"
                  />
                  <Button onClick={handleSearch}>
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {results.length > 0 && (
            <Card className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold">
                  {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado
                  {results.length !== 1 ? "s" : ""}
                </h2>
                <Button onClick={handleExport} variant="outline" size="sm">
                  <FileDown className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {results.map((proc, index) => (
                  <div
                    key={`${proc.code}-${index}`}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="font-mono shrink-0">
                            {proc.code}
                          </Badge>
                          <p className="font-medium text-sm md:text-base">{proc.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {proc.group && (
                            <Badge variant="secondary" className="text-xs">
                              {proc.group}
                            </Badge>
                          )}
                          {proc.cbos && proc.cbos !== "-" && (
                            <Badge variant="outline" className="text-xs">
                              CBOS: {proc.cbos}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Empty State */}
          {results.length === 0 && searchQuery && (
            <Card className="p-12 text-center">
              <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
