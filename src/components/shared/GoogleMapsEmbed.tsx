import { GOOGLE_MAPS_EMBED_URL } from '@/data/google-reviews'

type GoogleMapsEmbedProps = {
  className?: string
  minHeight?: number
}

export default function GoogleMapsEmbed({ className = '', minHeight = 360 }: GoogleMapsEmbedProps) {
  return (
    <iframe
      title="Fysiotherapie BeYou op Google Maps"
      src={GOOGLE_MAPS_EMBED_URL}
      className={`w-full border-0 ${className}`}
      style={{ minHeight }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
