import type { GoogleReview, GoogleReviewsPayload } from '@/data/google-reviews'
import { GOOGLE_MAPS_URL, GOOGLE_PLACE_ID, GOOGLE_RATING, GOOGLE_REVIEWS_FALLBACK } from '@/data/google-reviews'
import { getServerGooglePlacesApiKey } from '@/lib/google-api-keys'

const PLACE_QUERY = 'Fysiotherapie BeYou, Burgemeester Musquetiersingel 8A, Schipluiden'
const SITE_ORIGIN = (process.env.SITE_URL ?? 'https://www.fysiotherapiebeyou.nl').replace(/\/$/, '')

function googleRequestHeaders(apiKey: string, extra?: Record<string, string>) {
  return {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': apiKey,
    'Accept-Language': 'nl',
    Referer: `${SITE_ORIGIN}/`,
    Origin: SITE_ORIGIN,
    ...(extra ?? {}),
  }
}

function legacyRequestHeaders() {
  return {
    Referer: `${SITE_ORIGIN}/`,
    Origin: SITE_ORIGIN,
  }
}

type PlacesReview = {
  rating?: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
  authorAttribution?: {
    displayName?: string
    photoUri?: string
  }
}

type PlaceDetails = {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: PlacesReview[]
}

type TextSearchResponse = {
  places?: Array<{ id?: string }>
}

type LegacyFindPlaceResponse = {
  status?: string
  candidates?: Array<{ place_id?: string }>
  error_message?: string
}

type LegacyReview = {
  author_name?: string
  profile_photo_url?: string
  rating?: number
  text?: string
  relative_time_description?: string
}

type LegacyDetailsResponse = {
  status?: string
  result?: {
    name?: string
    rating?: number
    user_ratings_total?: number
    url?: string
    reviews?: LegacyReview[]
  }
  error_message?: string
}

