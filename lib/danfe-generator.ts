/**
 * Gerador de DANFE (Documento Auxiliar da Nota Fiscal Eletrônica)
 * Suporta NFSe (serviços) e NFe (produtos)
 */

import jsPDF from 'jspdf'

// ============================================================================
// TIPOS
// ============================================================================
export interface DANFEData {
  // Tipo de nota
  invoiceType: 'nfe' | 'nfse'

  // Identificação
  invoiceNumber: string
  series: string
  accessKey?: string           // 44 dígitos para NFe
  verificationCode?: string    // Código verificação NFSe
  authorizationProtocol?: string
  authorizationDate?: string
  issueDate: string

  // RPS (para NFSe)
  rpsNumber?: string
  rpsSeries?: string
  rpsDate?: string

  // Emitente
  emitter: {
    name: string
    fantasyName?: string
    cnpj: string
    ie?: string
    im?: string
    cnae?: string
    address: {
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
      zipcode: string
      cityCode?: string
    }
    phone?: string
    email?: string
  }

  // Tomador/Destinatário
  recipient: {
    name: string
    cpfCnpj: string
    ie?: string
    address?: {
      street: string
      number: string
      complement?: string
      neighborhood: string
      city: string
      state: string
      zipcode: string
    }
    phone?: string
    email?: string
  }

  // Serviços/Itens
  items: Array<{
    code?: string
    description: string
    quantity: number
    unitPrice: number
    totalPrice: number
    lc116Code?: string
  }>

  // Valores
  values: {
    servicesValue: number
    deductions?: number
    discount?: number
    baseValue: number
    issRate: number
    issValue: number
    pisValue?: number
    cofinsValue?: number
    irValue?: number
    csllValue?: number
    inssValue?: number
    netValue: number
  }

  // Informações adicionais
  additionalInfo?: string
  competence?: string
}

