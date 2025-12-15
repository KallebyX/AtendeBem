"use server"

import { auth } from "@/lib/auth"
import { createSession, setSessionCookie, clearSessionCookie, verifySession } from "@/lib/session"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { sql } from "@/lib/db"

export async function registerAction(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      crm: formData.get("crm") as string,
      crm_uf: formData.get("uf") as string, // Changed from uf to crm_uf to match database schema
      specialty: formData.get("specialty") as string,
    }

    // Validate data
    if (!data.name || !data.email || !data.password || !data.crm || !data.crm_uf || !data.specialty) {
      return { error: "Todos os campos são obrigatórios" }
    }

    if (data.password.length < 6) {
      return { error: "A senha deve ter no mínimo 6 caracteres" }
    }

    // Register user
    const user = await auth.register(data)

    // Create session
    const token = await createSession(user)
    await setSessionCookie(token)

    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Erro ao criar conta" }
  }
}

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validate data
    if (!email || !password) {
      return { error: "Email e senha são obrigatórios" }
    }

    // Login user
    const user = await auth.login(email, password)

    // Create session
    const token = await createSession(user)
    await setSessionCookie(token)

    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Erro ao fazer login" }
  }
}

export async function logoutAction() {
  await clearSessionCookie()
  redirect("/login")
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    const users = await sql`
      SELECT id, name, email, crm, crm_uf, specialty
      FROM users
      WHERE id = ${session.id}
    `

    if (users.length === 0) {
      return { success: false, error: "Usuário não encontrado" }
    }

    return { success: true, user: users[0] }
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error)
    return { success: false, error: error.message }
  }
}

export async function updateUserProfile(data: {
  name: string
  crm: string
  crm_uf: string
  specialty: string
  email: string
}) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    // Validate data
    if (!data.name || !data.crm || !data.crm_uf || !data.specialty || !data.email) {
      return { success: false, error: "Todos os campos são obrigatórios" }
    }

    // Check if email is already in use by another user
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${data.email} AND id != ${session.id}
    `

    if (existingUser.length > 0) {
      return { success: false, error: "Este email já está em uso" }
    }

    await sql`
      UPDATE users
      SET 
        name = ${data.name},
        crm = ${data.crm},
        crm_uf = ${data.crm_uf},
        specialty = ${data.specialty},
        email = ${data.email},
        updated_at = NOW()
      WHERE id = ${session.id}
    `

    return { success: true }
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error)
    return { success: false, error: error.message }
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const session = await verifySession(token)
    if (!session) {
      return { success: false, error: "Sessão inválida" }
    }

    // Validate new password
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: "A nova senha deve ter pelo menos 8 caracteres" }
    }

    // Get current user with password hash
    const users = await sql`
      SELECT id, password_hash FROM users WHERE id = ${session.id}
    `

    if (users.length === 0) {
      return { success: false, error: "Usuário não encontrado" }
    }

    // Verify current password using SHA-256
    const encoder = new TextEncoder()
    const data = encoder.encode(currentPassword)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const currentHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    if (currentHash !== users[0].password_hash) {
      return { success: false, error: "Senha atual incorreta" }
    }

    // Hash new password
    const newData = encoder.encode(newPassword)
    const newHashBuffer = await crypto.subtle.digest("SHA-256", newData)
    const newHashArray = Array.from(new Uint8Array(newHashBuffer))
    const newHash = newHashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

    // Update password
    await sql`
      UPDATE users
      SET password_hash = ${newHash}, updated_at = NOW()
      WHERE id = ${session.id}
    `

    return { success: true }
  } catch (error: any) {
    console.error("Erro ao alterar senha:", error)
    return { success: false, error: error.message }
  }
}
