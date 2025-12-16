import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { verifySession } from "@/lib/session"
import { cookies } from "next/headers"

export async function GET(request: Request) {
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
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const activeOnly = searchParams.get("active") !== "false"

    let patients
    if (search) {
      patients = await sql`
        SELECT id, full_name, cpf, date_of_birth, gender, phone, email,
               blood_type, allergies, chronic_conditions, is_active, created_at
        FROM patients
        WHERE user_id = ${session.id}
        AND (is_active = true OR ${!activeOnly})
        AND (full_name ILIKE ${"%" + search + "%"} OR cpf LIKE ${"%" + search + "%"})
        ORDER BY full_name ASC
        LIMIT 50
      `
    } else {
      patients = await sql`
        SELECT id, full_name, cpf, date_of_birth, gender, phone, email,
               blood_type, allergies, chronic_conditions, is_active, created_at
        FROM patients
        WHERE user_id = ${session.id}
        AND (is_active = true OR ${!activeOnly})
        ORDER BY full_name ASC
        LIMIT 100
      `
    }

    return NextResponse.json({ patients })
  } catch (error) {
    console.error("[API] Error fetching patients:", error)
    return NextResponse.json({ error: "Erro ao buscar pacientes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
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

    const userId = session.id
    const data = await request.json()
    const sql = await getDb()

    // Validar campos obrigatórios
    if (!data.fullName || !data.cpf || !data.dateOfBirth) {
      return NextResponse.json(
        { error: "Nome, CPF e data de nascimento são obrigatórios" },
        { status: 400 }
      )
    }

    // Verificar se CPF já existe para este médico
    const existingPatient = await sql`
      SELECT id FROM patients 
      WHERE user_id = ${userId} AND cpf = ${data.cpf}
    `

    if (existingPatient.length > 0) {
      return NextResponse.json(
        { error: "Já existe um paciente cadastrado com este CPF" },
        { status: 400 }
      )
    }

    const result = await sql`
      INSERT INTO patients (
        user_id, full_name, cpf, date_of_birth, gender, phone, email,
        address, city, state, cep, blood_type, allergies, chronic_conditions,
        insurance_provider, insurance_number, emergency_contact_name, 
        emergency_contact_phone, is_active
      ) VALUES (
        ${userId},
        ${data.fullName},
        ${data.cpf},
        ${data.dateOfBirth}::date,
        ${data.gender || null},
        ${data.phone || null},
        ${data.email || null},
        ${data.address || null},
        ${data.city || null},
        ${data.state || null},
        ${data.cep || null},
        ${data.bloodType || null},
        ${data.allergies || null},
        ${data.chronicConditions || null},
        ${data.insuranceProvider || null},
        ${data.insuranceNumber || null},
        ${data.emergencyContactName || null},
        ${data.emergencyContactPhone || null},
        true
      )
      RETURNING *
    `

    return NextResponse.json({ success: true, patient: result[0] })
  } catch (error: any) {
    console.error("[API] Error creating patient:", error)
    return NextResponse.json({ error: "Erro ao cadastrar paciente" }, { status: 500 })
  }
}
