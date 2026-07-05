'use client'

import { useState } from 'react'
import type { GoogleReview } from '@/data/google-reviews'
import { getReviewerAvatar } from '@/data/google-reviews'

type ReviewCardsProps = {
  reviews: GoogleReview[]
}

function ReviewAvatar({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false)
  const src = failed || !image ? getReviewerAvatar(name) : image

  return (
    <img
      src={src}
      alt={`Profielfoto van ${name}`}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover shrink-0 bg-gray-100"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}

export default function ReviewCards({ reviews }: ReviewCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <article
          key={`${review.name}-${review.text.slice(0, 24)}`}
          className="rounded-2xl p-6 sm:p-8 bg-white flex flex-col border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex items-center gap-3 mb-4">
            <ReviewAvatar name={review.name} image={review.image} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{review.name}</p>
              {review.relativeTime && (
                <p className="text-xs text-gray-500">{review.relativeTime}</p>
              )}
            </div>
          </div>

          <div className="flex gap-0.5 mb-4" aria-hidden>
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 fill-current ${
                  i < review.rating ? 'text-amber-400' : 'text-gray-200'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="text-sm text-gray-700 leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
        </article>
      ))}
    </div>
  )
}
