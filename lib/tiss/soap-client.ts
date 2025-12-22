/**
 * Cliente SOAP para comunicação com operadoras TISS
 *
 * Implementa:
 * - Autenticação via Header proprietário (LoginSenhaPrestador)
 * - Suporte a certificados digitais A1 (ICP-Brasil)
 * - TLS 1.2+ obrigatório
 * - Retry com backoff exponencial
 * - Tratamento de erros SOAP
 */

import https from 'https'
import { Agent } from 'https'
import type {
  TISSConfig,
  TISSDemonstrativoRetorno,
  TISSProtocoloRetorno,
  TISSGlosa
} from './types'

// Constantes de configuração
const DEFAULT_TIMEOUT = 30000 // 30 segundos
const MAX_RETRIES = 3
const RETRY_DELAY_BASE = 1000 // 1 segundo

/**
 * Credenciais do prestador para autenticação SOAP
 */
export interface TISSSoapCredentials {
  login: string
  senha: string
  codigoPrestador: string
}

/**
 * Configuração do certificado digital
 */
export interface TISSCertificateConfig {
  type: 'A1' | 'A3'
  pfxBuffer?: Buffer
  pfxPath?: string
  passphrase: string
}

/**
 * Resposta de uma operação SOAP
 */
export interface TISSSoapResponse {
  success: boolean
  protocolNumber?: string
  protocolDate?: string
  responseXml?: string
  errors?: Array<{
    code: string
    message: string
  }>
  rawResponse?: string
}

/**
 * Operação SOAP disponível
 */
export type TISSSoapOperation =
  | 'tissLoteGuias'
  | 'tissSolicitacaoProcedimento'
  | 'tissVerificacaoElegibilidade'
  | 'tissRecursoGlosa'
  | 'tissConsultaProtocolo'
  | 'tissCancelamentoGuia'

/**
 * Configuração de uma operadora
 */
export interface TISSOperadoraConfig {
  registroANS: string
  nome: string
  endpoint: string
  wsdlUrl?: string
  namespace?: string
  usesLoginHeader: boolean
  requiresCertificate: boolean
  customHeaders?: Record<string, string>
  soapVersion?: '1.1' | '1.2'
}

/**
 * Cliente SOAP TISS
 */
export class TISSSoapClient {
  private config: TISSConfig
  private credentials?: TISSSoapCredentials
  private certificate?: TISSCertificateConfig
  private operadora: TISSOperadoraConfig
  private agent?: Agent

  constructor(
    config: TISSConfig,
    operadora: TISSOperadoraConfig,
    credentials?: TISSSoapCredentials,
    certificate?: TISSCertificateConfig
  ) {
    this.config = config
    this.operadora = operadora
    this.credentials = credentials
    this.certificate = certificate

    this.initializeAgent()
  }

  /**
   * Inicializa o agente HTTPS com certificado se necessário
   */
  private initializeAgent(): void {
    const agentOptions: https.AgentOptions = {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
      keepAlive: true,
      timeout: DEFAULT_TIMEOUT
    }

    if (this.certificate && this.certificate.type === 'A1') {
      if (this.certificate.pfxBuffer) {
        agentOptions.pfx = this.certificate.pfxBuffer
        agentOptions.passphrase = this.certificate.passphrase
      }
      // Nota: Para leitura de arquivo, isso deveria ser feito
      // de forma assíncrona em uma implementação real
    }

    this.agent = new Agent(agentOptions)
  }

  /**
   * Constrói o envelope SOAP
   */
  private buildSoapEnvelope(
    operation: TISSSoapOperation,
    xmlContent: string
  ): string {
    const soapNs = this.operadora.soapVersion === '1.2'
      ? 'http://www.w3.org/2003/05/soap-envelope'
      : 'http://schemas.xmlsoap.org/soap/envelope/'

    const operadoraNs = this.operadora.namespace || 'http://www.ans.gov.br/tiss/ws'

    // Header de autenticação
    let authHeader = ''
    if (this.operadora.usesLoginHeader && this.credentials) {
      authHeader = `
    <soap:Header>
      <tissws:loginSenhaPrestador xmlns:tissws="${operadoraNs}">
        <login>${this.escapeXml(this.credentials.login)}</login>
        <senha>${this.escapeXml(this.credentials.senha)}</senha>
        <codigoPrestadorNaOperadora>${this.escapeXml(this.credentials.codigoPrestador)}</codigoPrestadorNaOperadora>
      </tissws:loginSenhaPrestador>
    </soap:Header>`
    }

    return `<?xml version="1.0" encoding="ISO-8859-1"?>
<soap:Envelope
  xmlns:soap="${soapNs}"
  xmlns:tissws="${operadoraNs}">
  ${authHeader}
  <soap:Body>
    <tissws:${operation}>
      <mensagemTISS>
        ${xmlContent}
      </mensagemTISS>
    </tissws:${operation}>
  </soap:Body>
</soap:Envelope>`
  }

