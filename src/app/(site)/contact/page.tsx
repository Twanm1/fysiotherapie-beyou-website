import Contact from '@/components/pages/Contact'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Neem contact op met Fysiotherapie BeYou in Schipluiden. Bel, mail of vul het formulier in. Geen verwijzing nodig — we reageren binnen één werkdag.',
  path: '/contact',
  keywords: ['contact fysiotherapie Schipluiden', 'afspraak fysiotherapeut Schipluiden'],
})

export default function ContactPage() {
  return <Contact />
}
