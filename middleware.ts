import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rotas públicas que não requerem autenticação
const publicRoutes = [
  "/",
  "/login",
  "/cadastro",
  "/esqueci-senha",
  "/api/auth",
  "/api/setup-db",
  "/_next",
  "/favicon.ico",
]

// Rotas de API que não precisam de verificação no middleware
const apiRoutes = ["/api/"]

// Verificar se a rota é pública
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(route)
  })
}

// Verificar se é uma rota de API
function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api/")
}

// Verificação básica do JWT (apenas verifica estrutura e expiração)
function isValidJWTStructure(token: string): boolean {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      return false
    }

    // Decodificar payload para verificar expiração
    const payloadBase64 = parts[1]
    let base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
    const padding = base64.length % 4
    if (padding) {
      base64 += "=".repeat(4 - padding)
    }

    const payload = JSON.parse(atob(base64))

    // Verificar expiração
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acesso a rotas públicas
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Para rotas de API, deixar o handler da API verificar a autenticação
  if (isApiRoute(pathname)) {
    return NextResponse.next()
  }

  // Verificar se existe cookie de sessão
  const sessionCookie = request.cookies.get("session")

  if (!sessionCookie?.value) {
    // Redirecionar para login se não houver sessão
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verificar se o token tem estrutura válida e não expirou
  if (!isValidJWTStructure(sessionCookie.value)) {
    // Token inválido ou expirado - redirecionar para login
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    loginUrl.searchParams.set("reason", "session_expired")

    // Remover cookie inválido
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete("session")
    return response
  }

  // Sessão válida - permitir acesso
  return NextResponse.next()
}

// Configurar quais rotas o middleware deve interceptar
export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
