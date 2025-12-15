export interface TussProcedure {
  id: string
  code: string // Código TUSS oficial (ex: 1.01.01.01-2)
  friendlyName: string // Nome amigável para o médico
  category: string
  keywords: string[] // Para busca inteligente
  requiresLaterality?: boolean
  requiresLocation?: boolean
  porte?: string
  porteAnestesico?: string
  requiresAuthorization?: boolean
  cbos?: string // Código CBOS quando aplicável
}

// CONSULTAS - Seção 1.01.01.01 da tabela TUSS
export const TUSS_CONSULTAS: TussProcedure[] = [
  {
    id: "consulta-reumatologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Reumatologista",
    category: "consulta",
    keywords: ["reumatologia", "artrite", "artrose", "dor articular", "inflamação"],
    cbos: "225136",
  },
  {
    id: "consulta-alergologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Alergologista/Imunologista",
    category: "consulta",
    keywords: ["alergia", "imunologia", "rinite", "asma", "dermatite"],
    cbos: "225110",
  },
  {
    id: "consulta-clinica-geral",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Clínico Geral",
    category: "consulta",
    keywords: ["clínica geral", "check-up", "avaliação", "primeira consulta"],
    cbos: "225125",
  },
  {
    id: "consulta-pneumologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Pneumologista",
    category: "consulta",
    keywords: ["pneumologia", "pulmão", "tosse", "falta de ar", "respiração"],
    cbos: "225127",
  },
  {
    id: "consulta-ginecologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Ginecologista",
    category: "consulta",
    keywords: ["ginecologia", "obstetrícia", "mulher", "gestação", "pré-natal"],
    cbos: "225250",
  },
  {
    id: "consulta-neurocirurgia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Neurocirurgião",
    category: "consulta",
    keywords: ["neurocirurgia", "cérebro", "coluna", "neurológico"],
    cbos: "225260",
  },
  {
    id: "consulta-pediatria",
    code: "1.01.01.01-2",
    friendlyName: "Consulta Pediátrica",
    category: "consulta",
    keywords: ["pediatria", "criança", "bebê", "puericultura"],
    cbos: "225124",
  },
  {
    id: "consulta-endocrinologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Endocrinologista",
    category: "consulta",
    keywords: ["endocrinologia", "diabetes", "tireóide", "hormônio"],
    cbos: "225155",
  },
  {
    id: "consulta-geriatria",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Geriatra",
    category: "consulta",
    keywords: ["geriatria", "idoso", "terceira idade"],
    cbos: "225180",
  },
  {
    id: "consulta-infectologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Infectologista",
    category: "consulta",
    keywords: ["infectologia", "infecção", "febre", "vírus", "bactéria"],
    cbos: "225103",
  },
  {
    id: "consulta-neurologia",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Neurologista",
    category: "consulta",
    keywords: ["neurologia", "dor de cabeça", "enxaqueca", "convulsão"],
    cbos: "225112",
  },
  {
    id: "consulta-psiquiatria",
    code: "1.01.01.01-2",
    friendlyName: "Consulta com Psiquiatra",
    category: "consulta",
    keywords: ["psiquiatria", "saúde mental", "depressão", "ansiedade"],
    cbos: "225133",
  },
  {
    id: "consulta-pronto-socorro",
    code: "1.01.01.03-9",
    friendlyName: "Consulta em Pronto Socorro",
    category: "urgencia",
    keywords: ["urgência", "emergência", "pronto socorro", "ps"],
  },
]

// VISITAS HOSPITALARES - Seção 1.01.02
export const TUSS_VISITAS: TussProcedure[] = [
  {
    id: "visita-hospitalar",
    code: "1.01.02.01-9",
    friendlyName: "Visita Hospitalar",
    category: "procedimento",
    keywords: ["visita", "internação", "hospital", "acompanhamento"],
  },
]

