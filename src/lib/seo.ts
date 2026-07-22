import type { Metadata } from 'next'
import { CONTACT } from './contact-info'
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site'

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  canonicalPath?: string
  image?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  keywords?: string[]
}

export function createPageMetadata({
  title,
  description,
  path,
  canonicalPath,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noIndex = false,
  keywords,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}${canonicalPath ?? path}`
  const fullTitle = title.includes(SITE_NAME) ? title : title
  const titleField = title.includes(SITE_NAME) ? { absolute: fullTitle } : fullTitle

  return {
    title: titleField,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type,
      locale: 'nl_NL',
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  }
}

export const medicalBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
  description:
    'Fysiotherapie BeYou in Schipluiden biedt persoonlijke fysiotherapie, leefstijlcoaching (GLI) en begeleide trainingen.',
  telephone: CONTACT.whatsapp.tel,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT.address.street,
    postalCode: CONTACT.address.postalCode,
    addressLocality: CONTACT.address.city,
    addressCountry: 'NL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.9748, longitude: 4.3116 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '11:30',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Schipluiden' },
    { '@type': 'AdministrativeArea', name: 'Midden-Delfland' },
    { '@type': 'City', name: 'Delft' },
  ],
}

type BlogPostingInput = {
  title: string
  slug: string
  excerpt: string
  image_url?: string
  publish_date?: string
}

function absoluteAssetUrl(path?: string) {
  if (!path) return `${SITE_URL}${DEFAULT_OG_IMAGE}`
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function blogPostingJsonLd(post: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: absoluteAssetUrl(post.image_url),
    datePublished: post.publish_date,
    author: { '@type': 'Person', name: 'Twan Mosch' },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  }
}

type PersonInput = {
  name: string
  role: string
  image: string
  slug: string
}

export function personJsonLd(member: PersonInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    image: member.image,
    url: `${SITE_URL}/fysiotherapeuten/${member.slug}`,
    worksFor: { '@type': 'MedicalBusiness', name: SITE_NAME, url: SITE_URL },
  }
}
