"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { format, subDays, subMonths, startOfMonth, endOfMonth, startOfYear } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  CalendarIcon,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  TrendingUp,
  Users,
  Calendar as CalendarIconSolid,
  Package,
  BarChart3,
} from "lucide-react"
import {
  exportFinancialToExcel,
  exportPatientsToExcel,
  exportAppointmentsToExcel,
  exportInventoryToExcel,
  exportIntegratedToExcel,
  exportFinancialToPDF,
  exportIntegratedToPDF,
} from "@/app/actions/report-export"

type ReportType = "financial" | "patients" | "appointments" | "inventory" | "integrated"
type ExportFormat = "excel" | "pdf"

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

const reportTypes: { value: ReportType; label: string; description: string; icon: any; hasPdf: boolean }[] = [
  {
    value: "integrated",
    label: "Relatório Gerencial Integrado",
    description: "Visão consolidada de todos os módulos: financeiro, pacientes, agendamentos, estoque e faturamento",
    icon: BarChart3,
    hasPdf: true,
  },
  {
    value: "financial",
    label: "Relatório Financeiro",
    description: "Receitas, despesas, contas a pagar/receber, evolução mensal e fluxo de caixa",
    icon: TrendingUp,
    hasPdf: true,
  },
  {
    value: "patients",
    label: "Relatório de Pacientes",
    description: "Lista completa de pacientes, distribuição por convênio e faixa etária",
    icon: Users,
    hasPdf: false,
  },
  {
    value: "appointments",
    label: "Relatório de Agendamentos",
    description: "Histórico de consultas, taxa de comparecimento e distribuição por profissional",
    icon: CalendarIconSolid,
    hasPdf: false,
  },
  {
    value: "inventory",
    label: "Relatório de Estoque",
    description: "Inventário completo, movimentações e alertas de estoque baixo ou vencimento",
    icon: Package,
    hasPdf: false,
  },
]

const periodPresets = [
  { label: "Últimos 7 dias", getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }) },
  { label: "Últimos 30 dias", getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }) },
  { label: "Este mês", getValue: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
  { label: "Mês anterior", getValue: () => ({ from: startOfMonth(subMonths(new Date(), 1)), to: endOfMonth(subMonths(new Date(), 1)) }) },
  { label: "Últimos 3 meses", getValue: () => ({ from: subMonths(new Date(), 3), to: new Date() }) },
  { label: "Últimos 6 meses", getValue: () => ({ from: subMonths(new Date(), 6), to: new Date() }) },
  { label: "Este ano", getValue: () => ({ from: startOfYear(new Date()), to: new Date() }) },
]

