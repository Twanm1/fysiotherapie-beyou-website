export const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=Fysiotherapie+BeYou+%7C+Schipluiden&hl=nl'

export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/?q=place_id:ChIJaVI-Q_e1xUcRY-lMTA9ZRcA&hl=nl'

export const GOOGLE_PLACE_ID = 'ChIJaVI-Q_e1xUcRY-lMTA9ZRcA'

/**
 * Gratis Google Maps iframe — geen API-key nodig (werkt op localhost én productie).
 * Zoekterm met bedrijfsnaam toont label "Fysiotherapie BeYou" op de kaart.
 */
export const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=Fysiotherapie+BeYou+%7C+Schipluiden,+Burgemeester+Musquetiersingel+8A,+2636+GE+Schipluiden&hl=nl&z=16&output=embed'

export const GOOGLE_RATING = 4.9

export type GoogleReview = {
  name: string
  text: string
  image?: string
  rating: number
  relativeTime?: string
}

/** Curated patient reviews — shown when the Google API is unavailable. */
export const GOOGLE_REVIEWS_FALLBACK: GoogleReview[] = [
  {
    name: 'Donna van der Helm',
    text: 'Twan heeft mij uitstekend geholpen met mijn knieklachten. Hij nam de tijd, luisterde goed en gaf gerichte oefeningen die echt effect hadden.',
    image: 'https://framerusercontent.com/images/2FqHJJShwmi2uBzD6juaL95pY.jpg?width=200&height=200',
    rating: 5,
  },
  {
    name: 'Freek van Vliet',
    text: 'Bij Be You kreeg ik de persoonlijke begeleiding die ik nodig had. Dankzij de gerichte behandelingen en duidelijke uitleg ben ik klachtenvrij en durf ik weer volop te bewegen.',
    image: 'https://framerusercontent.com/images/nF1Kv7AMi8Yo1VU868YzmZyE4uY.jpg?width=200&height=200',
    rating: 5,
  },
  {
    name: 'Woodrow Currain',
    text: 'Bedankt voor de duidelijke informatie en het fijne advies over mijn enkelklachten. Ik voelde me goed geholpen en serieus genomen.',
    image: 'https://framerusercontent.com/images/eZA47EJ7TWc4cUX0QmSylsVY31w.jpeg?width=200&height=200',
    rating: 5,
  },
  {
    name: 'Gil Amsalam',
    text: 'Ik heb een prettige behandeling gehad bij Twan, die na één sessie voorstelde om samen met een collega naar mijn klachten te kijken. Dat gaf mij het gevoel dat er echt aandacht was voor mijn situatie.',
    image: 'https://framerusercontent.com/images/5U69mRhqxWCtgIDyZCAWa3WM0E.png?width=200&height=200',
    rating: 5,
  },
  {
    name: 'Dean Rideway',
    text: 'Ik kon snel terecht voor een afspraak en kreeg een duidelijke uitleg. Een fijne en toegankelijke praktijk waar je je direct op je gemak voelt.',
    image: 'https://framerusercontent.com/images/iXhy6mLFN9VnpJ9QO7Qcsg87CE.png?width=200&height=200',
    rating: 5,
  },
]

export type GoogleReviewsPayload = {
  configured: boolean
  /** true wanneer reviews live van Google komen (niet de fallback-lijst) */
  live: boolean
  rating: number | null
  reviewCount: number | null
  googleMapsUri: string | null
  reviews: GoogleReview[]
  error?: string
}

export function getReviewerAvatar(name: string, image?: string) {
  if (image) return image
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=E8F0FF&color=4586FF&size=72&bold=true`
}

export function formatGoogleRating(rating: number | null | undefined) {
  if (rating == null) return null
  return rating.toFixed(1).replace('.', ',')
}
