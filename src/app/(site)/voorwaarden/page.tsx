import Voorwaarden from '@/components/pages/Voorwaarden'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Algemene voorwaarden',
  description: 'Algemene voorwaarden van Fysiotherapie BeYou in Schipluiden.',
  path: '/voorwaarden',
})

export default function VoorwaardenPage() {
  return <Voorwaarden />
}
