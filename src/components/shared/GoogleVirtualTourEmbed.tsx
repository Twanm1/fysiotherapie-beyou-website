import { GOOGLE_VIRTUAL_TOUR_EMBED_URL } from '@/data/google-maps-tour'

type GoogleVirtualTourEmbedProps = {
  className?: string
  title?: string
}

export default function GoogleVirtualTourEmbed({
  className = '',
  title = 'Google virtuele rondleiding: Fysiotherapie BeYou Schipluiden',
}: GoogleVirtualTourEmbedProps) {
  return (
    <div className={`relative w-full aspect-[4/3] min-h-[300px] sm:min-h-[420px] ${className}`}>
      <iframe
        title={title}
        src={GOOGLE_VIRTUAL_TOUR_EMBED_URL}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
