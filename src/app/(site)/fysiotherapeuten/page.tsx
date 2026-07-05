import Fysiotherapeuten from '@/components/pages/Fysiotherapeuten'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Fysiotherapeuten',
  description:
    'Maak kennis met het team van Fysiotherapie BeYou in Schipluiden. Gedreven fysiotherapeuten voor persoonlijke, kwalitatieve zorg.',
  path: '/fysiotherapeuten',
  keywords: ['fysiotherapeut Schipluiden', 'team fysiotherapie BeYou'],
})

export default function FysiotherapeutenPage() {
  return <Fysiotherapeuten />
}
