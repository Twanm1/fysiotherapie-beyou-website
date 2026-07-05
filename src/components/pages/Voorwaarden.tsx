import Link from 'next/link'

const articles = [
  {
    title: 'Artikel 1 – Algemeen',
    content: 'Deze algemene voorwaarden zijn van toepassing op alle behandelingen, diensten en overeenkomsten tussen Fysiotherapie Be You en de cliënt. Afwijkingen van deze voorwaarden zijn alleen geldig als deze schriftelijk zijn overeengekomen.',
  },
  {
    title: 'Artikel 2 – Behandeling en informatie',
    content: 'Fysiotherapie Be You verplicht zich tot het leveren van goede en zorgvuldige fysiotherapeutische zorg, in overeenstemming met de geldende professionele standaarden. De cliënt dient volledige en juiste informatie te verstrekken over zijn/haar gezondheid en medische achtergrond. De cliënt heeft altijd recht op uitleg over de voorgestelde behandeling, de mogelijke risico\'s en alternatieven.',
  },
  {
    title: 'Artikel 3 – Afspraken en annulering',
    content: 'Afspraken kunnen kosteloos worden geannuleerd of verzet tot 24 uur voor aanvang van de behandeling. Bij annuleringen binnen 24 uur of bij niet verschijnen zonder bericht, kan de gereserveerde tijd in rekening worden gebracht. Deze kosten worden niet vergoed door de zorgverzekeraar. Annuleren kan telefonisch, per e-mail of via een WhatsApp-bericht naar de behandelend therapeut.',
  },
  {
    title: 'Artikel 4 – Vergoeding en betaling',
    content: 'Fysiotherapie Be You heeft met veel zorgverzekeraars contracten. Afhankelijk van uw polis wordt de behandeling (deels) vergoed. Indien er geen contract is met uw verzekeraar of als het maximum aantal behandelingen is bereikt, ontvangt u zelf een factuur. Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan, tenzij schriftelijk anders is overeengekomen. Bij overschrijding van de betalingstermijn ontvangt u een herinnering. Bij uitblijvende betaling kunnen incassokosten in rekening worden gebracht.',
  },
  {
    title: 'Artikel 5 – Privacy en dossier',
    content: 'Uw persoonsgegevens worden verwerkt volgens de AVG en de WGBO. Zie onze privacyverklaring voor meer informatie. Uw dossier wordt conform de wettelijke bewaartermijn van 20 jaar opgeslagen. U heeft recht op inzage, correctie, verwijdering en overdracht van uw gegevens.',
  },
  {
    title: 'Artikel 6 – Aansprakelijkheid',
    content: 'Fysiotherapie Be You is niet aansprakelijk voor schade die voortvloeit uit onjuiste of onvolledige informatie verstrekt door de cliënt. De praktijk is niet aansprakelijk voor verlies, diefstal of beschadiging van persoonlijke eigendommen binnen of buiten de praktijkruimte. Bij geschillen wordt altijd gestreefd naar een oplossing in overleg.',
  },
  {
    title: 'Artikel 7 – Klachtenregeling',
    content: 'Fysiotherapie Be You is aangesloten bij een erkende klachtenregeling via het Keurmerk Fysiotherapie of een vergelijkbare beroepsorganisatie. Heeft u een klacht over uw behandeling? Neem dan eerst contact op met uw behandelaar of mail naar info@fysiotherapiebeyou.nl. We zoeken graag samen naar een oplossing.',
  },
  {
    title: 'Artikel 8 – Toepasselijk recht',
    content: 'Op alle diensten en overeenkomsten is het Nederlands recht van toepassing. Eventuele geschillen worden voorgelegd aan de bevoegde rechter.',
  },
];

export default function Voorwaarden() {


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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Algemene Voorwaarden</h1>
          <p className="text-sm text-gray-500">Fysiotherapie Be You · Schipluiden</p>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {articles.map((article) => (
            <div key={article.title} className="border-b border-gray-100 pb-8 last:border-0">
              <h2 className="text-base font-semibold text-gray-900 mb-3">{article.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{article.content}</p>
            </div>
          ))}
        </div>

        {/* Contact nudge */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-gray-700">
            Vragen over onze voorwaarden?{' '}
            <a href="mailto:info@fysiotherapiebeyou.nl" className="text-primary font-medium hover:underline">
              info@fysiotherapiebeyou.nl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}