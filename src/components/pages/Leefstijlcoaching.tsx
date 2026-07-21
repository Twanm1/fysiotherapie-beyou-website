import Link from 'next/link'
import ContactForm from '@/components/shared/ContactForm'
import ContactDetails from '@/components/shared/ContactDetails'
import { CONTACT } from '@/lib/contact-info'

const focuspunten = [
  'Gezonder eten',
  'Meer bewegen',
  'Gedragsverandering en het volhouden daarvan',
];

const verwachtingen = [
  'Actief deelneemt aan de afspraken en bijeenkomsten',
  'Gemotiveerd bent om aan je leefstijl te werken',
  'Openstaat voor verandering en nieuwe inzichten',
];

const praktisch = [
  'De definitieve startdata hoor je nog, dit zal eind februari/begin maart zijn',
  'De groepsbijeenkomsten zullen op woensdagavond plaatsvinden',
  `Locatie: ${CONTACT.address.line}`,
];

export default function Leefstijlcoaching() {
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
            Leefstijlcoaching BeYou
          </h1>
          <p className="text-gray-700 max-w-xl text-base leading-relaxed">
            Leefstijlcoaching in de Gecombineerde Leefstijl Interventie (GLI). Je hoeft het niet alleen te doen. Gezonde gewoontes bouw je samen.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              {/* Wat is GLI */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Wat is de Gecombineerde Leefstijlinterventie (GLI)?</h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Het GLI-traject is een programma dat je helpt om stap voor stap te werken aan een gezondere leefstijl. Het doel is om je gezondheid te verbeteren en je te ondersteunen bij het bereiken en behouden van een gezonder gewicht.
                </p>
                <p className="text-sm text-gray-700 mb-3">De focus ligt op:</p>
                <ul className="space-y-2">
                  {focuspunten.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Traject */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hoe ziet het traject eruit?</h2>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Het GLI-traject duurt twee jaar en bestaat uit:
                </p>
                <ul className="space-y-2">
                  {[
                    'Individuele gesprekken met de leefstijlcoaches',
                    'Groepsbijeenkomsten met andere deelnemers',
                    'Aandacht voor voeding, beweging, slaap, stress en motivatie',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Begeleiding */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Begeleiding</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Je wordt begeleid door Twan en Simone, beide gecertificeerde leefstijlcoach. Samen stellen we persoonlijke doelen op, die passen bij je situatie en mogelijkheden. Wij zullen je als coach ondersteunen, motiveren en helpen bij het maken van haalbare keuzes in het dagelijks leven. Je staat er dus niet alleen voor, gezonde gewoontes bouwen we samen!
                </p>
              </div>

              {/* Verwachtingen */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Wat verwachten wij van je?</h2>
                <p className="text-sm text-gray-700 mb-3">Om het meeste uit het traject te halen, is het belangrijk dat je:</p>
                <ul className="space-y-2">
                  {verwachtingen.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" /> {v}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-2xl p-6 bg-white border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Voel je dat het tijd is om de stap naar een gezonde leefstijl te zetten? Wil je je fitter en energieker voelen, meer vertrouwen krijgen in je eigen kunnen en gedragsverandering op de lange termijn bereiken? Meld je dan aan! Wij kijken er naar uit je te begeleiden!
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Vergoeding */}
              <div className="glass-card rounded-2xl p-7 border border-green-300 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                   <h2 className="text-lg font-bold text-gray-900">Vergoeding</h2>
                 </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Het GLI-traject wordt <strong className="text-gray-900">volledig vergoed vanuit de basisverzekering</strong>. Het eigen risico is hierop niet van toepassing. Deelname verloopt via een verwijsbrief vanuit je huisarts, praktijkondersteuner of medisch specialist.
                </p>
              </div>

              {/* GLI Websites */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Meer informatie over GLI</h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <a href="https://www.glivlaardingen.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.glivlaardingen.nl</a>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <a href="https://www.glischipluiden.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">www.glischipluiden.nl</a>
                  </li>
                </ul>
              </div>

              {/* Praktisch */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Praktische informatie</h2>
                <ul className="space-y-3">
                  {praktisch.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" /> {p}
                    </li>
                  ))}
                </ul>
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

              {/* Team */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Begeleiders</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://framerusercontent.com/images/0elBPCnVPoUS5prUTLUTjJqpI8.png?width=200&height=200"
                      alt="Twan Mosch"
                      className="w-12 h-12 rounded-full object-cover object-top"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Twan Mosch</p>
                      <p className="text-xs text-gray-600">Gecertificeerd leefstijlcoach (GLI)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-1">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-primary">S</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Simone</p>
                      <p className="text-xs text-gray-600">Gecertificeerd leefstijlcoach (GLI)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}