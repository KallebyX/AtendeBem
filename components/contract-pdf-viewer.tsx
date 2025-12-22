"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Printer, FileText } from "lucide-react"
import { jsPDF } from "jspdf"

interface ContractPDFViewerProps {
  contract: {
    id: string
    title: string
    contract_number: string
    content: string
    patient_name: string
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

export function ContractPDFViewer({ contract }: ContractPDFViewerProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  async function handleDownloadPDF() {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    const contentWidth = pageWidth - margin * 2
    let yPosition = 20

    // Header
    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text(contract.title, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 10

    // Contract number
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(100, 100, 100)
    doc.text(`Contrato: ${contract.contract_number}`, pageWidth / 2, yPosition, { align: "center" })
    yPosition += 15

    // Line
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Info section
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text(`Paciente: ${contract.patient_name}`, margin, yPosition)
    yPosition += 6
    doc.text(`Tipo: ${contractTypeLabels[contract.contract_type] || contract.contract_type}`, margin, yPosition)
    yPosition += 6
    doc.text(`Data: ${new Date(contract.created_at).toLocaleDateString("pt-BR")}`, margin, yPosition)
    yPosition += 15

    // Content
    doc.setFontSize(11)
    const paragraphs = contract.content.split("\n")

    for (const paragraph of paragraphs) {
      if (paragraph.trim() === "") {
        yPosition += 5
        continue
      }

      const lines = doc.splitTextToSize(paragraph, contentWidth)

      for (const line of lines) {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = 20
        }
        doc.text(line, margin, yPosition)
        yPosition += 6
      }
    }

    // Signatures
    yPosition += 20
    if (yPosition > 220) {
      doc.addPage()
      yPosition = 20
    }

    doc.setDrawColor(150, 150, 150)
    doc.line(margin, yPosition, margin + 70, yPosition)
    doc.line(pageWidth - margin - 70, yPosition, pageWidth - margin, yPosition)
    yPosition += 5

    doc.setFontSize(10)
    doc.text("Profissional", margin, yPosition)
    doc.text("Paciente", pageWidth - margin - 70, yPosition)
    yPosition += 4

    if (contract.professional_signed_at) {
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(new Date(contract.professional_signed_at).toLocaleString("pt-BR"), margin, yPosition)
    }

    if (contract.patient_signed_at) {
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(new Date(contract.patient_signed_at).toLocaleString("pt-BR"), pageWidth - margin - 70, yPosition)
    }

    doc.save(`${contract.contract_number}.pdf`)
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex justify-end gap-2 print:hidden">
        <Button variant="outline" size="sm" onClick={handlePrint} className="rounded-xl">
          <Printer className="w-4 h-4 mr-2" />
          Imprimir
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadPDF} className="rounded-xl">
          <Download className="w-4 h-4 mr-2" />
          Baixar PDF
        </Button>
      </div>

      {/* PDF-style view */}
      <div
        ref={contentRef}
        className="bg-white border rounded-xl shadow-lg mx-auto print:shadow-none print:border-0"
        style={{ maxWidth: "210mm", minHeight: "297mm" }}
      >
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{contract.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">
              {contract.contract_number}
            </p>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Paciente</span>
              <p className="font-medium">{contract.patient_name}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Tipo</span>
              <p className="font-medium">{contractTypeLabels[contract.contract_type] || contract.contract_type}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Data de Criação</span>
              <p className="font-medium">{new Date(contract.created_at).toLocaleDateString("pt-BR")}</p>
            </div>
            {contract.valid_until && (
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Validade</span>
                <p className="font-medium">{new Date(contract.valid_until).toLocaleDateString("pt-BR")}</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none mb-12">
            {contract.content.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") {
                return <div key={index} className="h-4" />
              }

              // Check if it's a title/heading (all caps or starts with number)
              if (paragraph.match(/^[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ\d\.\)]+(\s|$)/) && paragraph.length < 100) {
                return (
                  <h3 key={index} className="text-base font-bold mt-6 mb-2">
                    {paragraph}
                  </h3>
                )
              }

              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-3 text-justify">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Signatures */}
          <div className="mt-16 pt-8 border-t">
            <div className="grid grid-cols-2 gap-8">
              {/* Professional Signature */}
              <div className="text-center">
                <div className="h-24 border-b-2 border-gray-300 mb-2 flex items-end justify-center pb-2">
                  {contract.professional_signature_url && (
                    <img
                      src={contract.professional_signature_url}
                      alt="Assinatura do Profissional"
                      className="max-h-20 max-w-full object-contain"
                    />
                  )}
                </div>
                <p className="font-medium text-sm">Profissional Responsável</p>
                {contract.professional_signed_at && (
                  <p className="text-xs text-muted-foreground">
                    Assinado em: {new Date(contract.professional_signed_at).toLocaleString("pt-BR")}
                  </p>
                )}
              </div>

              {/* Patient Signature */}
              <div className="text-center">
                <div className="h-24 border-b-2 border-gray-300 mb-2 flex items-end justify-center pb-2">
                  {contract.patient_signature_url && (
                    <img
                      src={contract.patient_signature_url}
                      alt="Assinatura do Paciente"
                      className="max-h-20 max-w-full object-contain"
                    />
                  )}
                </div>
                <p className="font-medium text-sm">{contract.patient_name}</p>
                {contract.patient_signed_at && (
                  <p className="text-xs text-muted-foreground">
                    Assinado em: {new Date(contract.patient_signed_at).toLocaleString("pt-BR")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t text-center text-xs text-muted-foreground">
            <p>Documento gerado eletronicamente pelo sistema AtendeBem</p>
            <p>Este documento é válido conforme Lei 14.063/2020</p>
          </div>
        </div>
      </div>
    </div>
  )
}
