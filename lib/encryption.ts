/**
 * Criptografia PII (Personally Identifiable Information)
 * Encrypt/Decrypt para CPF, CNS, RG, dados sensíveis
 * Algoritmo: AES-256-GCM (autenticado)
 */

import crypto from "crypto"

const ALGORITHM = "aes-256-gcm"
const IV_LENGTH = 16
const AUTH_TAG_LENGTH = 16
const KEY_LENGTH = 32 // 256 bits

// Validar chave de criptografia
const encryptionKey = process.env.ENCRYPTION_KEY

if (!encryptionKey) {
  console.warn("⚠️  ENCRYPTION_KEY não configurada. Criptografia PII desabilitada.")
  console.warn("   Gere uma chave com: openssl rand -hex 32")
} else if (Buffer.from(encryptionKey, "hex").length !== KEY_LENGTH) {
  throw new Error(`ENCRYPTION_KEY deve ter ${KEY_LENGTH * 2} caracteres hex (32 bytes)`)
}

const key = encryptionKey ? Buffer.from(encryptionKey, "hex") : null

/**
 * Criptografar texto
 * Retorna: iv:authTag:encrypted (hex)
 */
export function encrypt(plaintext: string): string {
  if (!key) {
    throw new Error("ENCRYPTION_KEY não configurada")
  }

  if (!plaintext) return ""

  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

  let encrypted = cipher.update(plaintext, "utf8", "hex")
  encrypted += cipher.final("hex")

  const authTag = cipher.getAuthTag()

  // Formato: iv:authTag:encrypted
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`
}

/**
 * Descriptografar texto
 */
export function decrypt(ciphertext: string): string {
  if (!key) {
    throw new Error("ENCRYPTION_KEY não configurada")
  }

  if (!ciphertext) return ""

  const parts = ciphertext.split(":")

  if (parts.length !== 3) {
    throw new Error("Formato de ciphertext inválido")
  }

  const [ivHex, authTagHex, encrypted] = parts

  const iv = Buffer.from(ivHex, "hex")
  const authTag = Buffer.from(authTagHex, "hex")
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)

  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encrypted, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return decrypted
}

/**
 * Hash one-way (para busca)
 * Usado para indexar CPF/CNS sem armazenar plaintext
 */
export function hashPII(data: string): string {
  return crypto.createHash("sha256").update(data).digest("hex")
}

/**
 * Helpers para campos específicos
 */
export const piiEncryption = {
  encryptCPF: (cpf: string) => encrypt(cpf),
  decryptCPF: (encrypted: string) => decrypt(encrypted),

  encryptCNS: (cns: string) => encrypt(cns),
  decryptCNS: (encrypted: string) => decrypt(encrypted),

  encryptRG: (rg: string) => encrypt(rg),
  decryptRG: (encrypted: string) => decrypt(encrypted),

  encryptPhone: (phone: string) => encrypt(phone),
  decryptPhone: (encrypted: string) => decrypt(encrypted),

  encryptEmail: (email: string) => encrypt(email),
  decryptEmail: (encrypted: string) => decrypt(encrypted),

  // Hash para busca (não reversível)
  hashCPF: (cpf: string) => hashPII(cpf),
  hashCNS: (cns: string) => hashPII(cns),
}

/**
 * Validação de CPF brasileiro
 */
export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "")

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

/**
 * Validação de CNS (Cartão Nacional de Saúde)
 */
export function isValidCNS(cns: string): boolean {
  cns = cns.replace(/\D/g, "")

  if (cns.length !== 15) return false

  let sum = 0
  for (let i = 0; i < 15; i++) {
    sum += parseInt(cns[i]) * (15 - i)
  }

  return sum % 11 === 0
}
