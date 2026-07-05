import { NextRequest, NextResponse } from 'next/server'
import { getPostById, updatePost, deletePost } from '@/lib/blog-server'
import { isAdminAuthenticated } from '@/lib/auth'
import type { BlogPost } from '@/lib/types'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 })
  }

  if (!post.published && !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Niet gevonden' }, { status: 404 })
  }

  return NextResponse.json(post)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  const { id } = await params
  const data = (await request.json()) as Partial<BlogPost>
  try {
    const post = await updatePost(id, data)
    return NextResponse.json(post)
  } catch {
    return NextResponse.json({ error: 'Post niet gevonden' }, { status: 404 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }

  const { id } = await params
  try {
    await deletePost(id)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Post niet gevonden' }, { status: 404 })
  }
}
