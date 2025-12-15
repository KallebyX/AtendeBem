import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

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

  const prompt = convertToModelMessages([
    { role: "system", parts: [{ type: "text", text: systemPrompt }] },
    ...messages,
  ])

  const result = streamText({
    model: "google/gemini-2.5-flash-image",
    prompt,
    maxOutputTokens: 2000,
    temperature: 0.7,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("[v0] Chat request aborted by user")
      }
    },
    consumeSseStream: consumeStream,
  })
}
