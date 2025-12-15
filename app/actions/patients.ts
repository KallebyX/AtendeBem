"use server"

import { cookies } from "next/headers"
import { verifyToken } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function createPatient(formData: FormData) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const fullName = formData.get("fullName") as string
    const cpf = formData.get("cpf") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const gender = formData.get("gender") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string
    const city = formData.get("city") as string
    const state = formData.get("state") as string
    const cep = formData.get("cep") as string
    const insuranceProvider = formData.get("insuranceProvider") as string
    const insuranceNumber = formData.get("insuranceNumber") as string
    const bloodType = formData.get("bloodType") as string
    const allergies = formData.get("allergies") as string
    const chronicConditions = formData.get("chronicConditions") as string

    const result = await sql`
      INSERT INTO patients (
        user_id, full_name, cpf, date_of_birth, gender, phone, email,
        address, city, state, cep, insurance_provider, insurance_number,
        blood_type, allergies, chronic_conditions
      ) VALUES (
        ${user.id}, ${fullName}, ${cpf}, ${dateOfBirth}, ${gender}, ${phone}, ${email},
        ${address}, ${city}, ${state}, ${cep}, ${insuranceProvider}, ${insuranceNumber},
        ${bloodType}, ${allergies}, ${chronicConditions}
      )
      RETURNING id, full_name, cpf
    `

    return { success: true, patient: result[0] }
  } catch (error: any) {
    console.error("Erro ao criar paciente:", error)
    return { success: false, error: error.message || "Erro ao criar paciente" }
  }
}

export async function getPatients() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const patients = await sql`
      SELECT id, full_name, cpf, date_of_birth, phone, email, insurance_provider
      FROM patients
      WHERE user_id = ${user.id} AND is_active = true
      ORDER BY full_name ASC
    `

    return { success: true, patients }
  } catch (error: any) {
    console.error("Erro ao buscar pacientes:", error)
    return { success: false, error: error.message || "Erro ao buscar pacientes" }
  }
}

export async function searchPatients(query: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return { success: false, error: "Não autenticado" }
    }

    const user = await verifyToken(token)
    if (!user) {
      return { success: false, error: "Token inválido" }
    }

    const patients = await sql`
      SELECT id, full_name, cpf, date_of_birth, phone
      FROM patients
      WHERE user_id = ${user.id} 
        AND is_active = true
        AND (
          full_name ILIKE ${`%${query}%`} OR
          cpf LIKE ${`%${query}%`}
        )
      ORDER BY full_name ASC
      LIMIT 10
    `

    return { success: true, patients }
  } catch (error: any) {
    console.error("Erro ao buscar pacientes:", error)
    return { success: false, error: error.message || "Erro ao buscar pacientes" }
  }
}
