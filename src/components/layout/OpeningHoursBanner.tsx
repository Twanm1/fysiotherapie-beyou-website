'use client'

import { useEffect, useState } from 'react'
import { isPracticeOpen } from '@/lib/opening-hours'
import { useMounted } from '@/lib/use-mounted'

export default function OpeningHoursBanner() {
  const mounted = useMounted()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkOpenStatus = () => setIsOpen(isPracticeOpen())
    checkOpenStatus()
    const interval = setInterval(checkOpenStatus, 60_000)
    return () => clearInterval(interval)
  }, [])

  const openStatusLabel = !mounted
    ? 'Openingstijden'
    : isOpen
      ? 'Op dit moment geopend'
      : 'Op dit moment gesloten'

  const statusDotClass = !mounted
    ? 'bg-gray-300'
    : isOpen
      ? 'bg-primary shadow-sm'
      : 'bg-red-500 shadow-sm'

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-50/30 border-t border-blue-200/40 py-2.5 sm:py-3">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-2.5" suppressHydrationWarning>
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${statusDotClass}`}
            aria-hidden
            suppressHydrationWarning
          />
          <span className="text-xs sm:text-sm text-blue-700 font-medium leading-snug max-w-xl" suppressHydrationWarning>
            <span className="block sm:inline">Ma-Vr 08:00-18:00 · Za 10:00-11:30</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline font-semibold">{openStatusLabel}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
