import Privacyverklaring from '@/components/pages/Privacyverklaring'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Privacyverklaring',
  description: 'Privacyverklaring van Fysiotherapie BeYou. Lees hoe wij omgaan met uw persoonsgegevens.',
  path: '/privacyverklaring',
})

export default function PrivacyPage() {
  return <Privacyverklaring />
}
