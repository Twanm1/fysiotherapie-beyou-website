import Link from 'next/link'
import { CONTACT } from '@/lib/contact-info'

const sections = [
  {
    title: 'Aansprakelijkheid en gebruik van informatie',
    content: 'De informatie op deze website is met zorg samengesteld en bedoeld om bezoekers zo goed mogelijk te informeren over de diensten van Fysiotherapie Be You. Toch kunnen wij niet garanderen dat alle gegevens volledig, juist of actueel zijn. Het gebruik van de informatie op deze website is voor eigen risico. Fysiotherapie Be You is niet aansprakelijk voor eventuele schade die voortvloeit uit het gebruik van de site, het vertrouwen op verstrekte informatie of het niet correct functioneren van (delen van) de website.',
  },
  {
    title: 'E-mail en digitale communicatie',
    content: `Wij doen ons best om e-mails die worden verzonden naar ${CONTACT.email} zorgvuldig en tijdig te behandelen. Houd er echter rekening mee dat de ontvangst en veiligheid van e-mailverkeer niet volledig gegarandeerd kunnen worden. Als u ervoor kiest om zonder versleuteling of wachtwoordbeveiliging met ons te communiceren, aanvaardt u zelf de mogelijke risico's van elektronische gegevensoverdracht.`,
  },
  {
    title: 'Externe links',
    content: 'Onze website kan verwijzingen bevatten naar andere websites of platforms die buiten onze controle vallen. Wij zijn niet verantwoordelijk voor de inhoud, werking of beschikbaarheid van deze externe bronnen en aanvaarden geen enkele aansprakelijkheid voor schade of gevolgen die voortvloeien uit het gebruik van dergelijke websites.',
  },
  {
    title: 'Intellectuele eigendomsrechten',
    content: 'Alle inhoud op deze website – waaronder teksten, foto\'s, logo\'s en grafische elementen – is eigendom van Fysiotherapie Be You, tenzij anders vermeld. Zonder onze uitdrukkelijke schriftelijke toestemming is het niet toegestaan om materiaal van deze website te kopiëren, publiceren of op andere wijze te verspreiden.',
  },
];

export default function Disclaimer() {


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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Disclaimer</h1>
          <p className="text-sm text-gray-500">Fysiotherapie Be You · Schipluiden</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="text-base font-semibold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact nudge */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700">
            Vragen over deze disclaimer?{' '}
            <a href={`mailto:${CONTACT.email}`} className="text-primary font-medium hover:underline">
              {CONTACT.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}