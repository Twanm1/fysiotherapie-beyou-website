import Disclaimer from '@/components/pages/Disclaimer'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Disclaimer',
  description: 'Disclaimer van Fysiotherapie BeYou in Schipluiden.',
  path: '/disclaimer',
})

export default function DisclaimerPage() {
  return <Disclaimer />
}
