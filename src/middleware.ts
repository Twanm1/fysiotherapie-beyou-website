import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAdminSecret, isValidAdminToken } from '@/lib/admin-token'
import { getLegacyRedirect } from '@/lib/legacy-redirects'

const COOKIE_NAME = 'beyou_admin_session'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const legacyTarget = getLegacyRedirect(pathname)
  if (legacyTarget) {
    return NextResponse.redirect(new URL(legacyTarget, request.url), 308)
  }

  if (pathname.startsWith('/admin/blog') && pathname !== '/admin/blog/login') {
    const token = request.cookies.get(COOKIE_NAME)?.value
    const valid = await isValidAdminToken(token, getAdminSecret())
    if (!valid) {
      const loginUrl = new URL('/admin/blog/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)',
  ],
}
