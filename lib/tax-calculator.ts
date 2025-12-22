/**
 * Calculadora de Impostos - Sistema NFE AtendeBem
 * Implementa todos os cálculos tributários conforme legislação brasileira
 */

// ============================================================================
// TIPOS
// ============================================================================
export interface TaxCalculationInput {
  servicesValue: number       // Valor total dos serviços
  cityCode: string           // Código IBGE do município
  taxRegime: '1' | '2' | '3' // 1=Simples, 2=Simples Excesso, 3=Normal
  crt: '1' | '2' | '3'       // Código Regime Tributário
  isOptanteSimplesNacional: boolean
  brutaRevenue12Months?: number // Receita bruta últimos 12 meses (para Simples)
  lc116Code?: string         // Código do serviço LC 116
  retainISS?: boolean        // ISS retido na fonte
  retainIR?: boolean         // IR retido na fonte
  retainPIS?: boolean        // PIS retido na fonte
  retainCOFINS?: boolean     // COFINS retido na fonte
  retainINSS?: boolean       // INSS retido na fonte
  retainCSLL?: boolean       // CSLL retido na fonte
  deductions?: number        // Deduções legais
  discount?: number          // Desconto
}

export interface TaxCalculationResult {
  // Valores base
  servicesValue: number
  deductions: number
  discount: number
  baseValue: number          // Valor base para cálculo (serviços - deduções - desconto)

  // ISS
  issRate: number
  issValue: number
  issRetido: boolean

  // PIS
  pisRate: number
  pisValue: number
  pisRetido: boolean

  // COFINS
  cofinsRate: number
  cofinsValue: number
  cofinsRetido: boolean

  // IR
  irRate: number
  irValue: number
  irRetido: boolean

  // INSS
  inssRate: number
  inssValue: number
  inssRetido: boolean

  // CSLL
  csllRate: number
  csllValue: number
  csllRetido: boolean

  // Simples Nacional
  simplesNacionalRate: number
  simplesNacionalValue: number
  simplesNacionalDeducao: number

  // Totais
  totalTaxes: number         // Total de impostos
  totalRetained: number      // Total retido na fonte
  netValue: number           // Valor líquido

  // Detalhamento
  breakdown: TaxBreakdownItem[]
}

export interface TaxBreakdownItem {
  tax: string
  rate: number
  base: number
  value: number
  retained: boolean
}

// ============================================================================
// TABELAS DE ALÍQUOTAS
// ============================================================================

// Alíquotas ISS por município (principais capitais)
const ISS_RATES_BY_CITY: Record<string, number> = {
  // Alíquota padrão para serviços de saúde (2% a 5%)
  '3550308': 5.0,   // São Paulo
  '3304557': 5.0,   // Rio de Janeiro
  '3106200': 5.0,   // Belo Horizonte
  '4106902': 5.0,   // Curitiba
  '4314902': 4.0,   // Porto Alegre
  '2927408': 5.0,   // Salvador
  '5300108': 5.0,   // Brasília
  '2304400': 5.0,   // Fortaleza
  '2611606': 5.0,   // Recife
  '1302603': 5.0,   // Manaus
  '1501402': 5.0,   // Belém
  '5208707': 5.0,   // Goiânia
  '3518800': 5.0,   // Guarulhos
  '3509502': 5.0,   // Campinas
  '2111300': 5.0,   // São Luís
  '2408102': 5.0,   // Natal
  '2507507': 5.0,   // João Pessoa
  '2704302': 5.0,   // Maceió
  '2211001': 5.0,   // Teresina
  '2800308': 5.0,   // Aracaju
  '5103403': 5.0,   // Cuiabá
  '5002704': 5.0,   // Campo Grande
  '1100205': 5.0,   // Porto Velho
  '1600303': 5.0,   // Macapá
  '1400100': 5.0,   // Boa Vista
  '1721000': 5.0,   // Palmas
  '1200401': 5.0,   // Rio Branco
}

