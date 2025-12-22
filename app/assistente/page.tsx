"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/navigation-header"
import {
  Send,
  Bot,
  User,
  Loader2,
  FileText,
  Stethoscope,
  Activity,
  PanelBottom as PillBottle,
  RefreshCw,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function AssistentePage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickSuggestions = [
    "Como registrar um atendimento?",
    "Duvidas sobre procedimentos TUSS",
    "Explicar codigos CID-10",
    "Como gerar receitas digitais?",
  ]

  const soapTemplates = [
    {
      icon: Stethoscope,
      title: "Consulta de Rotina",
      prompt:
        "Gere uma nota SOAP completa para consulta de rotina: paciente adulto, 42 anos, sexo masculino, queixando-se de cefaleia ha 3 dias, de intensidade moderada, sem nauseas. Exame fisico: PA 120/80, FC 72, Temp 36.5C, ausculta pulmonar e cardiaca sem alteracoes. Sem comorbidades conhecidas.",
    },
    {
      icon: Activity,
      title: "Retorno Pediatrico",
      prompt:
        "Crie nota SOAP para retorno pediatrico: crianca 5 anos, sexo feminino, retorno apos 3 dias com febre (38.5C), tosse produtiva, inapetencia. Mae relata quadro gripal na escola. Exame fisico: orofaringe hiperemiada, ausculta pulmonar com roncos bilaterais.",
    },
    {
      icon: FileText,
      title: "Pre-Operatorio",
      prompt:
        "Elabore nota SOAP para avaliacao pre-operatoria: cirurgia eletiva de colecistectomia videolaparoscopica, paciente 45 anos, sexo feminino, hipertensa controlada com losartana 50mg/dia, ASA II, exames laboratoriais normais.",
    },
    {
      icon: PillBottle,
      title: "Prescricao Cronica",
      prompt:
        "Gere nota SOAP para renovacao de prescricao: paciente diabetico tipo 2, 58 anos, em uso de metformina 850mg 2x/dia e glibenclamida 5mg/dia, glicemias controladas (jejum 110mg/dL), sem queixas.",
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log("[v0] [AI CHAT CLIENT] Sending message:", text.substring(0, 50) + "...")

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) {
        console.error("[v0] [AI CHAT CLIENT] HTTP error:", response.status, response.statusText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log("[v0] [AI CHAT CLIENT] Response received")

      const assistantMessage: Message = {
        id: data.id || Date.now().toString(),
        role: "assistant",
        content: data.content || "Desculpe, nao consegui processar sua solicitacao.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] [AI CHAT CLIENT] Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "❌ Nao foi possivel conectar ao servidor de IA.\n\n**Verifique:**\n- Sua conexao com a internet\n- Se o servidor esta respondendo\n\nTente novamente em alguns instantes.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(input)
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col overflow-hidden">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col space-y-6 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assistente IA AtendeBem
            </h1>
            <p className="text-lg text-muted-foreground">Seu copiloto medico inteligente</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="chat">Chat Assistente</TabsTrigger>
              <TabsTrigger value="soap">Gerador SOAP</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 mt-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
                {messages.length === 0 ? (
                  <div className="space-y-4">
                    <p className="text-center text-muted-foreground">Escolha uma sugestao ou digite sua pergunta</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {quickSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="rounded-3xl h-auto py-4 px-6 text-left justify-start whitespace-normal bg-transparent"
                          onClick={() => handleSendMessage(suggestion)}
                          disabled={isLoading}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                          </div>
                        )}
                        <Card
                          className={`rounded-3xl max-w-[80%] ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted border-border"
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="leading-relaxed whitespace-pre-wrap">{message.content}</div>
                          </CardContent>
                        </Card>
                        {message.role === "user" && (
                          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                        </div>
                        <Card className="rounded-3xl bg-muted border-border">
                          <CardContent className="p-4">
                            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                          </CardContent>
                        </Card>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-border pt-4 flex-shrink-0">
                {messages.length > 0 && (
                  <div className="flex justify-center mb-3">
                    <Button variant="ghost" size="sm" onClick={clearChat}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Nova Conversa
                    </Button>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Digite sua pergunta..."
                    className="rounded-3xl h-12 flex-1"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-2xl h-12 w-12 flex-shrink-0"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                    <span className="sr-only">Enviar</span>
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Assistente IA com conhecimento em TUSS, CID-10, Prescricoes e Notas Clinicas
                </p>
              </div>
            </TabsContent>

            <TabsContent value="soap" className="flex-1 flex flex-col min-h-0 mt-0">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {soapTemplates.map((template, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setActiveTab("chat")
                      handleSendMessage(template.prompt)
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <template.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">{template.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">{template.prompt}</p>
                      <Button variant="outline" className="w-full mt-4 bg-transparent" size="sm">
                        Gerar Nota SOAP
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-3">Formato SOAP</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">S - Subjetivo:</p>
                    <p className="text-muted-foreground">
                      Queixa principal, historia da doenca atual, sintomas relatados pelo paciente
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">O - Objetivo:</p>
                    <p className="text-muted-foreground">Exame fisico, sinais vitais, achados objetivos</p>
                  </div>
                  <div>
                    <p className="font-medium">A - Avaliacao:</p>
                    <p className="text-muted-foreground">Diagnostico, hipoteses diagnosticas (CID-10)</p>
                  </div>
                  <div>
                    <p className="font-medium">P - Plano:</p>
                    <p className="text-muted-foreground">
                      Conduta terapeutica, prescricoes, exames solicitados, orientacoes
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
