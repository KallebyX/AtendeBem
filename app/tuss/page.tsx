"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, FileDown, Filter } from "lucide-react"
import {
  searchTUSSComplete,
  TUSS_CATEGORIES,
  TUSS_SPECIALTIES,
  TOTAL_TUSS_PROCEDURES,
  type TUSSProcedureComplete,
} from "@/lib/tuss-complete"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TUSSPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [results, setResults] = useState<TUSSProcedureComplete[]>([])

  const handleSearch = () => {
    const filtered = searchTUSSComplete(searchQuery, {
      category: selectedCategory === "all" ? undefined : selectedCategory,
      specialty: selectedSpecialty === "all" ? undefined : selectedSpecialty,
      limit: 50,
    })
    setResults(filtered)
  }

  const handleExport = () => {
    const csv = [
      "Código,Descrição,Categoria,Especialidade,Valor",
      ...results.map(
        (r) => `${r.code},"${r.description}","${r.category || ""}","${r.specialty || ""}","${r.value || ""}"`,
      ),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tabela TUSS Completa</h1>
          <p className="text-muted-foreground">
            Busque entre {TOTAL_TUSS_PROCEDURES.toLocaleString("pt-BR")} procedimentos médicos
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4 md:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {TUSS_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Especialidade</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as especialidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {TUSS_SPECIALTIES.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
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
                {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
              </h2>
              <Button onClick={handleExport} variant="outline" size="sm">
                <FileDown className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {results.map((proc) => (
                <div key={proc.code} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="font-mono shrink-0">
                          {proc.code}
                        </Badge>
                        <p className="font-medium text-sm md:text-base">{proc.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proc.category && (
                          <Badge variant="secondary" className="text-xs">
                            {proc.category}
                          </Badge>
                        )}
                        {proc.specialty && (
                          <Badge variant="outline" className="text-xs">
                            {proc.specialty}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {proc.value && (
                      <div className="text-right shrink-0">
                        <p className="text-sm text-muted-foreground">Valor Ref.</p>
                        <p className="font-semibold text-lg">R$ {proc.value}</p>
                      </div>
                    )}
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
    </div>
  )
}
