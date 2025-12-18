'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  createSMSCampaign,
  getSMSCampaigns,
  getSMSMessages,
  sendSingleSMS
} from '@/app/actions/sms'
import { MessageSquare, Send, Users, TrendingUp, DollarSign } from 'lucide-react'

export default function SMSPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message_template: '',
    scheduled_for: ''
  })

  useEffect(() => {
    loadCampaigns()
  }, [])

  async function loadCampaigns() {
    const result = await getSMSCampaigns()
    if (result.data) setCampaigns(result.data)
  }

  async function handleCreateCampaign() {
    const result = await createSMSCampaign(newCampaign)
    if (result.success) {
      setShowNewCampaign(false)
      setNewCampaign({ name: '', message_template: '', scheduled_for: '' })
      loadCampaigns()
    } else {
      alert(result.error)
    }
  }

  function getStatusColor(status: string) {
    const colors = {
      draft: 'bg-gray-500',
      scheduled: 'bg-blue-500',
      sending: 'bg-yellow-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-500'
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <MessageSquare className="w-8 h-8" />
          Campanhas de SMS
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">
                {campaigns.reduce((sum, c) => sum + (c.sent_count || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">SMS Enviados</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">
                {campaigns.reduce((sum, c) => sum + (c.delivered_count || 0), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Entregues</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">
                R$ {campaigns.reduce((sum, c) => sum + (c.actual_cost || 0), 0).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Custo Total</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{campaigns.length}</p>
              <p className="text-sm text-muted-foreground">Campanhas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* New Campaign Button */}
      <div className="mb-6">
        <Button onClick={() => setShowNewCampaign(true)}>
          <Send className="w-4 h-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      {/* New Campaign Form */}
      {showNewCampaign && (
        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Nova Campanha de SMS</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome da Campanha</label>
              <Input
                placeholder="Ex: Lembretes de Consulta - Janeiro 2025"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Mensagem</label>
              <Textarea
                placeholder="Olá {nome}, sua consulta está marcada para {data}..."
                value={newCampaign.message_template}
                onChange={(e) => setNewCampaign({ ...newCampaign, message_template: e.target.value })}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Máximo: 160 caracteres | Variáveis: {'{'}nome{'}'}, {'{'}data{'}'}, {'{'}hora{'}'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium">Agendar Para (Opcional)</label>
              <Input
                type="datetime-local"
                value={newCampaign.scheduled_for}
                onChange={(e) => setNewCampaign({ ...newCampaign, scheduled_for: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button onClick={handleCreateCampaign}>Criar Campanha</Button>
            <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map(campaign => (
          <Card key={campaign.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {campaign.message_template}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {campaign.sent_count || 0}/{campaign.total_recipients || 0}
                </p>
                <p className="text-xs text-muted-foreground">Enviados</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Entregues:</span>
                <span className="ml-2 font-medium">{campaign.delivered_count || 0}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Falhas:</span>
                <span className="ml-2 font-medium text-red-500">{campaign.failed_count || 0}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Custo:</span>
                <span className="ml-2 font-medium">
                  R$ {(campaign.actual_cost || campaign.estimated_cost || 0).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Criada:</span>
                <span className="ml-2 font-medium">
                  {new Date(campaign.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            {campaign.scheduled_for && campaign.status === 'scheduled' && (
              <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                <Badge variant="secondary">
                  Agendada para: {new Date(campaign.scheduled_for).toLocaleString('pt-BR')}
                </Badge>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
