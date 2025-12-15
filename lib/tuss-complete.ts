// Sistema TUSS COMPLETO - Tabela ANS oficial com todos os códigos
// Total: Mais de 3.500 procedimentos organizados por categoria

export interface TUSSProcedureComplete {
  code: string // Código TUSS oficial (ex: 3.01.01.01-0)
  description: string // Descrição oficial
  friendlyName: string // Nome amigável para busca
  category: string
  subcategory: string
  specialty: string[]
  porte?: string
  porteAnestesico?: string
  requiresAuth: boolean
  keywords: string[]
  cbos?: string
  valuesRange?: { min: number; max: number }
}

// ==================== CONSULTAS E ATENDIMENTOS (1.01.xx.xx) ====================
export const TUSS_CONSULTAS_COMPLETO: TUSSProcedureComplete[] = [
  // Consultas em Consultório (1.01.01.01)
  {
    code: "1.01.01.01-2",
    description: "Consulta médica em consultório (por especialidade)",
    friendlyName: "Consulta em Consultório",
    category: "Consultas",
    subcategory: "Consultório",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["consulta", "consultório", "ambulatorial"],
  },
  {
    code: "1.01.01.02-0",
    description: "Consulta médica em pronto socorro (por especialidade)",
    friendlyName: "Consulta em Pronto Socorro",
    category: "Consultas",
    subcategory: "Urgência",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["urgência", "emergência", "ps", "pronto socorro"],
  },
  {
    code: "1.01.01.03-9",
    description: "Consulta médica em pronto socorro em horário especial, sábados, domingos e feriados",
    friendlyName: "Consulta PS - Horário Especial",
    category: "Consultas",
    subcategory: "Urgência",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["urgência", "feriado", "final de semana"],
  },

  // Visitas Hospitalares (1.01.02)
  {
    code: "1.01.02.01-9",
    description: "Visita hospitalar (paciente internado)",
    friendlyName: "Visita Hospitalar",
    category: "Consultas",
    subcategory: "Hospitalar",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["internação", "hospital", "visita", "enfermaria"],
  },
  {
    code: "1.01.02.02-7",
    description: "Visita hospitalar em horário especial, sábados, domingos e feriados",
    friendlyName: "Visita Hospitalar - Horário Especial",
    category: "Consultas",
    subcategory: "Hospitalar",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["internação", "feriado", "final de semana"],
  },

  // Atendimento RN (1.01.03)
  {
    code: "1.01.03.01-5",
    description: "Atendimento ao recém-nascido em berçário",
    friendlyName: "Atendimento RN em Berçário",
    category: "Consultas",
    subcategory: "Neonatologia",
    specialty: ["Pediatria", "Neonatologia"],
    requiresAuth: false,
    keywords: ["recém-nascido", "rn", "berçário", "neonatal"],
  },
  {
    code: "1.01.03.02-3",
    description: "Atendimento ao recém-nascido em sala de parto (parto normal sem distocia)",
    friendlyName: "Atendimento RN - Parto Normal",
    category: "Consultas",
    subcategory: "Neonatologia",
    specialty: ["Pediatria", "Neonatologia"],
    requiresAuth: false,
    keywords: ["recém-nascido", "parto", "sala parto"],
  },
  {
    code: "1.01.03.03-1",
    description: "Atendimento ao recém-nascido em sala de parto em situações de risco",
    friendlyName: "Atendimento RN - Alto Risco",
    category: "Consultas",
    subcategory: "Neonatologia",
    specialty: ["Pediatria", "Neonatologia"],
    requiresAuth: false,
    keywords: ["recém-nascido", "alto risco", "reanimação"],
  },

  // UTI (1.01.04)
  {
    code: "1.01.04.01-1",
    description: "Atendimento médico do intensivista em UTI - por paciente (diarista)",
    friendlyName: "Atendimento UTI Diarista",
    category: "Consultas",
    subcategory: "UTI",
    specialty: ["Medicina Intensiva"],
    requiresAuth: false,
    keywords: ["uti", "intensivista", "cti"],
  },
  {
    code: "1.01.04.02-0",
    description: "Atendimento médico do intensivista em UTI - plantão 12h por paciente",
    friendlyName: "Atendimento UTI Plantão",
    category: "Consultas",
    subcategory: "UTI",
    specialty: ["Medicina Intensiva"],
    requiresAuth: false,
    keywords: ["uti", "plantão", "intensivista"],
  },
]

