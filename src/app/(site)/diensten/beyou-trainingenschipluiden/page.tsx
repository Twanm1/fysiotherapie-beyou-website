import Trainingen from '@/components/pages/Trainingen'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'BeYou Trainingen Schipluiden',
  description:
    'Begeleide trainingen bij Fysiotherapie BeYou in Schipluiden. Kleinschalig, persoonlijk en afgestemd op jouw lichaam en doelen.',
  path: '/diensten/beyou-trainingenschipluiden',
  canonicalPath: '/diensten/trainingen',
  keywords: ['trainingen Schipluiden', 'BeYou training', 'begeleid sporten'],
})

export default function TrainingenSchipluidenPage() {
  return <Trainingen />
}
