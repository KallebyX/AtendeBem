/**
 * Validador de NFe/NFSe - Padrão OURO Nacional
 *
 * Validações completas conforme:
 * - Manual de Orientação do Contribuinte (MOC) NFe versão 7.0
 * - Padrão ABRASF NFSe versão 2.04
 * - Legislação fiscal brasileira
 *
 * @author Sistema AtendeBem
 * @version 2.0.0
 */

import { validateCPF, validateCNPJ, validateIE, UF_CODES } from './fiscal-utils'

// ============================================================================
// TIPOS
// ============================================================================

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning' | 'info'
  code?: string
}

export interface ValidationResult {
  isValid: boolean
  canProceed: boolean // Pode prosseguir mesmo com warnings
  errors: ValidationError[]
  warnings: ValidationError[]
  infos: ValidationError[]
  summary: string
}

export interface PreSubmissionData {
  // Tipo de documento
  documentType: 'nfse' | 'nfe'

  // Emitente
  emitter: {
    cnpj: string
    ie?: string
    im?: string
    razaoSocial: string
    nomeFantasia?: string
    regimeTributario: '1' | '2' | '3' // 1=SN, 2=SN Excesso, 3=Normal
    crt?: string
    optanteSimplesNacional?: boolean
    endereco: {
      logradouro: string
      numero: string
      bairro: string
      codigoMunicipio: string
      municipio: string
      uf: string
      cep: string
    }
  }

  // Destinatário/Tomador
  recipient: {
    cpfCnpj: string
    nome: string
    ie?: string
    email?: string
    endereco?: {
      logradouro: string
      numero: string
      bairro: string
      codigoMunicipio: string
      municipio: string
      uf: string
      cep: string
    }
  }

  // Serviços/Produtos
  items: Array<{
    codigo: string
    descricao: string
    quantidade: number
    valorUnitario: number
    valorTotal: number
    lc116Code?: string // Para serviços
    ncm?: string // Para produtos
    cfop?: string
  }>

  // Valores
  values: {
    valorServicos: number
    valorProdutos: number
    valorDesconto: number
    valorDeducoes: number
    valorTotal: number
    aliquotaISS?: number
    valorISS?: number
  }

  // Certificado
  certificate?: {
    hasValidCertificate: boolean
    expiresAt?: string
    daysToExpire?: number
  }

  // Ambiente
  environment: 'sandbox' | 'production'
}

// ============================================================================
// VALIDADOR PRINCIPAL
// ============================================================================

export function validatePreSubmission(data: PreSubmissionData): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []
  const infos: ValidationError[] = []

  // 1. Validações do Emitente
  validateEmitter(data.emitter, errors, warnings)

  // 2. Validações do Destinatário/Tomador
  validateRecipient(data.recipient, errors, warnings, infos)

  // 3. Validações dos Itens
  validateItems(data.items, data.documentType, errors, warnings)

  // 4. Validações dos Valores
  validateValues(data.values, data.documentType, errors, warnings)

  // 5. Validações do Certificado
  if (data.environment === 'production') {
    validateCertificate(data.certificate, errors, warnings)
  }

  // 6. Validações específicas por tipo
  if (data.documentType === 'nfse') {
    validateNFSeSpecific(data, errors, warnings)
  } else {
    validateNFeSpecific(data, errors, warnings)
  }

  // Construir resultado
  const isValid = errors.length === 0
  const canProceed = isValid || (errors.length === 0 && warnings.every(w => !w.code?.startsWith('BLOCK')))

  let summary = ''
  if (isValid && warnings.length === 0) {
    summary = 'Documento válido e pronto para envio'
  } else if (isValid) {
    summary = `Documento válido com ${warnings.length} aviso(s)`
  } else {
    summary = `Documento inválido: ${errors.length} erro(s) encontrado(s)`
  }

  return {
    isValid,
    canProceed,
    errors,
    warnings,
    infos,
    summary
  }
}

