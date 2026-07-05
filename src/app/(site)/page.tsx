import HeroSection from '@/components/home/HeroSection'
import IntroSection from '@/components/home/IntroSection'
import WhyBeYou from '@/components/home/WhyBeYou'
import TeamSection from '@/components/home/TeamSection'
import ServicesSection from '@/components/home/ServicesSection'
import ProcessSection from '@/components/home/ProcessSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreview from '@/components/home/BlogPreview'
import FAQ from '@/components/shared/FAQ'
import ContactForm from '@/components/shared/ContactForm'
import JsonLd from '@/components/JsonLd'
import { FAQ_ITEMS } from '@/data/faq'
import { filterPosts } from '@/lib/blog-server'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: 'Fysiotherapie BeYou | Fysiotherapie, Leefstijlcoaching & Trainingen in Schipluiden',
  description:
    'Fysiotherapie BeYou in Schipluiden biedt persoonlijke fysiotherapie, leefstijlcoaching (GLI) en begeleide trainingen. Wat beweegt jou? Maak een afspraak.',
  path: '/',
  keywords: [
    'fysiotherapie Schipluiden',
    'fysiotherapeut Schipluiden',
    'fysiotherapie Midden-Delfland',
    'sportfysiotherapie Schipluiden',
  ],
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default async function HomePage() {
  const previewPosts = await filterPosts({ published: true }, '-publish_date', 3)

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <HeroSection />
      <IntroSection />
      <WhyBeYou />
      <TeamSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogPreview posts={previewPosts} />
      <FAQ />
      <ContactForm />
    </>
  )
}
