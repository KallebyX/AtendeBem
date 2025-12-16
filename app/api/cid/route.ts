import { NextResponse } from "next/server"
import { cidData, searchCID, getCIDByCode, getCIDStats, getCIDByCategory } from "@/lib/cid-complete"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const code = searchParams.get("code") || ""
    const category = searchParams.get("category") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const stats = searchParams.get("stats") === "true"

    // Retornar estatísticas
    if (stats) {
      return NextResponse.json({ stats: getCIDStats() })
    }

    // Buscar por código específico
    if (code) {
      const cid = getCIDByCode(code)
      if (cid) {
        return NextResponse.json({ cid })
      }
      return NextResponse.json({ error: "CID não encontrado" }, { status: 404 })
    }

    // Buscar por categoria
    if (category) {
      const results = getCIDByCategory(category)
      return NextResponse.json({ 
        cids: results.slice(0, limit),
        total: results.length,
        category
      })
    }

    // Buscar por termo
    if (search && search.length >= 2) {
      const results = searchCID(search, limit)
      return NextResponse.json({ 
        cids: results,
        total: results.length,
        query: search
      })
    }

    // Retornar primeiros registros se não houver busca
    const firstItems = cidData.slice(0, limit)
    return NextResponse.json({ 
      cids: firstItems,
      total: cidData.length,
      message: "Use o parâmetro 'search' para buscar códigos CID"
    })
  } catch (error) {
    console.error("[API] Error in CID search:", error)
    return NextResponse.json({ error: "Erro na busca CID" }, { status: 500 })
  }
}
