export interface TUSSProcedimento {
  codigo: string
  descricao: string
  porte: string
  porteAnestesico?: string
  especialidade: string[]
  categoria: string
  requerAutorizacao: boolean
  valorMinimo?: number
  observacoes?: string
}

export interface TUSSConsulta {
  codigo: string
  especialidade: string
  descricao: string
  cbos?: string
}

// CONSULTAS - Seção 1.01.01.01
export const TUSS_CONSULTAS: TUSSConsulta[] = [
  { codigo: "1.01.01.01-2", especialidade: "Reumatologia", descricao: "Consulta com Reumatologista", cbos: "225136" },
  {
    codigo: "1.01.01.01-2",
    especialidade: "Alergologia/Imunologia",
    descricao: "Consulta com Alergologista/Imunologista",
    cbos: "225110",
  },
  { codigo: "1.01.01.01-2", especialidade: "Clínica Geral", descricao: "Consulta com Clínico Geral", cbos: "225125" },
  { codigo: "1.01.01.01-2", especialidade: "Pneumologia", descricao: "Consulta com Pneumologista", cbos: "225127" },
  {
    codigo: "51.01.01.01",
    especialidade: "Hemodinâmica",
    descricao: "Consulta com Hemodinamicista e Cardiologista Intervencionista",
  },
  {
    codigo: "1.01.01.01-2",
    especialidade: "Ginecologia",
    descricao: "Consulta com Ginecologista e Obstétra",
    cbos: "225250",
  },
  { codigo: "1.01.01.01-2", especialidade: "Neurocirurgia", descricao: "Consulta com Neurocirurgião", cbos: "225260" },
  {
    codigo: "1.01.01.01-2",
    especialidade: "Cirurgia Pediátrica",
    descricao: "Consulta com Cirurgião Pediátrico",
    cbos: "225230",
  },
  { codigo: "1.01.01.01-2", especialidade: "Pediatria", descricao: "Consulta com Pediatra Eletiva", cbos: "225124" },
  {
    codigo: "1.01.01.01-2",
    especialidade: "Endocrinologia",
    descricao: "Consulta com Endocrinologista e Metabologista",
    cbos: "225155",
  },
  { codigo: "1.01.01.01-2", especialidade: "Geriatria", descricao: "Consulta com Geriatra", cbos: "225180" },
  { codigo: "1.01.01.01-2", especialidade: "Infectologia", descricao: "Consulta com Infectologista", cbos: "225103" },
  { codigo: "1.01.01.01-2", especialidade: "Neurologia", descricao: "Consulta com Neurologista", cbos: "225112" },
  { codigo: "1.01.01.01-2", especialidade: "Psiquiatria", descricao: "Consulta com Psiquiatra", cbos: "225133" },
  { codigo: "1.01.01.03-9", especialidade: "Pronto Socorro", descricao: "Consulta em Pronto Socorro" },
]

// VISITAS HOSPITALARES - Seção 1.01.02
export const TUSS_VISITAS = [{ codigo: "1.01.02.01-9", descricao: "Visita Hospitalar (Paciente Internado)" }]

// ATENDIMENTO RN - Seção 1.01.03
export const TUSS_RECEM_NASCIDO = [
  { codigo: "1.01.03.01-5", descricao: "Atendimento ao Recém-Nascido em Berçário" },
  { codigo: "1.01.03.02-3", descricao: "Atendimento ao RN em Sala de Parto (Baixo Risco)" },
  { codigo: "1.01.03.03-1", descricao: "Atendimento ao RN em Sala de Parto (Alto Risco)" },
]

// UTI - Seção 1.01.04
export const TUSS_UTI = [
  { codigo: "1.01.04.01-1", descricao: "Atendimento do Intensivista Diarista (Por Dia e Por Paciente)" },
  { codigo: "1.01.04.02-0", descricao: "Atendimento Médico do Intensivista em UTI (Plantão 12h - Por Paciente)" },
]

// PROCEDIMENTOS CLÍNICOS AMBULATORIAIS - Seção 2.01.01
export const TUSS_PROCEDIMENTOS_CLINICOS = [
  { codigo: "2.01.01.01-5", descricao: "Acompanhamento Clínico Ambulatorial Pós-Transplante Renal - Por Avaliação" },
  { codigo: "2.01.01.02-3", descricao: "Análise da Proporcionalidade Cineantropométrica" },
  { codigo: "2.01.01.07-4", descricao: "Avaliação Nutrológica (Inclui Consulta)" },
  { codigo: "2.01.01.08-2", descricao: "Avaliação Nutrológica Pré e Pós-Cirurgia Bariátrica" },
  { codigo: "2.01.01.09-0", descricao: "Avaliação da Composição Corporal por Antropometria" },
  { codigo: "2.01.01.10-4", descricao: "Avaliação da Composição Corporal por Bioimpedanciometria" },
  { codigo: "2.01.01.11-2", descricao: "Avaliação da Composição Corporal por Pesagem Hidrostática" },
  { codigo: "2.01.01.23-6", descricao: "Avaliação Geriátrica Ampla (AGA)" },
  { codigo: "2.01.01.34-1", descricao: "Avaliação Neurológica Ampla (ANA)" },
]