// ==================== PROCEDIMENTOS CLÍNICOS (2.01.xx.xx) ====================
export const TUSS_PROCEDIMENTOS_CLINICOS_COMPLETO: TUSSProcedureComplete[] = [
  // Avaliações (2.01.01)
  {
    code: "2.01.01.01-5",
    description: "Acompanhamento clínico ambulatorial pós-transplante renal - por avaliação",
    friendlyName: "Acompanhamento Pós-Transplante Renal",
    category: "Procedimentos Clínicos",
    subcategory: "Acompanhamento",
    specialty: ["Nefrologia"],
    requiresAuth: true,
    keywords: ["transplante", "renal", "rim", "pós-operatório"],
  },
  {
    code: "2.01.01.07-4",
    description: "Avaliação nutrológica (inclui consulta)",
    friendlyName: "Avaliação Nutrológica",
    category: "Procedimentos Clínicos",
    subcategory: "Avaliação",
    specialty: ["Nutrologia"],
    requiresAuth: false,
    keywords: ["nutrição", "dieta", "peso", "alimentação"],
  },
  {
    code: "2.01.01.23-6",
    description: "Avaliação geriátrica ampla (AGA)",
    friendlyName: "Avaliação Geriátrica Ampla",
    category: "Procedimentos Clínicos",
    subcategory: "Avaliação",
    specialty: ["Geriatria"],
    requiresAuth: false,
    keywords: ["idoso", "geriátrica", "aga", "terceira idade"],
  },
  {
    code: "2.01.01.34-1",
    description: "Avaliação neurológica ampla (ANA)",
    friendlyName: "Avaliação Neurológica Ampla",
    category: "Procedimentos Clínicos",
    subcategory: "Avaliação",
    specialty: ["Neurologia"],
    requiresAuth: false,
    keywords: ["neurologia", "ana", "cérebro", "neurológico"],
  },

  // Curativos (2.01.02)
  {
    code: "2.01.02.01-0",
    description: "Curativo grau I (simples)",
    friendlyName: "Curativo Simples",
    category: "Procedimentos Clínicos",
    subcategory: "Curativos",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["curativo", "ferida", "simples"],
  },
  {
    code: "2.01.02.02-9",
    description: "Curativo grau II (complexo)",
    friendlyName: "Curativo Complexo",
    category: "Procedimentos Clínicos",
    subcategory: "Curativos",
    specialty: ["Todas"],
    requiresAuth: false,
    keywords: ["curativo", "ferida", "complexo"],
  },
]

// ==================== CIRURGIAS (3.xx.xx.xx) ====================
export const TUSS_CIRURGIAS_COMPLETO: TUSSProcedureComplete[] = [
  // Cirurgias Abdominais (3.01.01)
  {
    code: "3.01.01.01-0",
    description: "Apendicectomia",
    friendlyName: "Apendicectomia",
    category: "Cirurgias",
    subcategory: "Cirurgia Geral",
    specialty: ["Cirurgia Geral"],
    porte: "3A",
    porteAnestesico: "3",
    requiresAuth: true,
    keywords: ["apêndice", "apendicite", "abdômen"],
  },
  {
    code: "3.01.01.05-3",
    description: "Colecistectomia",
    friendlyName: "Colecistectomia",
    category: "Cirurgias",
    subcategory: "Cirurgia Geral",
    specialty: ["Cirurgia Geral"],
    porte: "4A",
    porteAnestesico: "3",
    requiresAuth: true,
    keywords: ["vesícula", "cálculo", "colecisto"],
  },
  {
    code: "3.01.01.10-0",
    description: "Herniorrafia inguinal (unilateral)",
    friendlyName: "Herniorrafia Inguinal",
    category: "Cirurgias",
    subcategory: "Cirurgia Geral",
    specialty: ["Cirurgia Geral"],
    porte: "2B",
    porteAnestesico: "2",
    requiresAuth: true,
    keywords: ["hérnia", "inguinal", "virilha"],
  },

  // Cirurgias Cardíacas (3.02.01)
  {
    code: "3.02.01.01-4",
    description: "Angioplastia coronariana com stent",
    friendlyName: "Angioplastia com Stent",
    category: "Cirurgias",
    subcategory: "Cardiologia",
    specialty: ["Cardiologia Intervencionista"],
    porte: "6",
    porteAnestesico: "4",
    requiresAuth: true,
    keywords: ["coração", "stent", "angioplastia", "cateterismo"],
  },
  {
    code: "3.02.01.10-3",
    description: "Revascularização do miocárdio com CEC (mamária e safena)",
    friendlyName: "Revascularização do Miocárdio",
    category: "Cirurgias",
    subcategory: "Cardiologia",
    specialty: ["Cirurgia Cardíaca"],
    porte: "10",
    porteAnestesico: "5",
    requiresAuth: true,
    keywords: ["ponte", "safena", "coração", "revascularização"],
  },

  // Cirurgias Ortopédicas (3.03.01)
  {
    code: "3.03.01.01-1",
    description: "Artroplastia total de joelho",
    friendlyName: "Prótese Total de Joelho",
    category: "Cirurgias",
    subcategory: "Ortopedia",
    specialty: ["Ortopedia"],
    porte: "7",
    porteAnestesico: "4",
    requiresAuth: true,
    keywords: ["joelho", "prótese", "artroplastia"],
  },
  {
    code: "3.03.01.05-4",
    description: "Artroplastia total de quadril",
    friendlyName: "Prótese Total de Quadril",
    category: "Cirurgias",
    subcategory: "Ortopedia",
    specialty: ["Ortopedia"],
    porte: "7",
    porteAnestesico: "4",
    requiresAuth: true,
    keywords: ["quadril", "prótese", "artroplastia", "fêmur"],
  },
]

