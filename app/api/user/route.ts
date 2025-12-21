import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/session"
import { getDb } from "@/lib/db"

export async function GET() {
  try {
    console.log("[API] GET /api/user - Starting user fetch")

    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      console.log("[API] GET /api/user - No session token found")
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    console.log("[API] GET /api/user - Token found, verifying...")
    const session = await verifyToken(token)

    if (!session) {
      console.log("[API] GET /api/user - Token verification failed")
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    console.log("[API] GET /api/user - Token verified for user:", session.id)

    const db = await getDb()
    const users = await db`
      SELECT id, name, email, crm, crm_uf, specialty, created_at
      FROM users
      WHERE id = ${session.id} AND is_active = true
    `

    if (users.length === 0) {
      console.log("[API] GET /api/user - User not found in database:", session.id)
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    console.log("[API] GET /api/user - Success for user:", users[0].email)
    return NextResponse.json({ user: users[0] })
  } catch (error: any) {
    console.error("[API] GET /api/user - Error:", error)
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 })
  }
}
