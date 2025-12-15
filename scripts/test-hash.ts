// Script para testar o hash de senha
async function testPasswordHash() {
  const password = "senha123"

  // Hash SHA-256
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  console.log("[v0] Password:", password)
  console.log("[v0] Generated Hash:", hashHex)
  console.log("[v0] Expected Hash:", "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f")
  console.log("[v0] Match:", hashHex === "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f")
}

testPasswordHash()
