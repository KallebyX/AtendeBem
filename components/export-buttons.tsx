"use client"

import { Button } from "@/components/ui/button"
import { Download, FileSpreadsheet, Loader2 } from "lucide-react"
import { exportAppointmentPDF, exportAppointmentExcel } from "@/app/actions/export"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface ExportButtonsProps {
  appointmentId: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function ExportButtons({ appointmentId, variant = "outline", size = "sm" }: ExportButtonsProps) {
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [isExportingExcel, setIsExportingExcel] = useState(false)
  const { toast } = useToast()

  const handleExportPDF = async () => {
    setIsExportingPDF(true)
    try {
      const result = await exportAppointmentPDF(appointmentId)

      if (result.success && result.html) {
        // Criar blob com HTML e abrir em nova janela para impressão/salvar como PDF
        const blob = new Blob([result.html], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        const printWindow = window.open(url, "_blank")

        // Aguardar carregamento e imprimir
        if (printWindow) {
          printWindow.onload = () => {
            setTimeout(() => {
              printWindow.print()
            }, 250)
          }
        }

        toast({
          title: "PDF gerado",
          description: "Use Ctrl+P ou Cmd+P para salvar como PDF",
        })
      } else {
        throw new Error(result.error || "Erro ao gerar PDF")
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível exportar o PDF",
        variant: "destructive",
      })
    } finally {
      setIsExportingPDF(false)
    }
  }

  const handleExportExcel = async () => {
    setIsExportingExcel(true)
    try {
      const result = await exportAppointmentExcel(appointmentId)

      if (result.success && result.data) {
        // Converter dados para CSV (mais simples que XLSX no browser)
        const csv = convertToCSV(result.data)
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)

        link.setAttribute("href", url)
        link.setAttribute("download", result.filename.replace(".xlsx", ".csv"))
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "Excel exportado",
          description: "O arquivo foi baixado com sucesso",
        })
      } else {
        throw new Error(result.error || "Erro ao gerar Excel")
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível exportar o Excel",
        variant: "destructive",
      })
    } finally {
      setIsExportingExcel(false)
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant={variant} size={size} onClick={handleExportPDF} disabled={isExportingPDF} className="rounded-2xl">
        {isExportingPDF ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
        PDF
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={handleExportExcel}
        disabled={isExportingExcel}
        className="rounded-2xl"
      >
        {isExportingExcel ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <FileSpreadsheet className="w-4 h-4 mr-2" />
        )}
        Excel
      </Button>
    </div>
  )
}

function convertToCSV(data: any): string {
  let csv = "GUIA DE CONSULTA TISS\n\n"

  csv += "DADOS DA GUIA\n"
  csv += `Número da Guia,${data.guia?.numeroGuia || ""}\n`
  csv += `Data do Atendimento,${data.guia?.dataAtendimento || ""}\n`
  csv += `Horário,${data.guia?.horario || ""}\n`
  csv += `Status,${data.guia?.status || ""}\n\n`

  csv += "DADOS DO BENEFICIÁRIO\n"
  csv += `Nome,${data.beneficiario?.nome || ""}\n`
  csv += `CPF,${data.beneficiario?.cpf || ""}\n`
  csv += `CNS,${data.beneficiario?.cns || ""}\n\n`

  csv += "DADOS DO PRESTADOR\n"
  csv += `Nome,${data.prestador?.nome || ""}\n`
  csv += `CRM,${data.prestador?.crm || ""}\n`
  csv += `UF,${data.prestador?.uf || ""}\n`
  csv += `Especialidade,${data.prestador?.especialidade || ""}\n\n`

  if (data.procedimentos && data.procedimentos.length > 0) {
    csv += "PROCEDIMENTOS REALIZADOS\n"
    csv += "Código,Descrição,Quantidade,Valor Unitário,Valor Total\n"
    data.procedimentos.forEach((proc: any) => {
      csv += `${proc.codigo || ""},"${proc.descricao || ""}",${proc.quantidade || 1},${proc.valorUnitario || 0},${proc.valorTotal || 0}\n`
    })
  }

  if (data.observacoes) {
    csv += `\nOBSERVAÇÕES\n"${data.observacoes}"\n`
  }

  return csv
}
