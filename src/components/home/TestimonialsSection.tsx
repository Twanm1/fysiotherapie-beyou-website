'use client'

import React, { useCallback, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import GoogleRatingBadge from '@/components/shared/GoogleRatingBadge'
import { GOOGLE_REVIEWS_URL } from '@/data/google-reviews'
import GoogleReviewsWidget from '@/components/home/GoogleReviewsWidget'
import LiveGoogleReviews from '@/components/home/LiveGoogleReviews'

const ELFSIGHT_WIDGET_ID = process.env.NEXT_PUBLIC_ELFSIGHT_REVIEWS_ID?.trim()

export default function TestimonialsSection() {
  const hasWidget = Boolean(ELFSIGHT_WIDGET_ID)
  const [liveRating, setLiveRating] = useState<number | null>(null)
  const displayRating = liveRating ?? undefined

  const handleMeta = useCallback((meta: { rating: number | null }) => {
    if (meta.rating != null) setLiveRating(meta.rating)
  }, [])

  return (
    <section className="section-padding bg-gray-50/60" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Google reviews</span>
            </div>
            <h2
              id="reviews-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            >
              Dit vinden mensen van BeYou
            </h2>
          </div>

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 shadow-sm hover:shadow-md transition-shadow shrink-0 touch-manipulation"
          >
            <GoogleRatingBadge rating={displayRating} size="md" subtitle="op Google" href={null} />
            <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" aria-hidden />
          </a>
        </div>

        {hasWidget ? (
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">
            <GoogleReviewsWidget widgetId={ELFSIGHT_WIDGET_ID!} />
          </div>
        ) : (
          <LiveGoogleReviews onMeta={handleMeta} />
        )}

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Bekijk alle reviews op Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