// ============================================================================
// VALIDAÇÕES DO EMITENTE
// ============================================================================

function validateEmitter(
  emitter: PreSubmissionData['emitter'],
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // CNPJ obrigatório
  if (!emitter.cnpj) {
    errors.push({
      field: 'emitter.cnpj',
      message: 'CNPJ do emitente é obrigatório',
      severity: 'error',
      code: 'E001'
    })
  } else {
    const cnpjClean = emitter.cnpj.replace(/[^\d]/g, '')
    if (cnpjClean.length !== 14) {
      errors.push({
        field: 'emitter.cnpj',
        message: 'CNPJ deve conter 14 dígitos',
        severity: 'error',
        code: 'E002'
      })
    } else if (!validateCNPJ(cnpjClean)) {
      errors.push({
        field: 'emitter.cnpj',
        message: 'CNPJ inválido (dígito verificador incorreto)',
        severity: 'error',
        code: 'E003'
      })
    }
  }

  // Razão Social
  if (!emitter.razaoSocial || emitter.razaoSocial.trim().length < 3) {
    errors.push({
      field: 'emitter.razaoSocial',
      message: 'Razão Social é obrigatória (mínimo 3 caracteres)',
      severity: 'error',
      code: 'E004'
    })
  } else if (emitter.razaoSocial.length > 60) {
    warnings.push({
      field: 'emitter.razaoSocial',
      message: 'Razão Social muito longa (máximo recomendado: 60 caracteres)',
      severity: 'warning',
      code: 'W001'
    })
  }

  // Inscrição Estadual (para NFe)
  if (emitter.ie) {
    const ieClean = emitter.ie.replace(/[^\d]/g, '')
    if (ieClean !== 'ISENTO' && ieClean.length > 0) {
      if (!validateIE(ieClean, emitter.endereco.uf)) {
        warnings.push({
          field: 'emitter.ie',
          message: `Inscrição Estadual com formato inválido para ${emitter.endereco.uf}`,
          severity: 'warning',
          code: 'W002'
        })
      }
    }
  }

  // Inscrição Municipal (para NFSe)
  if (!emitter.im || emitter.im.trim().length === 0) {
    warnings.push({
      field: 'emitter.im',
      message: 'Inscrição Municipal não informada (obrigatória para NFSe)',
      severity: 'warning',
      code: 'W003'
    })
  }

  // Endereço
  validateAddress(emitter.endereco, 'emitter.endereco', errors, warnings, true)

  // Regime Tributário
  if (!['1', '2', '3'].includes(emitter.regimeTributario)) {
    errors.push({
      field: 'emitter.regimeTributario',
      message: 'Regime Tributário inválido (deve ser 1, 2 ou 3)',
      severity: 'error',
      code: 'E005'
    })
  }
}

// ============================================================================
// VALIDAÇÕES DO DESTINATÁRIO/TOMADOR
// ============================================================================

