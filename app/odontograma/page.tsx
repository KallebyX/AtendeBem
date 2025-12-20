"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Smile, Plus, Search, Calendar } from "lucide-react"
import { getOdontograms } from "@/app/actions/odontogram"
import { Input } from "@/components/ui/input"

export default function OdontogramaPage() {
  const [odontograms, setOdontograms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadOdontograms()
  }, [])

  async function loadOdontograms() {
    setLoading(true)
    const result = await getOdontograms()
    if (result.success) {
      setOdontograms(result.data)
    }
    setLoading(false)
  }

  const filteredOdontograms = odontograms.filter((o) =>
    o.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Smile className="w-8 h-8" />
            Odontograma
          </h1>
          <p className="text-muted-foreground">Mapa dental e histórico de procedimentos</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Odontograma
        </Button>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOdontograms.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Smile className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Nenhum odontograma encontrado</p>
              </div>
            ) : (
              filteredOdontograms.map((odontogram) => (
                <Card key={odontogram.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smile className="w-5 h-5 text-primary" />
                        <CardTitle className="text-base">{odontogram.patient_name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Total de Dentes:</span>
                        <Badge>32</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Última Atualização:</span>
                        <span className="text-xs flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(odontogram.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
