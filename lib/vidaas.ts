/**
 * Biblioteca de integração com VIDaaS (Valid Identity as a Service)
 * API de assinatura digital ICP-Brasil em nuvem
 * 
 * Documentação: https://valid-sa.atlassian.net/wiki/spaces/PDD/pages/958365697
 */

// URIs base do Valid PSC
const VIDAAS_PRODUCTION_URL = "https://certificado.vidaas.com.br"
const VIDAAS_HOMOLOGATION_URL = "https://hml-certificado.vidaas.com.br"

// Usar homologação por padrão, trocar para produção quando pronto
const BASE_URL = process.env.VIDAAS_PRODUCTION === "true" 
  ? VIDAAS_PRODUCTION_URL 
  : VIDAAS_HOMOLOGATION_URL

export interface VIDaaSConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

export interface VIDaaSUserDiscoveryResponse {
  status: "S" | "N"
  slots?: Array<{
    slot_alias: string
    label: string
  }>
}

export interface VIDaaSTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  authorized_identification: string
  authorized_identification_type: string
}

export interface VIDaaSSignatureRequest {
  hashes: Array<{
    id: string
    alias: string
    hash: string
    hash_algorithm: string
    signature_format: "RAW" | "CMS" | "CAdES_AD_RT" | "CAdES_AD_RB" | "PAdES_AD_RT" | "PAdES_AD_RB"
    base64_content?: string
  }>
  certificate_alias?: string
}

export interface VIDaaSSignatureResponse {
  signatures: Array<{
    id: string
    raw_signature?: string
    signed_content?: string
  }>
  certificate_alias: string
}

/**
 * Gera code_challenge e code_verifier para OAuth PKCE
 */
export function generatePKCE(): { codeVerifier: string; codeChallenge: string } {
  // Gerar code_verifier aleatório de 43-128 caracteres
  const array = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    // Fallback para Node.js
    const nodeCrypto = require('crypto')
    nodeCrypto.randomFillSync(array)
  }
  
  const codeVerifier = Buffer.from(array)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .substring(0, 43)

  // Gerar code_challenge usando SHA256
  const nodeCrypto = require('crypto')
  const hash = nodeCrypto.createHash('sha256').update(codeVerifier).digest()
  const codeChallenge = Buffer.from(hash)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')

  return { codeVerifier, codeChallenge }
}

/**
 * Gera hash SHA256 de um documento para assinatura
 */
export function generateDocumentHash(content: string | Buffer): string {
  const nodeCrypto = require('crypto')
  const hash = nodeCrypto.createHash('sha256').update(content).digest('base64')
  return hash
}

/**
 * Verifica se um CPF/CNPJ possui certificado digital válido no VIDaaS
 */
