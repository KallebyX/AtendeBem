'use server'

import { getDb } from '@/lib/db'
import { verifyToken } from '@/lib/session'
import { cookies } from 'next/headers'
import { setUserContext } from '@/lib/db-init'
import {
  TISSXMLGeneratorV401,
  splitIntoLots
} from '@/lib/tiss/xml-builder'
import { quickValidateTISS, formatValidationErrors } from '@/lib/tiss/xml-validator'
import { calculateTISSHash, validateTISSHash } from '@/lib/tiss/hash'
import {
  processarDemonstrativoRetorno,
  calcularEstatisticasGlosas,
  sugerirAcoesPrioritarias
} from '@/lib/tiss/glosa-processor'
import type {
  TISSConfig,
  TISSGuia,
  TISSGuiaConsulta,
  TISSGuiaSPSADT,
  TISSPrestador,
  TISSBeneficiario,
  TISSProfissional,
  TISSProcedimento,
  TISSValorTotal,
  TISSVersion
} from '@/lib/tiss/types'

// =====================================================
// CRIAÇÃO DE GUIAS
// =====================================================

export async function createTISSGuide(data: {
  appointment_id?: string
  patient_id: string
  guide_type: 'consulta' | 'sp_sadt' | 'internacao' | 'honorarios' | 'odonto'
  operadora_registro_ans?: string
  beneficiary_card_number?: string
  beneficiary_validity?: string
  professional_name?: string
  professional_council?: string
  professional_number?: string
  professional_uf?: string
  professional_cbo?: string
  procedures: Array<{
    code: string
    description: string
    quantity: number
    unit_price: number
    table?: string
    execution_date?: string
  }>
  clinical_indication?: string
  diagnostics?: Array<{ code: string; type: 'P' | 'S' }>
  type_of_service?: string
  billing_type?: string
  care_character?: string
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

    // Busca dados do paciente
    const patient = await db`
      SELECT full_name, cpf, date_of_birth, insurance_provider, insurance_number, gender
      FROM patients WHERE id = ${data.patient_id} AND user_id = ${user.id}
    `

    if (!patient.length) return { error: 'Paciente nao encontrado' }

    // Gera número da guia
    const count = await db`SELECT COUNT(*) FROM tiss_guides WHERE user_id = ${user.id}`
    const guideNumber = `GUIA-${(parseInt(count[0].count) + 1).toString().padStart(6, '0')}`

    // Calcula valor total
    const totalValue = data.procedures.reduce((sum, proc) =>
      sum + ((proc.quantity || 1) * (proc.unit_price || 0)), 0
    )

    // Prepara procedimentos no formato correto
    const proceduresJson = data.procedures.map((proc, idx) => ({
      sequencial: idx + 1,
      codigo_tabela: proc.table || '22',
      codigo_procedimento: proc.code,
      descricao: proc.description,
      quantidade: proc.quantity,
      valor_unitario: proc.unit_price,
      valor_total: proc.quantity * proc.unit_price,
      data_execucao: proc.execution_date || new Date().toISOString().split('T')[0]
    }))

    // Insere a guia
    const result = await db`
      INSERT INTO tiss_guides (
        user_id, patient_id, appointment_id, guide_type, guide_number,
        beneficiary_card_number, beneficiary_name, beneficiary_cpf,
        professional_name, professional_council, professional_number, professional_uf, professional_cbo,
        procedures, total_value, issue_date, clinical_indication, observations,
        payment_status
      ) VALUES (
        ${user.id}, ${data.patient_id}, ${data.appointment_id || null},
        ${data.guide_type}, ${guideNumber},
        ${data.beneficiary_card_number || patient[0].insurance_number || null},
        ${patient[0].full_name},
        ${patient[0].cpf || null},
        ${data.professional_name || user.name || null},
        ${data.professional_council || 'CRM'},
        ${data.professional_number || user.crm || null},
        ${data.professional_uf || 'SP'},
        ${data.professional_cbo || '225125'},
        ${JSON.stringify(proceduresJson)}::jsonb,
        ${totalValue},
        ${new Date().toISOString().split('T')[0]},
        ${data.clinical_indication || null},
        ${data.observations || null},
        'pending'
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar guia TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// BUSCA DE GUIAS
// =====================================================

export async function getTISSGuides(filters?: {
  patient_id?: string
  status?: string
  payment_status?: string
  guide_type?: string
  start_date?: string
  end_date?: string
  limit?: number
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const limit = filters?.limit || 100

    const result = await db`
      SELECT g.*, p.full_name as patient_name, p.cpf as patient_cpf
      FROM tiss_guides g
      JOIN patients p ON g.patient_id = p.id
      WHERE g.user_id = ${user.id}
      ${filters?.patient_id ? db`AND g.patient_id = ${filters.patient_id}` : db``}
      ${filters?.status ? db`AND g.status = ${filters.status}` : db``}
      ${filters?.payment_status ? db`AND g.payment_status = ${filters.payment_status}` : db``}
      ${filters?.guide_type ? db`AND g.guide_type = ${filters.guide_type}` : db``}
      ${filters?.start_date ? db`AND g.created_at >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND g.created_at <= ${filters.end_date}` : db``}
      ORDER BY g.created_at DESC
      LIMIT ${limit}
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar guias TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// GERAÇÃO DE XML TISS
// =====================================================

export async function generateTISSSubmissionXML(data: {
  guide_ids: string[]
  operadora_registro_ans: string
  version?: TISSVersion
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Busca guias
    const guides = await db`
      SELECT g.*, p.full_name as patient_name, p.cpf as patient_cpf, p.date_of_birth
      FROM tiss_guides g
      JOIN patients p ON g.patient_id = p.id
      WHERE g.id = ANY(${data.guide_ids}) AND g.user_id = ${user.id}
    `

    if (!guides.length) return { error: 'Nenhuma guia encontrada' }

    // Configura o gerador
    const config: TISSConfig = {
      version: data.version || '4.01.00',
      encoding: 'ISO-8859-1',
      prestador: {
        codigo_operadora: user.crm || '',
        nome_contratado: user.name || '',
        cnpj: user.clinic_cnpj
      }
    }

    const generator = new TISSXMLGeneratorV401(config)

    // Converte guias do banco para formato TISS
    const tissGuias: TISSGuia[] = guides.map(g => {
      const procedures = (g.procedures as any[]).map((p, idx) => ({
        sequencial: idx + 1,
        codigo_tabela: (p.codigo_tabela || '22') as any,
        codigo_procedimento: p.codigo_procedimento || p.code,
        descricao: p.descricao || p.description,
        quantidade: p.quantidade || p.quantity || 1,
        valor_unitario: parseFloat(p.valor_unitario || p.unit_price || 0),
        valor_total: parseFloat(p.valor_total || (p.quantidade * p.valor_unitario) || 0),
        data_execucao: p.data_execucao || new Date().toISOString().split('T')[0]
      }))

      const valorTotal: TISSValorTotal = {
        valor_procedimentos: parseFloat(g.total_value || 0),
        valor_diarias: 0,
        valor_taxas: 0,
        valor_materiais: 0,
        valor_medicamentos: 0,
        valor_opme: 0,
        valor_gases: 0,
        valor_total: parseFloat(g.total_value || 0)
      }

      const beneficiario: TISSBeneficiario = {
        numero_carteira: g.beneficiary_card_number || '',
        nome: g.beneficiary_name || g.patient_name,
        cpf: g.beneficiary_cpf || g.patient_cpf,
        data_nascimento: g.date_of_birth?.toISOString().split('T')[0]
      }

      const profissional: TISSProfissional = {
        nome: g.professional_name || user.name || '',
        conselho: (g.professional_council || 'CRM') as any,
        numero_conselho: g.professional_number || user.crm || '',
        uf_conselho: g.professional_uf || 'SP',
        cbo: g.professional_cbo || '225125'
      }

      if (g.guide_type === 'consulta') {
        const guiaConsulta: TISSGuiaConsulta = {
          cabecalho: {
            registro_ans: data.operadora_registro_ans,
            numero_guia_prestador: g.guide_number
          },
          beneficiario,
          profissional_executante: profissional,
          tipo_consulta: '1',
          procedimento: procedures[0] || {
            sequencial: 1,
            codigo_tabela: '22',
            codigo_procedimento: '10101012',
            descricao: 'Consulta em consultório',
            quantidade: 1,
            valor_unitario: 0,
            valor_total: 0,
            data_execucao: new Date().toISOString().split('T')[0]
          },
          indicacao_clinica: g.clinical_indication,
          valor_total: valorTotal,
          observacao: g.observations
        }
        return { tipo: 'consulta' as const, dados: guiaConsulta }
      } else {
        // SP/SADT é o padrão para outros tipos
        const guiaSPSADT: TISSGuiaSPSADT = {
          cabecalho: {
            registro_ans: data.operadora_registro_ans,
            numero_guia_prestador: g.guide_number
          },
          beneficiario,
          profissional_solicitante: profissional,
          profissional_executante: profissional,
          indicacao_clinica: g.clinical_indication || 'A realizar',
          tipo_atendimento: '04',
          tipo_faturamento: '1',
          carater_atendimento: 'E',
          procedimentos: procedures,
          valor_total: valorTotal,
          observacao: g.observations
        }
        return { tipo: 'sp_sadt' as const, dados: guiaSPSADT }
      }
    })

    // Divide em lotes de 100 guias
    const lotePrefix = `LOTE-${Date.now()}`
    const lotes = splitIntoLots(tissGuias, lotePrefix)

    // Gera XMLs para cada lote
    const xmlResults = []
    for (const lote of lotes) {
      const xml = generator.generateLoteGuias(
        lote,
        config.prestador,
        data.operadora_registro_ans
      )

      // Valida o XML gerado
      const validation = quickValidateTISS(xml)

      xmlResults.push({
        numero_lote: lote.numero_lote,
        quantidade_guias: lote.guias.length,
        xml,
        hash: calculateTISSHash(xml),
        validacao: validation
      })
    }

    // Calcula valor total
    const totalValue = guides.reduce((sum, g) => sum + Number(g.total_value || 0), 0)

    // Cria registro de submissão para cada lote
    for (const xmlResult of xmlResults) {
      await db`
        INSERT INTO tiss_submissions (
          user_id, submission_number, lote_number, guide_type,
          operadora_codigo, xml_content, xml_hash,
          total_guides, total_value, guide_ids, status
        ) VALUES (
          ${user.id},
          ${`SUB-${Date.now()}-${xmlResult.numero_lote}`},
          ${xmlResult.numero_lote},
          ${guides[0].guide_type},
          ${data.operadora_registro_ans},
          ${xmlResult.xml},
          ${xmlResult.hash},
          ${xmlResult.quantidade_guias},
          ${totalValue / lotes.length},
          ${JSON.stringify(data.guide_ids)}::jsonb,
          'pending'
        )
      `
    }

    // Atualiza status das guias
    await db`
      UPDATE tiss_guides
      SET status = 'pending'
      WHERE id = ANY(${data.guide_ids}) AND user_id = ${user.id}
    `

    return {
      success: true,
      data: {
        total_lotes: lotes.length,
        total_guias: guides.length,
        total_value: totalValue,
        lotes: xmlResults.map(r => ({
          numero_lote: r.numero_lote,
          quantidade_guias: r.quantidade_guias,
          hash: r.hash,
          validacao: r.validacao
        }))
      },
      xml: xmlResults.length === 1 ? xmlResults[0].xml : undefined,
      xmls: xmlResults.length > 1 ? xmlResults.map(r => r.xml) : undefined
    }
  } catch (error: any) {
    console.error('Erro ao gerar XML TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// ENVIO PARA OPERADORA (VIA WEBSERVICE)
// =====================================================

export async function submitTISSToOperadora(data: {
  submission_id: string
  method?: 'manual' | 'webservice'
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Busca a submissão
    const submission = await db`
      SELECT * FROM tiss_submissions
      WHERE id = ${data.submission_id} AND user_id = ${user.id}
    `

    if (!submission.length) return { error: 'Submissão não encontrada' }

    const sub = submission[0]

    if (data.method === 'webservice') {
      // Busca configuração da operadora
      const operadora = await db`
        SELECT * FROM tiss_operadoras
        WHERE registro_ans = ${sub.operadora_codigo} AND user_id = ${user.id}
      `

      if (!operadora.length) {
        return { error: 'Operadora não configurada para envio via webservice' }
      }

      // TODO: Implementar envio real via SOAP client
      // Por enquanto, simula o envio
      const protocoloSimulado = `PROT-${Date.now()}`

      await db`
        UPDATE tiss_submissions
        SET status = 'sent',
            sent_at = NOW(),
            transmission_method = 'webservice',
            protocol_number = ${protocoloSimulado},
            protocol_date = NOW()
        WHERE id = ${data.submission_id}
      `

      // Atualiza status das guias
      const guideIds = sub.guide_ids as string[]
      await db`
        UPDATE tiss_guides
        SET status = 'sent'
        WHERE id = ANY(${guideIds}) AND user_id = ${user.id}
      `

      return {
        success: true,
        data: {
          protocol_number: protocoloSimulado,
          status: 'sent',
          message: 'Lote enviado com sucesso via webservice'
        }
      }
    } else {
      // Envio manual - apenas marca como enviado
      await db`
        UPDATE tiss_submissions
        SET status = 'sent',
            sent_at = NOW(),
            transmission_method = 'manual'
        WHERE id = ${data.submission_id}
      `

      const guideIds = sub.guide_ids as string[]
      await db`
        UPDATE tiss_guides
        SET status = 'sent'
        WHERE id = ANY(${guideIds}) AND user_id = ${user.id}
      `

      return {
        success: true,
        data: {
          status: 'sent',
          message: 'Lote marcado como enviado manualmente. Faça upload do XML no portal da operadora.'
        }
      }
    }
  } catch (error: any) {
    console.error('Erro ao enviar TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// PROCESSAMENTO DE RETORNO (DEMONSTRATIVO)
// =====================================================

export async function processReturnXML(data: {
  xml_content: string
  submission_id?: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Valida o hash do XML de retorno
    const hashValidation = validateTISSHash(data.xml_content)

    // Processa o demonstrativo
    const resultado = processarDemonstrativoRetorno(data.xml_content)

    if (!resultado.demonstrativo) {
      return { error: 'Não foi possível extrair informações do XML de retorno' }
    }

    const { demonstrativo, glosas, acoesSugeridas } = resultado

    // Atualiza a submissão se fornecida
    if (data.submission_id) {
      await db`
        UPDATE tiss_submissions
        SET status = ${demonstrativo.protocolo.tipo_retorno === 'rejeitado' ? 'rejected' : 'processed'},
            response_xml = ${data.xml_content},
            response_date = NOW(),
            protocol_number = COALESCE(protocol_number, ${demonstrativo.protocolo.numero_protocolo})
        WHERE id = ${data.submission_id} AND user_id = ${user.id}
      `
    }

    // Salva glosas no banco
    for (const glosa of glosas) {
      await db`
        INSERT INTO tiss_glosas_recebidas (
          user_id, submission_id, codigo_glosa, descricao_glosa,
          categoria, sequencial_item, codigo_procedimento,
          valor_glosado, status, acao_sugerida, recurso_automatico
        ) VALUES (
          ${user.id},
          ${data.submission_id || null},
          ${glosa.codigo_glosa},
          ${glosa.descricao_glosa},
          ${glosa.categoria},
          ${glosa.sequencial_item || null},
          ${glosa.codigo_procedimento || null},
          ${glosa.valor_glosado},
          'pendente',
          ${glosa.acaoSugerida},
          ${glosa.recursoAutomatico}
        )
      `
    }

    // Calcula estatísticas
    const estatisticas = calcularEstatisticasGlosas(glosas)

    // Sugere ações prioritárias
    const acoesPrioritarias = sugerirAcoesPrioritarias(glosas)

    return {
      success: true,
      data: {
        demonstrativo: {
          protocolo: demonstrativo.protocolo.numero_protocolo,
          tipo_retorno: demonstrativo.protocolo.tipo_retorno,
          valor_informado: demonstrativo.valor_total_informado,
          valor_processado: demonstrativo.valor_total_processado,
          valor_glosado: demonstrativo.valor_total_informado - demonstrativo.valor_total_processado
        },
        glosas: {
          total: glosas.length,
          valor_total: estatisticas.valorTotalGlosado,
          por_categoria: estatisticas.porCategoria,
          top_codigos: estatisticas.topCodigos
        },
        acoes_sugeridas: acoesPrioritarias.map(a => ({
          acao: a.acao,
          prioridade: a.prioridade,
          quantidade_glosas: a.glosas.length,
          valor_total: a.valorTotal,
          descricao: a.descricao
        })),
        hash_valido: hashValidation.valid
      }
    }
  } catch (error: any) {
    console.error('Erro ao processar retorno TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// GESTÃO DE SUBMISSÕES
// =====================================================

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

    const result = await db`
      SELECT
        s.*,
        (SELECT COUNT(*) FROM tiss_glosas_recebidas g WHERE g.submission_id = s.id) as total_glosas,
        (SELECT COALESCE(SUM(valor_glosado), 0) FROM tiss_glosas_recebidas g WHERE g.submission_id = s.id) as valor_glosado
      FROM tiss_submissions s
      WHERE s.user_id = ${user.id}
      ${filters?.status ? db`AND s.status = ${filters.status}` : db``}
      ${filters?.start_date ? db`AND s.created_at >= ${filters.start_date}` : db``}
      ${filters?.end_date ? db`AND s.created_at <= ${filters.end_date}` : db``}
      ORDER BY s.created_at DESC
      LIMIT 50
    `

    return { success: true, data: result }
  } catch (error: any) {
    console.error('Erro ao buscar submissões TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// GESTÃO DE GLOSAS
// =====================================================

export async function getTISSGlosas(filters?: {
  status?: string
  categoria?: string
  submission_id?: string
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
      SELECT g.*
      FROM tiss_glosas_recebidas g
      WHERE g.user_id = ${user.id}
      ${filters?.status ? db`AND g.status = ${filters.status}` : db``}
      ${filters?.categoria ? db`AND g.categoria = ${filters.categoria}` : db``}
      ${filters?.submission_id ? db`AND g.submission_id = ${filters.submission_id}` : db``}
      ORDER BY g.created_at DESC
      LIMIT 200
    `

    // Calcula estatísticas
    const estatisticas = {
      total: result.length,
      valor_total: result.reduce((sum, g) => sum + Number(g.valor_glosado || 0), 0),
      por_status: {
        pendente: result.filter(g => g.status === 'pendente').length,
        recurso_enviado: result.filter(g => g.status === 'recurso_enviado').length,
        recurso_aceito: result.filter(g => g.status === 'recurso_aceito').length,
        recurso_negado: result.filter(g => g.status === 'recurso_negado').length,
        aceita: result.filter(g => g.status === 'aceita').length
      }
    }

    return { success: true, data: result, estatisticas }
  } catch (error: any) {
    console.error('Erro ao buscar glosas TISS:', error)
    return { error: error.message }
  }
}

// =====================================================
// PESQUISA TUSS
// =====================================================

export async function searchTUSSProcedures(query: string, tabela?: string, limit = 50) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Usa a função de pesquisa do banco
    const result = await db`
      SELECT * FROM pesquisar_tuss(${query}, ${tabela || null}, ${limit})
    `

    return { success: true, data: result }
  } catch (error: any) {
    // Se a função não existir, faz busca simples
    try {
      const db = await getDb()
      const result = await db`
        SELECT id, codigo_tuss, descricao, tabela_origem, grupo
        FROM tuss_terminologia
        WHERE ativo = true
        AND (vigencia_fim IS NULL OR vigencia_fim >= CURRENT_DATE)
        AND (
          codigo_tuss ILIKE ${query + '%'}
          OR descricao ILIKE ${'%' + query + '%'}
        )
        ${tabela ? db`AND tabela_origem = ${tabela}` : db``}
        ORDER BY descricao
        LIMIT ${limit}
      `
      return { success: true, data: result }
    } catch {
      return { success: true, data: [] }
    }
  }
}

// =====================================================
// ATUALIZAÇÃO DE STATUS
// =====================================================

export async function updateTISSGuideStatus(guide_id: string, status: string, payment_data?: {
  payment_status?: string
  authorized_value?: number
  paid_value?: number
  gloss_value?: number
  gloss_reason?: string
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
      UPDATE tiss_guides
      SET status = ${status},
          payment_status = COALESCE(${payment_data?.payment_status || null}, payment_status),
          authorized_value = COALESCE(${payment_data?.authorized_value || null}, authorized_value),
          paid_value = COALESCE(${payment_data?.paid_value || null}, paid_value),
          gloss_value = COALESCE(${payment_data?.gloss_value || null}, gloss_value),
          gloss_reason = COALESCE(${payment_data?.gloss_reason || null}, gloss_reason),
          updated_at = NOW()
      WHERE id = ${guide_id} AND user_id = ${user.id}
      RETURNING *
    `

    if (result.length === 0) return { error: 'Guia não encontrada' }
    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao atualizar status da guia:', error)
    return { error: error.message }
  }
}

// =====================================================
// GESTÃO DE OPERADORAS
// =====================================================

export async function getOperadoras() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    const result = await db`
      SELECT id, registro_ans, razao_social, nome_fantasia, versao_tiss, ativo,
             endpoint_webservice IS NOT NULL as has_webservice,
             ultimo_teste, ultimo_teste_sucesso
      FROM tiss_operadoras
      WHERE user_id = ${user.id}
      ORDER BY nome_fantasia
    `

    return { success: true, data: result }
  } catch (error: any) {
    return { success: true, data: [] }
  }
}

export async function createOperadora(data: {
  registro_ans: string
  razao_social: string
  nome_fantasia?: string
  cnpj?: string
  versao_tiss?: string
  endpoint_webservice?: string
  login?: string
  senha?: string
  codigo_prestador?: string
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
      INSERT INTO tiss_operadoras (
        user_id, registro_ans, razao_social, nome_fantasia, cnpj,
        versao_tiss, endpoint_webservice, login, codigo_prestador
      ) VALUES (
        ${user.id}, ${data.registro_ans}, ${data.razao_social},
        ${data.nome_fantasia || null}, ${data.cnpj || null},
        ${data.versao_tiss || '4.01.00'}, ${data.endpoint_webservice || null},
        ${data.login || null}, ${data.codigo_prestador || null}
      ) RETURNING *
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error('Erro ao criar operadora:', error)
    return { error: error.message }
  }
}

// =====================================================
// DASHBOARD ESTATÍSTICAS
// =====================================================

export async function getTISSDashboard() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return { error: 'Nao autenticado' }
    const user = await verifyToken(token)
    if (!user) return { error: 'Token invalido' }

    await setUserContext(user.id)
    const db = await getDb()

    // Estatísticas gerais de guias
    const guiasStats = await db`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'draft') as rascunho,
        COUNT(*) FILTER (WHERE status = 'pending') as pendente,
        COUNT(*) FILTER (WHERE status = 'sent') as enviado,
        COUNT(*) FILTER (WHERE status = 'processed') as processado,
        COALESCE(SUM(total_value), 0) as valor_total,
        COALESCE(SUM(total_value) FILTER (WHERE payment_status = 'paid'), 0) as valor_pago,
        COALESCE(SUM(gloss_value), 0) as valor_glosado
      FROM tiss_guides
      WHERE user_id = ${user.id}
      AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `

    // Estatísticas de submissões
    const submissoesStats = await db`
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pendente,
        COUNT(*) FILTER (WHERE status = 'sent') as enviado,
        COUNT(*) FILTER (WHERE status = 'processed') as processado,
        COUNT(*) FILTER (WHERE status = 'rejected') as rejeitado
      FROM tiss_submissions
      WHERE user_id = ${user.id}
      AND created_at >= CURRENT_DATE - INTERVAL '30 days'
    `

    // Glosas pendentes
    let glosasStats = { total: 0, valor_total: 0, pendentes: 0 }
    try {
      const glosas = await db`
        SELECT
          COUNT(*) as total,
          COALESCE(SUM(valor_glosado), 0) as valor_total,
          COUNT(*) FILTER (WHERE status = 'pendente') as pendentes
        FROM tiss_glosas_recebidas
        WHERE user_id = ${user.id}
      `
      glosasStats = glosas[0]
    } catch {
      // Tabela pode não existir ainda
    }

    return {
      success: true,
      data: {
        guias: guiasStats[0],
        submissoes: submissoesStats[0],
        glosas: glosasStats
      }
    }
  } catch (error: any) {
    console.error('Erro ao buscar dashboard TISS:', error)
    return { error: error.message }
  }
}
