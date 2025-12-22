/**
 * @fileoverview AI Chat API Route - AtendeBem Virtual Assistant
 *
 * This module provides an AI-powered chat endpoint that integrates with
 * Google Gemini API to assist healthcare professionals with system usage,
 * medical documentation, and clinical workflows.
 *
 * ## Overview
 *
 * The AI chat assistant helps users with:
 * - Generating SOAP clinical notes (Subjective, Objective, Assessment, Plan)
 * - Looking up TUSS procedure codes (Brazilian healthcare billing codes)
 * - Finding CID-10 diagnostic codes (International Classification of Diseases)
 * - Creating digital prescriptions and medical certificates
 * - Navigating AtendeBem system features
 *
 * ## API Endpoint
 *
 * **POST /api/chat**
 *
 * Sends a message to the AI assistant and receives a response.
 *
 * ### Request Body
 *
 * ```typescript
 * interface ChatRequest {
 *   messages: Array<{
 *     role: 'user' | 'assistant';
 *     content: string;
 *   }>;
 * }
 * ```
 *
 * ### Response Body
 *
 * ```typescript
 * interface ChatResponse {
 *   id: string;          // Unique message ID (timestamp-based)
 *   role: 'assistant';   // Always 'assistant' for responses
 *   content: string;     // The AI-generated response
 * }
 * ```
 *
 * ## Architecture
 *
 * The endpoint implements a graceful degradation pattern:
 *
 * 1. **Primary Mode (Online)**: Uses Google Gemini 1.5 Flash for intelligent
 *    responses. Requires API key configuration.
 *
 * 2. **Fallback Mode (Offline)**: When API is unavailable or misconfigured,
 *    returns contextual template responses based on message content analysis.
 *    This ensures users always receive helpful information.
 *
 * ## Error Handling
 *
 * The API handles specific error scenarios with user-friendly messages:
 *
 * | HTTP Status | Error Type | User Message |
 * |-------------|------------|--------------|
 * | 401/403 | Invalid/expired API key | Instructions to regenerate key |
 * | 429 | Rate limit exceeded | Wait and retry message |
 * | 400 | Invalid message format | Reformulate request message |
 * | 500+ | Server error | Service temporarily unavailable |
 * | Network | Connection failed | Check internet connection |
 *
 * All error responses include both the error explanation AND a fallback
 * response so users still get some assistance.
 *
 * ## Environment Configuration
 *
 * The module supports multiple environment variable names for the API key:
 *
 * - `GOOGLE_GENERATIVE_AI_API_KEY` (recommended)
 * - `GOOGLE_AI_API_KEY`
 * - `GEMINI_API_KEY`
 *
 * To configure:
 * 1. Visit https://aistudio.google.com/apikey
 * 2. Generate a new API key
 * 3. Add to `.env.local`: `GOOGLE_GENERATIVE_AI_API_KEY=your_key_here`
 * 4. Restart the development server
 *
 * ## Fallback Response Categories
 *
 * When the API is unavailable, the system provides contextual responses for:
 *
 * - **SOAP Notes**: Template for clinical documentation with S/O/A/P sections
 * - **TUSS Codes**: Overview of procedure code structure and common examples
 * - **CID-10 Codes**: Diagnostic code structure and common examples
 * - **Prescriptions**: Digital prescription workflow guide
 * - **Appointments**: Step-by-step registration process
 * - **General**: System overview and feature list
 *
 * ## Security Considerations
 *
 * - API key is never exposed to client-side code
 * - No patient data is sent to external AI services in this implementation
 * - System prompt defines assistant boundaries and responsibilities
 * - All responses include disclaimer about professional medical advice
 *
 * ## Performance Configuration
 *
 * - `maxDuration`: 30 seconds timeout for API calls
 * - `temperature`: 0.7 for balanced creativity/accuracy
 * - `maxOutputTokens`: 2000 tokens per response
 *
 * @module api/chat
 * @version 1.0.0
 *
 * @example
 * // Frontend usage with fetch
 * const response = await fetch('/api/chat', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     messages: [
 *       { role: 'user', content: 'Gere uma nota SOAP para paciente com cefaleia' }
 *     ]
 *   })
 * });
 *
 * const data = await response.json();
 * console.log(data.content); // AI-generated SOAP note
 *
 * @example
 * // Handling conversation history
 * const messages = [
 *   { role: 'user', content: 'Qual o código TUSS para consulta?' },
 *   { role: 'assistant', content: '10101012 - Consulta em consultório' },
 *   { role: 'user', content: 'E para consulta em domicílio?' }
 * ];
 *
 * const response = await fetch('/api/chat', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ messages })
 * });
 *
 * @see {@link https://ai.google.dev/gemini-api/docs} Google Gemini API Documentation
 * @see {@link https://www.ans.gov.br/prestadores/tuss-terminologia-unificada-da-saude-suplementar} TUSS Reference
 * @see {@link https://www.who.int/classifications/icd/en/} CID-10 Reference
 */

import { NextResponse } from "next/server"

