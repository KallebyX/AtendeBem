import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { verifySession } from "@/lib/session"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
    }

    const session = await verifySession(token)
    if (!session) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 })
    }

    const sql = await getDb()

    const patients = await sql`
      SELECT id, full_name, cpf, date_of_birth, gender, phone, email
      FROM patients
      WHERE user_id = ${session.id}
      ORDER BY full_name ASC
    `

    return NextResponse.json({ patients })
  } catch (error) {
    console.error("[v0] Error fetching patients:", error)
    return NextResponse.json({ error: "Erro ao buscar pacientes" }, { status: 500 })
  }
}
