/**
 * @fileoverview VIDaaS (Valid Identity as a Service) Integration Library
 *
 * This module provides a comprehensive integration with VIDaaS, a cloud-based
 * ICP-Brasil digital signature service. It enables secure document signing
 * using Brazilian digital certificates (e-CPF/e-CNPJ) through OAuth 2.0 with
 * PKCE (Proof Key for Code Exchange) for enhanced security.
 *
 * ## Overview
 *
 * VIDaaS allows users to sign documents digitally using their ICP-Brasil
 * certificates stored in the cloud. This eliminates the need for physical
 * smart cards or USB tokens, as authentication is done via mobile app.
 *
 * ## Authentication Flow
 *
 * The library implements OAuth 2.0 Authorization Code flow with PKCE:
 *
 * 1. **PKCE Generation**: Generate `code_verifier` and `code_challenge` using
 *    {@link generatePKCE}
 *
 * 2. **User Discovery** (Optional): Check if user has a valid certificate
 *    using {@link userDiscovery}
 *
 * 3. **Authorization**: Redirect user to VIDaaS or send push notification:
 *    - QR Code: Use {@link getAuthorizationUrl} to generate URL
 *    - Push: Use {@link requestPushAuthorization} to send notification
 *
 * 4. **Token Exchange**: Exchange authorization code for access token using
 *    {@link getAccessToken}
 *
 * 5. **Document Signing**: Sign documents using {@link signDocuments} or
 *    {@link signPDF}
 *
 * 6. **Cleanup**: Revoke tokens when done using {@link revokeToken}
 *
 * ## Supported Signature Formats
 *
 * - `RAW`: Raw signature (just the cryptographic signature)
 * - `CMS`: Cryptographic Message Syntax
 * - `CAdES_AD_RT`: CAdES with timestamp (Advanced Digital Signature)
 * - `CAdES_AD_RB`: CAdES basic (most common for general documents)
 * - `PAdES_AD_RT`: PDF Advanced Electronic Signature with timestamp
 * - `PAdES_AD_RB`: PDF Advanced Electronic Signature basic (recommended for PDFs)
 *
 * ## Security Considerations
 *
 * - Always use HTTPS in production
 * - Store `clientSecret` securely (never expose to client-side code)
 * - Use `code_verifier` only once and discard after token exchange
 * - Revoke tokens when signing session is complete
 * - Validate all responses and handle errors appropriately
 *
 * ## Environment Configuration
 *
 * - `VIDAAS_PRODUCTION`: Set to "true" for production environment
 * - Production URL: https://certificado.vidaas.com.br
 * - Homologation URL: https://hml-certificado.vidaas.com.br
 *
 * @see {@link https://valid-sa.atlassian.net/wiki/spaces/PDD/pages/958365697} VIDaaS API Documentation
 *
 * @module lib/vidaas
 * @version 1.0.0
 * @license MIT
 *
 * @example
 * // Complete signing flow example
 * import {
 *   generatePKCE,
 *   getAuthorizationUrl,
 *   getAccessToken,
 *   signPDF,
 *   revokeToken
 * } from '@/lib/vidaas';
 *
 * const config = {
 *   clientId: process.env.VIDAAS_CLIENT_ID!,
 *   clientSecret: process.env.VIDAAS_CLIENT_SECRET!,
 *   redirectUri: 'https://yourapp.com/api/signature/callback'
 * };
 *
 * // Step 1: Generate PKCE codes
 * const { codeVerifier, codeChallenge } = generatePKCE();
 * // Store codeVerifier securely for later use
 *
 * // Step 2: Generate authorization URL
 * const authUrl = getAuthorizationUrl(config, codeChallenge, {
 *   scope: 'single_signature',
 *   state: 'your-state-value'
 * });
 * // Redirect user to authUrl or display as QR code
 *
 * // Step 3: After callback, exchange code for token
 * const token = await getAccessToken(config, authorizationCode, codeVerifier);
 *
 * // Step 4: Sign the PDF
 * const signedPdf = await signPDF(
 *   token.access_token,
 *   pdfBase64Content,
 *   'doc-123',
 *   'Medical Prescription'
 * );
 *
 * // Step 5: Cleanup
 * await revokeToken(config, token.access_token);
 */

// =============================================================================
// CONSTANTS & CONFIGURATION
// =============================================================================

/**
 * VIDaaS production API base URL.
 * Use this URL for live production signatures with real certificates.
 * @constant {string}
 */
const VIDAAS_PRODUCTION_URL = "https://certificado.vidaas.com.br"

/**
 * VIDaaS homologation (staging) API base URL.
 * Use this URL for testing and development with test certificates.
 * @constant {string}
 */
const VIDAAS_HOMOLOGATION_URL = "https://hml-certificado.vidaas.com.br"