  /**
   * Escapa caracteres especiais para XML
   */
  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  /**
   * Extrai a mensagem TISS do envelope SOAP de resposta
   */
  private extractResponseContent(soapResponse: string): string {
    // Remove envelope SOAP
    const bodyMatch = soapResponse.match(/<(?:soap:)?Body[^>]*>([\s\S]*?)<\/(?:soap:)?Body>/i)
    if (!bodyMatch) {
      throw new Error('Resposta SOAP inválida: Body não encontrado')
    }

    return bodyMatch[1]
  }

  /**
   * Verifica se há erro SOAP (Fault)
   */
  private checkSoapFault(soapResponse: string): { hasFault: boolean; code?: string; message?: string } {
    const faultMatch = soapResponse.match(/<(?:soap:)?Fault[^>]*>([\s\S]*?)<\/(?:soap:)?Fault>/i)

    if (!faultMatch) {
      return { hasFault: false }
    }

    const faultContent = faultMatch[1]
    const codeMatch = faultContent.match(/<(?:faultcode|Code)[^>]*>([^<]+)<\/(?:faultcode|Code)>/i)
    const messageMatch = faultContent.match(/<(?:faultstring|Reason)[^>]*>([^<]+)<\/(?:faultstring|Reason)>/i)

    return {
      hasFault: true,
      code: codeMatch?.[1] || 'UNKNOWN',
      message: messageMatch?.[1] || 'Erro desconhecido'
    }
  }

  /**
   * Extrai protocolo da resposta TISS
   */
  private extractProtocol(responseContent: string): TISSProtocoloRetorno | null {
    const numeroMatch = responseContent.match(/<(?:ans:)?numeroProtocolo>([^<]+)<\/(?:ans:)?numeroProtocolo>/i)
    const dataMatch = responseContent.match(/<(?:ans:)?dataProtocolo>([^<]+)<\/(?:ans:)?dataProtocolo>/i)

    if (!numeroMatch) {
      return null
    }

    // Determina tipo de retorno baseado no conteúdo
    let tipoRetorno: 'aceito' | 'rejeitado' | 'parcial' = 'aceito'
    if (responseContent.includes('rejeitado') || responseContent.includes('Rejeitado')) {
      tipoRetorno = 'rejeitado'
    } else if (responseContent.includes('parcial') || responseContent.includes('Parcial')) {
      tipoRetorno = 'parcial'
    }

    return {
      numero_protocolo: numeroMatch[1],
      data_protocolo: dataMatch?.[1] || new Date().toISOString().split('T')[0],
      tipo_retorno: tipoRetorno
    }
  }

  /**
   * Extrai glosas da resposta
   */
  private extractGlosas(responseContent: string): TISSGlosa[] {
    const glosas: TISSGlosa[] = []

    const glosaMatches = responseContent.matchAll(
      /<(?:ans:)?glosa[^>]*>([\s\S]*?)<\/(?:ans:)?glosa>/gi
    )

    for (const match of glosaMatches) {
      const glosaContent = match[1]

      const codigoMatch = glosaContent.match(/<(?:ans:)?codigoGlosa>([^<]+)<\/(?:ans:)?codigoGlosa>/i)
      const descricaoMatch = glosaContent.match(/<(?:ans:)?descricaoGlosa>([^<]+)<\/(?:ans:)?descricaoGlosa>/i)
      const valorMatch = glosaContent.match(/<(?:ans:)?valorGlosa>([^<]+)<\/(?:ans:)?valorGlosa>/i)
      const sequencialMatch = glosaContent.match(/<(?:ans:)?sequencialItem>([^<]+)<\/(?:ans:)?sequencialItem>/i)
      const procedimentoMatch = glosaContent.match(/<(?:ans:)?codigoProcedimento>([^<]+)<\/(?:ans:)?codigoProcedimento>/i)

      if (codigoMatch) {
        glosas.push({
          codigo_glosa: codigoMatch[1],
          descricao_glosa: descricaoMatch?.[1] || '',
          valor_glosado: valorMatch ? parseFloat(valorMatch[1].replace(',', '.')) : 0,
          sequencial_item: sequencialMatch ? parseInt(sequencialMatch[1]) : undefined,
          codigo_procedimento: procedimentoMatch?.[1]
        })
      }
    }

    return glosas
  }

