/**
 * Tipos TypeScript para o Padrão TISS
 * Baseado na especificação ANS versão 4.01.00
 */

// =====================================================
// TIPOS DE VERSÃO
// =====================================================
export type TISSVersion = '3.05.00' | '4.00.00' | '4.01.00'

// =====================================================
// ENUMS DE DOMÍNIO (Tabelas ANS)
// =====================================================
export type TipoGuia = 'consulta' | 'sp_sadt' | 'internacao' | 'honorarios' | 'odonto'

export type TipoAtendimento = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09'
// 01=Remoção, 02=Pequena Cirurgia, 03=Terapias, 04=Consulta Referenciada
// 05=Pré-Natal, 06=Quimioterapia, 07=Radioterapia, 08=Terapia Renal Substitutiva
// 09=Pronto Socorro

export type TipoFaturamento = '1' | '2' | '3'
// 1=Preço total, 2=Preço unitário, 3=Pacote

export type CaraterAtendimento = 'E' | 'U'
// E=Eletivo, U=Urgência/Emergência

export type TipoConsulta = '1' | '2' | '3' | '4'
// 1=Primeira consulta, 2=Retorno, 3=Pré-Natal, 4=Por encaminhamento

export type RegimeInternacao = '1' | '2' | '3'
// 1=Hospitalar, 2=Hospital-dia, 3=Domiciliar

export type TipoAcomodacao = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08'
// 01=Quarto, 02=Apartamento, 03=Enfermaria, etc.

export type TipoTabela = '18' | '19' | '20' | '22' | '90' | '98'
// 18=Diárias/Taxas, 19=Materiais, 20=Medicamentos, 22=Procedimentos, 90=Própria, 98=Pacotes

export type ConselhoClass = 'CRM' | 'CRO' | 'CRF' | 'COREN' | 'CRN' | 'CREFITO' | 'CREFONO'

export type StatusGuia = 'draft' | 'pending' | 'sent' | 'processing' | 'accepted' | 'rejected' | 'processed' | 'error'

export type StatusPagamento = 'pending' | 'authorized' | 'paid' | 'denied' | 'gloss' | 'partial'

export type TransmissionMethod = 'manual' | 'ftp' | 'webservice' | 'email'

// =====================================================
// INTERFACES PRINCIPAIS
// =====================================================

/**
 * Identificação do Prestador
 */
export interface TISSPrestador {
  codigo_operadora: string
  cnpj?: string
  cpf?: string
  nome_contratado: string
  codigo_cnes?: string
  registro_ans?: string
}

/**
 * Beneficiário do Plano
 */
export interface TISSBeneficiario {
  numero_carteira: string
  validade_carteira?: string
  nome: string
  nome_social?: string  // LGPD v4.0
  cpf?: string
  data_nascimento?: string
  sexo?: 'M' | 'F'
  cns?: string // Cartão Nacional de Saúde
  recem_nascido?: boolean
}

/**
 * Profissional de Saúde
 */
export interface TISSProfissional {
  nome: string
  conselho: ConselhoClass
  numero_conselho: string
  uf_conselho: string
  cbo: string
  cpf?: string
}

/**
 * Procedimento Executado
 */
export interface TISSProcedimento {
  sequencial: number
  codigo_tabela: TipoTabela
  codigo_procedimento: string
  descricao: string
  quantidade: number
  via?: string
  tecnica?: string
  reducao_acrescimo?: number
  valor_unitario: number
  valor_total: number
  data_execucao: string
  hora_inicial?: string
  hora_final?: string
  // Para materiais/medicamentos
  registro_anvisa?: string
  codigo_ref_fabricante?: string
  autorizacao_funcionamento?: string
  unidade_medida?: string
}

/**
 * Diagnóstico CID-10
 */
export interface TISSDiagnostico {
  codigo_cid: string
  tipo_diagnostico: 'P' | 'S' // Principal ou Secundário
  descricao?: string
}

/**
 * Valor Total da Guia
 */
export interface TISSValorTotal {
  valor_procedimentos: number
  valor_diarias: number
  valor_taxas: number
  valor_materiais: number
  valor_medicamentos: number
  valor_opme: number
  valor_gases: number
  valor_total: number
}

// =====================================================
// INTERFACES DE GUIAS
// =====================================================

/**
 * Cabeçalho comum a todas as guias
 */
export interface TISSCabecalhoGuia {
  registro_ans: string
  numero_guia_prestador: string
  numero_guia_operadora?: string
  data_autorizacao?: string
  senha?: string
  validade_senha?: string
}

/**
 * Guia de Consulta
 */
export interface TISSGuiaConsulta {
  cabecalho: TISSCabecalhoGuia
  beneficiario: TISSBeneficiario
  profissional_executante: TISSProfissional
  tipo_consulta: TipoConsulta
  procedimento: TISSProcedimento
  indicacao_clinica?: string
  valor_total: TISSValorTotal
  observacao?: string
}

/**
 * Guia SP/SADT (Serviço Profissional / Diagnóstico e Terapia)
 */
export interface TISSGuiaSPSADT {
  cabecalho: TISSCabecalhoGuia
  beneficiario: TISSBeneficiario
  profissional_solicitante: TISSProfissional
  profissional_executante: TISSProfissional
  indicacao_clinica: string
  diagnosticos?: TISSDiagnostico[]
  tipo_atendimento: TipoAtendimento
  tipo_faturamento: TipoFaturamento
  carater_atendimento: CaraterAtendimento
  procedimentos: TISSProcedimento[]
  valor_total: TISSValorTotal
  observacao?: string
}

/**
 * Guia de Resumo de Internação
 */
