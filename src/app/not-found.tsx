import PageNotFound from '@/components/PageNotFound'
import SiteLayout from '@/components/layout/SiteLayout'
import { Providers } from '@/components/providers'

export default function NotFound() {
  return (
    <Providers>
      <SiteLayout>
        <PageNotFound />
      </SiteLayout>
    </Providers>
  )
}