export function ReportExportPanel() {
  const [selectedReport, setSelectedReport] = useState<ReportType>("integrated")
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<ExportFormat>("excel")

  const selectedReportInfo = reportTypes.find((r) => r.value === selectedReport)

  async function handleExport() {
    setIsExporting(true)

    try {
      const startDate = dateRange.from?.toISOString().split("T")[0]
      const endDate = dateRange.to?.toISOString().split("T")[0]

      let result: any

      if (exportFormat === "excel") {
        switch (selectedReport) {
          case "financial":
            result = await exportFinancialToExcel(startDate, endDate)
            break
          case "patients":
            result = await exportPatientsToExcel()
            break
          case "appointments":
            result = await exportAppointmentsToExcel(startDate, endDate)
            break
          case "inventory":
            result = await exportInventoryToExcel()
            break
          case "integrated":
            result = await exportIntegratedToExcel(startDate, endDate)
            break
        }
      } else {
        switch (selectedReport) {
          case "financial":
            result = await exportFinancialToPDF(startDate, endDate)
            break
          case "integrated":
            result = await exportIntegratedToPDF(startDate, endDate)
            break
          default:
            toast.error("Este relatório não suporta exportação em PDF")
            setIsExporting(false)
            return
        }
      }

      if (!result.success) {
        toast.error(result.error || "Erro ao gerar relatório")
        return
      }

      // Fazer download do arquivo
      if (exportFormat === "excel") {
        // Base64 -> Blob -> Download
        const binaryString = atob(result.data)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        const blob = new Blob([bytes], { type: result.contentType })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = result.filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        toast.success("Planilha Excel gerada com sucesso!")
      } else {
        // HTML -> Nova janela para impressão/PDF
        const printWindow = window.open("", "_blank")
        if (printWindow) {
          printWindow.document.write(result.data)
          printWindow.document.close()
          toast.success("Relatório PDF aberto. Use Ctrl+P para salvar como PDF.")
        } else {
          // Fallback: download como HTML
          const blob = new Blob([result.data], { type: "text/html" })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = result.filename
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
          toast.success("Relatório HTML gerado. Abra no navegador e use Ctrl+P para salvar como PDF.")
        }
      }
    } catch (error: any) {
      console.error("Erro ao exportar:", error)
      toast.error("Erro ao gerar relatório: " + error.message)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Exportar Relatórios
        </CardTitle>
        <CardDescription>
          Gere relatórios detalhados em Excel (XLSX) ou PDF formatado
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Seleção do tipo de relatório */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Tipo de Relatório</label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => {
              const Icon = report.icon
              const isSelected = selectedReport === report.value

              return (
                <button
                  key={report.value}
                  onClick={() => setSelectedReport(report.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{report.label}</span>
                        {report.hasPdf && (
                          <Badge variant="secondary" className="text-xs">
                            PDF
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {report.description}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Período - apenas para relatórios que usam data */}
        {selectedReport !== "patients" && selectedReport !== "inventory" && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Período</label>

            {/* Presets de período */}
            <div className="flex flex-wrap gap-2">
              {periodPresets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setDateRange(preset.getValue())}
                  className="text-xs"
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Calendário customizado */}
            <div className="flex flex-wrap gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "dd/MM/yyyy", { locale: ptBR }) : "Data inicial"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                    locale={ptBR}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "dd/MM/yyyy", { locale: ptBR }) : "Data final"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                    locale={ptBR}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {/* Formato de exportação */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Formato de Exportação</label>
          <div className="flex gap-3">
            <Button
              variant={exportFormat === "excel" ? "default" : "outline"}
              onClick={() => setExportFormat("excel")}
              className="flex-1"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Excel (XLSX)
            </Button>
            <Button
              variant={exportFormat === "pdf" ? "default" : "outline"}
              onClick={() => setExportFormat("pdf")}
              disabled={!selectedReportInfo?.hasPdf}
              className="flex-1"
            >
              <FileText className="mr-2 h-4 w-4" />
              PDF
              {!selectedReportInfo?.hasPdf && (
                <span className="ml-1 text-xs">(indisponível)</span>
              )}
            </Button>
          </div>
        </div>

        {/* Botão de exportar */}
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
          size="lg"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando relatório...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Exportar {selectedReportInfo?.label}
            </>
          )}
        </Button>

        {/* Info sobre o relatório selecionado */}
        {selectedReportInfo && (
          <div className="rounded-lg bg-muted p-4">
            <h4 className="font-medium text-sm mb-2">O que será incluído:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              {selectedReport === "integrated" && (
                <>
                  <li>- Dashboard executivo com KPIs principais</li>
                  <li>- Resumo financeiro: receitas, despesas e lucro</li>
                  <li>- Indicadores operacionais: pacientes e consultas</li>
                  <li>- Status do estoque e itens críticos</li>
                  <li>- Faturamento: orçamentos, NFe e contratos</li>
                  <li>- Evolução mensal consolidada</li>
                </>
              )}
              {selectedReport === "financial" && (
                <>
                  <li>- Resumo de receitas e despesas</li>
                  <li>- Análise por categoria</li>
                  <li>- Evolução mensal</li>
                  <li>- Contas a receber e a pagar</li>
                  <li>- Extrato completo de transações</li>
                </>
              )}
              {selectedReport === "patients" && (
                <>
                  <li>- Lista completa de pacientes</li>
                  <li>- Dados de contato e convênio</li>
                  <li>- Histórico de consultas e gastos</li>
                  <li>- Distribuição por convênio e idade</li>
                </>
              )}
              {selectedReport === "appointments" && (
                <>
                  <li>- Lista de todos os agendamentos</li>
                  <li>- Taxa de comparecimento</li>
                  <li>- Distribuição por tipo e profissional</li>
                  <li>- Receita por profissional</li>
                </>
              )}
              {selectedReport === "inventory" && (
                <>
                  <li>- Inventário completo</li>
                  <li>- Alertas de estoque baixo</li>
                  <li>- Produtos próximos ao vencimento</li>
                  <li>- Histórico de movimentações</li>
                </>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
