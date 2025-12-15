// Base de dados de medicamentos do SUS (Nacional + RS)
export interface Medication {
  id?: number
  name: string
  activeIngredient: string
  concentration: string
  pharmaceuticalForm: string
  administrationRoute: string
  protocol: string
  registryType: "NACIONAL" | "ESTADUAL_RS"
  isControlled: boolean
  isHighCost: boolean
  susAvailable: boolean
}

export const MEDICATIONS_DATABASE: Medication[] = [
  // Acromegalia
  {
    name: "Cabergolina",
    activeIngredient: "Cabergolina",
    concentration: "0,5 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "ACROMEGALIA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  {
    name: "Lanreotida 60mg",
    activeIngredient: "Lanreotida",
    concentration: "60 mg",
    pharmaceuticalForm: "Solução Injetável",
    administrationRoute: "Subcutânea",
    protocol: "ACROMEGALIA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  {
    name: "Octreotida",
    activeIngredient: "Octreotida",
    concentration: "0,1 mg/ml",
    pharmaceuticalForm: "Solução Injetável",
    administrationRoute: "Subcutânea/Intravenosa",
    protocol: "ACROMEGALIA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  // Anemia
  {
    name: "Alfaepoetina 1.000 UI",
    activeIngredient: "Alfaepoetina",
    concentration: "1.000 UI",
    pharmaceuticalForm: "Solução Injetável",
    administrationRoute: "Subcutânea/Intravenosa",
    protocol: "ANEMIA NA DOENÇA RENAL CRÔNICA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  {
    name: "Alfaepoetina 2.000 UI",
    activeIngredient: "Alfaepoetina",
    concentration: "2.000 UI",
    pharmaceuticalForm: "Solução Injetável",
    administrationRoute: "Subcutânea/Intravenosa",
    protocol: "ANEMIA NA DOENÇA RENAL CRÔNICA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  // Artrite
  {
    name: "Adalimumabe",
    activeIngredient: "Adalimumabe",
    concentration: "40 mg",
    pharmaceuticalForm: "Solução Injetável",
    administrationRoute: "Subcutânea",
    protocol: "ARTRITE REUMATOIDE / ARTRITE PSORÍACA / DOENÇA DE CROHN",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  {
    name: "Metotrexato 2,5mg",
    activeIngredient: "Metotrexato",
    concentration: "2,5 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "ARTRITE REUMATOIDE / ARTRITE IDIOPÁTICA JUVENIL",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: false,
    susAvailable: true,
  },
  {
    name: "Sulfassalazina",
    activeIngredient: "Sulfassalazina",
    concentration: "500 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "ARTRITE REUMATOIDE / DOENÇA DE CROHN",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: false,
    susAvailable: true,
  },
  // Asma e DPOC
  {
    name: "Budesonida 200mcg",
    activeIngredient: "Budesonida",
    concentration: "200 mcg",
    pharmaceuticalForm: "Cápsula Inalante",
    administrationRoute: "Inalatória",
    protocol: "ASMA / DOENÇA PULMONAR OBSTRUTIVA CRÔNICA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: false,
    susAvailable: true,
  },
  {
    name: "Formoterol 12mcg",
    activeIngredient: "Formoterol",
    concentration: "12 mcg",
    pharmaceuticalForm: "Cápsula Inalante",
    administrationRoute: "Inalatória",
    protocol: "ASMA / DOENÇA PULMONAR OBSTRUTIVA CRÔNICA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: false,
    susAvailable: true,
  },
  // Medicamentos controlados - Dor
  {
    name: "Codeína 30mg",
    activeIngredient: "Codeína",
    concentration: "30 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "DOR CRÔNICA",
    registryType: "ESTADUAL_RS",
    isControlled: true,
    isHighCost: false,
    susAvailable: true,
  },
  {
    name: "Morfina 10mg",
    activeIngredient: "Morfina",
    concentration: "10 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "DOR CRÔNICA",
    registryType: "ESTADUAL_RS",
    isControlled: true,
    isHighCost: false,
    susAvailable: true,
  },
  {
    name: "Gabapentina 300mg",
    activeIngredient: "Gabapentina",
    concentration: "300 mg",
    pharmaceuticalForm: "Cápsula",
    administrationRoute: "Oral",
    protocol: "DOR CRÔNICA / EPILEPSIA",
    registryType: "ESTADUAL_RS",
    isControlled: true,
    isHighCost: false,
    susAvailable: true,
  },
  // Diabetes
  {
    name: "Insulina Glargina",
    activeIngredient: "Insulina Glargina",
    concentration: "100 UI/ml",
    pharmaceuticalForm: "Solução Injetável",
    administrationRoute: "Subcutânea",
    protocol: "DIABETES MELITO",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  {
    name: "Dapagliflozina",
    activeIngredient: "Dapagliflozina",
    concentration: "10 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "DIABETES MELITO TIPO 2",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  // Neurologia
  {
    name: "Donepezila 10mg",
    activeIngredient: "Donepezila",
    concentration: "10 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "DOENÇA DE ALZHEIMER",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: true,
    susAvailable: true,
  },
  {
    name: "Levodopa + Carbidopa",
    activeIngredient: "Levodopa + Carbidopa",
    concentration: "250mg + 25mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "DOENÇA DE PARKINSON",
    registryType: "NACIONAL",
    isControlled: false,
    isHighCost: false,
    susAvailable: true,
  },
  {
    name: "Lamotrigina 100mg",
    activeIngredient: "Lamotrigina",
    concentration: "100 mg",
    pharmaceuticalForm: "Comprimido",
    administrationRoute: "Oral",
    protocol: "EPILEPSIA",
    registryType: "ESTADUAL_RS",
    isControlled: false,
    isHighCost: false,
    susAvailable: true,
  },
]

export function searchMedications(query: string): Medication[] {
  const normalizedQuery = query.toLowerCase().trim()
  if (!normalizedQuery) return []

  return MEDICATIONS_DATABASE.filter(
    (med) =>
      med.name.toLowerCase().includes(normalizedQuery) ||
      med.activeIngredient.toLowerCase().includes(normalizedQuery) ||
      med.protocol.toLowerCase().includes(normalizedQuery),
  ).slice(0, 20)
}

export function getMedicationsByProtocol(protocol: string): Medication[] {
  return MEDICATIONS_DATABASE.filter((med) => med.protocol.toLowerCase().includes(protocol.toLowerCase()))
}