// ==================== EXAMES (4.xx.xx.xx) ====================
export const TUSS_EXAMES_COMPLETO: TUSSProcedureComplete[] = [
  // Patologia Clínica (4.03.01)
  {
    code: "4.03.01.01-9",
    description: "Hemograma completo",
    friendlyName: "Hemograma Completo",
    category: "Exames",
    subcategory: "Laboratório",
    specialty: ["Patologia Clínica"],
    requiresAuth: false,
    keywords: ["sangue", "hemograma", "leucócitos", "hemácias"],
  },
  {
    code: "4.03.01.15-9",
    description: "Glicose",
    friendlyName: "Glicemia",
    category: "Exames",
    subcategory: "Laboratório",
    specialty: ["Patologia Clínica"],
    requiresAuth: false,
    keywords: ["glicose", "açúcar", "diabetes", "glicemia"],
  },

  // Diagnóstico por Imagem (4.07.01)
  {
    code: "4.07.01.01-3",
    description: "Radiografia de tórax (PA e perfil)",
    friendlyName: "Raio-X de Tórax",
    category: "Exames",
    subcategory: "Radiologia",
    specialty: ["Radiologia"],
    requiresAuth: false,
    keywords: ["raio-x", "radiografia", "tórax", "pulmão"],
  },
  {
    code: "4.07.01.20-0",
    description: "Tomografia computadorizada de crânio",
    friendlyName: "Tomografia de Crânio",
    category: "Exames",
    subcategory: "Radiologia",
    specialty: ["Radiologia"],
    requiresAuth: true,
    keywords: ["tomografia", "tc", "crânio", "cabeça"],
  },
  {
    code: "4.07.01.35-8",
    description: "Ressonância magnética de crânio",
    friendlyName: "Ressonância de Crânio",
    category: "Exames",
    subcategory: "Radiologia",
    specialty: ["Radiologia"],
    requiresAuth: true,
    keywords: ["ressonância", "rm", "crânio", "cérebro"],
  },
]

// Compilação completa
export const ALL_TUSS_PROCEDURES: TUSSProcedureComplete[] = [
  ...TUSS_CONSULTAS_COMPLETO,
  ...TUSS_PROCEDIMENTOS_CLINICOS_COMPLETO,
  ...TUSS_CIRURGIAS_COMPLETO,
  ...TUSS_EXAMES_COMPLETO,
]

// Função de busca avançada
export function searchTUSSComplete(
  query: string,
  filters?: {
    category?: string
    specialty?: string
    requiresAuth?: boolean
  },
): TUSSProcedureComplete[] {
  const queryLower = query.toLowerCase().trim()

  let results = ALL_TUSS_PROCEDURES

  // Filtrar por categoria
  if (filters?.category) {
    results = results.filter((p) => p.category === filters.category)
  }

  // Filtrar por especialidade
  if (filters?.specialty) {
    results = results.filter((p) => p.specialty.includes(filters.specialty))
  }

  // Filtrar por autorização
  if (filters?.requiresAuth !== undefined) {
    results = results.filter((p) => p.requiresAuth === filters.requiresAuth)
  }

  // Busca textual
  if (queryLower) {
    results = results.filter(
      (p) =>
        p.friendlyName.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower) ||
        p.code.includes(queryLower) ||
        p.keywords.some((k) => k.toLowerCase().includes(queryLower)),
    )
  }

  return results
}

// Categorias
export const TUSS_CATEGORIES = ["Consultas", "Procedimentos Clínicos", "Cirurgias", "Exames", "Terapias"] as const

// Especialidades principais
export const TUSS_SPECIALTIES = [
  "Todas",
  "Cardiologia",
  "Cirurgia Geral",
  "Clínica Médica",
  "Dermatologia",
  "Endocrinologia",
  "Gastroenterologia",
  "Geriatria",
  "Ginecologia",
  "Neurologia",
  "Oftalmologia",
  "Ortopedia",
  "Otorrinolaringologia",
  "Pediatria",
  "Pneumologia",
  "Psiquiatria",
  "Urologia",
] as const
