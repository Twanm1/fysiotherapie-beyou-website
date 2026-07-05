import { NextResponse } from 'next/server'
import { fetchGoogleReviewsFromPlaces } from '@/lib/google-places'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await fetchGoogleReviewsFromPlaces()
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    },
  })
}
