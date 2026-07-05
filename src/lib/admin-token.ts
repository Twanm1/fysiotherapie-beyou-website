/**
 * Edge-compatible HMAC token for admin session cookies.
 */
const MESSAGE = 'beyou-admin-authenticated'

function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function createAdminToken(secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(MESSAGE))
  return bufferToHex(signature)
}

export async function isValidAdminToken(token: string | undefined, secret: string): Promise<boolean> {
  if (!token) return false
  const expected = await createAdminToken(secret)
  return token === expected
}

export function getAdminSecret(): string {
  return process.env.ADMIN_PASSWORD || 'beyou-admin'
}
