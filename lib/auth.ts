import { sql } from "./db"
import { hashPassword, verifyPassword } from "./session"

// Database auth functions only - for server actions
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
