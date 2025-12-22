/**
 * Processador de Glosas TISS - Tabela 38
 *
 * Implementa:
 * - Parsing de demonstrativos de retorno
 * - Classificação automática de glosas
 * - Sugestões de ação por código
 * - Geração de recursos de glosa
 * - Estatísticas de glosas
 */

import type {
  TISSGlosa,
  TISSDemonstrativoRetorno,
  TISSProtocoloRetorno
} from './types'

/**
 * Categorias de glosa (Tabela 38 ANS)
 */
export enum GlosaCategoria {
  ADMINISTRATIVA = 'ADMINISTRATIVA',    // 1xxx - Erros de cadastro, carteira, etc
  TECNICA = 'TECNICA',                  // 2xxx - Erros técnicos de procedimento
  AUTORIZACAO = 'AUTORIZACAO',          // 3xxx - Problemas de autorização
  COBERTURA = 'COBERTURA',              // 4xxx - Fora de cobertura
  DUPLICIDADE = 'DUPLICIDADE',          // 5xxx - Procedimentos duplicados
  VALOR = 'VALOR',                      // 6xxx - Problemas de valor
  PRAZO = 'PRAZO',                      // 7xxx - Fora do prazo
  DOCUMENTACAO = 'DOCUMENTACAO',        // 8xxx - Documentação insuficiente
  OUTROS = 'OUTROS'                     // 9xxx - Outros
}

/**
 * Ação sugerida para tratamento de glosa
 */
export enum GlosaAcao {
  CORRIGIR_CADASTRO = 'CORRIGIR_CADASTRO',
  AUDITORIA_MEDICA = 'AUDITORIA_MEDICA',
  SOLICITAR_AUTORIZACAO = 'SOLICITAR_AUTORIZACAO',
  RECURSAR = 'RECURSAR',
  REENVIAR = 'REENVIAR',
  ACEITAR = 'ACEITAR',
  CONTATAR_OPERADORA = 'CONTATAR_OPERADORA',
  ANEXAR_DOCUMENTOS = 'ANEXAR_DOCUMENTOS'
}

/**
 * Código de glosa com descrição e tratamento
 */
export interface CodigoGlosa {
  codigo: string
  descricao: string
  categoria: GlosaCategoria
  acaoSugerida: GlosaAcao
  recursoAutomatico: boolean
  observacao?: string
}

/**
 * Tabela 38 - Códigos de Glosa (parcial - principais códigos)
 */
