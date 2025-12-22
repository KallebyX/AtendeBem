'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

// Categorias Portaria 344/98 (ANVISA)
const CONTROLLED_SUBSTANCES_CATEGORIES: Record<string, string> = {
  'A1': 'Entorpecentes',
  'A2': 'Entorpecentes',
  'A3': 'Psicotropicos',
  'B1': 'Psicotropicos (Notificacao B)',
  'B2': 'Psicotropicos Anorexigenos',
  'C1': 'Outras substancias sujeitas a controle especial',
  'C2': 'Retinoides',
  'C3': 'Imunossupressoras',
  'C4': 'Anti-retrovirais',
  'C5': 'Anabolizantes'
}

export async function getPrescriptionTemplates(category?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // Return common prescription templates
    const templates = [
      { id: '1', name: 'Antibiotico - Amoxicilina', category: 'antibiotico', medications: [{ name: 'Amoxicilina 500mg', dosage: '1 comprimido de 8/8h por 7 dias' }] },
      { id: '2', name: 'Anti-inflamatorio - Ibuprofeno', category: 'anti-inflamatorio', medications: [{ name: 'Ibuprofeno 600mg', dosage: '1 comprimido de 8/8h apos refeicoes' }] },
      { id: '3', name: 'Analgesico - Dipirona', category: 'analgesico', medications: [{ name: 'Dipirona 500mg', dosage: '1 comprimido de 6/6h se dor' }] },
      { id: '4', name: 'Antialergico - Loratadina', category: 'antialergico', medications: [{ name: 'Loratadina 10mg', dosage: '1 comprimido ao dia' }] },
      { id: '5', name: 'Protetor Gastrico - Omeprazol', category: 'gastrico', medications: [{ name: 'Omeprazol 20mg', dosage: '1 comprimido em jejum' }] }
    ]

    const filtered = category ? templates.filter(t => t.category === category) : templates
    return { success: true, data: filtered }
  } catch (error: any) {
    console.error('Erro ao buscar templates:', error)
    return { error: error.message }
  }
}

export async function createPrescriptionTemplate(data: {
  name: string
  category?: string
  medications: any[]
  general_instructions?: string
  is_public?: boolean
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // In a full implementation, save to database
    // For now, return success with the template
    return {
      success: true,
      data: {
        id: `template-${Date.now()}`,
        ...data,
        user_id: user.id,
        created_at: new Date().toISOString()
      }
    }
  } catch (error: any) {
    console.error('Erro ao criar template:', error)
    return { error: error.message }
  }
}

export async function usePrescriptionTemplate(template_id: string, patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // Get template from static list
    const templates = [
      { id: '1', name: 'Antibiotico - Amoxicilina', medications: [{ name: 'Amoxicilina 500mg', dosage: '1 comprimido de 8/8h por 7 dias' }], general_instructions: 'Tomar com agua' },
      { id: '2', name: 'Anti-inflamatorio - Ibuprofeno', medications: [{ name: 'Ibuprofeno 600mg', dosage: '1 comprimido de 8/8h apos refeicoes' }], general_instructions: 'Tomar apos as refeicoes' },
      { id: '3', name: 'Analgesico - Dipirona', medications: [{ name: 'Dipirona 500mg', dosage: '1 comprimido de 6/6h se dor' }], general_instructions: 'Usar apenas se necessario' }
    ]

    const template = templates.find(t => t.id === template_id)
    if (!template) return { error: 'Template nao encontrado' }

    return {
      success: true,
      data: {
        medications: template.medications,
        general_instructions: template.general_instructions
      }
    }
  } catch (error: any) {
    console.error('Erro ao usar template:', error)
    return { error: error.message }
  }
}

export async function logPrescriptionAction(data: {
  prescription_id: string
  action: 'viewed' | 'printed' | 'sent' | 'signed' | 'cancelled'
  details?: any
  ip_address?: string
  user_agent?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // Log the action (in production, save to database)
    console.log(`Prescription ${data.prescription_id}: ${data.action} by ${user.id}`)

    return {
      success: true,
      data: {
        id: `log-${Date.now()}`,
        ...data,
        performed_by: user.id,
        created_at: new Date().toISOString()
      }
    }
  } catch (error: any) {
    console.error('Erro ao registrar acao:', error)
    return { error: error.message }
  }
}

export async function getPrescriptionHistory(prescription_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // Return mock history
    return {
      success: true,
      data: [
        { id: '1', action: 'created', performed_by: user.id, user_name: user.name, created_at: new Date().toISOString() }
      ]
    }
  } catch (error: any) {
    console.error('Erro ao buscar historico:', error)
    return { error: error.message }
  }
}

export async function logControlledSubstance(data: {
  prescription_id: string
  patient_id: string
  substance_name: string
  substance_portaria: string
  quantity_prescribed: string
  dosage: string
  notification_number?: string
  notification_type?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get patient info
    const patient = await db`
      SELECT full_name, cpf FROM patients WHERE id = ${data.patient_id} AND user_id = ${user.id}
    `

    if (!patient.length) return { error: 'Paciente nao encontrado' }

    // Log the controlled substance
    console.log(`Controlled substance logged: ${data.substance_name} (${data.substance_portaria}) for patient ${patient[0].full_name}`)

    return {
      success: true,
      data: {
        id: `cs-${Date.now()}`,
        ...data,
        patient_name: patient[0].full_name,
        patient_cpf: patient[0].cpf,
        prescriber_id: user.id,
        prescriber_name: user.name,
        prescriber_crm: user.crm,
        prescription_date: new Date().toISOString().split('T')[0]
      }
    }
  } catch (error: any) {
    console.error('Erro ao registrar substancia controlada:', error)
    return { error: error.message }
  }
}

export async function getControlledSubstancesReport(filters?: {
  start_date?: string
  end_date?: string
  patient_id?: string
  substance_portaria?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    // Return empty report (in production, query from database)
    return { success: true, data: [] }
  } catch (error: any) {
    console.error('Erro ao buscar relatorio:', error)
    return { error: error.message }
  }
}

export async function checkControlledSubstance(medication_name: string): Promise<{
  is_controlled: boolean
  portaria?: string
  category?: string
  requires_notification?: boolean
}> {
  // Lista simplificada - em producao, usar base completa da ANVISA
  const controlledList: Record<string, { portaria: string; notification: boolean }> = {
    // B1 - Psicotropicos (Receita B1 azul)
    'alprazolam': { portaria: 'B1', notification: true },
    'clonazepam': { portaria: 'B1', notification: true },
    'diazepam': { portaria: 'B1', notification: true },
    'lorazepam': { portaria: 'B1', notification: true },
    'midazolam': { portaria: 'B1', notification: true },

    // A1 - Entorpecentes (Receita A amarela)
    'codeina': { portaria: 'A1', notification: true },
    'morfina': { portaria: 'A1', notification: true },
    'fentanil': { portaria: 'A1', notification: true },

    // C1 - Controle especial (Receita C1 branca 2 vias)
    'bupropiona': { portaria: 'C1', notification: false },
    'fluoxetina': { portaria: 'C1', notification: false },
    'sertralina': { portaria: 'C1', notification: false },
    'escitalopram': { portaria: 'C1', notification: false }
  }

  const medName = medication_name.toLowerCase()

  for (const [substance, info] of Object.entries(controlledList)) {
    if (medName.includes(substance)) {
      return {
        is_controlled: true,
        portaria: info.portaria,
        category: CONTROLLED_SUBSTANCES_CATEGORIES[info.portaria],
        requires_notification: info.notification
      }
    }
  }

  return { is_controlled: false }
}
