/**
 * Job Queue com BullMQ + Redis
 * Para tarefas assíncronas: emails, SMS, WhatsApp, backups, etc
 */

import { Queue, Worker, QueueEvents } from "bullmq"
import { redis } from "./redis"

if (!redis) {
  console.warn("⚠️  Redis não configurado. Job queue desabilitado.")
}

// Configuração de conexão Redis para BullMQ
const connection = redis
  ? {
      host: process.env.UPSTASH_REDIS_REST_URL?.replace("https://", "").split(":")[0],
      port: 6379,
      password: process.env.UPSTASH_REDIS_REST_TOKEN,
    }
  : undefined

// =====================================================
// QUEUES
// =====================================================

export const emailQueue = connection ? new Queue("emails", { connection }) : null
export const smsQueue = connection ? new Queue("sms", { connection }) : null
export const whatsappQueue = connection ? new Queue("whatsapp", { connection }) : null
export const notificationQueue = connection ? new Queue("notifications", { connection }) : null

// =====================================================
// JOB TYPES
// =====================================================

export interface EmailJob {
  to: string | string[]
  subject: string
  html: string
  template?: string
  templateData?: Record<string, any>
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
}

export interface SMSJob {
  to: string
  message: string
  patientId?: string
  appointmentId?: string
}

export interface WhatsAppJob {
  to: string
  templateName: string
  templateParams: string[]
  patientId?: string
}

export interface NotificationJob {
  userId: string
  type: string
  title: string
  message: string
  data?: Record<string, any>
}

// =====================================================
// JOB HELPERS
// =====================================================

export async function addEmailJob(data: EmailJob, options?: { delay?: number; priority?: number }) {
  if (!emailQueue) {
    console.warn("Email queue não disponível, enviando diretamente...")
    // Fallback: enviar diretamente sem queue
    const { sendEmail } = await import("./sendgrid")
    await sendEmail(data.to as string, data.subject, data.html)
    return null
  }

  return await emailQueue.add("send-email", data, {
    delay: options?.delay,
    priority: options?.priority,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  })
}

export async function addSMSJob(data: SMSJob, options?: { delay?: number }) {
  if (!smsQueue) {
    console.warn("SMS queue não disponível")
    return null
  }

  return await smsQueue.add("send-sms", data, {
    delay: options?.delay,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },
  })
}

export async function addWhatsAppJob(data: WhatsAppJob, options?: { delay?: number }) {
  if (!whatsappQueue) {
    console.warn("WhatsApp queue não disponível")
    return null
  }

  return await whatsappQueue.add("send-whatsapp", data, {
    delay: options?.delay,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
  })
}

export async function addNotificationJob(data: NotificationJob) {
  if (!notificationQueue) {
    console.warn("Notification queue não disponível")
    return null
  }

  return await notificationQueue.add("send-notification", data, {
    attempts: 2,
  })
}

// =====================================================
// WORKERS (processar jobs)
// =====================================================

/**
 * Email Worker
 * Processa envio de emails via SendGrid
 */
export function startEmailWorker() {
  if (!connection) {
    console.warn("Email worker não iniciado (Redis não configurado)")
    return null
  }

  const worker = new Worker(
    "emails",
    async (job) => {
      const { sendEmail, sendTemplatedEmail } = await import("./sendgrid")
      const data = job.data as EmailJob

      if (data.template && data.templateData) {
        await sendTemplatedEmail(data.to as string, data.template, data.templateData)
      } else {
        await sendEmail(data.to as string, data.subject, data.html, data.attachments)
      }

      console.log(`📧 Email enviado: ${data.subject} -> ${data.to}`)
    },
    { connection }
  )

  worker.on("failed", (job, err) => {
    console.error(`❌ Email job falhou: ${job?.id}`, err)
  })

  return worker
}

/**
 * SMS Worker
 * Processa envio de SMS via Twilio
 */
export function startSMSWorker() {
  if (!connection) {
    console.warn("SMS worker não iniciado (Redis não configurado)")
    return null
  }

  const worker = new Worker(
    "sms",
    async (job) => {
      const { sendSMS } = await import("./twilio")
      const data = job.data as SMSJob

      await sendSMS(data.to, data.message)

      console.log(`📱 SMS enviado: ${data.to}`)
    },
    { connection }
  )

  worker.on("failed", (job, err) => {
    console.error(`❌ SMS job falhou: ${job?.id}`, err)
  })

  return worker
}

/**
 * WhatsApp Worker
 * Processa envio via WhatsApp Business API
 */
export function startWhatsAppWorker() {
  if (!connection) {
    console.warn("WhatsApp worker não iniciado (Redis não configurado)")
    return null
  }

  const worker = new Worker(
    "whatsapp",
    async (job) => {
      const { sendWhatsAppTemplate } = await import("./whatsapp")
      const data = job.data as WhatsAppJob

      await sendWhatsAppTemplate(data.to, data.templateName, data.templateParams)

      console.log(`💬 WhatsApp enviado: ${data.templateName} -> ${data.to}`)
    },
    { connection }
  )

  worker.on("failed", (job, err) => {
    console.error(`❌ WhatsApp job falhou: ${job?.id}`, err)
  })

  return worker
}

// =====================================================
// QUEUE EVENTS (monitoramento)
// =====================================================

export function setupQueueEvents() {
  if (!connection) return

  const queueEvents = new QueueEvents("emails", { connection })

  queueEvents.on("completed", ({ jobId }) => {
    console.log(`✅ Job concluído: ${jobId}`)
  })

  queueEvents.on("failed", ({ jobId, failedReason }) => {
    console.error(`❌ Job falhou: ${jobId} - ${failedReason}`)
  })

  return queueEvents
}

// =====================================================
// TEMPLATES DE JOBS PRÉ-CONFIGURADOS
// =====================================================

export const jobTemplates = {
  /**
   * Lembrete de consulta (24h antes)
   */
  async sendAppointmentReminder(patientEmail: string, patientName: string, appointmentDate: Date, doctorName: string) {
    await addEmailJob(
      {
        to: patientEmail,
        template: "appointment-reminder",
        templateData: {
          patientName,
          appointmentDate: appointmentDate.toLocaleString("pt-BR"),
          doctorName,
        },
      },
      {
        // Agendar para 24h antes
        delay: appointmentDate.getTime() - Date.now() - 24 * 60 * 60 * 1000,
      }
    )
  },

  /**
   * Confirmação de cadastro
   */
  async sendWelcomeEmail(userEmail: string, userName: string) {
    await addEmailJob({
      to: userEmail,
      template: "welcome",
      templateData: {
        userName,
      },
    })
  },

  /**
   * Receita digital pronta
   */
  async sendPrescriptionReady(patientEmail: string, patientName: string, prescriptionUrl: string) {
    await addEmailJob({
      to: patientEmail,
      template: "prescription-ready",
      templateData: {
        patientName,
        prescriptionUrl,
      },
    })
  },

  /**
   * Pesquisa de satisfação pós-consulta
   */
  async sendSatisfactionSurvey(patientEmail: string, patientName: string, surveyUrl: string) {
    await addEmailJob(
      {
        to: patientEmail,
        template: "satisfaction-survey",
        templateData: {
          patientName,
          surveyUrl,
        },
      },
      {
        delay: 2 * 60 * 60 * 1000, // 2h após consulta
      }
    )
  },
}
