import BlogDetail from '@/components/pages/BlogDetail'
import JsonLd from '@/components/JsonLd'
import { getPostBySlug, isPubliclyVisiblePost, listPosts } from '@/lib/blog-server'
import { blogPostingJsonLd, createPageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await listPosts()
  return posts.filter((p) => isPubliclyVisiblePost(p)).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Blog' }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image_url || undefined,
    type: 'article',
  })
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post || !isPubliclyVisiblePost(post)) notFound()

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <BlogDetail post={post} />
    </>
  )
}
