import Fysiotherapie from '@/components/pages/Fysiotherapie'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Fysiotherapie Schipluiden',
  description:
    'Persoonlijke fysiotherapie in Schipluiden en Midden-Delfland. Behandeling van rugklachten, nekklachten en sportblessures bij Fysiotherapie BeYou.',
  path: '/diensten/fysiotherapieschipluiden',
  canonicalPath: '/diensten/fysiotherapie',
  keywords: ['fysiotherapie Schipluiden', 'fysiotherapeut Schipluiden', 'fysiotherapie Midden-Delfland'],
})

export default function FysiotherapieSchipluidenPage() {
  return <Fysiotherapie />
}