// ATENDIMENTO RECÉM-NASCIDO - Seção 1.01.03
export const TUSS_RECEM_NASCIDO: TussProcedure[] = [
  {
    id: "rn-bercario",
    code: "1.01.03.01-5",
    friendlyName: "Atendimento ao Recém-Nascido em Berçário",
    category: "procedimento",
    keywords: ["recém-nascido", "rn", "berçário", "neonatal"],
  },
  {
    id: "rn-sala-parto-baixo-risco",
    code: "1.01.03.02-3",
    friendlyName: "Atendimento ao RN em Sala de Parto (Baixo Risco)",
    category: "procedimento",
    keywords: ["recém-nascido", "parto", "sala de parto", "baixo risco"],
  },
  {
    id: "rn-sala-parto-alto-risco",
    code: "1.01.03.03-1",
    friendlyName: "Atendimento ao RN em Sala de Parto (Alto Risco)",
    category: "procedimento",
    keywords: ["recém-nascido", "parto", "sala de parto", "alto risco", "reanimação"],
  },
]

// PROCEDIMENTOS CLÍNICOS AMBULATORIAIS - Seção 2.01.01
export const TUSS_PROCEDIMENTOS_CLINICOS: TussProcedure[] = [
  {
    id: "avaliacao-nutrologica",
    code: "2.01.01.07-4",
    friendlyName: "Avaliação Nutrológica",
    category: "procedimento",
    keywords: ["nutrição", "nutrologia", "dieta", "peso", "alimentação"],
  },
  {
    id: "avaliacao-geriatrica",
    code: "2.01.01.23-6",
    friendlyName: "Avaliação Geriátrica Ampla (AGA)",
    category: "procedimento",
    keywords: ["geriátrica", "idoso", "aga", "avaliação ampla"],
  },
  {
    id: "avaliacao-neurologica",
    code: "2.01.01.34-1",
    friendlyName: "Avaliação Neurológica Ampla (ANA)",
    category: "procedimento",
    keywords: ["neurológica", "ana", "avaliação neurológica"],
  },
  {
    id: "teste-provocacao-alimentos",
    code: "2.01.01.36-8",
    friendlyName: "Teste de Provocação Oral com Alimentos",
    category: "exame",
    keywords: ["alergia", "alimento", "teste", "provocação"],
  },
  {
    id: "acompanhamento-tabagista",
    code: "2.01.01.41-4",
    friendlyName: "Acompanhamento Clínico do Tabagista",
    category: "procedimento",
    keywords: ["tabagismo", "fumo", "cigarro", "parar de fumar"],
  },
]

// Compilando todos os procedimentos TUSS
export const tussProcedures: TussProcedure[] = [
  ...TUSS_CONSULTAS,
  ...TUSS_VISITAS,
  ...TUSS_RECEM_NASCIDO,
  ...TUSS_PROCEDIMENTOS_CLINICOS,
]

export const appointmentContexts = [
  { id: "primeira-vez", label: "Primeira vez" },
  { id: "retorno", label: "Retorno" },
  { id: "urgencia", label: "Urgência" },
]

export const urgencyLevels = [
  { id: "eletivo", label: "Eletivo" },
  { id: "urgencia", label: "Urgência" },
  { id: "emergencia", label: "Emergência" },
]

export const lateralityOptions = [
  { id: "direito", label: "Lado direito" },
  { id: "esquerdo", label: "Lado esquerdo" },
  { id: "bilateral", label: "Bilateral" },
]

export const locationOptions = [
  { id: "consultorio", label: "Consultório" },
  { id: "ambulatorio", label: "Ambulatório" },
  { id: "hospital", label: "Hospital" },
  { id: "domicilio", label: "Domicílio" },
]

// Função de busca inteligente
export function searchProcedures(query: string, category?: string): TussProcedure[] {
  const queryLower = query.toLowerCase().trim()

  if (!queryLower) {
    return category ? tussProcedures.filter((p) => p.category === category) : tussProcedures
  }

  return tussProcedures.filter((proc) => {
    const matchesCategory = !category || proc.category === category
    const matchesQuery =
      proc.friendlyName.toLowerCase().includes(queryLower) ||
      proc.keywords.some((kw) => kw.toLowerCase().includes(queryLower)) ||
      proc.code.includes(queryLower)

    return matchesCategory && matchesQuery
  })
}

// Validação de código TUSS
export function isValidTussCode(code: string): boolean {
  const pattern = /^\d\.\d{2}\.\d{2}\.\d{2}-\d$/
  return pattern.test(code)
}
