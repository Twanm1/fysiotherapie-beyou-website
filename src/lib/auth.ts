import { cookies } from 'next/headers'
import { createAdminToken, getAdminSecret, isValidAdminToken } from '@/lib/admin-token'

const COOKIE_NAME = 'beyou_admin_session'

export async function setAdminSession(): Promise<void> {
  const token = await createAdminToken(getAdminSecret())
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  return isValidAdminToken(token, getAdminSecret())
}

export function verifyPassword(password: string): boolean {
  return password === getAdminSecret()
}
