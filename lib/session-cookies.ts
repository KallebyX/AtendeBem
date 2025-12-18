import { cookies } from "next/headers"
import { verifySession, createSession, type SessionUser } from "./session"

// Re-export for convenience
export { createSession, verifySession, type SessionUser }

// Get current user from session
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return null
  }

  return verifySession(token)
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()

  const isProduction = process.env.NODE_ENV === "production"

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  console.log("[v0] Cookie set successfully:", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
  })
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
