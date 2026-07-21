import Link from 'next/link'
import { CONTACT } from '@/lib/contact-info'

const sections = [
  {
    title: 'Uw privacy en persoonsgegevens',
    content: 'Bij Fysiotherapie Be You vinden wij uw privacy erg belangrijk. In deze privacyverklaring leggen wij uit hoe wij omgaan met uw persoonsgegevens, welke rechten u heeft, en welke verplichtingen wij als praktijk hebben. Deze verklaring is gebaseerd op de Algemene Verordening Gegevensbescherming (AVG) en de Wet op de geneeskundige behandelingsovereenkomst (WGBO).',
  },
  {
    title: 'Waarom verwerken wij uw persoonsgegevens?',
    content: 'Wij verwerken uw gegevens om u goed en veilig te kunnen behandelen en om uw behandeling administratief en financieel af te handelen.',
    bullets: [
      'Het voldoen aan wettelijke verplichtingen (bijvoorbeeld het melden van een besmettelijke ziekte);',
      'Het waarborgen van uw gezondheid of die van anderen;',
      'Wetenschappelijk onderzoek, onderwijs en voorlichting (alleen met uw toestemming).',
    ],
    bulletsIntro: 'Daarnaast kan het nodig zijn gegevens te verwerken voor:',
  },
  {
    title: 'Onze verplichtingen als praktijk',
    content: 'Fysiotherapie Be You is verantwoordelijk voor de verwerking van uw persoonsgegevens. Wij zorgen ervoor dat uw gegevens:',
    bullets: [
      'Uitsluitend worden verwerkt voor fysiotherapeutische zorgverlening, goed beheer en beleid van onze praktijk, en wetenschappelijk onderzoek, onderwijs en voorlichting (alleen met toestemming).',
      'Niet worden gebruikt voor andere doeleinden zonder uw toestemming.',
      'Veilig en vertrouwelijk worden behandeld door al onze medewerkers.',
      'Niet langer worden bewaard dan nodig is.',
    ],
    footer: 'Medische gegevens bewaren we in principe 20 jaar vanaf de laatste behandeling, tenzij een langere bewaartermijn medisch noodzakelijk is.',
  },
  {
    title: 'Uw rechten',
    content: 'U heeft als patiënt recht op:',
    bullets: [
      'Inzage: u mag weten of wij persoonsgegevens van u verwerken en welke dat zijn.',
      'Kopie: u mag kosteloos een kopie ontvangen van uw (elektronisch) dossier.',
      'Correctie: u kunt onjuiste gegevens laten aanpassen of aanvullen.',
      'Verwijdering: u kunt vragen om (gedeeltelijke) vernietiging van uw medisch dossier. Dit kan alleen als er geen wettelijke bewaarplicht geldt en het niet van belang is voor anderen.',
      'Eigen verklaring: u mag een eigen verklaring (bijvoorbeeld van medische aard) aan uw dossier laten toevoegen.',
      'Bezwaar: in bepaalde gevallen mag u bezwaar maken tegen verwerking van uw gegevens.',
      'Logging: u heeft recht op informatie over wie uw gegevens heeft ingezien.',
      'Dataportabiliteit: u heeft het recht om (een deel van) uw gegevens over te dragen aan een andere zorgaanbieder.',
    ],
    footer: 'Wilt u gebruikmaken van een van deze rechten? Neem dan contact met ons op, mondeling of via een aanvraagformulier. Een gemachtigde (bijvoorbeeld een schriftelijk gevolmachtigde, curator of mentor) mag dit ook namens u doen.',
  },
  {
    title: 'Verstrekking aan derden',
    content: 'Uw gegevens worden alleen gedeeld met andere zorgverleners (zoals een huisarts of specialist) als dit nodig is voor uw behandeling – en uitsluitend met uw uitdrukkelijke toestemming.',
    bullets: [
      'Een wettelijke verplichting.',
      'Een ernstig gevaar voor uw gezondheid of die van anderen.',
      'Samenwerking met andere zorgverleners binnen uw behandeltraject.',
    ],
    bulletsIntro: 'Uitzonderingen zijn alleen mogelijk bij:',
    footer: 'Alle gegevensuitwisseling gebeurt veilig: mondeling, schriftelijk of digitaal.',
  },
  {
    title: 'Overdracht van uw medisch dossier',
    content: 'Als u overstapt naar een andere fysiotherapeut, is het belangrijk dat deze beschikt over uw medische voorgeschiedenis. Uw dossier kan door Fysiotherapie Be You worden overgedragen:',
    bullets: [
      'Persoonlijk of per aangetekende post.',
      'Digitaal per beveiligde e-mail (indien beide partijen voldoende beveiligingsmaatregelen treffen).',
    ],
    footer: 'De overdracht vindt zo spoedig mogelijk plaats, in ieder geval binnen één maand na uw verzoek. U ontvangt nooit het originele dossier, maar heeft altijd recht op inzage en een kopie.',
  },
];

export default function Privacyverklaring() {


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
            <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Juridisch</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Privacyverklaring</h1>
          <p className="text-sm text-gray-500">Fysiotherapie Be You · Schipluiden</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="text-base font-semibold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{section.content}</p>
              {section.bulletsIntro && (
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{section.bulletsIntro}</p>
              )}
              {section.bullets && (
                <ul className="space-y-2 mb-3">
                  {section.bullets.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="text-sm text-gray-600 leading-relaxed italic">{section.footer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact nudge */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700 font-medium mb-1">Vragen of klachten?</p>
          <p className="text-sm text-gray-700">
            Heeft u vragen over hoe wij uw gegevens bewaren of delen? Neem gerust contact op via{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-primary font-medium hover:underline">
              {CONTACT.email}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}