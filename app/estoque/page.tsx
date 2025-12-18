'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  createInventoryItem,
  updateInventoryItem,
  createInventoryMovement,
  getInventoryItems,
  getInventoryAlerts
} from '@/app/actions/inventory'
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus } from 'lucide-react'

export default function EstoquePage() {
  const [items, setItems] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [filter, setFilter] = useState({ category: '', lowStock: false })
  const [showNewItem, setShowNewItem] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    current_stock: 0,
    min_stock: 0,
    unit_cost: 0,
    barcode: ''
  })

  useEffect(() => {
    loadData()
  }, [filter])

  async function loadData() {
    const [itemsResult, alertsResult] = await Promise.all([
      getInventoryItems(filter),
      getInventoryAlerts()
    ])
    
    if (itemsResult.data) setItems(itemsResult.data)
    if (alertsResult.data) setAlerts(alertsResult.data)
  }

  async function handleCreateItem() {
    const result = await createInventoryItem(newItem)
    if (result.success) {
      setShowNewItem(false)
      setNewItem({ name: '', category: '', current_stock: 0, min_stock: 0, unit_cost: 0, barcode: '' })
      loadData()
    } else {
      alert(result.error)
    }
  }

  async function handleMovement(itemId: string, type: 'entry' | 'exit', quantity: number) {
    const result = await createInventoryMovement({
      item_id: itemId,
      type,
      quantity,
      reason: `Movimento ${type === 'entry' ? 'entrada' : 'saída'}`
    })

    if (result.success) {
      loadData()
    } else {
      alert(result.error)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Package className="w-8 h-8" />
          Gestão de Estoque
        </h1>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="p-4 mb-6 border-orange-500">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold">{alerts.length} Alerta(s) de Estoque</h3>
          </div>
          <div className="space-y-2">
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className="flex items-center justify-between">
                <span className="text-sm">{alert.message}</span>
                <Badge variant="secondary">{alert.alert_type}</Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Filtrar por categoria..."
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="max-w-xs"
        />
        <Button
          variant={filter.lowStock ? 'default' : 'outline'}
          onClick={() => setFilter({ ...filter, lowStock: !filter.lowStock })}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Estoque Baixo
        </Button>
        <Button onClick={() => setShowNewItem(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Item
        </Button>
      </div>

      {/* New Item Modal */}
      {showNewItem && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Novo Item de Estoque</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Nome do item"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <Input
              placeholder="Categoria"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Estoque atual"
              value={newItem.current_stock}
              onChange={(e) => setNewItem({ ...newItem, current_stock: parseInt(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Estoque mínimo"
              value={newItem.min_stock}
              onChange={(e) => setNewItem({ ...newItem, min_stock: parseInt(e.target.value) })}
            />
            <Input
              type="number"
              placeholder="Custo unitário"
              value={newItem.unit_cost}
              onChange={(e) => setNewItem({ ...newItem, unit_cost: parseFloat(e.target.value) })}
            />
            <Input
              placeholder="Código de barras"
              value={newItem.barcode}
              onChange={(e) => setNewItem({ ...newItem, barcode: e.target.value })}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleCreateItem}>Salvar</Button>
            <Button variant="outline" onClick={() => setShowNewItem(false)}>Cancelar</Button>
          </div>
        </Card>
      )}

      {/* Inventory Items */}
      <div className="grid gap-4">
        {items.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Categoria: {item.category}</span>
                  <span>Estoque: {item.current_stock}</span>
                  <span>Mínimo: {item.min_stock}</span>
                  <span>Custo: R$ {item.unit_cost?.toFixed(2)}</span>
                </div>
                {item.current_stock <= item.min_stock && (
                  <Badge variant="destructive" className="mt-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Estoque Baixo
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const qty = prompt('Quantidade de entrada:')
                    if (qty) handleMovement(item.id, 'entry', parseInt(qty))
                  }}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Entrada
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const qty = prompt('Quantidade de saída:')
                    if (qty) handleMovement(item.id, 'exit', parseInt(qty))
                  }}
                >
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Saída
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
