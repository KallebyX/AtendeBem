/**
 * Construtor de XML TISS v4.01.00
 *
 * Implementa a geração de XMLs válidos conforme o padrão ANS,
 * incluindo todas as guias, lotes e transações.
 *
 * ATENÇÃO:
 * - Encoding DEVE ser ISO-8859-1
 * - Hash MD5 calculado sobre concatenação de valores
 * - Limite de 100 guias por lote
 */

import type {
  TISSVersion,
  TISSConfig,
  TISSMensagem,
  TISSGuia,
  TISSGuiaConsulta,
  TISSGuiaSPSADT,
  TISSGuiaInternacao,
  TISSGuiaHonorarios,
  TISSGuiaOdonto,
  TISSLoteGuias,
  TISSPrestador,
  TISSBeneficiario,
  TISSProfissional,
  TISSProcedimento,
  TISSValorTotal,
  TISSDiagnostico,
  TISSCabecalhoGuia,
} from './types'
import { ITISSXMLGenerator, registerGenerator } from './version-factory'
import { addHashToXML, sanitizeForISO88591 } from './hash'
import { formatTISSDate, formatTISSTime, MAX_GUIDES_PER_LOT } from './index'

const TISS_VERSION: TISSVersion = '4.01.00'
const TISS_NAMESPACE = 'http://www.ans.gov.br/padroes/tiss/schemas'
const TISS_SCHEMA_LOCATION = 'http://www.ans.gov.br/padroes/tiss/schemas tissV4_01_00.xsd'

/**
 * Escapa caracteres especiais XML
 */
