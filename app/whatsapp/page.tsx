"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  sendWhatsAppMessage,
  getWhatsAppConversations,
  getWhatsAppMessages,
  markConversationAsRead,
} from "@/app/actions/whatsapp"
import { MessageCircle, Send, Phone } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"

export default function WhatsAppPage() {
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadConversations()
    const interval = setInterval(loadConversations, 10000) // Poll a cada 10s
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.id)
      markConversationAsRead(selectedConversation.id)
    }
  }, [selectedConversation])

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

    const result = await sendWhatsAppMessage({
      phone_number: selectedConversation.phone_number,
      message_text: newMessage,
      patient_id: selectedConversation.patient_id,
    })

    if (result.success) {
      setNewMessage("")
      loadMessages(selectedConversation.id)
      loadConversations()
    } else {
      alert(result.error)
    }
  }

  const filteredConversations = conversations.filter(
    (c) => c.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone_number.includes(searchTerm),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <NavigationHeader />

      <div className="container mx-auto p-6 h-[calc(100vh-200px)]">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-green-600" />
            WhatsApp Business
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Conversations List */}
          <Card className="col-span-1 p-4 flex flex-col">
            <div className="mb-4">
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-3 rounded cursor-pointer hover:bg-accent transition ${
                    selectedConversation?.id === conversation.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">{conversation.contact_name || conversation.phone_number}</span>
                    {conversation.unread_count > 0 && (
                      <Badge className="bg-green-600">{conversation.unread_count}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.last_message_text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-3 h-3" />
                    <span className="text-xs text-muted-foreground">{conversation.phone_number}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Messages */}
          <Card className="col-span-2 p-4 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Header */}
                <div className="border-b pb-3 mb-4">
                  <h2 className="text-xl font-semibold">
                    {selectedConversation.contact_name || selectedConversation.phone_number}
                  </h2>
                  <p className="text-sm text-muted-foreground">{selectedConversation.phone_number}</p>
                  {selectedConversation.patient_name && (
                    <Badge variant="secondary" className="mt-2">
                      Paciente: {selectedConversation.patient_name}
                    </Badge>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.direction === "outbound" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.direction === "outbound" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p>{msg.content_text}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs opacity-70">
                            {new Date(msg.created_at).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {msg.direction === "outbound" && (
                            <span className="text-xs opacity-70">
                              {msg.status === "read" ? "✓✓" : msg.status === "delivered" ? "✓" : "○"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
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
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Selecione uma conversa para começar
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