export async function userDiscovery(
  config: VIDaaSConfig,
  cpfCnpj: string,
  type: "CPF" | "CNPJ" = "CPF"
): Promise<VIDaaSUserDiscoveryResponse> {
  const response = await fetch(`${BASE_URL}/v0/oauth/user-discovery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      user_cpf_cnpj: type,
      val_cpf_cnpj: cpfCnpj.replace(/\D/g, '')
    })
  })

  if (!response.ok) {
    throw new Error(`VIDaaS user-discovery failed: ${response.status}`)
  }

  return response.json()
}

/**
 * Gera URL para autorização via QR Code
 * O usuário deve escanear o QR Code com o app VIDaaS
 */
export function getAuthorizationUrl(
  config: VIDaaSConfig,
  codeChallenge: string,
  options: {
    scope?: "single_signature" | "multi_signature" | "signature_session" | "authentication_session"
    lifetime?: number // em segundos, máximo 7 dias para PF, 30 dias para PJ
    state?: string
    loginHint?: string
  } = {}
): string {
  const params = new URLSearchParams({
    client_id: config.clientId,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    response_type: "code",
    scope: options.scope || "single_signature",
    redirect_uri: config.redirectUri,
    login_hint: options.loginHint || ""
  })

  if (options.lifetime) {
    params.append("lifetime", options.lifetime.toString())
  }

  if (options.state) {
    params.append("state", options.state)
  }

  return `${BASE_URL}/v0/oauth/authorize?${params.toString()}`
}

/**
 * Solicita autorização via Push (notificação no celular)
 */
export async function requestPushAuthorization(
  config: VIDaaSConfig,
  cpf: string,
  codeChallenge: string,
  options: {
    scope?: "single_signature" | "multi_signature" | "signature_session"
    lifetime?: number
  } = {}
): Promise<{ code: string; state?: string }> {
  const params = new URLSearchParams({
    client_id: config.clientId,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    response_type: "code",
    scope: options.scope || "single_signature",
    redirect_uri: config.redirectUri,
    login_hint: cpf.replace(/\D/g, '')
  })

  if (options.lifetime) {
    params.append("lifetime", options.lifetime.toString())
  }

  const response = await fetch(`${BASE_URL}/v0/oauth/authorize?${params.toString()}`, {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })

  if (!response.ok) {
    throw new Error(`VIDaaS push authorization failed: ${response.status}`)
  }

  return response.json()
}

/**
 * Troca o código de autorização por um access_token
 */
export async function getAccessToken(
  config: VIDaaSConfig,
  authorizationCode: string,
  codeVerifier: string
): Promise<VIDaaSTokenResponse> {
  const response = await fetch(`${BASE_URL}/v0/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: authorizationCode,
      redirect_uri: config.redirectUri,
      code_verifier: codeVerifier,
      client_id: config.clientId,
      client_secret: config.clientSecret
    })
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`VIDaaS token exchange failed: ${response.status} - ${error}`)
  }

  return response.json()
}

/**
 * Realiza assinatura digital de um ou mais documentos
 */
export async function signDocuments(
  accessToken: string,
  request: VIDaaSSignatureRequest
): Promise<VIDaaSSignatureResponse> {
  const response = await fetch(`${BASE_URL}/v0/oauth/signature`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify(request)
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`VIDaaS signature failed: ${response.status} - ${error}`)
  }

  return response.json()
}

/**
 * Assina um PDF e retorna o PDF assinado
 */
export async function signPDF(
  accessToken: string,
  pdfBase64: string,
  documentId: string,
  documentAlias: string
): Promise<string> {
  // Gerar hash do PDF
  const hash = generateDocumentHash(Buffer.from(pdfBase64, 'base64'))

  const request: VIDaaSSignatureRequest = {
    hashes: [{
      id: documentId,
      alias: documentAlias,
      hash: hash,
      hash_algorithm: "2.16.840.1.101.3.4.2.1", // SHA256 OID
      signature_format: "PAdES_AD_RB",
      base64_content: pdfBase64
    }]
  }

  const response = await signDocuments(accessToken, request)
  
  if (response.signatures.length === 0) {
    throw new Error("No signature returned from VIDaaS")
  }

  // Retorna o PDF assinado em base64
  return response.signatures[0].signed_content || response.signatures[0].raw_signature || ""
}

/**
 * Obtém o certificado público do usuário
 */
export async function getPublicCertificate(
  accessToken: string
): Promise<{ certificate: string; certificateAlias: string }> {
  const response = await fetch(`${BASE_URL}/v0/oauth/certificate`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })

  if (!response.ok) {
    throw new Error(`VIDaaS get certificate failed: ${response.status}`)
  }

  const data = await response.json()
  return {
    certificate: data.certificate,
    certificateAlias: data.certificate_alias
  }
}

/**
 * Revoga um token de sessão
 */
export async function revokeToken(
  config: VIDaaSConfig,
  accessToken: string
): Promise<void> {
  const response = await fetch(`${BASE_URL}/v0/oauth/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      token: accessToken
    })
  })

  if (!response.ok) {
    throw new Error(`VIDaaS revoke token failed: ${response.status}`)
  }
}

// Tipos exportados para uso em outros módulos
export type SignatureFormat = "RAW" | "CMS" | "CAdES_AD_RT" | "CAdES_AD_RB" | "PAdES_AD_RT" | "PAdES_AD_RB"
export type AuthorizationScope = "single_signature" | "multi_signature" | "signature_session" | "authentication_session"