  /**
   * Realiza requisição HTTP com retry
   */
  private async httpRequest(
    soapEnvelope: string,
    retryCount = 0
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = new URL(this.operadora.endpoint)

      const options: https.RequestOptions = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname,
        method: 'POST',
        agent: this.agent,
        headers: {
          'Content-Type': this.operadora.soapVersion === '1.2'
            ? 'application/soap+xml; charset=ISO-8859-1'
            : 'text/xml; charset=ISO-8859-1',
          'Content-Length': Buffer.byteLength(soapEnvelope, 'latin1'),
          'SOAPAction': '',
          ...this.operadora.customHeaders
        },
        timeout: DEFAULT_TIMEOUT
      }

      const req = https.request(options, (res) => {
        let data = ''

        res.setEncoding('latin1')

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data)
          } else if (res.statusCode === 500 && retryCount < MAX_RETRIES) {
            // Retry em caso de erro 500
            const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount)
            setTimeout(() => {
              this.httpRequest(soapEnvelope, retryCount + 1)
                .then(resolve)
                .catch(reject)
            }, delay)
          } else {
            reject(new Error(`HTTP Error: ${res.statusCode} - ${res.statusMessage}`))
          }
        })
      })

      req.on('error', (error) => {
        if (retryCount < MAX_RETRIES) {
          const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount)
          setTimeout(() => {
            this.httpRequest(soapEnvelope, retryCount + 1)
              .then(resolve)
              .catch(reject)
          }, delay)
        } else {
          reject(error)
        }
      })

      req.on('timeout', () => {
        req.destroy()
        if (retryCount < MAX_RETRIES) {
          const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount)
          setTimeout(() => {
            this.httpRequest(soapEnvelope, retryCount + 1)
              .then(resolve)
              .catch(reject)
          }, delay)
        } else {
          reject(new Error('Request timeout'))
        }
      })

      // Escreve o body em ISO-8859-1
      req.write(soapEnvelope, 'latin1')
      req.end()
    })
  }

  /**
   * Envia lote de guias para a operadora
   */
  async sendLoteGuias(tissXml: string): Promise<TISSSoapResponse> {
    try {
      // Remove a declaração XML do conteúdo (já está no envelope SOAP)
      const content = tissXml.replace(/<\?xml[^?]*\?>\s*/i, '')

      const envelope = this.buildSoapEnvelope('tissLoteGuias', content)
      const rawResponse = await this.httpRequest(envelope)

      // Verifica erros SOAP
      const fault = this.checkSoapFault(rawResponse)
      if (fault.hasFault) {
        return {
          success: false,
          errors: [{
            code: fault.code || 'SOAP_FAULT',
            message: fault.message || 'Erro SOAP'
          }],
          rawResponse
        }
      }

      // Extrai conteúdo da resposta
      const responseContent = this.extractResponseContent(rawResponse)

      // Extrai protocolo
      const protocol = this.extractProtocol(responseContent)

      // Extrai glosas se houver
      const glosas = this.extractGlosas(responseContent)

      return {
        success: protocol?.tipo_retorno !== 'rejeitado',
        protocolNumber: protocol?.numero_protocolo,
        protocolDate: protocol?.data_protocolo,
        responseXml: responseContent,
        errors: glosas.length > 0 ? glosas.map(g => ({
          code: g.codigo_glosa,
          message: g.descricao_glosa
        })) : undefined,
        rawResponse
      }
    } catch (error: any) {
      return {
        success: false,
        errors: [{
          code: 'CONNECTION_ERROR',
          message: error.message || 'Erro de conexão com a operadora'
        }]
      }
    }
  }

  /**
   * Envia solicitação de procedimento
   */
  async sendSolicitacaoProcedimento(tissXml: string): Promise<TISSSoapResponse> {
    try {
      const content = tissXml.replace(/<\?xml[^?]*\?>\s*/i, '')
      const envelope = this.buildSoapEnvelope('tissSolicitacaoProcedimento', content)
      const rawResponse = await this.httpRequest(envelope)

      const fault = this.checkSoapFault(rawResponse)
      if (fault.hasFault) {
        return {
          success: false,
          errors: [{
            code: fault.code || 'SOAP_FAULT',
            message: fault.message || 'Erro SOAP'
          }],
          rawResponse
        }
      }

      const responseContent = this.extractResponseContent(rawResponse)
      const protocol = this.extractProtocol(responseContent)

      return {
        success: true,
        protocolNumber: protocol?.numero_protocolo,
        protocolDate: protocol?.data_protocolo,
        responseXml: responseContent,
        rawResponse
      }
    } catch (error: any) {
      return {
        success: false,
        errors: [{
          code: 'CONNECTION_ERROR',
          message: error.message
        }]
      }
    }
  }

  /**
   * Verifica elegibilidade do beneficiário
   */
  async checkElegibilidade(tissXml: string): Promise<TISSSoapResponse & {
    elegivel?: boolean
    plano?: string
    cobertura?: string[]
  }> {
    try {
      const content = tissXml.replace(/<\?xml[^?]*\?>\s*/i, '')
      const envelope = this.buildSoapEnvelope('tissVerificacaoElegibilidade', content)
      const rawResponse = await this.httpRequest(envelope)

      const fault = this.checkSoapFault(rawResponse)
      if (fault.hasFault) {
        return {
          success: false,
          errors: [{
            code: fault.code || 'SOAP_FAULT',
            message: fault.message || 'Erro SOAP'
          }],
          rawResponse
        }
      }

      const responseContent = this.extractResponseContent(rawResponse)

      // Extrai informações de elegibilidade
      const elegivelMatch = responseContent.match(/<(?:ans:)?elegivelAtendimento>([^<]+)<\/(?:ans:)?elegivelAtendimento>/i)
      const planoMatch = responseContent.match(/<(?:ans:)?nomePlano>([^<]+)<\/(?:ans:)?nomePlano>/i)

      return {
        success: true,
        responseXml: responseContent,
        rawResponse,
        elegivel: elegivelMatch?.[1]?.toLowerCase() === 's' || elegivelMatch?.[1]?.toLowerCase() === 'sim',
        plano: planoMatch?.[1]
      }
    } catch (error: any) {
      return {
        success: false,
        errors: [{
          code: 'CONNECTION_ERROR',
          message: error.message
        }]
      }
    }
  }

  /**
   * Consulta status de um protocolo
   */
  async consultaProtocolo(numeroProtocolo: string): Promise<TISSSoapResponse & {
    status?: string
    demonstrativo?: TISSDemonstrativoRetorno
  }> {
    // Constrói XML de consulta
    const consultaXml = `
      <ans:cabecalhoConsulta>
        <ans:registroANS>${this.operadora.registroANS}</ans:registroANS>
        <ans:numeroProtocolo>${numeroProtocolo}</ans:numeroProtocolo>
      </ans:cabecalhoConsulta>
    `

    try {
      const envelope = this.buildSoapEnvelope('tissConsultaProtocolo', consultaXml)
      const rawResponse = await this.httpRequest(envelope)

      const fault = this.checkSoapFault(rawResponse)
      if (fault.hasFault) {
        return {
          success: false,
          errors: [{
            code: fault.code || 'SOAP_FAULT',
            message: fault.message || 'Erro SOAP'
          }],
          rawResponse
        }
      }

      const responseContent = this.extractResponseContent(rawResponse)
      const protocol = this.extractProtocol(responseContent)
      const glosas = this.extractGlosas(responseContent)

      // Extrai valores totais
      const valorInformadoMatch = responseContent.match(/<(?:ans:)?valorTotalInformado>([^<]+)<\/(?:ans:)?valorTotalInformado>/i)
      const valorProcessadoMatch = responseContent.match(/<(?:ans:)?valorTotalProcessado>([^<]+)<\/(?:ans:)?valorTotalProcessado>/i)
      const numLoteMatch = responseContent.match(/<(?:ans:)?numeroLote>([^<]+)<\/(?:ans:)?numeroLote>/i)

      const demonstrativo: TISSDemonstrativoRetorno | undefined = protocol ? {
        protocolo: protocol,
        numero_lote: numLoteMatch?.[1] || '',
        data_envio: protocol.data_protocolo,
        quantidade_guias_aceitas: 0, // Seria extraído do XML real
        quantidade_guias_rejeitadas: glosas.length > 0 ? 1 : 0,
        valor_total_informado: valorInformadoMatch ? parseFloat(valorInformadoMatch[1].replace(',', '.')) : 0,
        valor_total_processado: valorProcessadoMatch ? parseFloat(valorProcessadoMatch[1].replace(',', '.')) : 0,
        glosas
      } : undefined

      return {
        success: true,
        protocolNumber: protocol?.numero_protocolo,
        responseXml: responseContent,
        rawResponse,
        status: protocol?.tipo_retorno,
        demonstrativo
      }
    } catch (error: any) {
      return {
        success: false,
        errors: [{
          code: 'CONNECTION_ERROR',
          message: error.message
        }]
      }
    }
  }

  /**
   * Envia recurso de glosa
   */
  async sendRecursoGlosa(tissXml: string): Promise<TISSSoapResponse> {
    try {
      const content = tissXml.replace(/<\?xml[^?]*\?>\s*/i, '')
      const envelope = this.buildSoapEnvelope('tissRecursoGlosa', content)
      const rawResponse = await this.httpRequest(envelope)

      const fault = this.checkSoapFault(rawResponse)
      if (fault.hasFault) {
        return {
          success: false,
          errors: [{
            code: fault.code || 'SOAP_FAULT',
            message: fault.message || 'Erro SOAP'
          }],
          rawResponse
        }
      }

      const responseContent = this.extractResponseContent(rawResponse)
      const protocol = this.extractProtocol(responseContent)

      return {
        success: true,
        protocolNumber: protocol?.numero_protocolo,
        protocolDate: protocol?.data_protocolo,
        responseXml: responseContent,
        rawResponse
      }
    } catch (error: any) {
      return {
        success: false,
        errors: [{
          code: 'CONNECTION_ERROR',
          message: error.message
        }]
      }
    }
  }

  /**
   * Fecha conexões do agente
   */
  destroy(): void {
    if (this.agent) {
      this.agent.destroy()
    }
  }
}

