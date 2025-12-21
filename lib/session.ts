/**
 * Session Management & Authentication
 * - JWT com Web Crypto API (access tokens)
 * - Argon2id para hashing de senhas
 * - Refresh tokens via Redis
 */

import { storeRefreshToken, getRefreshToken, deleteRefreshToken } from "./redis"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "atendebem-secret-key-change-in-production"
// Aumentado para 7 dias para evitar logouts frequentes (era 15 min)
const ACCESS_TOKEN_EXPIRY = Number.parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY || "604800") // 7 dias
const REFRESH_TOKEN_EXPIRY = Number.parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY || "2592000") // 30 dias

export interface SessionUser {
  id: string
  email: string
  name: string
  crm: string
  crm_uf: string
  specialty: string
  tenant_id?: string // Multi-tenant support
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

/**
 * Hash password com Argon2id (seguro contra rainbow tables)
 * Fallback para SHA-256 se Argon2 não disponível (compatibilidade)
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    // Tentar usar Argon2 (requer dependência @node-rs/argon2)
    const argon2 = await import("@node-rs/argon2").catch(() => null)

    if (argon2) {
      return await argon2.hash(password, {
        memoryCost: 65536, // 64MB
        timeCost: 3,
        parallelism: 4,
        outputLen: 32,
      })
    }
  } catch (error) {
    console.warn("Argon2 não disponível, usando SHA-256 (não recomendado para produção)")
  }

  // Fallback para SHA-256 (compatibilidade com senhas antigas)
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

/**
 * Verificar password (suporta Argon2 e SHA-256 legacy)
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    // Se hash começa com $argon2, usar Argon2
    if (hashedPassword.startsWith("$argon2")) {
      const argon2 = await import("@node-rs/argon2").catch(() => null)
      if (argon2) {
        return await argon2.verify(hashedPassword, password)
      }
    }
  } catch (error) {
    console.error("Erro ao verificar Argon2:", error)
  }

  // Fallback SHA-256 (legacy)
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hash === hashedPassword
}

/**
 * Criar access token JWT (curta duração)
 */
export async function createAccessToken(user: SessionUser): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    user,
    iat: now,
    exp: now + ACCESS_TOKEN_EXPIRY,
    type: "access",
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const dataToSign = `${encodedHeader}.${encodedPayload}`
  const signature = await createSignature(dataToSign, JWT_SECRET)

  return `${dataToSign}.${signature}`
}

/**
 * Criar par de tokens (access + refresh)
 */
export async function createSession(user: SessionUser): Promise<string> {
  const accessToken = await createAccessToken(user)

  // Refresh token: UUID seguro
  const refreshToken = crypto.randomUUID()

  // Armazenar refresh token no Redis
  try {
    await storeRefreshToken(user.id, refreshToken, REFRESH_TOKEN_EXPIRY)
  } catch (error) {
    console.warn("Redis não disponível, refresh token não armazenado:", error)
  }

  return accessToken
}

/**
 * Renovar access token usando refresh token
 */
export async function refreshAccessToken(userId: string, refreshToken: string): Promise<string | null> {
  try {
    const storedToken = await getRefreshToken(userId)

    if (!storedToken || storedToken !== refreshToken) {
      return null
    }

    // Buscar dados do usuário (implementar busca no DB)
    // Por ora, retornamos null - precisa integrar com getDb()
    console.warn("refreshAccessToken: busca de usuário não implementada")
    return null
  } catch (error) {
    console.error("Erro ao renovar token:", error)
    return null
  }
}

/**
 * Revogar refresh token (logout)
 */
export async function revokeRefreshToken(userId: string): Promise<void> {
  try {
    await deleteRefreshToken(userId)
  } catch (error) {
    console.warn("Erro ao revogar refresh token:", error)
  }
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

/**
 * Get authenticated user from cookies
 * Used in server actions and API routes
 */
export async function getUserFromToken(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return null
    }

    return await verifySession(token)
  } catch (error) {
    console.error("[v0] Error getting user from token:", error)
    return null
  }
}

export const getCurrentUser = getUserFromToken
export const verifyToken = verifySession
