"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  sendWhatsAppMessage,
  getWhatsAppConversations,
  getWhatsAppMessages,
  markConversationAsRead,
  getWhatsAppStatus,
} from "@/app/actions/whatsapp"
import { MessageCircle, Send, Phone, Smartphone, QrCode, Settings, Check, X, RefreshCw, Search, Plus, Clock, CheckCheck } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { toast } from "sonner"

export default function WhatsAppPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadData()
    checkConnectionStatus()
    const interval = setInterval(() => {
      loadConversations()
      if (selectedConversation) {
        loadMessages(selectedConversation.id)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
      markConversationAsRead(selectedConversation.id)
    }
  }, [selectedConversation])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  async function loadData() {
    setLoading(true)
    await loadConversations()
    setLoading(false)
  }

  async function checkConnectionStatus() {
    const result = await getWhatsAppStatus()
    if (result.success && result.data) {
      setConnectionStatus(result.data.status)
      if (result.data.qrCode) {
        setQrCode(result.data.qrCode)
      }
    }
  }

  async function loadConversations() {
    const result = await getWhatsAppConversations()
    if (result.data) setConversations(result.data)
  }

  async function loadMessages(conversationId: string) {
    const result = await getWhatsAppMessages(conversationId)
    if (result.data) setMessages(result.data)
  }

  async function handleSendMessage() {
    if (!newMessage.trim() || !selectedConversation) return

    setSendingMessage(true)
    const result = await sendWhatsAppMessage({
      phone_number: selectedConversation.phone_number,
      message_text: newMessage,
      patient_id: selectedConversation.patient_id,
    })

    if (result.success) {
      setNewMessage("")
      loadMessages(selectedConversation.id)
      loadConversations()
      toast.success("Mensagem enviada!")
    } else {
      toast.error(result.error || "Erro ao enviar mensagem")
    }
    setSendingMessage(false)
  }

  async function handleConnectWhatsApp() {
    setShowQRModal(true)
    setConnectionStatus("connecting")
    await checkConnectionStatus()
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "sent": return <Check className="w-3 h-3 text-gray-400" />
      case "delivered": return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "read": return <CheckCheck className="w-3 h-3 text-blue-500" />
      default: return <Clock className="w-3 h-3 text-gray-400" />
    }
  }

  const filteredConversations = conversations.filter(
    (c) => c.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone_number.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />

      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageCircle className="w-8 h-8 text-green-600" />
              WhatsApp Business
            </h1>
            <p className="text-muted-foreground">Comunicacao direta com seus pacientes</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${connectionStatus === "connected" ? "bg-green-500" : connectionStatus === "connecting" ? "bg-yellow-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-sm text-muted-foreground">
                {connectionStatus === "connected" ? "Conectado" : connectionStatus === "connecting" ? "Conectando..." : "Desconectado"}
              </span>
            </div>
            <Button variant="outline" onClick={handleConnectWhatsApp}>
              <QrCode className="w-4 h-4 mr-2" />
              {connectionStatus === "connected" ? "Reconectar" : "Conectar WhatsApp"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-250px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600" />
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma conversa encontrada</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition ${
                        selectedConversation?.id === conversation.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold truncate">{conversation.contact_name || conversation.phone_number}</span>
                        {conversation.unread_count > 0 && (
                          <Badge className="bg-green-600 text-white">{conversation.unread_count}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.last_message_text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{conversation.phone_number}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Messages */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header */}
                <CardHeader className="border-b py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {selectedConversation.contact_name || selectedConversation.phone_number}
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {selectedConversation.phone_number}
                      </p>
                    </div>
                    {selectedConversation.patient_name && (
                      <Badge variant="secondary">
                        Paciente: {selectedConversation.patient_name}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.direction === "outbound"
                            ? "bg-green-600 text-white"
                            : "bg-muted"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.content_text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-70">
                            {new Date(msg.created_at).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {msg.direction === "outbound" && getStatusIcon(msg.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      rows={2}
                      className="flex-1 resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || sendingMessage}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {sendingMessage ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Selecione uma conversa para comecar</p>
                  <p className="text-sm mt-2">Ou conecte seu WhatsApp escaneando o QR Code</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* QR Code Modal */}
        <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-green-600" />
                Conectar WhatsApp
              </DialogTitle>
              <DialogDescription>
                Escaneie o QR Code com seu WhatsApp para conectar
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex justify-center">
                {qrCode ? (
                  <div className="p-4 bg-white rounded-lg">
                    <img src={qrCode} alt="QR Code WhatsApp" className="w-64 h-64" />
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 mx-auto mb-2 animate-spin text-green-600" />
                      <p className="text-sm text-muted-foreground">Gerando QR Code...</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <h4 className="font-medium">Como conectar:</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Abra o WhatsApp no seu celular</li>
                  <li>Toque em Mais opcoes ou Configuracoes</li>
                  <li>Selecione "Aparelhos conectados"</li>
                  <li>Toque em "Conectar um aparelho"</li>
                  <li>Aponte a camera para este QR Code</li>
                </ol>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => checkConnectionStatus()} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Atualizar QR Code
                </Button>
                <Button variant="outline" onClick={() => setShowQRModal(false)} className="flex-1">
                  Fechar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
