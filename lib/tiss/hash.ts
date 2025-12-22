/**
 * Cálculo de Hash MD5 para o Padrão TISS
 *
 * ATENÇÃO - REGRAS CRÍTICAS:
 * 1. O hash deve ser calculado sobre a CONCATENAÇÃO DOS VALORES das tags
 * 2. Tags, atributos e espaços em branco estruturais são IGNORADOS
 * 3. A conversão para bytes DEVE usar ISO-8859-1 (Latin-1), NÃO UTF-8
 * 4. Valores numéricos devem manter o formato exato do XML (ex: 100,00)
 *
 * @see Padrão TISS - Componente de Segurança e Privacidade
 */

import { createHash } from 'crypto'

const TISS_ENCODING = 'latin1' // ISO-8859-1 = latin1 no Node.js

/**
 * Extrai todos os valores de texto das tags XML, ignorando:
 * - Tags e atributos
 * - Espaços em branco estruturais (quebras de linha, indentação)
 * - Comentários XML
 * - Declaração XML e namespaces
 *
 * IMPORTANTE: Preserva espaços dentro de valores de texto
 */
export function extractTagValues(xml: string): string {
  // Remove declaração XML
  let content = xml.replace(/<\?xml[^?]*\?>/gi, '')

  // Remove comentários XML
  content = content.replace(/<!--[\s\S]*?-->/g, '')

  // Remove CDATA sections, preservando conteúdo
  content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')

  // Extrai apenas o conteúdo entre tags (valores de texto)
  const values: string[] = []

  // Regex para capturar conteúdo entre tags
  // Ignora tags vazias ou que contêm apenas outras tags
  const tagContentRegex = />([^<]+)</g
  let match

  while ((match = tagContentRegex.exec(content)) !== null) {
    const value = match[1]

    // Ignora valores que são apenas espaços em branco estruturais
    if (value.trim().length > 0) {
      // Preserva o valor exato, apenas removendo quebras de linha e espaços
      // em branco nas extremidades que são formatação XML
      values.push(value.trim())
    }
  }

  // Concatena todos os valores
  return values.join('')
}

/**
 * Calcula o hash MD5 de uma string usando encoding ISO-8859-1
 *
 * CRÍTICO: Não usar UTF-8! Caracteres como ç, ã, é têm representações
 * diferentes em UTF-8 e ISO-8859-1, gerando hashes diferentes.
 *
 * @param content - String a ser hasheada (já em formato de concatenação)
 * @returns Hash MD5 em hexadecimal (32 caracteres)
 */
export function calculateMD5(content: string): string {
  // Converte para bytes usando ISO-8859-1 (latin1)
  const buffer = Buffer.from(content, TISS_ENCODING)

  // Calcula MD5
  const hash = createHash('md5')
  hash.update(buffer)

  return hash.digest('hex')
}

/**
 * Calcula o hash TISS de um XML completo
 *
 * Esta função implementa o algoritmo oficial de cálculo de hash TISS:
 * 1. Extrai valores de todas as tags (ignora estrutura)
 * 2. Concatena os valores
 * 3. Converte para bytes em ISO-8859-1
 * 4. Calcula MD5
 *
 * @param xml - XML TISS completo (sem o epílogo/hash)
 * @returns Hash MD5 em hexadecimal
 */
export function calculateTISSHash(xml: string): string {
  // Remove epílogo existente se houver (para recalcular)
  let xmlWithoutHash = xml.replace(/<ans:epilogo>[\s\S]*?<\/ans:epilogo>/g, '')
  xmlWithoutHash = xmlWithoutHash.replace(/<epilogo>[\s\S]*?<\/epilogo>/g, '')

  // Extrai valores das tags
  const concatenatedValues = extractTagValues(xmlWithoutHash)

  // Calcula hash MD5 com encoding correto
  return calculateMD5(concatenatedValues)
}

/**
 * Adiciona o epílogo com hash ao XML TISS
 *
 * O epílogo deve ser inserido antes do fechamento da tag raiz (mensagemTISS)
 *
 * @param xml - XML TISS sem epílogo
 * @returns XML TISS com epílogo contendo o hash
 */
