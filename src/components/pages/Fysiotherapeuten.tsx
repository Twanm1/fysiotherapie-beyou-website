import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import { TEAM_MEMBERS, type TeamMember } from '@/lib/site'

type FysiotherapeutenProps = {
  member?: TeamMember
}

export default function Fysiotherapeuten({ member }: FysiotherapeutenProps) {
  if (member) {
    return <FysiotherapeutDetail member={member} />
  }

  return (
    <>
      <section className="page-hero page-hero--center relative">
        <div className="page-hero__bg" />
        <div className="relative page-container">
          <div className="eyebrow eyebrow--center">
            <span className="eyebrow__dot" />
            <span className="eyebrow__label">Ons team</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Onze Fysiotherapeuten
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto text-base leading-relaxed">
            Maak kennis met de mensen achter Fysiotherapie BeYou. Gedreven professionals die staan voor persoonlijke, kwalitatieve zorg.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <Link key={member.name} href={`/fysiotherapeuten/${member.slug}`} className="group block">
                <div className="card-hover glass-card rounded-2xl overflow-hidden bg-white border border-gray-200">
                  <div className="overflow-hidden h-80">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{member.role}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
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

function FysiotherapeutDetail({ member }: { member: TeamMember }) {
  const isTwan = member.slug === 'twan-mosch';

  return (
    <>
      <div className="page-container py-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Team', href: '/fysiotherapeuten' },
            { label: member.name },
          ]}
        />
      </div>

      <section className="page-section relative">
        <div className="page-hero__bg" />
        <div className="relative page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover object-[center_10%]"
                  loading="eager"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-sm font-medium text-gray-600">{member.role}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{member.name}</h1>

              {isTwan ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Over mij</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Mijn naam is Twan Mosch en ik ben sinds juli 2024 werkzaam als fysiotherapeut (BSc). Ik ben al lange tijd gefascineerd door hoe lichaam en geest elkaar beïnvloeden. Mijn passie voor sport, beweging en gezondheid heeft me uiteindelijk richting de fysiotherapie geleid. Tijdens mijn opleiding groeide mijn interesse in wervelkolomgerelateerde klachten. Daarom heb ik mijn afstudeerstage gelopen bij het Spine & Joint Centrum in Rotterdam.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      In mijn werk staan persoonlijke aandacht, veiligheid en een positieve benadering centraal. Vanuit die visie heb ik Fysiotherapie Be You opgericht: een praktijk waarin ik samenwerk met andere disciplines onder de vlag van Positieve Gezondheid Schipluiden. Ik geloof dat echte zorg verder gaat dan symptoombestrijding. Het draait om het totaalplaatje.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Ervaring</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Ik heb ervaring opgedaan in zowel de eerstelijnszorg als in specialistische revalidatie. Tijdens mijn afstudeerstage bij Spine & Joint Centrum werkte ik samen in een multidisciplinair team aan complexe wervelkolomklachten en ontwikkelde ik een brede kijk op het bewegingsapparaat. Binnen Fysiotherapie Be You begeleid ik cliënten met diverse klachten, waarbij ik nauw samenwerk met onder andere een manueeltherapeut, osteopaat, bekkenfysiotherapeut, orofaciaal fysiotherapeut en diëtist.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Specialisaties & Informatie</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Mijn interesse ligt vooral bij mensen met aanhoudende of terugkerende klachten. Daarbij kijk ik niet alleen naar de klacht zelf, maar ook naar de context: hoe iemand beweegt, leeft en herstelt. Ik werk vanuit de principes van Positieve Gezondheid en zoek samen met de cliënt naar manieren om gezondheid te versterken, preventief én curatief. Recent heb ik de opleiding leefstijlcoach (GLI) afgerond om mensen te begeleiden naar een gezondere leefstijl via het Gecombineerde Leefstijl Interventie traject.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      Daarnaast ontwikkel ik beweegprogramma&apos;s binnen de praktijk, waaronder functionele training en preventieve begeleiding. Ik blijf me graag ontwikkelen om jou zo goed mogelijk te kunnen begeleiden op jouw weg naar herstel en vitaliteit.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Over mij</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Mijn naam is Mariana Cobo, geboren en getogen in Cali, Colombia, de stad van de salsa. Dansen is mijn grote passie en die energie en expressie neem ik mee in mijn werk als fysiotherapeut. Na het afronden van mijn bachelor Fysiotherapie in Colombia heb ik mijn master Functioneel Herstel in de Fysiotherapie gevolgd aan de Universiteit van Valencia in Spanje.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Ervaring</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Na het afronden van mijn master heb ik één jaar in de thuiszorg gewerkt in Valencia, waar ik mensen aan huis begeleidde bij hun herstel en dagelijkse functioneren. Daarnaast ben ik geschoold in Pilates en Dry Needling.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      Wat ik het belangrijkst vind in mijn werk is het oprechte, persoonlijke contact met mensen. Ik geloof dat een warme en veilige sfeer essentieel is om vertrouwen op te bouwen en herstel te bevorderen. Op dit moment ben ik de Nederlandse taal aan het leren. Binnenkort kan ik ook formeel als fysiotherapeut aan de slag bij Fysiotherapie Be You in Schipluiden.
                    </p>
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Specialisaties & Informatie</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Mijn aandacht ligt momenteel bij het bevorderen van lichaamsbewustzijn, houding, mobiliteit en algehele vitaliteit. Binnen Fysiotherapie Be You begeleid ik de sessies &apos;Bewegen op Muziek&apos;, een vrolijke en toegankelijke groepsles van 30 minuten waarin dans en plezier in bewegen samenkomen.
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      Totdat ik officieel als fysiotherapeut in Nederland mag werken, nodig ik je graag uit om kennis te maken tijdens de sessies op donderdagavond. Ik kijk ernaar uit om samen in beweging te komen – met aandacht, plezier en energie.
                    </p>
                  </div>
                </>
              )}

              <div className="mt-8">
                <Link href="/contact"
                  className="bg-primary text-white px-7 py-3.5 min-h-11 text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] inline-block touch-manipulation"
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