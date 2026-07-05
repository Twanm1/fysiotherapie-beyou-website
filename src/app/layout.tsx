import type { Metadata, Viewport } from 'next'
import ClientToaster from '@/components/shared/ClientToaster'
import JsonLd from '@/components/JsonLd'
import { medicalBusinessJsonLd } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Fysiotherapie BeYou | Fysiotherapie, Leefstijlcoaching & Trainingen in Schipluiden',
    template: '%s | Fysiotherapie BeYou',
  },
  description:
    'Fysiotherapie BeYou in Schipluiden biedt persoonlijke fysiotherapie, leefstijlcoaching (GLI) en begeleide trainingen. Wat beweegt jou? Maak een afspraak.',
  keywords: [
    'fysiotherapie Schipluiden',
    'fysiotherapeut Schipluiden',
    'fysiotherapie Midden-Delfland',
    'fysiotherapie Delft',
    'sportfysiotherapie Schipluiden',
    'leefstijlcoaching',
    'GLI',
    'trainingen',
    'BeYou',
  ],
  icons: {
    icon: '/images/hero-team.png',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#4586FF',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd data={medicalBusinessJsonLd} />
        {children}
        <ClientToaster />
      </body>
    </html>
  )
}
