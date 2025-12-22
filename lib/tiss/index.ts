/**
 * Módulo TISS - AtendeBem
 * Implementação completa do Padrão TISS (ANS)
 *
 * @version 4.01.00
 * @author AtendeBem Team
 * @description Sistema de geração, validação e comunicação TISS
 */

// Exportações principais
export * from './types'
export * from './hash'
export * from './xml-builder'
export * from './xml-validator'
export * from './version-factory'
export * from './soap-client'
export * from './glosa-processor'
export * from './tuss-importer'

// Constantes do padrão TISS
export const TISS_VERSIONS = {
  V3_05_00: '3.05.00',
  V4_00_00: '4.00.00',
  V4_01_00: '4.01.00',
} as const

export const TISS_ENCODING = 'ISO-8859-1' // CRÍTICO: Não usar UTF-8

export const TISS_NAMESPACE = 'http://www.ans.gov.br/padroes/tiss/schemas'

export const TISS_TABLES = {
  PROCEDIMENTOS: 22,
  MATERIAIS_OPME: 19,
  MEDICAMENTOS: 20,
  TAXAS_DIARIAS: 18,
  GLOSAS: 38,
  FORMA_ENVIO: 64,
} as const

export const TISS_GUIDE_TYPES = {
  CONSULTA: 'consulta',
  SP_SADT: 'sp_sadt',
  INTERNACAO: 'internacao',
  HONORARIOS: 'honorarios',
  ODONTO: 'odonto',
} as const

export const TISS_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  SENT: 'sent',
  PROCESSING: 'processing',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  PROCESSED: 'processed',
  ERROR: 'error',
} as const

export const MAX_GUIDES_PER_LOT = 100

// Utilitário para formatar valores monetários no padrão brasileiro
export function formatTISSValue(value: number): string {
  return value.toFixed(2).replace('.', ',')
}

// Utilitário para formatar datas no padrão TISS (YYYY-MM-DD)
export function formatTISSDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

// Utilitário para formatar hora no padrão TISS (HH:MM:SS)
export function formatTISSTime(date: Date): string {
  return date.toISOString().split('T')[1].slice(0, 8)
}