function validateRecipient(
  recipient: PreSubmissionData['recipient'],
  errors: ValidationError[],
  warnings: ValidationError[],
  infos: ValidationError[]
): void {
  // CPF/CNPJ obrigatório
  if (!recipient.cpfCnpj) {
    errors.push({
      field: 'recipient.cpfCnpj',
      message: 'CPF/CNPJ do destinatário/tomador é obrigatório',
      severity: 'error',
      code: 'E010'
    })
  } else {
    const docClean = recipient.cpfCnpj.replace(/[^\d]/g, '')

    if (docClean.length === 11) {
      // CPF
      if (!validateCPF(docClean)) {
        errors.push({
          field: 'recipient.cpfCnpj',
          message: 'CPF inválido (dígito verificador incorreto)',
          severity: 'error',
          code: 'E011'
        })
      }
    } else if (docClean.length === 14) {
      // CNPJ
      if (!validateCNPJ(docClean)) {
        errors.push({
          field: 'recipient.cpfCnpj',
          message: 'CNPJ inválido (dígito verificador incorreto)',
          severity: 'error',
          code: 'E012'
        })
      }
    } else {
      errors.push({
        field: 'recipient.cpfCnpj',
        message: 'Documento deve ser CPF (11 dígitos) ou CNPJ (14 dígitos)',
        severity: 'error',
        code: 'E013'
      })
    }
  }

  // Nome
  if (!recipient.nome || recipient.nome.trim().length < 2) {
    errors.push({
      field: 'recipient.nome',
      message: 'Nome do destinatário/tomador é obrigatório (mínimo 2 caracteres)',
      severity: 'error',
      code: 'E014'
    })
  }

  // Email (recomendado)
  if (!recipient.email) {
    infos.push({
      field: 'recipient.email',
      message: 'Email do destinatário não informado (recomendado para envio automático)',
      severity: 'info',
      code: 'I001'
    })
  } else if (!isValidEmail(recipient.email)) {
    warnings.push({
      field: 'recipient.email',
      message: 'Email do destinatário com formato inválido',
      severity: 'warning',
      code: 'W010'
    })
  }

  // Endereço (opcional mas recomendado)
  if (recipient.endereco) {
    validateAddress(recipient.endereco, 'recipient.endereco', errors, warnings, false)
  } else {
    infos.push({
      field: 'recipient.endereco',
      message: 'Endereço do destinatário não informado',
      severity: 'info',
      code: 'I002'
    })
  }
}

// ============================================================================
// VALIDAÇÕES DE ENDEREÇO
// ============================================================================

function validateAddress(
  endereco: PreSubmissionData['emitter']['endereco'],
  prefix: string,
  errors: ValidationError[],
  warnings: ValidationError[],
  required: boolean
): void {
  if (!endereco) {
    if (required) {
      errors.push({
        field: prefix,
        message: 'Endereço é obrigatório',
        severity: 'error',
        code: 'E020'
      })
    }
    return
  }

  // Logradouro
  if (!endereco.logradouro || endereco.logradouro.trim().length < 3) {
    if (required) {
      errors.push({
        field: `${prefix}.logradouro`,
        message: 'Logradouro é obrigatório (mínimo 3 caracteres)',
        severity: 'error',
        code: 'E021'
      })
    }
  }

  // Número
  if (!endereco.numero || endereco.numero.trim().length === 0) {
    if (required) {
      errors.push({
        field: `${prefix}.numero`,
        message: 'Número é obrigatório (use "S/N" se não houver)',
        severity: 'error',
        code: 'E022'
      })
    }
  }

  // Bairro
  if (!endereco.bairro || endereco.bairro.trim().length < 2) {
    if (required) {
      errors.push({
        field: `${prefix}.bairro`,
        message: 'Bairro é obrigatório',
        severity: 'error',
        code: 'E023'
      })
    }
  }

  // Município
  if (!endereco.municipio || endereco.municipio.trim().length < 2) {
    if (required) {
      errors.push({
        field: `${prefix}.municipio`,
        message: 'Município é obrigatório',
        severity: 'error',
        code: 'E024'
      })
    }
  }

  // Código do Município IBGE
  if (!endereco.codigoMunicipio) {
    if (required) {
      errors.push({
        field: `${prefix}.codigoMunicipio`,
        message: 'Código IBGE do município é obrigatório',
        severity: 'error',
        code: 'E025'
      })
    }
  } else {
    const codMun = endereco.codigoMunicipio.replace(/[^\d]/g, '')
    if (codMun.length !== 7) {
      errors.push({
        field: `${prefix}.codigoMunicipio`,
        message: 'Código IBGE do município deve ter 7 dígitos',
        severity: 'error',
        code: 'E026'
      })
    }
  }

  // UF
  if (!endereco.uf) {
    if (required) {
      errors.push({
        field: `${prefix}.uf`,
        message: 'UF é obrigatória',
        severity: 'error',
        code: 'E027'
      })
    }
  } else if (!UF_CODES[endereco.uf.toUpperCase()]) {
    errors.push({
      field: `${prefix}.uf`,
      message: 'UF inválida',
      severity: 'error',
      code: 'E028'
    })
  }

  // CEP
  if (!endereco.cep) {
    if (required) {
      errors.push({
        field: `${prefix}.cep`,
        message: 'CEP é obrigatório',
        severity: 'error',
        code: 'E029'
      })
    }
  } else {
    const cepClean = endereco.cep.replace(/[^\d]/g, '')
    if (cepClean.length !== 8) {
      errors.push({
        field: `${prefix}.cep`,
        message: 'CEP deve ter 8 dígitos',
        severity: 'error',
        code: 'E030'
      })
    }
  }
}

