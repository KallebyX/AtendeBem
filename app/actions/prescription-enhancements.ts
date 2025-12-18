'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

// Categorias Portaria 344/98 (ANVISA)
const CONTROLLED_SUBSTANCES_CATEGORIES = {
  'A1': 'Entorpecentes',
  'A2': 'Entorpecentes',
  'A3': 'Psicotrópicos',
  'B1': 'Psicotrópicos (Notificação B)',
  'B2': 'Psicotrópicos Anorexígenos',
  'C1': 'Outras substâncias sujeitas a controle especial',
  'C2': 'Retinóides',
  'C3': 'Imunossupressoras',
  'C4': 'Anti-retrovirais',
  'C5': 'Anabolizantes'
}

export async function getPrescriptionTemplates(category?: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT * FROM prescription_templates
      WHERE (tenant_id = ${user.tenant_id} OR is_public = true)
        AND is_active = true
        ${category ? db`AND category = ${category}` : db``}
      ORDER BY is_public DESC, usage_count DESC, name
      LIMIT 50
    `

    return { success: true, data: result }
  } catch (error: any) {
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
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      INSERT INTO prescription_templates (
        tenant_id, user_id, name, category, medications,
        general_instructions, is_public
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${data.name}, ${data.category || null},
        ${JSON.stringify(data.medications)}, ${data.general_instructions || null},
        ${data.is_public || false}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function usePrescriptionTemplate(template_id: string, patient_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar template
    const template = await db`
      SELECT * FROM prescription_templates WHERE id = ${template_id}
    `

    if (!template.length) return { error: 'Template não encontrado' }

    // Atualizar contador de uso
    await db`
      UPDATE prescription_templates
      SET usage_count = usage_count + 1,
          last_used_at = NOW()
      WHERE id = ${template_id}
    `

    // Retornar dados para preencher formulário
    return {
      success: true,
      data: {
        medications: template[0].medications,
        general_instructions: template[0].general_instructions
      }
    }
  } catch (error: any) {
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
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      INSERT INTO prescription_history (
        prescription_id, tenant_id, action, performed_by,
        details, ip_address, user_agent
      ) VALUES (
        ${data.prescription_id}, ${user.tenant_id}, ${data.action},
        ${user.id}, ${data.details ? JSON.stringify(data.details) : null},
        ${data.ip_address || null}, ${data.user_agent || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getPrescriptionHistory(prescription_id: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT h.*, u.name as user_name
      FROM prescription_history h
      LEFT JOIN users u ON h.performed_by = u.id
      WHERE h.prescription_id = ${prescription_id}
        AND h.tenant_id = ${user.tenant_id}
      ORDER BY h.created_at DESC
    `

    return { success: true, data: result }
  } catch (error: any) {
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
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    // Buscar dados do paciente
    const patient = await db`
      SELECT name, cpf FROM patients WHERE id = ${data.patient_id}
    `

    if (!patient.length) return { error: 'Paciente não encontrado' }

    // Buscar dados do prescritor
    const prescriber = await db`
      SELECT name, crm, crm_uf FROM users WHERE id = ${user.id}
    `

    const result = await db`
      INSERT INTO controlled_substances_log (
        tenant_id, prescription_id, substance_name, substance_portaria,
        patient_id, patient_name, patient_cpf, prescriber_id,
        prescriber_name, prescriber_crm, prescriber_uf, quantity_prescribed,
        dosage, prescription_date, notification_number, notification_type
      ) VALUES (
        ${user.tenant_id}, ${data.prescription_id}, ${data.substance_name},
        ${data.substance_portaria}, ${data.patient_id}, ${patient[0].name},
        ${patient[0].cpf || null}, ${user.id}, ${prescriber[0].name},
        ${prescriber[0].crm || null}, ${prescriber[0].crm_uf || null},
        ${data.quantity_prescribed}, ${data.dosage}, CURRENT_DATE,
        ${data.notification_number || null}, ${data.notification_type || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
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
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = getDb()

    const result = await db`
      SELECT * FROM controlled_substances_log
      WHERE tenant_id = ${user.tenant_id}
        ${filters?.start_date ? db`AND prescription_date >= ${filters.start_date}` : db``}
        ${filters?.end_date ? db`AND prescription_date <= ${filters.end_date}` : db``}
        ${filters?.patient_id ? db`AND patient_id = ${filters.patient_id}` : db``}
        ${filters?.substance_portaria ? db`AND substance_portaria = ${filters.substance_portaria}` : db``}
      ORDER BY prescription_date DESC, created_at DESC
      LIMIT 500
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function checkControlledSubstance(medication_name: string): Promise<{
  is_controlled: boolean
  portaria?: string
  category?: string
  requires_notification?: boolean
}> {
  // Lista simplificada - em produção, usar base completa da ANVISA
  const controlledList: Record<string, { portaria: string; notification: boolean }> = {
    // B1 - Psicotrópicos (Receita B1 azul)
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
        category: CONTROLLED_SUBSTANCES_CATEGORIES[info.portaria as keyof typeof CONTROLLED_SUBSTANCES_CATEGORIES],
        requires_notification: info.notification
      }
    }
  }

  return { is_controlled: false }
}
