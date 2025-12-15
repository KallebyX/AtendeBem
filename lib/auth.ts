import { sql } from "./db"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "atendebem-secret-key-change-in-production")

export interface SessionUser {
  id: string
  email: string
  name: string
  crm: string
  crm_uf: string
  specialty: string
}

// Hash password using Web Crypto API (bcrypt alternative for edge runtime)
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
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  return token
}

// Verify and decode JWT session token
export async function verifySession(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.user as SessionUser
  } catch (error) {
    return null
  }
}

export const verifyToken = verifySession

// Get current user from session
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return null
  }

  return verifySession(token)
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}

// Database auth functions
export const auth = {
  // Register new user
  async register(data: {
    name: string
    email: string
    password: string
    crm: string
    crm_uf: string
    specialty: string
  }) {
    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${data.email.toLowerCase()}
    `

    if (existingUser.length > 0) {
      throw new Error("Email já cadastrado")
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Create user
    const result = await sql`
      INSERT INTO users (
        name, email, password_hash, crm, crm_uf, specialty
      )
      VALUES (
        ${data.name},
        ${data.email.toLowerCase()},
        ${hashedPassword},
        ${data.crm},
        ${data.crm_uf},
        ${data.specialty}
      )
      RETURNING id, name, email, crm, crm_uf, specialty
    `

    return result[0]
  },

  // Login user
  async login(email: string, password: string) {
    // Find user
    const users = await sql`
      SELECT id, name, email, password_hash, crm, crm_uf, specialty 
      FROM users 
      WHERE email = ${email.toLowerCase()} AND is_active = true
    `

    if (users.length === 0) {
      throw new Error("Email ou senha incorretos")
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      throw new Error("Email ou senha incorretos")
    }

    // Update last login
    await sql`
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = ${user.id}
    `

    // Return user without password hash
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      crm: user.crm,
      crm_uf: user.crm_uf,
      specialty: user.specialty,
    }
  },
}