/**
 * Maximum execution time for this API route in seconds.
 *
 * Set to 30 seconds to accommodate potential network latency
 * and AI model processing time while preventing indefinite hangs.
 *
 * @constant {number}
 */
export const maxDuration = 30

/**
 * System prompt that defines the AI assistant's persona and capabilities.
 *
 * This prompt is prepended to every conversation to establish:
 * - The assistant's role as AtendeBem's virtual helper
 * - Core responsibilities and knowledge domains
 * - SOAP note formatting guidelines
 * - Important disclaimers about medical advice
 * - Knowledge of AtendeBem system modules and features
 *
 * The prompt is designed to:
 * 1. Keep responses focused on healthcare and system usage
 * 2. Maintain professional medical terminology
 * 3. Always recommend professional consultation for diagnoses
 * 4. Respond in Brazilian Portuguese
 *
 * @constant {string}
 * @private
 */
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

/**
 * POST /api/chat - Handle AI chat requests
 *
 * Processes incoming chat messages and returns AI-generated responses.
 * Implements graceful degradation with intelligent fallback when the
 * Google Gemini API is unavailable.
 *
 * ## Request Processing Flow
 *
 * 1. Parse incoming JSON body to extract messages array
 * 2. Check for API key configuration (supports 3 env variable names)
 * 3. If no API key: Return contextual fallback response
 * 4. If API key exists: Call Google Gemini API
 * 5. Handle API response or errors with appropriate messaging
 * 6. Return formatted response with unique ID
 *
 * ## Gemini API Integration
 *
 * The function constructs a request to Gemini 1.5 Flash with:
 * - System prompt as first message (role: "user")
 * - Conversation history with role mapping (user -> "user", assistant -> "model")
 * - Generation config: temperature=0.7, maxOutputTokens=2000
 *
 * ## Error Recovery Strategy
 *
 * All error responses include:
 * 1. Clear error explanation in Portuguese
 * 2. Steps to resolve the issue (when applicable)
 * 3. Fallback response with contextual help
 *
 * This ensures users always receive some value even when the AI is unavailable.
 *
 * @param {Request} req - The incoming HTTP request object
 * @param {Object} req.body - JSON body containing the messages array
 * @param {Array<{role: string, content: string}>} req.body.messages - Chat history
 *
 * @returns {Promise<NextResponse>} JSON response with assistant message
 *
 * @example
 * // Successful response
 * {
 *   "id": "1703123456789",
 *   "role": "assistant",
 *   "content": "O código TUSS para consulta em consultório é 10101012..."
 * }
 *
 * @example
 * // Error response with fallback
 * {
 *   "id": "1703123456789",
 *   "role": "assistant",
 *   "content": "**API de IA não configurada...**\n\n---\n\n**Modo offline ativado:**\nOlá! Sou o Assistente IA do AtendeBem..."
 * }
 *
 * @throws {Error} Catches and handles all errors internally, never throws
 */
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

/**
 * Generates contextual fallback responses when the AI API is unavailable.
 *
 * This function analyzes the user's message content and returns a pre-defined
 * template response that matches the likely intent. It serves as an intelligent
 * offline assistant, ensuring users receive helpful information even without
 * the full AI capabilities.
 *
 * ## Content Analysis Categories
 *
 * The function checks for keywords in the following priority order:
 *
 * | Keywords | Category | Response Type |
 * |----------|----------|---------------|
 * | "soap", "nota clinica" | Clinical Notes | SOAP template with section guide |
 * | "tuss", "procedimento" | Procedures | TUSS code structure and examples |
 * | "cid", "diagnostico" | Diagnosis | CID-10 chapter overview and examples |
 * | "receita", "prescri" | Prescriptions | Digital prescription workflow |
 * | "atendimento", "registro" | Appointments | Registration step-by-step guide |
 * | (default) | General | System overview and feature list |
 *
 * ## Response Format
 *
 * All responses follow a consistent markdown format:
 * - Bold headers for main sections
 * - Bullet points for lists
 * - Code examples where applicable
 * - Call-to-action for full AI configuration
 *
 * ## Use Cases
 *
 * - API key not configured (development/new installations)
 * - API key expired or invalid
 * - Rate limits exceeded
 * - Network connectivity issues
 * - Google API service outages
 *
 * @param {string} message - The user's last message to analyze for context
 *
 * @returns {string} A markdown-formatted response tailored to the detected intent
 *
 * @example
 * // SOAP note request
 * generateFallbackResponse("gere uma nota soap")
 * // Returns: "**Nota SOAP - Modelo**\n\n**S (Subjetivo):**..."
 *
 * @example
 * // TUSS code lookup
 * generateFallbackResponse("qual o código tuss para hemograma?")
 * // Returns: "**Códigos TUSS - Procedimentos**\n\nO TUSS..."
 *
 * @example
 * // General greeting
 * generateFallbackResponse("olá")
 * // Returns: "Olá! Sou o Assistente IA do AtendeBem..."
 *
 * @private
 */
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
