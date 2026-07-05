import type { MetadataRoute } from 'next'
import { listPosts, isPubliclyVisiblePost } from '@/lib/blog-server'
import { SITE_URL } from '@/lib/site'

const STATIC_ROUTES = [
  '',
  '/visie',
  '/diensten',
  '/diensten/fysiotherapie',
  '/diensten/trainingen',
  '/diensten/leefstijlcoaching',
  '/fysiotherapeuten',
  '/fysiotherapeuten/twan-mosch',
  '/fysiotherapeuten/mariana-cobo',
  '/contact',
  '/blog',
  '/privacyverklaring',
  '/voorwaarden',
  '/disclaimer',
  '/klachtenregeling',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/diensten') ? 0.9 : 0.8,
  }))

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((p) => isPubliclyVisiblePost(p))
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.publish_date ? new Date(post.publish_date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticEntries, ...blogEntries]
}
