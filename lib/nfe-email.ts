/**
 * Sistema de envio de emails para NFE
 * Envia notas fiscais para clientes e contabilistas
 */

import { getDb } from '@/lib/db'

// ============================================================================
// TIPOS
// ============================================================================
export interface NFeEmailData {
  invoiceId: string
  recipientType: 'customer' | 'accountant'
  recipientEmail: string
  recipientName: string
  invoiceNumber: string
  invoiceType: 'nfe' | 'nfse'
  emitterName: string
  customerName: string
  servicesValue: number
  issueDate: string
  accessKey?: string
  verificationCode?: string
  includePDF: boolean
  includeXML: boolean
  pdfContent?: string // Base64
  xmlContent?: string
}

export interface EmailTemplate {
  subject: string
  html: string
}

// ============================================================================
// TEMPLATES DE EMAIL
// ============================================================================
export function generateNFeEmailTemplate(data: NFeEmailData): EmailTemplate {
  const isNFSe = data.invoiceType === 'nfse'
  const documentType = isNFSe ? 'NFS-e' : 'NF-e'

  const subject = `${documentType} ${data.invoiceNumber} - ${data.emitterName}`

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${documentType} - ${data.invoiceNumber}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #0070f3 0%, #0051a8 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .header p {
      margin: 10px 0 0;
      opacity: 0.9;
    }
    .content {
      background: #f8f9fa;
      padding: 30px;
      border: 1px solid #e9ecef;
    }
    .info-box {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      border: 1px solid #e9ecef;
    }
    .info-box h3 {
      margin: 0 0 15px;
      color: #0070f3;
      font-size: 16px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      color: #666;
      font-size: 14px;
    }
    .info-value {
      font-weight: 600;
      color: #333;
    }
    .total-box {
      background: #0070f3;
      color: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin-bottom: 20px;
    }
    .total-box .label {
      font-size: 14px;
      opacity: 0.9;
    }
    .total-box .value {
      font-size: 28px;
      font-weight: 700;
    }
    .code-box {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 15px;
      text-align: center;
      margin-bottom: 20px;
    }
    .code-box .label {
      font-size: 12px;
      color: #856404;
      margin-bottom: 5px;
    }
    .code-box .code {
      font-family: monospace;
      font-size: 14px;
      font-weight: bold;
      color: #856404;
      word-break: break-all;
    }
    .attachments {
      background: #e8f5e9;
      border: 1px solid #4caf50;
      border-radius: 8px;
      padding: 15px;
      margin-bottom: 20px;
    }
    .attachments h4 {
      margin: 0 0 10px;
      color: #2e7d32;
    }
    .attachments ul {
      margin: 0;
      padding-left: 20px;
    }
    .footer {
      background: #333;
      color: #999;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      text-align: center;
      font-size: 12px;
    }
    .footer a {
      color: #0070f3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${documentType}</h1>
    <p>${data.emitterName}</p>
  </div>

  <div class="content">
    <p>Prezado(a) <strong>${data.recipientName}</strong>,</p>

    <p>
      ${data.recipientType === 'accountant'
        ? `Segue em anexo a ${documentType} emitida para ${data.customerName}.`
        : `Sua ${documentType} foi emitida com sucesso. Seguem os detalhes abaixo.`
      }
    </p>

    <div class="info-box">
      <h3>Dados da Nota Fiscal</h3>
      <div class="info-row">
        <span class="info-label">Número</span>
        <span class="info-value">${data.invoiceNumber}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Data de Emissão</span>
        <span class="info-value">${new Date(data.issueDate).toLocaleDateString('pt-BR')}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Tomador</span>
        <span class="info-value">${data.customerName}</span>
      </div>
    </div>

    <div class="total-box">
      <div class="label">Valor Total</div>
      <div class="value">R$ ${data.servicesValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
    </div>

    ${data.verificationCode ? `
    <div class="code-box">
      <div class="label">Código de Verificação</div>
      <div class="code">${data.verificationCode}</div>
    </div>
    ` : ''}

    ${data.accessKey ? `
    <div class="code-box">
      <div class="label">Chave de Acesso</div>
      <div class="code">${data.accessKey}</div>
    </div>
    ` : ''}

    ${(data.includePDF || data.includeXML) ? `
    <div class="attachments">
      <h4>Anexos</h4>
      <ul>
        ${data.includePDF ? `<li>DANFE (PDF)</li>` : ''}
        ${data.includeXML ? `<li>XML da ${documentType}</li>` : ''}
      </ul>
    </div>
    ` : ''}

    <p style="color: #666; font-size: 14px;">
      ${isNFSe
        ? 'Este documento pode ser verificado no portal da prefeitura utilizando o código de verificação acima.'
        : 'Este documento pode ser consultado no portal da SEFAZ utilizando a chave de acesso.'
      }
    </p>
  </div>

  <div class="footer">
    <p>Este email foi enviado automaticamente pelo sistema AtendeBem.</p>
    <p>Em caso de dúvidas, entre em contato conosco.</p>
  </div>
</body>
</html>
`

  return { subject, html }
}

// ============================================================================
// TEMPLATE PARA RESUMO DIÁRIO/SEMANAL
// ============================================================================
export function generateSummaryEmailTemplate(data: {
  accountantName: string
  emitterName: string
  period: string
  invoices: Array<{
    number: string
    type: string
    customerName: string
    value: number
    date: string
  }>
  totalValue: number
  totalISS: number
}): EmailTemplate {
  const subject = `Resumo de Notas Fiscais - ${data.period} - ${data.emitterName}`

  const invoiceRows = data.invoices.map(inv => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${inv.number}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${inv.type}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${inv.customerName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${new Date(inv.date).toLocaleDateString('pt-BR')}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        R$ ${inv.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </td>
    </tr>
  `).join('')

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Resumo de Notas Fiscais</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <div style="background: #0070f3; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
    <h1 style="margin: 0;">Resumo de Notas Fiscais</h1>
    <p style="margin: 10px 0 0;">${data.emitterName} - ${data.period}</p>
  </div>

  <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
    <p>Prezado(a) <strong>${data.accountantName}</strong>,</p>
    <p>Segue o resumo das notas fiscais emitidas no período:</p>

    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
      <thead>
        <tr style="background: #e9ecef;">
          <th style="padding: 12px; text-align: left;">Número</th>
          <th style="padding: 12px; text-align: left;">Tipo</th>
          <th style="padding: 12px; text-align: left;">Cliente</th>
          <th style="padding: 12px; text-align: left;">Data</th>
          <th style="padding: 12px; text-align: right;">Valor</th>
        </tr>
      </thead>
      <tbody>
        ${invoiceRows}
      </tbody>
      <tfoot>
        <tr style="background: #e8f5e9; font-weight: bold;">
          <td colspan="4" style="padding: 12px;">TOTAL</td>
          <td style="padding: 12px; text-align: right;">
            R$ ${data.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </td>
        </tr>
        <tr style="background: #fff3cd;">
          <td colspan="4" style="padding: 12px;">Total ISS</td>
          <td style="padding: 12px; text-align: right;">
            R$ ${data.totalISS.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </td>
        </tr>
      </tfoot>
    </table>

    <p style="margin-top: 20px; color: #666; font-size: 14px;">
      Os arquivos XML e PDF das notas estão disponíveis para download no sistema.
    </p>
  </div>

  <div style="background: #333; color: #999; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px;">
    <p style="margin: 0;">Este email foi enviado automaticamente pelo sistema AtendeBem.</p>
  </div>
</body>
</html>
`

  return { subject, html }
}

// ============================================================================
// FUNÇÃO DE ENVIO (USANDO SENDGRID)
// ============================================================================
export async function sendNFeEmail(data: NFeEmailData): Promise<{ success: boolean; error?: string }> {
  try {
    const template = generateNFeEmailTemplate(data)

    // Preparar anexos
    const attachments: Array<{ content: string; filename: string; type: string }> = []

    if (data.includePDF && data.pdfContent) {
      attachments.push({
        content: data.pdfContent,
        filename: `${data.invoiceType.toUpperCase()}_${data.invoiceNumber.replace(/[^\w]/g, '_')}.pdf`,
        type: 'application/pdf',
      })
    }

    if (data.includeXML && data.xmlContent) {
      attachments.push({
        content: Buffer.from(data.xmlContent).toString('base64'),
        filename: `${data.invoiceType.toUpperCase()}_${data.invoiceNumber.replace(/[^\w]/g, '_')}.xml`,
        type: 'application/xml',
      })
    }

    // Enviar via SendGrid (ou outro provedor)
    const sendgridKey = process.env.SENDGRID_API_KEY
    if (sendgridKey) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: data.recipientEmail, name: data.recipientName }],
            },
          ],
          from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'noreply@atendebem.com.br',
            name: process.env.SENDGRID_FROM_NAME || 'AtendeBem',
          },
          subject: template.subject,
          content: [
            {
              type: 'text/html',
              value: template.html,
            },
          ],
          attachments: attachments.length > 0 ? attachments : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error(`SendGrid error: ${response.status}`)
      }
    } else {
      // Log para desenvolvimento
      console.log('Email enviado (simulado):', {
        to: data.recipientEmail,
        subject: template.subject,
      })
    }

    return { success: true }
  } catch (error: any) {
    console.error('Erro ao enviar email NFe:', error)
    return { success: false, error: error.message }
  }
}

// ============================================================================
// REGISTRAR ENVIO NO BANCO
// ============================================================================
export async function logNFeEmailSent(data: {
  tenantId: string
  invoiceId: string
  recipientType: 'customer' | 'accountant' | 'other'
  recipientEmail: string
  recipientName: string
  subject: string
  hasPdf: boolean
  hasXml: boolean
  status: 'sent' | 'failed'
  errorMessage?: string
}) {
  try {
    const db = await getDb()

    await db`
      INSERT INTO nfe_email_logs (
        tenant_id, invoice_id, recipient_type, recipient_email, recipient_name,
        subject, has_pdf, has_xml, status, sent_at, error_message
      ) VALUES (
        ${data.tenantId}, ${data.invoiceId}, ${data.recipientType},
        ${data.recipientEmail}, ${data.recipientName}, ${data.subject},
        ${data.hasPdf}, ${data.hasXml}, ${data.status},
        ${data.status === 'sent' ? new Date().toISOString() : null},
        ${data.errorMessage || null}
      )
    `

    return { success: true }
  } catch (error: any) {
    console.error('Erro ao registrar log de email:', error)
    return { success: false, error: error.message }
  }
}
