'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { NavigationHeader } from '@/components/navigation-header'
import {
  createInventoryItem,
  createInventoryMovement,
  getInventoryItems,
  getInventoryAlerts
} from '@/app/actions/inventory'
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, Search, BarChart3, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

const CATEGORIES = [
  'Medicamentos',
  'Material de Consumo',
  'Material Cirurgico',
  'Equipamentos',
  'EPI',
  'Material de Limpeza',
  'Material de Escritorio',
  'Insumos Laboratoriais',
  'Descartaveis',
  'Outros'
]

const UNITS = [
  'Unidade',
  'Caixa',
  'Pacote',
  'Frasco',
  'Ampola',
  'Litro',
  'Kg',
  'Metro',
  'Rolo',
  'Par'
]

export default function EstoquePage() {
  const [items, setItems] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [filter, setFilter] = useState({ category: '', search: '', lowStock: false })
  const [loading, setLoading] = useState(true)
  const [showNewItem, setShowNewItem] = useState(false)
  const [showMovement, setShowMovement] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [movement, setMovement] = useState({ type: 'entry' as 'entry' | 'exit', quantity: 0, reason: '' })

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    unit: 'Unidade',
    current_stock: 0,
    min_stock: 0,
    max_stock: 0,
    unit_cost: 0,
    barcode: '',
    supplier: '',
    location: ''
  })

  useEffect(() => {
    loadData()
  }, [filter])

  async function loadData() {
    setLoading(true)
    const [itemsResult, alertsResult] = await Promise.all([
      getInventoryItems(filter),
      getInventoryAlerts()
    ])

    if (itemsResult.data) setItems(itemsResult.data)
    if (alertsResult.data) setAlerts(alertsResult.data)
    setLoading(false)
  }

  async function handleCreateItem() {
    if (!newItem.name) {
      toast.error('Informe o nome do item')
      return
    }
    if (!newItem.category) {
      toast.error('Selecione uma categoria')
      return
    }

    const result = await createInventoryItem(newItem)
    if (result.success) {
      toast.success('Item adicionado com sucesso!')
      setShowNewItem(false)
      setNewItem({
        name: '',
        category: '',
        unit: 'Unidade',
        current_stock: 0,
        min_stock: 0,
        max_stock: 0,
        unit_cost: 0,
        barcode: '',
        supplier: '',
        location: ''
      })
      loadData()
    } else {
      toast.error(result.error || 'Erro ao adicionar item')
    }
  }

  async function handleMovement() {
    if (!selectedItem || movement.quantity <= 0) {
      toast.error('Informe uma quantidade valida')
      return
    }

    const result = await createInventoryMovement({
      item_id: selectedItem.id,
      type: movement.type,
      quantity: movement.quantity,
      reason: movement.reason || `Movimento de ${movement.type === 'entry' ? 'entrada' : 'saida'}`
    })

    if (result.success) {
      toast.success(`${movement.type === 'entry' ? 'Entrada' : 'Saida'} registrada com sucesso!`)
      setShowMovement(false)
      setMovement({ type: 'entry', quantity: 0, reason: '' })
      setSelectedItem(null)
      loadData()
    } else {
      toast.error(result.error || 'Erro ao registrar movimento')
    }
  }

  function openMovement(item: any, type: 'entry' | 'exit') {
    setSelectedItem(item)
    setMovement({ type, quantity: 0, reason: '' })
    setShowMovement(true)
  }

  const filteredItems = items.filter(item => {
    if (filter.search && !item.name.toLowerCase().includes(filter.search.toLowerCase())) return false
    if (filter.category && item.category !== filter.category) return false
    if (filter.lowStock && item.current_stock > item.min_stock) return false
    return true
  })

  const totalValue = filteredItems.reduce((sum, item) => sum + (item.current_stock * (item.unit_cost || 0)), 0)
  const lowStockCount = items.filter(i => i.current_stock <= i.min_stock).length

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Package className="w-8 h-8" />
              Gestao de Estoque
            </h1>
            <p className="text-muted-foreground">Controle de materiais e insumos</p>
          </div>
          <Button onClick={() => setShowNewItem(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Item
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Itens</p>
                  <p className="text-2xl font-bold">{items.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Valor em Estoque</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className={lowStockCount > 0 ? 'border-orange-500' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                  <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertas</p>
                  <p className="text-2xl font-bold text-red-600">{alerts.length}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="mb-6 border-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Alertas de Estoque ({alerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts.slice(0, 5).map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm">{alert.message}</span>
                    <Badge variant="outline" className="text-orange-600">{alert.alert_type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome..."
                  value={filter.search}
                  onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                  className="pl-8"
                />
              </div>
              <select
                className="border rounded-md p-2 min-w-[150px]"
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              >
                <option value="">Todas Categorias</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button
                variant={filter.lowStock ? 'default' : 'outline'}
                onClick={() => setFilter({ ...filter, lowStock: !filter.lowStock })}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Estoque Baixo
              </Button>
              <Button variant="outline" onClick={loadData}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Items */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Nenhum item encontrado</p>
              <Button variant="outline" onClick={() => setShowNewItem(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar primeiro item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredItems.map(item => (
              <Card key={item.id} className={item.current_stock <= item.min_stock ? 'border-orange-500' : ''}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                        {item.current_stock <= item.min_stock && (
                          <Badge variant="destructive">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Estoque Baixo
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="block text-xs">Estoque Atual</span>
                          <span className="font-medium text-foreground">{item.current_stock} {item.unit || 'un'}</span>
                        </div>
                        <div>
                          <span className="block text-xs">Minimo</span>
                          <span className="font-medium text-foreground">{item.min_stock} {item.unit || 'un'}</span>
                        </div>
                        <div>
                          <span className="block text-xs">Custo Unitario</span>
                          <span className="font-medium text-foreground">R$ {(item.unit_cost || 0).toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="block text-xs">Valor Total</span>
                          <span className="font-medium text-green-600">
                            R$ {(item.current_stock * (item.unit_cost || 0)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      {item.location && (
                        <p className="text-xs text-muted-foreground mt-2">Local: {item.location}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => openMovement(item, 'entry')}
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Entrada
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => openMovement(item, 'exit')}
                      >
                        <TrendingDown className="w-4 h-4 mr-1" />
                        Saida
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* New Item Modal */}
        <Dialog open={showNewItem} onOpenChange={setShowNewItem}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Novo Item de Estoque
              </DialogTitle>
              <DialogDescription>
                Adicione um novo item ao seu controle de estoque
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Nome do Item *</Label>
                <Input
                  placeholder="Ex: Luvas de Procedimento"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Categoria *</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option value="">Selecione...</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Unidade de Medida</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                >
                  {UNITS.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Estoque Atual</Label>
                <Input
                  type="number"
                  value={newItem.current_stock}
                  onChange={(e) => setNewItem({ ...newItem, current_stock: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Estoque Minimo</Label>
                <Input
                  type="number"
                  value={newItem.min_stock}
                  onChange={(e) => setNewItem({ ...newItem, min_stock: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Custo Unitario (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={newItem.unit_cost}
                  onChange={(e) => setNewItem({ ...newItem, unit_cost: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>Codigo de Barras</Label>
                <Input
                  placeholder="EAN/GTIN"
                  value={newItem.barcode}
                  onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
                />
              </div>
              <div>
                <Label>Fornecedor</Label>
                <Input
                  placeholder="Nome do fornecedor"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                />
              </div>
              <div>
                <Label>Localizacao</Label>
                <Input
                  placeholder="Ex: Armario 1, Prateleira A"
                  value={newItem.location}
                  onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowNewItem(false)} className="flex-1">
                Cancelar
              </Button>
              <Button onClick={handleCreateItem} className="flex-1">
                Salvar Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Movement Modal */}
        <Dialog open={showMovement} onOpenChange={setShowMovement}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {movement.type === 'entry' ? (
                  <><TrendingUp className="w-5 h-5 text-green-600" />Entrada de Estoque</>
                ) : (
                  <><TrendingDown className="w-5 h-5 text-red-600" />Saida de Estoque</>
                )}
              </DialogTitle>
              <DialogDescription>
                {selectedItem?.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Estoque Atual</Label>
                <p className="text-2xl font-bold">{selectedItem?.current_stock} {selectedItem?.unit || 'un'}</p>
              </div>
              <div>
                <Label>Quantidade *</Label>
                <Input
                  type="number"
                  min="1"
                  value={movement.quantity || ''}
                  onChange={(e) => setMovement({ ...movement, quantity: parseInt(e.target.value) || 0 })}
                  placeholder="Informe a quantidade"
                />
              </div>
              <div>
                <Label>Motivo</Label>
                <Input
                  value={movement.reason}
                  onChange={(e) => setMovement({ ...movement, reason: e.target.value })}
                  placeholder={movement.type === 'entry' ? 'Ex: Compra, Devolucao...' : 'Ex: Uso, Descarte, Perda...'}
                />
              </div>
              {movement.quantity > 0 && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    Novo estoque: <span className="font-bold">
                      {movement.type === 'entry'
                        ? (selectedItem?.current_stock || 0) + movement.quantity
                        : (selectedItem?.current_stock || 0) - movement.quantity
                      } {selectedItem?.unit || 'un'}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowMovement(false)} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleMovement}
                className={`flex-1 ${movement.type === 'entry' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                Confirmar {movement.type === 'entry' ? 'Entrada' : 'Saida'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
