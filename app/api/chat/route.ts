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

    // Get API key from environment
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY

    if (!apiKey) {
      // Fallback response when no API key is configured
      const lastMessage = messages[messages.length - 1]?.content || ""
      const fallbackResponse = generateFallbackResponse(lastMessage)

      return NextResponse.json({
        id: Date.now().toString(),
        role: "assistant",
        content: fallbackResponse
      })
    }

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
              parts: [{ text: SYSTEM_PROMPT }]
            },
            ...messages.map((m: any) => ({
              role: m.role === "user" ? "user" : "model",
              parts: [{ text: m.content || m.text || "" }]
            }))
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API error:", errorData)
      throw new Error("API request failed")
    }

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, nao consegui processar sua solicitacao."

    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content
    })
  } catch (error: any) {
    console.error("Chat API error:", error)

    // Return fallback response on error
    return NextResponse.json({
      id: Date.now().toString(),
      role: "assistant",
      content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte."
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
