import { NextRequest, NextResponse } from 'next/server'
import { getPostBySlug } from '@/lib/blog-server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || !post.published) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 })
  }

  return NextResponse.json(post)
}
