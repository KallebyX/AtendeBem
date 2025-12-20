"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Fingerprint, Plus, Search, Shield, CheckCircle, XCircle } from "lucide-react"
import { getBiometricTemplates, deleteBiometricTemplate } from "@/app/actions/biometrics"
import { Input } from "@/components/ui/input"

export default function BiometriaPage() {
  const [templates, setTemplates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadTemplates()
  }, [])

  async function loadTemplates() {
    setLoading(true)
    const result = await getBiometricTemplates()
    if (result.success) {
      setTemplates(result.data)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja remover este template biométrico?")) {
      const result = await deleteBiometricTemplate(id)
      if (result.success) {
        loadTemplates()
      }
    }
  }

  const filteredTemplates = templates.filter(
    (t) =>
      t.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.template_type?.toLowerCase().includes(searchQuery.toLowerCase()),
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
            <Fingerprint className="w-8 h-8" />
            Biometria
          </h1>
          <p className="text-muted-foreground">Gestão de templates biométricos de pacientes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Biometria
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Templates Biométricos</CardTitle>
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
          <div className="space-y-4">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12">
                <Fingerprint className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Nenhum template biométrico encontrado</p>
              </div>
            ) : (
              filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Fingerprint className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{template.patient_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{template.template_type}</Badge>
                        {template.is_active ? (
                          <Badge variant="success" className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Ativo
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Inativo
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Verificar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(template.id)}>
                      Remover
                    </Button>
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