export const TABELA_38: Record<string, CodigoGlosa> = {
  // Glosas Administrativas (1xxx)
  '1001': {
    codigo: '1001',
    descricao: 'Carteira de identificação inválida',
    categoria: GlosaCategoria.ADMINISTRATIVA,
    acaoSugerida: GlosaAcao.CORRIGIR_CADASTRO,
    recursoAutomatico: false
  },
  '1002': {
    codigo: '1002',
    descricao: 'Beneficiário não cadastrado',
    categoria: GlosaCategoria.ADMINISTRATIVA,
    acaoSugerida: GlosaAcao.CORRIGIR_CADASTRO,
    recursoAutomatico: false
  },
  '1003': {
    codigo: '1003',
    descricao: 'Carteira vencida na data do atendimento',
    categoria: GlosaCategoria.ADMINISTRATIVA,
    acaoSugerida: GlosaAcao.CONTATAR_OPERADORA,
    recursoAutomatico: false
  },
  '1004': {
    codigo: '1004',
    descricao: 'Beneficiário em carência',
    categoria: GlosaCategoria.COBERTURA,
    acaoSugerida: GlosaAcao.ACEITAR,
    recursoAutomatico: false
  },
  '1005': {
    codigo: '1005',
    descricao: 'Contrato/plano cancelado',
    categoria: GlosaCategoria.ADMINISTRATIVA,
    acaoSugerida: GlosaAcao.CONTATAR_OPERADORA,
    recursoAutomatico: false
  },
  '1010': {
    codigo: '1010',
    descricao: 'Prestador não habilitado para o procedimento',
    categoria: GlosaCategoria.ADMINISTRATIVA,
    acaoSugerida: GlosaAcao.CONTATAR_OPERADORA,
    recursoAutomatico: false
  },
  '1020': {
    codigo: '1020',
    descricao: 'Código do prestador inválido',
    categoria: GlosaCategoria.ADMINISTRATIVA,
    acaoSugerida: GlosaAcao.CORRIGIR_CADASTRO,
    recursoAutomatico: true,
    observacao: 'Verificar código de cadastro na operadora'
  },

  // Glosas Técnicas (2xxx)
  '2001': {
    codigo: '2001',
    descricao: 'Procedimento não autorizado previamente',
    categoria: GlosaCategoria.AUTORIZACAO,
    acaoSugerida: GlosaAcao.SOLICITAR_AUTORIZACAO,
    recursoAutomatico: false
  },
  '2002': {
    codigo: '2002',
    descricao: 'Autorização vencida',
    categoria: GlosaCategoria.AUTORIZACAO,
    acaoSugerida: GlosaAcao.SOLICITAR_AUTORIZACAO,
    recursoAutomatico: false
  },
  '2003': {
    codigo: '2003',
    descricao: 'Quantidade executada maior que a autorizada',
    categoria: GlosaCategoria.AUTORIZACAO,
    acaoSugerida: GlosaAcao.AUDITORIA_MEDICA,
    recursoAutomatico: false
  },
  '2004': {
    codigo: '2004',
    descricao: 'Procedimento executado diferente do autorizado',
    categoria: GlosaCategoria.AUTORIZACAO,
    acaoSugerida: GlosaAcao.AUDITORIA_MEDICA,
    recursoAutomatico: false
  },
  '2010': {
    codigo: '2010',
    descricao: 'Código do procedimento inválido',
    categoria: GlosaCategoria.TECNICA,
    acaoSugerida: GlosaAcao.REENVIAR,
    recursoAutomatico: true,
    observacao: 'Verificar código TUSS vigente'
  },
  '2011': {
    codigo: '2011',
    descricao: 'Procedimento não consta na tabela vigente',
    categoria: GlosaCategoria.TECNICA,
    acaoSugerida: GlosaAcao.CONTATAR_OPERADORA,
    recursoAutomatico: false
  },
  '2020': {
    codigo: '2020',
    descricao: 'Procedimento incompatível com CID informado',
    categoria: GlosaCategoria.TECNICA,
    acaoSugerida: GlosaAcao.AUDITORIA_MEDICA,
    recursoAutomatico: false
  },
  '2021': {
    codigo: '2021',
    descricao: 'Procedimento incompatível com sexo do beneficiário',
    categoria: GlosaCategoria.TECNICA,
    acaoSugerida: GlosaAcao.AUDITORIA_MEDICA,
    recursoAutomatico: false
  },
  '2022': {
    codigo: '2022',
    descricao: 'Procedimento incompatível com idade do beneficiário',
    categoria: GlosaCategoria.TECNICA,
    acaoSugerida: GlosaAcao.AUDITORIA_MEDICA,
    recursoAutomatico: false
  },
  '2030': {
    codigo: '2030',
    descricao: 'Material/medicamento não coberto',
    categoria: GlosaCategoria.COBERTURA,
    acaoSugerida: GlosaAcao.RECURSAR,
    recursoAutomatico: false
  },

  // Glosas de Valor (6xxx)
  '6001': {
    codigo: '6001',
    descricao: 'Valor cobrado acima do contratado',
    categoria: GlosaCategoria.VALOR,
    acaoSugerida: GlosaAcao.REENVIAR,
    recursoAutomatico: true,
    observacao: 'Ajustar valor conforme contrato'
  },
  '6002': {
    codigo: '6002',
    descricao: 'Erro de cálculo/soma',
    categoria: GlosaCategoria.VALOR,
    acaoSugerida: GlosaAcao.REENVIAR,
    recursoAutomatico: true,
    observacao: 'Recalcular valores'
  },
  '6003': {
    codigo: '6003',
    descricao: 'Coparticipação não aplicada',
    categoria: GlosaCategoria.VALOR,
    acaoSugerida: GlosaAcao.REENVIAR,
    recursoAutomatico: true
  },

  // Glosas de Prazo (7xxx)
  '7001': {
    codigo: '7001',
    descricao: 'Guia enviada fora do prazo',
    categoria: GlosaCategoria.PRAZO,
    acaoSugerida: GlosaAcao.RECURSAR,
    recursoAutomatico: false,
    observacao: 'Prazo padrão: até 180 dias do atendimento'
  },
  '7002': {
    codigo: '7002',
    descricao: 'Prazo de reapresentação vencido',
    categoria: GlosaCategoria.PRAZO,
    acaoSugerida: GlosaAcao.ACEITAR,
    recursoAutomatico: false
  },

  // Glosas de Duplicidade (5xxx)
  '5001': {
    codigo: '5001',
    descricao: 'Guia já enviada anteriormente',
    categoria: GlosaCategoria.DUPLICIDADE,
    acaoSugerida: GlosaAcao.ACEITAR,
    recursoAutomatico: false
  },
  '5002': {
    codigo: '5002',
    descricao: 'Procedimento duplicado na mesma guia',
    categoria: GlosaCategoria.DUPLICIDADE,
    acaoSugerida: GlosaAcao.REENVIAR,
    recursoAutomatico: true
  },

  // Glosas de Documentação (8xxx)
  '8001': {
    codigo: '8001',
    descricao: 'Falta laudo/relatório médico',
    categoria: GlosaCategoria.DOCUMENTACAO,
    acaoSugerida: GlosaAcao.ANEXAR_DOCUMENTOS,
    recursoAutomatico: false
  },
  '8002': {
    codigo: '8002',
    descricao: 'Falta assinatura do profissional',
    categoria: GlosaCategoria.DOCUMENTACAO,
    acaoSugerida: GlosaAcao.ANEXAR_DOCUMENTOS,
    recursoAutomatico: false
  },
  '8003': {
    codigo: '8003',
    descricao: 'Falta CID do diagnóstico',
    categoria: GlosaCategoria.DOCUMENTACAO,
    acaoSugerida: GlosaAcao.REENVIAR,
    recursoAutomatico: true
  }
}