/**
 * Configurações pré-definidas de operadoras conhecidas
 */
export const OPERADORAS_CONHECIDAS: Record<string, Partial<TISSOperadoraConfig>> = {
  'UNIMED': {
    namespace: 'http://www.unimed.coop.br/tiss/ws',
    usesLoginHeader: true,
    requiresCertificate: true,
    soapVersion: '1.1'
  },
  'BRADESCO_SAUDE': {
    namespace: 'http://www.bradescoseguros.com.br/tiss',
    usesLoginHeader: true,
    requiresCertificate: true,
    soapVersion: '1.2'
  },
  'SULAMERICA': {
    namespace: 'http://www.sulamerica.com.br/tiss',
    usesLoginHeader: true,
    requiresCertificate: true,
    soapVersion: '1.1'
  },
  'AMIL': {
    namespace: 'http://www.amil.com.br/tiss',
    usesLoginHeader: true,
    requiresCertificate: false,
    soapVersion: '1.1'
  }
}

/**
 * Cria uma instância do cliente SOAP para uma operadora conhecida
 */
export function createSoapClientForOperadora(
  operadoraName: string,
  config: TISSConfig,
  registroANS: string,
  endpoint: string,
  credentials?: TISSSoapCredentials,
  certificate?: TISSCertificateConfig
): TISSSoapClient {
  const baseConfig = OPERADORAS_CONHECIDAS[operadoraName] || {}

  const operadoraConfig: TISSOperadoraConfig = {
    registroANS,
    nome: operadoraName,
    endpoint,
    usesLoginHeader: baseConfig.usesLoginHeader ?? true,
    requiresCertificate: baseConfig.requiresCertificate ?? false,
    namespace: baseConfig.namespace,
    soapVersion: baseConfig.soapVersion || '1.1'
  }

  return new TISSSoapClient(config, operadoraConfig, credentials, certificate)
}
