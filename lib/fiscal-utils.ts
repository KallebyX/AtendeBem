/**
 * Utilitários fiscais para validação e formatação de dados tributários
 * Seguindo normas da Receita Federal e SEFAZ
 */

// ============================================================================
// VALIDAÇÃO DE CPF
// ============================================================================
export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '')

  if (cpf.length !== 11) return false

  // Verifica sequências inválidas
  if (/^(\d)\1+$/.test(cpf)) return false

  // Validação do primeiro dígito
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf[9])) return false

  // Validação do segundo dígito
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf[10])) return false

  return true
}

// ============================================================================
// VALIDAÇÃO DE CNPJ
// ============================================================================
export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, '')

  if (cnpj.length !== 14) return false

  // Verifica sequências inválidas
  if (/^(\d)\1+$/.test(cnpj)) return false

  // Validação do primeiro dígito
  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0))) return false

  // Validação do segundo dígito
  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1))) return false

  return true
}

// ============================================================================
// FORMATAÇÃO
// ============================================================================
export function formatCPF(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, '')
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export function formatCNPJ(cnpj: string): string {
  cnpj = cnpj.replace(/[^\d]/g, '')
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export function formatCEP(cep: string): string {
  cep = cep.replace(/[^\d]/g, '')
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}

export function formatPhone(phone: string): string {
  phone = phone.replace(/[^\d]/g, '')
  if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
}

// ============================================================================
// LIMPEZA
// ============================================================================
export function cleanDocument(doc: string): string {
  return doc.replace(/[^\d]/g, '')
}

// ============================================================================
// VALIDAÇÃO DE INSCRIÇÃO ESTADUAL (IE)
// ============================================================================
export function validateIE(ie: string, uf: string): boolean {
  ie = ie.replace(/[^\d]/g, '')

  // IE Isento
  if (ie.toUpperCase() === 'ISENTO' || ie === '') return true

  // Validações básicas por UF (simplificado)
  const ieRules: Record<string, { length: number[] }> = {
    'AC': { length: [13] },
    'AL': { length: [9] },
    'AP': { length: [9] },
    'AM': { length: [9] },
    'BA': { length: [8, 9] },
    'CE': { length: [9] },
    'DF': { length: [13] },
    'ES': { length: [9] },
    'GO': { length: [9] },
    'MA': { length: [9] },
    'MT': { length: [11] },
    'MS': { length: [9] },
    'MG': { length: [13] },
    'PA': { length: [9] },
    'PB': { length: [9] },
    'PR': { length: [10] },
    'PE': { length: [9, 14] },
    'PI': { length: [9] },
    'RJ': { length: [8] },
    'RN': { length: [9, 10] },
    'RS': { length: [10] },
    'RO': { length: [14] },
    'RR': { length: [9] },
    'SC': { length: [9] },
    'SP': { length: [12, 13] },
    'SE': { length: [9] },
    'TO': { length: [9, 11] },
  }

  const rule = ieRules[uf.toUpperCase()]
  if (!rule) return true // UF desconhecida, aceita

  return rule.length.includes(ie.length)
}

// ============================================================================
// CÓDIGOS IBGE DOS ESTADOS
// ============================================================================
export const UF_CODES: Record<string, string> = {
  'AC': '12', 'AL': '27', 'AP': '16', 'AM': '13', 'BA': '29',
  'CE': '23', 'DF': '53', 'ES': '32', 'GO': '52', 'MA': '21',
  'MT': '51', 'MS': '50', 'MG': '31', 'PA': '15', 'PB': '25',
  'PR': '41', 'PE': '26', 'PI': '22', 'RJ': '33', 'RN': '24',
  'RS': '43', 'RO': '11', 'RR': '14', 'SC': '42', 'SP': '35',
  'SE': '28', 'TO': '17'
}

export const UF_LIST = Object.keys(UF_CODES).sort()

// ============================================================================
// REGIMES TRIBUTÁRIOS
// ============================================================================
export const TAX_REGIMES = [
  { code: '1', name: 'Simples Nacional' },
  { code: '2', name: 'Simples Nacional - Excesso sublimite de receita bruta' },
  { code: '3', name: 'Regime Normal (Lucro Presumido ou Real)' },
]

// ============================================================================
// CRT - CÓDIGO DE REGIME TRIBUTÁRIO
// ============================================================================
export const CRT_CODES = [
  { code: '1', name: '1 - Simples Nacional' },
  { code: '2', name: '2 - Simples Nacional - Excesso de sublimite' },
  { code: '3', name: '3 - Regime Normal' },
]

// ============================================================================
// LISTA DE SERVIÇOS LC 116/2003
// ============================================================================
export const LC116_SERVICES = [
  // 1 – Serviços de informática e congêneres
  { code: '1.01', description: 'Análise e desenvolvimento de sistemas' },
  { code: '1.02', description: 'Programação' },
  { code: '1.03', description: 'Processamento de dados e congêneres' },
  { code: '1.04', description: 'Elaboração de programas de computadores' },
  { code: '1.05', description: 'Licenciamento ou cessão de direito de uso de programas' },
  { code: '1.06', description: 'Assessoria e consultoria em informática' },
  { code: '1.07', description: 'Suporte técnico em informática' },
  { code: '1.08', description: 'Planejamento, confecção, manutenção de páginas eletrônicas' },
  { code: '1.09', description: 'Disponibilização de conteúdo eletrônico' },

  // 4 – Serviços de saúde, assistência médica e congêneres
  { code: '4.01', description: 'Medicina e biomedicina' },
  { code: '4.02', description: 'Análises clínicas, patologia, eletricidade médica' },
  { code: '4.03', description: 'Hospitais, clínicas, prontos-socorros, ambulatórios' },
  { code: '4.04', description: 'Instrumentação cirúrgica' },
  { code: '4.05', description: 'Acupuntura' },
  { code: '4.06', description: 'Enfermagem, inclusive serviços auxiliares' },
  { code: '4.07', description: 'Serviços farmacêuticos' },
  { code: '4.08', description: 'Terapia ocupacional, fisioterapia e fonoaudiologia' },
  { code: '4.09', description: 'Terapias de qualquer espécie' },
  { code: '4.10', description: 'Nutrição' },
  { code: '4.11', description: 'Obstetrícia' },
  { code: '4.12', description: 'Odontologia' },
  { code: '4.13', description: 'Ortóptica' },
  { code: '4.14', description: 'Próteses sob encomenda' },
  { code: '4.15', description: 'Psicanálise' },
  { code: '4.16', description: 'Psicologia' },
  { code: '4.17', description: 'Casas de repouso e de recuperação' },
  { code: '4.18', description: 'Inseminação artificial, fertilização in vitro' },
  { code: '4.19', description: 'Bancos de sangue, leite, pele, olhos, óvulos' },
  { code: '4.20', description: 'Coleta de sangue, leite, tecidos, sêmen' },
  { code: '4.21', description: 'Unidade de atendimento, assistência ou tratamento móvel' },
  { code: '4.22', description: 'Planos de medicina de grupo ou individual' },
  { code: '4.23', description: 'Outros planos de saúde' },

  // 5 – Serviços de medicina e assistência veterinária
  { code: '5.01', description: 'Medicina veterinária e zootecnia' },
  { code: '5.02', description: 'Hospitais, clínicas veterinárias' },
  { code: '5.03', description: 'Laboratórios de análise na área veterinária' },
  { code: '5.04', description: 'Inseminação artificial, fertilização in vitro' },
  { code: '5.05', description: 'Bancos de sangue e de órgãos' },
  { code: '5.06', description: 'Coleta de sangue, leite, tecidos' },
  { code: '5.07', description: 'Unidade de atendimento, assistência móvel' },
  { code: '5.08', description: 'Guarda, tratamento, adestramento' },
  { code: '5.09', description: 'Planos de atendimento e assistência médico-veterinária' },

  // 6 – Serviços de cuidados pessoais, estética, atividades físicas
  { code: '6.01', description: 'Barbearia, cabeleireiros, manicuros' },
  { code: '6.02', description: 'Esteticistas, tratamento de pele, depilação' },
  { code: '6.03', description: 'Banhos, duchas, sauna, massagens, ginástica' },
  { code: '6.04', description: 'Ginástica, dança, esportes, natação, artes marciais' },
  { code: '6.05', description: 'Centros de emagrecimento, spa e congêneres' },
  { code: '6.06', description: 'Aplicação de tatuagens, piercings' },

  // 7 – Serviços relativos a engenharia, arquitetura
  { code: '7.01', description: 'Engenharia, agronomia, agrimensura, arquitetura' },
  { code: '7.02', description: 'Execução, por administração, de obras' },
  { code: '7.03', description: 'Elaboração de planos diretores' },
  { code: '7.04', description: 'Demolição' },
  { code: '7.05', description: 'Reparação, conservação de edifícios, estradas, pontes' },

  // 8 – Serviços de educação, ensino
  { code: '8.01', description: 'Ensino regular pré-escolar, fundamental, médio, superior' },
  { code: '8.02', description: 'Instrução, treinamento, orientação pedagógica' },

  // 10 – Serviços de intermediação e congêneres
  { code: '10.01', description: 'Agenciamento, corretagem de câmbio, seguros' },
  { code: '10.02', description: 'Agenciamento, corretagem de títulos em geral' },
  { code: '10.03', description: 'Agenciamento, corretagem de contratos de arrendamento' },
  { code: '10.04', description: 'Agenciamento, corretagem de contratos de franquia' },
  { code: '10.05', description: 'Agenciamento, corretagem de imóveis' },
  { code: '10.06', description: 'Agenciamento marítimo' },
  { code: '10.07', description: 'Agenciamento de notícias' },
  { code: '10.08', description: 'Agenciamento de publicidade e propaganda' },
  { code: '10.09', description: 'Representação de qualquer natureza' },
  { code: '10.10', description: 'Distribuição de bens de terceiros' },

  // 17 – Serviços de apoio técnico, administrativo
  { code: '17.01', description: 'Assessoria ou consultoria de qualquer natureza' },
  { code: '17.02', description: 'Datilografia, digitação, estenografia' },
  { code: '17.03', description: 'Planejamento, coordenação, programação' },
  { code: '17.04', description: 'Recrutamento, agenciamento, seleção de pessoal' },
  { code: '17.05', description: 'Fornecimento de mão-de-obra' },
  { code: '17.06', description: 'Propaganda e publicidade' },
  { code: '17.07', description: 'Franquia (franchising)' },
  { code: '17.08', description: 'Perícias, laudos, exames técnicos' },
  { code: '17.09', description: 'Planejamento, organização de feiras, exposições' },
  { code: '17.10', description: 'Organização de festas e recepções' },
  { code: '17.11', description: 'Administração em geral' },
  { code: '17.12', description: 'Leilão e congêneres' },
  { code: '17.13', description: 'Advocacia' },
  { code: '17.14', description: 'Arbitragem de qualquer espécie' },
  { code: '17.15', description: 'Auditoria' },
  { code: '17.16', description: 'Análise de Organização e Métodos' },
  { code: '17.17', description: 'Atuária e cálculos técnicos' },
  { code: '17.18', description: 'Contabilidade, inclusive serviços técnicos' },
  { code: '17.19', description: 'Consultoria e assessoria econômica ou financeira' },
  { code: '17.20', description: 'Estatística' },
  { code: '17.21', description: 'Cobrança em geral' },
  { code: '17.22', description: 'Assessoria, análise, avaliação de riscos' },
  { code: '17.23', description: 'Apresentação de palestras, conferências' },
  { code: '17.24', description: 'Inserção de textos, desenhos em rede de computadores' },
  { code: '17.25', description: 'Fornecimento de infraestrutura de redes de acesso' },
]

// ============================================================================
// CÓDIGOS CNAE PARA SAÚDE
// ============================================================================
export const CNAE_HEALTH_CODES = [
  { code: '8610-1/01', description: 'Atividades de atendimento hospitalar, exceto pronto-socorro e UTI' },
  { code: '8610-1/02', description: 'Atividades de atendimento em pronto-socorro e UTI' },
  { code: '8630-5/01', description: 'Atividade médica ambulatorial com recursos para realização de procedimentos' },
  { code: '8630-5/02', description: 'Atividade médica ambulatorial com recursos para exames complementares' },
  { code: '8630-5/03', description: 'Atividade médica ambulatorial restrita a consultas' },
  { code: '8630-5/04', description: 'Atividade odontológica' },
  { code: '8630-5/06', description: 'Serviços de vacinação e imunização humana' },
  { code: '8630-5/07', description: 'Atividades de reprodução humana assistida' },
  { code: '8630-5/99', description: 'Atividades de atenção ambulatorial NE' },
  { code: '8640-2/01', description: 'Laboratórios de anatomia patológica e citológica' },
  { code: '8640-2/02', description: 'Laboratórios clínicos' },
  { code: '8640-2/03', description: 'Serviços de diálise e nefrologia' },
  { code: '8640-2/04', description: 'Serviços de tomografia' },
  { code: '8640-2/05', description: 'Serviços de diagnóstico por imagem com uso de radiação ionizante' },
  { code: '8640-2/06', description: 'Serviços de ressonância magnética' },
  { code: '8640-2/07', description: 'Serviços de diagnóstico por imagem sem uso de radiação ionizante' },
  { code: '8640-2/08', description: 'Serviços de diagnóstico por registro gráfico - ECG, EEG' },
  { code: '8640-2/09', description: 'Serviços de diagnóstico por métodos ópticos - endoscopia' },
  { code: '8640-2/10', description: 'Serviços de quimioterapia' },
  { code: '8640-2/11', description: 'Serviços de radioterapia' },
  { code: '8640-2/12', description: 'Serviços de hemoterapia' },
  { code: '8640-2/13', description: 'Serviços de litotripsia' },
  { code: '8640-2/14', description: 'Serviços de bancos de células e tecidos humanos' },
  { code: '8640-2/99', description: 'Atividades de serviços de complementação diagnóstica e terapêutica NE' },
  { code: '8650-0/01', description: 'Atividades de enfermagem' },
  { code: '8650-0/02', description: 'Atividades de profissionais da nutrição' },
  { code: '8650-0/03', description: 'Atividades de psicologia e psicanálise' },
  { code: '8650-0/04', description: 'Atividades de fisioterapia' },
  { code: '8650-0/05', description: 'Atividades de terapia ocupacional' },
  { code: '8650-0/06', description: 'Atividades de fonoaudiologia' },
  { code: '8650-0/07', description: 'Atividades de terapia de nutrição enteral e parenteral' },
  { code: '8650-0/99', description: 'Atividades de profissionais da área de saúde NE' },
  { code: '8660-7/00', description: 'Atividades de apoio à gestão de saúde' },
  { code: '8690-9/01', description: 'Atividades de práticas integrativas e complementares em saúde humana' },
  { code: '8690-9/02', description: 'Atividades de bancos de leite humano' },
  { code: '8690-9/03', description: 'Atividades de acupuntura' },
  { code: '8690-9/04', description: 'Atividades de podologia' },
  { code: '8690-9/99', description: 'Outras atividades de atenção à saúde humana NE' },
]

// ============================================================================
// ALÍQUOTAS ISS POR MUNICÍPIO (PRINCIPAIS)
// ============================================================================
export const ISS_RATES: Record<string, number> = {
  'default': 5.0, // Alíquota máxima padrão
  '3550308': 5.0,  // São Paulo
  '3304557': 5.0,  // Rio de Janeiro
  '3106200': 5.0,  // Belo Horizonte
  '4106902': 5.0,  // Curitiba
  '4314902': 4.0,  // Porto Alegre
  '2927408': 5.0,  // Salvador
  '5300108': 5.0,  // Brasília
  '2304400': 5.0,  // Fortaleza
  '2611606': 5.0,  // Recife
  '1302603': 5.0,  // Manaus
}

// Alíquota mínima ISS: 2%
// Alíquota máxima ISS: 5%

export function getISSRate(cityCode: string): number {
  return ISS_RATES[cityCode] || ISS_RATES['default']
}

// ============================================================================
// ALÍQUOTAS PIS/COFINS
// ============================================================================
export const PIS_COFINS_RATES = {
  cumulativo: {
    pis: 0.65,
    cofins: 3.0,
  },
  naoCumulativo: {
    pis: 1.65,
    cofins: 7.6,
  },
}

// ============================================================================
// SIMPLES NACIONAL - ANEXO III (SERVIÇOS)
// ============================================================================
export const SIMPLES_NACIONAL_ANEXO_III = [
  { faixa: 1, receita_ate: 180000.00, aliquota: 6.00, deducao: 0 },
  { faixa: 2, receita_ate: 360000.00, aliquota: 11.20, deducao: 9360.00 },
  { faixa: 3, receita_ate: 720000.00, aliquota: 13.50, deducao: 17640.00 },
  { faixa: 4, receita_ate: 1800000.00, aliquota: 16.00, deducao: 35640.00 },
  { faixa: 5, receita_ate: 3600000.00, aliquota: 21.00, deducao: 125640.00 },
  { faixa: 6, receita_ate: 4800000.00, aliquota: 33.00, deducao: 648000.00 },
]

// ============================================================================
// INDICADOR DE IE DO DESTINATÁRIO
// ============================================================================
export const INDICADOR_IE_DEST = [
  { code: '1', name: '1 - Contribuinte ICMS' },
  { code: '2', name: '2 - Contribuinte isento' },
  { code: '9', name: '9 - Não Contribuinte' },
]

// ============================================================================
// SITUAÇÃO TRIBUTÁRIA ISS
// ============================================================================
export const ISS_EXIGIBILIDADE = [
  { code: '1', name: 'Exigível' },
  { code: '2', name: 'Não incidência' },
  { code: '3', name: 'Isenção' },
  { code: '4', name: 'Exportação' },
  { code: '5', name: 'Imunidade' },
  { code: '6', name: 'Exigibilidade Suspensa por Decisão Judicial' },
  { code: '7', name: 'Exigibilidade Suspensa por Processo Administrativo' },
]

// ============================================================================
// NATUREZA DA OPERAÇÃO
// ============================================================================
export const NATUREZA_OPERACAO = [
  { code: '1', name: 'Tributação no município' },
  { code: '2', name: 'Tributação fora do município' },
  { code: '3', name: 'Isenção' },
  { code: '4', name: 'Imune' },
  { code: '5', name: 'Exigibilidade suspensa por decisão judicial' },
  { code: '6', name: 'Exigibilidade suspensa por processo administrativo' },
]

// ============================================================================
// BUSCA CEP VIA VIACEP
// ============================================================================
export interface ViaCEPResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro?: boolean
}

