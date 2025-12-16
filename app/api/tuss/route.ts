import { NextResponse } from "next/server"
import { tussProcedures, searchTUSS, findTUSSByCode, tussStats } from "@/lib/tuss-complete"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const code = searchParams.get("code") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const stats = searchParams.get("stats") === "true"

    // Retornar estatísticas
    if (stats) {
      return NextResponse.json({ stats: tussStats })
    }

    // Buscar por código específico
    if (code) {
      const procedure = findTUSSByCode(code)
      if (procedure) {
        return NextResponse.json({ procedure })
      }
      return NextResponse.json({ error: "Procedimento não encontrado" }, { status: 404 })
    }

    // Buscar por termo
    if (search && search.length >= 2) {
      const results = searchTUSS(search, limit)
      return NextResponse.json({ 
        procedures: results,
        total: results.length,
        query: search
      })
    }

    // Retornar primeiros registros se não houver busca
    const firstItems = tussProcedures.slice(0, limit)
    return NextResponse.json({ 
      procedures: firstItems,
      total: tussProcedures.length,
      message: "Use o parâmetro 'search' para buscar procedimentos"
    })
  } catch (error) {
    console.error("[API] Error in TUSS search:", error)
    return NextResponse.json({ error: "Erro na busca TUSS" }, { status: 500 })
  }
}
