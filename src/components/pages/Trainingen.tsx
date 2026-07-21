import Link from 'next/link'
import ContactForm from '@/components/shared/ContactForm'
import ContactDetails from '@/components/shared/ContactDetails'

const programmas = [
  {
    title: 'BeYou Persoonlijke Training',
    description: 'Persoonlijke doelen nastreven via een op maat gemaakt trainingsschema.',
  },
  {
    title: 'BeYou Ketentraining',
    description: 'Alle facetten van bewegen in één training, gericht op een krachtig en stabiel lichaam.',
  },
  {
    title: 'BeYou Metabool Circuit',
    description: 'Een energieke 45 minuten circuittraining waarin kracht en conditie samen je stofwisseling activeren en je fitter en sterker maken.',
  },
];

const schema = [
  { trainingsvorm: 'BeYou Metabool Circuit', tijden: 'Woensdag 16:00 - 16:45' },
  { trainingsvorm: 'BeYou Persoonlijke Training', tijden: 'Woensdag 16:30 - 17:30' },
  { trainingsvorm: 'BeYou Ketentraining', tijden: 'Donderdag 19:00 - 19:45' },
  { trainingsvorm: 'BeYou Persoonlijke Training', tijden: 'Donderdag 19:30 - 20:30' },
  { trainingsvorm: 'BeYou Persoonlijke Training', tijden: 'Zaterdag 10:00 - 11:30' },
];

const kenmerken = [
  'Training onder begeleiding van een fysiotherapeut',
  'Gericht op kracht, coördinatie, lenigheid, snelheid en functionele bewegingspatronen',
  'Toepassing van ketentraining voor betere samenwerking van spieren en gewrichten',
  'Metabool circuit dat de stofwisseling activeert en bijdraagt aan vetverbranding, conditie en energie',
  'Geschikt als preventie, revalidatie of om gewoon lekker fit te worden en te blijven',
  'Persoonlijke aandacht binnen een veilige en stimulerende setting',
];

export default function Trainingen() {


  return (
    <>
      <section className="page-hero relative">
        <div className="page-hero__bg" />
        <div className="relative page-container">
          <div className="eyebrow">
            <span className="eyebrow__dot" />
            <span className="eyebrow__label">Diensten</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Trainingen BeYou
          </h1>
          <p className="text-gray-700 max-w-xl text-base leading-relaxed">
            Begeleide en laagdrempelige training gericht op het verbeteren van kracht, lenigheid, snelheid en coördinatie, met aandacht voor functionele spierketens.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beschrijving</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>Voelt een sportschool te anoniem en personal training te groot?</p>
                <p>Dan zijn de BeYou trainingen wellicht iets voor u.</p>
                <p>
                  BeYou trainingen zijn onder begeleiding werken aan belastbaarheid, herstel of algehele fitheid. De trainingen zijn veilig, doelgericht en afgestemd op uw niveau en persoonlijke doelen.
                </p>
                <p>
                  Alle trainingen zijn ook geschikt als vervolg op fysiotherapie of ter voorkoming van terugkerende klachten. U traint in kleine groepen in een motiverende omgeving, waarbij de focus ligt op het verbeteren van de samenwerking tussen spierketens voor een krachtig en stabiel lichaam.
                </p>
              </div>

              {/* Aanbod */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-5">Aanbod:</h3>
                <div className="space-y-4">
                  {programmas.map((p) => (
                    <div key={p.title} className="glass-card rounded-xl p-5 bg-white border border-gray-200">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1.5">{p.title}</h4>
                      <p className="text-xs text-gray-700 leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kenmerken */}
              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Kenmerken:</h3>
                <ul className="space-y-2.5">
                  {kenmerken.map((k) => (
                    <li key={k} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-700 mt-6">
                Twijfel je welke training bij je past of heb je vragen? Loop gerust binnen of neem contact met ons op.
              </p>
            </div>

            <div className="space-y-6">
              {/* Schema */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Weekschema</h2>
                <div className="space-y-3">
                  {schema.map((s, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700">{s.trainingsvorm}</span>
                      <span className="text-sm font-medium text-gray-900 sm:text-right">{s.tijden}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Contactgegevens</h3>
                <ContactDetails variant="inline" />
                <Link
                  href="/contact"
                  className="bg-primary text-white w-full mt-5 py-3.5 min-h-11 text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] block text-center touch-manipulation"
                >
                  Maak een afspraak
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}