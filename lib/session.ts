// JWT implementation using native Web Crypto API (no external dependencies)
const JWT_SECRET = process.env.JWT_SECRET || "atendebem-secret-key-change-in-production"

export interface SessionUser {
  id: string
  email: string
  name: string
  crm: string
  crm_uf: string
  specialty: string
}

// Base64URL encode
function base64UrlEncode(str: string): string {
  const base64 = btoa(str)
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

// Base64URL decode
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/")
  const padding = base64.length % 4
  if (padding) {
    base64 += "=".repeat(4 - padding)
  }
  return atob(base64)
}

// Create HMAC-SHA256 signature
async function createSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(data)

  const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"])

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData)
  const signatureArray = Array.from(new Uint8Array(signature))
  const signatureBase64 = btoa(String.fromCharCode(...signatureArray))
  return signatureBase64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}

// Verify HMAC-SHA256 signature
async function verifySignature(data: string, signature: string, secret: string): Promise<boolean> {
  const expectedSignature = await createSignature(data, secret)
  return signature === expectedSignature
}

// Hash password using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hash
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPassword(password)
  return hash === hashedPassword
}

// Create JWT session token
export async function createSession(user: SessionUser): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    user,
    iat: now,
    exp: now + 7 * 24 * 60 * 60, // 7 days
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`
  const signature = await createSignature(dataToSign, JWT_SECRET)

  return `${dataToSign}.${signature}`
}

// Verify and decode JWT session token
export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      return null
    }

    const [encodedHeader, encodedPayload, signature] = parts
    const dataToVerify = `${encodedHeader}.${encodedPayload}`

    const isValid = await verifySignature(dataToVerify, signature, JWT_SECRET)
    if (!isValid) {
      return null
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload))

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload.user as SessionUser
  } catch (error) {
    return null
  }
}

export const verifyToken = verifySession
