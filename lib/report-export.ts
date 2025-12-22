/**
 * Serviço de Exportação de Relatórios Profissionais
 * Suporta PDF formatado e Excel (XLSX) com estilos
 */

import * as XLSX from 'xlsx'

// ============================================================================
// TIPOS
// ============================================================================

export interface ReportData {
  title: string
  subtitle?: string
  period?: string
  generatedAt: string
  generatedBy?: string
  clinicInfo?: {
    name: string
    cnpj?: string
    address?: string
    phone?: string
    email?: string
  }
}

export interface FinancialReportData extends ReportData {
  summary: {
    totalReceitas: number
    totalDespesas: number
    lucroLiquido: number
    ticketMedio: number
    totalTransacoes: number
  }
  receitasPorCategoria: Array<{ categoria: string; valor: number; percentual: number }>
  despesasPorCategoria: Array<{ categoria: string; valor: number; percentual: number }>
  receitasMensais: Array<{ mes: string; receitas: number; despesas: number; lucro: number }>
  contasAReceber: Array<{
    descricao: string
    paciente: string
    valor: number
    vencimento: string
    status: string
  }>
  contasAPagar: Array<{
    descricao: string
    fornecedor: string
    valor: number
    vencimento: string
    status: string
  }>
  transacoes: Array<{
    data: string
    descricao: string
    categoria: string
    tipo: 'receita' | 'despesa'
    valor: number
    status: string
    formaPagamento: string
  }>
}

export interface PatientReportData extends ReportData {
  summary: {
    totalPacientes: number
    novosNoMes: number
    ativos: number
    inativos: number
  }
  pacientes: Array<{
    nome: string
    cpf: string
    dataNascimento: string
    telefone: string
    email: string
    convenio: string
    ultimaConsulta: string
    totalConsultas: number
    totalGasto: number
  }>
  distribuicaoPorConvenio: Array<{ convenio: string; quantidade: number; percentual: number }>
  distribuicaoPorIdade: Array<{ faixa: string; quantidade: number; percentual: number }>
}

export interface AppointmentReportData extends ReportData {
  summary: {
    totalAgendamentos: number
    realizados: number
    cancelados: number
    pendentes: number
    taxaComparecimento: number
  }
  agendamentos: Array<{
    data: string
    horario: string
    paciente: string
    tipo: string
    status: string
    profissional: string
    valor: number
    procedimentos: string
  }>
  porTipo: Array<{ tipo: string; quantidade: number; percentual: number }>
  porProfissional: Array<{ profissional: string; quantidade: number; receita: number }>
}

export interface InventoryReportData extends ReportData {
  summary: {
    totalItens: number
    valorTotalEstoque: number
    itensAbaixoMinimo: number
    itensVencendo: number
  }
  itens: Array<{
    codigo: string
    nome: string
    categoria: string
    estoqueAtual: number
    estoqueMinimo: number
    unidade: string
    custoUnitario: number
    valorTotal: number
    fornecedor: string
    ultimaCompra: string
    validade: string
    status: string
  }>
  movimentacoes: Array<{
    data: string
    item: string
    tipo: 'entrada' | 'saida'
    quantidade: number
    custoUnitario: number
    total: number
    motivo: string
  }>
}

export interface IntegratedReportData extends ReportData {
  financeiro: {
    totalReceitas: number
    totalDespesas: number
    lucroLiquido: number
    contasAReceber: number
    contasAPagar: number
  }
  operacional: {
    totalPacientes: number
    totalConsultas: number
    taxaOcupacao: number
    ticketMedio: number
  }
  estoque: {
    valorTotal: number
    itensAbaixoMinimo: number
  }
  faturamento: {
    orcamentosAprovados: number
    nfeEmitidas: number
    contratosAtivos: number
  }
  evolucaoMensal: Array<{
    mes: string
    receitas: number
    despesas: number
    consultas: number
    novosPacientes: number
  }>
}