// ISS por atividade de saúde (subitem LC 116)
const ISS_RATES_BY_SERVICE: Record<string, number> = {
  '4.01': 2.0,   // Medicina e biomedicina (alíquota mínima)
  '4.02': 3.0,   // Análises clínicas
  '4.03': 3.0,   // Hospitais, clínicas
  '4.04': 2.0,   // Instrumentação cirúrgica
  '4.05': 2.0,   // Acupuntura
  '4.06': 2.0,   // Enfermagem
  '4.07': 3.0,   // Farmácia
  '4.08': 2.0,   // Fisioterapia, fonoaudiologia
  '4.09': 2.0,   // Terapias
  '4.10': 2.0,   // Nutrição
  '4.11': 2.0,   // Obstetrícia
  '4.12': 3.0,   // Odontologia
  '4.13': 2.0,   // Ortóptica
  '4.14': 3.0,   // Próteses
  '4.15': 2.0,   // Psicanálise
  '4.16': 2.0,   // Psicologia
  '4.17': 3.0,   // Casas de repouso
  '4.18': 3.0,   // Fertilização
  '4.19': 3.0,   // Bancos de sangue
  '4.20': 3.0,   // Coleta
  '4.21': 3.0,   // Atendimento móvel
  '4.22': 5.0,   // Planos de saúde
  '4.23': 5.0,   // Outros planos
}

// Simples Nacional - Anexo III (Serviços)
const SIMPLES_NACIONAL_ANEXO_III = [
  { faixa: 1, limiteInferior: 0, limiteSuperior: 180000.00, aliquota: 6.00, deducao: 0 },
  { faixa: 2, limiteInferior: 180000.01, limiteSuperior: 360000.00, aliquota: 11.20, deducao: 9360.00 },
  { faixa: 3, limiteInferior: 360000.01, limiteSuperior: 720000.00, aliquota: 13.50, deducao: 17640.00 },
  { faixa: 4, limiteInferior: 720000.01, limiteSuperior: 1800000.00, aliquota: 16.00, deducao: 35640.00 },
  { faixa: 5, limiteInferior: 1800000.01, limiteSuperior: 3600000.00, aliquota: 21.00, deducao: 125640.00 },
  { faixa: 6, limiteInferior: 3600000.01, limiteSuperior: 4800000.00, aliquota: 33.00, deducao: 648000.00 },
]

// Simples Nacional - Anexo V (Serviços de saúde quando Fator R < 28%)
const SIMPLES_NACIONAL_ANEXO_V = [
  { faixa: 1, limiteInferior: 0, limiteSuperior: 180000.00, aliquota: 15.50, deducao: 0 },
  { faixa: 2, limiteInferior: 180000.01, limiteSuperior: 360000.00, aliquota: 18.00, deducao: 4500.00 },
  { faixa: 3, limiteInferior: 360000.01, limiteSuperior: 720000.00, aliquota: 19.50, deducao: 9900.00 },
  { faixa: 4, limiteInferior: 720000.01, limiteSuperior: 1800000.00, aliquota: 20.50, deducao: 17100.00 },
  { faixa: 5, limiteInferior: 1800000.01, limiteSuperior: 3600000.00, aliquota: 23.00, deducao: 62100.00 },
  { faixa: 6, limiteInferior: 3600000.01, limiteSuperior: 4800000.00, aliquota: 30.50, deducao: 540000.00 },
]

// Alíquotas Lucro Presumido/Real
const LUCRO_PRESUMIDO = {
  pis: 0.65,        // 0,65%
  cofins: 3.0,      // 3%
  csll: 9.0,        // 9% sobre base presumida (32% para serviços)
  irpj: 15.0,       // 15% sobre base presumida
  irpjAdicional: 10.0, // 10% sobre excedente de R$ 20.000/mês
  basePresumidaServicos: 32.0, // 32% para serviços
}

// Retenções na fonte
const RETENCOES = {
  ir: 1.5,          // IR fonte serviços
  pis: 0.65,        // PIS
  cofins: 3.0,      // COFINS
  csll: 1.0,        // CSLL
  inss: 11.0,       // INSS (quando aplicável)
}

// ============================================================================
// FUNÇÕES PRINCIPAIS
// ============================================================================

/**
 * Calcula todos os impostos para uma operação
 */