export function addHashToXML(xml: string): string {
  const hash = calculateTISSHash(xml)

  // Encontra onde inserir o epílogo (antes do fechamento de mensagemTISS)
  const closingTagRegex = /<\/(?:ans:)?mensagemTISS\s*>/i
  const match = xml.match(closingTagRegex)

  if (!match) {
    throw new Error('Tag de fechamento </mensagemTISS> não encontrada no XML')
  }

  // Determina o prefixo de namespace usado (ans: ou vazio)
  const usesAnsPrefix = xml.includes('<ans:mensagemTISS')
  const prefix = usesAnsPrefix ? 'ans:' : ''

  // Cria o epílogo
  const epilogo = `
  <${prefix}epilogo>
    <${prefix}hash>${hash}</${prefix}hash>
  </${prefix}epilogo>
`

  // Insere o epílogo antes do fechamento
  return xml.replace(closingTagRegex, `${epilogo}${match[0]}`)
}

/**
 * Verifica se o hash de um XML TISS está correto
 *
 * @param xml - XML TISS completo com epílogo
 * @returns Objeto com resultado da validação
 */
export function validateTISSHash(xml: string): {
  valid: boolean
  expectedHash: string
  actualHash?: string
  error?: string
} {
  // Extrai o hash do epílogo
  const hashMatch = xml.match(/<(?:ans:)?hash>([a-fA-F0-9]{32})<\/(?:ans:)?hash>/)

  if (!hashMatch) {
    return {
      valid: false,
      expectedHash: '',
      error: 'Hash não encontrado no epílogo do XML'
    }
  }

  const actualHash = hashMatch[1].toLowerCase()

  // Calcula o hash esperado
  const expectedHash = calculateTISSHash(xml)

  return {
    valid: actualHash === expectedHash,
    expectedHash,
    actualHash
  }
}

/**
 * Converte uma string para encoding ISO-8859-1
 * Útil para garantir compatibilidade antes de operações de hash
 *
 * @param str - String a converter
 * @returns Buffer em ISO-8859-1
 */
export function toISO88591(str: string): Buffer {
  return Buffer.from(str, TISS_ENCODING)
}

/**
 * Verifica se uma string contém apenas caracteres válidos para ISO-8859-1
 * Caracteres fora deste encoding podem causar problemas no hash
 *
 * @param str - String a verificar
 * @returns Array de caracteres inválidos encontrados
 */
export function findInvalidISO88591Chars(str: string): string[] {
  const invalidChars: string[] = []

  for (const char of str) {
    const code = char.charCodeAt(0)
    // ISO-8859-1 suporta caracteres de 0x00 a 0xFF (0-255)
    if (code > 255) {
      if (!invalidChars.includes(char)) {
        invalidChars.push(char)
      }
    }
  }

  return invalidChars
}

/**
 * Substitui caracteres não-ISO-8859-1 por equivalentes válidos
 *
 * @param str - String com possíveis caracteres inválidos
 * @returns String sanitizada para ISO-8859-1
 */
export function sanitizeForISO88591(str: string): string {
  // Mapa de substituições comuns
  const replacements: Record<string, string> = {
    '–': '-',  // En dash para hífen
    '—': '-',  // Em dash para hífen
    '"': '"',  // Aspas curvas para retas
    '"': '"',
    "\u2018": "'",  // Apóstrofe curvo esquerdo para reto (')
    "\u2019": "'",  // Apóstrofe curvo direito para reto (')
    '…': '...',  // Reticências para três pontos
    '€': 'EUR',  // Euro (não existe em ISO-8859-1)
    '™': 'TM',   // Trademark
    '©': '(c)',  // Copyright
    '®': '(R)',  // Registered
  }

  let result = str

  // Aplica substituições
  for (const [invalid, valid] of Object.entries(replacements)) {
    result = result.replace(new RegExp(invalid, 'g'), valid)
  }

  // Remove caracteres que ainda não são válidos
  result = result.replace(/[^\x00-\xFF]/g, '')

  return result
}

// Exporta o encoding para uso em outros módulos
export { TISS_ENCODING }
