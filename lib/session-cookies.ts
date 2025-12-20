import { cookies } from "next/headers"
import { verifySession, createSession, type SessionUser } from "./session"

// Re-export for convenience
export { createSession, verifySession, type SessionUser }

// Get current user from session
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value

    if (!token) {
      return null
    }

    return await verifySession(token)
  } catch (error) {
    console.error("[SERVER] Error getting current user:", error)
    return null
  }
}

// Set session cookie
export async function setSessionCookie(token: string) {
  try {
    const cookieStore = await cookies()

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days instead of 7
      path: "/",
    })

    console.log("[SERVER] Session cookie set successfully with 30 day expiry")
  } catch (error) {
    console.error("[SERVER] Error setting session cookie:", error)
    throw error
  }
}

// Clear session cookie
export async function clearSessionCookie() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("session")
    console.log("[SERVER] Session cookie cleared")
  } catch (error) {
    console.error("[SERVER] Error clearing session cookie:", error)
  }
}
