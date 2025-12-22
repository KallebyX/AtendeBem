import { NextResponse } from "next/server"

export const maxDuration = 30

const SYSTEM_PROMPT = `Voce e um assistente virtual do AtendeBem, uma plataforma de gestao para clinicas e consultorios medicos.

Suas responsabilidades:
- Ajudar profissionais de saude com duvidas sobre como usar o sistema AtendeBem
- Explicar processos de registro de atendimentos, agendamentos e prontuarios
- Auxiliar com informacoes sobre codigos TUSS e CID-10
- Gerar notas clinicas no formato SOAP quando solicitado
- Ajudar com duvidas sobre receitas digitais, exames e prescricoes
- Auxiliar na navegacao e uso das funcionalidades do sistema

Formato SOAP (quando solicitado):
S (Subjetivo): Queixa principal, historia da doenca atual, sintomas relatados
O (Objetivo): Exame fisico, sinais vitais, achados objetivos
A (Avaliacao): Diagnostico ou hipoteses diagnosticas com CID-10 quando aplicavel
P (Plano): Conduta terapeutica, prescricoes, exames, orientacoes

IMPORTANTE:
- Voce pode auxiliar com informacoes gerais de saude e codigos medicos
- Sempre indique que diagnosticos finais devem ser feitos por profissionais habilitados
- Responda em portugues do Brasil
- Seja claro, objetivo e profissional

Conhecimentos sobre o AtendeBem:
- Modulos: Agenda, Pacientes, Prontuario (EMR), Financeiro, Receitas, Atestados, Telemedicina
- Recursos: Odontograma, Biometria, Imagens Medicas, WhatsApp Business, Estoque
- Integrações: TISS, NFe, Contratos digitais`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    console.log("[v0] [AI CHAT] Request received with", messages?.length, "messages")

    // Get API key from environment (supports multiple variable names)
    const apiKey =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_AI_API_KEY ||
      process.env.GEMINI_API_KEY

    if (!apiKey) {
      console.log("[v0] [AI CHAT] No API key configured. Set GOOGLE_GENERATIVE_AI_API_KEY, GOOGLE_AI_API_KEY, or GEMINI_API_KEY in .env.local")
      const lastMessage = messages[messages.length - 1]?.content || ""
      const fallbackResponse = generateFallbackResponse(lastMessage)

      return NextResponse.json({
        id: Date.now().toString(),
        role: "assistant",
        content: fallbackResponse,
      })
    }

    console.log("[v0] [AI CHAT] Calling Gemini API...")

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: SYSTEM_PROMPT }],
            },
            ...messages.map((m: any) => ({
              role: m.role === "user" ? "user" : "model",
              parts: [{ text: m.content || m.text || "" }],
            })),
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("[v0] [AI CHAT] Gemini API error:", response.status, errorData)

      const lastMessage = messages[messages.length - 1]?.content || ""
      const fallbackResponse = generateFallbackResponse(lastMessage)

      // Handle specific error codes with helpful messages
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json({
          id: Date.now().toString(),
          role: "assistant",
          content:
            `**API de IA nao configurada corretamente**

A chave de API do Google Gemini esta invalida, expirada ou bloqueada.

**Como resolver:**
1. Acesse https://aistudio.google.com/apikey
2. Gere uma nova chave de API
3. Adicione ao arquivo \`.env.local\`:
   \`\`\`
   GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui
   \`\`\`
4. Reinicie o servidor com \`npm run dev\`

---

**Modo offline ativado:**
${fallbackResponse}`,
        })
      }

      if (response.status === 429) {
        return NextResponse.json({
          id: Date.now().toString(),
          role: "assistant",
          content:
            `**Limite de requisicoes excedido**

A API do Google Gemini atingiu o limite de requisicoes. Por favor, aguarde alguns minutos e tente novamente.

---

**Modo offline ativado:**
${fallbackResponse}`,
        })
      }

      if (response.status === 400) {
        console.error("[v0] [AI CHAT] Bad request - possible invalid message format")
        return NextResponse.json({
          id: Date.now().toString(),
          role: "assistant",
          content:
            `**Erro na requisicao**

Houve um problema ao processar sua mensagem. Tente reformular sua pergunta.

---

**Modo offline ativado:**
${fallbackResponse}`,
        })
      }

      if (response.status >= 500) {
        return NextResponse.json({
          id: Date.now().toString(),
          role: "assistant",
          content:
            `**Servico temporariamente indisponivel**

O servidor do Google Gemini esta com problemas. Por favor, tente novamente em alguns minutos.

---

**Modo offline ativado:**
${fallbackResponse}`,
        })
      }

      // Generic error with fallback
      return NextResponse.json({
        id: Date.now().toString(),
        role: "assistant",
        content:
          `**Erro ao processar sua mensagem**

Ocorreu um erro inesperado (codigo: ${response.status}). Por favor, tente novamente.

---

**Modo offline ativado:**
${fallbackResponse}`,
      })
    }

    const data = await response.json()
    const content =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, nao consegui processar sua solicitacao."

    console.log("[v0] [AI CHAT] Response generated successfully")

    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content,
    })
  } catch (error: any) {
    console.error("[v0] [AI CHAT] Error:", error.message)

    // Try to extract the user's message to provide a relevant fallback
    let fallbackContent = generateFallbackResponse("")
    try {
      const body = await req.clone().json()
      const lastMessage = body.messages?.[body.messages?.length - 1]?.content || ""
      fallbackContent = generateFallbackResponse(lastMessage)
    } catch {
      // Ignore parse errors, use default fallback
    }

    // Check if it's a network error
    const isNetworkError = error.message?.includes("fetch") ||
                           error.message?.includes("network") ||
                           error.message?.includes("ECONNREFUSED") ||
                           error.message?.includes("ETIMEDOUT")

    const errorMessage = isNetworkError
      ? `**Erro de conexao**

Nao foi possivel conectar ao servidor do Google Gemini. Verifique sua conexao com a internet.`
      : `**Erro ao processar sua mensagem**

Ocorreu um erro inesperado. Por favor, tente novamente.

**Possiveis solucoes:**
1. Verifique se a API do Google AI esta configurada em \`.env.local\`
2. Acesse https://aistudio.google.com/apikey para gerar uma nova chave
3. Reinicie o servidor com \`npm run dev\``

    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content: `${errorMessage}

---

**Modo offline ativado:**
${fallbackContent}`,
    })
  }
}

