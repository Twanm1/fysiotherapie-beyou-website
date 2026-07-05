import { GOOGLE_PLACE_ID } from '@/data/google-reviews'

/**
 * Fysiotherapie BeYou — enige toegestane Google 360°-rondleiding.
 * Gekoppeld aan het BeYou Google Business-profiel (Musquetiersingel 8B).
 *
 * Gebruik NOOIT pano CIABIhD6iSw… — dat is de oude Microkracht-tour op 8A.
 */
export const GOOGLE_INTERIOR_PANO_ID = 'CAoSHENJQUJJaEJXVC1hUF9ySkpVWmdTbnhhODRLQlY.'

export const GOOGLE_VIRTUAL_TOUR_LAT = 51.97645799909257
export const GOOGLE_VIRTUAL_TOUR_LNG = 4.315893085413983
export const GOOGLE_VIRTUAL_TOUR_HEADING = 18.781846626089955
export const GOOGLE_VIRTUAL_TOUR_PITCH = 1.0295698302288088
export const GOOGLE_VIRTUAL_TOUR_FOV = 0.7820865974627469

export const GOOGLE_VIRTUAL_TOUR_LOCATION = `${GOOGLE_VIRTUAL_TOUR_LAT},${GOOGLE_VIRTUAL_TOUR_LNG}`

/** Zelfde embed als glischipluiden.nl — alleen BeYou, geen Microkracht. */
export const GOOGLE_VIRTUAL_TOUR_EMBED_URL =
  `https://www.google.com/maps/embed?pb=!4v1779079561580!6m8!1m7!1s${GOOGLE_INTERIOR_PANO_ID}!2m2!1d${GOOGLE_VIRTUAL_TOUR_LAT}!2d${GOOGLE_VIRTUAL_TOUR_LNG}!3f${GOOGLE_VIRTUAL_TOUR_HEADING}!4f${GOOGLE_VIRTUAL_TOUR_PITCH}!5f${GOOGLE_VIRTUAL_TOUR_FOV}`

export const GOOGLE_VIRTUAL_TOUR_VIEW_URL =
  'https://www.google.com/maps/@51.976458,4.315893,3a,75y,18.78h,90t'

/** BeYou-profiel + BeYou-interieurpanorama (geen gedeeld 8A-adres). */
export const GOOGLE_VIRTUAL_TOUR_URL =
  `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}&entry=ttu#` +
  `/data=!3m7!1e1!3m5!1s${GOOGLE_INTERIOR_PANO_ID}!2e10!4m6!3m5!1s${GOOGLE_PLACE_ID}!8m2!3d51.9763654!4d4.3156736!16s%2Fg%2F11xkd6nzy7`
