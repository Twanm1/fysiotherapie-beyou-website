import Diensten from '@/components/pages/Diensten'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Diensten',
  description:
    'Fysiotherapie, leefstijlcoaching (GLI) en begeleide trainingen bij Fysiotherapie BeYou in Schipluiden. Bekijk ons volledige aanbod.',
  path: '/diensten',
  keywords: ['fysiotherapie Schipluiden', 'leefstijlcoaching', 'trainingen Schipluiden'],
})

export default function DienstenPage() {
  return <Diensten />
}
