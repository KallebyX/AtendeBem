"use server"

import { auth, createSession, setSessionCookie, clearSessionCookie } from "@/lib/auth"
import { redirect } from "next/navigation"

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