export function calculateTaxes(input: TaxCalculationInput): TaxCalculationResult {
  const deductions = input.deductions || 0
  const discount = input.discount || 0
  const baseValue = input.servicesValue - deductions - discount

  // Inicializar resultado
  const result: TaxCalculationResult = {
    servicesValue: input.servicesValue,
    deductions,
    discount,
    baseValue,
    issRate: 0,
    issValue: 0,
    issRetido: input.retainISS || false,
    pisRate: 0,
    pisValue: 0,
    pisRetido: input.retainPIS || false,
    cofinsRate: 0,
    cofinsValue: 0,
    cofinsRetido: input.retainCOFINS || false,
    irRate: 0,
    irValue: 0,
    irRetido: input.retainIR || false,
    inssRate: 0,
    inssValue: 0,
    inssRetido: input.retainINSS || false,
    csllRate: 0,
    csllValue: 0,
    csllRetido: input.retainCSLL || false,
    simplesNacionalRate: 0,
    simplesNacionalValue: 0,
    simplesNacionalDeducao: 0,
    totalTaxes: 0,
    totalRetained: 0,
    netValue: 0,
    breakdown: [],
  }

  // Calcular ISS
  const issResult = calculateISS(baseValue, input.cityCode, input.lc116Code)
  result.issRate = issResult.rate
  result.issValue = issResult.value

  if (input.isOptanteSimplesNacional && input.taxRegime !== '3') {
    // Simples Nacional
    const simplesResult = calculateSimplesNacional(
      baseValue,
      input.brutaRevenue12Months || 0,
      input.taxRegime
    )
    result.simplesNacionalRate = simplesResult.aliquotaEfetiva
    result.simplesNacionalValue = simplesResult.valorDevido
    result.simplesNacionalDeducao = simplesResult.deducao

    // ISS já está incluso no Simples Nacional
    result.issValue = 0

    result.breakdown.push({
      tax: 'Simples Nacional',
      rate: simplesResult.aliquotaEfetiva,
      base: baseValue,
      value: simplesResult.valorDevido,
      retained: false,
    })
  } else {
    // Lucro Presumido ou Real
    result.breakdown.push({
      tax: 'ISS',
      rate: result.issRate,
      base: baseValue,
      value: result.issValue,
      retained: result.issRetido,
    })

    // PIS
    result.pisRate = LUCRO_PRESUMIDO.pis
    result.pisValue = roundCurrency(baseValue * (result.pisRate / 100))
    result.breakdown.push({
      tax: 'PIS',
      rate: result.pisRate,
      base: baseValue,
      value: result.pisValue,
      retained: result.pisRetido,
    })

    // COFINS
    result.cofinsRate = LUCRO_PRESUMIDO.cofins
    result.cofinsValue = roundCurrency(baseValue * (result.cofinsRate / 100))
    result.breakdown.push({
      tax: 'COFINS',
      rate: result.cofinsRate,
      base: baseValue,
      value: result.cofinsValue,
      retained: result.cofinsRetido,
    })

    // IR (retido)
    if (input.retainIR) {
      result.irRate = RETENCOES.ir
      result.irValue = roundCurrency(baseValue * (result.irRate / 100))
      result.breakdown.push({
        tax: 'IR Fonte',
        rate: result.irRate,
        base: baseValue,
        value: result.irValue,
        retained: true,
      })
    }

    // CSLL (retido)
    if (input.retainCSLL) {
      result.csllRate = RETENCOES.csll
      result.csllValue = roundCurrency(baseValue * (result.csllRate / 100))
      result.breakdown.push({
        tax: 'CSLL Fonte',
        rate: result.csllRate,
        base: baseValue,
        value: result.csllValue,
        retained: true,
      })
    }

    // INSS (retido quando aplicável)
    if (input.retainINSS) {
      result.inssRate = RETENCOES.inss
      result.inssValue = roundCurrency(baseValue * (result.inssRate / 100))
      result.breakdown.push({
        tax: 'INSS Fonte',
        rate: result.inssRate,
        base: baseValue,
        value: result.inssValue,
        retained: true,
      })
    }
  }

  // Calcular totais
  result.totalTaxes = roundCurrency(
    result.issValue +
    result.pisValue +
    result.cofinsValue +
    result.irValue +
    result.csllValue +
    result.inssValue +
    result.simplesNacionalValue
  )

  result.totalRetained = roundCurrency(
    (result.issRetido ? result.issValue : 0) +
    (result.pisRetido ? result.pisValue : 0) +
    (result.cofinsRetido ? result.cofinsValue : 0) +
    result.irValue +
    result.csllValue +
    result.inssValue
  )

  result.netValue = roundCurrency(baseValue - result.totalRetained)

  return result
}

/**
 * Calcula ISS baseado no município e tipo de serviço
 */
export function calculateISS(
  baseValue: number,
  cityCode: string,
  lc116Code?: string
): { rate: number; value: number } {
  // Primeiro verifica alíquota por serviço
  let rate = lc116Code ? (ISS_RATES_BY_SERVICE[lc116Code] || 2.0) : 2.0

  // Pode ser sobrescrita pela alíquota municipal se maior
  const cityRate = ISS_RATES_BY_CITY[cityCode] || 5.0

  // Usar a maior alíquota (respeitando mínimo legal de 2%)
  rate = Math.max(rate, 2.0)

  // Serviços de saúde geralmente têm alíquota reduzida
  // mas não pode ser menor que 2% (mínimo legal)
  const value = roundCurrency(baseValue * (rate / 100))

  return { rate, value }
}

