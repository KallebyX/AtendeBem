// Base de dados de códigos CID-10 e CID-11
export interface CID10 {
  code: string
  description: string
  category: string
  subcategory?: string
}

export interface CID11 {
  code: string
  description: string
  category: string
  parentCode?: string
}

// Principais códigos CID-10
export const CID10_DATABASE: CID10[] = [
  // Doenças infecciosas
  {
    code: "A00",
    description: "Cólera",
    category: "Doenças Infecciosas e Parasitárias",
    subcategory: "Doenças Intestinais Infecciosas",
  },
  {
    code: "A09",
    description: "Diarreia e gastroenterite de origem infecciosa presumível",
    category: "Doenças Infecciosas e Parasitárias",
    subcategory: "Doenças Intestinais Infecciosas",
  },
  {
    code: "B15",
    description: "Hepatite aguda A",
    category: "Doenças Infecciosas e Parasitárias",
    subcategory: "Hepatite Viral",
  },
  {
    code: "B20",
    description: "Doença pelo vírus da imunodeficiência humana [HIV]",
    category: "Doenças Infecciosas e Parasitárias",
    subcategory: "HIV/AIDS",
  },

  // Neoplasias
  { code: "C50", description: "Neoplasia maligna da mama", category: "Neoplasias", subcategory: "Neoplasias Malignas" },
  {
    code: "C61",
    description: "Neoplasia maligna da próstata",
    category: "Neoplasias",
    subcategory: "Neoplasias Malignas",
  },
  {
    code: "C34",
    description: "Neoplasia maligna dos brônquios e dos pulmões",
    category: "Neoplasias",
    subcategory: "Neoplasias Malignas",
  },

  // Doenças endócrinas
  {
    code: "E10",
    description: "Diabetes mellitus tipo 1",
    category: "Doenças Endócrinas",
    subcategory: "Diabetes Mellitus",
  },
  {
    code: "E11",
    description: "Diabetes mellitus tipo 2",
    category: "Doenças Endócrinas",
    subcategory: "Diabetes Mellitus",
  },
  {
    code: "E66",
    description: "Obesidade",
    category: "Doenças Endócrinas",
    subcategory: "Obesidade e Transtornos Nutricionais",
  },
  {
    code: "E78",
    description: "Distúrbios do metabolismo de lipoproteínas e outras lipidemias",
    category: "Doenças Endócrinas",
    subcategory: "Distúrbios Metabólicos",
  },

  // Transtornos mentais
  {
    code: "F32",
    description: "Episódio depressivo",
    category: "Transtornos Mentais e Comportamentais",
    subcategory: "Transtornos do Humor",
  },
  {
    code: "F41",
    description: "Outros transtornos ansiosos",
    category: "Transtornos Mentais e Comportamentais",
    subcategory: "Transtornos Ansiosos",
  },
  {
    code: "F84",
    description: "Transtornos globais do desenvolvimento (Autismo)",
    category: "Transtornos Mentais e Comportamentais",
    subcategory: "Transtornos do Desenvolvimento",
  },

  // Sistema nervoso
  {
    code: "G40",
    description: "Epilepsia",
    category: "Doenças do Sistema Nervoso",
    subcategory: "Epilepsia e Convulsões",
  },
  {
    code: "G20",
    description: "Doença de Parkinson",
    category: "Doenças do Sistema Nervoso",
    subcategory: "Doenças Neurodegenerativas",
  },
  {
    code: "G30",
    description: "Doença de Alzheimer",
    category: "Doenças do Sistema Nervoso",
    subcategory: "Doenças Neurodegenerativas",
  },
  { code: "G43", description: "Enxaqueca", category: "Doenças do Sistema Nervoso", subcategory: "Cefaléias" },

  // Sistema circulatório
  {
    code: "I10",
    description: "Hipertensão arterial essencial (primária)",
    category: "Doenças do Aparelho Circulatório",
    subcategory: "Doenças Hipertensivas",
  },
  {
    code: "I21",
    description: "Infarto agudo do miocárdio",
    category: "Doenças do Aparelho Circulatório",
    subcategory: "Doenças Isquêmicas do Coração",
  },
  {
    code: "I50",
    description: "Insuficiência cardíaca",
    category: "Doenças do Aparelho Circulatório",
    subcategory: "Doenças do Coração",
  },
  {
    code: "I64",
    description: "Acidente vascular cerebral, não especificado",
    category: "Doenças do Aparelho Circulatório",
    subcategory: "Doenças Cerebrovasculares",
  },

  // Sistema respiratório
  {
    code: "J00",
    description: "Nasofaringite aguda (resfriado comum)",
    category: "Doenças do Aparelho Respiratório",
    subcategory: "Infecções Respiratórias Agudas",
  },
  {
    code: "J06",
    description: "Infecções agudas das vias aéreas superiores",
    category: "Doenças do Aparelho Respiratório",
    subcategory: "Infecções Respiratórias Agudas",
  },
  {
    code: "J18",
    description: "Pneumonia por microorganismo não especificado",
    category: "Doenças do Aparelho Respiratório",
    subcategory: "Pneumonia",
  },
  {
    code: "J44",
    description: "Doença pulmonar obstrutiva crônica (DPOC)",
    category: "Doenças do Aparelho Respiratório",
    subcategory: "Doenças Crônicas das Vias Aéreas",
  },
  {
    code: "J45",
    description: "Asma",
    category: "Doenças do Aparelho Respiratório",
    subcategory: "Doenças Crônicas das Vias Aéreas",
  },

  // Sistema digestivo
  {
    code: "K21",
    description: "Doença do refluxo gastroesofágico",
    category: "Doenças do Aparelho Digestivo",
    subcategory: "Doenças do Esôfago",
  },
  {
    code: "K29",
    description: "Gastrite e duodenite",
    category: "Doenças do Aparelho Digestivo",
    subcategory: "Doenças do Estômago",
  },
  {
    code: "K50",
    description: "Doença de Crohn",
    category: "Doenças do Aparelho Digestivo",
    subcategory: "Doenças Inflamatórias Intestinais",
  },
  {
    code: "K51",
    description: "Colite ulcerativa",
    category: "Doenças do Aparelho Digestivo",
    subcategory: "Doenças Inflamatórias Intestinais",
  },
  {
    code: "K80",
    description: "Colelitíase (cálculo biliar)",
    category: "Doenças do Aparelho Digestivo",
    subcategory: "Doenças da Vesícula Biliar",
  },

  // Sistema geniturinário
  {
    code: "N18",
    description: "Doença renal crônica",
    category: "Doenças do Aparelho Geniturinário",
    subcategory: "Doenças Renais",
  },
  {
    code: "N39",
    description: "Infecção do trato urinário",
    category: "Doenças do Aparelho Geniturinário",
    subcategory: "Doenças do Sistema Urinário",
  },

  // Sistema musculoesquelético
  {
    code: "M06",
    description: "Artrite reumatoide",
    category: "Doenças do Sistema Osteomuscular",
    subcategory: "Artropatias Inflamatórias",
  },
  { code: "M15", description: "Poliartrose", category: "Doenças do Sistema Osteomuscular", subcategory: "Artrose" },
  { code: "M19", description: "Outras artroses", category: "Doenças do Sistema Osteomuscular", subcategory: "Artrose" },
  {
    code: "M54",
    description: "Dorsalgia (dor nas costas)",
    category: "Doenças do Sistema Osteomuscular",
    subcategory: "Dorsopatias",
  },
  {
    code: "M79",
    description: "Outros transtornos dos tecidos moles",
    category: "Doenças do Sistema Osteomuscular",
    subcategory: "Transtornos de Tecidos Moles",
  },

  // Lesões e causas externas
  {
    code: "S06",
    description: "Traumatismo intracraniano",
    category: "Lesões, Envenenamento e Causas Externas",
    subcategory: "Traumatismos da Cabeça",
  },
  {
    code: "T14",
    description: "Traumatismo de região não especificada",
    category: "Lesões, Envenenamento e Causas Externas",
    subcategory: "Traumatismos",
  },

  // Sintomas e sinais
  {
    code: "R50",
    description: "Febre de origem desconhecida",
    category: "Sintomas, Sinais e Achados Anormais",
    subcategory: "Sintomas Gerais",
  },
  {
    code: "R51",
    description: "Cefaleia",
    category: "Sintomas, Sinais e Achados Anormais",
    subcategory: "Sintomas Gerais",
  },
  {
    code: "R06",
    description: "Anormalidades da respiração",
    category: "Sintomas, Sinais e Achados Anormais",
    subcategory: "Sintomas Respiratórios",
  },
  {
    code: "R10",
    description: "Dor abdominal e pélvica",
    category: "Sintomas, Sinais e Achados Anormais",
    subcategory: "Sintomas Abdominais",
  },
]

