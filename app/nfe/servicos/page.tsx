"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ArrowLeft,
  Package,
  RefreshCw,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { getNFeServices, createNFeService, updateNFeService, deleteNFeService } from "@/app/actions/nfe-services"
import { LC116_SERVICES, CNAE_HEALTH_CODES } from "@/lib/fiscal-utils"

interface NFeService {
  id: string
  code: string
  description: string
  lc116_code: string
  cnae_code: string
  iss_rate: number
  unit_price: number
  category: string
  is_active: boolean
}

const CATEGORIES = [
  "Consultas",
  "Procedimentos",
  "Exames",
  "Terapias",
  "Cirurgias",
  "Internação",
  "Outros",
]

export default function ServicosPage() {
  const [services, setServices] = useState<NFeService[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<NFeService | null>(null)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    lc116_code: "4.01",
    cnae_code: "",
    iss_rate: 2.0,
    unit_price: 0,
    category: "Consultas",
    is_active: true,
  })

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    setLoading(true)
    try {
      const result = await getNFeServices()
      if (result.success) {
        setServices(result.data || [])
      } else {
        toast.error(result.error || "Erro ao carregar serviços")
      }
    } catch (error) {
      console.error("Erro ao carregar serviços:", error)
    }
    setLoading(false)
  }

  function openNewDialog() {
    setEditingService(null)
    setFormData({
      code: "",
      description: "",
      lc116_code: "4.01",
      cnae_code: "",
      iss_rate: 2.0,
      unit_price: 0,
      category: "Consultas",
      is_active: true,
    })
    setIsDialogOpen(true)
  }

  function openEditDialog(service: NFeService) {
    setEditingService(service)
    setFormData({
      code: service.code,
      description: service.description,
      lc116_code: service.lc116_code,
      cnae_code: service.cnae_code || "",
      iss_rate: service.iss_rate,
      unit_price: service.unit_price,
      category: service.category || "Outros",
      is_active: service.is_active,
    })
    setIsDialogOpen(true)
  }

  async function handleSave() {
    if (!formData.code || !formData.description) {
      toast.error("Código e descrição são obrigatórios")
      return
    }

    setSaving(true)
    try {
      if (editingService) {
        const result = await updateNFeService(editingService.id, formData)
        if (result.success) {
          toast.success("Serviço atualizado com sucesso!")
          setIsDialogOpen(false)
          loadServices()
        } else {
          toast.error(result.error || "Erro ao atualizar serviço")
        }
      } else {
        const result = await createNFeService(formData)
        if (result.success) {
          toast.success("Serviço criado com sucesso!")
          setIsDialogOpen(false)
          loadServices()
        } else {
          toast.error(result.error || "Erro ao criar serviço")
        }
      }
    } catch (error) {
      toast.error("Erro ao salvar serviço")
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este serviço?")) return

    try {
      const result = await deleteNFeService(id)
      if (result.success) {
        toast.success("Serviço excluído com sucesso!")
        loadServices()
      } else {
        toast.error(result.error || "Erro ao excluir serviço")
      }
    } catch (error) {
      toast.error("Erro ao excluir serviço")
    }
  }

  function handleLC116Change(code: string) {
    const service = LC116_SERVICES.find(s => s.code === code)
    setFormData(prev => ({
      ...prev,
      lc116_code: code,
      description: prev.description || service?.description || "",
      iss_rate: getDefaultISSRate(code),
    }))
  }

  function getDefaultISSRate(lc116Code: string): number {
    const rates: Record<string, number> = {
      '4.01': 2.0, '4.02': 3.0, '4.03': 3.0, '4.04': 2.0,
      '4.05': 2.0, '4.06': 2.0, '4.07': 3.0, '4.08': 2.0,
      '4.09': 2.0, '4.10': 2.0, '4.11': 2.0, '4.12': 3.0,
      '4.13': 2.0, '4.14': 3.0, '4.15': 2.0, '4.16': 2.0,
    }
    return rates[lc116Code] || 2.0
  }

  const filteredServices = services.filter(
    s => s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
         s.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/nfe">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="w-8 h-8" />
              Catálogo de Serviços
            </h1>
            <p className="text-muted-foreground">Gerencie os serviços para emissão de NFSe</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingService ? "Editar Serviço" : "Novo Serviço"}</DialogTitle>
              <DialogDescription>
                Configure os dados fiscais do serviço para emissão de NFSe
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                    placeholder="CONS-001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição do serviço"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lc116_code">Código LC 116 *</Label>
                  <Select
                    value={formData.lc116_code}
                    onValueChange={handleLC116Change}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {LC116_SERVICES.filter(s => s.code.startsWith('4.')).map(service => (
                        <SelectItem key={service.code} value={service.code}>
                          {service.code} - {service.description.slice(0, 40)}...
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Serviços de saúde (Grupo 4)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnae_code">Código CNAE</Label>
                  <Select
                    value={formData.cnae_code}
                    onValueChange={(v) => setFormData(prev => ({ ...prev, cnae_code: v }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o CNAE" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {CNAE_HEALTH_CODES.map(cnae => (
                        <SelectItem key={cnae.code} value={cnae.code}>
                          {cnae.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="iss_rate">Alíquota ISS (%)</Label>
                  <Input
                    id="iss_rate"
                    type="number"
                    step="0.01"
                    min="2"
                    max="5"
                    value={formData.iss_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, iss_rate: parseFloat(e.target.value) || 2 }))}
                    placeholder="2.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Mínimo 2%, máximo 5%
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit_price">Valor Padrão (R$)</Label>
                  <Input
                    id="unit_price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.unit_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, unit_price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(v) => setFormData(prev => ({ ...prev, is_active: v }))}
                />
                <Label htmlFor="is_active">Serviço ativo</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
                {editingService ? "Salvar" : "Criar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Serviços Cadastrados</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar serviço..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Nenhum serviço cadastrado</p>
              <Button onClick={openNewDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Primeiro Serviço
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>LC 116</TableHead>
                  <TableHead>ISS</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.code}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{service.lc116_code}</TableCell>
                    <TableCell>{service.iss_rate}%</TableCell>
                    <TableCell>
                      R$ {(service.unit_price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
