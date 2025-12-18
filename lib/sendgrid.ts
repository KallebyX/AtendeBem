/**
 * SendGrid Integration para emails transacionais
 * Templates, envio de anexos, tracking
 */

import sgMail from "@sendgrid/mail"

const isConfigured = process.env.SENDGRID_API_KEY

if (!isConfigured) {
  console.warn("⚠️  SendGrid não configurado. Emails não serão enviados.")
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "noreply@atendebem.com.br"
const FROM_NAME = process.env.SENDGRID_FROM_NAME || "AtendeBem"

/**
 * Enviar email simples
 */
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
  attachments?: Array<{
    filename: string
    content: Buffer | string
    contentType?: string
  }>
): Promise<void> {
  if (!isConfigured) {
    console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}`)
    return
  }

  const msg: any = {
    to,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    subject,
    html,
  }

  if (attachments) {
    msg.attachments = attachments.map((att) => ({
      filename: att.filename,
      content: typeof att.content === "string" ? att.content : att.content.toString("base64"),
      type: att.contentType,
      disposition: "attachment",
    }))
  }

  await sgMail.send(msg)
}

/**
 * Enviar email com template SendGrid
 */
export async function sendTemplatedEmail(
  to: string | string[],
  templateId: string,
  dynamicTemplateData: Record<string, any>
): Promise<void> {
  if (!isConfigured) {
    console.log(`[MOCK TEMPLATE EMAIL] To: ${to}, Template: ${templateId}`)
    return
  }

  const msg = {
    to,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME,
    },
    templateId,
    dynamicTemplateData,
  }

  await sgMail.send(msg)
}

/**
 * Templates HTML pré-configurados (caso não use SendGrid Templates)
 */
export const emailTemplates = {
  /**
   * Lembrete de consulta
   */
  appointmentReminder: (data: { patientName: string; appointmentDate: string; doctorName: string }): string => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lembrete de Consulta</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">AtendeBem</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Olá, ${data.patientName}!</h2>
            
            <p>Este é um lembrete da sua consulta agendada:</p>
            
            <div style="background-color: white; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0;">
                <p><strong>Data e Hora:</strong> ${data.appointmentDate}</p>
                <p><strong>Profissional:</strong> ${data.doctorName}</p>
            </div>
            
            <p>Por favor, chegue com 15 minutos de antecedência.</p>
            
            <p>Se precisar remarcar, entre em contato conosco.</p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>AtendeBem - Gestão Inteligente em Saúde</p>
        </div>
    </body>
    </html>
  `,

  /**
   * Bem-vindo ao sistema
   */
  welcome: (data: { userName: string }): string => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bem-vindo ao AtendeBem</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Bem-vindo ao AtendeBem!</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Olá, ${data.userName}!</h2>
            
            <p>Estamos felizes em ter você conosco.</p>
            
            <p>O AtendeBem é a plataforma completa para gestão de atendimentos em saúde, com:</p>
            
            <ul>
                <li>📋 Prontuário eletrônico completo</li>
                <li>💊 Prescrições digitais com assinatura ICP-Brasil</li>
                <li>📅 Agenda inteligente</li>
                <li>💰 Gestão financeira integrada</li>
                <li>🤖 Assistente de IA</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" 
                   style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    Acessar Plataforma
                </a>
            </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>AtendeBem - Menos burocracia. Mais medicina.</p>
        </div>
    </body>
    </html>
  `,

  /**
   * Receita pronta para download
   */
  prescriptionReady: (data: { patientName: string; prescriptionUrl: string }): string => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receita Digital Disponível</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Receita Digital Disponível</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Olá, ${data.patientName}!</h2>
            
            <p>Sua receita médica digital já está disponível para download.</p>
            
            <p>Esta receita possui assinatura digital certificada e validade legal em todo Brasil.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${data.prescriptionUrl}" 
                   style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    📄 Baixar Receita
                </a>
            </div>
            
            <p style="font-size: 12px; color: #666;">
                Esta receita ficará disponível por 30 dias. Após esse período, entre em contato com seu médico para nova cópia.
            </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>AtendeBem - Gestão Inteligente em Saúde</p>
        </div>
    </body>
    </html>
  `,

  /**
   * Pesquisa de satisfação
   */
  satisfactionSurvey: (data: { patientName: string; surveyUrl: string }): string => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Avalie seu Atendimento</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Como foi seu atendimento?</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Olá, ${data.patientName}!</h2>
            
            <p>Esperamos que seu atendimento tenha sido excelente!</p>
            
            <p>Sua opinião é muito importante para nós. Poderia dedicar 1 minuto para avaliar sua experiência?</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${data.surveyUrl}" 
                   style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    ⭐ Avaliar Atendimento
                </a>
            </div>
            
            <p>Obrigado pela confiança!</p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>AtendeBem - Gestão Inteligente em Saúde</p>
        </div>
    </body>
    </html>
  `,

  /**
   * Reset de senha
   */
  passwordReset: (data: { userName: string; resetUrl: string }): string => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Redefinir Senha</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0066cc; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Redefinir Senha</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Olá, ${data.userName}!</h2>
            
            <p>Recebemos uma solicitação para redefinir sua senha.</p>
            
            <p>Se você não solicitou essa alteração, ignore este email.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${data.resetUrl}" 
                   style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                    🔑 Redefinir Senha
                </a>
            </div>
            
            <p style="font-size: 12px; color: #666;">
                Este link expira em 1 hora.
            </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>AtendeBem - Gestão Inteligente em Saúde</p>
        </div>
    </body>
    </html>
  `,
}