// ============================================================================
// VALIDAÇÕES DOS ITENS
// ============================================================================

function validateItems(
  items: PreSubmissionData['items'],
  documentType: 'nfse' | 'nfe',
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  if (!items || items.length === 0) {
    errors.push({
      field: 'items',
      message: 'Deve haver pelo menos um item/serviço',
      severity: 'error',
      code: 'E040'
    })
    return
  }

  items.forEach((item, idx) => {
    const itemNum = idx + 1

    // Descrição
    if (!item.descricao || item.descricao.trim().length < 3) {
      errors.push({
        field: `items[${idx}].descricao`,
        message: `Item ${itemNum}: Descrição é obrigatória (mínimo 3 caracteres)`,
        severity: 'error',
        code: 'E041'
      })
    }

    // Quantidade
    if (!item.quantidade || item.quantidade <= 0) {
      errors.push({
        field: `items[${idx}].quantidade`,
        message: `Item ${itemNum}: Quantidade deve ser maior que zero`,
        severity: 'error',
        code: 'E042'
      })
    }

    // Valor unitário
    if (item.valorUnitario === undefined || item.valorUnitario < 0) {
      errors.push({
        field: `items[${idx}].valorUnitario`,
        message: `Item ${itemNum}: Valor unitário não pode ser negativo`,
        severity: 'error',
        code: 'E043'
      })
    }

    // Valor total
    if (!item.valorTotal || item.valorTotal <= 0) {
      errors.push({
        field: `items[${idx}].valorTotal`,
        message: `Item ${itemNum}: Valor total deve ser maior que zero`,
        severity: 'error',
        code: 'E044'
      })
    }

    // Validar cálculo do valor total
    const calculatedTotal = (item.quantidade || 0) * (item.valorUnitario || 0)
    const tolerance = 0.01 // 1 centavo de tolerância
    if (Math.abs(calculatedTotal - item.valorTotal) > tolerance) {
      warnings.push({
        field: `items[${idx}].valorTotal`,
        message: `Item ${itemNum}: Valor total (${item.valorTotal.toFixed(2)}) difere do calculado (${calculatedTotal.toFixed(2)})`,
        severity: 'warning',
        code: 'W040'
      })
    }

    // Validações específicas para NFSe
    if (documentType === 'nfse') {
      if (!item.lc116Code) {
        warnings.push({
          field: `items[${idx}].lc116Code`,
          message: `Item ${itemNum}: Código LC 116 não informado (recomendado)`,
          severity: 'warning',
          code: 'W041'
        })
      } else if (!isValidLC116Code(item.lc116Code)) {
        errors.push({
          field: `items[${idx}].lc116Code`,
          message: `Item ${itemNum}: Código LC 116 inválido (formato: X.XX)`,
          severity: 'error',
          code: 'E045'
        })
      }
    }

    // Validações específicas para NFe
    if (documentType === 'nfe') {
      if (!item.ncm) {
        errors.push({
          field: `items[${idx}].ncm`,
          message: `Item ${itemNum}: NCM é obrigatório`,
          severity: 'error',
          code: 'E046'
        })
      } else {
        const ncmClean = item.ncm.replace(/[^\d]/g, '')
        if (ncmClean.length !== 8) {
          errors.push({
            field: `items[${idx}].ncm`,
            message: `Item ${itemNum}: NCM deve ter 8 dígitos`,
            severity: 'error',
            code: 'E047'
          })
        }
      }

      if (!item.cfop) {
        errors.push({
          field: `items[${idx}].cfop`,
          message: `Item ${itemNum}: CFOP é obrigatório`,
          severity: 'error',
          code: 'E048'
        })
      } else {
        const cfopClean = item.cfop.replace(/[^\d]/g, '')
        if (cfopClean.length !== 4) {
          errors.push({
            field: `items[${idx}].cfop`,
            message: `Item ${itemNum}: CFOP deve ter 4 dígitos`,
            severity: 'error',
            code: 'E049'
          })
        }
      }
    }
  })
}

