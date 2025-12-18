import jsPDF from 'jspdf'
import { generateQRCode } from './pdf-advanced'

export interface ReceiptData {
  receiptNumber: string
  issueDate: string
  professionalName: string
  professionalCRM: string
  professionalCPF: string
  professionalAddress: string
  patientName: string
  patientCPF: string
  description: string
  amount: number
  paymentMethod: string
  category: string
  notes?: string
  clinicLogo?: string
  clinicName?: string
}

/**
 * Gera PDF de recibo profissional com jsPDF
 */
export async function generateReceiptPDF(data: ReceiptData): Promise<Blob> {
  const doc = new jsPDF()
  
  let yPos = 20

  // Logo (se fornecido)
  if (data.clinicLogo) {
    try {
      doc.addImage(data.clinicLogo, 'PNG', 15, yPos, 30, 30)
      yPos += 35
    } catch (e) {
      console.error('Erro ao adicionar logo:', e)
    }
  }

  // Cabeçalho
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('RECIBO DE PAGAMENTO', 105, yPos, { align: 'center' })
  yPos += 10

  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Nº ${data.receiptNumber}`, 105, yPos, { align: 'center' })
  yPos += 15

  // Dados do Profissional
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('DADOS DO PROFISSIONAL', 15, yPos)
  yPos += 8

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Nome: ${data.professionalName}`, 15, yPos)
  yPos += 6
  doc.text(`CRM: ${data.professionalCRM}`, 15, yPos)
  yPos += 6
  doc.text(`CPF: ${data.professionalCPF}`, 15, yPos)
  yPos += 6
  doc.text(`Endereço: ${data.professionalAddress}`, 15, yPos)
  yPos += 12

  // Dados do Paciente
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('DADOS DO PACIENTE', 15, yPos)
  yPos += 8

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.text(`Nome: ${data.patientName}`, 15, yPos)
  yPos += 6
  doc.text(`CPF: ${data.patientCPF}`, 15, yPos)
  yPos += 12

  // Valor e Descrição
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('DESCRIÇÃO DO SERVIÇO', 15, yPos)
  yPos += 8

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const splitDescription = doc.splitTextToSize(data.description, 180)
  doc.text(splitDescription, 15, yPos)
  yPos += splitDescription.length * 6 + 6

  doc.text(`Categoria: ${data.category}`, 15, yPos)
  yPos += 6
  doc.text(`Forma de Pagamento: ${data.paymentMethod}`, 15, yPos)
  yPos += 12

  // Valor Total
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(data.amount)
  
  doc.text(`VALOR TOTAL: ${formattedAmount}`, 105, yPos, { align: 'center' })
  yPos += 10

  // Valor por extenso
  doc.setFontSize(10)
  doc.setFont('helvetica', 'italic')
  const amountInWords = numberToWords(data.amount)
  doc.text(`(${amountInWords})`, 105, yPos, { align: 'center' })
  yPos += 15

  // Observações
  if (data.notes) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.text('OBSERVAÇÕES', 15, yPos)
    yPos += 8

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    const splitNotes = doc.splitTextToSize(data.notes, 180)
    doc.text(splitNotes, 15, yPos)
    yPos += splitNotes.length * 6 + 10
  }

  // Data de Emissão
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  const formattedDate = new Date(data.issueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
  doc.text(`Emitido em: ${formattedDate}`, 105, yPos, { align: 'center' })
  yPos += 20

  // QR Code para validação
  try {
    const qrCodeData = await generateQRCode(
      `https://atendebem.com.br/validar-recibo/${data.receiptNumber}`
    )
    doc.addImage(qrCodeData, 'PNG', 85, yPos, 40, 40)
    yPos += 45
  } catch (e) {
    console.error('Erro ao gerar QR Code:', e)
  }

  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.text('Escaneie o QR Code para validar a autenticidade deste recibo', 105, yPos, { align: 'center' })
  yPos += 10

  // Assinatura Digital
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('_'.repeat(60), 105, yPos, { align: 'center' })
  yPos += 5
  doc.text(`Assinatura Digital - ${data.professionalName}`, 105, yPos, { align: 'center' })
  doc.setFontSize(7)
  yPos += 4
  doc.text(`CRM: ${data.professionalCRM}`, 105, yPos, { align: 'center' })

  // Rodapé
  doc.setFontSize(7)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(128, 128, 128)
  const pageHeight = doc.internal.pageSize.height
  doc.text('Documento gerado eletronicamente - AtendeBem.com.br', 105, pageHeight - 10, { align: 'center' })

  return doc.output('blob')
}

/**
 * Converte número para extenso (simplificado)
 */