export async function fetchAddressByCEP(cep: string): Promise<ViaCEPResponse | null> {
  try {
    const cleanCep = cep.replace(/[^\d]/g, '')
    if (cleanCep.length !== 8) return null

    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    const data = await response.json()

    if (data.erro) return null
    return data
  } catch (error) {
    console.error('Erro ao buscar CEP:', error)
    return null
  }
}

// ============================================================================
// GERAÇÃO DE CHAVE DE ACESSO NFE
// ============================================================================
export function generateAccessKey(data: {
  uf: string
  aamm: string
  cnpj: string
  mod: string
  serie: string
  numero: string
  tpEmis: string
  cNF: string
}): string {
  // Formato: UFAAMMCNPJModSerieNumerotpEmisCNFDigito
  const chaveBase =
    UF_CODES[data.uf] +
    data.aamm +
    data.cnpj.padStart(14, '0') +
    data.mod.padStart(2, '0') +
    data.serie.padStart(3, '0') +
    data.numero.padStart(9, '0') +
    data.tpEmis +
    data.cNF.padStart(8, '0')

  // Calcular dígito verificador (módulo 11)
  const digitoVerificador = calcularDigitoMod11(chaveBase)

  return chaveBase + digitoVerificador
}

function calcularDigitoMod11(chave: string): string {
  const pesos = [2, 3, 4, 5, 6, 7, 8, 9]
  let soma = 0
  let pesoIndex = 0

  for (let i = chave.length - 1; i >= 0; i--) {
    soma += parseInt(chave[i]) * pesos[pesoIndex]
    pesoIndex = (pesoIndex + 1) % 8
  }

  const resto = soma % 11
  const digito = resto < 2 ? 0 : 11 - resto

  return digito.toString()
}

// ============================================================================
// VALIDAÇÃO DE CERTIFICADO A1
// ============================================================================
export interface CertificateInfo {
  subject: string
  issuer: string
  validFrom: Date
  validTo: Date
  serialNumber: string
  cnpj?: string
  isValid: boolean
  daysToExpire: number
}

export function checkCertificateExpiration(validTo: Date): { isValid: boolean; daysToExpire: number } {
  const now = new Date()
  const diffTime = validTo.getTime() - now.getTime()
  const daysToExpire = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return {
    isValid: daysToExpire > 0,
    daysToExpire
  }
}
