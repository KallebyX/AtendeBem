import { NextResponse } from "next/server"
import { cid10Codes, searchCID10, findCID10ByCode, cid10Stats, getCID10ByChapter } from "@/lib/cid-complete"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const code = searchParams.get("code") || ""
    const chapter = searchParams.get("chapter") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const stats = searchParams.get("stats") === "true"

    // Retornar estatísticas
    if (stats) {
      return NextResponse.json({ stats: cid10Stats })
    }

    // Buscar por código específico
    if (code) {
      const cid = findCID10ByCode(code)
      if (cid) {
        return NextResponse.json({ cid })
      }
      return NextResponse.json({ error: "CID não encontrado" }, { status: 404 })
    }

    // Buscar por capítulo
    if (chapter) {
      const results = getCID10ByChapter(chapter)
      return NextResponse.json({ 
        cids: results.slice(0, limit),
        total: results.length,
        chapter
      })
    }

    // Buscar por termo
    if (search && search.length >= 2) {
      const results = searchCID10(search, limit)
      return NextResponse.json({ 
        cids: results,
        total: results.length,
        query: search
      })
    }

    // Retornar primeiros registros se não houver busca
    const firstItems = cid10Codes.slice(0, limit)
    return NextResponse.json({ 
      cids: firstItems,
      total: cid10Codes.length,
      message: "Use o parâmetro 'search' para buscar códigos CID"
    })
  } catch (error) {
    console.error("[API] Error in CID search:", error)
    return NextResponse.json({ error: "Erro na busca CID" }, { status: 500 })
  }
}