export interface TISSGuiaInternacao {
  cabecalho: TISSCabecalhoGuia
  beneficiario: TISSBeneficiario
  contratado_solicitante: TISSPrestador
  profissional_solicitante: TISSProfissional
  contratado_executante: TISSPrestador
  profissional_executante: TISSProfissional
  data_internacao: string
  hora_internacao: string
  data_alta?: string
  hora_alta?: string
  tipo_internacao: RegimeInternacao
  carater_atendimento: CaraterAtendimento
  tipo_acomodacao: TipoAcomodacao
  diagnosticos: TISSDiagnostico[]
  procedimentos: TISSProcedimento[]
  valor_total: TISSValorTotal
  observacao?: string
}

/**
 * Guia de Honorários
 */
export interface TISSGuiaHonorarios {
  cabecalho: TISSCabecalhoGuia
  numero_guia_referenciada: string
  beneficiario: TISSBeneficiario
  profissional_executante: TISSProfissional
  data_atendimento: string
  hora_inicial?: string
  hora_final?: string
  procedimentos: TISSProcedimento[]
  valor_total: TISSValorTotal
  observacao?: string
}

/**
 * Guia de Tratamento Odontológico
 */
export interface TISSGuiaOdonto {
  cabecalho: TISSCabecalhoGuia
  beneficiario: TISSBeneficiario
  profissional_executante: TISSProfissional
  numero_dente: string
  regiao_boca: string
  face_dente: string
  procedimentos: TISSProcedimento[]
  valor_total: TISSValorTotal
  observacao?: string
}

// Union type para todas as guias
export type TISSGuia =
  | { tipo: 'consulta'; dados: TISSGuiaConsulta }
  | { tipo: 'sp_sadt'; dados: TISSGuiaSPSADT }
  | { tipo: 'internacao'; dados: TISSGuiaInternacao }
  | { tipo: 'honorarios'; dados: TISSGuiaHonorarios }
  | { tipo: 'odonto'; dados: TISSGuiaOdonto }

// =====================================================
// INTERFACES DE TRANSAÇÃO/LOTE
// =====================================================

/**
 * Identificação da Transação
 */
export interface TISSIdentificacaoTransacao {
  tipo_transacao: string
  sequencial: string
  data_registro: string
  hora_registro: string
}

/**
 * Cabeçalho da Mensagem TISS
 */
export interface TISSCabecalhoMensagem {
  identificacao_transacao: TISSIdentificacaoTransacao
  origem: {
    identificacao_prestador: TISSPrestador
  }
  destino: {
    registro_ans: string
  }
  versao_padrao: TISSVersion
}

/**
 * Lote de Guias
 */
export interface TISSLoteGuias {
  numero_lote: string
  guias: TISSGuia[]
}

/**
 * Mensagem TISS Completa
 */
export interface TISSMensagem {
  cabecalho: TISSCabecalhoMensagem
  prestador_para_operadora: {
    lote_guias: TISSLoteGuias
  }
  hash?: string // Epílogo MD5
}

// =====================================================
// INTERFACES DE RETORNO
// =====================================================

/**
 * Item de Glosa (Tabela 38)
 */
export interface TISSGlosa {
  codigo_glosa: string
  descricao_glosa: string
  sequencial_item?: number
  codigo_procedimento?: string
  valor_glosado: number
}

/**
 * Protocolo de Retorno
 */
export interface TISSProtocoloRetorno {
  numero_protocolo: string
  data_protocolo: string
  tipo_retorno: 'aceito' | 'rejeitado' | 'parcial'
}

/**
 * Demonstrativo de Retorno
 */
export interface TISSDemonstrativoRetorno {
  protocolo: TISSProtocoloRetorno
  numero_lote: string
  data_envio: string
  quantidade_guias_aceitas: number
  quantidade_guias_rejeitadas: number
  valor_total_informado: number
  valor_total_processado: number
  glosas: TISSGlosa[]
}

// =====================================================
// INTERFACES DE VALIDAÇÃO
// =====================================================

export interface TISSValidationError {
  code: string
  message: string
  field?: string
  line?: number
}

export interface TISSValidationResult {
  valid: boolean
  errors: TISSValidationError[]
  warnings: TISSValidationError[]
}

// =====================================================
// INTERFACES DE CONFIGURAÇÃO
// =====================================================

export interface TISSConfig {
  version: TISSVersion
  encoding: 'ISO-8859-1'
  prestador: TISSPrestador
  certificado?: {
    tipo: 'A1' | 'A3'
    path?: string
    password?: string
  }
  webservice?: {
    url: string
    timeout: number
    retry: number
  }
}

// =====================================================
// INTERFACES PARA BANCO DE DADOS TUSS
// =====================================================

export interface TUSSProcedimento {
  id?: string
  codigo_tuss: string
  descricao: string
  tabela_origem: TipoTabela
  capitulo?: string
  grupo?: string
  subgrupo?: string
  vigencia_inicio: string
  vigencia_fim?: string
  valor_referencia?: number
  unidade_medida?: string
  porte_anestesico?: string
  requer_autorizacao: boolean
  cbos_permitidos?: string[]
  created_at?: string
  updated_at?: string
}

export interface TUSSMaterial {
  id?: string
  codigo_tuss: string
  descricao: string
  grupo?: string
  registro_anvisa?: string
  fabricante?: string
  vigencia_inicio: string
  vigencia_fim?: string
  created_at?: string
  updated_at?: string
}

export interface TUSSMedicamento {
  id?: string
  codigo_tuss: string
  descricao: string
  principio_ativo?: string
  apresentacao?: string
  unidade_medida?: string
  registro_anvisa?: string
  vigencia_inicio: string
  vigencia_fim?: string
  created_at?: string
  updated_at?: string
}
