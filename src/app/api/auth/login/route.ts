import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, setAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const { password } = (await request.json()) as { password?: string }

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: 'Ongeldig wachtwoord' }, { status: 401 })
  }

  await setAdminSession()
  return NextResponse.json({ success: true })
}
