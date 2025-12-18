import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "@/lib/session"

const publicRoutes = ["/", "/login", "/cadastro"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for session token
  const token = request.cookies.get("session")?.value

  console.log("[v0] Middleware check:", {
    pathname,
    hasToken: !!token,
    tokenLength: token?.length,
  })

  if (!token) {
    console.log("[v0] No token found, redirecting to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify session
  const user = await verifySession(token)

  if (!user) {
    console.log("[v0] Invalid token, redirecting to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  console.log("[v0] Valid session for user:", user.id)
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