/**
 * Active VIDaaS API base URL based on environment configuration.
 * Determined by the `VIDAAS_PRODUCTION` environment variable.
 *
 * @constant {string}
 * @default VIDAAS_HOMOLOGATION_URL (for safety during development)
 */
const BASE_URL = process.env.VIDAAS_PRODUCTION === "true"
  ? VIDAAS_PRODUCTION_URL
  : VIDAAS_HOMOLOGATION_URL

// =============================================================================
// TYPE DEFINITIONS & INTERFACES
// =============================================================================

/**
 * Configuration object for VIDaaS API authentication.
 *
 * These credentials are provided by Valid Certificadora when you register
 * your application as an OAuth client.
 *
 * @interface VIDaaSConfig
 *
 * @property {string} clientId - OAuth 2.0 client identifier assigned to your application.
 *   This is public and can be exposed in client-side code if needed.
 *
 * @property {string} clientSecret - OAuth 2.0 client secret for your application.
 *   **SECURITY**: Keep this confidential. Never expose in client-side code.
 *   Store in environment variables or secure vault.
 *
 * @property {string} redirectUri - OAuth callback URL where VIDaaS will redirect
 *   after user authorization. Must be pre-registered with VIDaaS.
 *   Example: "https://yourapp.com/api/signature/callback"
 *
 * @example
 * const config: VIDaaSConfig = {
 *   clientId: process.env.VIDAAS_CLIENT_ID!,
 *   clientSecret: process.env.VIDAAS_CLIENT_SECRET!,
 *   redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/signature/callback`
 * };
 */
export interface VIDaaSConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
}

/**
 * Response from the VIDaaS user discovery endpoint.
 *
 * Used to check if a user (identified by CPF or CNPJ) has a valid digital
 * certificate registered in the VIDaaS system.
 *
 * @interface VIDaaSUserDiscoveryResponse
 *
 * @property {"S" | "N"} status - Discovery result:
 *   - `"S"` (Sim/Yes): User has valid certificate(s)
 *   - `"N"` (Não/No): User does not have valid certificates
 *
 * @property {Array<{slot_alias: string, label: string}>} [slots] - Available certificate slots.
 *   Only present when status is "S". Each slot represents a certificate the user can use.
 *   - `slot_alias`: Internal identifier for the certificate slot
 *   - `label`: Human-readable description of the certificate
 *
 * @example
 * // User with certificates
 * {
 *   status: "S",
 *   slots: [
 *     { slot_alias: "CERT_001", label: "e-CPF A3 - João Silva" },
 *     { slot_alias: "CERT_002", label: "e-CNPJ A3 - Empresa LTDA" }
 *   ]
 * }
 *
 * @example
 * // User without certificates
 * { status: "N" }
 */
export interface VIDaaSUserDiscoveryResponse {
  status: "S" | "N"
  slots?: Array<{
    slot_alias: string
    label: string
  }>
}

/**
 * Response from the VIDaaS OAuth token endpoint.
 *
 * Contains the access token and metadata returned after successful
 * authorization code exchange.
 *
 * @interface VIDaaSTokenResponse
 *
 * @property {string} access_token - Bearer token for authenticating subsequent API calls.
 *   Valid for the duration specified in `expires_in`.
 *
 * @property {string} token_type - Token type, always "Bearer" for VIDaaS.
 *
 * @property {number} expires_in - Token validity duration in seconds.
 *   Typically 300 seconds (5 minutes) for single_signature scope.
 *
 * @property {string} scope - Granted authorization scope.
 *   Matches or is subset of requested scope.
 *
 * @property {string} authorized_identification - CPF or CNPJ of the certificate owner
 *   who authorized the request.
 *
 * @property {string} authorized_identification_type - Type of identification:
 *   "CPF" for individuals, "CNPJ" for companies.
 *
 * @example
 * {
 *   access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   token_type: "Bearer",
 *   expires_in: 300,
 *   scope: "single_signature",
 *   authorized_identification: "12345678901",
 *   authorized_identification_type: "CPF"
 * }
 */
export interface VIDaaSTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
  authorized_identification: string
  authorized_identification_type: string
}

