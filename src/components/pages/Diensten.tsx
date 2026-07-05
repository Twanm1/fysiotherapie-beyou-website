import Link from 'next/link'
import { PersonStanding, Dumbbell, Heart, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'

const services = [
  {
    title: 'Fysiotherapie BeYou',
    description: 'Behandeling en begeleiding bij lichamelijke klachten, gericht op herstel van beweging, functie en dagelijks welzijn.',
    Icon: PersonStanding,
    link: '/diensten/fysiotherapie',
  },
  {
    title: 'Trainingen BeYou',
    description: 'Begeleide en laagdrempelige training gericht op het verbeteren van kracht, lenigheid, snelheid en coördinatie, met aandacht voor functionele spierketens.',
    Icon: Dumbbell,
    link: '/diensten/trainingen',
  },
  {
    title: 'Leefstijlcoaching BeYou',
    description: 'Leefstijlcoaching in de Gecombineerde Leefstijl Interventie (GLI). Je hoeft het niet alleen te doen. Gezonde gewoontes bouw je samen.',
    Icon: Heart,
    link: '/diensten/leefstijlcoaching',
  },
];

export default function Diensten() {


  return (
    <>
      <section className="page-hero page-hero--center relative">
        <div className="page-hero__bg" />
        <div className="relative page-container">
          <div className="eyebrow eyebrow--center">
            <span className="eyebrow__dot" />
            <span className="eyebrow__label">Diensten</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
            Onze zorg in beweging
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
            Van fysiotherapie tot leefstijlcoaching. Persoonlijke begeleiding die aansluit bij wie jij bent en wat jij nodig hebt.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-7 py-3.5 text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg inline-block"
          >
            Maak een afspraak
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.link} className="group block">
                <div className="rounded-2xl p-6 sm:p-8 bg-white border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-primary/8 flex items-center justify-center mb-6 transition-all duration-300">
                    <service.Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-semibold text-gray-900 text-lg mb-3">{service.title}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{service.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200">
                    Ontdek meer <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}