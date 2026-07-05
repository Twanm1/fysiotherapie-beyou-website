import Trainingen from '@/components/pages/Trainingen'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Trainingen',
  description:
    'Begeleide trainingen bij Fysiotherapie BeYou in Schipluiden. Kleinschalig, persoonlijk en afgestemd op jouw lichaam en doelen.',
  path: '/diensten/trainingen',
  keywords: ['trainingen Schipluiden', 'begeleid sporten', 'fysiotherapie training'],
})

export default function TrainingenPage() {
  return <Trainingen />
}
