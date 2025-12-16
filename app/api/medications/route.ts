import { NextResponse } from "next/server"
import { medicationsData, searchMedications, getMedicationByName, getMedicationsStats, getMedicationsByCategory } from "@/lib/medications-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const name = searchParams.get("name") || ""
    const category = searchParams.get("category") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const stats = searchParams.get("stats") === "true"

    // Retornar estatísticas
    if (stats) {
      return NextResponse.json({ stats: getMedicationsStats() })
    }

    // Buscar por nome específico
    if (name) {
      const medication = getMedicationByName(name)
      if (medication) {
        return NextResponse.json({ medication })
      }
      return NextResponse.json({ error: "Medicamento não encontrado" }, { status: 404 })
    }

    // Buscar por categoria
    if (category) {
      const results = getMedicationsByCategory(category)
      return NextResponse.json({ 
        medications: results.slice(0, limit),
        total: results.length,
        category
      })
    }

    // Buscar por termo
    if (search && search.length >= 2) {
      const results = searchMedications(search, limit)
      return NextResponse.json({ 
        medications: results,
        total: results.length,
        query: search
      })
    }

    // Retornar primeiros registros se não houver busca
    const firstItems = medicationsData.slice(0, limit)
    return NextResponse.json({ 
      medications: firstItems,
      total: medicationsData.length,
      message: "Use o parâmetro 'search' para buscar medicamentos"
    })
  } catch (error) {
    console.error("[API] Error in medications search:", error)
    return NextResponse.json({ error: "Erro na busca de medicamentos" }, { status: 500 })
  }
}