function numberToWords(num: number): string {
  const integerPart = Math.floor(num)
  const decimalPart = Math.round((num - integerPart) * 100)

  const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
  const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
  const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
  const hundreds = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']

  function convertHundreds(n: number): string {
    if (n === 0) return ''
    if (n === 100) return 'cem'
    if (n < 10) return units[n]
    if (n < 20) return teens[n - 10]
    if (n < 100) {
      const ten = Math.floor(n / 10)
      const unit = n % 10
      return tens[ten] + (unit > 0 ? ' e ' + units[unit] : '')
    }

    const hundred = Math.floor(n / 100)
    const rest = n % 100
    return hundreds[hundred] + (rest > 0 ? ' e ' + convertHundreds(rest) : '')
  }

  function convertThousands(n: number): string {
    if (n < 1000) return convertHundreds(n)

    const thousand = Math.floor(n / 1000)
    const rest = n % 1000

    const thousandText = thousand === 1 ? 'mil' : convertHundreds(thousand) + ' mil'
    return thousandText + (rest > 0 ? ' e ' + convertHundreds(rest) : '')
  }

  let result = ''

  if (integerPart === 0) {
    result = 'zero reais'
  } else if (integerPart === 1) {
    result = 'um real'
  } else {
    result = convertThousands(integerPart) + ' reais'
  }

  if (decimalPart > 0) {
    const centText = decimalPart === 1 ? 'centavo' : 'centavos'
    result += ' e ' + convertHundreds(decimalPart) + ' ' + centText
  }

  return result.charAt(0).toUpperCase() + result.slice(1)
}

/**
 * Gera HTML de recibo para pré-visualização ou e-mail
 */
export async function generateReceiptHTML(data: ReceiptData): Promise<string> {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(data.amount)

  const formattedDate = new Date(data.issueDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  const amountInWords = numberToWords(data.amount)
  const qrCode = await generateQRCode(
    `https://atendebem.com.br/validar-recibo/${data.receiptNumber}`
  )

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recibo ${data.receiptNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
    .receipt { max-width: 800px; margin: 0 auto; background: white; padding: 60px; border: 2px solid #0066cc; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .header { text-align: center; border-bottom: 3px solid #0066cc; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #0066cc; font-size: 28px; margin-bottom: 10px; }
    .header .number { color: #666; font-size: 16px; }
    .section { margin-bottom: 30px; }
    .section-title { background: #0066cc; color: white; padding: 10px 15px; font-size: 14px; font-weight: bold; margin-bottom: 15px; border-radius: 4px; }
    .field { margin-bottom: 10px; }
    .field strong { color: #333; display: inline-block; min-width: 150px; }
    .amount-box { background: #f0f9ff; border: 2px solid #0066cc; padding: 20px; text-align: center; margin: 30px 0; border-radius: 8px; }
    .amount-box .value { font-size: 32px; color: #0066cc; font-weight: bold; margin-bottom: 10px; }
    .amount-box .words { font-style: italic; color: #666; font-size: 14px; }
    .footer { text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #ddd; }
    .qr-code { margin: 20px 0; }
    .qr-code img { width: 150px; height: 150px; }
    .signature { margin-top: 40px; text-align: center; }
    .signature-line { border-top: 1px solid #333; width: 300px; margin: 0 auto 10px; padding-top: 10px; }
    .metadata { color: #999; font-size: 11px; margin-top: 20px; }
    @media print {
      body { padding: 0; background: white; }
      .receipt { border: none; box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      ${data.clinicLogo ? `<img src="${data.clinicLogo}" alt="Logo" style="max-width: 120px; margin-bottom: 15px;">` : ''}
      <h1>RECIBO DE PAGAMENTO</h1>
      <div class="number">Nº ${data.receiptNumber}</div>
    </div>

    <div class="section">
      <div class="section-title">DADOS DO PROFISSIONAL</div>
      <div class="field"><strong>Nome:</strong> ${data.professionalName}</div>
      <div class="field"><strong>CRM:</strong> ${data.professionalCRM}</div>
      <div class="field"><strong>CPF:</strong> ${data.professionalCPF}</div>
      <div class="field"><strong>Endereço:</strong> ${data.professionalAddress}</div>
    </div>

    <div class="section">
      <div class="section-title">DADOS DO PACIENTE</div>
      <div class="field"><strong>Nome:</strong> ${data.patientName}</div>
      <div class="field"><strong>CPF:</strong> ${data.patientCPF}</div>
    </div>

    <div class="section">
      <div class="section-title">DESCRIÇÃO DO SERVIÇO</div>
      <div class="field">${data.description}</div>
      <div class="field" style="margin-top: 15px;"><strong>Categoria:</strong> ${data.category}</div>
      <div class="field"><strong>Forma de Pagamento:</strong> ${data.paymentMethod}</div>
    </div>

    <div class="amount-box">
      <div class="value">${formattedAmount}</div>
      <div class="words">(${amountInWords})</div>
    </div>

    ${data.notes ? `
    <div class="section">
      <div class="section-title">OBSERVAÇÕES</div>
      <div class="field">${data.notes}</div>
    </div>
    ` : ''}

    <div class="footer">
      <div style="margin-bottom: 20px;">
        <strong>Data de Emissão:</strong> ${formattedDate}
      </div>

      <div class="qr-code">
        <img src="${qrCode}" alt="QR Code de Validação">
        <div style="font-size: 12px; color: #666; margin-top: 10px;">
          Escaneie para validar a autenticidade deste recibo
        </div>
      </div>

      <div class="signature">
        <div class="signature-line">
          Assinatura Digital - ${data.professionalName}
        </div>
        <div style="font-size: 12px; color: #666;">CRM: ${data.professionalCRM}</div>
      </div>

      <div class="metadata">
        Documento gerado eletronicamente em ${new Date().toLocaleString('pt-BR')}<br>
        AtendeBem - Sistema de Gestão em Saúde
      </div>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Valida número de recibo
 */
export function validateReceiptNumber(receiptNumber: string): boolean {
  // Formato: REC-YYYYMM-XXXXXX
  const pattern = /^REC-\d{6}-\d{6}$/
  return pattern.test(receiptNumber)
}
