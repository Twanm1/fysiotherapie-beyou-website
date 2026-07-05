import Blog from '@/components/pages/Blog'
import { createPageMetadata } from '@/lib/seo'
import { filterPosts } from '@/lib/blog-server'

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Gezond leven begint bij kennis en inzicht. Lees artikelen over fysiotherapie, leefstijl en beweging van Fysiotherapie BeYou.',
  path: '/blog',
})

export default async function BlogPage() {
  const posts = await filterPosts({ published: true }, '-publish_date', 50)
  return <Blog posts={posts} />
}