/**
 * Glosa processada com informações adicionais
 */
export interface GlosaProcessada extends TISSGlosa {
  categoria: GlosaCategoria
  acaoSugerida: GlosaAcao
  recursoAutomatico: boolean
  observacao?: string
  status: 'pendente' | 'recurso_enviado' | 'aceita' | 'resolvida'
}

/**
 * Estatísticas de glosas
 */
export interface GlosaEstatisticas {
  totalGlosas: number
  valorTotalGlosado: number
  porCategoria: Record<GlosaCategoria, {
    quantidade: number
    valor: number
  }>
  topCodigos: Array<{
    codigo: string
    descricao: string
    quantidade: number
    valor: number
  }>
  taxaRecurso: number
  taxaSucesso: number
}

/**
 * Processa uma glosa e retorna informações enriquecidas
 */
export function processarGlosa(glosa: TISSGlosa): GlosaProcessada {
  const codigoInfo = TABELA_38[glosa.codigo_glosa]

  if (codigoInfo) {
    return {
      ...glosa,
      categoria: codigoInfo.categoria,
      acaoSugerida: codigoInfo.acaoSugerida,
      recursoAutomatico: codigoInfo.recursoAutomatico,
      observacao: codigoInfo.observacao,
      status: 'pendente'
    }
  }

  // Tenta determinar categoria pelo primeiro dígito
  const firstDigit = glosa.codigo_glosa.charAt(0)
  let categoria = GlosaCategoria.OUTROS

  switch (firstDigit) {
    case '1': categoria = GlosaCategoria.ADMINISTRATIVA; break
    case '2': categoria = GlosaCategoria.TECNICA; break
    case '3': categoria = GlosaCategoria.AUTORIZACAO; break
    case '4': categoria = GlosaCategoria.COBERTURA; break
    case '5': categoria = GlosaCategoria.DUPLICIDADE; break
    case '6': categoria = GlosaCategoria.VALOR; break
    case '7': categoria = GlosaCategoria.PRAZO; break
    case '8': categoria = GlosaCategoria.DOCUMENTACAO; break
  }

  return {
    ...glosa,
    categoria,
    acaoSugerida: GlosaAcao.CONTATAR_OPERADORA,
    recursoAutomatico: false,
    status: 'pendente'
  }
}

