import { cookies } from "next/headers"
import { verifySession, createSession, type SessionUser } from "./session"

// Re-export for convenience
export { createSession, verifySession, type SessionUser }

// Get current user from session
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    console.log("[v0] getCurrentUser: No session token found")
    return null
  }

  console.log("[v0] getCurrentUser: Token found, verifying...")
  const user = await verifySession(token)
  console.log("[v0] getCurrentUser: Verification result:", user ? "Success" : "Failed")

  return user
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()

  const isProduction = process.env.NODE_ENV === "production"
  const domain = isProduction ? ".atendebem.io" : undefined

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    ...(domain && { domain }),
  }

  cookieStore.set("session", token, cookieOptions)

  console.log("[v0] Cookie set successfully:", {
    tokenLength: token.length,
    ...cookieOptions,
  })

  // Verify cookie was set
  const verification = cookieStore.get("session")
  console.log("[v0] Cookie verification:", verification ? "Cookie confirmed in store" : "Cookie not found in store")
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  console.log("[v0] Session cookie cleared")
}
