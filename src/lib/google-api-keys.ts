/**
 * Google Places API keys — zie .env.example voor setup-instructies.
 *
 * Browser (homepage): NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
 * Server (fallback API): GOOGLE_PLACES_API_KEY (aanbevolen, zonder referrer-lock)
 */
export function getClientGooglePlacesApiKey(): string {
  return process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim() ?? ''
}

export function getServerGooglePlacesApiKey(): string {
  return (
    process.env.GOOGLE_PLACES_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim() ||
    ''
  )
}

export function hasGooglePlacesApiKey(): boolean {
  return Boolean(getServerGooglePlacesApiKey() || getClientGooglePlacesApiKey())
}
