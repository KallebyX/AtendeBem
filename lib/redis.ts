/**
 * Redis Client (Upstash)
 * Usado para cache, sessions, rate limiting, e job queue
 */

import { Redis } from "@upstash/redis"

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  console.warn("⚠️  Redis não configurado. Cache e rate limiting desabilitados.")
}

export const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

/**
 * Cache de queries frequentes (TUSS, CID-10, etc)
 */
export async function getCached<T>(key: string): Promise<T | null> {
  if (!redis) return null
  try {
    const cached = await redis.get<T>(key)
    return cached
  } catch (error) {
    console.error("Redis GET error:", error)
    return null
  }
}

export async function setCached<T>(key: string, value: T, ttl: number = 300): Promise<void> {
  if (!redis) return
  try {
    await redis.setex(key, ttl, value)
  } catch (error) {
    console.error("Redis SET error:", error)
  }
}

export async function deleteCached(key: string): Promise<void> {
  if (!redis) return
  try {
    await redis.del(key)
  } catch (error) {
    console.error("Redis DEL error:", error)
  }
}

/**
 * Cache de refresh tokens
 */
export async function storeRefreshToken(userId: string, token: string, expirySeconds: number = 2592000): Promise<void> {
  if (!redis) throw new Error("Redis not configured")
  await redis.setex(`refresh:${userId}`, expirySeconds, token)
}

export async function getRefreshToken(userId: string): Promise<string | null> {
  if (!redis) throw new Error("Redis not configured")
  return await redis.get(`refresh:${userId}`)
}

export async function deleteRefreshToken(userId: string): Promise<void> {
  if (!redis) throw new Error("Redis not configured")
  await redis.del(`refresh:${userId}`)
}

/**
 * Rate limiting helper
 */
export async function checkRateLimit(identifier: string, limit: number = 10, window: number = 60): Promise<boolean> {
  if (!redis) return true // Allow if Redis not configured

  const key = `ratelimit:${identifier}`
  const current = await redis.incr(key)

  if (current === 1) {
    await redis.expire(key, window)
  }

  return current <= limit
}
