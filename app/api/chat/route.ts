import { streamText, convertToCoreMessages } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export const maxDuration = 30

const google = createGoogleGenerativeAI({
  apiKey: "AIzaSyBsqcoBnsZjg_SfAMxkAmMxu-qR5nLK9bw",
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemPrompt = `Você é um assistente virtual do AtendeBem, uma plataforma que ajuda profissionais de saúde a gerenciar atendimentos e documentação médica.

Suas responsabilidades:
- Ajudar médicos com dúvidas sobre como usar o sistema
- Explicar processos de registro de atendimentos
- Esclarecer sobre procedimentos e códigos administrativos
- Auxiliar na navegação e uso de funcionalidades
- Responder de forma clara, profissional e amigável

IMPORTANTE:
- Você NÃO deve fornecer diagnósticos médicos
- Você NÃO deve substituir consultas médicas
- Você NÃO deve dar conselhos sobre tratamentos
- Foque apenas em ajudar com o uso da plataforma AtendeBem

Mantenha respostas objetivas e úteis, sempre com tom profissional mas acessível.`

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
    maxTokens: 2000,
    temperature: 0.7,
  })

  return result.toUIMessageStreamResponse()
}
