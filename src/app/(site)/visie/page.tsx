import Visie from '@/components/pages/Visie'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Visie',
  description:
    'Ontdek de visie van Fysiotherapie BeYou: persoonlijke zorg, leefstijl en beweging als basis voor herstel en vitaliteit in Schipluiden.',
  path: '/visie',
})

export default function VisiePage() {
  return <Visie />
}
