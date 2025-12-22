"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Printer, FileText, CheckCircle2, Calendar, User, Building2, Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"

interface ContractPDFViewerProps {
  contract: {
    id: string
    title: string
    contract_number: string
    content: string
    patient_name: string
    patient_cpf?: string
    contract_type: string
    created_at: string
    valid_until?: string
    professional_signed_at?: string
    patient_signed_at?: string
    professional_signature_url?: string
    patient_signature_url?: string
  }
}

const contractTypeLabels: Record<string, string> = {
  informed_consent: "Consentimento Informado",
  treatment_plan: "Plano de Tratamento",
  telemedicine_consent: "Telemedicina",
  service_agreement: "Contrato de Serviço",
  privacy_policy: "Política de Privacidade",
  payment_plan: "Plano de Pagamento",
  other: "Outro",
}

// Função para detectar se o conteúdo já é HTML
function isHTMLContent(content: string): boolean {
  // Verifica se contém tags HTML comuns
  return /<(h[1-6]|p|div|ul|ol|li|strong|em|br|span|table)[^>]*>/i.test(content)
}

// Função para remover tags HTML e extrair texto
function stripHtmlTags(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

// Função para processar Markdown básico ou HTML para texto
function parseMarkdownForPDF(content: string): { type: 'heading' | 'subheading' | 'paragraph' | 'list-item' | 'empty', text: string }[] {
  const result: { type: 'heading' | 'subheading' | 'paragraph' | 'list-item' | 'empty', text: string }[] = []

  // Se o conteúdo for HTML, processa de forma diferente
  if (isHTMLContent(content)) {
    // Extrair elementos HTML
    const h2Matches = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || []
    const h3Matches = content.match(/<h3[^>]*>(.*?)<\/h3>/gi) || []
    const pMatches = content.match(/<p[^>]*>(.*?)<\/p>/gi) || []
    const liMatches = content.match(/<li[^>]*>(.*?)<\/li>/gi) || []

    // Criar um array com todos os elementos e suas posições
    interface Element {
      type: 'heading' | 'subheading' | 'paragraph' | 'list-item'
      text: string
      index: number
    }

    const elements: Element[] = []

    h2Matches.forEach(match => {
      const text = stripHtmlTags(match)
      if (text) {
        elements.push({ type: 'heading', text, index: content.indexOf(match) })
      }
    })

    h3Matches.forEach(match => {
      const text = stripHtmlTags(match)
      if (text) {
        elements.push({ type: 'subheading', text, index: content.indexOf(match) })
      }
    })

    pMatches.forEach(match => {
      const text = stripHtmlTags(match)
      if (text) {
        elements.push({ type: 'paragraph', text, index: content.indexOf(match) })
      }
    })

    liMatches.forEach(match => {
      const text = stripHtmlTags(match)
      if (text) {
        elements.push({ type: 'list-item', text, index: content.indexOf(match) })
      }
    })

    // Ordenar por posição no documento
    elements.sort((a, b) => a.index - b.index)

    // Adicionar ao resultado
    elements.forEach(el => {
      result.push({ type: el.type, text: el.text })
    })

    return result
  }

  // Se for Markdown, processa normalmente
  const lines = content.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === '') {
      result.push({ type: 'empty', text: '' })
    } else if (trimmed.startsWith('### ')) {
      result.push({ type: 'subheading', text: trimmed.replace(/^###\s+/, '') })
    } else if (trimmed.startsWith('## ')) {
      result.push({ type: 'heading', text: trimmed.replace(/^##\s+/, '') })
    } else if (trimmed.startsWith('# ')) {
      result.push({ type: 'heading', text: trimmed.replace(/^#\s+/, '') })
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      result.push({ type: 'list-item', text: trimmed.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '') })
    } else if (/^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ\d\.\)]+(\s|$)/.test(trimmed) && trimmed.length < 80) {
      // Título em maiúsculas ou numerado
      result.push({ type: 'heading', text: trimmed })
    } else {
      // Remove formatação inline de markdown (**bold**, *italic*)
      const cleanText = trimmed
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/__([^_]+)__/g, '$1')
        .replace(/_([^_]+)_/g, '$1')
      result.push({ type: 'paragraph', text: cleanText })
    }
  }

  return result
}

// Função para estilizar HTML existente
function styleExistingHTML(content: string): string {
  return content
    // Adiciona classes ao HTML existente
    .replace(/<h1([^>]*)>/gi, '<h1$1 class="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b">')
    .replace(/<h2([^>]*)>/gi, '<h2$1 class="text-xl font-bold text-gray-900 mt-6 mb-3">')
    .replace(/<h3([^>]*)>/gi, '<h3$1 class="text-lg font-bold text-gray-900 mt-5 mb-2">')
    .replace(/<h4([^>]*)>/gi, '<h4$1 class="text-base font-semibold text-gray-800 mt-4 mb-2">')
    .replace(/<p([^>]*)>/gi, '<p$1 class="text-gray-700 leading-relaxed mb-3 text-justify">')
    .replace(/<ul([^>]*)>/gi, '<ul$1 class="list-disc ml-6 mb-4 text-gray-700">')
    .replace(/<ol([^>]*)>/gi, '<ol$1 class="list-decimal ml-6 mb-4 text-gray-700">')
    .replace(/<li([^>]*)>/gi, '<li$1 class="mb-1">')
    .replace(/<strong([^>]*)>/gi, '<strong$1 class="font-semibold">')
}

// Função para renderizar Markdown para HTML
function renderMarkdownToHTML(content: string): string {
  // Se o conteúdo já for HTML, apenas aplica estilos
  if (isHTMLContent(content)) {
    return styleExistingHTML(content)
  }

  // Se for Markdown, converte para HTML
  let html = content
    // Escape HTML first (apenas para Markdown)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h4 class="text-base font-semibold text-gray-800 mt-4 mb-2">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 class="text-lg font-bold text-gray-900 mt-6 mb-3">$1</h3>')
    .replace(/^# (.+)$/gm, '<h2 class="text-xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b">$1</h2>')
    // Bold and italic
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/__([^_]+)__/g, '<strong class="font-semibold">$1</strong>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    // Lists
    .replace(/^[-*]\s+(.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
    .replace(/^\d+\.\s+(.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
    // Line breaks - convert double newlines to paragraph breaks
    .replace(/\n\n/g, '</p><p class="text-gray-700 leading-relaxed mb-3 text-justify">')
    // Single line breaks
    .replace(/\n/g, '<br/>')

  // Wrap in paragraph if not already wrapped
  if (!html.startsWith('<')) {
    html = `<p class="text-gray-700 leading-relaxed mb-3 text-justify">${html}</p>`
  }

  return html
}

// Função para substituir variáveis do template
function replaceTemplateVariables(content: string, contract: ContractPDFViewerProps['contract']): string {
  const today = new Date().toLocaleDateString("pt-BR")
  const patientCpf = contract.patient_cpf || "Não informado"

  return content
    // Variáveis de paciente
    .replace(/\{\{patient_name\}\}/gi, contract.patient_name || "")
    .replace(/\{\{patientname\}\}/gi, contract.patient_name || "")
    .replace(/\{\{patient_cpf\}\}/gi, patientCpf)
    .replace(/\{\{patientcpf\}\}/gi, patientCpf)
    // Data e local
    .replace(/\{\{date\}\}/gi, today)
    .replace(/\{\{clinic_name\}\}/gi, "AtendeBem")
    .replace(/\{\{clinicname\}\}/gi, "AtendeBem")
    // Variáveis de procedimento - substituir por texto padrão se não preenchidas
    .replace(/\{\{procedure_name\}\}/gi, "Procedimento definido pelo profissional")
    .replace(/\{\{procedurename\}\}/gi, "Procedimento definido pelo profissional")
    .replace(/\{\{procedure_description\}\}/gi, "Descrição do procedimento será detalhada pelo profissional.")
    .replace(/\{\{proceduredescription\}\}/gi, "Descrição do procedimento será detalhada pelo profissional.")
    .replace(/\{\{risks_benefits\}\}/gi, "Os riscos e benefícios serão explicados pelo profissional responsável.")
    .replace(/\{\{risksbenefits\}\}/gi, "Os riscos e benefícios serão explicados pelo profissional responsável.")
}

export function ContractPDFViewer({ contract }: ContractPDFViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  async function handleDownloadPDF() {
    setIsGenerating(true)

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20
      const contentWidth = pageWidth - margin * 2
      let yPosition = 20
      let pageNumber = 1

      // Função para adicionar cabeçalho em cada página
      function addHeader() {
        // Background do cabeçalho
        doc.setFillColor(59, 130, 246) // Blue-500
        doc.rect(0, 0, pageWidth, 35, 'F')

        // Nome da clínica
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(20)
        doc.setFont("helvetica", "bold")
        doc.text("AtendeBem", margin, 15)

        // Subtítulo
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.text("Sistema de Gestão em Saúde", margin, 22)

        // Tipo do documento
        doc.setFontSize(9)
        doc.text(contractTypeLabels[contract.contract_type] || contract.contract_type, margin, 29)

        // Número do contrato (direita)
        doc.setFontSize(10)
        doc.text(contract.contract_number, pageWidth - margin, 22, { align: "right" })

        yPosition = 45
      }

      // Função para adicionar rodapé
      function addFooter() {
        const footerY = pageHeight - 15

        // Linha separadora
        doc.setDrawColor(200, 200, 200)
        doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5)

        // Texto do rodapé
        doc.setTextColor(120, 120, 120)
        doc.setFontSize(8)
        doc.text("Documento gerado eletronicamente pelo sistema AtendeBem", margin, footerY)
        doc.text("Válido conforme Lei 14.063/2020", margin, footerY + 4)

        // Número da página
        doc.text(`Página ${pageNumber}`, pageWidth - margin, footerY, { align: "right" })
      }

      // Função para verificar e adicionar nova página se necessário
      function checkNewPage(neededSpace: number = 20) {
        if (yPosition > pageHeight - 30 - neededSpace) {
          addFooter()
          doc.addPage()
          pageNumber++
          addHeader()
        }
      }

      // Primeira página
      addHeader()

      // Título do documento
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(18)
      doc.setFont("helvetica", "bold")

      const titleLines = doc.splitTextToSize(contract.title, contentWidth)
      for (const line of titleLines) {
        doc.text(line, pageWidth / 2, yPosition, { align: "center" })
        yPosition += 8
      }
      yPosition += 5

      // Caixa de informações
      doc.setFillColor(248, 250, 252) // Gray-50
      doc.setDrawColor(226, 232, 240) // Gray-200
      const infoBoxHeight = 28
      doc.roundedRect(margin, yPosition, contentWidth, infoBoxHeight, 3, 3, 'FD')

      yPosition += 8
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(100, 116, 139) // Gray-500

      // Coluna 1
      doc.text("PACIENTE", margin + 5, yPosition)
      doc.text("DATA DE CRIAÇÃO", margin + contentWidth/2, yPosition)

      yPosition += 5
      doc.setFont("helvetica", "normal")
      doc.setTextColor(30, 41, 59) // Gray-800
      doc.setFontSize(10)
      doc.text(contract.patient_name, margin + 5, yPosition)
      doc.text(new Date(contract.created_at).toLocaleDateString("pt-BR"), margin + contentWidth/2, yPosition)

      yPosition += 5
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(100, 116, 139)
      doc.text("TIPO", margin + 5, yPosition)
      if (contract.valid_until) {
        doc.text("VALIDADE", margin + contentWidth/2, yPosition)
      }

      yPosition += 5
      doc.setFont("helvetica", "normal")
      doc.setTextColor(30, 41, 59)
      doc.setFontSize(10)
      doc.text(contractTypeLabels[contract.contract_type] || contract.contract_type, margin + 5, yPosition)
      if (contract.valid_until) {
        doc.text(new Date(contract.valid_until).toLocaleDateString("pt-BR"), margin + contentWidth/2, yPosition)
      }

      yPosition += 15

      // Linha separadora
      doc.setDrawColor(200, 200, 200)
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 10

      // Conteúdo do contrato (com variáveis substituídas)
      const contentForPDF = replaceTemplateVariables(contract.content, contract)
      const parsedContent = parseMarkdownForPDF(contentForPDF)

      for (const item of parsedContent) {
        checkNewPage(item.type === 'heading' ? 15 : 10)

        switch (item.type) {
          case 'heading':
            yPosition += 4
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(30, 41, 59)
            const headingLines = doc.splitTextToSize(item.text, contentWidth)
            for (const line of headingLines) {
              checkNewPage()
              doc.text(line, margin, yPosition)
              yPosition += 6
            }
            yPosition += 2
            break

          case 'subheading':
            yPosition += 2
            doc.setFontSize(11)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(51, 65, 85)
            const subheadingLines = doc.splitTextToSize(item.text, contentWidth)
            for (const line of subheadingLines) {
              checkNewPage()
              doc.text(line, margin, yPosition)
              yPosition += 5
            }
            yPosition += 1
            break

          case 'list-item':
            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            doc.setTextColor(55, 65, 81)
            const listLines = doc.splitTextToSize(`• ${item.text}`, contentWidth - 10)
            for (const line of listLines) {
              checkNewPage()
              doc.text(line, margin + 5, yPosition)
              yPosition += 5
            }
            break

          case 'paragraph':
            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            doc.setTextColor(55, 65, 81)
            const lines = doc.splitTextToSize(item.text, contentWidth)
            for (const line of lines) {
              checkNewPage()
              doc.text(line, margin, yPosition)
              yPosition += 5
            }
            yPosition += 2
            break

          case 'empty':
            yPosition += 4
            break
        }
      }

      // Seção de assinaturas
      checkNewPage(60)
      yPosition += 15

      // Título da seção de assinaturas
      doc.setFillColor(248, 250, 252)
      doc.roundedRect(margin, yPosition, contentWidth, 8, 2, 2, 'F')
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(51, 65, 85)
      doc.text("ASSINATURAS", pageWidth / 2, yPosition + 5.5, { align: "center" })
      yPosition += 18

      const signatureBoxWidth = (contentWidth - 10) / 2
      const signatureBoxHeight = 35

      // Box do profissional
      doc.setDrawColor(200, 200, 200)
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(margin, yPosition, signatureBoxWidth, signatureBoxHeight, 2, 2, 'FD')

      // Box do paciente
      doc.roundedRect(margin + signatureBoxWidth + 10, yPosition, signatureBoxWidth, signatureBoxHeight, 2, 2, 'FD')

      // Linhas de assinatura
      const signLineY = yPosition + signatureBoxHeight - 12
      doc.setDrawColor(180, 180, 180)
      doc.line(margin + 5, signLineY, margin + signatureBoxWidth - 5, signLineY)
      doc.line(margin + signatureBoxWidth + 15, signLineY, margin + signatureBoxWidth * 2 + 5, signLineY)

      // Labels
      doc.setFontSize(9)
      doc.setFont("helvetica", "bold")
      doc.setTextColor(100, 116, 139)
      doc.text("Profissional Responsável", margin + signatureBoxWidth / 2, yPosition + signatureBoxHeight - 5, { align: "center" })
      doc.text(contract.patient_name, margin + signatureBoxWidth + 10 + signatureBoxWidth / 2, yPosition + signatureBoxHeight - 5, { align: "center" })

      // Status das assinaturas
      doc.setFontSize(8)
      doc.setFont("helvetica", "normal")

      if (contract.professional_signed_at) {
        doc.setTextColor(22, 163, 74) // Green
        doc.text(`Assinado em ${new Date(contract.professional_signed_at).toLocaleString("pt-BR")}`, margin + signatureBoxWidth / 2, yPosition + signatureBoxHeight, { align: "center" })
      } else {
        doc.setTextColor(234, 179, 8) // Yellow
        doc.text("Pendente de assinatura", margin + signatureBoxWidth / 2, yPosition + signatureBoxHeight, { align: "center" })
      }

      if (contract.patient_signed_at) {
        doc.setTextColor(22, 163, 74)
        doc.text(`Assinado em ${new Date(contract.patient_signed_at).toLocaleString("pt-BR")}`, margin + signatureBoxWidth + 10 + signatureBoxWidth / 2, yPosition + signatureBoxHeight, { align: "center" })
      } else {
        doc.setTextColor(234, 179, 8)
        doc.text("Pendente de assinatura", margin + signatureBoxWidth + 10 + signatureBoxWidth / 2, yPosition + signatureBoxHeight, { align: "center" })
      }

      // Adicionar rodapé na última página
      addFooter()

      doc.save(`${contract.contract_number}.pdf`)
    } finally {
      setIsGenerating(false)
    }
  }

  function handlePrint() {
    window.print()
  }

  // Primeiro substitui variáveis, depois renderiza o HTML/Markdown
  const contentWithVariables = replaceTemplateVariables(contract.content, contract)
  const processedContent = renderMarkdownToHTML(contentWithVariables)

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Visualização do documento</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="rounded-xl">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadPDF}
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isGenerating ? "Gerando..." : "Baixar PDF"}
          </Button>
        </div>
      </div>

      {/* PDF-style view */}
      <div
        ref={contentRef}
        className="bg-white border rounded-2xl shadow-xl mx-auto overflow-hidden print:shadow-none print:border-0"
        style={{ maxWidth: "210mm" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 md:p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AtendeBem</h2>
                  <p className="text-blue-100 text-sm">Sistema de Gestão em Saúde</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-lg text-sm font-medium mb-1">
                {contractTypeLabels[contract.contract_type] || contract.contract_type}
              </span>
              <p className="text-blue-100 text-sm mt-1">{contract.contract_number}</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{contract.title}</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <User className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Paciente</span>
              </div>
              <p className="font-semibold text-gray-900 truncate">{contract.patient_name}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Data</span>
              </div>
              <p className="font-semibold text-gray-900">{new Date(contract.created_at).toLocaleDateString("pt-BR")}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Tipo</span>
              </div>
              <p className="font-semibold text-gray-900 truncate">{contractTypeLabels[contract.contract_type] || contract.contract_type}</p>
            </div>

            {contract.valid_until ? (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Validade</span>
                </div>
                <p className="font-semibold text-gray-900">{new Date(contract.valid_until).toLocaleDateString("pt-BR")}</p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">Status</span>
                </div>
                <p className="font-semibold text-gray-900">
                  {contract.professional_signed_at && contract.patient_signed_at ? "Assinado" : "Pendente"}
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Content */}
          <div
            className="prose prose-gray max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Signatures Section */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 inline-flex items-center gap-2">
                <span className="w-8 h-[2px] bg-gray-300" />
                Assinaturas
                <span className="w-8 h-[2px] bg-gray-300" />
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Professional Signature */}
              <div className="text-center">
                <div className="h-28 border-2 border-dashed border-gray-200 rounded-xl mb-3 flex items-end justify-center pb-4 bg-gray-50/50">
                  {contract.professional_signature_url ? (
                    <img
                      src={contract.professional_signature_url}
                      alt="Assinatura do Profissional"
                      className="max-h-20 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Aguardando assinatura</span>
                  )}
                </div>
                <div className="border-t-2 border-gray-400 pt-2 mx-4">
                  <p className="font-semibold text-gray-900 text-sm">Profissional Responsável</p>
                  {contract.professional_signed_at ? (
                    <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Assinado em {new Date(contract.professional_signed_at).toLocaleString("pt-BR")}
                    </p>
                  ) : (
                    <p className="text-xs text-amber-600 mt-1">Pendente de assinatura</p>
                  )}
                </div>
              </div>

              {/* Patient Signature */}
              <div className="text-center">
                <div className="h-28 border-2 border-dashed border-gray-200 rounded-xl mb-3 flex items-end justify-center pb-4 bg-gray-50/50">
                  {contract.patient_signature_url ? (
                    <img
                      src={contract.patient_signature_url}
                      alt="Assinatura do Paciente"
                      className="max-h-20 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Aguardando assinatura</span>
                  )}
                </div>
                <div className="border-t-2 border-gray-400 pt-2 mx-4">
                  <p className="font-semibold text-gray-900 text-sm">{contract.patient_name}</p>
                  {contract.patient_signed_at ? (
                    <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Assinado em {new Date(contract.patient_signed_at).toLocaleString("pt-BR")}
                    </p>
                  ) : (
                    <p className="text-xs text-amber-600 mt-1">Pendente de assinatura</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-100 text-center">
            <div className="inline-flex items-center gap-2 text-xs text-gray-400">
              <FileText className="w-3 h-3" />
              <span>Documento gerado eletronicamente pelo sistema AtendeBem</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Este documento é válido conforme Lei 14.063/2020
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
