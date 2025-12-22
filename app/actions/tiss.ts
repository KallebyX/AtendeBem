'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'

export async function createTISSGuide(data: {
  appointment_id?: string
  patient_id: string
  guide_type: 'consulta' | 'sp_sadt' | 'internacao' | 'honorarios' | 'odonto'
  beneficiary_card_number?: string
  professional_name?: string
  procedures: any[]
  clinical_indication?: string
  observations?: string
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
      SELECT full_name, cpf, insurance_provider, insurance_number
      FROM patients WHERE id = ${data.patient_id} AND user_id = ${user.id}
    `

    if (!patient.length) return { error: 'Paciente nao encontrado' }

    // Generate guide number
    const count = await db`SELECT COUNT(*) FROM tiss_guides WHERE user_id = ${user.id}`
    const guideNumber = `GUIA-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    // Calculate total value
    const totalValue = data.procedures.reduce((sum: number, proc: any) =>
      sum + ((proc.quantity || 1) * (proc.unit_price || 0)), 0
    )

    const result = await db`
      INSERT INTO tiss_guides (
        user_id, patient_id, appointment_id, guide_type, guide_number,
        provider_code, insurance_code, insurance_name, card_number, card_validity,
        main_procedure_code, procedures, total_value, status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${data.appointment_id || null},
        ${data.guide_type}, ${guideNumber},
        ${user.crm || null}, ${patient[0].insurance_number || null},
        ${patient[0].insurance_provider || null}, ${data.beneficiary_card_number || null},
        NULL, ${data.procedures[0]?.code || null},
        ${JSON.stringify(data.procedures)}::jsonb, ${totalValue}, 'draft'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar guia TISS:', error)
    return { error: error.message }
  }
}

export async function getTISSGuides(filters?: {
  patient_id?: string
  status?: string
  start_date?: string
  end_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT g.*, p.full_name as patient_name
      FROM tiss_guides g
      JOIN patients p ON g.patient_id = p.id
      WHERE g.user_id = ${user.id}
      ${filters?.patient_id ? db`AND g.patient_id = ${filters.patient_id}` : db``}
      ${filters?.status ? db`AND g.status = ${filters.status}` : db``}
      ${filters?.start_date ? db`AND g.created_at >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND g.created_at <= ${filters.end_date}` : db``}
      ORDER BY g.created_at DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar guias TISS:', error)
    return { error: error.message }
  }
}

export async function generateTISSSubmissionXML(guide_ids: string[]) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Get guides
    const guides = await db`
      SELECT g.*, p.full_name as patient_name, p.cpf as patient_cpf
      FROM tiss_guides g
      JOIN patients p ON g.patient_id = p.id
      WHERE g.id = ANY(${guide_ids}) AND g.user_id = ${user.id}
    `

    if (!guides.length) return { error: 'Nenhuma guia encontrada' }

    // Generate simplified XML
    const totalValue = guides.reduce((sum, g) => sum + Number(g.total_value || 0), 0)

    // Generate XML content (simplified)
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<mensagemTISS xmlns="http://www.ans.gov.br/padroes/tiss/schemas">
  <cabecalho>
    <identificacaoTransacao>
      <tipoTransacao>ENVIO_LOTE_GUIAS</tipoTransacao>
      <sequencialTransacao>${Date.now()}</sequencialTransacao>
      <dataRegistroTransacao>${new Date().toISOString().split('T')[0]}</dataRegistroTransacao>
      <horaRegistroTransacao>${new Date().toISOString().split('T')[1].slice(0, 8)}</horaRegistroTransacao>
    </identificacaoTransacao>
  </cabecalho>
  <prestadorParaOperadora>
    <loteGuias>
      <numeroLote>${Date.now()}</numeroLote>
      ${guides.map(g => `
      <guiasTISS>
        <guiaConsulta>
          <cabecalhoGuia>
            <registroANS>999999</registroANS>
            <numeroGuiaPrestador>${g.guide_number}</numeroGuiaPrestador>
          </cabecalhoGuia>
          <dadosBeneficiario>
            <numeroCarteira>${g.card_number || 'N/A'}</numeroCarteira>
            <nomeBeneficiario>${g.patient_name}</nomeBeneficiario>
          </dadosBeneficiario>
        </guiaConsulta>
      </guiasTISS>`).join('')}
    </loteGuias>
  </prestadorParaOperadora>
</mensagemTISS>`

    // Update guides status
    await db`
      UPDATE tiss_guides
      SET status = 'submitted', submitted_at = NOW()
      WHERE id = ANY(${guide_ids}) AND user_id = ${user.id}
    `

    return {
      success: true,
      data: {
        guide_count: guides.length,
        total_value: totalValue
      },
      xml: xmlContent
    }
  } catch (error: any) {
    console.error('Erro ao gerar XML TISS:', error)
    return { error: error.message }
  }
}

export async function submitTISSToANS(guide_ids: string[], method: 'manual' | 'ftp' | 'webservice' | 'email' = 'manual') {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Update guides status
    const result = await db`
      UPDATE tiss_guides
      SET status = 'sent', submitted_at = NOW()
      WHERE id = ANY(${guide_ids}) AND user_id = ${user.id}
      RETURNING *
    `

    return {
      success: true,
      message: 'Guias enviadas com sucesso (simulado)',
      data: result
    }
  } catch (error: any) {
    console.error('Erro ao enviar TISS:', error)
    return { error: error.message }
  }
}

export async function getTISSSubmissions(filters?: {
  status?: string
  start_date?: string
  end_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Group guides by submission date
    const result = await db`
      SELECT
        DATE(submitted_at) as submission_date,
        COUNT(*) as guide_count,
        SUM(total_value) as total_value,
        status,
        array_agg(id) as guide_ids
      FROM tiss_guides
      WHERE user_id = ${user.id}
      AND submitted_at IS NOT NULL
      ${filters?.status ? db`AND status = ${filters.status}` : db``}
      ${filters?.start_date ? db`AND submitted_at >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND submitted_at <= ${filters.end_date}` : db``}
      GROUP BY DATE(submitted_at), status
      ORDER BY submission_date DESC
      LIMIT 50
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar submissoes TISS:', error)
    return { error: error.message }
  }
}

export async function updateTISSGuideStatus(guide_id: string, status: string, response_data?: any) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      UPDATE tiss_guides
      SET status = ${status},
          response_data = COALESCE(${response_data ? JSON.stringify(response_data) : null}::jsonb, response_data),
          updated_at = NOW()
      WHERE id = ${guide_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Guia nao encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar status da guia:', error)
    return { error: error.message }
  }
}
