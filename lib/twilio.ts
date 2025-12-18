/**
 * Twilio SMS Integration
 * Envio de SMS para lembretes, confirmações e notificações
 */

import twilio from "twilio"

const isConfigured =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER

if (!isConfigured) {
  console.warn("⚠️  Twilio não configurado. SMS não serão enviados.")
}

const client = isConfigured
  ? twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
  : null

const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+5511999999999"

/**
 * Enviar SMS simples
 */
export async function sendSMS(to: string, message: string): Promise<void> {
  if (!client) {
    console.log(`[MOCK SMS] To: ${to}, Message: ${message}`)
    return
  }

  // Formatar número brasileiro
  const formattedTo = to.startsWith("+55") ? to : `+55${to.replace(/\D/g, "")}`

  await client.messages.create({
    body: message,
    from: FROM_NUMBER,
    to: formattedTo,
  })

  console.log(`📱 SMS enviado para ${formattedTo}`)
}

/**
 * Templates de SMS pré-configurados
 */
export const smsTemplates = {
  /**
   * Lembrete de consulta (24h antes)
   */
  appointmentReminder: (patientName: string, date: string, time: string, doctorName: string): string =>
    `Olá ${patientName}! Lembrete: você tem consulta com ${doctorName} em ${date} às ${time}. Chegue com 15min de antecedência.`,

  /**
   * Confirmação de agendamento
   */
  appointmentConfirmation: (patientName: string, date: string, time: string): string =>
    `${patientName}, sua consulta foi agendada para ${date} às ${time}. Em caso de dúvidas, entre em contato.`,

  /**
   * Cancelamento de consulta
   */
  appointmentCancellation: (patientName: string, date: string, time: string): string =>
    `${patientName}, sua consulta de ${date} às ${time} foi cancelada. Entre em contato para reagendar.`,

  /**
   * Receita disponível
   */
  prescriptionReady: (patientName: string, url: string): string =>
    `${patientName}, sua receita digital está pronta! Acesse: ${url}`,

  /**
   * Código de verificação 2FA
   */
  verification: (code: string): string => `Seu código de verificação AtendeBem: ${code}. Válido por 5 minutos.`,

  /**
   * Exame disponível
   */
  examReady: (patientName: string): string =>
    `${patientName}, seus resultados de exames estão disponíveis. Acesse o portal do paciente.`,
}

/**
 * Helpers para envio de templates
 */
export async function sendAppointmentReminderSMS(
  phone: string,
  patientName: string,
  date: string,
  time: string,
  doctorName: string
): Promise<void> {
  const message = smsTemplates.appointmentReminder(patientName, date, time, doctorName)
  await sendSMS(phone, message)
}

export async function sendVerificationCode(phone: string, code: string): Promise<void> {
  const message = smsTemplates.verification(code)
  await sendSMS(phone, message)
}

/**
 * Validar número de telefone brasileiro
 */
export function isValidBrazilianPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "")
  
  // Celular: (11) 98765-4321 = 11 dígitos
  // Fixo: (11) 3456-7890 = 10 dígitos
  return digits.length === 10 || digits.length === 11
}

/**
 * Formatar número para exibição
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  
  if (digits.length === 11) {
    // Celular: (11) 98765-4321
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  } else if (digits.length === 10) {
    // Fixo: (11) 3456-7890
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  
  return phone
}
