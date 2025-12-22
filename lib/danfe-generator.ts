/**
 * Gerador de DANFE (Documento Auxiliar da Nota Fiscal Eletrônica)
 * Padrão OURO Nacional - Conforme Manual de Orientação SEFAZ
 *
 * Suporta:
 * - NFSe (Nota Fiscal de Serviços Eletrônica) - Padrão ABRASF
 * - NFe (Nota Fiscal Eletrônica) - Modelo 55
 *
 * @version 2.0.0
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
    crt?: string
    regimeTributario?: string
    optanteSimplesNacional?: boolean
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
    ncm?: string
    cfop?: string
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
    totalTributos?: number
  }

  // Informações adicionais
  additionalInfo?: string
  competence?: string

  // Ambiente
  ambiente?: 'production' | 'sandbox'

  // Natureza da operação
  naturezaOperacao?: string
}

// ============================================================================
// GERADOR DE DANFE NFSE - PADRÃO ABRASF
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

  // Marca d'água para homologação
  if (data.ambiente === 'sandbox') {
    doc.setTextColor(220, 220, 220)
    doc.setFontSize(60)
    doc.setFont('helvetica', 'bold')
    doc.text('HOMOLOGAÇÃO', pageWidth / 2, pageHeight / 2, {
      align: 'center',
      angle: 45
    })
    doc.setTextColor(0, 0, 0)
  }

  // ============================================================================
  // CABEÇALHO PRINCIPAL
  // ============================================================================

  // Borda externa do cabeçalho
  doc.setDrawColor(0)
  doc.setLineWidth(0.5)
  doc.rect(margin, y, contentWidth, 40)

  // Área do prestador (esquerda)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(data.emitter.fantasyName || data.emitter.name, margin + 5, y + 8)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`CNPJ: ${formatCNPJ(data.emitter.cnpj)}`, margin + 5, y + 14)
  if (data.emitter.im) {
    doc.text(`Inscrição Municipal: ${data.emitter.im}`, margin + 5, y + 18)
  }
  if (data.emitter.cnae) {
    doc.text(`CNAE: ${data.emitter.cnae}`, margin + 75, y + 18)
  }
  doc.text(
    `${data.emitter.address.street}, ${data.emitter.address.number}${data.emitter.address.complement ? ` - ${data.emitter.address.complement}` : ''}`,
    margin + 5,
    y + 23
  )
  doc.text(
    `${data.emitter.address.neighborhood} - ${data.emitter.address.city}/${data.emitter.address.state}`,
    margin + 5,
    y + 27
  )
  doc.text(`CEP: ${formatCEP(data.emitter.address.zipcode)}`, margin + 5, y + 31)
  if (data.emitter.phone) {
    doc.text(`Tel: ${data.emitter.phone}`, margin + 55, y + 31)
  }
  if (data.emitter.email) {
    doc.text(`Email: ${data.emitter.email}`, margin + 5, y + 35)
  }

  // Área do título (direita)
  doc.setDrawColor(0)
  doc.setLineWidth(0.3)
  doc.line(margin + 115, y, margin + 115, y + 40)

  doc.setFillColor(240, 240, 240)
  doc.rect(margin + 115, y, 75, 16, 'F')

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('NOTA FISCAL DE SERVIÇOS', margin + 152.5, y + 6, { align: 'center' })
  doc.text('ELETRÔNICA - NFS-e', margin + 152.5, y + 12, { align: 'center' })

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Número da Nota:', margin + 120, y + 22)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text(data.invoiceNumber, margin + 152.5, y + 28, { align: 'center' })

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(`Série: ${data.series || '1'}`, margin + 120, y + 35)
  doc.text(`Data: ${formatDate(data.issueDate)}`, margin + 150, y + 35)

  y += 45

  // ============================================================================
  // DADOS DA NOTA FISCAL
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth, 22)

  doc.setFillColor(240, 240, 240)
  doc.rect(margin, y, contentWidth, 5, 'F')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('DADOS DA NOTA FISCAL', margin + 2, y + 3.5)

  doc.setFont('helvetica', 'normal')

  // Linha 1
  const col1 = margin + 2
  const col2 = margin + 40
  const col3 = margin + 80
  const col4 = margin + 120
  const col5 = margin + 155

  doc.setFontSize(7)
  doc.text('Data de Emissão:', col1, y + 9)
  doc.setFont('helvetica', 'bold')
  doc.text(formatDate(data.issueDate), col1, y + 13)

  doc.setFont('helvetica', 'normal')
  doc.text('Competência:', col2, y + 9)
  doc.setFont('helvetica', 'bold')
  doc.text(data.competence || formatMonth(data.issueDate), col2, y + 13)

  if (data.rpsNumber) {
    doc.setFont('helvetica', 'normal')
    doc.text('Nº RPS:', col3, y + 9)
    doc.setFont('helvetica', 'bold')
    doc.text(`${data.rpsSeries || '1'}-${data.rpsNumber}`, col3, y + 13)
  }

  doc.setFont('helvetica', 'normal')
  doc.text('Natureza Operação:', col4, y + 9)
  doc.setFont('helvetica', 'bold')
  doc.text(data.naturezaOperacao || 'Tributação no município', col4, y + 13)

  if (data.verificationCode) {
    doc.setFont('helvetica', 'normal')
    doc.text('Código Verificação:', col1, y + 17)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text(data.verificationCode, col2, y + 17)
  }

  if (data.authorizationProtocol) {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text('Protocolo:', col4, y + 17)
    doc.setFont('helvetica', 'bold')
    doc.text(data.authorizationProtocol, col5, y + 17)
  }

  y += 27

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
  // VALORES E TRIBUTOS
  // ============================================================================

  doc.setDrawColor(0)
  doc.rect(margin, y, contentWidth / 2, 48)
  doc.rect(margin + contentWidth / 2, y, contentWidth / 2, 48)

  // Coluna esquerda - Tributos
  doc.setFillColor(240, 240, 240)
  doc.rect(margin, y, contentWidth / 2, 5, 'F')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('TRIBUTOS', margin + 2, y + 3.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  let taxY = y + 10

  doc.text('Base de Cálculo:', margin + 2, taxY)
  doc.text(`R$ ${formatCurrency(data.values.baseValue)}`, margin + 45, taxY)
  taxY += 5

  doc.text('Alíquota ISS:', margin + 2, taxY)
  doc.text(`${(Number(data.values.issRate) || 0).toFixed(2)}%`, margin + 45, taxY)
  taxY += 5

  doc.text('Valor ISS:', margin + 2, taxY)
  doc.setFont('helvetica', 'bold')
  doc.text(`R$ ${formatCurrency(data.values.issValue)}`, margin + 45, taxY)
  doc.setFont('helvetica', 'normal')
  taxY += 5

  if (data.values.pisValue) {
    doc.text('PIS (0,65%):', margin + 2, taxY)
    doc.text(`R$ ${formatCurrency(data.values.pisValue)}`, margin + 45, taxY)
    taxY += 5
  }

  if (data.values.cofinsValue) {
    doc.text('COFINS (3%):', margin + 2, taxY)
    doc.text(`R$ ${formatCurrency(data.values.cofinsValue)}`, margin + 45, taxY)
    taxY += 5
  }

  if (data.values.irValue) {
    doc.text('IR Retido:', margin + 2, taxY)
    doc.text(`R$ ${formatCurrency(data.values.irValue)}`, margin + 45, taxY)
    taxY += 5
  }

  if (data.values.inssValue) {
    doc.text('INSS Retido:', margin + 2, taxY)
    doc.text(`R$ ${formatCurrency(data.values.inssValue)}`, margin + 45, taxY)
    taxY += 5
  }

  // Total de tributos
  const totalTributos = (data.values.issValue || 0) + (data.values.pisValue || 0) +
    (data.values.cofinsValue || 0) + (data.values.irValue || 0) + (data.values.inssValue || 0)
  if (totalTributos > 0) {
    doc.setFont('helvetica', 'bold')
    doc.text('Total Tributos:', margin + 2, y + 43)
    doc.text(`R$ ${formatCurrency(totalTributos)}`, margin + 45, y + 43)
  }

  // Coluna direita - Totais
  const rightCol = margin + contentWidth / 2 + 2

  doc.setFillColor(240, 240, 240)
  doc.rect(margin + contentWidth / 2, y, contentWidth / 2, 5, 'F')

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.text('VALORES DA NOTA', rightCol, y + 3.5)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  let valY = y + 10

  doc.text('Valor dos Serviços:', rightCol, valY)
  doc.text(`R$ ${formatCurrency(data.values.servicesValue)}`, rightCol + 55, valY)
  valY += 5

  if (data.values.deductions) {
    doc.text('(-) Deduções:', rightCol, valY)
    doc.text(`R$ ${formatCurrency(data.values.deductions)}`, rightCol + 55, valY)
    valY += 5
  }

  if (data.values.discount) {
    doc.text('(-) Desconto Incond.:', rightCol, valY)
    doc.text(`R$ ${formatCurrency(data.values.discount)}`, rightCol + 55, valY)
    valY += 5
  }

  doc.text('Base de Cálculo:', rightCol, valY)
  doc.text(`R$ ${formatCurrency(data.values.baseValue)}`, rightCol + 55, valY)
  valY += 5

  doc.text('(-) ISS Retido:', rightCol, valY)
  doc.text(`R$ ${formatCurrency(0)}`, rightCol + 55, valY)
  valY += 8

  // Valor líquido destacado
  doc.setFillColor(220, 255, 220)
  doc.rect(margin + contentWidth / 2, y + 36, contentWidth / 2, 12, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('VALOR LÍQUIDO DA NOTA:', rightCol, y + 42)
  doc.setFontSize(12)
  doc.text(`R$ ${formatCurrency(data.values.netValue)}`, rightCol + 55, y + 44)

  y += 53

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
  // RODAPÉ - INFORMAÇÕES LEGAIS
  // ============================================================================

  // Linha separadora
  doc.setDrawColor(0)
  doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25)

  doc.setFontSize(6)
  doc.setFont('helvetica', 'normal')

  // Informações de verificação
  if (data.verificationCode) {
    doc.text(
      `Código de Verificação: ${data.verificationCode}`,
      margin,
      pageHeight - 21
    )
  }

  if (data.authorizationProtocol) {
    doc.text(
      `Protocolo de Autorização: ${data.authorizationProtocol}`,
      margin + 80,
      pageHeight - 21
    )
  }

  // Aviso de autenticidade
  doc.setFontSize(6)
  doc.setFont('helvetica', 'italic')
  doc.text(
    'Este documento é uma representação gráfica da NFS-e. Consulte sua autenticidade no portal da prefeitura do município emissor.',
    pageWidth / 2,
    pageHeight - 16,
    { align: 'center' }
  )

  // Informação do Simples Nacional
  if (data.emitter.optanteSimplesNacional) {
    doc.setFont('helvetica', 'bold')
    doc.text(
      'DOCUMENTO EMITIDO POR ME OU EPP OPTANTE PELO SIMPLES NACIONAL. NÃO GERA DIREITO A CRÉDITO FISCAL DE ISS E IPI.',
      pageWidth / 2,
      pageHeight - 11,
      { align: 'center' }
    )
  }

  // Informação de tributos aproximados (Lei 12.741/2012)
  const totalTributosApprox = (data.values.issValue || 0) + (data.values.pisValue || 0) + (data.values.cofinsValue || 0)
  if (totalTributosApprox > 0) {
    doc.setFont('helvetica', 'normal')
    doc.text(
      `Valor aproximado dos tributos: R$ ${formatCurrency(totalTributosApprox)} (${((totalTributosApprox / data.values.servicesValue) * 100).toFixed(2)}%) - Fonte: IBPT (Lei 12.741/2012)`,
      pageWidth / 2,
      pageHeight - 6,
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
  const numValue = Number(value) || 0
  return numValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