// ============================================================================
// VALIDAÇÕES DOS VALORES
// ============================================================================

function validateValues(
  values: PreSubmissionData['values'],
  documentType: 'nfse' | 'nfe',
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // Valor total
  if (!values.valorTotal || values.valorTotal <= 0) {
    errors.push({
      field: 'values.valorTotal',
      message: 'Valor total deve ser maior que zero',
      severity: 'error',
      code: 'E050'
    })
  }

  // Validar consistência dos valores
  const valorBase = documentType === 'nfse' ? values.valorServicos : values.valorProdutos
  const valorCalculado = valorBase - (values.valorDesconto || 0) - (values.valorDeducoes || 0)

  if (Math.abs(valorCalculado - values.valorTotal) > 0.01) {
    warnings.push({
      field: 'values.valorTotal',
      message: `Valor total (${values.valorTotal.toFixed(2)}) difere do calculado (${valorCalculado.toFixed(2)})`,
      severity: 'warning',
      code: 'W050'
    })
  }

  // Validações específicas para NFSe
  if (documentType === 'nfse') {
    // Alíquota ISS
    if (values.aliquotaISS !== undefined) {
      if (values.aliquotaISS < 2) {
        errors.push({
          field: 'values.aliquotaISS',
          message: 'Alíquota ISS mínima é 2% (Lei Complementar 116/2003)',
          severity: 'error',
          code: 'E051'
        })
      } else if (values.aliquotaISS > 5) {
        errors.push({
          field: 'values.aliquotaISS',
          message: 'Alíquota ISS máxima é 5% (Lei Complementar 116/2003)',
          severity: 'error',
          code: 'E052'
        })
      }
    }

    // Valor ISS
    if (values.valorISS !== undefined && values.aliquotaISS !== undefined) {
      const baseCalculo = values.valorServicos - (values.valorDeducoes || 0)
      const issCalculado = baseCalculo * (values.aliquotaISS / 100)
      if (Math.abs(issCalculado - values.valorISS) > 0.01) {
        warnings.push({
          field: 'values.valorISS',
          message: `Valor ISS (${values.valorISS.toFixed(2)}) difere do calculado (${issCalculado.toFixed(2)})`,
          severity: 'warning',
          code: 'W051'
        })
      }
    }
  }

  // Valores negativos
  if (values.valorDesconto && values.valorDesconto < 0) {
    errors.push({
      field: 'values.valorDesconto',
      message: 'Valor de desconto não pode ser negativo',
      severity: 'error',
      code: 'E053'
    })
  }

  if (values.valorDeducoes && values.valorDeducoes < 0) {
    errors.push({
      field: 'values.valorDeducoes',
      message: 'Valor de deduções não pode ser negativo',
      severity: 'error',
      code: 'E054'
    })
  }

  // Desconto maior que o valor
  if (values.valorDesconto && values.valorDesconto > valorBase) {
    errors.push({
      field: 'values.valorDesconto',
      message: 'Desconto não pode ser maior que o valor dos serviços/produtos',
      severity: 'error',
      code: 'E055'
    })
  }
}

