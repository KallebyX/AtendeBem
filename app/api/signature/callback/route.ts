import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySession } from "@/lib/session"
import { getDb } from "@/lib/db"

/**
 * GET /api/signature/callback
 * Callback do VIDaaS após autorização do usuário
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state") // prescriptionId
    const error = searchParams.get("error")

    // Se houve erro na autorização
    if (error) {
      const errorDescription = searchParams.get("error_description") || "Autorização negada"
      return NextResponse.redirect(
        new URL(`/receitas/assinar/${state}?error=${encodeURIComponent(errorDescription)}`, request.url)
      )
    }

    // Se não há código, redirecionar com erro
    if (!code) {
      return NextResponse.redirect(
        new URL(`/receitas/assinar/${state}?error=Código de autorização não recebido`, request.url)
      )
    }

    // Redirecionar para página de assinatura com o código
    const redirectUrl = new URL(`/receitas/assinar/${state}`, request.url)
    redirectUrl.searchParams.set("code", code)
    redirectUrl.searchParams.set("authorized", "true")

    return NextResponse.redirect(redirectUrl)
  } catch (error: any) {
    console.error("[API] Signature callback error:", error)
    return NextResponse.redirect(
      new URL(`/receitas?error=${encodeURIComponent(error.message || "Erro no callback")}`, request.url)
    )
  }
}
