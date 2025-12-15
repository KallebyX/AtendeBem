// Mapeamento completo de especialidades médicas com seus procedimentos típicos

export const ESPECIALIDADES = {
  "Clínica Geral": {
    nome: "Clínica Geral",
    descricao: "Atendimento médico geral e triagem",
    procedimentosComuns: ["Consulta", "Exame físico", "Prescrição"],
    cor: "#0A2342",
  },
  Cardiologia: {
    nome: "Cardiologia",
    descricao: "Doenças do coração e sistema cardiovascular",
    procedimentosComuns: ["ECG", "Ecocardiograma", "Teste ergométrico"],
    cor: "#DC2626",
  },
  Pediatria: {
    nome: "Pediatria",
    descricao: "Saúde de crianças e adolescentes",
    procedimentosComuns: ["Puericultura", "Vacinação", "Crescimento e desenvolvimento"],
    cor: "#2DD4BF",
  },
  Ginecologia: {
    nome: "Ginecologia e Obstetrícia",
    descricao: "Saúde da mulher",
    procedimentosComuns: ["Pré-natal", "Papanicolau", "Ultrassom obstétrico"],
    cor: "#EC4899",
  },
  Ortopedia: {
    nome: "Ortopedia",
    descricao: "Doenças do sistema musculoesquelético",
    procedimentosComuns: ["Raio-X", "Infiltração", "Imobilização"],
    cor: "#F59E0B",
  },
  Neurologia: {
    nome: "Neurologia",
    descricao: "Doenças do sistema nervoso",
    procedimentosComuns: ["EEG", "Eletroneuromiografia", "Doppler transcraniano"],
    cor: "#8B5CF6",
  },
  Dermatologia: {
    nome: "Dermatologia",
    descricao: "Doenças da pele",
    procedimentosComuns: ["Biópsia", "Crioterapia", "Cauterização"],
    cor: "#F97316",
  },
  Oftalmologia: {
    nome: "Oftalmologia",
    descricao: "Doenças dos olhos",
    procedimentosComuns: ["Teste de acuidade visual", "Fundoscopia", "Tonometria"],
    cor: "#06B6D4",
  },
  Psiquiatria: {
    nome: "Psiquiatria",
    descricao: "Saúde mental",
    procedimentosComuns: ["Avaliação psiquiátrica", "Psicoterapia", "Ajuste medicamentoso"],
    cor: "#6366F1",
  },
  Endocrinologia: {
    nome: "Endocrinologia",
    descricao: "Doenças do sistema endócrino",
    procedimentosComuns: ["Controle glicêmico", "Avaliação tireoideana", "Densitometria"],
    cor: "#10B981",
  },
} as const

export type EspecialidadeKey = keyof typeof ESPECIALIDADES