function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("soap") || lowerMessage.includes("nota clinica")) {
    return `**Nota SOAP - Modelo**

**S (Subjetivo):**
Paciente comparece para consulta relatando... [descreva a queixa principal e historia da doenca atual]

**O (Objetivo):**
- Sinais vitais: PA: ___/___mmHg, FC: ___bpm, FR: ___irpm, Temp: ___°C
- Exame fisico: [descreva achados relevantes]

**A (Avaliacao):**
Hipotese diagnostica: [diagnostico] - CID-10: [codigo]

**P (Plano):**
1. [Conduta terapeutica]
2. [Prescricoes]
3. [Exames solicitados]
4. [Orientacoes ao paciente]
5. Retorno em: ___

---
Para gerar notas SOAP personalizadas, configure a integracao com a API de IA nas configuracoes do sistema.`
  }

  if (lowerMessage.includes("tuss") || lowerMessage.includes("procedimento")) {
    return `**Codigos TUSS - Procedimentos**

O TUSS (Terminologia Unificada da Saude Suplementar) e o padrao para codificacao de procedimentos medicos no Brasil.

**Estrutura:**
- Consultas: 1010XXXX
- Procedimentos clinicos: 2XXXXXXX
- Exames laboratoriais: 4XXXXXXX
- Exames de imagem: 4XXXXXXX

**Exemplos comuns:**
- 10101012 - Consulta em consultorio
- 10102019 - Consulta em domicilio
- 40302040 - Hemograma completo
- 40808114 - Ultrassonografia abdominal

Para buscar codigos especificos, acesse a tabela TUSS no modulo de procedimentos do sistema.`
  }

  if (lowerMessage.includes("cid") || lowerMessage.includes("diagnostico")) {
    return `**Codigos CID-10 - Diagnosticos**

O CID-10 (Classificacao Internacional de Doencas) e usado para codificar diagnosticos medicos.

**Estrutura por capitulos:**
- A/B: Doencas infecciosas
- C/D: Neoplasias
- E: Doencas endocrinas
- I: Doencas cardiovasculares
- J: Doencas respiratorias
- K: Doencas digestivas
- M: Doencas musculoesqueleticas

**Exemplos comuns:**
- J06 - Infeccoes agudas vias aereas superiores
- I10 - Hipertensao essencial
- E11 - Diabetes mellitus tipo 2
- R51 - Cefaleia

Use o modulo de prontuario para buscar e inserir codigos CID-10 nos atendimentos.`
  }

  if (lowerMessage.includes("receita") || lowerMessage.includes("prescri")) {
    return `**Receitas Digitais - AtendeBem**

O modulo de receitas permite criar prescricoes digitais com assinatura eletronica.

**Funcionalidades:**
1. Busca de medicamentos por nome comercial ou principio ativo
2. Dosagem, posologia e duracao do tratamento
3. Impressao ou envio digital ao paciente
4. Historico de prescricoes por paciente

**Como criar uma receita:**
1. Acesse o menu Receitas
2. Selecione o paciente
3. Adicione os medicamentos
4. Defina posologia e orientacoes
5. Assine digitalmente e emita

Para receitas de controle especial, utilize os modelos apropriados (amarela/azul) disponiveis no sistema.`
  }

  if (lowerMessage.includes("atendimento") || lowerMessage.includes("registro")) {
    return `**Registro de Atendimentos - AtendeBem**

**Passo a passo:**
1. **Agenda**: Verifique os pacientes agendados para o dia
2. **Check-in**: Confirme a chegada do paciente
3. **Prontuario**: Acesse o EMR do paciente
4. **Anamnese**: Registre queixas e historico
5. **Exame Fisico**: Documente achados clinicos
6. **Diagnostico**: Adicione CID-10
7. **Conduta**: Registre prescricoes e orientacoes
8. **Finalizacao**: Fature o atendimento

**Dicas:**
- Use templates para agilizar registros
- Associe procedimentos TUSS ao atendimento
- Anexe exames e imagens quando necessario`
  }

  // Default response
  return `Ola! Sou o Assistente IA do AtendeBem.

Posso ajudar voce com:

📋 **Documentacao Clinica**
- Geracao de notas SOAP
- Codigos CID-10 e TUSS
- Receitas e atestados

🏥 **Uso do Sistema**
- Agendamento de consultas
- Prontuario eletronico (EMR)
- Modulo financeiro
- Telemedicina

📊 **Recursos Especiais**
- Odontograma digital
- Imagens medicas
- Contratos e TISS
- Estoque

Digite sua duvida ou escolha uma das sugestoes abaixo para comecar!

---
*Para funcionalidades completas de IA, configure a API do Google AI nas variaveis de ambiente do sistema.*`
}
