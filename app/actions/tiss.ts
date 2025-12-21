'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
import { 
  generateTISSGuiaConsultaXML, 
  generateTISSGuiaSPSADTXML,
  validateTISSXML,
  type TISSGuiaConsulta,
  type TISSGuiaSPSADT
} from '@/lib/tiss-xml'
import crypto from 'crypto'

export async function createTISSGuide(data: {
  appointment_id: string
  patient_id: string
  guide_type: 'consulta' | 'sp_sadt' | 'internacao' | 'honorarios' | 'odonto'
  beneficiary_card_number?: string
  professional_name: string
  professional_council: string
  professional_number: string
  professional_uf: string
  professional_cbo?: string
  procedures: any[]
  clinical_indication?: string
  observations?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Buscar informações do paciente
    const patient = await db`
      SELECT name, cpf FROM patients WHERE id = ${data.patient_id}
    `

    if (!patient.length) return { error: 'Paciente não encontrado' }

    // Gerar número da guia
    const guideCount = await db`
      SELECT COUNT(*) FROM tiss_guides WHERE tenant_id = ${user.tenant_id}
    `
    const guideNumber = `GUIA-${user.tenant_id.slice(0, 8)}-${String(Number(guideCount[0].count) + 1).padStart(6, '0')}`

    // Calcular valor total
    const totalValue = data.procedures.reduce((sum: number, proc: any) => 
      sum + (proc.quantity * proc.unit_price), 0
    )

    const result = await db`
      INSERT INTO tiss_guides (
        tenant_id, appointment_id, patient_id, guide_number, guide_type,
        beneficiary_card_number, beneficiary_name, beneficiary_cpf,
        professional_name, professional_council, professional_number,
        professional_uf, professional_cbo, procedures, total_value,
        issue_date, execution_date, clinical_indication, observations
      ) VALUES (
        ${user.tenant_id}, ${data.appointment_id}, ${data.patient_id},
        ${guideNumber}, ${data.guide_type}, ${data.beneficiary_card_number || null},
        ${patient[0].name}, ${patient[0].cpf || null}, ${data.professional_name},
        ${data.professional_council}, ${data.professional_number}, ${data.professional_uf},
        ${data.professional_cbo || null}, ${JSON.stringify(data.procedures)},
        ${totalValue}, CURRENT_DATE, CURRENT_DATE, ${data.clinical_indication || null},
        ${data.observations || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function getTISSGuides(filters?: {
  patient_id?: string
  payment_status?: string
  start_date?: string
  end_date?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT g.*, p.name as patient_name
      FROM tiss_guides g
      JOIN patients p ON g.patient_id = p.id
      WHERE g.tenant_id = ${user.tenant_id}
        ${filters?.patient_id ? db`AND g.patient_id = ${filters.patient_id}` : db``}
        ${filters?.payment_status ? db`AND g.payment_status = ${filters.payment_status}` : db``}
        ${filters?.start_date ? db`AND g.issue_date >= ${filters.start_date}` : db``}
        ${filters?.end_date ? db`AND g.issue_date <= ${filters.end_date}` : db``}
      ORDER BY g.issue_date DESC, g.created_at DESC
      LIMIT 100
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function generateTISSSubmissionXML(guide_ids: string[]) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Buscar guias
    const guides = await db`
      SELECT * FROM tiss_guides
      WHERE id = ANY(${guide_ids}) AND tenant_id = ${user.tenant_id}
    `

    if (!guides.length) return { error: 'Nenhuma guia encontrada' }

    // Buscar dados da clínica/prestador
    const clinic = await db`
      SELECT * FROM clinics WHERE tenant_id = ${user.tenant_id} AND is_primary = true LIMIT 1
    `

    // Gerar XMLs individuais
    const xmls: string[] = []
    let totalValue = 0

    for (const guide of guides) {
      totalValue += Number(guide.total_value)

      if (guide.guide_type === 'consulta') {
        const guiaConsulta: TISSGuiaConsulta = {
          numero_guia: guide.guide_number,
          data_emissao: guide.issue_date,
          prestador: {
            codigo_operadora: clinic[0]?.cnpj || 'XXXXX',
            cnpj: clinic[0]?.cnpj || 'XXXXX',
            nome: clinic[0]?.name || 'Clínica'
          },
          beneficiario: {
            numero_carteira: guide.beneficiary_card_number || '',
            nome: guide.beneficiary_name,
            cpf: guide.beneficiary_cpf,
            data_nascimento: ''
          },
          profissional_executante: {
            nome: guide.professional_name,
            conselho: guide.professional_council,
            numero_conselho: guide.professional_number,
            uf_conselho: guide.professional_uf,
            cbo: guide.professional_cbo || '2251'
          },
          procedimentos: guide.procedures,
          indicacao_clinica: guide.clinical_indication,
          observacao: guide.observations,
          valor_total: Number(guide.total_value)
        }

        xmls.push(generateTISSGuiaConsultaXML(guiaConsulta))
      } else if (guide.guide_type === 'sp_sadt') {
        const guiaSPSADT: TISSGuiaSPSADT = {
          numero_guia: guide.guide_number,
          data_emissao: guide.issue_date,
          prestador: {
            codigo_operadora: clinic[0]?.cnpj || 'XXXXX',
            cnpj: clinic[0]?.cnpj || 'XXXXX',
            nome: clinic[0]?.name || 'Clínica'
          },
          beneficiario: {
            numero_carteira: guide.beneficiary_card_number || '',
            nome: guide.beneficiary_name,
            cpf: guide.beneficiary_cpf,
            data_nascimento: ''
          },
          profissional_solicitante: {
            nome: guide.professional_name,
            conselho: guide.professional_council,
            numero_conselho: guide.professional_number,
            uf_conselho: guide.professional_uf
          },
          profissional_executante: {
            nome: guide.professional_name,
            conselho: guide.professional_council,
            numero_conselho: guide.professional_number,
            uf_conselho: guide.professional_uf,
            cbo: guide.professional_cbo || '2251'
          },
          indicacao_clinica: guide.clinical_indication || 'Atendimento médico',
          procedimentos: guide.procedures,
          observacao: guide.observations,
          valor_total: Number(guide.total_value),
          tipo_atendimento: '01',
          tipo_faturamento: '1',
          carater_atendimento: 'E'
        }

        xmls.push(generateTISSGuiaSPSADTXML(guiaSPSADT))
      }
    }

    // Gerar número do lote
    const loteNumber = await db`SELECT generate_tiss_lote_number(${user.tenant_id}::uuid) as lote_number`
    
    // Criar submissão
    const submissionNumber = `SUB-${user.tenant_id.slice(0, 8)}-${Date.now()}`
    const xmlContent = xmls.join('\n\n')
    const xmlHash = crypto.createHash('sha256').update(xmlContent).digest('hex')

    // Validar XML
    const validation = validateTISSXML(xmlContent)

    const submission = await db`
      INSERT INTO tiss_submissions (
        tenant_id, user_id, submission_number, lote_number, guide_type,
        xml_content, xml_hash, total_guides, total_value, guide_ids,
        xsd_validation_passed, validation_errors
      ) VALUES (
        ${user.tenant_id}, ${user.id}, ${submissionNumber}, ${loteNumber[0].lote_number},
        ${guides[0].guide_type}, ${xmlContent}, ${xmlHash}, ${guides.length},
        ${totalValue}, ${JSON.stringify(guide_ids)}, ${validation.valid},
        ${JSON.stringify(validation.errors)}
      ) RETURNING *
    `

    // Atualizar guias com submission_id
    await db`
      UPDATE tiss_guides
      SET submission_id = ${submission[0].id}
      WHERE id = ANY(${guide_ids})
    `

    return { 
      success: true, 
      data: submission[0],
      xml: xmlContent,
      validation
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

export async function submitTISSToANS(submission_id: string, method: 'manual' | 'ftp' | 'webservice' | 'email' = 'manual') {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Atualizar status de envio
    const result = await db`
      UPDATE tiss_submissions
      SET status = 'sent',
          transmission_method = ${method},
          sent_at = NOW(),
          updated_at = NOW()
      WHERE id = ${submission_id} AND tenant_id = ${user.tenant_id}
      RETURNING *
    `

    // Em produção, aqui seria a integração real:
    // - FTP: Enviar XML via FTP para servidor da operadora
    // - WebService: POST para API SOAP/REST da operadora
    // - Email: Enviar XML por e-mail para operadora

    return { success: true, data: result[0] }
  } catch (error: any) {
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
    
    if (!token) return { error: 'Não autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token inválido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT s.*, u.name as user_name
      FROM tiss_submissions s
      JOIN users u ON s.user_id = u.id
      WHERE s.tenant_id = ${user.tenant_id}
        ${filters?.status ? db`AND s.status = ${filters.status}` : db``}
        ${filters?.start_date ? db`AND s.created_at >= ${filters.start_date}` : db``}
        ${filters?.end_date ? db`AND s.created_at <= ${filters.end_date}` : db``}
      ORDER BY s.created_at DESC
      LIMIT 50
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { error: error.message }
  }
}