async function placesFetch<T>(path: string, apiKey: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`https://places.googleapis.com/v1/${path}`, {
    ...init,
    headers: googleRequestHeaders(apiKey, init?.headers as Record<string, string> | undefined),
    next: { revalidate: 60 * 60 * 6 },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Google Places API (New) ${response.status}: ${body.slice(0, 200)}`)
  }

  return response.json() as Promise<T>
}

function isPatientReview(text: string) {
  const lower = text.toLowerCase()
  return !lower.includes('collega fysiotherapeut') && !lower.includes('fijne collega')
}

function mapNewReviews(reviews: PlacesReview[] | undefined): GoogleReview[] {
  return (reviews ?? [])
    .filter((review) => review.text?.text && review.authorAttribution?.displayName)
    .filter((review) => isPatientReview(review.text!.text!))
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6)
    .map((review) => ({
      name: review.authorAttribution!.displayName!,
      text: review.text!.text!,
      image: review.authorAttribution?.photoUri,
      rating: review.rating ?? 5,
      relativeTime: review.relativePublishTimeDescription,
    }))
}

function mapLegacyReviews(reviews: LegacyReview[] | undefined): GoogleReview[] {
  return (reviews ?? [])
    .filter((review) => review.text && review.author_name)
    .filter((review) => isPatientReview(review.text!))
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6)
    .map((review) => ({
      name: review.author_name!,
      text: review.text!,
      image: review.profile_photo_url,
      rating: review.rating ?? 5,
      relativeTime: review.relative_time_description,
    }))
}

async function fetchFromPlacesApiNew(apiKey: string, placeId?: string): Promise<GoogleReviewsPayload> {
  let resolvedPlaceId = placeId
  if (!resolvedPlaceId) {
    const search = await placesFetch<TextSearchResponse>('places:searchText', apiKey, {
      method: 'POST',
      headers: { 'X-Goog-FieldMask': 'places.id' },
      body: JSON.stringify({
        textQuery: PLACE_QUERY,
        languageCode: 'nl',
        regionCode: 'NL',
        maxResultCount: 1,
      }),
    })
    resolvedPlaceId = search.places?.[0]?.id
    if (!resolvedPlaceId) throw new Error('Geen Google Place ID gevonden (New API)')
  }

  const details = await placesFetch<PlaceDetails>(
    `places/${encodeURIComponent(resolvedPlaceId)}?languageCode=nl`,
    apiKey,
    {
      headers: {
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri,displayName',
      },
    }
  )

  return {
    configured: true,
    live: mapNewReviews(details.reviews).length > 0,
    rating: details.rating ?? null,
    reviewCount: details.userRatingCount ?? null,
    googleMapsUri: details.googleMapsUri ?? GOOGLE_MAPS_URL,
    reviews: mapNewReviews(details.reviews),
  }
}

async function fetchFromLegacyPlacesApi(apiKey: string, placeId?: string): Promise<GoogleReviewsPayload> {
  let resolvedPlaceId = placeId

  if (!resolvedPlaceId) {
    const findUrl = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json')
    findUrl.searchParams.set('input', PLACE_QUERY)
    findUrl.searchParams.set('inputtype', 'textquery')
    findUrl.searchParams.set('fields', 'place_id')
    findUrl.searchParams.set('key', apiKey)

    const findResponse = await fetch(findUrl, {
      headers: legacyRequestHeaders(),
      next: { revalidate: 60 * 60 * 6 },
    })
    const findData = (await findResponse.json()) as LegacyFindPlaceResponse

    if (findData.status !== 'OK' || !findData.candidates?.[0]?.place_id) {
      throw new Error(
        findData.error_message ??
          `Legacy Find Place mislukt (${findData.status ?? 'unknown status'})`
      )
    }

    resolvedPlaceId = findData.candidates[0].place_id
  }

  const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  detailsUrl.searchParams.set('place_id', resolvedPlaceId)
  detailsUrl.searchParams.set(
    'fields',
    'name,rating,user_ratings_total,reviews,url'
  )
  detailsUrl.searchParams.set('language', 'nl')
  detailsUrl.searchParams.set('key', apiKey)

  const detailsResponse = await fetch(detailsUrl, {
    headers: legacyRequestHeaders(),
    next: { revalidate: 60 * 60 * 6 },
  })
  const detailsData = (await detailsResponse.json()) as LegacyDetailsResponse

  if (detailsData.status !== 'OK' || !detailsData.result) {
    throw new Error(
      detailsData.error_message ??
        `Legacy Place Details mislukt (${detailsData.status ?? 'unknown status'})`
    )
  }

  return {
    configured: true,
    live: mapLegacyReviews(detailsData.result.reviews).length > 0,
    rating: detailsData.result.rating ?? null,
    reviewCount: detailsData.result.user_ratings_total ?? null,
    googleMapsUri: detailsData.result.url ?? GOOGLE_MAPS_URL,
    reviews: mapLegacyReviews(detailsData.result.reviews),
  }
}

export async function fetchGoogleReviewsFromPlaces(): Promise<GoogleReviewsPayload> {
  const apiKey = getServerGooglePlacesApiKey()
  const placeId = process.env.GOOGLE_PLACE_ID?.trim() || GOOGLE_PLACE_ID

  if (!apiKey) {
    return {
      configured: false,
      live: false,
      rating: GOOGLE_RATING,
      reviewCount: null,
      googleMapsUri: GOOGLE_MAPS_URL,
      reviews: GOOGLE_REVIEWS_FALLBACK,
      error: 'Geen API-key: zet GOOGLE_PLACES_API_KEY of NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in .env.local',
    }
  }

  try {
    const payload = await fetchFromPlacesApiNew(apiKey, placeId)
    if (payload.reviews.length === 0) {
      return { ...payload, reviews: GOOGLE_REVIEWS_FALLBACK, rating: payload.rating ?? GOOGLE_RATING, live: false }
    }
    return payload
  } catch (newApiError) {
    try {
      const payload = await fetchFromLegacyPlacesApi(apiKey, placeId)
      if (payload.reviews.length === 0) {
        return { ...payload, reviews: GOOGLE_REVIEWS_FALLBACK, rating: payload.rating ?? GOOGLE_RATING, live: false }
      }
      return payload
    } catch (legacyError) {
      const newMessage = newApiError instanceof Error ? newApiError.message : 'New API mislukt'
      const legacyMessage =
        legacyError instanceof Error ? legacyError.message : 'Legacy API mislukt'

      return {
        configured: true,
        live: false,
        rating: GOOGLE_RATING,
        reviewCount: null,
        googleMapsUri: GOOGLE_MAPS_URL,
        reviews: GOOGLE_REVIEWS_FALLBACK,
        error: `${newMessage} | ${legacyMessage}`,
      }
    }
  }
}