/**
 * Processa um demonstrativo de retorno completo
 */
export function processarDemonstrativoRetorno(xml: string): {
  demonstrativo: TISSDemonstrativoRetorno | null
  glosas: GlosaProcessada[]
  acoesSugeridas: Map<GlosaAcao, GlosaProcessada[]>
} {
  // Extrai informações do demonstrativo
  const protocoloMatch = xml.match(/<(?:ans:)?numeroProtocolo>([^<]+)<\/(?:ans:)?numeroProtocolo>/i)
  const dataMatch = xml.match(/<(?:ans:)?dataProtocolo>([^<]+)<\/(?:ans:)?dataProtocolo>/i)
  const loteMatch = xml.match(/<(?:ans:)?numeroLote>([^<]+)<\/(?:ans:)?numeroLote>/i)
  const valorInformadoMatch = xml.match(/<(?:ans:)?valorTotalInformado>([^<]+)<\/(?:ans:)?valorTotalInformado>/i)
  const valorProcessadoMatch = xml.match(/<(?:ans:)?valorTotalProcessado>([^<]+)<\/(?:ans:)?valorTotalProcessado>/i)

  // Extrai glosas
  const glosas: GlosaProcessada[] = []
  const glosaRegex = /<(?:ans:)?glosa[^>]*>([\s\S]*?)<\/(?:ans:)?glosa>/gi
  let match

  while ((match = glosaRegex.exec(xml)) !== null) {
    const glosaContent = match[1]

    const codigoMatch = glosaContent.match(/<(?:ans:)?codigoGlosa>([^<]+)<\/(?:ans:)?codigoGlosa>/i)
    const descricaoMatch = glosaContent.match(/<(?:ans:)?descricaoGlosa>([^<]+)<\/(?:ans:)?descricaoGlosa>/i)
    const valorMatch = glosaContent.match(/<(?:ans:)?valorGlosa>([^<]+)<\/(?:ans:)?valorGlosa>/i)
    const sequencialMatch = glosaContent.match(/<(?:ans:)?sequencialItem>([^<]+)<\/(?:ans:)?sequencialItem>/i)
    const procedimentoMatch = glosaContent.match(/<(?:ans:)?codigoProcedimento>([^<]+)<\/(?:ans:)?codigoProcedimento>/i)

    if (codigoMatch) {
      const glosa: TISSGlosa = {
        codigo_glosa: codigoMatch[1],
        descricao_glosa: descricaoMatch?.[1] || '',
        valor_glosado: valorMatch ? parseFloat(valorMatch[1].replace(',', '.')) : 0,
        sequencial_item: sequencialMatch ? parseInt(sequencialMatch[1]) : undefined,
        codigo_procedimento: procedimentoMatch?.[1]
      }

      glosas.push(processarGlosa(glosa))
    }
  }

  // Agrupa glosas por ação sugerida
  const acoesSugeridas = new Map<GlosaAcao, GlosaProcessada[]>()
  for (const glosa of glosas) {
    if (!acoesSugeridas.has(glosa.acaoSugerida)) {
      acoesSugeridas.set(glosa.acaoSugerida, [])
    }
    acoesSugeridas.get(glosa.acaoSugerida)!.push(glosa)
  }

  // Determina tipo de retorno
  let tipoRetorno: 'aceito' | 'rejeitado' | 'parcial' = 'aceito'
  if (glosas.length > 0) {
    const valorGlosado = glosas.reduce((sum, g) => sum + g.valor_glosado, 0)
    const valorInformado = valorInformadoMatch
      ? parseFloat(valorInformadoMatch[1].replace(',', '.'))
      : 0

    if (valorGlosado >= valorInformado) {
      tipoRetorno = 'rejeitado'
    } else {
      tipoRetorno = 'parcial'
    }
  }

  const demonstrativo: TISSDemonstrativoRetorno | null = protocoloMatch ? {
    protocolo: {
      numero_protocolo: protocoloMatch[1],
      data_protocolo: dataMatch?.[1] || new Date().toISOString().split('T')[0],
      tipo_retorno: tipoRetorno
    },
    numero_lote: loteMatch?.[1] || '',
    data_envio: dataMatch?.[1] || '',
    quantidade_guias_aceitas: 0, // Seria contado do XML
    quantidade_guias_rejeitadas: glosas.length > 0 ? 1 : 0,
    valor_total_informado: valorInformadoMatch
      ? parseFloat(valorInformadoMatch[1].replace(',', '.'))
      : 0,
    valor_total_processado: valorProcessadoMatch
      ? parseFloat(valorProcessadoMatch[1].replace(',', '.'))
      : 0,
    glosas: glosas
  } : null

  return {
    demonstrativo,
    glosas,
    acoesSugeridas
  }
}

