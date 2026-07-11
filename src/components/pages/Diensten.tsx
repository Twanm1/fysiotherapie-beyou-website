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

      <section id="diensten-aanbod" className="page-section scroll-mt-24">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.link} className="group block">
                <div className="rounded-2xl p-6 sm:p-8 bg-white border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-primary/8 flex items-center justify-center mb-6 transition-all duration-300">
                    <service.Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg mb-3">{service.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200">
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
