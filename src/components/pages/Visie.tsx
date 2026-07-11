import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'
import PageHero from '@/components/shared/PageHero'

const kernwaarden = [
  {
    icon: null,
    title: 'Kwaliteit',
    description: 'Wij streven naar hoge standaarden in fysiotherapeutische zorg. Met continue bijscholing en persoonlijke aandacht zorgen we voor doeltreffende en veilige behandelingen.',
  },
  {
    icon: null,
    title: 'Samenwerking',
    description: 'Bij complexe hulpvragen bundelen wij onze krachten met andere disciplines. Door samen te werken vanuit verschillende expertises bieden we een breder perspectief en passende zorg op maat.',
  },
  {
    icon: null,
    title: 'Integriteit',
    description: "Wij handelen transparant en eerlijk, en bouwen aan vertrouwen door ethisch en verantwoordelijk te werken, zowel in contact met cliënten als met collega's en samenwerkingspartners.",
  },
];

const team = [
  {
    name: 'Twan Mosch',
    role: 'Fysiotherapeut/Leefstijlcoach',
    image: 'https://framerusercontent.com/images/0elBPCnVPoUS5prUTLUTjJqpI8.png?width=1080&height=1080',
    link: '/fysiotherapeuten/twan-mosch',
  },
  {
    name: 'Mariana Cobo',
    role: 'Fysiotherapeut',
    image: 'https://framerusercontent.com/images/xKg3KCie4yhQiZkpkuFJEPQVsI.png?width=1080&height=1080',
    link: '/fysiotherapeuten/mariana-cobo',
  },
];

export default function Visie() {


  return (
    <>
      <PageHero
        eyebrow="Missie & Visie"
        title={
          <>
            Bij BeYou sta jij altijd
            <br />
            <span className="text-gradient">centraal</span>
          </>
        }
        description="Vanuit de principes van Positieve Gezondheid werken we samen aan herstel, balans en duurzame vitaliteit. Persoonlijk, integraal en met echte aandacht."
        primaryCta={{ label: 'Maak een afspraak', href: '/contact' }}
        secondaryCta={{ label: 'Ontmoet het team', href: '/fysiotherapeuten' }}
        highlights={[
          {
            title: 'Positieve Gezondheid',
            description: 'Lichaam, geest en leefstijl als één geheel. Niet alleen klachten, maar wat jij belangrijk vindt.',
          },
          {
            title: 'Persoonlijk behandelplan',
            description: 'Afgestemd op jouw doelen, dagelijks leven en tempo. Geen standaard protocol, wel echte begeleiding.',
          },
          {
            title: 'Lokaal in Schipluiden',
            description: 'Laagdrempelig, warm en bereikbaar. Direct contact, zonder verwijzing en zonder wachttijd.',
          },
        ]}
      />

      {/* Missie */}
      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://framerusercontent.com/images/maQyCl9FjrcMCG7Dm0zrNi6TwV4.jpeg?width=1200&height=1600"
                alt="BeYou team"
                className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover object-top"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-sm text-gray-600">Onze missie</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Jouw zorgvraag, onze uitdaging</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Zorg vanuit verbinding</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">Onze missie is om persoonlijke en empathische gezondheidszorg te bieden voor ieder individu, met een brede kijk op gezondheid.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Samen sterk bij complexe zorgvragen</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">Onder de paraplu van Positieve Gezondheid bundelen we onze krachten met andere disciplines. Zo bieden we bij complexe klachten samen de best mogelijke zorg.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visie */}
      <section className="page-section relative bg-gray-50/50">
        <div className="relative page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                <span className="text-sm text-gray-600">Onze visie</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Gepassioneerd over de weg naar gezondheid en levensgeluk.</h2>
              <ul className="space-y-4 text-sm text-gray-700 mb-8">
                {[
                  'Jij staat bij ons altijd centraal.',
                  'Ook zonder klachten helpen we je gezondheid te optimaliseren.',
                  'Samen zoeken we naar oorzaken en oplossingen voor duurzaam herstel.',
                  'Wij benaderen klachten vanuit de verbinding tussen lichaam en geest.',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://framerusercontent.com/images/nNRvmoF8aMBIOABiK3D9eCAD70.png?width=1024&height=1024"
                alt="Positieve gezondheid"
                className="w-full max-w-sm h-80 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Kernwaarden */}
      <section className="page-section">
        <div className="page-container">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-sm text-gray-600">Onze waarden</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Kernwaarden die onze missie dragen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {kernwaarden.map((k) => (
              <div key={k.title} className="card-hover glass-card p-7 rounded-2xl bg-white border border-gray-200">
                <h3 className="font-semibold text-gray-900 text-base mb-2">{k.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{k.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="page-section">
        <div className="page-container">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-sm text-gray-600">Team</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">Maak kennis met onze Fysiotherapeuten</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl">
            {team.map((member) => (
              <Link key={member.name} href={member.link} className="group block">
                <div className="card-hover glass-card rounded-2xl overflow-hidden bg-white border border-gray-200">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover object-top" loading="lazy" />
                  <div className="px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{member.role}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
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