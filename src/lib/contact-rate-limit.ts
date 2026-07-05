const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

const hits = new Map<string, { count: number; resetAt: number }>()

export function checkContactRateLimit(key: string): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count += 1
  return { ok: true }
}