/**
 * Calcula estatísticas de glosas
 */
export function calcularEstatisticasGlosas(
  glosas: GlosaProcessada[]
): GlosaEstatisticas {
  const porCategoria: Record<GlosaCategoria, { quantidade: number; valor: number }> = {
    [GlosaCategoria.ADMINISTRATIVA]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.TECNICA]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.AUTORIZACAO]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.COBERTURA]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.DUPLICIDADE]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.VALOR]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.PRAZO]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.DOCUMENTACAO]: { quantidade: 0, valor: 0 },
    [GlosaCategoria.OUTROS]: { quantidade: 0, valor: 0 }
  }

  const codigosCount = new Map<string, { quantidade: number; valor: number; descricao: string }>()

  let totalGlosas = 0
  let valorTotalGlosado = 0
  let recursosEnviados = 0
  let resolvidas = 0

  for (const glosa of glosas) {
    totalGlosas++
    valorTotalGlosado += glosa.valor_glosado

    // Por categoria
    porCategoria[glosa.categoria].quantidade++
    porCategoria[glosa.categoria].valor += glosa.valor_glosado

    // Por código
    if (!codigosCount.has(glosa.codigo_glosa)) {
      codigosCount.set(glosa.codigo_glosa, {
        quantidade: 0,
        valor: 0,
        descricao: glosa.descricao_glosa
      })
    }
    const codigo = codigosCount.get(glosa.codigo_glosa)!
    codigo.quantidade++
    codigo.valor += glosa.valor_glosado

    // Status
    if (glosa.status === 'recurso_enviado') recursosEnviados++
    if (glosa.status === 'resolvida') resolvidas++
  }

  // Top 10 códigos
  const topCodigos = Array.from(codigosCount.entries())
    .map(([codigo, data]) => ({
      codigo,
      descricao: data.descricao,
      quantidade: data.quantidade,
      valor: data.valor
    }))
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 10)

  return {
    totalGlosas,
    valorTotalGlosado,
    porCategoria,
    topCodigos,
    taxaRecurso: totalGlosas > 0 ? (recursosEnviados / totalGlosas) * 100 : 0,
    taxaSucesso: recursosEnviados > 0 ? (resolvidas / recursosEnviados) * 100 : 0
  }
}

/**
 * Sugere ações prioritárias baseadas nas glosas
 */