/**
 * Calcula Simples Nacional
 */
export function calculateSimplesNacional(
  receita: number,
  receitaBruta12Meses: number,
  taxRegime: '1' | '2' | '3'
): {
  faixa: number
  aliquotaNominal: number
  deducao: number
  aliquotaEfetiva: number
  valorDevido: number
} {
  // Usar Anexo III por padrão (serviços de saúde com Fator R >= 28%)
  const anexo = SIMPLES_NACIONAL_ANEXO_III

  // Encontrar faixa
  const faixa = anexo.find(
    f => receitaBruta12Meses >= f.limiteInferior && receitaBruta12Meses <= f.limiteSuperior
  ) || anexo[0]

  // Alíquota efetiva = (RBT12 * Aliq - PD) / RBT12
  const aliquotaEfetiva = receitaBruta12Meses > 0
    ? ((receitaBruta12Meses * (faixa.aliquota / 100) - faixa.deducao) / receitaBruta12Meses) * 100
    : faixa.aliquota

  const valorDevido = roundCurrency(receita * (aliquotaEfetiva / 100))

  return {
    faixa: faixa.faixa,
    aliquotaNominal: faixa.aliquota,
    deducao: faixa.deducao,
    aliquotaEfetiva: roundCurrency(aliquotaEfetiva, 2),
    valorDevido,
  }
}

/**
 * Calcula IRPJ e CSLL para Lucro Presumido
 */
export function calculateLucroPresumido(
  receitaMensal: number
): {
  basePresumida: number
  irpj: number
  irpjAdicional: number
  csll: number
  total: number
} {
  // Base presumida para serviços: 32%
  const basePresumida = roundCurrency(receitaMensal * (LUCRO_PRESUMIDO.basePresumidaServicos / 100))

  // IRPJ: 15%
  const irpj = roundCurrency(basePresumida * (LUCRO_PRESUMIDO.irpj / 100))

  // Adicional IRPJ: 10% sobre excedente de R$ 20.000/mês
  const irpjAdicional = basePresumida > 20000
    ? roundCurrency((basePresumida - 20000) * (LUCRO_PRESUMIDO.irpjAdicional / 100))
    : 0

  // CSLL: 9%
  const csll = roundCurrency(basePresumida * (LUCRO_PRESUMIDO.csll / 100))

  return {
    basePresumida,
    irpj,
    irpjAdicional,
    csll,
    total: roundCurrency(irpj + irpjAdicional + csll),
  }
}

/**
 * Verifica se deve reter impostos na fonte
 */
export function shouldRetainTaxes(
  servicesValue: number,
  customerType: 'pf' | 'pj',
  serviceType?: string
): {
  retainIR: boolean
  retainPIS: boolean
  retainCOFINS: boolean
  retainCSLL: boolean
  retainINSS: boolean
} {
  // Pessoa Física: geralmente não retém
  if (customerType === 'pf') {
    return {
      retainIR: false,
      retainPIS: false,
      retainCOFINS: false,
      retainCSLL: false,
      retainINSS: false,
    }
  }

  // Pessoa Jurídica: retém se valor >= R$ 5.000 por mês
  const shouldRetain = servicesValue >= 5000

  // INSS: retém para serviços com cessão de mão de obra
  const retainINSS = false // Geralmente não aplicável para clínicas

  return {
    retainIR: shouldRetain,
    retainPIS: shouldRetain,
    retainCOFINS: shouldRetain,
    retainCSLL: shouldRetain,
    retainINSS,
  }
}

/**
 * Obtém alíquota ISS para um município
 */
export function getISSRateForCity(cityCode: string): number {
  return ISS_RATES_BY_CITY[cityCode] || 5.0
}

/**
 * Obtém alíquota ISS para um serviço LC 116
 */
export function getISSRateForService(lc116Code: string): number {
  return ISS_RATES_BY_SERVICE[lc116Code] || 2.0
}

/**
 * Lista faixas do Simples Nacional
 */
export function getSimplesNacionalFaixas() {
  return SIMPLES_NACIONAL_ANEXO_III.map(f => ({
    faixa: f.faixa,
    limite: f.limiteSuperior,
    aliquota: f.aliquota,
    deducao: f.deducao,
  }))
}

// ============================================================================
// UTILITÁRIOS
// ============================================================================

/**
 * Arredonda valor monetário
 */
function roundCurrency(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/**
 * Formata valor para exibição
 */
export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

/**
 * Formata percentual para exibição
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`
}
