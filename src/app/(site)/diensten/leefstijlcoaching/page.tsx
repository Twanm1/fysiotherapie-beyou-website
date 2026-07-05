import Leefstijlcoaching from '@/components/pages/Leefstijlcoaching'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Leefstijlcoaching',
  description:
    'Leefstijlcoaching en GLI bij Fysiotherapie BeYou in Schipluiden. Duurzame verandering in beweging, voeding, slaap en stress.',
  path: '/diensten/leefstijlcoaching',
  keywords: ['leefstijlcoaching Schipluiden', 'GLI Schipluiden', 'leefstijlcoach'],
})

export default function LeefstijlcoachingPage() {
  return <Leefstijlcoaching />
}
