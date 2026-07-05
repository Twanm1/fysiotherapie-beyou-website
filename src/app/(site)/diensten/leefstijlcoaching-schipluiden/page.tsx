import Leefstijlcoaching from '@/components/pages/Leefstijlcoaching'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Leefstijlcoaching Schipluiden',
  description:
    'Leefstijlcoaching en GLI bij Fysiotherapie BeYou in Schipluiden. Duurzame verandering in beweging, voeding, slaap en stress.',
  path: '/diensten/leefstijlcoaching-schipluiden',
  canonicalPath: '/diensten/leefstijlcoaching',
  keywords: ['leefstijlcoaching Schipluiden', 'GLI Schipluiden'],
})

export default function LeefstijlcoachingSchipluidenPage() {
  return <Leefstijlcoaching />
}
