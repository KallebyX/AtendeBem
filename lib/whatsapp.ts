/**
 * WhatsApp Business API Integration
 * Envio de mensagens via templates aprovados pela Meta
 */

const isConfigured = process.env.WHATSAPP_BUSINESS_PHONE_ID && process.env.WHATSAPP_ACCESS_TOKEN

if (!isConfigured) {
  console.warn("⚠️  WhatsApp Business API não configurado. Mensagens não serão enviadas.")
}

const PHONE_NUMBER_ID = process.env.WHATSAPP_BUSINESS_PHONE_ID
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const API_VERSION = "v21.0"
const API_URL = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`

/**
 * Enviar mensagem de template WhatsApp
 * Templates devem ser previamente aprovados pela Meta
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  templateParams: string[]
): Promise<void> {
  if (!isConfigured) {
    console.log(`[MOCK WHATSAPP] To: ${to}, Template: ${templateName}, Params: ${templateParams}`)
    return
  }

  // Formatar número brasileiro (sem +)
  const formattedTo = to.replace(/\D/g, "").replace(/^55/, "")
  const fullNumber = `55${formattedTo}`

  const payload = {
    messaging_product: "whatsapp",
    to: fullNumber,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: "pt_BR",
      },
      components: [
        {
          type: "body",
          parameters: templateParams.map((text) => ({ type: "text", text })),
        },
      ],
    },
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`WhatsApp API Error: ${JSON.stringify(error)}`)
  }

  const data = await response.json()
  console.log(`💬 WhatsApp enviado: ${templateName} -> ${fullNumber}`, data)
}

/**
 * Enviar mensagem de texto simples (apenas para conversas ativas)
 * Nota: Só funciona em janelas de 24h após mensagem do usuário
 */
export async function sendWhatsAppText(to: string, message: string): Promise<void> {
  if (!isConfigured) {
    console.log(`[MOCK WHATSAPP TEXT] To: ${to}, Message: ${message}`)
    return
  }

  const formattedTo = to.replace(/\D/g, "").replace(/^55/, "")
  const fullNumber = `55${formattedTo}`

  const payload = {
    messaging_product: "whatsapp",
    to: fullNumber,
    type: "text",
    text: {
      body: message,
    },
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`WhatsApp API Error: ${JSON.stringify(error)}`)
  }

  console.log(`💬 WhatsApp texto enviado para ${fullNumber}`)
}

/**
 * Templates pré-configurados (devem estar aprovados na Meta Business)
 * Naming convention: lowercase_with_underscores
 */
export const whatsappTemplates = {
  /**
   * Lembrete de consulta
   * Parâmetros: [nome_paciente, data, hora, nome_medico]
   */
  APPOINTMENT_REMINDER: "lembrete_consulta",

  /**
   * Confirmação de agendamento
   * Parâmetros: [nome_paciente, data, hora]
   */
  APPOINTMENT_CONFIRMATION: "confirmacao_agendamento",

  /**
   * Receita disponível
   * Parâmetros: [nome_paciente, link_receita]
   */
  PRESCRIPTION_READY: "receita_disponivel",

  /**
   * Pesquisa de satisfação
   * Parâmetros: [nome_paciente, link_pesquisa]
   */
  SATISFACTION_SURVEY: "pesquisa_satisfacao",

  /**
   * Exame disponível
   * Parâmetros: [nome_paciente]
   */
  EXAM_READY: "exame_disponivel",
}

/**
 * Helpers para envio de templates específicos
 */
export async function sendAppointmentReminderWhatsApp(
  phone: string,
  patientName: string,
  date: string,
  time: string,
  doctorName: string
): Promise<void> {
  await sendWhatsAppTemplate(phone, whatsappTemplates.APPOINTMENT_REMINDER, [
    patientName,
    date,
    time,
    doctorName,
  ])
}

export async function sendPrescriptionReadyWhatsApp(
  phone: string,
  patientName: string,
  prescriptionUrl: string
): Promise<void> {
  await sendWhatsAppTemplate(phone, whatsappTemplates.PRESCRIPTION_READY, [patientName, prescriptionUrl])
}

export async function sendSatisfactionSurveyWhatsApp(
  phone: string,
  patientName: string,
  surveyUrl: string
): Promise<void> {
  await sendWhatsAppTemplate(phone, whatsappTemplates.SATISFACTION_SURVEY, [patientName, surveyUrl])
}

/**
 * Processar webhook do WhatsApp (receber mensagens)
 */
export interface WhatsAppWebhookMessage {
  from: string
  id: string
  timestamp: string
  text?: {
    body: string
  }
  type: "text" | "image" | "document" | "audio" | "video"
}

export function parseWhatsAppWebhook(body: any): WhatsAppWebhookMessage[] {
  const messages: WhatsAppWebhookMessage[] = []

  if (body.object === "whatsapp_business_account") {
    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "messages") {
          for (const message of change.value.messages || []) {
            messages.push({
              from: message.from,
              id: message.id,
              timestamp: message.timestamp,
              text: message.text,
              type: message.type,
            })
          }
        }
      }
    }
  }

  return messages
}

/**
 * Verificar webhook (handshake inicial)
 */
export function verifyWhatsAppWebhook(mode: string, token: string, challenge: string): string | null {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN

  if (mode === "subscribe" && token === verifyToken) {
    return challenge
  }

  return null
}