// ============================================================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================================================

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function formatDate(date: string | Date): string {
  if (!date) return '-'
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR')
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

// ============================================================================
// GERAÇÃO DE EXCEL FORMATADO
// ============================================================================

interface ExcelSheetConfig {
  name: string
  data: any[][]
  columnWidths?: number[]
  headerStyle?: boolean
}

export function generateExcelWorkbook(sheets: ExcelSheetConfig[]): XLSX.WorkBook {
  const workbook = XLSX.utils.book_new()

  for (const sheet of sheets) {
    const worksheet = XLSX.utils.aoa_to_sheet(sheet.data)

    // Definir larguras das colunas
    if (sheet.columnWidths) {
      worksheet['!cols'] = sheet.columnWidths.map(w => ({ wch: w }))
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name)
  }

  return workbook
}

export function exportWorkbookToBuffer(workbook: XLSX.WorkBook): Buffer {
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
}

export function exportWorkbookToBase64(workbook: XLSX.WorkBook): string {
  return XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' })
}

// ============================================================================
// RELATÓRIO FINANCEIRO - EXCEL
// ============================================================================

export function generateFinancialExcel(data: FinancialReportData): XLSX.WorkBook {
  const sheets: ExcelSheetConfig[] = []

  // Folha 1: Resumo Executivo
  const resumoData = [
    ['RELATÓRIO FINANCEIRO'],
    [data.title],
    [`Período: ${data.period || 'Todos os períodos'}`],
    [`Gerado em: ${data.generatedAt}`],
    [''],
    ['RESUMO EXECUTIVO'],
    [''],
    ['Indicador', 'Valor'],
    ['Total de Receitas', formatCurrency(data.summary.totalReceitas)],
    ['Total de Despesas', formatCurrency(data.summary.totalDespesas)],
    ['Lucro Líquido', formatCurrency(data.summary.lucroLiquido)],
    ['Ticket Médio', formatCurrency(data.summary.ticketMedio)],
    ['Total de Transações', data.summary.totalTransacoes.toString()],
    [''],
    ['RECEITAS POR CATEGORIA'],
    ['Categoria', 'Valor', 'Percentual'],
    ...data.receitasPorCategoria.map(r => [r.categoria, formatCurrency(r.valor), formatPercent(r.percentual)]),
    [''],
    ['DESPESAS POR CATEGORIA'],
    ['Categoria', 'Valor', 'Percentual'],
    ...data.despesasPorCategoria.map(d => [d.categoria, formatCurrency(d.valor), formatPercent(d.percentual)]),
  ]

  sheets.push({
    name: 'Resumo',
    data: resumoData,
    columnWidths: [30, 20, 15]
  })

  // Folha 2: Evolução Mensal
  const evolucaoData = [
    ['EVOLUÇÃO MENSAL'],
    [''],
    ['Mês', 'Receitas', 'Despesas', 'Lucro'],
    ...data.receitasMensais.map(m => [
      m.mes,
      formatCurrency(m.receitas),
      formatCurrency(m.despesas),
      formatCurrency(m.lucro)
    ])
  ]

  sheets.push({
    name: 'Evolução Mensal',
    data: evolucaoData,
    columnWidths: [15, 18, 18, 18]
  })

  // Folha 3: Contas a Receber
  if (data.contasAReceber.length > 0) {
    const receberData = [
      ['CONTAS A RECEBER'],
      [''],
      ['Descrição', 'Paciente', 'Valor', 'Vencimento', 'Status'],
      ...data.contasAReceber.map(c => [
        c.descricao,
        c.paciente,
        formatCurrency(c.valor),
        c.vencimento,
        c.status
      ])
    ]

    sheets.push({
      name: 'Contas a Receber',
      data: receberData,
      columnWidths: [35, 25, 15, 15, 12]
    })
  }

  // Folha 4: Contas a Pagar
  if (data.contasAPagar.length > 0) {
    const pagarData = [
      ['CONTAS A PAGAR'],
      [''],
      ['Descrição', 'Fornecedor', 'Valor', 'Vencimento', 'Status'],
      ...data.contasAPagar.map(c => [
        c.descricao,
        c.fornecedor,
        formatCurrency(c.valor),
        c.vencimento,
        c.status
      ])
    ]

    sheets.push({
      name: 'Contas a Pagar',
      data: pagarData,
      columnWidths: [35, 25, 15, 15, 12]
    })
  }

  // Folha 5: Todas as Transações
  const transacoesData = [
    ['EXTRATO DE TRANSAÇÕES'],
    [''],
    ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor', 'Status', 'Forma Pagamento'],
    ...data.transacoes.map(t => [
      t.data,
      t.descricao,
      t.categoria,
      t.tipo === 'receita' ? 'Receita' : 'Despesa',
      formatCurrency(t.valor),
      t.status,
      t.formaPagamento
    ])
  ]

  sheets.push({
    name: 'Transações',
    data: transacoesData,
    columnWidths: [12, 40, 20, 10, 15, 12, 18]
  })

  return generateExcelWorkbook(sheets)
}

// ============================================================================
// RELATÓRIO DE PACIENTES - EXCEL
// ============================================================================

export function generatePatientsExcel(data: PatientReportData): XLSX.WorkBook {
  const sheets: ExcelSheetConfig[] = []

  // Folha 1: Resumo
  const resumoData = [
    ['RELATÓRIO DE PACIENTES'],
    [data.title],
    [`Gerado em: ${data.generatedAt}`],
    [''],
    ['RESUMO'],
    [''],
    ['Indicador', 'Valor'],
    ['Total de Pacientes', data.summary.totalPacientes.toString()],
    ['Novos no Mês', data.summary.novosNoMes.toString()],
    ['Pacientes Ativos', data.summary.ativos.toString()],
    ['Pacientes Inativos', data.summary.inativos.toString()],
    [''],
    ['DISTRIBUIÇÃO POR CONVÊNIO'],
    ['Convênio', 'Quantidade', 'Percentual'],
    ...data.distribuicaoPorConvenio.map(c => [c.convenio, c.quantidade.toString(), formatPercent(c.percentual)]),
    [''],
    ['DISTRIBUIÇÃO POR IDADE'],
    ['Faixa Etária', 'Quantidade', 'Percentual'],
    ...data.distribuicaoPorIdade.map(i => [i.faixa, i.quantidade.toString(), formatPercent(i.percentual)])
  ]

  sheets.push({
    name: 'Resumo',
    data: resumoData,
    columnWidths: [25, 15, 15]
  })

  // Folha 2: Lista de Pacientes
  const pacientesData = [
    ['LISTA DE PACIENTES'],
    [''],
    ['Nome', 'CPF', 'Data Nasc.', 'Telefone', 'Email', 'Convênio', 'Última Consulta', 'Total Consultas', 'Total Gasto'],
    ...data.pacientes.map(p => [
      p.nome,
      p.cpf,
      p.dataNascimento,
      p.telefone,
      p.email,
      p.convenio,
      p.ultimaConsulta,
      p.totalConsultas.toString(),
      formatCurrency(p.totalGasto)
    ])
  ]

  sheets.push({
    name: 'Pacientes',
    data: pacientesData,
    columnWidths: [30, 15, 12, 15, 30, 20, 15, 12, 15]
  })

  return generateExcelWorkbook(sheets)
}

// ============================================================================
// RELATÓRIO DE AGENDAMENTOS - EXCEL
// ============================================================================

export function generateAppointmentsExcel(data: AppointmentReportData): XLSX.WorkBook {
  const sheets: ExcelSheetConfig[] = []

  // Folha 1: Resumo
  const resumoData = [
    ['RELATÓRIO DE AGENDAMENTOS'],
    [data.title],
    [`Período: ${data.period || 'Todos os períodos'}`],
    [`Gerado em: ${data.generatedAt}`],
    [''],
    ['RESUMO'],
    [''],
    ['Indicador', 'Valor'],
    ['Total de Agendamentos', data.summary.totalAgendamentos.toString()],
    ['Realizados', data.summary.realizados.toString()],
    ['Cancelados', data.summary.cancelados.toString()],
    ['Pendentes', data.summary.pendentes.toString()],
    ['Taxa de Comparecimento', formatPercent(data.summary.taxaComparecimento)],
    [''],
    ['POR TIPO DE ATENDIMENTO'],
    ['Tipo', 'Quantidade', 'Percentual'],
    ...data.porTipo.map(t => [t.tipo, t.quantidade.toString(), formatPercent(t.percentual)]),
    [''],
    ['POR PROFISSIONAL'],
    ['Profissional', 'Quantidade', 'Receita'],
    ...data.porProfissional.map(p => [p.profissional, p.quantidade.toString(), formatCurrency(p.receita)])
  ]

  sheets.push({
    name: 'Resumo',
    data: resumoData,
    columnWidths: [30, 15, 15]
  })

  // Folha 2: Lista de Agendamentos
  const agendamentosData = [
    ['LISTA DE AGENDAMENTOS'],
    [''],
    ['Data', 'Horário', 'Paciente', 'Tipo', 'Profissional', 'Status', 'Valor', 'Procedimentos'],
    ...data.agendamentos.map(a => [
      a.data,
      a.horario,
      a.paciente,
      a.tipo,
      a.profissional,
      a.status,
      formatCurrency(a.valor),
      a.procedimentos
    ])
  ]

  sheets.push({
    name: 'Agendamentos',
    data: agendamentosData,
    columnWidths: [12, 10, 30, 15, 25, 15, 15, 40]
  })

  return generateExcelWorkbook(sheets)
}

// ============================================================================
// RELATÓRIO DE ESTOQUE - EXCEL
// ============================================================================

export function generateInventoryExcel(data: InventoryReportData): XLSX.WorkBook {
  const sheets: ExcelSheetConfig[] = []

  // Folha 1: Resumo
  const resumoData = [
    ['RELATÓRIO DE ESTOQUE'],
    [data.title],
    [`Gerado em: ${data.generatedAt}`],
    [''],
    ['RESUMO'],
    [''],
    ['Indicador', 'Valor'],
    ['Total de Itens', data.summary.totalItens.toString()],
    ['Valor Total do Estoque', formatCurrency(data.summary.valorTotalEstoque)],
    ['Itens Abaixo do Mínimo', data.summary.itensAbaixoMinimo.toString()],
    ['Itens Próximos ao Vencimento', data.summary.itensVencendo.toString()]
  ]

  sheets.push({
    name: 'Resumo',
    data: resumoData,
    columnWidths: [30, 20]
  })

  // Folha 2: Lista de Itens
  const itensData = [
    ['INVENTÁRIO COMPLETO'],
    [''],
    ['Código', 'Nome', 'Categoria', 'Estoque Atual', 'Est. Mínimo', 'Unidade', 'Custo Unit.', 'Valor Total', 'Fornecedor', 'Última Compra', 'Validade', 'Status'],
    ...data.itens.map(i => [
      i.codigo,
      i.nome,
      i.categoria,
      i.estoqueAtual.toString(),
      i.estoqueMinimo.toString(),
      i.unidade,
      formatCurrency(i.custoUnitario),
      formatCurrency(i.valorTotal),
      i.fornecedor,
      i.ultimaCompra,
      i.validade,
      i.status
    ])
  ]

  sheets.push({
    name: 'Inventário',
    data: itensData,
    columnWidths: [12, 30, 15, 12, 12, 10, 12, 15, 25, 12, 12, 15]
  })

  // Folha 3: Movimentações
  if (data.movimentacoes.length > 0) {
    const movData = [
      ['MOVIMENTAÇÕES DE ESTOQUE'],
      [''],
      ['Data', 'Item', 'Tipo', 'Quantidade', 'Custo Unitário', 'Total', 'Motivo'],
      ...data.movimentacoes.map(m => [
        m.data,
        m.item,
        m.tipo === 'entrada' ? 'Entrada' : 'Saída',
        m.quantidade.toString(),
        formatCurrency(m.custoUnitario),
        formatCurrency(m.total),
        m.motivo
      ])
    ]

    sheets.push({
      name: 'Movimentações',
      data: movData,
      columnWidths: [12, 30, 10, 12, 15, 15, 30]
    })
  }

  return generateExcelWorkbook(sheets)
}

// ============================================================================
// RELATÓRIO INTEGRADO - EXCEL
// ============================================================================

export function generateIntegratedExcel(data: IntegratedReportData): XLSX.WorkBook {
  const sheets: ExcelSheetConfig[] = []

  // Folha 1: Dashboard Executivo
  const dashboardData = [
    ['RELATÓRIO GERENCIAL INTEGRADO'],
    [data.title],
    [`Período: ${data.period || 'Últimos 30 dias'}`],
    [`Gerado em: ${data.generatedAt}`],
    [''],
    ['═══════════════════════════════════════════════════════════'],
    ['INDICADORES FINANCEIROS'],
    ['═══════════════════════════════════════════════════════════'],
    [''],
    ['Receitas Totais', formatCurrency(data.financeiro.totalReceitas)],
    ['Despesas Totais', formatCurrency(data.financeiro.totalDespesas)],
    ['Lucro Líquido', formatCurrency(data.financeiro.lucroLiquido)],
    ['Contas a Receber', formatCurrency(data.financeiro.contasAReceber)],
    ['Contas a Pagar', formatCurrency(data.financeiro.contasAPagar)],
    [''],
    ['═══════════════════════════════════════════════════════════'],
    ['INDICADORES OPERACIONAIS'],
    ['═══════════════════════════════════════════════════════════'],
    [''],
    ['Total de Pacientes', data.operacional.totalPacientes.toString()],
    ['Total de Consultas', data.operacional.totalConsultas.toString()],
    ['Taxa de Ocupação', formatPercent(data.operacional.taxaOcupacao)],
    ['Ticket Médio', formatCurrency(data.operacional.ticketMedio)],
    [''],
    ['═══════════════════════════════════════════════════════════'],
    ['ESTOQUE'],
    ['═══════════════════════════════════════════════════════════'],
    [''],
    ['Valor Total em Estoque', formatCurrency(data.estoque.valorTotal)],
    ['Itens Abaixo do Mínimo', data.estoque.itensAbaixoMinimo.toString()],
    [''],
    ['═══════════════════════════════════════════════════════════'],
    ['FATURAMENTO'],
    ['═══════════════════════════════════════════════════════════'],
    [''],
    ['Orçamentos Aprovados', data.faturamento.orcamentosAprovados.toString()],
    ['NFe/NFSe Emitidas', data.faturamento.nfeEmitidas.toString()],
    ['Contratos Ativos', data.faturamento.contratosAtivos.toString()]
  ]

  sheets.push({
    name: 'Dashboard',
    data: dashboardData,
    columnWidths: [35, 25]
  })

  // Folha 2: Evolução Mensal
  const evolucaoData = [
    ['EVOLUÇÃO MENSAL'],
    [''],
    ['Mês', 'Receitas', 'Despesas', 'Consultas', 'Novos Pacientes'],
    ...data.evolucaoMensal.map(m => [
      m.mes,
      formatCurrency(m.receitas),
      formatCurrency(m.despesas),
      m.consultas.toString(),
      m.novosPacientes.toString()
    ])
  ]

  sheets.push({
    name: 'Evolução',
    data: evolucaoData,
    columnWidths: [15, 18, 18, 15, 18]
  })

  return generateExcelWorkbook(sheets)
}

// ============================================================================
// GERAÇÃO DE PDF HTML (para impressão/download)
// ============================================================================

export function generateFinancialPDFHTML(data: FinancialReportData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 15mm;
      max-width: 210mm;
      margin: 0 auto;
      background: #fff;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #2dd4bf;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .logo h1 {
      color: #0f172a;
      font-size: 24pt;
      font-weight: 700;
    }
    .logo h1 span { color: #2dd4bf; }
    .logo p { color: #64748b; font-size: 9pt; }

    .report-info {
      text-align: right;
      font-size: 9pt;
      color: #64748b;
    }

    .report-title {
      text-align: center;
      margin: 20px 0;
      padding: 15px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border-radius: 8px;
      color: white;
    }
    .report-title h2 { font-size: 16pt; margin-bottom: 5px; }
    .report-title p { font-size: 10pt; opacity: 0.8; }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 12px;
      margin-bottom: 25px;
    }

    .card {
      background: #f8fafc;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    .card.positive { border-left: 4px solid #22c55e; }
    .card.negative { border-left: 4px solid #ef4444; }
    .card.neutral { border-left: 4px solid #3b82f6; }
    .card h4 { font-size: 8pt; color: #64748b; margin-bottom: 5px; text-transform: uppercase; }
    .card .value { font-size: 14pt; font-weight: 700; color: #0f172a; }
    .card.positive .value { color: #16a34a; }
    .card.negative .value { color: #dc2626; }

    .section {
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
    }
    .section-header h3 {
      font-size: 12pt;
      color: #0f172a;
      flex: 1;
    }
    .section-header .badge {
      background: #dbeafe;
      color: #1e40af;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 8pt;
      font-weight: 600;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9pt;
    }
    th {
      background: #f1f5f9;
      padding: 10px 8px;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 2px solid #e2e8f0;
    }
    td {
      padding: 10px 8px;
      border-bottom: 1px solid #f1f5f9;
    }
    tr:hover { background: #f8fafc; }

    .text-right { text-align: right; }
    .text-center { text-align: center; }

    .amount-positive { color: #16a34a; font-weight: 600; }
    .amount-negative { color: #dc2626; font-weight: 600; }

    .status-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 8pt;
      font-weight: 500;
    }
    .status-paid { background: #dcfce7; color: #166534; }
    .status-pending { background: #fef3c7; color: #92400e; }
    .status-overdue { background: #fee2e2; color: #991b1b; }

    .chart-placeholder {
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      color: #64748b;
      margin-bottom: 15px;
    }

    .two-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      font-size: 8pt;
      color: #94a3b8;
    }

    @media print {
      body { padding: 10mm; }
      .no-print { display: none; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <h1>Atende<span>Bem</span></h1>
      <p>Sistema de Gestão de Clínicas</p>
      ${data.clinicInfo ? `<p style="margin-top: 5px; font-weight: 500;">${data.clinicInfo.name}</p>` : ''}
    </div>
    <div class="report-info">
      <p><strong>Relatório gerado em:</strong></p>
      <p>${data.generatedAt}</p>
      ${data.generatedBy ? `<p>Por: ${data.generatedBy}</p>` : ''}
    </div>
  </div>

  <div class="report-title">
    <h2>${data.title}</h2>
    <p>${data.period || 'Período Completo'}</p>
  </div>

  <div class="summary-cards">
    <div class="card positive">
      <h4>Receitas</h4>
      <div class="value">${formatCurrency(data.summary.totalReceitas)}</div>
    </div>
    <div class="card negative">
      <h4>Despesas</h4>
      <div class="value">${formatCurrency(data.summary.totalDespesas)}</div>
    </div>
    <div class="card ${data.summary.lucroLiquido >= 0 ? 'positive' : 'negative'}">
      <h4>Lucro Líquido</h4>
      <div class="value">${formatCurrency(data.summary.lucroLiquido)}</div>
    </div>
    <div class="card neutral">
      <h4>Ticket Médio</h4>
      <div class="value">${formatCurrency(data.summary.ticketMedio)}</div>
    </div>
    <div class="card neutral">
      <h4>Transações</h4>
      <div class="value">${data.summary.totalTransacoes}</div>
    </div>
  </div>

  <div class="two-columns">
    <div class="section">
      <div class="section-header">
        <h3>📈 Receitas por Categoria</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th class="text-right">Valor</th>
            <th class="text-right">%</th>
          </tr>
        </thead>
        <tbody>
          ${data.receitasPorCategoria.map(r => `
          <tr>
            <td>${r.categoria}</td>
            <td class="text-right amount-positive">${formatCurrency(r.valor)}</td>
            <td class="text-right">${formatPercent(r.percentual)}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-header">
        <h3>📉 Despesas por Categoria</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Categoria</th>
            <th class="text-right">Valor</th>
            <th class="text-right">%</th>
          </tr>
        </thead>
        <tbody>
          ${data.despesasPorCategoria.map(d => `
          <tr>
            <td>${d.categoria}</td>
            <td class="text-right amount-negative">${formatCurrency(d.valor)}</td>
            <td class="text-right">${formatPercent(d.percentual)}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <div class="section">
    <div class="section-header">
      <h3>📊 Evolução Mensal</h3>
    </div>
    <table>
      <thead>
        <tr>
          <th>Mês</th>
          <th class="text-right">Receitas</th>
          <th class="text-right">Despesas</th>
          <th class="text-right">Lucro</th>
        </tr>
      </thead>
      <tbody>
        ${data.receitasMensais.map(m => `
        <tr>
          <td>${m.mes}</td>
          <td class="text-right amount-positive">${formatCurrency(m.receitas)}</td>
          <td class="text-right amount-negative">${formatCurrency(m.despesas)}</td>
          <td class="text-right ${m.lucro >= 0 ? 'amount-positive' : 'amount-negative'}">${formatCurrency(m.lucro)}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  ${data.contasAReceber.length > 0 ? `
  <div class="section">
    <div class="section-header">
      <h3>💰 Contas a Receber</h3>
      <span class="badge">${data.contasAReceber.length} pendentes</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Paciente</th>
          <th class="text-right">Valor</th>
          <th class="text-center">Vencimento</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        ${data.contasAReceber.slice(0, 15).map(c => `
        <tr>
          <td>${c.descricao}</td>
          <td>${c.paciente}</td>
          <td class="text-right amount-positive">${formatCurrency(c.valor)}</td>
          <td class="text-center">${c.vencimento}</td>
          <td class="text-center">
            <span class="status-badge ${c.status === 'Vencido' ? 'status-overdue' : 'status-pending'}">${c.status}</span>
          </td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  ` : ''}

  ${data.contasAPagar.length > 0 ? `
  <div class="section">
    <div class="section-header">
      <h3>📋 Contas a Pagar</h3>
      <span class="badge">${data.contasAPagar.length} pendentes</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Fornecedor</th>
          <th class="text-right">Valor</th>
          <th class="text-center">Vencimento</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        ${data.contasAPagar.slice(0, 15).map(c => `
        <tr>
          <td>${c.descricao}</td>
          <td>${c.fornecedor}</td>
          <td class="text-right amount-negative">${formatCurrency(c.valor)}</td>
          <td class="text-center">${c.vencimento}</td>
          <td class="text-center">
            <span class="status-badge ${c.status === 'Vencido' ? 'status-overdue' : 'status-pending'}">${c.status}</span>
          </td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  ` : ''}

  <div class="section">
    <div class="section-header">
      <h3>📝 Últimas Transações</h3>
      <span class="badge">${data.transacoes.length} registros</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th class="text-center">Tipo</th>
          <th class="text-right">Valor</th>
          <th class="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        ${data.transacoes.slice(0, 20).map(t => `
        <tr>
          <td>${t.data}</td>
          <td>${t.descricao}</td>
          <td>${t.categoria}</td>
          <td class="text-center">${t.tipo === 'receita' ? '↑ Receita' : '↓ Despesa'}</td>
          <td class="text-right ${t.tipo === 'receita' ? 'amount-positive' : 'amount-negative'}">${formatCurrency(t.valor)}</td>
          <td class="text-center">
            <span class="status-badge ${t.status === 'Pago' ? 'status-paid' : 'status-pending'}">${t.status}</span>
          </td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p>Relatório gerado automaticamente pelo sistema AtendeBem</p>
    <p>Este documento é confidencial e destinado apenas ao uso interno da clínica</p>
    <p>${data.clinicInfo?.name || 'AtendeBem'} - CNPJ: ${data.clinicInfo?.cnpj || 'Não informado'}</p>
  </div>
</body>
</html>
`
}

// ============================================================================
// PDF HTML - RELATÓRIO INTEGRADO
// ============================================================================

export function generateIntegratedPDFHTML(data: IntegratedReportData): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1a1a1a;
      padding: 15mm;
      max-width: 210mm;
      margin: 0 auto;
      background: #fff;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 3px solid #2dd4bf;
      padding-bottom: 15px;
      margin-bottom: 20px;
    }

    .logo h1 {
      color: #0f172a;
      font-size: 24pt;
      font-weight: 700;
    }
    .logo h1 span { color: #2dd4bf; }

    .report-title {
      text-align: center;
      margin: 20px 0;
      padding: 20px;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border-radius: 12px;
      color: white;
    }
    .report-title h2 { font-size: 18pt; margin-bottom: 5px; }
    .report-title p { font-size: 10pt; opacity: 0.8; }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 25px;
    }

    .dashboard-section {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e2e8f0;
    }

    .dashboard-section h3 {
      font-size: 11pt;
      color: #0f172a;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .metric-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px dashed #e2e8f0;
    }
    .metric-row:last-child { border-bottom: none; }
    .metric-label { color: #64748b; }
    .metric-value { font-weight: 700; color: #0f172a; }
    .metric-value.positive { color: #16a34a; }
    .metric-value.negative { color: #dc2626; }

    .highlight-card {
      background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
      color: white;
      border-radius: 12px;
      padding: 25px;
      text-align: center;
      margin-bottom: 25px;
    }
    .highlight-card h3 { font-size: 10pt; opacity: 0.9; margin-bottom: 8px; }
    .highlight-card .value { font-size: 28pt; font-weight: 700; }
    .highlight-card .subtitle { font-size: 9pt; opacity: 0.8; margin-top: 5px; }

    .evolution-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .evolution-table th {
      background: #f1f5f9;
      padding: 12px 10px;
      text-align: left;
      font-weight: 600;
      color: #475569;
      font-size: 9pt;
    }
    .evolution-table td {
      padding: 12px 10px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 9pt;
    }
    .evolution-table .text-right { text-align: right; }

    .footer {
      margin-top: 30px;
      padding-top: 15px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      font-size: 8pt;
      color: #94a3b8;
    }

    @media print {
      body { padding: 10mm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <h1>Atende<span>Bem</span></h1>
      <p style="color: #64748b; font-size: 9pt;">Sistema de Gestão de Clínicas</p>
    </div>
    <div style="text-align: right; font-size: 9pt; color: #64748b;">
      <p><strong>Relatório Gerencial</strong></p>
      <p>${data.generatedAt}</p>
    </div>
  </div>

  <div class="report-title">
    <h2>📊 ${data.title}</h2>
    <p>${data.period || 'Últimos 30 dias'}</p>
  </div>

  <div class="highlight-card">
    <h3>LUCRO LÍQUIDO DO PERÍODO</h3>
    <div class="value">${formatCurrency(data.financeiro.lucroLiquido)}</div>
    <div class="subtitle">Receitas: ${formatCurrency(data.financeiro.totalReceitas)} | Despesas: ${formatCurrency(data.financeiro.totalDespesas)}</div>
  </div>

  <div class="dashboard-grid">
    <div class="dashboard-section">
      <h3>💰 Financeiro</h3>
      <div class="metric-row">
        <span class="metric-label">Total de Receitas</span>
        <span class="metric-value positive">${formatCurrency(data.financeiro.totalReceitas)}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Total de Despesas</span>
        <span class="metric-value negative">${formatCurrency(data.financeiro.totalDespesas)}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Contas a Receber</span>
        <span class="metric-value">${formatCurrency(data.financeiro.contasAReceber)}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Contas a Pagar</span>
        <span class="metric-value">${formatCurrency(data.financeiro.contasAPagar)}</span>
      </div>
    </div>

    <div class="dashboard-section">
      <h3>📅 Operacional</h3>
      <div class="metric-row">
        <span class="metric-label">Total de Pacientes</span>
        <span class="metric-value">${data.operacional.totalPacientes}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Consultas Realizadas</span>
        <span class="metric-value">${data.operacional.totalConsultas}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Taxa de Ocupação</span>
        <span class="metric-value">${formatPercent(data.operacional.taxaOcupacao)}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Ticket Médio</span>
        <span class="metric-value">${formatCurrency(data.operacional.ticketMedio)}</span>
      </div>
    </div>

    <div class="dashboard-section">
      <h3>📦 Estoque</h3>
      <div class="metric-row">
        <span class="metric-label">Valor Total em Estoque</span>
        <span class="metric-value">${formatCurrency(data.estoque.valorTotal)}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Itens Abaixo do Mínimo</span>
        <span class="metric-value ${data.estoque.itensAbaixoMinimo > 0 ? 'negative' : ''}">${data.estoque.itensAbaixoMinimo}</span>
      </div>
    </div>

    <div class="dashboard-section">
      <h3>📄 Faturamento</h3>
      <div class="metric-row">
        <span class="metric-label">Orçamentos Aprovados</span>
        <span class="metric-value">${data.faturamento.orcamentosAprovados}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">NFe/NFSe Emitidas</span>
        <span class="metric-value">${data.faturamento.nfeEmitidas}</span>
      </div>
      <div class="metric-row">
        <span class="metric-label">Contratos Ativos</span>
        <span class="metric-value">${data.faturamento.contratosAtivos}</span>
      </div>
    </div>
  </div>

  <div class="dashboard-section" style="margin-bottom: 25px;">
    <h3>📈 Evolução Mensal</h3>
    <table class="evolution-table">
      <thead>
        <tr>
          <th>Mês</th>
          <th class="text-right">Receitas</th>
          <th class="text-right">Despesas</th>
          <th class="text-right">Consultas</th>
          <th class="text-right">Novos Pacientes</th>
        </tr>
      </thead>
      <tbody>
        ${data.evolucaoMensal.map(m => `
        <tr>
          <td>${m.mes}</td>
          <td class="text-right" style="color: #16a34a; font-weight: 600;">${formatCurrency(m.receitas)}</td>
          <td class="text-right" style="color: #dc2626; font-weight: 600;">${formatCurrency(m.despesas)}</td>
          <td class="text-right">${m.consultas}</td>
          <td class="text-right">${m.novosPacientes}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <div class="footer">
    <p>Relatório Gerencial Integrado - AtendeBem</p>
    <p>Documento confidencial para uso interno</p>
  </div>
</body>
</html>
`
}
