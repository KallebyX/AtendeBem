"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NavigationHeader } from "@/components/navigation-header"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

export default function AssistentePage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const quickSuggestions = [
    "Como registrar um atendimento?",
    "Dúvidas sobre procedimentos",
    "Explicar códigos administrativos",
    "Como exportar histórico?",
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
        <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col space-y-6 min-h-0">
          <div className="text-center space-y-2 flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 mx-auto flex items-center justify-center">
              <Bot className="w-8 h-8 text-secondary" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">Assistente AtendeBem</h1>
            <p className="text-lg text-muted-foreground">Como posso ajudar você hoje?</p>
          </div>

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
              O assistente está aqui para ajudar com dúvidas sobre o uso do AtendeBem
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
