import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from '@/data/google-reviews'

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

type GoogleRatingBadgeProps = {
  rating?: number
  size?: 'sm' | 'md'
  subtitle?: string
  href?: string | null
  className?: string
}

function formatRating(rating: number) {
  return rating.toFixed(1).replace('.', ',')
}

function StarRow({ starClass }: { starClass: string }) {
  return (
    <div className="flex items-center gap-px shrink-0" aria-hidden>
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${starClass} text-amber-400 fill-current block`} viewBox="0 0 20 20">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  )
}

export default function GoogleRatingBadge({
  rating = GOOGLE_RATING,
  size = 'sm',
  subtitle = 'Google reviews',
  href = GOOGLE_REVIEWS_URL,
  className = '',
}: GoogleRatingBadgeProps) {
  const starClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  const scoreClass = size === 'sm' ? 'text-sm' : 'text-lg'

  const content = (
    <>
      <StarRow starClass={starClass} />
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <span className={`${scoreClass} font-bold text-gray-900 leading-none tabular-nums tracking-tight`}>
          {formatRating(rating)}
        </span>
        <span className="text-[11px] text-gray-500 leading-none whitespace-nowrap">{subtitle}</span>
      </div>
    </>
  )

  const layoutClass = `inline-flex items-center gap-2.5 ${className}`.trim()

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${layoutClass} hover:opacity-80 transition-opacity`}
      >
        {content}
      </a>
    )
  }

  return <div className={layoutClass}>{content}</div>
}