/**
 * Request payload for document signing operations.
 *
 * Supports batch signing of multiple documents in a single request.
 * Each document is identified by a hash of its content.
 *
 * @interface VIDaaSSignatureRequest
 *
 * @property {Array<Object>} hashes - Array of documents to sign.
 *   Each object contains:
 *   - `id` {string}: Unique identifier for the document (used to match response)
 *   - `alias` {string}: Human-readable name for the document
 *   - `hash` {string}: Base64-encoded hash of the document content
 *   - `hash_algorithm` {string}: OID of the hash algorithm used
 *     - SHA256: "2.16.840.1.101.3.4.2.1"
 *     - SHA384: "2.16.840.1.101.3.4.2.2"
 *     - SHA512: "2.16.840.1.101.3.4.2.3"
 *   - `signature_format` {SignatureFormat}: Desired signature format
 *   - `base64_content` {string?}: Full document in base64 (required for PAdES)
 *
 * @property {string} [certificate_alias] - Specific certificate slot to use.
 *   If omitted, user's default certificate is used.
 *
 * @example
 * const request: VIDaaSSignatureRequest = {
 *   hashes: [{
 *     id: "prescription-001",
 *     alias: "Medical Prescription - Dr. Smith",
 *     hash: "base64EncodedHashHere==",
 *     hash_algorithm: "2.16.840.1.101.3.4.2.1",
 *     signature_format: "PAdES_AD_RB",
 *     base64_content: "JVBERi0xLjQKJeLjz9MKMyAwIG9i..."
 *   }]
 * };
 */
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

/**
 * Response from the VIDaaS signature endpoint.
 *
 * Contains the signed documents and certificate information used for signing.
 *
 * @interface VIDaaSSignatureResponse
 *
 * @property {Array<Object>} signatures - Array of signed documents.
 *   Each object contains:
 *   - `id` {string}: Matches the request document ID
 *   - `raw_signature` {string?}: Raw cryptographic signature (for RAW/CMS/CAdES formats)
 *   - `signed_content` {string?}: Complete signed document in base64 (for PAdES formats)
 *
 * @property {string} certificate_alias - Identifier of the certificate used for signing.
 *   Useful for audit trails and certificate verification.
 *
 * @example
 * {
 *   signatures: [{
 *     id: "prescription-001",
 *     signed_content: "JVBERi0xLjQKJeLjz9MKMS..." // Signed PDF in base64
 *   }],
 *   certificate_alias: "CERT_CPF_12345678901"
 * }
 */
export interface VIDaaSSignatureResponse {
  signatures: Array<{
    id: string
    raw_signature?: string
    signed_content?: string
  }>
  certificate_alias: string
}

// =============================================================================
// PKCE & CRYPTOGRAPHIC FUNCTIONS
// =============================================================================

/**
 * Generates PKCE (Proof Key for Code Exchange) codes for secure OAuth flow.
 *
 * PKCE is an extension to OAuth 2.0 that prevents authorization code interception
 * attacks. It's especially important for public clients and mobile applications.
 *
 * ## How PKCE Works
 *
 * 1. Client generates a random `code_verifier` (43-128 characters)
 * 2. Client creates `code_challenge` = BASE64URL(SHA256(code_verifier))
 * 3. `code_challenge` is sent with authorization request
 * 4. `code_verifier` is sent with token exchange request
 * 5. Server verifies: SHA256(code_verifier) === code_challenge
 *
 * ## Security Notes
 *
 * - `code_verifier` must be kept secret until token exchange
 * - Never reuse PKCE codes across multiple authorization requests
 * - Store `code_verifier` in a secure session/cookie, never in URL
 *
 * @function generatePKCE
 * @returns {{ codeVerifier: string; codeChallenge: string }} Object containing:
 *   - `codeVerifier`: Random 43-character base64url-encoded string
 *   - `codeChallenge`: SHA256 hash of verifier, base64url-encoded
 *
 * @example
 * const { codeVerifier, codeChallenge } = generatePKCE();
 *
 * // Store codeVerifier in session for later use
 * session.codeVerifier = codeVerifier;
 *
 * // Use codeChallenge in authorization URL
 * const authUrl = getAuthorizationUrl(config, codeChallenge);
 *
 * // Later, use codeVerifier in token exchange
 * const token = await getAccessToken(config, code, session.codeVerifier);
 *
 * @see {@link https://datatracker.ietf.org/doc/html/rfc7636} RFC 7636 - PKCE
 */