function escapeXML(str: string | undefined | null): string {
  if (!str) return ''

  return sanitizeForISO88591(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Formata valor monetário no padrão TISS (com vírgula)
 */
function formatValue(value: number): string {
  return value.toFixed(2).replace('.', ',')
}

/**
 * Gera tag XML com valor opcional
 */
function tag(name: string, value: string | number | undefined | null, prefix = 'ans'): string {
  if (value === undefined || value === null || value === '') return ''

  const tagName = prefix ? `${prefix}:${name}` : name
  const formattedValue = typeof value === 'number' ? formatValue(value) : escapeXML(String(value))

  return `<${tagName}>${formattedValue}</${tagName}>`
}

/**
 * Gera tag XML obrigatória
 */
function requiredTag(name: string, value: string | number, prefix = 'ans'): string {
  const tagName = prefix ? `${prefix}:${name}` : name
  const formattedValue = typeof value === 'number' ? formatValue(value) : escapeXML(String(value))

  return `<${tagName}>${formattedValue}</${tagName}>`
}

/**
 * Gerador de XML TISS v4.01.00
 */
export class TISSXMLGeneratorV401 implements ITISSXMLGenerator {
  readonly version: TISSVersion = TISS_VERSION
  readonly encoding = 'ISO-8859-1' as const

  private config: TISSConfig
  private sequenceCounter = 0

  constructor(config: TISSConfig) {
    this.config = config
  }

  private getNextSequence(): string {
    this.sequenceCounter++
    return this.sequenceCounter.toString()
  }

  /**
   * Gera o cabeçalho da mensagem TISS
   */
  private generateCabecalho(registroANSDestino: string, tipoTransacao: string): string {
    const now = new Date()

    return `
    <ans:cabecalho>
      <ans:identificacaoTransacao>
        <ans:tipoTransacao>${tipoTransacao}</ans:tipoTransacao>
        <ans:sequencialTransacao>${this.getNextSequence()}</ans:sequencialTransacao>
        <ans:dataRegistroTransacao>${formatTISSDate(now)}</ans:dataRegistroTransacao>
        <ans:horaRegistroTransacao>${formatTISSTime(now)}</ans:horaRegistroTransacao>
      </ans:identificacaoTransacao>
      <ans:origem>
        <ans:identificacaoPrestador>
          ${this.config.prestador.cnpj
            ? requiredTag('CNPJ', this.config.prestador.cnpj)
            : requiredTag('cpfContratado', this.config.prestador.cpf || '')}
          ${requiredTag('codigoPrestadorNaOperadora', this.config.prestador.codigo_operadora)}
        </ans:identificacaoPrestador>
      </ans:origem>
      <ans:destino>
        ${requiredTag('registroANS', registroANSDestino)}
      </ans:destino>
      ${requiredTag('Padrao', this.version)}
    </ans:cabecalho>`
  }

  /**
   * Gera bloco de beneficiário
   */
  private generateBeneficiario(ben: TISSBeneficiario): string {
    return `
      <ans:dadosBeneficiario>
        ${requiredTag('numeroCarteira', ben.numero_carteira)}
        ${tag('atendimentoRN', ben.recem_nascido ? 'S' : 'N')}
        ${tag('nomeBeneficiario', ben.nome)}
        ${tag('nomeSocial', ben.nome_social)}
        ${tag('numeroCNS', ben.cns)}
      </ans:dadosBeneficiario>`
  }

  /**
   * Gera bloco de profissional
   */
  private generateProfissional(prof: TISSProfissional, tipo: 'executante' | 'solicitante'): string {
    const tagName = tipo === 'executante'
      ? 'dadosExecutante'
      : 'dadosSolicitante'

    return `
      <ans:${tagName}>
        <ans:contratadoExecutante>
          ${tag('cpfContratado', prof.cpf)}
          ${requiredTag('nomeContratado', prof.nome)}
        </ans:contratadoExecutante>
        <ans:profissionalExecutante>
          ${requiredTag('nomeProfissional', prof.nome)}
          ${requiredTag('conselhoProfissional', prof.conselho)}
          ${requiredTag('numeroConselhoProfissional', prof.numero_conselho)}
          ${requiredTag('UF', prof.uf_conselho)}
          ${requiredTag('CBOS', prof.cbo)}
        </ans:profissionalExecutante>
      </ans:${tagName}>`
  }

  /**
   * Gera bloco de procedimento executado
   */
  private generateProcedimento(proc: TISSProcedimento): string {
    return `
        <ans:procedimentoExecutado>
          ${requiredTag('sequencialItem', proc.sequencial.toString())}
          ${requiredTag('dataExecucao', proc.data_execucao)}
          ${tag('horaInicial', proc.hora_inicial)}
          ${tag('horaFinal', proc.hora_final)}
          <ans:procedimento>
            ${requiredTag('codigoTabela', proc.codigo_tabela)}
            ${requiredTag('codigoProcedimento', proc.codigo_procedimento)}
            ${requiredTag('descricaoProcedimento', proc.descricao)}
          </ans:procedimento>
          ${requiredTag('quantidadeExecutada', proc.quantidade.toString())}
          ${tag('via', proc.via)}
          ${tag('tecnica', proc.tecnica)}
          ${proc.reducao_acrescimo ? tag('reducaoAcrescimo', proc.reducao_acrescimo.toString()) : ''}
          ${requiredTag('valorUnitario', proc.valor_unitario)}
          ${requiredTag('valorTotal', proc.valor_total)}
        </ans:procedimentoExecutado>`
  }

  /**
   * Gera bloco de valores totais
   */
  private generateValorTotal(valores: TISSValorTotal): string {
    return `
      <ans:valorTotal>
        ${requiredTag('valorProcedimentos', valores.valor_procedimentos)}
        ${valores.valor_diarias > 0 ? requiredTag('valorDiarias', valores.valor_diarias) : ''}
        ${valores.valor_taxas > 0 ? requiredTag('valorTaxasAlugueis', valores.valor_taxas) : ''}
        ${valores.valor_materiais > 0 ? requiredTag('valorMateriais', valores.valor_materiais) : ''}
        ${valores.valor_medicamentos > 0 ? requiredTag('valorMedicamentos', valores.valor_medicamentos) : ''}
        ${valores.valor_opme > 0 ? requiredTag('valorOPME', valores.valor_opme) : ''}
        ${valores.valor_gases > 0 ? requiredTag('valorGasesMedicinais', valores.valor_gases) : ''}
        ${requiredTag('valorTotalGeral', valores.valor_total)}
      </ans:valorTotal>`
  }

  /**
   * Gera cabeçalho da guia
   */
  private generateCabecalhoGuia(cab: TISSCabecalhoGuia): string {
    return `
        <ans:cabecalhoGuia>
          ${requiredTag('registroANS', cab.registro_ans)}
          ${requiredTag('numeroGuiaPrestador', cab.numero_guia_prestador)}
          ${tag('numeroGuiaOperadora', cab.numero_guia_operadora)}
        </ans:cabecalhoGuia>
        ${cab.data_autorizacao ? `
        <ans:dadosAutorizacao>
          ${tag('numeroGuiaOperadora', cab.numero_guia_operadora)}
          ${tag('dataAutorizacao', cab.data_autorizacao)}
          ${tag('senha', cab.senha)}
          ${tag('dataValidadeSenha', cab.validade_senha)}
        </ans:dadosAutorizacao>` : ''}`
  }

  /**
   * Gera Guia de Consulta
   */
  generateGuiaConsulta(guia: TISSGuiaConsulta): string {
    return `
      <ans:guiaConsulta>
        ${this.generateCabecalhoGuia(guia.cabecalho)}
        ${this.generateBeneficiario(guia.beneficiario)}
        ${this.generateProfissional(guia.profissional_executante, 'executante')}
        ${tag('indicacaoClinica', guia.indicacao_clinica)}
        <ans:dadosAtendimento>
          ${requiredTag('tipoConsulta', guia.tipo_consulta)}
          ${this.generateProcedimento(guia.procedimento)}
        </ans:dadosAtendimento>
        ${this.generateValorTotal(guia.valor_total)}
        ${tag('observacao', guia.observacao)}
      </ans:guiaConsulta>`
  }

  /**
   * Gera Guia SP/SADT
   */
  generateGuiaSPSADT(guia: TISSGuiaSPSADT): string {
    return `
      <ans:guiaSP-SADT>
        ${this.generateCabecalhoGuia(guia.cabecalho)}
        ${this.generateBeneficiario(guia.beneficiario)}
        ${this.generateProfissional(guia.profissional_solicitante, 'solicitante')}
        ${this.generateProfissional(guia.profissional_executante, 'executante')}
        <ans:dadosAtendimento>
          ${requiredTag('tipoAtendimento', guia.tipo_atendimento)}
          ${requiredTag('indicacaoClinica', guia.indicacao_clinica)}
          ${guia.diagnosticos?.length ? `
          <ans:hipotesesDiagnosticas>
            ${guia.diagnosticos.map(d => `
            <ans:hipoteseDiagnostica>
              ${requiredTag('codigoCID', d.codigo_cid)}
            </ans:hipoteseDiagnostica>`).join('')}
          </ans:hipotesesDiagnosticas>` : ''}
        </ans:dadosAtendimento>
        <ans:procedimentosExecutados>
          ${guia.procedimentos.map(p => this.generateProcedimento(p)).join('')}
        </ans:procedimentosExecutados>
        ${this.generateValorTotal(guia.valor_total)}
        ${tag('observacao', guia.observacao)}
      </ans:guiaSP-SADT>`
  }

  /**
   * Gera Guia de Internação
   */
  generateGuiaInternacao(guia: TISSGuiaInternacao): string {
    return `
      <ans:guiaResumoInternacao>
        ${this.generateCabecalhoGuia(guia.cabecalho)}
        ${this.generateBeneficiario(guia.beneficiario)}
        <ans:dadosInternacao>
          ${requiredTag('dataInicioFaturamento', guia.data_internacao)}
          ${requiredTag('horaInicioFaturamento', guia.hora_internacao)}
          ${guia.data_alta ? requiredTag('dataFimFaturamento', guia.data_alta) : ''}
          ${guia.hora_alta ? requiredTag('horaFimFaturamento', guia.hora_alta) : ''}
          ${requiredTag('tipoInternacao', guia.tipo_internacao)}
          ${requiredTag('regimeInternacao', guia.carater_atendimento)}
          ${requiredTag('tipoAcomodacao', guia.tipo_acomodacao)}
        </ans:dadosInternacao>
        <ans:hipotesesDiagnosticas>
          ${guia.diagnosticos.map(d => `
          <ans:hipoteseDiagnostica>
            ${requiredTag('codigoCID', d.codigo_cid)}
            ${requiredTag('indicadorAcidente', d.tipo_diagnostico)}
          </ans:hipoteseDiagnostica>`).join('')}
        </ans:hipotesesDiagnosticas>
        ${this.generateProfissional(guia.profissional_executante, 'executante')}
        <ans:procedimentosExecutados>
          ${guia.procedimentos.map(p => this.generateProcedimento(p)).join('')}
        </ans:procedimentosExecutados>
        ${this.generateValorTotal(guia.valor_total)}
        ${tag('observacao', guia.observacao)}
      </ans:guiaResumoInternacao>`
  }

  /**
   * Gera Guia de Honorários
   */
  generateGuiaHonorarios(guia: TISSGuiaHonorarios): string {
    return `
      <ans:guiaHonorarioIndividual>
        ${this.generateCabecalhoGuia(guia.cabecalho)}
        ${requiredTag('numeroGuiaReferenciada', guia.numero_guia_referenciada)}
        ${this.generateBeneficiario(guia.beneficiario)}
        ${this.generateProfissional(guia.profissional_executante, 'executante')}
        <ans:dadosAtendimento>
          ${requiredTag('dataAtendimento', guia.data_atendimento)}
          ${tag('horaInicial', guia.hora_inicial)}
          ${tag('horaFinal', guia.hora_final)}
        </ans:dadosAtendimento>
        <ans:procedimentosExecutados>
          ${guia.procedimentos.map(p => this.generateProcedimento(p)).join('')}
        </ans:procedimentosExecutados>
        ${this.generateValorTotal(guia.valor_total)}
        ${tag('observacao', guia.observacao)}
      </ans:guiaHonorarioIndividual>`
  }

  /**
   * Gera Guia Odontológica
   */
  generateGuiaOdonto(guia: TISSGuiaOdonto): string {
    return `
      <ans:guiaTratamentoOdontologico>
        ${this.generateCabecalhoGuia(guia.cabecalho)}
        ${this.generateBeneficiario(guia.beneficiario)}
        ${this.generateProfissional(guia.profissional_executante, 'executante')}
        <ans:procedimentosExecutados>
          ${guia.procedimentos.map((p, idx) => `
          <ans:procedimentoExecutado>
            ${requiredTag('sequencialItem', (idx + 1).toString())}
            ${requiredTag('procedimento', p.codigo_procedimento)}
            ${requiredTag('dente', guia.numero_dente)}
            ${requiredTag('regiao', guia.regiao_boca)}
            ${requiredTag('face', guia.face_dente)}
            ${requiredTag('quantidadeExecutada', p.quantidade.toString())}
            ${requiredTag('valorUnitario', p.valor_unitario)}
            ${requiredTag('valorTotal', p.valor_total)}
          </ans:procedimentoExecutado>`).join('')}
        </ans:procedimentosExecutados>
        ${this.generateValorTotal(guia.valor_total)}
        ${tag('observacao', guia.observacao)}
      </ans:guiaTratamentoOdontologico>`
  }

  /**
   * Gera lote de guias (máximo 100 guias)
   */
  generateLoteGuias(
    lote: TISSLoteGuias,
    prestador: TISSPrestador,
    registroANS: string
  ): string {
    if (lote.guias.length > MAX_GUIDES_PER_LOT) {
      throw new Error(`Lote excede o limite de ${MAX_GUIDES_PER_LOT} guias. Total: ${lote.guias.length}`)
    }

    // Agrupa guias por tipo
    const guiasPorTipo = {
      consulta: [] as string[],
      sp_sadt: [] as string[],
      internacao: [] as string[],
      honorarios: [] as string[],
      odonto: [] as string[],
    }

    for (const guia of lote.guias) {
      switch (guia.tipo) {
        case 'consulta':
          guiasPorTipo.consulta.push(this.generateGuiaConsulta(guia.dados))
          break
        case 'sp_sadt':
          guiasPorTipo.sp_sadt.push(this.generateGuiaSPSADT(guia.dados))
          break
        case 'internacao':
          guiasPorTipo.internacao.push(this.generateGuiaInternacao(guia.dados))
          break
        case 'honorarios':
          guiasPorTipo.honorarios.push(this.generateGuiaHonorarios(guia.dados))
          break
        case 'odonto':
          guiasPorTipo.odonto.push(this.generateGuiaOdonto(guia.dados))
          break
      }
    }

    const guiasXML = []

    if (guiasPorTipo.consulta.length > 0) {
      guiasXML.push(`
      <ans:guiasConsulta>
        ${guiasPorTipo.consulta.join('')}
      </ans:guiasConsulta>`)
    }

    if (guiasPorTipo.sp_sadt.length > 0) {
      guiasXML.push(`
      <ans:guiasSP-SADT>
        ${guiasPorTipo.sp_sadt.join('')}
      </ans:guiasSP-SADT>`)
    }

    if (guiasPorTipo.internacao.length > 0) {
      guiasXML.push(`
      <ans:guiasResumoInternacao>
        ${guiasPorTipo.internacao.join('')}
      </ans:guiasResumoInternacao>`)
    }

    if (guiasPorTipo.honorarios.length > 0) {
      guiasXML.push(`
      <ans:guiasHonorarioIndividual>
        ${guiasPorTipo.honorarios.join('')}
      </ans:guiasHonorarioIndividual>`)
    }

    if (guiasPorTipo.odonto.length > 0) {
      guiasXML.push(`
      <ans:guiasTratamentoOdontologico>
        ${guiasPorTipo.odonto.join('')}
      </ans:guiasTratamentoOdontologico>`)
    }

    const xmlWithoutHash = `<?xml version="1.0" encoding="${this.encoding}"?>
<ans:mensagemTISS
  xmlns:ans="${TISS_NAMESPACE}"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${TISS_SCHEMA_LOCATION}">
  ${this.generateCabecalho(registroANS, 'ENVIO_LOTE_GUIAS')}
  <ans:prestadorParaOperadora>
    <ans:loteGuias>
      ${requiredTag('numeroLote', lote.numero_lote)}
      ${guiasXML.join('')}
    </ans:loteGuias>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`

    // Adiciona hash MD5 no epílogo
    return addHashToXML(xmlWithoutHash)
  }

  /**
   * Gera mensagem TISS completa
   */
  generateMensagem(mensagem: TISSMensagem): string {
    return this.generateLoteGuias(
      mensagem.prestador_para_operadora.lote_guias,
      mensagem.cabecalho.origem.identificacao_prestador,
      mensagem.cabecalho.destino.registro_ans
    )
  }

  /**
   * Gera XML de Solicitação de Procedimento
   */
  generateSolicitacaoProcedimento(dados: {
    beneficiario: TISSBeneficiario
    profissional_solicitante: TISSProfissional
    procedimentos: TISSProcedimento[]
    indicacao_clinica: string
    diagnosticos?: TISSDiagnostico[]
    registroANS: string
  }): string {
    const now = new Date()

    const xmlWithoutHash = `<?xml version="1.0" encoding="${this.encoding}"?>
<ans:mensagemTISS
  xmlns:ans="${TISS_NAMESPACE}"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${TISS_SCHEMA_LOCATION}">
  ${this.generateCabecalho(dados.registroANS, 'SOLICITACAO_PROCEDIMENTO')}
  <ans:prestadorParaOperadora>
    <ans:solicitacaoProcedimento>
      <ans:cabecalhoSolicitacao>
        ${requiredTag('registroANS', dados.registroANS)}
        ${requiredTag('numeroGuiaPrestador', `SOL-${Date.now()}`)}
        ${requiredTag('dataSolicitacao', formatTISSDate(now))}
      </ans:cabecalhoSolicitacao>
      ${this.generateBeneficiario(dados.beneficiario)}
      ${this.generateProfissional(dados.profissional_solicitante, 'solicitante')}
      <ans:dadosSolicitacao>
        ${requiredTag('indicacaoClinica', dados.indicacao_clinica)}
        ${dados.diagnosticos?.length ? `
        <ans:hipotesesDiagnosticas>
          ${dados.diagnosticos.map(d => `
          <ans:hipoteseDiagnostica>
            ${requiredTag('codigoCID', d.codigo_cid)}
          </ans:hipoteseDiagnostica>`).join('')}
        </ans:hipotesesDiagnosticas>` : ''}
        <ans:procedimentosSolicitados>
          ${dados.procedimentos.map((p, idx) => `
          <ans:procedimentoSolicitado>
            ${requiredTag('sequencialItem', (idx + 1).toString())}
            <ans:procedimento>
              ${requiredTag('codigoTabela', p.codigo_tabela)}
              ${requiredTag('codigoProcedimento', p.codigo_procedimento)}
              ${requiredTag('descricaoProcedimento', p.descricao)}
            </ans:procedimento>
            ${requiredTag('quantidadeSolicitada', p.quantidade.toString())}
          </ans:procedimentoSolicitado>`).join('')}
        </ans:procedimentosSolicitados>
      </ans:dadosSolicitacao>
    </ans:solicitacaoProcedimento>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`

    return addHashToXML(xmlWithoutHash)
  }

  /**
   * Gera XML de Verificação de Elegibilidade
   */
  generateVerificacaoElegibilidade(dados: {
    beneficiario: TISSBeneficiario
    registroANS: string
    data_atendimento?: string
  }): string {
    const now = new Date()

    const xmlWithoutHash = `<?xml version="1.0" encoding="${this.encoding}"?>
<ans:mensagemTISS
  xmlns:ans="${TISS_NAMESPACE}"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${TISS_SCHEMA_LOCATION}">
  ${this.generateCabecalho(dados.registroANS, 'VERIFICACAO_ELEGIBILIDADE')}
  <ans:prestadorParaOperadora>
    <ans:verificacaoElegibilidade>
      <ans:cabecalhoSolicitacao>
        ${requiredTag('registroANS', dados.registroANS)}
        ${requiredTag('dataSolicitacao', formatTISSDate(now))}
      </ans:cabecalhoSolicitacao>
      <ans:dadosBeneficiario>
        ${requiredTag('numeroCarteira', dados.beneficiario.numero_carteira)}
        ${tag('nomeBeneficiario', dados.beneficiario.nome)}
        ${tag('numeroCNS', dados.beneficiario.cns)}
      </ans:dadosBeneficiario>
      ${dados.data_atendimento ? requiredTag('dataAtendimento', dados.data_atendimento) : ''}
    </ans:verificacaoElegibilidade>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`

    return addHashToXML(xmlWithoutHash)
  }

  /**
   * Gera XML de Recurso de Glosa
   */
  generateRecursoGlosa(dados: {
    numero_lote_original: string
    numero_protocolo_original: string
    guias_recursadas: Array<{
      numero_guia: string
      itens: Array<{
        sequencial_item: number
        codigo_glosa: string
        justificativa: string
        valor_recursado: number
      }>
    }>
    registroANS: string
  }): string {
    const now = new Date()

    const xmlWithoutHash = `<?xml version="1.0" encoding="${this.encoding}"?>
<ans:mensagemTISS
  xmlns:ans="${TISS_NAMESPACE}"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="${TISS_SCHEMA_LOCATION}">
  ${this.generateCabecalho(dados.registroANS, 'RECURSO_GLOSA')}
  <ans:prestadorParaOperadora>
    <ans:recursoGlosa>
      <ans:cabecalhoRecurso>
        ${requiredTag('registroANS', dados.registroANS)}
        ${requiredTag('numeroGuiaPrestador', `REC-${Date.now()}`)}
        ${requiredTag('dataRecurso', formatTISSDate(now))}
      </ans:cabecalhoRecurso>
      <ans:dadosRecurso>
        ${requiredTag('numeroLoteOriginal', dados.numero_lote_original)}
        ${requiredTag('numeroProtocoloOriginal', dados.numero_protocolo_original)}
        <ans:guiasRecursadas>
          ${dados.guias_recursadas.map(guia => `
          <ans:guiaRecursada>
            ${requiredTag('numeroGuiaRecursada', guia.numero_guia)}
            <ans:itensRecursados>
              ${guia.itens.map(item => `
              <ans:itemRecursado>
                ${requiredTag('sequencialItem', item.sequencial_item.toString())}
                ${requiredTag('codigoGlosa', item.codigo_glosa)}
                ${requiredTag('justificativaRecurso', item.justificativa)}
                ${requiredTag('valorRecursado', item.valor_recursado)}
              </ans:itemRecursado>`).join('')}
            </ans:itensRecursados>
          </ans:guiaRecursada>`).join('')}
        </ans:guiasRecursadas>
      </ans:dadosRecurso>
    </ans:recursoGlosa>
  </ans:prestadorParaOperadora>
</ans:mensagemTISS>`

    return addHashToXML(xmlWithoutHash)
  }
}

// Registra o gerador para a versão 4.01.00
registerGenerator('4.01.00', TISSXMLGeneratorV401)

// Registra também para 4.00.00 (compatível)
registerGenerator('4.00.00', TISSXMLGeneratorV401)

/**
 * Divide um array de guias em lotes de 100
 */
export function splitIntoLots(guias: TISSGuia[], lotPrefix: string): TISSLoteGuias[] {
  const lotes: TISSLoteGuias[] = []

  for (let i = 0; i < guias.length; i += MAX_GUIDES_PER_LOT) {
    const batch = guias.slice(i, i + MAX_GUIDES_PER_LOT)
    const loteNumber = Math.floor(i / MAX_GUIDES_PER_LOT) + 1

    lotes.push({
      numero_lote: `${lotPrefix}-${loteNumber.toString().padStart(4, '0')}`,
      guias: batch
    })
  }

  return lotes
}
