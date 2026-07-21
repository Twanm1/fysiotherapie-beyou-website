import Link from 'next/link'
import ContactForm from '@/components/shared/ContactForm'
import ContactDetails from '@/components/shared/ContactDetails'

const behandelingen = [
  'Nek-, rug-, schouder-, heup-, knie- en enkelklachten (acuut én langdurig)',
  'Sportgerelateerde klachten en revalidatie na blessure, ongeluk of operatie',
  'Preventie van terugkerende klachten',
  'Leefstijl gerelateerde factoren: beweging, belastbaarheid, herstel, slaap en stress',
];

const werkwijze = [
  'Intake, onderzoek en behandelplan afgestemd op uw persoonlijke situatie',
  'Aandacht voor de verbinding tussen lichaam en geest',
  'Multidisciplinaire samenwerking met manueeltherapeut, osteopaat, bekkenfysiotherapeut, orofaciaal fysiotherapeut en diëtist',
  'Behandeling op de bank en in de oefenzaal, gericht op herstel en zelfstandigheid',
  'Preventieve adviezen voor een blijvend gezond en vitaal lichaam',
];

const tarieven = [
  { label: 'Screening, intake en onderzoek', prijs: '€80,00' },
  { label: 'Intake en onderzoek aan huis', prijs: '€97,50' },
  { label: 'Reguliere behandeling Fysiotherapie', prijs: '€45,00' },
  { label: 'Reguliere behandeling aan huis', prijs: '€60,00' },
  { label: 'Rapportage', prijs: '€100,00' },
  { label: 'Niet nagekomen afspraak', prijs: '€35,00' },
];

const verzekeraars = [
  'VGZ Zorgverzekeraar N.V.',
  'IZA-VNG',
  'N.V. Univé Zorg',
  'NV Zorgverzekeraar U.A.',
  'Centrale Verwerking Office Verzekerden B.V.',
  'Zilveren Kruis Zorgverzekeringen N.V.',
  'Interpolis Zorgverzekering N.V.',
  'FBTO Zorgverzekeringen N.V.',
  'Menzis Zorgverzekeraar N.V.',
  'Anderzorg N.V.',
  'De Friesland Zorgverzekeraar N.V.',
  'OWM DSW Zorgverzekering N.V.',
  'Stad Holland Zorgverzekeraar',
  'Ditzo Zorgverzekering N.V.',
  'De Amersfoortse Zorgverzekering N.V.',
  'Eno Zorgverzekering N.V.',
];

export default function Fysiotherapie() {


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
            Fysiotherapie BeYou
          </h1>
          <p className="text-gray-700 max-w-xl text-base leading-relaxed">
            Persoonlijke en professionele begeleiding bij lichamelijke klachten, met aandacht voor zowel de fysieke als mentale aspecten van gezondheid.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Beschrijving</h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Bij BeYou sta jij centraal. We kijken samen naar de klacht én de mens erachter. Onze begeleiding is persoonlijk en professioneel, met aandacht voor zowel de fysieke als mentale aspecten van gezondheid.
                </p>
                <p>
                  Je kunt bij Fysiotherapie BeYou terecht voor de behandeling van nek-, rug-, schouder-, heup-, knie- en enkelklachten, zowel acuut als langdurig. Ook voor sportgerelateerde klachten en revalidatie na een blessure, ongeluk of operatie ben je bij ons aan het juiste adres.
                </p>
                <p>
                  Daarnaast kijken we als leefstijlcoach naar factoren zoals beweging, belastbaarheid, herstel, slaap en stress. Zo verminderen klachten niet alleen, maar helpen we ook nieuwe klachten voorkomen.
                </p>
                <p>
                  Door nauwe samenwerking met verschillende specialisten bieden we een brede en integrale aanpak. Van intake tot afronding werken we aan het verlichten van klachten, het voorkomen van terugkeer en het versterken van jouw gezondheid op de lange termijn.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Je kunt bij ons terecht voor:</h3>
                <ul className="space-y-2.5">
                  {behandelingen.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Werkwijze:</h3>
                <ul className="space-y-2.5">
                  {werkwijze.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {/* Tarieven */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-5">Tarieven</h2>
                <div className="space-y-3">
                  {tarieven.map((t) => (
                    <div key={t.label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700">{t.label}</span>
                      <span className="text-sm font-semibold text-gray-900 sm:shrink-0 sm:pl-4">{t.prijs}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-700 mt-4 leading-relaxed">
                  Bovengenoemde tarieven zijn van toepassing op niet-gecontracteerde zorg. Cliënten ontvangen na de behandeling een factuur die bij de eigen zorgverzekeraar kan worden ingediend.
                </p>
              </div>

              {/* Verzekeraars */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Gecontracteerde zorgverzekeraars</h2>
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                  Voor cliënten die aanvullend verzekerd zijn bij onderstaande verzekeraars worden behandelkosten rechtstreeks gedeclareerd.
                </p>
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Verzekeraar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {verzekeraars.map((v) => (
                        <tr key={v} className="bg-white">
                          <td className="px-4 py-2.5 text-gray-700">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-700 mt-4">
                  Voor een niet nagekomen afspraak wordt €35,- in rekening gebracht. Deze nota wordt niet vergoed door je zorgverzekeraar.
                </p>
              </div>

              {/* Contact info */}
              <div className="glass-card rounded-2xl p-7 bg-white border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Contactgegevens</h3>
                <ContactDetails variant="inline" />
                <Link href="/contact"
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