'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

// ============================================================================
// AUTENTICAÇÃO HELPER
// ============================================================================
async function getAuthenticatedUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return { error: 'Não autenticado' }
  const user = await verifyToken(token)
  if (!user) return { error: 'Token inválido' }

  await setUserContext(user.id)
  return { user }
}

// ============================================================================
// SERVIÇOS NFE
// ============================================================================
export interface NFeServiceData {
  code: string
  description: string
  lc116_code: string
  cnae_code?: string
  iss_rate: number
  unit_price: number
  category?: string
  is_active?: boolean
}

export async function getNFeServices() {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    // Verificar se tabela existe e buscar serviços
    const services = await db`
      SELECT * FROM nfe_services
      WHERE tenant_id = ${tenantId}
      ORDER BY code ASC
    `.catch(() => [])

    return { success: true, data: services }
  } catch (error: any) {
    console.error('Erro ao buscar serviços:', error)
    return { error: error.message }
  }
}

export async function createNFeService(data: NFeServiceData) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    // Verificar se código já existe
    const existing = await db`
      SELECT id FROM nfe_services
      WHERE tenant_id = ${tenantId} AND code = ${data.code}
    `.catch(() => [])

    if (existing.length > 0) {
      return { error: 'Código já existe' }
    }

    const result = await db`
      INSERT INTO nfe_services (
        tenant_id, code, description, lc116_code, cnae_code,
        iss_rate, unit_price, category, is_active
      ) VALUES (
        ${tenantId}, ${data.code}, ${data.description},
        ${data.lc116_code}, ${data.cnae_code || null},
        ${data.iss_rate || 2.0}, ${data.unit_price || 0},
        ${data.category || null}, ${data.is_active ?? true}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar serviço:', error)
    return { error: error.message }
  }
}

export async function updateNFeService(id: string, data: Partial<NFeServiceData>) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    const result = await db`
      UPDATE nfe_services SET
        code = COALESCE(${data.code || null}, code),
        description = COALESCE(${data.description || null}, description),
        lc116_code = COALESCE(${data.lc116_code || null}, lc116_code),
        cnae_code = COALESCE(${data.cnae_code || null}, cnae_code),
        iss_rate = COALESCE(${data.iss_rate || null}, iss_rate),
        unit_price = COALESCE(${data.unit_price || null}, unit_price),
        category = COALESCE(${data.category || null}, category),
        is_active = COALESCE(${data.is_active}, is_active),
        updated_at = NOW()
      WHERE id = ${id} AND tenant_id = ${tenantId}
      RETURNING *
    `

    if (result.length === 0) {
      return { error: 'Serviço não encontrado' }
    }

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar serviço:', error)
    return { error: error.message }
  }
}

export async function deleteNFeService(id: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    const result = await db`
      DELETE FROM nfe_services
      WHERE id = ${id} AND tenant_id = ${tenantId}
      RETURNING id
    `

    if (result.length === 0) {
      return { error: 'Serviço não encontrado' }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir serviço:', error)
    return { error: error.message }
  }
}

export async function getServiceByCode(code: string) {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    const result = await db`
      SELECT * FROM nfe_services
      WHERE tenant_id = ${tenantId} AND code = ${code} AND is_active = true
    `.catch(() => [])

    if (result.length === 0) {
      return { error: 'Serviço não encontrado' }
    }

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao buscar serviço:', error)
    return { error: error.message }
  }
}

// ============================================================================
// SERVIÇOS PADRÃO PARA CLÍNICAS
// ============================================================================
export async function seedDefaultServices() {
  try {
    const auth = await getAuthenticatedUser()
    if ('error' in auth) return { error: auth.error }
    const { user } = auth

    const db = await getDb()

    // Buscar tenant_id
    const userInfo = await db`SELECT tenant_id FROM users WHERE id = ${user.id}`
    if (!userInfo.length) return { error: 'Usuário não encontrado' }
    const tenantId = userInfo[0].tenant_id

    const defaultServices = [
      // Consultas
      { code: 'CONS-001', description: 'Consulta Médica', lc116_code: '4.01', iss_rate: 2.0, category: 'Consultas', unit_price: 200 },
      { code: 'CONS-002', description: 'Consulta de Retorno', lc116_code: '4.01', iss_rate: 2.0, category: 'Consultas', unit_price: 150 },
      { code: 'CONS-003', description: 'Primeira Consulta', lc116_code: '4.01', iss_rate: 2.0, category: 'Consultas', unit_price: 250 },
      { code: 'CONS-004', description: 'Teleconsulta', lc116_code: '4.01', iss_rate: 2.0, category: 'Consultas', unit_price: 180 },

      // Procedimentos
      { code: 'PROC-001', description: 'Pequena Cirurgia', lc116_code: '4.03', iss_rate: 3.0, category: 'Procedimentos', unit_price: 500 },
      { code: 'PROC-002', description: 'Curativo Complexo', lc116_code: '4.03', iss_rate: 3.0, category: 'Procedimentos', unit_price: 80 },
      { code: 'PROC-003', description: 'Sutura', lc116_code: '4.03', iss_rate: 3.0, category: 'Procedimentos', unit_price: 200 },
      { code: 'PROC-004', description: 'Infiltração', lc116_code: '4.03', iss_rate: 3.0, category: 'Procedimentos', unit_price: 150 },

      // Exames
      { code: 'EXAM-001', description: 'Exame Laboratorial', lc116_code: '4.02', iss_rate: 3.0, category: 'Exames', unit_price: 50 },
      { code: 'EXAM-002', description: 'Eletrocardiograma', lc116_code: '4.02', iss_rate: 3.0, category: 'Exames', unit_price: 80 },
      { code: 'EXAM-003', description: 'Ultrassonografia', lc116_code: '4.02', iss_rate: 3.0, category: 'Exames', unit_price: 150 },

      // Terapias
      { code: 'TERA-001', description: 'Sessão de Fisioterapia', lc116_code: '4.08', iss_rate: 2.0, category: 'Terapias', unit_price: 100 },
      { code: 'TERA-002', description: 'Sessão de Psicoterapia', lc116_code: '4.16', iss_rate: 2.0, category: 'Terapias', unit_price: 180 },
      { code: 'TERA-003', description: 'Sessão de Fonoaudiologia', lc116_code: '4.08', iss_rate: 2.0, category: 'Terapias', unit_price: 120 },
      { code: 'TERA-004', description: 'Consulta Nutricional', lc116_code: '4.10', iss_rate: 2.0, category: 'Terapias', unit_price: 150 },
      { code: 'TERA-005', description: 'Sessão de Acupuntura', lc116_code: '4.05', iss_rate: 2.0, category: 'Terapias', unit_price: 120 },

      // Odontologia
      { code: 'ODONTO-001', description: 'Consulta Odontológica', lc116_code: '4.12', iss_rate: 3.0, category: 'Odontologia', unit_price: 150 },
      { code: 'ODONTO-002', description: 'Limpeza Dental', lc116_code: '4.12', iss_rate: 3.0, category: 'Odontologia', unit_price: 200 },
      { code: 'ODONTO-003', description: 'Restauração', lc116_code: '4.12', iss_rate: 3.0, category: 'Odontologia', unit_price: 180 },
      { code: 'ODONTO-004', description: 'Extração Simples', lc116_code: '4.12', iss_rate: 3.0, category: 'Odontologia', unit_price: 150 },
      { code: 'ODONTO-005', description: 'Canal', lc116_code: '4.12', iss_rate: 3.0, category: 'Odontologia', unit_price: 600 },

      // Outros
      { code: 'DOC-001', description: 'Laudo Médico', lc116_code: '4.01', iss_rate: 2.0, category: 'Documentos', unit_price: 100 },
      { code: 'DOC-002', description: 'Atestado Médico', lc116_code: '4.01', iss_rate: 2.0, category: 'Documentos', unit_price: 50 },
    ]

    let created = 0
    for (const service of defaultServices) {
      try {
        await db`
          INSERT INTO nfe_services (
            tenant_id, code, description, lc116_code, iss_rate, unit_price, category, is_active
          ) VALUES (
            ${tenantId}, ${service.code}, ${service.description},
            ${service.lc116_code}, ${service.iss_rate}, ${service.unit_price},
            ${service.category}, true
          )
          ON CONFLICT (tenant_id, code) DO NOTHING
        `
        created++
      } catch {
        // Ignora duplicados
      }
    }

    return { success: true, created }
  } catch (error: any) {
    console.error('Erro ao criar serviços padrão:', error)
    return { error: error.message }
  }
}
