import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/session"
import { getDb } from "@/lib/db"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const session = await verifyToken(token)
    if (!session) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const db = await getDb()
    const users = await db`
      SELECT id, name, email, crm, crm_uf, specialty, created_at
      FROM users
      WHERE id = ${session.id} AND is_active = true
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error: any) {
    console.error("[API] Error fetching user:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
