import Fysiotherapie from '@/components/pages/Fysiotherapie'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Fysiotherapie',
  description:
    'Persoonlijke fysiotherapie in Schipluiden en Midden-Delfland. Behandeling van rugklachten, nekklachten en sportblessures bij Fysiotherapie BeYou.',
  path: '/diensten/fysiotherapie',
  keywords: [
    'fysiotherapie Schipluiden',
    'fysiotherapeut Schipluiden',
    'fysiotherapie Midden-Delfland',
    'rugklachten Schipluiden',
    'nekklachten Schipluiden',
    'sportfysiotherapie Schipluiden',
  ],
})

export default function FysiotherapiePage() {
  return <Fysiotherapie />
}