// ============================================================================
// VALIDAÇÕES DO CERTIFICADO
// ============================================================================

function validateCertificate(
  certificate: PreSubmissionData['certificate'] | undefined,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  if (!certificate) {
    errors.push({
      field: 'certificate',
      message: 'Certificado digital não configurado',
      severity: 'error',
      code: 'E060'
    })
    return
  }

  if (!certificate.hasValidCertificate) {
    errors.push({
      field: 'certificate',
      message: 'Certificado digital inválido ou não encontrado',
      severity: 'error',
      code: 'E061'
    })
    return
  }

  if (certificate.daysToExpire !== undefined) {
    if (certificate.daysToExpire <= 0) {
      errors.push({
        field: 'certificate',
        message: 'Certificado digital expirado',
        severity: 'error',
        code: 'E062'
      })
    } else if (certificate.daysToExpire <= 30) {
      warnings.push({
        field: 'certificate',
        message: `Certificado digital expira em ${certificate.daysToExpire} dias`,
        severity: 'warning',
        code: 'W060'
      })
    }
  }
}

// ============================================================================
// VALIDAÇÕES ESPECÍFICAS NFSe
// ============================================================================

function validateNFSeSpecific(
  data: PreSubmissionData,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // IM obrigatória para NFSe
  if (!data.emitter.im || data.emitter.im.trim().length === 0) {
    errors.push({
      field: 'emitter.im',
      message: 'Inscrição Municipal é obrigatória para emissão de NFSe',
      severity: 'error',
      code: 'E070'
    })
  }

  // Verificar se todos os itens têm código LC 116
  const semCodigoLC116 = data.items.filter(item => !item.lc116Code)
  if (semCodigoLC116.length > 0) {
    warnings.push({
      field: 'items',
      message: `${semCodigoLC116.length} item(ns) sem código LC 116 informado`,
      severity: 'warning',
      code: 'W070'
    })
  }

  // Valor mínimo para emissão (alguns municípios exigem)
  if (data.values.valorServicos < 1) {
    warnings.push({
      field: 'values.valorServicos',
      message: 'Valor dos serviços muito baixo (alguns municípios exigem valor mínimo)',
      severity: 'warning',
      code: 'W071'
    })
  }
}

// ============================================================================
// VALIDAÇÕES ESPECÍFICAS NFe
// ============================================================================

function validateNFeSpecific(
  data: PreSubmissionData,
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // IE obrigatória para NFe (exceto se isento)
  if (!data.emitter.ie || (data.emitter.ie !== 'ISENTO' && data.emitter.ie.trim().length === 0)) {
    warnings.push({
      field: 'emitter.ie',
      message: 'Inscrição Estadual não informada (pode ser obrigatória dependendo da UF)',
      severity: 'warning',
      code: 'W080'
    })
  }

  // Verificar NCM e CFOP em todos os itens
  const semNCM = data.items.filter(item => !item.ncm)
  const semCFOP = data.items.filter(item => !item.cfop)

  if (semNCM.length > 0) {
    errors.push({
      field: 'items',
      message: `${semNCM.length} item(ns) sem NCM informado`,
      severity: 'error',
      code: 'E080'
    })
  }

  if (semCFOP.length > 0) {
    errors.push({
      field: 'items',
      message: `${semCFOP.length} item(ns) sem CFOP informado`,
      severity: 'error',
      code: 'E081'
    })
  }
}

// ============================================================================
// FUNÇÕES AUXILIARES
// ============================================================================

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidLC116Code(code: string): boolean {
  // Formato: X.XX ou XX.XX
  const lc116Regex = /^\d{1,2}\.\d{2}$/
  return lc116Regex.test(code)
}

// ============================================================================
// VALIDAÇÃO DE DATA DE COMPETÊNCIA
// ============================================================================

