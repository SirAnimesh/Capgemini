import { Redis } from "./deps.ts"

const redis = await Redis.connect({
  hostname: Deno.env.get("CACHE_HOST") ?? "localhost",
  port: Deno.env.get("CACHE_PORT") ?? 4000,
  tls: false,
  maxRetryCount: 2
})

export async function ping() {
  await redis.ping()
}

export const fetch = async (key: string) => await redis.get(key)

export const update = async (key: string, value: unknown) => {
  console.log("Saving cache")
  // 60 * 60 * 24 * 7 seconds = 1 week
  await redis.set(key, JSON.stringify(value), { ex: 60 * 60 * 24 * 7 })
}

export const clear = async (key: string) => await redis.del(key)
