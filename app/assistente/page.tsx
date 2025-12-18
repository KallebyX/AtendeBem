"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavigationHeader } from "@/components/navigation-header"
import { Send, Bot, User, Loader2, FileText, Stethoscope, Activity, PillBottle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AssistentePage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const quickSuggestions = [
    "Como registrar um atendimento?",
    "Dúvidas sobre procedimentos TUSS",
    "Explicar códigos CID-10",
    "Como gerar receitas digitais?",
  ]

  const soapTemplates = [
    {
      icon: Stethoscope,
      title: "Consulta de Rotina",
      prompt: "Gere uma nota SOAP completa para consulta de rotina: paciente adulto, 42 anos, sexo masculino, queixando-se de cefaleia há 3 dias, de intensidade moderada, sem náuseas. Exame físico: PA 120/80, FC 72, Temp 36.5°C, ausculta pulmonar e cardíaca sem alterações. Sem comorbidades conhecidas."
    },
    {
      icon: Activity,
      title: "Retorno Pediátrico",
      prompt: "Crie nota SOAP para retorno pediátrico: criança 5 anos, sexo feminino, retorno após 3 dias com febre (38.5°C), tosse produtiva, inapetência. Mãe relata quadro gripal na escola. Exame físico: orofaringe hiperemiada, ausculta pulmonar com roncos bilaterais."
    },
    {
      icon: FileText,
      title: "Pré-Operatório",
      prompt: "Elabore nota SOAP para avaliação pré-operatória: cirurgia eletiva de colecistectomia videolaparoscópica, paciente 45 anos, sexo feminino, hipertensa controlada com losartana 50mg/dia, ASA II, exames laboratoriais normais."
    },
    {
      icon: PillBottle,
      title: "Prescrição Crônica",
      prompt: "Gere nota SOAP para renovação de prescrição: paciente diabético tipo 2, 58 anos, em uso de metformina 850mg 2x/dia e glibenclamida 5mg/dia, glicemias controladas (jejum 110mg/dL), sem queixas."
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return
    sendMessage({ text })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavigationHeader showBack backHref="/dashboard" />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col overflow-hidden">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col space-y-6 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mx-auto flex items-center justify-center shadow-lg">
              <Bot className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assistente IA AtendeBem
            </h1>
            <p className="text-lg text-muted-foreground">Seu copiloto médico inteligente</p>
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
                <p className="text-center text-muted-foreground">Escolha uma sugestão ou digite sua pergunta</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="rounded-3xl h-auto py-4 px-6 text-left justify-start whitespace-normal bg-transparent"
                      onClick={() => handleSendMessage(suggestion)}
                      disabled={status === "in_progress"}
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
                      <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-secondary" strokeWidth={1.5} />
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
                        {message.parts.map((part, index) => {
                          if (part.type === "text") {
                            return (
                              <p key={index} className="leading-relaxed whitespace-pre-wrap">
                                {part.text}
                              </p>
                            )
                          }
                          return null
                        })}
                      </CardContent>
                    </Card>
                    {message.role === "user" && (
                      <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                ))}
                {status === "in_progress" && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-secondary" strokeWidth={1.5} />
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
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const input = formData.get("message") as string
                handleSendMessage(input)
                e.currentTarget.reset()
              }}
              className="flex gap-2"
            >
              <Input
                name="message"
                placeholder="Digite sua pergunta..."
                className="rounded-3xl h-12 flex-1"
                disabled={status === "in_progress"}
                autoComplete="off"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-2xl h-12 w-12 flex-shrink-0"
                disabled={status === "in_progress"}
              >
                {status === "in_progress" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Assistente IA com conhecimento em TUSS, CID-10, Prescrições e Notas Clínicas
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
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {template.prompt}
                      </p>
                      <Button variant="outline" className="w-full mt-4" size="sm">
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
                    <p className="text-muted-foreground">Queixa principal, história da doença atual, sintomas relatados pelo paciente</p>
                  </div>
                  <div>
                    <p className="font-medium">O - Objetivo:</p>
                    <p className="text-muted-foreground">Exame físico, sinais vitais, achados objetivos</p>
                  </div>
                  <div>
                    <p className="font-medium">A - Avaliação:</p>
                    <p className="text-muted-foreground">Diagnóstico, hipóteses diagnósticas (CID-10)</p>
                  </div>
                  <div>
                    <p className="font-medium">P - Plano:</p>
                    <p className="text-muted-foreground">Conduta terapêutica, prescrições, exames solicitados, orientações</p>
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
