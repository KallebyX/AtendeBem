/**
 * Factory Pattern para Geradores de XML TISS
 *
 * Permite suportar múltiplas versões do padrão TISS simultaneamente.
 * Cada operadora pode exigir uma versão específica do padrão.
 *
 * Versões suportadas:
 * - 3.05.00 (legado)
 * - 4.00.00 (LGPD)
 * - 4.01.00 (atual)
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
  TISSValidationResult
} from './types'

/**
 * Interface para geradores de XML TISS
 */
export interface ITISSXMLGenerator {
  readonly version: TISSVersion
  readonly encoding: 'ISO-8859-1'

  // Geração de guias individuais
  generateGuiaConsulta(guia: TISSGuiaConsulta): string
  generateGuiaSPSADT(guia: TISSGuiaSPSADT): string
  generateGuiaInternacao(guia: TISSGuiaInternacao): string
  generateGuiaHonorarios(guia: TISSGuiaHonorarios): string
  generateGuiaOdonto(guia: TISSGuiaOdonto): string

  // Geração de lote
  generateLoteGuias(lote: TISSLoteGuias, prestador: TISSPrestador, registroANS: string): string

  // Geração de mensagem completa
  generateMensagem(mensagem: TISSMensagem): string

  // Outras transações
  generateSolicitacaoProcedimento(dados: any): string
  generateVerificacaoElegibilidade(dados: any): string
  generateRecursoGlosa(dados: any): string
}

/**
 * Interface para validadores de XML TISS
 */
export interface ITISSXMLValidator {
  readonly version: TISSVersion

  // Validação XSD
  validateAgainstXSD(xml: string): TISSValidationResult

  // Validação de regras de negócio
  validateBusinessRules(xml: string): TISSValidationResult

  // Validação completa
  validate(xml: string): TISSValidationResult
}

/**
 * Registro de geradores por versão
 */
const generatorRegistry = new Map<TISSVersion, new (config: TISSConfig) => ITISSXMLGenerator>()

/**
 * Registro de validadores por versão
 */
const validatorRegistry = new Map<TISSVersion, new (config: TISSConfig) => ITISSXMLValidator>()

/**
 * Registra um gerador de XML para uma versão específica
 */
export function registerGenerator(
  version: TISSVersion,
  generatorClass: new (config: TISSConfig) => ITISSXMLGenerator
): void {
  generatorRegistry.set(version, generatorClass)
}

/**
 * Registra um validador de XML para uma versão específica
 */
export function registerValidator(
  version: TISSVersion,
  validatorClass: new (config: TISSConfig) => ITISSXMLValidator
): void {
  validatorRegistry.set(version, validatorClass)
}

/**
 * Factory principal para criação de geradores
 */
export class TISSGeneratorFactory {
  private static instance: TISSGeneratorFactory
  private generators = new Map<string, ITISSXMLGenerator>()

  private constructor() {}

  static getInstance(): TISSGeneratorFactory {
    if (!TISSGeneratorFactory.instance) {
      TISSGeneratorFactory.instance = new TISSGeneratorFactory()
    }
    return TISSGeneratorFactory.instance
  }

  /**
   * Obtém ou cria um gerador para a versão especificada
   */
  getGenerator(config: TISSConfig): ITISSXMLGenerator {
    const key = `${config.version}_${config.prestador.codigo_operadora}`

    if (!this.generators.has(key)) {
      const GeneratorClass = generatorRegistry.get(config.version)

      if (!GeneratorClass) {
        throw new Error(`Gerador não disponível para a versão TISS ${config.version}`)
      }

      this.generators.set(key, new GeneratorClass(config))
    }

    return this.generators.get(key)!
  }

  /**
   * Limpa o cache de geradores
   */
  clearCache(): void {
    this.generators.clear()
  }

  /**
   * Lista versões suportadas
   */
  getSupportedVersions(): TISSVersion[] {
    return Array.from(generatorRegistry.keys())
  }
}

/**
 * Factory principal para criação de validadores
 */
export class TISSValidatorFactory {
  private static instance: TISSValidatorFactory
  private validators = new Map<string, ITISSXMLValidator>()

  private constructor() {}

  static getInstance(): TISSValidatorFactory {
    if (!TISSValidatorFactory.instance) {
      TISSValidatorFactory.instance = new TISSValidatorFactory()
    }
    return TISSValidatorFactory.instance
  }

  /**
   * Obtém ou cria um validador para a versão especificada
   */
  getValidator(config: TISSConfig): ITISSXMLValidator {
    const key = config.version

    if (!this.validators.has(key)) {
      const ValidatorClass = validatorRegistry.get(config.version)

      if (!ValidatorClass) {
        throw new Error(`Validador não disponível para a versão TISS ${config.version}`)
      }

      this.validators.set(key, new ValidatorClass(config))
    }

    return this.validators.get(key)!
  }

  /**
   * Lista versões suportadas
   */
  getSupportedVersions(): TISSVersion[] {
    return Array.from(validatorRegistry.keys())
  }
}

/**
 * Helper para criar configuração padrão
 */
export function createTISSConfig(
  version: TISSVersion,
  prestador: TISSPrestador,
  options?: Partial<TISSConfig>
): TISSConfig {
  return {
    version,
    encoding: 'ISO-8859-1',
    prestador,
    ...options
  }
}

/**
 * Detecta a versão do TISS a partir do XML
 */
export function detectTISSVersion(xml: string): TISSVersion | null {
  // Procura pela tag versaoPadrao
  const versionMatch = xml.match(/<(?:ans:)?versaoPadrao>([^<]+)<\/(?:ans:)?versaoPadrao>/)

  if (versionMatch) {
    const version = versionMatch[1].trim()

    if (version === '3.05.00' || version === '4.00.00' || version === '4.01.00') {
      return version as TISSVersion
    }
  }

  // Fallback: tenta detectar pelo namespace/schema
  if (xml.includes('tissV3_05_00.xsd')) {
    return '3.05.00'
  }
  if (xml.includes('tissV4_00_00.xsd') || xml.includes('padraoTISS_4.xsd')) {
    return '4.00.00'
  }
  if (xml.includes('tissV4_01_00.xsd')) {
    return '4.01.00'
  }

  return null
}

/**
 * Verifica compatibilidade entre versões
 */
export function isVersionCompatible(
  sourceVersion: TISSVersion,
  targetVersion: TISSVersion
): boolean {
  // Versões 4.x são compatíveis entre si
  if (sourceVersion.startsWith('4.') && targetVersion.startsWith('4.')) {
    return true
  }

  // 3.05.00 não é compatível com 4.x
  return sourceVersion === targetVersion
}

/**
 * Retorna as diferenças entre versões
 */
export function getVersionDifferences(
  fromVersion: TISSVersion,
  toVersion: TISSVersion
): string[] {
  const differences: string[] = []

  if (fromVersion === '3.05.00' && toVersion.startsWith('4.')) {
    differences.push('Campo nome_beneficiario removido de guias de lote (LGPD)')
    differences.push('Campo nome_social adicionado')
    differences.push('Campo recem_nascido agora obrigatório quando aplicável')
    differences.push('Novos tipos de atendimento disponíveis')
    differences.push('Namespace atualizado')
  }

  if (fromVersion === '4.00.00' && toVersion === '4.01.00') {
    differences.push('Correções de XSD')
    differences.push('Novos códigos na Tabela 38 (glosas)')
    differences.push('Ajustes em campos opcionais')
  }

  return differences
}

// Exporta factories singleton
export const generatorFactory = TISSGeneratorFactory.getInstance()
export const validatorFactory = TISSValidatorFactory.getInstance()