export function validateCompetencia(competencia: string): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Formato YYYY-MM
  const regex = /^\d{4}-(0[1-9]|1[0-2])$/
  if (!regex.test(competencia)) {
    errors.push({
      field: 'competencia',
      message: 'Competência deve estar no formato YYYY-MM',
      severity: 'error',
      code: 'E090'
    })
  } else {
    const [ano, mes] = competencia.split('-').map(Number)
    const hoje = new Date()
    const competenciaDate = new Date(ano, mes - 1, 1)

    // Não pode ser no futuro
    if (competenciaDate > hoje) {
      errors.push({
        field: 'competencia',
        message: 'Competência não pode ser futura',
        severity: 'error',
        code: 'E091'
      })
    }

    // Alerta se muito antiga (mais de 5 anos)
    const cincoAnosAtras = new Date()
    cincoAnosAtras.setFullYear(cincoAnosAtras.getFullYear() - 5)
    if (competenciaDate < cincoAnosAtras) {
      warnings.push({
        field: 'competencia',
        message: 'Competência muito antiga (mais de 5 anos)',
        severity: 'warning',
        code: 'W090'
      })
    }
  }

  return {
    isValid: errors.length === 0,
    canProceed: errors.length === 0,
    errors,
    warnings,
    infos: [],
    summary: errors.length === 0 ? 'Competência válida' : errors[0].message
  }
}

// ============================================================================
// VALIDAÇÃO DE CANCELAMENTO
// ============================================================================

export function validateCancellation(
  authorizationDate: string,
  reason: string,
  documentType: 'nfse' | 'nfe'
): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationError[] = []

  // Motivo obrigatório com mínimo de caracteres
  if (!reason || reason.trim().length < 15) {
    errors.push({
      field: 'reason',
      message: 'Motivo do cancelamento deve ter no mínimo 15 caracteres',
      severity: 'error',
      code: 'E100'
    })
  }

  if (reason && reason.length > 255) {
    errors.push({
      field: 'reason',
      message: 'Motivo do cancelamento deve ter no máximo 255 caracteres',
      severity: 'error',
      code: 'E101'
    })
  }

  // Prazo para cancelamento
  const authDate = new Date(authorizationDate)
  const now = new Date()
  const diffHours = (now.getTime() - authDate.getTime()) / (1000 * 60 * 60)

  if (documentType === 'nfe') {
    // NFe: 24 horas
    if (diffHours > 24) {
      errors.push({
        field: 'authorizationDate',
        message: 'Prazo de 24 horas para cancelamento de NFe expirado',
        severity: 'error',
        code: 'E102'
      })
    } else if (diffHours > 20) {
      warnings.push({
        field: 'authorizationDate',
        message: `Restam apenas ${Math.floor(24 - diffHours)} horas para cancelar`,
        severity: 'warning',
        code: 'W100'
      })
    }
  } else {
    // NFSe: varia por município, mas geralmente até o próximo mês
    const authMonth = authDate.getMonth()
    const nowMonth = now.getMonth()
    const authYear = authDate.getFullYear()
    const nowYear = now.getFullYear()

    // Se passou mais de 1 mês
    const monthsDiff = (nowYear - authYear) * 12 + (nowMonth - authMonth)
    if (monthsDiff > 1) {
      warnings.push({
        field: 'authorizationDate',
        message: 'Cancelamento de NFSe após mais de 1 mês pode não ser aceito pela prefeitura',
        severity: 'warning',
        code: 'W101'
      })
    }
  }

  return {
    isValid: errors.length === 0,
    canProceed: errors.length === 0,
    errors,
    warnings,
    infos: [],
    summary: errors.length === 0 ? 'Cancelamento permitido' : errors[0].message
  }
}

// ============================================================================
// EXPORTAÇÕES
// ============================================================================

export {
  validatePreSubmission as default
}
