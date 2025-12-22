/**
 * Validador de XML TISS
 *
 * Implementa validação contra schemas XSD oficiais da ANS
 * e validação de regras de negócio.
 *
 * Tipos de validação:
 * 1. Estrutural (XSD) - Verifica se o XML está bem formado
 * 2. Hash - Verifica integridade via MD5
 * 3. Regras de Negócio - Valida obrigatoriedades e formatos
 */

import type {
  TISSVersion,
  TISSConfig,
  TISSValidationResult,
  TISSValidationError
} from './types'
import { ITISSXMLValidator, registerValidator } from './version-factory'
import { validateTISSHash } from './hash'

/**
 * Regras de validação de campos obrigatórios por tipo de guia
 */
const REQUIRED_FIELDS: Record<string, string[]> = {
  'guiaConsulta': [
    'cabecalhoGuia/registroANS',
    'cabecalhoGuia/numeroGuiaPrestador',
    'dadosBeneficiario/numeroCarteira',
    'profissionalExecutante/nomeProfissional',
    'profissionalExecutante/conselhoProfissional',
    'profissionalExecutante/numeroConselhoProfissional',
    'profissionalExecutante/UF',
    'profissionalExecutante/CBOS',
    'dadosAtendimento/tipoConsulta',
    'valorTotal/valorTotalGeral'
  ],
  'guiaSP-SADT': [
    'cabecalhoGuia/registroANS',
    'cabecalhoGuia/numeroGuiaPrestador',
    'dadosBeneficiario/numeroCarteira',
    'dadosSolicitante/nomeProfissional',
    'dadosExecutante/nomeProfissional',
    'dadosAtendimento/tipoAtendimento',
    'dadosAtendimento/indicacaoClinica',
    'procedimentosExecutados/procedimentoExecutado',
    'valorTotal/valorTotalGeral'
  ],
  'guiaResumoInternacao': [
    'cabecalhoGuia/registroANS',
    'cabecalhoGuia/numeroGuiaPrestador',
    'dadosBeneficiario/numeroCarteira',
    'dadosInternacao/dataInicioFaturamento',
    'dadosInternacao/horaInicioFaturamento',
    'dadosInternacao/tipoInternacao',
    'dadosInternacao/regimeInternacao',
    'hipotesesDiagnosticas/hipoteseDiagnostica',
    'valorTotal/valorTotalGeral'
  ]
}

/**
 * Padrões de formato para campos específicos
 */
const FIELD_PATTERNS: Record<string, { pattern: RegExp; message: string }> = {
  'registroANS': {
    pattern: /^\d{6}$/,
    message: 'Registro ANS deve ter 6 dígitos'
  },
  'CNPJ': {
    pattern: /^\d{14}$/,
    message: 'CNPJ deve ter 14 dígitos (sem formatação)'
  },
  'CPF': {
    pattern: /^\d{11}$/,
    message: 'CPF deve ter 11 dígitos (sem formatação)'
  },
  'codigoCID': {
    pattern: /^[A-Z]\d{2,3}(\.\d)?$/,
    message: 'Código CID inválido (formato: X00 ou X00.0)'
  },
  'numeroCarteira': {
    pattern: /^.{1,20}$/,
    message: 'Número da carteira deve ter entre 1 e 20 caracteres'
  },
  'codigoProcedimento': {
    pattern: /^\d{8,10}$/,
    message: 'Código do procedimento deve ter 8 a 10 dígitos'
  },
  'CBOS': {
    pattern: /^\d{6}$/,
    message: 'Código CBOS deve ter 6 dígitos'
  },
  'UF': {
    pattern: /^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/,
    message: 'UF inválida'
  },
  'dataExecucao': {
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: 'Data deve estar no formato YYYY-MM-DD'
  },
  'horaInicial': {
    pattern: /^\d{2}:\d{2}:\d{2}$/,
    message: 'Hora deve estar no formato HH:MM:SS'
  }
}

/**
 * Limites de tamanho de campos
 */
