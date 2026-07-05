import { NextRequest, NextResponse } from 'next/server'
import { listPosts, filterPosts, createPost } from '@/lib/blog-server'
import { isAdminAuthenticated } from '@/lib/auth'
import type { BlogPost } from '@/lib/types'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const sort = searchParams.get('sort') || '-publish_date'
  const published = searchParams.get('published')
  const limit = searchParams.get('limit')

  if (published === 'true') {
    const posts = await filterPosts(
      { published: true },
      sort,
      limit ? Number(limit) : undefined
    )
    return NextResponse.json(posts)
  }

  const isAdmin = await isAdminAuthenticated()
  if (!isAdmin) {
    const posts = await filterPosts(
      { published: true },
      sort,
      limit ? Number(limit) : undefined
    )
    return NextResponse.json(posts)
  }

  const posts = await listPosts(sort)
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  const data = (await request.json()) as Omit<BlogPost, 'id'>
  const post = await createPost(data)
  return NextResponse.json(post, { status: 201 })
}
