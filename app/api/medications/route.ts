import { NextResponse } from "next/server"
import { MEDICATIONS_DATABASE, searchMedications, getMedicationsByForm, medicationsStats } from "@/lib/medications-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const form = searchParams.get("form") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const stats = searchParams.get("stats") === "true"

    // Retornar estatísticas
    if (stats) {
      return NextResponse.json({ stats: medicationsStats })
    }

    // Buscar por forma farmacêutica
    if (form) {
      const results = getMedicationsByForm(form)
      return NextResponse.json({ 
        medications: results.slice(0, limit),
        total: results.length,
        form
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
    const firstItems = MEDICATIONS_DATABASE.slice(0, limit)
    return NextResponse.json({ 
      medications: firstItems,
      total: MEDICATIONS_DATABASE.length,
      message: "Use o parâmetro 'search' para buscar medicamentos"
    })
  } catch (error) {
    console.error("[API] Error in medications search:", error)
    return NextResponse.json({ error: "Erro na busca de medicamentos" }, { status: 500 })
  }
}
