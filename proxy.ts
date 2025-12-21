import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "@/lib/session"

const publicRoutes = ["/", "/login", "/cadastro"]
const publicPathPrefixes = ["/validar/", "/api/", "/images/", "/_next/", "/favicon"]

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow exact public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Allow public path prefixes
  if (publicPathPrefixes.some((path) => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Check for session token
  const token = request.cookies.get("session")?.value

  if (!token) {
    if (pathname !== "/dashboard") {
      console.log("[MIDDLEWARE] No token, redirecting:", pathname)
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify session
  try {
    const user = await verifySession(token)

    if (!user) {
      console.log("[MIDDLEWARE] Invalid token, clearing and redirecting:", pathname)
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("session")
      return response
    }

    if (pathname === "/dashboard") {
      console.log("[MIDDLEWARE] ✓ Authenticated:", user.email)
    }

    return NextResponse.next()
  } catch (error) {
    console.error("[MIDDLEWARE] Session verification error:", error)
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("session")
    return response
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
}
