import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export type PageHeroHighlight = {
  title: string
  description: string
}

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  highlights?: PageHeroHighlight[]
}

export default function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlights,
}: PageHeroProps) {
  const hasHighlights = Boolean(highlights?.length)

  return (
    <section className="page-hero-premium relative overflow-hidden">
      <div className="page-hero-premium__mesh" aria-hidden />
      <div className="page-hero-premium__grid" aria-hidden />

      <div className="relative page-container py-10 sm:py-12 md:py-16 lg:py-20">
        <div
          className={
            hasHighlights
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center'
              : 'max-w-3xl mx-auto text-center'
          }
        >
          <div className={hasHighlights ? 'lg:col-span-7 text-center lg:text-left' : undefined}>
            <div className={`${hasHighlights ? 'flex justify-center lg:justify-start' : 'flex justify-center'} mb-6`}>
              <span className="page-hero-premium__badge">
                <span className="eyebrow__dot" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-700 uppercase">
                  {eyebrow}
                </span>
              </span>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.08] tracking-tight mb-5 sm:mb-6 ${
                hasHighlights ? 'max-w-2xl mx-auto lg:mx-0' : ''
              }`}
            >
              {title}
            </h1>

            <p
              className={`text-base sm:text-lg text-gray-600 leading-relaxed mb-8 sm:mb-10 ${
                hasHighlights ? 'max-w-xl mx-auto lg:mx-0' : 'max-w-2xl mx-auto'
              }`}
            >
              {description}
            </p>

            {(primaryCta || secondaryCta) && (
              <div
                className={`flex flex-col sm:flex-row gap-3 ${
                  hasHighlights ? 'justify-center lg:justify-start' : 'justify-center'
                }`}
              >
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="group inline-flex items-center justify-center gap-2 bg-primary text-white px-7 py-3.5 text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 min-h-11 w-full sm:w-auto touch-manipulation"
                  >
                    {primaryCta.label}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full bg-white/70 backdrop-blur text-gray-900 hover:bg-white transition-all duration-300 min-h-11 w-full sm:w-auto touch-manipulation shadow-sm"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          {hasHighlights && (
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/20 via-blue-100/40 to-transparent blur-2xl opacity-70"
                  aria-hidden
                />
                <div className="relative rounded-[1.75rem] bg-white/65 backdrop-blur-xl shadow-[0_24px_80px_-24px_rgba(69,134,255,0.35)] p-6 sm:p-7 space-y-4">
                  {highlights!.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl bg-white/80 px-4 py-4 sm:px-5 sm:py-5 shadow-sm"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 text-left">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{item.title}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
