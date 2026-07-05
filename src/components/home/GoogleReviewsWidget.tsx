'use client'

import Script from 'next/script'

type GoogleReviewsWidgetProps = {
  widgetId: string
}

/** Live Google-reviews via Elfsight (gratis, geen Google Cloud API nodig). */
export default function GoogleReviewsWidget({ widgetId }: GoogleReviewsWidgetProps) {
  return (
    <>
      <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />
    </>
  )
}
