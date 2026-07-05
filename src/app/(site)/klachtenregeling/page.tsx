import Klachtenregeling from '@/components/pages/Klachtenregeling'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Klachtenregeling',
  description: 'Klachtenregeling van Fysiotherapie BeYou. Lees hoe u een klacht kunt indienen.',
  path: '/klachtenregeling',
})

export default function KlachtenPage() {
  return <Klachtenregeling />
}
