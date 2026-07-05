'use client'

import { useEffect, useState } from 'react'
import type { GoogleReview } from '@/data/google-reviews'
import { GOOGLE_PLACE_ID, GOOGLE_REVIEWS_FALLBACK } from '@/data/google-reviews'
import { getClientGooglePlacesApiKey } from '@/lib/google-api-keys'
import ReviewCards from '@/components/home/ReviewCards'

const PUBLIC_API_KEY = getClientGooglePlacesApiKey()
const PLACE_QUERY = 'Fysiotherapie BeYou, Burgemeester Musquetiersingel 8A, Schipluiden'
const MAX_REVIEWS = 6
const MAPS_CALLBACK = '__beyouGoogleMapsInit'

type LiveGoogleReviewsProps = {
  onMeta?: (meta: { rating: number | null; reviewCount: number | null }) => void
}

type LegacyReview = {
  author_name?: string
  profile_photo_url?: string
  text?: string
  rating?: number
  relative_time_description?: string
}

type LegacyPlaceResult = {
  rating?: number
  user_ratings_total?: number
  reviews?: LegacyReview[]
}

function isPatientReview(text: string) {
  const lower = text.toLowerCase()
  return !lower.includes('collega fysiotherapeut') && !lower.includes('fijne collega')
}

function mapLegacyReviews(reviews: LegacyReview[] | undefined): GoogleReview[] {
  return (reviews ?? [])
    .filter((review) => review.text && review.author_name)
    .filter((review) => isPatientReview(review.text!))
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, MAX_REVIEWS)
    .map((review) => ({
      name: review.author_name!,
      text: review.text!,
      image: review.profile_photo_url,
      rating: review.rating ?? 5,
      relativeTime: review.relative_time_description,
    }))
}

function hasPlacesService() {
  return Boolean(window.google?.maps?.places?.PlacesService)
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (hasPlacesService()) return Promise.resolve()

  const win = window as Window & { [MAPS_CALLBACK]?: () => void; __beyouMapsLoading?: Promise<void> }
  if (win.__beyouMapsLoading) return win.__beyouMapsLoading

  win.__beyouMapsLoading = new Promise<void>((resolve, reject) => {
    win[MAPS_CALLBACK] = () => {
      delete win[MAPS_CALLBACK]
      if (hasPlacesService()) resolve()
      else reject(new Error('Google Places library niet geladen'))
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&language=nl&region=NL&callback=${MAPS_CALLBACK}`
    script.async = true
    script.onerror = () => reject(new Error('Google Maps laden mislukt'))
    document.head.appendChild(script)
  })

  return win.__beyouMapsLoading
}

function getPlacesService() {
  const google = window.google
  if (!google?.maps?.places?.PlacesService) {
    throw new Error('Google Places library niet geladen')
  }
  return new google.maps.places.PlacesService(document.createElement('div'))
}

function getPlacesStatusOk() {
  const status = window.google?.maps?.places?.PlacesServiceStatus?.OK
  if (!status) throw new Error('Google Places status niet beschikbaar')
  return status
}

function findPlaceId(query: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const service = getPlacesService()
    const ok = getPlacesStatusOk()

    service.findPlaceFromQuery({ query, fields: ['place_id'] }, (results, status) => {
      const placeId = results?.[0]?.place_id
      if (status === ok && placeId) resolve(placeId)
      else reject(new Error(`Place zoeken mislukt (${status})`))
    })
  })
}

function fetchPlaceReviews(placeId: string): Promise<{
  reviews: GoogleReview[]
  rating: number | null
  reviewCount: number | null
}> {
  return new Promise((resolve, reject) => {
    const service = getPlacesService()
    const ok = getPlacesStatusOk()

    service.getDetails(
      { placeId, fields: ['reviews', 'rating', 'user_ratings_total'] },
      (result: LegacyPlaceResult | null, status) => {
        if (status !== ok || !result) {
          reject(new Error(`Google Places: ${status}`))
          return
        }

        const reviews = mapLegacyReviews(result.reviews)
        if (reviews.length === 0) {
          reject(new Error('Geen reviews ontvangen van Google'))
          return
        }

        resolve({
          reviews,
          rating: result.rating ?? null,
          reviewCount: result.user_ratings_total ?? null,
        })
      }
    )
  })
}

async function loadLiveGoogleReviews(apiKey: string): Promise<{
  reviews: GoogleReview[]
  rating: number | null
  reviewCount: number | null
}> {
  await loadGoogleMapsScript(apiKey)

  const candidates = [GOOGLE_PLACE_ID]
  try {
    const searched = await findPlaceId(PLACE_QUERY)
    if (!candidates.includes(searched)) candidates.push(searched)
  } catch {
    // gebruik alleen meegegeven place ID
  }

  let lastError: unknown
  for (const placeId of candidates) {
    try {
      return await fetchPlaceReviews(placeId)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Live Google-reviews laden mislukt')
}

export default function LiveGoogleReviews({ onMeta }: LiveGoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>(GOOGLE_REVIEWS_FALLBACK)

  useEffect(() => {
    let cancelled = false

    async function upgradeToLiveReviews() {
      try {
        const response = await fetch('/api/google-reviews')
        const payload = (await response.json()) as {
          reviews?: GoogleReview[]
          rating?: number | null
          reviewCount?: number | null
          live?: boolean
        }
        if (!cancelled && payload.live && payload.reviews && payload.reviews.length > 0) {
          setReviews(payload.reviews)
          onMeta?.({ rating: payload.rating ?? null, reviewCount: payload.reviewCount ?? null })
          return
        }
      } catch {
        /* probeer browser-API */
      }

      if (PUBLIC_API_KEY) {
        try {
          const result = await loadLiveGoogleReviews(PUBLIC_API_KEY)
          if (!cancelled && result.reviews.length > 0) {
            setReviews(result.reviews)
            onMeta?.({ rating: result.rating, reviewCount: result.reviewCount })
            return
          }
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Live Google reviews (client):', err)
          }
        }
      }

      try {
        const response = await fetch('/api/google-reviews')
        const payload = (await response.json()) as {
          reviews?: GoogleReview[]
          rating?: number | null
          reviewCount?: number | null
        }
        if (!cancelled && payload.reviews && payload.reviews.length > 0) {
          setReviews(payload.reviews)
          onMeta?.({ rating: payload.rating ?? null, reviewCount: payload.reviewCount ?? null })
        }
      } catch {
        // fallback reviews blijven zichtbaar
      }
    }

    upgradeToLiveReviews()

    return () => {
      cancelled = true
    }
  }, [onMeta])

  return <ReviewCards reviews={reviews} />
}