// Categorias principais de procedimentos
export const TUSS_CATEGORIAS = {
  CONSULTAS: "Consultas e Atendimentos",
  PROCEDIMENTOS_CLINICOS: "Procedimentos Clínicos",
  CIRURGIAS: "Procedimentos Cirúrgicos",
  EXAMES: "Exames Complementares",
  TERAPIAS: "Terapias e Tratamentos",
  URGENCIA: "Urgência e Emergência",
} as const

// Regras de autorização prévia
export const REGRAS_AUTORIZACAO = {
  VALOR_MINIMO: 300, // Eventos acima de R$ 300 exigem autorização
  PRAZO_VALIDADE_PEDIDO: 30, // dias
  CIRURGIA_PLASTICA: "Necessária perícia médica",
  QUIMIOTERAPIA: "Relatório com quantidade de sessões, dosagem e tempo de infusão",
}

// Portes cirúrgicos
export const PORTES = {
  "1A": { valor: 1, descricao: "Porte 1A" },
  "1B": { valor: 1.2, descricao: "Porte 1B" },
  "1C": { valor: 1.4, descricao: "Porte 1C" },
  "2A": { valor: 1.6, descricao: "Porte 2A" },
  "2B": { valor: 2, descricao: "Porte 2B" },
  "2C": { valor: 2.4, descricao: "Porte 2C" },
  "3A": { valor: 3, descricao: "Porte 3A" },
  "3B": { valor: 3.6, descricao: "Porte 3B" },
  "3C": { valor: 4.2, descricao: "Porte 3C" },
  "4A": { valor: 5, descricao: "Porte 4A" },
  "4B": { valor: 6, descricao: "Porte 4B" },
  "4C": { valor: 7, descricao: "Porte 4C" },
  "5A": { valor: 8, descricao: "Porte 5A" },
  "5B": { valor: 9, descricao: "Porte 5B" },
  "5C": { valor: 10, descricao: "Porte 5C" },
  "6": { valor: 12, descricao: "Porte 6" },
  "7": { valor: 14, descricao: "Porte 7" },
  "8": { valor: 16, descricao: "Porte 8" },
  "9": { valor: 18, descricao: "Porte 9" },
  "10": { valor: 20, descricao: "Porte 10" },
  "11": { valor: 22, descricao: "Porte 11" },
  "12": { valor: 24, descricao: "Porte 12" },
}

// Função para buscar procedimentos
export function buscarProcedimento(termo: string): TUSSProcedimento[] {
  const termoLower = termo.toLowerCase()

  // Busca em todas as bases
  const resultados: TUSSProcedimento[] = []

  // Adicionar lógica de busca aqui
  // Por enquanto retorna array vazio

  return resultados
}

// Função para validar código TUSS
export function validarCodigoTUSS(codigo: string): boolean {
  const regex = /^\d{1,2}\.\d{2}\.\d{2}\.\d{2}-\d$/
  return regex.test(codigo)
}

// Função para calcular porte total considerando múltiplos procedimentos
export function calcularPorteTotal(procedimentos: TUSSProcedimento[]): number {
  if (procedimentos.length === 0) return 0
  if (procedimentos.length === 1) return PORTES[procedimentos[0].porte as keyof typeof PORTES]?.valor || 0

  // Ordenar por porte (maior primeiro)
  const ordenados = [...procedimentos].sort((a, b) => {
    const porteA = PORTES[a.porte as keyof typeof PORTES]?.valor || 0
    const porteB = PORTES[b.porte as keyof typeof PORTES]?.valor || 0
    return porteB - porteA
  })

  // Porte principal + 50% dos demais (mesma via) ou 70% (vias diferentes)
  const principal = PORTES[ordenados[0].porte as keyof typeof PORTES]?.valor || 0
  let adicional = 0

  for (let i = 1; i < ordenados.length; i++) {
    const porteProc = PORTES[ordenados[i].porte as keyof typeof PORTES]?.valor || 0
    adicional += porteProc * 0.5 // Assumindo mesma via por padrão
  }

  return principal + adicional
}
