import ContactForm from '@/components/shared/ContactForm'
import GoogleMapsEmbed from '@/components/shared/GoogleMapsEmbed'
import GoogleVirtualTourEmbed from '@/components/shared/GoogleVirtualTourEmbed'
import { CONTACT } from '@/lib/contact-info'
import { GOOGLE_VIRTUAL_TOUR_VIEW_URL } from '@/data/google-maps-tour'
import { GOOGLE_MAPS_URL } from '@/data/google-reviews'
import { ExternalLink, ScanEye } from 'lucide-react'

export default function Contact() {
  return (
    <>
      <section className="page-hero page-hero--center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-white to-white pointer-events-none" />
        <div className="relative page-container">
          <div className="eyebrow eyebrow--center">
            <span className="eyebrow__dot" />
            <span className="eyebrow__label">Contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Neem contact op
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto text-base leading-relaxed">
            Heb je een vraag, wil je een afspraak maken of meer informatie? Neem gerust contact met ons op. Geen verwijzing nodig.
          </p>
        </div>
      </section>

      <ContactForm formTitle="Stuur ons een bericht" />

      <section className="section-padding bg-white" aria-labelledby="contact-map-heading">
        <div className="page-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Locatie</span>
              </div>
              <h2 id="contact-map-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
                Vind ons op Google Maps
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {CONTACT.address.line}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Route openen
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-gray-300 hidden sm:inline" aria-hidden>
                  |
                </span>
                <a
                  href="#virtuele-rondleiding"
                  className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Virtuele rondleiding
                  <ScanEye className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50/30">
            <GoogleMapsEmbed minHeight={420} />
          </div>

          <section
            id="virtuele-rondleiding"
            className="mt-12 sm:mt-16 scroll-mt-28"
            aria-labelledby="contact-tour-heading"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Rondleiding</span>
                </div>
                <h2 id="contact-tour-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Virtuele rondleiding
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl">
                  Bekijk onze praktijk via de officiële Fysiotherapie BeYou Google 360°-tour.
                  Sleep met de muis of veeg op je telefoon om rond te kijken.
                </p>
              </div>
              <a
                href={GOOGLE_VIRTUAL_TOUR_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
              >
                Tour openen in Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50/30">
              <GoogleVirtualTourEmbed />
            </div>

            <p className="mt-4 text-xs text-gray-500">
              De rondleiding opent in Google Maps onder{' '}
              <span className="font-medium text-gray-700">Fysiotherapie BeYou | Schipluiden</span>.
            </p>
          </section>
        </div>
      </section>
    </>
  )
}