export function sugerirAcoesPrioritarias(
  glosas: GlosaProcessada[]
): Array<{
  acao: GlosaAcao
  prioridade: 'alta' | 'media' | 'baixa'
  glosas: GlosaProcessada[]
  valorTotal: number
  descricao: string
}> {
  const acoes = new Map<GlosaAcao, GlosaProcessada[]>()

  for (const glosa of glosas) {
    if (glosa.status !== 'pendente') continue

    if (!acoes.has(glosa.acaoSugerida)) {
      acoes.set(glosa.acaoSugerida, [])
    }
    acoes.get(glosa.acaoSugerida)!.push(glosa)
  }

  const descricoes: Record<GlosaAcao, string> = {
    [GlosaAcao.REENVIAR]: 'Reenviar guias com correções automáticas',
    [GlosaAcao.CORRIGIR_CADASTRO]: 'Corrigir dados cadastrais e reenviar',
    [GlosaAcao.AUDITORIA_MEDICA]: 'Encaminhar para auditoria médica',
    [GlosaAcao.SOLICITAR_AUTORIZACAO]: 'Solicitar autorização prévia',
    [GlosaAcao.RECURSAR]: 'Preparar recurso de glosa',
    [GlosaAcao.ANEXAR_DOCUMENTOS]: 'Anexar documentação pendente',
    [GlosaAcao.CONTATAR_OPERADORA]: 'Contatar operadora para esclarecimentos',
    [GlosaAcao.ACEITAR]: 'Aceitar glosa (sem recurso viável)'
  }

  const prioridades: Record<GlosaAcao, 'alta' | 'media' | 'baixa'> = {
    [GlosaAcao.REENVIAR]: 'alta',
    [GlosaAcao.CORRIGIR_CADASTRO]: 'alta',
    [GlosaAcao.AUDITORIA_MEDICA]: 'media',
    [GlosaAcao.SOLICITAR_AUTORIZACAO]: 'media',
    [GlosaAcao.RECURSAR]: 'media',
    [GlosaAcao.ANEXAR_DOCUMENTOS]: 'media',
    [GlosaAcao.CONTATAR_OPERADORA]: 'baixa',
    [GlosaAcao.ACEITAR]: 'baixa'
  }

  return Array.from(acoes.entries())
    .map(([acao, glosasAcao]) => ({
      acao,
      prioridade: prioridades[acao],
      glosas: glosasAcao,
      valorTotal: glosasAcao.reduce((sum, g) => sum + g.valor_glosado, 0),
      descricao: descricoes[acao]
    }))
    .sort((a, b) => {
      // Ordena por prioridade e depois por valor
      const prioridadeOrder = { alta: 0, media: 1, baixa: 2 }
      if (prioridadeOrder[a.prioridade] !== prioridadeOrder[b.prioridade]) {
        return prioridadeOrder[a.prioridade] - prioridadeOrder[b.prioridade]
      }
      return b.valorTotal - a.valorTotal
    })
}

/**
 * Identifica glosas que podem ser resolvidas automaticamente
 */
export function identificarGlosasAutomatizaveis(
  glosas: GlosaProcessada[]
): {
  automatizaveis: GlosaProcessada[]
  manuais: GlosaProcessada[]
} {
  const automatizaveis: GlosaProcessada[] = []
  const manuais: GlosaProcessada[] = []

  for (const glosa of glosas) {
    if (glosa.recursoAutomatico) {
      automatizaveis.push(glosa)
    } else {
      manuais.push(glosa)
    }
  }

  return { automatizaveis, manuais }
}

/**
 * Busca código de glosa na Tabela 38
 */
export function buscarCodigoGlosa(codigo: string): CodigoGlosa | null {
  return TABELA_38[codigo] || null
}

/**
 * Lista todos os códigos de uma categoria
 */
export function listarCodigosPorCategoria(categoria: GlosaCategoria): CodigoGlosa[] {
  return Object.values(TABELA_38).filter(c => c.categoria === categoria)
}