export function generatePKCE(): { codeVerifier: string; codeChallenge: string } {
  // Generate cryptographically secure random bytes (32 bytes = 256 bits)
  const array = new Uint8Array(32)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array)
  } else {
    // Fallback for Node.js environments without global crypto
    const nodeCrypto = require('crypto')
    nodeCrypto.randomFillSync(array)
  }

  // Convert to base64url format (URL-safe base64 without padding)
  // Per RFC 7636, code_verifier must be 43-128 characters
  const codeVerifier = Buffer.from(array)
    .toString('base64')
    .replace(/\+/g, '-')  // Replace + with - (base64url)
    .replace(/\//g, '_')  // Replace / with _ (base64url)
    .replace(/=/g, '')    // Remove padding
    .substring(0, 43)     // Ensure exactly 43 characters

  // Generate code_challenge using SHA256 (S256 method)
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
 * Generates a SHA256 hash of a document for digital signature.
 *
 * The hash is used to create a unique fingerprint of the document content.
 * The signature is actually performed on this hash, not the full document,
 * which is more efficient and provides the same security guarantees.
 *
 * ## Hash Algorithm Details
 *
 * - Algorithm: SHA-256 (Secure Hash Algorithm 256-bit)
 * - Output: 32 bytes (256 bits) encoded as base64 string
 * - OID: 2.16.840.1.101.3.4.2.1 (used in signature requests)
 *
 * ## Security Considerations
 *
 * - SHA256 is cryptographically secure for document signing
 * - Any change to the document will result in a completely different hash
 * - The hash cannot be reversed to obtain the original content
 *
 * @function generateDocumentHash
 * @param {string | Buffer} content - Document content to hash.
 *   Can be a string (text documents) or Buffer (binary files like PDFs).
 * @returns {string} Base64-encoded SHA256 hash of the document.
 *
 * @example
 * // Hash a PDF buffer
 * const pdfBuffer = fs.readFileSync('document.pdf');
 * const hash = generateDocumentHash(pdfBuffer);
 * console.log(hash); // "x7dRbs6Wz8QRXj3k9p2mN..."
 *
 * @example
 * // Hash from base64 string
 * const pdfBase64 = "JVBERi0xLjQK...";
 * const hash = generateDocumentHash(Buffer.from(pdfBase64, 'base64'));
 */
export function generateDocumentHash(content: string | Buffer): string {
  const nodeCrypto = require('crypto')
  const hash = nodeCrypto.createHash('sha256').update(content).digest('base64')
  return hash
}

// =============================================================================
// USER DISCOVERY
// =============================================================================

/**
 * Checks if a CPF or CNPJ has valid digital certificates in VIDaaS.
 *
 * Use this function to verify if a user can sign documents before starting
 * the authorization flow. This provides a better user experience by catching
 * missing certificates early.
 *
 * ## Common Use Cases
 *
 * 1. Validate user can sign before showing signing UI
 * 2. List available certificates for user selection
 * 3. Check certificate status for compliance requirements
 *
 * ## Rate Limiting
 *
 * This endpoint may have rate limits. Cache results when appropriate,
 * especially for repeated checks on the same user.
 *
 * @async
 * @function userDiscovery
 * @param {VIDaaSConfig} config - VIDaaS API configuration with credentials.
 * @param {string} cpfCnpj - CPF (11 digits) or CNPJ (14 digits) to check.
 *   Can include formatting (dots, dashes, slashes) - they will be stripped.
 * @param {"CPF" | "CNPJ"} [type="CPF"] - Document type being provided.
 *
 * @returns {Promise<VIDaaSUserDiscoveryResponse>} Discovery result with available certificates.
 *
 * @throws {Error} When API request fails with status code in error message.
 *   Common errors:
 *   - 400: Invalid CPF/CNPJ format
 *   - 401: Invalid client credentials
 *   - 429: Rate limit exceeded
 *   - 500: VIDaaS service error
 *
 * @example
 * // Check if user has a certificate
 * try {
 *   const result = await userDiscovery(config, "123.456.789-01", "CPF");
 *
 *   if (result.status === "S") {
 *     console.log("User has certificates:", result.slots);
 *     // Proceed with signing flow
 *   } else {
 *     console.log("User needs to register a certificate");
 *     // Show instructions for certificate registration
 *   }
 * } catch (error) {
 *   console.error("Discovery failed:", error.message);
 * }
 *
 * @example
 * // Check company certificate
 * const companyResult = await userDiscovery(
 *   config,
 *   "12.345.678/0001-90",
 *   "CNPJ"
 * );
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
      val_cpf_cnpj: cpfCnpj.replace(/\D/g, '') // Remove non-digit characters
    })
  })

  if (!response.ok) {
    throw new Error(`VIDaaS user-discovery failed: ${response.status}`)
  }

  return response.json()
}

// =============================================================================
// AUTHORIZATION FUNCTIONS
// =============================================================================

/**
 * Generates the VIDaaS OAuth authorization URL.
 *
 * This URL can be used to redirect the user or displayed as a QR code for
 * the user to scan with the VIDaaS mobile app.
 *
 * ## Authorization Methods
 *
 * 1. **QR Code**: Display URL as QR code, user scans with VIDaaS app
 * 2. **Redirect**: Redirect user to URL in browser (for desktop flows)
 * 3. **Push**: Use {@link requestPushAuthorization} instead (for mobile)
 *
 * ## Available Scopes
 *
 * | Scope | Description | Token Validity |
 * |-------|-------------|----------------|
 * | `single_signature` | Sign one document | ~5 minutes |
 * | `multi_signature` | Sign multiple documents | ~5 minutes |
 * | `signature_session` | Extended signing session | Up to 7 days (PF) / 30 days (PJ) |
 * | `authentication_session` | Authentication only | Varies |
 *
 * ## State Parameter (CSRF Protection)
 *
 * Always use the `state` parameter to prevent CSRF attacks:
 * 1. Generate a random state value
 * 2. Store it in session before redirect
 * 3. Verify it matches when handling callback
 *
 * @function getAuthorizationUrl
 * @param {VIDaaSConfig} config - VIDaaS API configuration.
 * @param {string} codeChallenge - PKCE code challenge from {@link generatePKCE}.
 * @param {Object} [options] - Optional authorization parameters.
 * @param {AuthorizationScope} [options.scope="single_signature"] - Authorization scope.
 * @param {number} [options.lifetime] - Session lifetime in seconds.
 *   - Maximum 7 days (604800s) for individuals (PF)
 *   - Maximum 30 days (2592000s) for companies (PJ)
 *   - Only applicable for session scopes
 * @param {string} [options.state] - Random string for CSRF protection.
 *   Will be returned unchanged in callback.
 * @param {string} [options.loginHint] - Pre-fill user's CPF/CNPJ (digits only).
 *   Speeds up authorization by pre-selecting user's certificate.
 *
 * @returns {string} Complete authorization URL ready for redirect or QR code.
 *
 * @example
 * // Generate authorization URL with CSRF protection
 * const state = crypto.randomUUID();
 * session.oauthState = state;
 *
 * const authUrl = getAuthorizationUrl(config, codeChallenge, {
 *   scope: "single_signature",
 *   state: state,
 *   loginHint: "12345678901"
 * });
 *
 * // Option 1: Redirect user
 * redirect(authUrl);
 *
 * // Option 2: Display as QR code
 * <QRCode value={authUrl} />
 *
 * @example
 * // Extended signing session for batch operations
 * const authUrl = getAuthorizationUrl(config, codeChallenge, {
 *   scope: "signature_session",
 *   lifetime: 86400, // 24 hours
 *   state: generateRandomState()
 * });
 */
export function getAuthorizationUrl(
  config: VIDaaSConfig,
  codeChallenge: string,
  options: {
    scope?: "single_signature" | "multi_signature" | "signature_session" | "authentication_session"
    lifetime?: number
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
 * Requests authorization via push notification to user's mobile device.
 *
 * Alternative to QR code flow - sends a push notification directly to the
 * user's VIDaaS mobile app. User approves on their phone, and the
 * authorization code is returned.
 *
 * ## When to Use Push vs QR Code
 *
 * | Scenario | Recommended Method |
 * |----------|-------------------|
 * | Desktop application | QR Code |
 * | Mobile application | Push |
 * | Known user CPF | Push |
 * | Public kiosk | QR Code |
 * | Background signing | Push |
 *
 * ## Important Notes
 *
 * - User must have VIDaaS app installed with push notifications enabled
 * - User must have previously registered their CPF in VIDaaS
 * - This is a blocking call that waits for user response
 * - Consider implementing timeout handling
 *
 * @async
 * @function requestPushAuthorization
 * @param {VIDaaSConfig} config - VIDaaS API configuration.
 * @param {string} cpf - User's CPF (will be stripped of non-digits).
 * @param {string} codeChallenge - PKCE code challenge from {@link generatePKCE}.
 * @param {Object} [options] - Optional authorization parameters.
 * @param {"single_signature" | "multi_signature" | "signature_session"} [options.scope="single_signature"] - Scope.
 * @param {number} [options.lifetime] - Session lifetime in seconds (for session scopes).
 *
 * @returns {Promise<{code: string, state?: string}>} Authorization result:
 *   - `code`: Authorization code for token exchange
 *   - `state`: Echo of state parameter if provided
 *
 * @throws {Error} When push authorization fails:
 *   - User denied the request
 *   - User not found (no VIDaaS account)
 *   - Push notification delivery failed
 *   - Request timeout
 *
 * @example
 * try {
 *   const result = await requestPushAuthorization(
 *     config,
 *     "12345678901",
 *     codeChallenge,
 *     { scope: "single_signature" }
 *   );
 *
 *   // Exchange code for token
 *   const token = await getAccessToken(config, result.code, codeVerifier);
 * } catch (error) {
 *   if (error.message.includes("403")) {
 *     console.log("User denied the authorization request");
 *   } else {
 *     console.error("Push authorization failed:", error);
 *   }
 * }
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
    login_hint: cpf.replace(/\D/g, '') // Strip non-digit characters
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

// =============================================================================
// TOKEN MANAGEMENT
// =============================================================================

/**
 * Exchanges an authorization code for an access token.
 *
 * This is step 4 of the OAuth PKCE flow. After the user authorizes the
 * request and you receive the authorization code in the callback, use
 * this function to obtain the access token for signing.
 *
 * ## Security Requirements
 *
 * - `codeVerifier` must match the `codeChallenge` used in authorization
 * - Authorization code can only be used once
 * - Code expires shortly after issuance (typically 60 seconds)
 *
 * ## Token Lifetime
 *
 * | Scope | Typical Lifetime |
 * |-------|-----------------|
 * | single_signature | 300s (5 min) |
 * | multi_signature | 300s (5 min) |
 * | signature_session | Custom (up to 7/30 days) |
 *
 * @async
 * @function getAccessToken
 * @param {VIDaaSConfig} config - VIDaaS API configuration with credentials.
 * @param {string} authorizationCode - Code received from authorization callback.
 * @param {string} codeVerifier - PKCE code verifier (generated with {@link generatePKCE}).
 *
 * @returns {Promise<VIDaaSTokenResponse>} Token response containing access token and metadata.
 *
 * @throws {Error} When token exchange fails:
 *   - 400: Invalid authorization code or code verifier mismatch
 *   - 401: Invalid client credentials
 *   - 410: Authorization code expired
 *
 * @example
 * // In your callback route handler
 * export async function GET(request: Request) {
 *   const { searchParams } = new URL(request.url);
 *   const code = searchParams.get('code');
 *   const state = searchParams.get('state');
 *
 *   // Verify state parameter
 *   const session = await getSession();
 *   if (state !== session.oauthState) {
 *     throw new Error('Invalid state - possible CSRF attack');
 *   }
 *
 *   // Exchange code for token
 *   const token = await getAccessToken(
 *     config,
 *     code!,
 *     session.codeVerifier
 *   );
 *
 *   // Store token for signing
 *   session.accessToken = token.access_token;
 *   session.tokenExpiry = Date.now() + (token.expires_in * 1000);
 *
 *   // Redirect to signing page
 *   return redirect('/sign');
 * }
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

// =============================================================================
// DOCUMENT SIGNING FUNCTIONS
// =============================================================================

/**
 * Signs one or more documents using the user's digital certificate.
 *
 * This is the core signing function that sends document hashes to VIDaaS
 * for cryptographic signing. Supports batch signing of multiple documents
 * in a single request.
 *
 * ## Signature Formats
 *
 * Choose the appropriate format based on your use case:
 *
 * | Format | Use Case | Output |
 * |--------|----------|--------|
 * | `RAW` | Generic signing | Raw signature bytes |
 * | `CMS` | Standard documents | Detached signature |
 * | `CAdES_AD_RB` | Long-term archival | Embedded timestamp |
 * | `CAdES_AD_RT` | High compliance | Full timestamp chain |
 * | `PAdES_AD_RB` | PDF documents | Signed PDF |
 * | `PAdES_AD_RT` | PDF with timestamp | Signed PDF + timestamp |
 *
 * ## Batch Signing
 *
 * You can sign multiple documents with a single authorization:
 * - With `single_signature` scope: One document per token
 * - With `multi_signature` scope: Multiple documents per token
 * - With `signature_session`: Unlimited documents during session
 *
 * @async
 * @function signDocuments
 * @param {string} accessToken - Valid access token from {@link getAccessToken}.
 * @param {VIDaaSSignatureRequest} request - Signing request with document hashes.
 *
 * @returns {Promise<VIDaaSSignatureResponse>} Signed documents with certificate info.
 *
 * @throws {Error} When signing fails:
 *   - 400: Invalid request format or hash
 *   - 401: Invalid or expired access token
 *   - 403: Scope doesn't allow requested operation
 *   - 422: Invalid signature format for document type
 *
 * @example
 * // Sign a single document with CAdES format
 * const request: VIDaaSSignatureRequest = {
 *   hashes: [{
 *     id: "contract-001",
 *     alias: "Service Contract",
 *     hash: generateDocumentHash(documentContent),
 *     hash_algorithm: "2.16.840.1.101.3.4.2.1",
 *     signature_format: "CAdES_AD_RB"
 *   }]
 * };
 *
 * const response = await signDocuments(accessToken, request);
 * const signature = response.signatures[0].raw_signature;
 *
 * @example
 * // Batch sign multiple documents
 * const request: VIDaaSSignatureRequest = {
 *   hashes: documents.map((doc, i) => ({
 *     id: `doc-${i}`,
 *     alias: doc.name,
 *     hash: generateDocumentHash(doc.content),
 *     hash_algorithm: "2.16.840.1.101.3.4.2.1",
 *     signature_format: "CAdES_AD_RB"
 *   }))
 * };
 *
 * const response = await signDocuments(accessToken, request);
 * // Process each signed document
 * response.signatures.forEach(sig => {
 *   console.log(`Document ${sig.id} signed`);
 * });
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
 * Signs a PDF document and returns the signed PDF.
 *
 * Convenience wrapper around {@link signDocuments} specifically for PDF files.
 * Uses PAdES_AD_RB format which embeds the signature directly into the PDF,
 * making it self-contained and easily verifiable.
 *
 * ## PAdES Signature Details
 *
 * - **Format**: PAdES_AD_RB (PDF Advanced Electronic Signature - Basic)
 * - **Compliance**: ICP-Brasil AD-RB requirements
 * - **Verification**: Standard PDF readers can verify the signature
 * - **Embedding**: Signature is embedded in the PDF structure
 *
 * ## Document Requirements
 *
 * - PDF must be valid and not corrupted
 * - PDF should not be encrypted or password-protected
 * - Maximum size depends on VIDaaS plan limits
 *
 * @async
 * @function signPDF
 * @param {string} accessToken - Valid access token from {@link getAccessToken}.
 * @param {string} pdfBase64 - PDF document content encoded as base64 string.
 * @param {string} documentId - Unique identifier for tracking the document.
 *   Used to match request and response in batch operations.
 * @param {string} documentAlias - Human-readable name for the document.
 *   Displayed in VIDaaS app during authorization.
 *
 * @returns {Promise<string>} Signed PDF document as base64-encoded string.
 *   Can be decoded and saved as a .pdf file.
 *
 * @throws {Error} When PDF signing fails:
 *   - "No signature returned from VIDaaS": Signing completed but no output
 *   - Token/permission errors from {@link signDocuments}
 *
 * @example
 * // Sign a PDF prescription
 * import { readFileSync, writeFileSync } from 'fs';
 *
 * // Read PDF file
 * const pdfBuffer = readFileSync('prescription.pdf');
 * const pdfBase64 = pdfBuffer.toString('base64');
 *
 * // Sign the PDF
 * const signedPdfBase64 = await signPDF(
 *   accessToken,
 *   pdfBase64,
 *   `prescription-${Date.now()}`,
 *   "Medical Prescription - Dr. João Silva"
 * );
 *
 * // Save signed PDF
 * const signedBuffer = Buffer.from(signedPdfBase64, 'base64');
 * writeFileSync('prescription-signed.pdf', signedBuffer);
 *
 * @example
 * // Sign PDF from HTML generation
 * const html = generatePrescriptionHTML(prescriptionData);
 * const pdfBase64 = await htmlToPdfBase64(html);
 *
 * const signedPdf = await signPDF(
 *   token.access_token,
 *   pdfBase64,
 *   prescriptionData.id,
 *   `Prescription #${prescriptionData.number}`
 * );
 */
export async function signPDF(
  accessToken: string,
  pdfBase64: string,
  documentId: string,
  documentAlias: string
): Promise<string> {
  // Generate SHA256 hash of the PDF content
  const hash = generateDocumentHash(Buffer.from(pdfBase64, 'base64'))

  const request: VIDaaSSignatureRequest = {
    hashes: [{
      id: documentId,
      alias: documentAlias,
      hash: hash,
      hash_algorithm: "2.16.840.1.101.3.4.2.1", // SHA256 OID
      signature_format: "PAdES_AD_RB",          // PDF signature format
      base64_content: pdfBase64                  // Required for PAdES
    }]
  }

  const response = await signDocuments(accessToken, request)

  if (response.signatures.length === 0) {
    throw new Error("No signature returned from VIDaaS")
  }

  // Return the signed PDF content (base64)
  // PAdES returns signed_content, other formats may use raw_signature
  return response.signatures[0].signed_content || response.signatures[0].raw_signature || ""
}

// =============================================================================
// CERTIFICATE & TOKEN MANAGEMENT
// =============================================================================

/**
 * Retrieves the public certificate of the authenticated user.
 *
 * The public certificate contains information about the certificate holder
 * and can be used for:
 * - Verifying the signer's identity
 * - Validating signed documents
 * - Audit trail and compliance records
 *
 * ## Certificate Information
 *
 * The X.509 certificate contains:
 * - Subject DN (Distinguished Name): Owner's name, CPF/CNPJ, etc.
 * - Issuer DN: Certificate Authority information
 * - Validity period: Not before / Not after dates
 * - Public key: RSA/ECDSA public key
 * - Extensions: ICP-Brasil specific attributes
 *
 * @async
 * @function getPublicCertificate
 * @param {string} accessToken - Valid access token from {@link getAccessToken}.
 *
 * @returns {Promise<{certificate: string, certificateAlias: string}>} Certificate data:
 *   - `certificate`: PEM-encoded X.509 certificate
 *   - `certificateAlias`: Internal identifier for the certificate
 *
 * @throws {Error} When certificate retrieval fails:
 *   - 401: Invalid or expired access token
 *   - 404: No certificate associated with the session
 *
 * @example
 * // Retrieve and log certificate info
 * const { certificate, certificateAlias } = await getPublicCertificate(accessToken);
 *
 * console.log("Certificate alias:", certificateAlias);
 * console.log("Certificate PEM:", certificate);
 *
 * // Parse certificate for details (using node-forge or similar)
 * const forge = require('node-forge');
 * const cert = forge.pki.certificateFromPem(certificate);
 * console.log("Subject:", cert.subject.getField('CN').value);
 * console.log("Valid until:", cert.validity.notAfter);
 *
 * @example
 * // Store certificate for audit trail
 * const certData = await getPublicCertificate(accessToken);
 * await db.signatureAudit.create({
 *   prescriptionId: prescription.id,
 *   certificateAlias: certData.certificateAlias,
 *   certificatePem: certData.certificate,
 *   signedAt: new Date()
 * });
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
 * Revokes an access token to end the signing session.
 *
 * Always revoke tokens when you're done signing to:
 * - Prevent unauthorized use of the session
 * - Free up server resources
 * - Comply with security best practices
 *
 * ## When to Revoke
 *
 * - After completing all signing operations
 * - When user cancels the signing flow
 * - On application logout
 * - When an error occurs during signing
 *
 * ## Token Lifecycle
 *
 * ```
 * Generate PKCE → Authorize → Get Token → Sign → Revoke
 *                                              ↑ (you are here)
 * ```
 *
 * @async
 * @function revokeToken
 * @param {VIDaaSConfig} config - VIDaaS API configuration with credentials.
 * @param {string} accessToken - Token to revoke.
 *
 * @returns {Promise<void>} Resolves when token is successfully revoked.
 *
 * @throws {Error} When revocation fails:
 *   - 400: Invalid token format
 *   - 401: Invalid client credentials
 *   Note: Revoking an already-revoked token usually succeeds silently.
 *
 * @example
 * // Complete signing flow with proper cleanup
 * try {
 *   const token = await getAccessToken(config, code, verifier);
 *   const signedPdf = await signPDF(token.access_token, pdf, id, name);
 *
 *   // Save signed document
 *   await savePrescription(signedPdf);
 *
 * } finally {
 *   // Always revoke token, even if signing fails
 *   try {
 *     await revokeToken(config, token.access_token);
 *   } catch (e) {
 *     console.warn("Token revocation failed:", e);
 *     // Non-critical - token will expire anyway
 *   }
 * }
 *
 * @example
 * // Cleanup on user cancellation
 * async function handleCancel(session: SigningSession) {
 *   if (session.accessToken) {
 *     await revokeToken(config, session.accessToken);
 *   }
 *   // Clear session data
 *   delete session.accessToken;
 *   delete session.codeVerifier;
 * }
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

// =============================================================================
// TYPE EXPORTS
// =============================================================================

/**
 * Available digital signature formats supported by VIDaaS.
 *
 * | Format | Description |
 * |--------|-------------|
 * | `RAW` | Raw cryptographic signature bytes |
 * | `CMS` | Cryptographic Message Syntax (PKCS#7) |
 * | `CAdES_AD_RT` | CAdES with timestamp (requires TSA) |
 * | `CAdES_AD_RB` | CAdES basic, ICP-Brasil compliant |
 * | `PAdES_AD_RT` | PDF signature with timestamp |
 * | `PAdES_AD_RB` | PDF signature basic, most common for PDFs |
 *
 * @typedef {"RAW" | "CMS" | "CAdES_AD_RT" | "CAdES_AD_RB" | "PAdES_AD_RT" | "PAdES_AD_RB"} SignatureFormat
 */
export type SignatureFormat = "RAW" | "CMS" | "CAdES_AD_RT" | "CAdES_AD_RB" | "PAdES_AD_RT" | "PAdES_AD_RB"

/**
 * Available authorization scopes for VIDaaS OAuth.
 *
 * | Scope | Description | Use Case |
 * |-------|-------------|----------|
 * | `single_signature` | Sign one document | Single prescription |
 * | `multi_signature` | Sign multiple documents | Batch signing |
 * | `signature_session` | Extended signing session | Daily operations |
 * | `authentication_session` | Authentication only | Identity verification |
 *
 * @typedef {"single_signature" | "multi_signature" | "signature_session" | "authentication_session"} AuthorizationScope
 */
export type AuthorizationScope = "single_signature" | "multi_signature" | "signature_session" | "authentication_session"