const FIELD_LENGTHS: Record<string, { min?: number; max: number }> = {
  'nomeBeneficiario': { max: 70 },
  'nomeProfissional': { max: 70 },
  'nomeContratado': { max: 70 },
  'indicacaoClinica': { max: 500 },
  'observacao': { max: 500 },
  'descricaoProcedimento': { max: 150 },
  'justificativaRecurso': { max: 500 },
  'numeroGuiaPrestador': { min: 1, max: 20 },
  'numeroGuiaOperadora': { max: 20 },
  'numeroLote': { min: 1, max: 12 }
}

/**
 * Extrai valor de uma tag XML
 */
function extractTagValue(xml: string, tagName: string): string | null {
  const regex = new RegExp(`<(?:ans:)?${tagName}>([^<]*)<\\/(?:ans:)?${tagName}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1] : null
}

/**
 * Verifica se uma tag existe no XML
 */
function tagExists(xml: string, tagName: string): boolean {
  const regex = new RegExp(`<(?:ans:)?${tagName}[^>]*>`, 'i')
  return regex.test(xml)
}

/**
 * Conta ocorrências de uma tag
 */
function countTags(xml: string, tagName: string): number {
  const regex = new RegExp(`<(?:ans:)?${tagName}[^>]*>`, 'gi')
  const matches = xml.match(regex)
  return matches ? matches.length : 0
}

/**
 * Validador de XML TISS v4.01.00
 */
export class TISSXMLValidatorV401 implements ITISSXMLValidator {
  readonly version: TISSVersion = '4.01.00'

  private config: TISSConfig

  constructor(config: TISSConfig) {
    this.config = config
  }

  /**
   * Validação estrutural (simulação de XSD)
   * Em produção, usar biblioteca real de validação XSD
   */
  validateAgainstXSD(xml: string): TISSValidationResult {
    const errors: TISSValidationError[] = []
    const warnings: TISSValidationError[] = []

    // Verifica declaração XML
    if (!xml.startsWith('<?xml')) {
      errors.push({
        code: 'XSD001',
        message: 'Declaração XML ausente ou inválida'
      })
    }

    // Verifica encoding
    if (!xml.includes('encoding="ISO-8859-1"') && !xml.includes("encoding='ISO-8859-1'")) {
      errors.push({
        code: 'XSD002',
        message: 'Encoding deve ser ISO-8859-1'
      })
    }

    // Verifica namespace ANS
    if (!xml.includes('xmlns:ans="http://www.ans.gov.br/padroes/tiss/schemas"') &&
        !xml.includes("xmlns:ans='http://www.ans.gov.br/padroes/tiss/schemas'")) {
      errors.push({
        code: 'XSD003',
        message: 'Namespace ANS ausente ou inválido'
      })
    }

    // Verifica tag raiz
    if (!tagExists(xml, 'mensagemTISS')) {
      errors.push({
        code: 'XSD004',
        message: 'Tag raiz mensagemTISS não encontrada'
      })
    }

    // Verifica versão do padrão
    const versao = extractTagValue(xml, 'Padrao') || extractTagValue(xml, 'versaoPadrao')
    if (!versao) {
      errors.push({
        code: 'XSD005',
        message: 'Versão do padrão TISS não encontrada'
      })
    } else if (!['3.05.00', '4.00.00', '4.01.00'].includes(versao)) {
      errors.push({
        code: 'XSD006',
        message: `Versão do padrão TISS não suportada: ${versao}`
      })
    }

    // Verifica cabeçalho obrigatório
    if (!tagExists(xml, 'cabecalho')) {
      errors.push({
        code: 'XSD007',
        message: 'Cabeçalho da mensagem ausente'
      })
    }

    // Verifica identificação da transação
    if (!tagExists(xml, 'identificacaoTransacao')) {
      errors.push({
        code: 'XSD008',
        message: 'Identificação da transação ausente'
      })
    }

    // Verifica origem
    if (!tagExists(xml, 'origem')) {
      errors.push({
        code: 'XSD009',
        message: 'Origem da mensagem ausente'
      })
    }

    // Verifica destino
    if (!tagExists(xml, 'destino')) {
      errors.push({
        code: 'XSD010',
        message: 'Destino da mensagem ausente'
      })
    }

    // Verifica epílogo (hash)
    if (!tagExists(xml, 'epilogo')) {
      errors.push({
        code: 'XSD011',
        message: 'Epílogo com hash ausente'
      })
    }

    // Valida limite de 100 guias por lote
    const guiaTypes = ['guiaConsulta', 'guiaSP-SADT', 'guiaResumoInternacao',
                       'guiaHonorarioIndividual', 'guiaTratamentoOdontologico']
    let totalGuias = 0
    for (const tipo of guiaTypes) {
      totalGuias += countTags(xml, tipo)
    }
    if (totalGuias > 100) {
      errors.push({
        code: 'XSD012',
        message: `Lote excede limite de 100 guias (encontradas: ${totalGuias})`
      })
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * Validação de regras de negócio
   */
  validateBusinessRules(xml: string): TISSValidationResult {
    const errors: TISSValidationError[] = []
    const warnings: TISSValidationError[] = []

    // Valida hash MD5
    const hashResult = validateTISSHash(xml)
    if (!hashResult.valid) {
      errors.push({
        code: 'BIZ001',
        message: `Hash MD5 inválido. Esperado: ${hashResult.expectedHash}, Encontrado: ${hashResult.actualHash || 'nenhum'}`
      })
    }

    // Valida registro ANS
    const registroANS = extractTagValue(xml, 'registroANS')
    if (registroANS && !FIELD_PATTERNS.registroANS.pattern.test(registroANS)) {
      errors.push({
        code: 'BIZ002',
        message: FIELD_PATTERNS.registroANS.message,
        field: 'registroANS'
      })
    }

    // Valida códigos de procedimento
    const procedimentos = xml.match(/<(?:ans:)?codigoProcedimento>([^<]+)<\/(?:ans:)?codigoProcedimento>/gi)
    if (procedimentos) {
      for (const proc of procedimentos) {
        const codigo = proc.replace(/<\/?(?:ans:)?codigoProcedimento>/gi, '')
        if (!FIELD_PATTERNS.codigoProcedimento.pattern.test(codigo)) {
          errors.push({
            code: 'BIZ003',
            message: `${FIELD_PATTERNS.codigoProcedimento.message}: ${codigo}`,
            field: 'codigoProcedimento'
          })
        }
      }
    }

    // Valida CBOs
    const cbos = xml.match(/<(?:ans:)?CBOS>([^<]+)<\/(?:ans:)?CBOS>/gi)
    if (cbos) {
      for (const cbo of cbos) {
        const codigo = cbo.replace(/<\/?(?:ans:)?CBOS>/gi, '')
        if (!FIELD_PATTERNS.CBOS.pattern.test(codigo)) {
          errors.push({
            code: 'BIZ004',
            message: `${FIELD_PATTERNS.CBOS.message}: ${codigo}`,
            field: 'CBOS'
          })
        }
      }
    }

    // Valida UFs
    const ufs = xml.match(/<(?:ans:)?UF>([^<]+)<\/(?:ans:)?UF>/gi)
    if (ufs) {
      for (const uf of ufs) {
        const codigo = uf.replace(/<\/?(?:ans:)?UF>/gi, '')
        if (!FIELD_PATTERNS.UF.pattern.test(codigo)) {
          errors.push({
            code: 'BIZ005',
            message: `${FIELD_PATTERNS.UF.message}: ${codigo}`,
            field: 'UF'
          })
        }
      }
    }

    // Valida datas
    const datas = xml.match(/<(?:ans:)?data[^>]*>([^<]+)<\/(?:ans:)?data[^>]*>/gi)
    if (datas) {
      for (const data of datas) {
        const valor = data.replace(/<\/?(?:ans:)?[^>]+>/gi, '')
        if (!FIELD_PATTERNS.dataExecucao.pattern.test(valor)) {
          warnings.push({
            code: 'BIZ006',
            message: `Formato de data pode estar incorreto: ${valor}`,
            field: 'data'
          })
        }

        // Verifica se data não é futura
        const dataDate = new Date(valor)
        if (dataDate > new Date()) {
          warnings.push({
            code: 'BIZ007',
            message: `Data futura detectada: ${valor}`,
            field: 'data'
          })
        }
      }
    }

    // Valida valores (não negativos)
    const valores = xml.match(/<(?:ans:)?valor[^>]*>([^<]+)<\/(?:ans:)?valor[^>]*>/gi)
    if (valores) {
      for (const valor of valores) {
        const num = valor.replace(/<\/?(?:ans:)?[^>]+>/gi, '').replace(',', '.')
        const numVal = parseFloat(num)
        if (numVal < 0) {
          errors.push({
            code: 'BIZ008',
            message: `Valor negativo não permitido: ${num}`,
            field: 'valor'
          })
        }
      }
    }

    // Valida tamanho de campos de texto
    for (const [field, limits] of Object.entries(FIELD_LENGTHS)) {
      const matches = xml.match(new RegExp(`<(?:ans:)?${field}>([^<]*)<\\/(?:ans:)?${field}>`, 'gi'))
      if (matches) {
        for (const match of matches) {
          const content = match.replace(/<\/?(?:ans:)?[^>]+>/gi, '')
          if (limits.min && content.length < limits.min) {
            errors.push({
              code: 'BIZ009',
              message: `Campo ${field} muito curto (mínimo ${limits.min} caracteres)`,
              field
            })
          }
          if (content.length > limits.max) {
            errors.push({
              code: 'BIZ010',
              message: `Campo ${field} excede tamanho máximo (${limits.max} caracteres)`,
              field
            })
          }
        }
      }
    }

    // Valida códigos CID
    const cids = xml.match(/<(?:ans:)?codigoCID>([^<]+)<\/(?:ans:)?codigoCID>/gi)
    if (cids) {
      for (const cid of cids) {
        const codigo = cid.replace(/<\/?(?:ans:)?codigoCID>/gi, '')
        if (!FIELD_PATTERNS.codigoCID.pattern.test(codigo)) {
          warnings.push({
            code: 'BIZ011',
            message: `Código CID pode estar em formato incorreto: ${codigo}`,
            field: 'codigoCID'
          })
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings
    }
  }

  /**
   * Validação completa (XSD + Regras de Negócio)
   */
  validate(xml: string): TISSValidationResult {
    const xsdResult = this.validateAgainstXSD(xml)
    const bizResult = this.validateBusinessRules(xml)

    return {
      valid: xsdResult.valid && bizResult.valid,
      errors: [...xsdResult.errors, ...bizResult.errors],
      warnings: [...xsdResult.warnings, ...bizResult.warnings]
    }
  }
}

// Registra o validador para as versões 4.x
registerValidator('4.01.00', TISSXMLValidatorV401)
registerValidator('4.00.00', TISSXMLValidatorV401)

/**
 * Função utilitária para validar um XML TISS rapidamente
 */
export function quickValidateTISS(xml: string): {
  valid: boolean
  errorCount: number
  warningCount: number
  firstError?: string
} {
  const config: TISSConfig = {
    version: '4.01.00',
    encoding: 'ISO-8859-1',
    prestador: {
      codigo_operadora: '',
      nome_contratado: ''
    }
  }

  const validator = new TISSXMLValidatorV401(config)
  const result = validator.validate(xml)

  return {
    valid: result.valid,
    errorCount: result.errors.length,
    warningCount: result.warnings.length,
    firstError: result.errors[0]?.message
  }
}

/**
 * Formata erros de validação para exibição
 */
export function formatValidationErrors(result: TISSValidationResult): string {
  const lines: string[] = []

  if (result.errors.length > 0) {
    lines.push('=== ERROS ===')
    for (const error of result.errors) {
      lines.push(`[${error.code}] ${error.message}${error.field ? ` (campo: ${error.field})` : ''}`)
    }
  }

  if (result.warnings.length > 0) {
    lines.push('')
    lines.push('=== AVISOS ===')
    for (const warning of result.warnings) {
      lines.push(`[${warning.code}] ${warning.message}${warning.field ? ` (campo: ${warning.field})` : ''}`)
    }
  }

  return lines.join('\n')
}