// ============================================================================
// GERADOR DE DANFE NFSE
// ============================================================================
export function generateDANFENFSe(data: DANFEData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 10
  const contentWidth = pageWidth - 2 * margin

  let y = margin

  // ============================================================================
  // CABEÇALHO
  // ============================================================================

  // Borda do cabeçalho
  doc.setDrawColor(0)
  doc.setLineWidth(0.5)
  doc.rect(margin, y, contentWidth, 35)

  // Logo ou nome da empresa
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(data.emitter.fantasyName || data.emitter.name, margin + 5, y + 8)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`CNPJ: ${formatCNPJ(data.emitter.cnpj)}`, margin + 5, y + 14)
  if (data.emitter.im) {
    doc.text(`Inscrição Municipal: ${data.emitter.im}`, margin + 5, y + 18)
  }
  doc.text(
    `${data.emitter.address.street}, ${data.emitter.address.number}${data.emitter.address.complement ? ` - ${data.emitter.address.complement}` : ''}`,
    margin + 5,
    y + 22
  )
  doc.text(
    `${data.emitter.address.neighborhood} - ${data.emitter.address.city}/${data.emitter.address.state} - CEP: ${formatCEP(data.emitter.address.zipcode)}`,
    margin + 5,
    y + 26
  )
  if (data.emitter.phone) {
    doc.text(`Tel: ${data.emitter.phone}`, margin + 5, y + 30)
  }

  // Título à direita
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('NOTA FISCAL DE SERVIÇOS', margin + contentWidth - 5, y + 10, { align: 'right' })
  doc.text('ELETRÔNICA - NFS-e', margin + contentWidth - 5, y + 16, { align: 'right' })

  doc.setFontSize(16)
  doc.text(`Nº ${data.invoiceNumber}`, margin + contentWidth - 5, y + 26, { align: 'right' })

  y += 40

  // ============================================================================
  // DADOS DA NOTA
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 20)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('DADOS DA NOTA FISCAL', margin + 2, y + 4)

  doc.setFont('helvetica', 'normal')

  // Linha 1
  const col1 = margin + 2
  const col2 = margin + 45
  const col3 = margin + 90
  const col4 = margin + 135

  doc.text(`Data de Emissão:`, col1, y + 10)
  doc.text(formatDate(data.issueDate), col1, y + 14)

  doc.text(`Competência:`, col2, y + 10)
  doc.text(data.competence || formatMonth(data.issueDate), col2, y + 14)

  if (data.rpsNumber) {
    doc.text(`Nº RPS:`, col3, y + 10)
    doc.text(`${data.rpsSeries || '1'}-${data.rpsNumber}`, col3, y + 14)
  }

  if (data.verificationCode) {
    doc.text(`Código Verificação:`, col4, y + 10)
    doc.setFont('helvetica', 'bold')
    doc.text(data.verificationCode, col4, y + 14)
    doc.setFont('helvetica', 'normal')
  }

  y += 25

  // ============================================================================
  // TOMADOR DO SERVIÇO
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 25)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('TOMADOR DO SERVIÇO', margin + 2, y + 4)

  doc.setFont('helvetica', 'normal')

  doc.text(`Nome/Razão Social: ${data.recipient.name}`, col1, y + 10)
  doc.text(`CPF/CNPJ: ${formatCpfCnpj(data.recipient.cpfCnpj)}`, col3, y + 10)

  if (data.recipient.address) {
    doc.text(
      `Endereço: ${data.recipient.address.street}, ${data.recipient.address.number} - ${data.recipient.address.neighborhood}`,
      col1, y + 16
    )
    doc.text(
      `${data.recipient.address.city}/${data.recipient.address.state} - CEP: ${formatCEP(data.recipient.address.zipcode)}`,
      col1, y + 20
    )
  }

  if (data.recipient.email) {
    doc.text(`Email: ${data.recipient.email}`, col3, y + 20)
  }

  y += 30

  // ============================================================================
  // DISCRIMINAÇÃO DOS SERVIÇOS
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 60)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('DISCRIMINAÇÃO DOS SERVIÇOS', margin + 2, y + 4)

  doc.setFont('helvetica', 'normal')

  let serviceY = y + 10
  for (const item of data.items) {
    const line = `${item.quantity}x ${item.description}`
    doc.text(line, col1, serviceY)

    const value = `R$ ${formatCurrency(item.totalPrice)}`
    doc.text(value, margin + contentWidth - 5, serviceY, { align: 'right' })

    serviceY += 5

    if (serviceY > y + 55) break // Limite de itens visíveis
  }

  y += 65

  // ============================================================================
  // VALORES
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth / 2, 40)
  doc.rect(margin + contentWidth / 2, y, contentWidth / 2, 40)

  // Coluna esquerda - Tributos
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('TRIBUTOS', margin + 2, y + 4)

  doc.setFont('helvetica', 'normal')
  let taxY = y + 10

  doc.text(`Base de Cálculo:`, margin + 2, taxY)
  doc.text(`R$ ${formatCurrency(data.values.baseValue)}`, margin + 45, taxY)
  taxY += 5

  doc.text(`Alíquota ISS:`, margin + 2, taxY)
  doc.text(`${data.values.issRate.toFixed(2)}%`, margin + 45, taxY)
  taxY += 5

  doc.text(`Valor ISS:`, margin + 2, taxY)
  doc.text(`R$ ${formatCurrency(data.values.issValue)}`, margin + 45, taxY)
  taxY += 5

  if (data.values.pisValue) {
    doc.text(`PIS:`, margin + 2, taxY)
    doc.text(`R$ ${formatCurrency(data.values.pisValue)}`, margin + 45, taxY)
    taxY += 5
  }

  if (data.values.cofinsValue) {
    doc.text(`COFINS:`, margin + 2, taxY)
    doc.text(`R$ ${formatCurrency(data.values.cofinsValue)}`, margin + 45, taxY)
  }

  // Coluna direita - Totais
  const rightCol = margin + contentWidth / 2 + 2

  doc.setFont('helvetica', 'bold')
  doc.text('VALORES', rightCol, y + 4)

  doc.setFont('helvetica', 'normal')
  let valY = y + 10

  doc.text(`Valor dos Serviços:`, rightCol, valY)
  doc.text(`R$ ${formatCurrency(data.values.servicesValue)}`, rightCol + 50, valY)
  valY += 5

  if (data.values.deductions) {
    doc.text(`(-) Deduções:`, rightCol, valY)
    doc.text(`R$ ${formatCurrency(data.values.deductions)}`, rightCol + 50, valY)
    valY += 5
  }

  if (data.values.discount) {
    doc.text(`(-) Desconto:`, rightCol, valY)
    doc.text(`R$ ${formatCurrency(data.values.discount)}`, rightCol + 50, valY)
    valY += 5
  }

  valY += 5
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(`VALOR LÍQUIDO:`, rightCol, valY)
  doc.text(`R$ ${formatCurrency(data.values.netValue)}`, rightCol + 50, valY)

  y += 45

  // ============================================================================
  // INFORMAÇÕES ADICIONAIS
  // ============================================================================

  if (data.additionalInfo) {
    doc.setDrawColor(0)
    doc.rect(margin, y, contentWidth, 25)

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('INFORMAÇÕES ADICIONAIS', margin + 2, y + 4)

    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(data.additionalInfo, contentWidth - 4)
    doc.text(lines, margin + 2, y + 10)

    y += 30
  }

  // ============================================================================
  // RODAPÉ
  // ============================================================================

  doc.setFontSize(7)
  doc.setFont('helvetica', 'italic')
  doc.text(
    'Este documento é uma representação gráfica da NFS-e. Consulte sua autenticidade no site da prefeitura.',
    pageWidth / 2,
    pageHeight - 15,
    { align: 'center' }
  )

  if (data.verificationCode) {
    doc.text(
      `Código de Verificação: ${data.verificationCode}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    )
  }

  return doc
}

// ============================================================================
// GERADOR DE DANFE NFE
// ============================================================================
export function generateDANFENFe(data: DANFEData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = 210
  const margin = 10
  const contentWidth = pageWidth - 2 * margin

  let y = margin

  // ============================================================================
  // CABEÇALHO NFE
  // ============================================================================

  // Borda principal
  doc.setDrawColor(0)
  doc.setLineWidth(0.5)
  doc.rect(margin, y, contentWidth, 45)

  // Dados do emitente
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(data.emitter.fantasyName || data.emitter.name, margin + 5, y + 8)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`${data.emitter.address.street}, ${data.emitter.address.number}`, margin + 5, y + 14)
  doc.text(
    `${data.emitter.address.neighborhood} - ${data.emitter.address.city}/${data.emitter.address.state}`,
    margin + 5,
    y + 18
  )
  doc.text(`CEP: ${formatCEP(data.emitter.address.zipcode)}`, margin + 5, y + 22)
  if (data.emitter.phone) {
    doc.text(`Fone: ${data.emitter.phone}`, margin + 5, y + 26)
  }

  // Título NFE
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.rect(margin + 70, y + 2, 65, 15)
  doc.text('DANFE', margin + 102, y + 8, { align: 'center' })
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.text('Documento Auxiliar da', margin + 102, y + 12, { align: 'center' })
  doc.text('Nota Fiscal Eletrônica', margin + 102, y + 15, { align: 'center' })

  // Número e série
  doc.rect(margin + 140, y + 2, 45, 15)
  doc.setFontSize(8)
  doc.text('NF-e', margin + 162, y + 6, { align: 'center' })
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(`Nº ${data.invoiceNumber}`, margin + 162, y + 11, { align: 'center' })
  doc.setFontSize(8)
  doc.text(`Série ${data.series}`, margin + 162, y + 15, { align: 'center' })

  // Chave de acesso
  if (data.accessKey) {
    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    doc.text('CHAVE DE ACESSO', margin + 70, y + 22)
    doc.setFont('helvetica', 'normal')
    doc.text(formatAccessKey(data.accessKey), margin + 70, y + 26)
  }

  // Protocolo
  if (data.authorizationProtocol) {
    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    doc.text('PROTOCOLO DE AUTORIZAÇÃO', margin + 70, y + 32)
    doc.setFont('helvetica', 'normal')
    doc.text(
      `${data.authorizationProtocol} - ${formatDateTime(data.authorizationDate || data.issueDate)}`,
      margin + 70,
      y + 36
    )
  }

  // CNPJ e IE do emitente
  doc.setFontSize(7)
  doc.text(`CNPJ: ${formatCNPJ(data.emitter.cnpj)}`, margin + 5, y + 32)
  doc.text(`IE: ${data.emitter.ie || 'ISENTO'}`, margin + 5, y + 36)

  y += 50

  // ============================================================================
  // DESTINATÁRIO
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 25)

  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('DESTINATÁRIO/REMETENTE', margin + 2, y + 4)

  doc.setFont('helvetica', 'normal')
  doc.text(`Nome/Razão Social: ${data.recipient.name}`, margin + 2, y + 9)
  doc.text(`CPF/CNPJ: ${formatCpfCnpj(data.recipient.cpfCnpj)}`, margin + 120, y + 9)

  if (data.recipient.address) {
    doc.text(
      `Endereço: ${data.recipient.address.street}, ${data.recipient.address.number}`,
      margin + 2,
      y + 14
    )
    doc.text(`Bairro: ${data.recipient.address.neighborhood}`, margin + 2, y + 19)
    doc.text(`Município: ${data.recipient.address.city}`, margin + 70, y + 19)
    doc.text(`UF: ${data.recipient.address.state}`, margin + 130, y + 19)
    doc.text(`CEP: ${formatCEP(data.recipient.address.zipcode)}`, margin + 150, y + 19)
  }

  y += 30

  // ============================================================================
  // PRODUTOS/SERVIÇOS
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 80)

  // Cabeçalho da tabela
  doc.setFontSize(6)
  doc.setFont('helvetica', 'bold')
  doc.text('DADOS DOS PRODUTOS/SERVIÇOS', margin + 2, y + 4)

  const tableY = y + 8
  doc.line(margin, tableY, margin + contentWidth, tableY)

  doc.text('CÓD.', margin + 2, tableY + 4)
  doc.text('DESCRIÇÃO', margin + 20, tableY + 4)
  doc.text('QTD', margin + 120, tableY + 4)
  doc.text('V. UNIT', margin + 140, tableY + 4)
  doc.text('V. TOTAL', margin + 165, tableY + 4)

  doc.line(margin, tableY + 6, margin + contentWidth, tableY + 6)

  // Itens
  doc.setFont('helvetica', 'normal')
  let itemY = tableY + 11
  for (const item of data.items) {
    if (itemY > y + 75) break

    doc.text(item.code?.slice(0, 10) || '-', margin + 2, itemY)
    doc.text(item.description.slice(0, 50), margin + 20, itemY)
    doc.text(item.quantity.toString(), margin + 120, itemY)
    doc.text(formatCurrency(item.unitPrice), margin + 140, itemY)
    doc.text(formatCurrency(item.totalPrice), margin + 165, itemY)

    itemY += 5
  }

  y += 85

  // ============================================================================
  // TOTAIS
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 20)

  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('CÁLCULO DO IMPOSTO', margin + 2, y + 4)

  doc.setFont('helvetica', 'normal')

  doc.text(`Base Cálc. ISS: R$ ${formatCurrency(data.values.baseValue)}`, margin + 2, y + 10)
  doc.text(`Valor ISS: R$ ${formatCurrency(data.values.issValue)}`, margin + 50, y + 10)
  doc.text(`Valor Serviços: R$ ${formatCurrency(data.values.servicesValue)}`, margin + 95, y + 10)

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text(`VALOR TOTAL: R$ ${formatCurrency(data.values.netValue)}`, margin + 140, y + 10)

  y += 25

  // ============================================================================
  // INFORMAÇÕES ADICIONAIS
  // ============================================================================

  if (data.additionalInfo) {
    doc.setDrawColor(0)
    doc.rect(margin, y, contentWidth, 20)

    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    doc.text('INFORMAÇÕES COMPLEMENTARES', margin + 2, y + 4)

    doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(data.additionalInfo, contentWidth - 4)
    doc.text(lines, margin + 2, y + 9)
  }

  return doc
}

// ============================================================================
// FUNÇÃO PRINCIPAL
// ============================================================================
export function generateDANFE(data: DANFEData): jsPDF {
  if (data.invoiceType === 'nfse') {
    return generateDANFENFSe(data)
  }
  return generateDANFENFe(data)
}

// ============================================================================
// UTILITÁRIOS DE FORMATAÇÃO
// ============================================================================

function formatCNPJ(cnpj: string): string {
  const clean = cnpj.replace(/[^\d]/g, '')
  return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

function formatCpfCnpj(doc: string): string {
  const clean = doc.replace(/[^\d]/g, '')
  if (clean.length === 11) {
    return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return formatCNPJ(clean)
}

function formatCEP(cep: string): string {
  const clean = cep.replace(/[^\d]/g, '')
  return clean.replace(/(\d{5})(\d{3})/, '$1-$2')
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('pt-BR')
}

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleString('pt-BR')
}

function formatMonth(dateStr: string): string {
  const date = new Date(dateStr)
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatAccessKey(key: string): string {
  // Formata chave de acesso em grupos de 4 dígitos
  return key.replace(/(\d{4})/g, '$1 ').trim()
}

// ============================================================================
// EXPORTAR PARA BASE64
// ============================================================================
export function generateDANFEBase64(data: DANFEData): string {
  const doc = generateDANFE(data)
  return doc.output('datauristring')
}

// ============================================================================
// EXPORTAR PARA BLOB
// ============================================================================
export function generateDANFEBlob(data: DANFEData): Blob {
  const doc = generateDANFE(data)
  return doc.output('blob')
}
