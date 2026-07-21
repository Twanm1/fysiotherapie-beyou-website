import Link from 'next/link'
import { PersonStanding, Dumbbell, Heart, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'
import PageHero from '@/components/shared/PageHero'

const services = [
  {
    title: 'Fysiotherapie BeYou',
    description:
      'Behandeling en begeleiding bij lichamelijke klachten, gericht op herstel van beweging, functie en dagelijks welzijn.',
    Icon: PersonStanding,
    link: '/diensten/fysiotherapie',
  },
  {
    title: 'Trainingen BeYou',
    description:
      'Begeleide en laagdrempelige training gericht op het verbeteren van kracht, lenigheid, snelheid en coördinatie, met aandacht voor functionele spierketens.',
    Icon: Dumbbell,
    link: '/diensten/trainingen',
  },
  {
    title: 'Leefstijlcoaching BeYou',
    description:
      'Leefstijlcoaching in de Gecombineerde Leefstijl Interventie (GLI). Je hoeft het niet alleen te doen. Gezonde gewoontes bouw je samen.',
    Icon: Heart,
    link: '/diensten/leefstijlcoaching',
  },
]

export default function Diensten() {
  return (
    <>
      <PageHero
        eyebrow="Diensten"
        title={
          <>
            Onze zorg in
            <br />
            <span className="text-gradient">beweging</span>
          </>
        }
        description="Van fysiotherapie tot leefstijlcoaching. Persoonlijke begeleiding die aansluit bij wie jij bent, wat jij nodig hebt en waar jij naartoe wilt."
        primaryCta={{ label: 'Maak een afspraak', href: '/contact' }}
        secondaryCta={{ label: 'Bekijk ons aanbod', href: '#diensten-aanbod' }}
        highlights={[
          {
            title: 'Integraal zorgaanbod',
            description:
              'Fysiotherapie, training en leefstijl onder één dak. Alles sluit naadloos op elkaar aan.',
          },
          {
            title: 'Direct contact',
            description:
              'Geen verwijzing, geen wachttijd. Bel, app of plan online wanneer het jou uitkomt.',
          },
          {
            title: 'Behandelplan op maat',
            description:
              'Geen standaard protocol. We werken vanuit Positieve Gezondheid, met jouw doelen centraal.',
          },
        ]}
      />

      <section id="diensten-aanbod" className="page-section scroll-mt-24 section-tinted">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.link} className="group block h-full">
                <div className="service-card">
                  <div className="service-card__icon">
                    <service.Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg mb-3">{service.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all duration-200">
                    Ontdek meer{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  )
}