// Principais códigos CID-11 (Nova Classificação OMS)
export const CID11_DATABASE: CID11[] = [
  // Doenças infecciosas
  { code: "1A00", description: "Cólera", category: "Doenças Infecciosas e Parasitárias" },
  {
    code: "1E50",
    description: "Doença pelo vírus da imunodeficiência humana [HIV]",
    category: "Doenças Infecciosas e Parasitárias",
  },

  // Neoplasias
  { code: "2C60", description: "Neoplasia maligna da mama", category: "Neoplasias" },
  { code: "2C82", description: "Neoplasia maligna da próstata", category: "Neoplasias" },

  // Doenças do sangue
  { code: "3A10", description: "Anemia por deficiência de ferro", category: "Doenças do Sangue" },

  // Doenças do sistema imune
  { code: "4A00", description: "Doenças alérgicas ou hipersensibilidade", category: "Doenças do Sistema Imune" },

  // Doenças endócrinas
  { code: "5A10", description: "Diabetes mellitus tipo 1", category: "Doenças Endócrinas, Nutricionais e Metabólicas" },
  { code: "5A11", description: "Diabetes mellitus tipo 2", category: "Doenças Endócrinas, Nutricionais e Metabólicas" },
  { code: "5B81", description: "Obesidade", category: "Doenças Endócrinas, Nutricionais e Metabólicas" },

  // Transtornos mentais
  {
    code: "6A70",
    description: "Transtorno do espectro do autismo",
    category: "Transtornos Mentais, Comportamentais e do Neurodesenvolvimento",
  },
  {
    code: "6A71",
    description: "Transtorno de déficit de atenção e hiperatividade",
    category: "Transtornos Mentais, Comportamentais e do Neurodesenvolvimento",
  },
  {
    code: "6A40",
    description: "Transtorno depressivo",
    category: "Transtornos Mentais, Comportamentais e do Neurodesenvolvimento",
  },
  {
    code: "6B00",
    description: "Transtornos de ansiedade",
    category: "Transtornos Mentais, Comportamentais e do Neurodesenvolvimento",
  },

  // Sistema nervoso
  { code: "8A60", description: "Doença de Parkinson", category: "Doenças do Sistema Nervoso" },
  { code: "8A20", description: "Doença de Alzheimer", category: "Doenças do Sistema Nervoso" },
  { code: "8A61", description: "Epilepsia", category: "Doenças do Sistema Nervoso" },
  { code: "8A80", description: "Enxaqueca", category: "Doenças do Sistema Nervoso" },

  // Sistema circulatório
  { code: "BA00", description: "Hipertensão essencial", category: "Doenças do Sistema Circulatório" },
  { code: "BA40", description: "Infarto agudo do miocárdio", category: "Doenças do Sistema Circulatório" },
  { code: "BD10", description: "Insuficiência cardíaca", category: "Doenças do Sistema Circulatório" },
  { code: "8B20", description: "Acidente vascular cerebral", category: "Doenças do Sistema Circulatório" },

  // Sistema respiratório
  {
    code: "CA00",
    description: "Infecção aguda do trato respiratório superior",
    category: "Doenças do Sistema Respiratório",
  },
  { code: "CA40", description: "Pneumonia", category: "Doenças do Sistema Respiratório" },
  { code: "CA22", description: "Doença pulmonar obstrutiva crônica", category: "Doenças do Sistema Respiratório" },
  { code: "CA23", description: "Asma", category: "Doenças do Sistema Respiratório" },

  // Sistema digestivo
  { code: "DA22", description: "Doença do refluxo gastroesofágico", category: "Doenças do Sistema Digestivo" },
  { code: "DA40", description: "Gastrite", category: "Doenças do Sistema Digestivo" },
  { code: "DD70", description: "Doença de Crohn", category: "Doenças do Sistema Digestivo" },
  { code: "DD71", description: "Colite ulcerativa", category: "Doenças do Sistema Digestivo" },

  // Sistema geniturinário
  { code: "GB60", description: "Doença renal crônica", category: "Doenças do Sistema Geniturinário" },
  { code: "GC08", description: "Infecção do trato urinário", category: "Doenças do Sistema Geniturinário" },

  // Sistema musculoesquelético
  { code: "FA20", description: "Artrite reumatoide", category: "Doenças do Sistema Musculoesquelético" },
  { code: "FA00", description: "Osteoartrite", category: "Doenças do Sistema Musculoesquelético" },
  { code: "ME84", description: "Dor lombar", category: "Doenças do Sistema Musculoesquelético" },
]

export function searchCID10(query: string): CID10[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return []

  return CID10_DATABASE.filter(
    (cid) =>
      cid.code.toLowerCase().includes(normalizedQuery) ||
      cid.description.toLowerCase().includes(normalizedQuery) ||
      cid.category.toLowerCase().includes(normalizedQuery),
  ).slice(0, 15)
}

export function searchCID11(query: string): CID11[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return []

  return CID11_DATABASE.filter(
    (cid) =>
      cid.code.toLowerCase().includes(normalizedQuery) ||
      cid.description.toLowerCase().includes(normalizedQuery) ||
      cid.category.toLowerCase().includes(normalizedQuery),
  ).slice(0, 15)
}

export function getCID10ByCode(code: string): CID10 | undefined {
  return CID10_DATABASE.find((cid) => cid.code === code)
}

export function getCID11ByCode(code: string): CID11 | undefined {
  return CID11_DATABASE.find((cid) => cid.code === code)
}
