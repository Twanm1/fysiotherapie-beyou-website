import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'
import { LEGACY_REDIRECTS } from './src/lib/legacy-redirects'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const LEGACY_BLOG_SLUGS: Record<string, string> = {
  'waarom-langdurige-rugpijn-wel-over-kan-gaan': 'waarom-langdurige-rugpijn-wél-over-kan-gaan',
  'hoe-leefstijlverandering-echt-werkt': 'hoe-leefstijlverandering-écht-werkt',
  'belasting-vs-belastbaarheid': 'belasting-en-belastbaarheid-hoe-houd-je-de-balans',
}

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.fysiotherapiebeyou.nl' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/blogs/:slug*', destination: '/blog/:slug*', permanent: true },
      ...Object.entries(LEGACY_REDIRECTS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...Object.entries(LEGACY_BLOG_SLUGS).flatMap(([from, to]) => [
        {
          source: `/blogs/${from}`,
          destination: `/blog/${to}`,
          permanent: true,
        },
        {
          source: `/blog/${from}`,
          destination: `/blog/${to}`,
          permanent: true,
        },
      ]),
    ]
  },
}

export default nextConfig
