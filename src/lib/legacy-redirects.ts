/** Oude Framer / Vite-paden → huidige Next.js-routes */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/Home': '/',
  '/home': '/',
  '/index': '/',
  '/index.html': '/',
  '/aanmelden': '/contact',
  '/contact-us': '/contact',
  '/privacy': '/privacyverklaring',
  '/privacy-policy': '/privacyverklaring',
  '/veelgestelde-vragen': '/#faq',
  '/faq': '/#faq',
  '/huisartsen': '/diensten/fysiotherapie',
  '/programma': '/diensten/trainingen',
  '/training': '/diensten/trainingen',
  '/WatIsGLI': '/diensten/leefstijlcoaching',
  '/wat-is-gli': '/diensten/leefstijlcoaching',
  '/gli': '/diensten/leefstijlcoaching',
  '/leefstijl': '/diensten/leefstijlcoaching',
  '/fysiotherapie-schipluiden': '/diensten/fysiotherapieschipluiden',
  '/team': '/fysiotherapeuten',
  '/over-ons': '/visie',
  '/about': '/visie',
  '/traject': '/',
  '/afspraak': '/contact',
  '/afspraak-maken': '/contact',
}

export function getLegacyRedirect(pathname: string): string | null {
  if (LEGACY_REDIRECTS[pathname]) return LEGACY_REDIRECTS[pathname]

  const lower = pathname.toLowerCase()
  for (const [from, to] of Object.entries(LEGACY_REDIRECTS)) {
    if (from.toLowerCase() === lower) return to
  }

  return null
}
