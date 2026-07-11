import Link from 'next/link'
import { Mail } from 'lucide-react'
import { CONTACT } from '@/lib/contact-info'

export default function Klachtenregeling() {


  return (
    <div className="pb-16 bg-white">
      <div className="page-container max-w-3xl">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 block">
          ← Terug naar home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-sm font-medium text-gray-600">Juridisch</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Klachtenregeling</h1>
          <p className="text-sm text-gray-500">Fysiotherapie Be You · Schipluiden</p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="border-b border-gray-100 pb-8">
            <p className="text-sm text-gray-700 leading-relaxed">
              Bij Fysiotherapie Be You doen we ons uiterste best om jouw behandeling zo prettig en professioneel mogelijk te laten verlopen. We hechten veel waarde aan kwaliteit, persoonlijke aandacht en respect voor jouw privacy.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mt-4">
              Toch kan het gebeuren dat je ergens niet tevreden over bent. In dat geval nodigen we je van harte uit om dit met ons te bespreken. We staan altijd open voor feedback en zoeken graag samen naar een passende oplossing.
            </p>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Stap 1 – Neem contact met ons op</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Je kunt ons persoonlijk aanspreken, bellen of een e-mail sturen naar:
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="w-4 h-4" />
              {CONTACT.email}
            </a>
          </div>

          <div className="pb-8">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Stap 2 – Onafhankelijke klachtencommissie</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Komen we er samen niet uit? Dan kun je terecht bij de onafhankelijke klachtencommissie van het{' '}
              <strong className="font-semibold text-gray-900">Koninklijk Nederlands Genootschap voor Fysiotherapie (KNGF)</strong>.
              Zij helpen je verder met een zorgvuldige en objectieve behandeling van je klacht.
            </p>
          </div>
        </div>

        {/* Contact nudge */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700">
            Vragen? Neem gerust contact op via{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-primary font-medium hover:underline">
              {CONTACT.email}
            </a>{' '}
            of bel{' '}
            <a href={`tel:${CONTACT.whatsapp.tel}`} className="text-primary font-medium hover:underline">
              {CONTACT.whatsapp.display} {CONTACT.whatsapp.recommendedLabel}
            </a>{' '}
            (WhatsApp) of{' '}
            <a href={`tel:${CONTACT.practicePhone.tel}`} className="text-primary font-medium hover:underline">
              {CONTACT.practicePhone.display}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}