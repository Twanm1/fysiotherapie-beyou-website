import { promises as fs } from 'fs'
import path from 'path'
import type { BlogPost } from './types'
import { normalizeBlogSlug, resolveBlogSlug } from './blog-slug'

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'blog-posts.json')

function generateId(): string {
  return `post_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function sortPosts(posts: BlogPost[], sortField = '-publish_date'): BlogPost[] {
  const descending = sortField.startsWith('-')
  const field = descending ? sortField.slice(1) : sortField

  return [...posts].sort((a, b) => {
    const aVal = String((a as unknown as Record<string, unknown>)[field] ?? '')
    const bVal = String((b as unknown as Record<string, unknown>)[field] ?? '')
    if (aVal < bVal) return descending ? 1 : -1
    if (aVal > bVal) return descending ? -1 : 1
    return 0
  })
}

async function readPosts(): Promise<BlogPost[]> {
  const raw = (await fs.readFile(DATA_PATH, 'utf-8')).trim()
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as BlogPost[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    throw new Error('blog-posts.json is ongeldig — herstel het bestand of voer de blog-scraper opnieuw uit')
  }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(posts, null, 2), 'utf-8')
}

export function isPubliclyVisiblePost(post: BlogPost, now = new Date()): boolean {
  if (!post.published) return false
  const publishDate = post.publish_date?.trim()
  if (!publishDate) return true

  const endOfToday = new Date(now)
  endOfToday.setHours(23, 59, 59, 999)
  const parsed = new Date(`${publishDate}T12:00:00`)
  return !Number.isNaN(parsed.getTime()) && parsed <= endOfToday
}

export async function listPosts(sortField = '-publish_date'): Promise<BlogPost[]> {
  return sortPosts(await readPosts(), sortField)
}

export async function filterPosts(
  criteria: Partial<BlogPost>,
  sortField = '-publish_date',
  limit?: number
): Promise<BlogPost[]> {
  let posts = (await readPosts()).filter((post) =>
    Object.entries(criteria).every(([key, value]) => post[key as keyof BlogPost] === value)
  )
  if (criteria.published === true) {
    posts = posts.filter((post) => isPubliclyVisiblePost(post))
  }
  posts = sortPosts(posts, sortField)
  if (limit) posts = posts.slice(0, limit)
  return posts
}

export async function getPostBySlug(rawSlug: string): Promise<BlogPost | null> {
  const posts = await readPosts()
  const slug = resolveBlogSlug(rawSlug)
  return posts.find((p) => normalizeBlogSlug(p.slug) === slug) ?? null
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await readPosts()
  return posts.find((p) => p.id === id) ?? null
}

export async function createPost(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const posts = await readPosts()
  const newPost: BlogPost = { id: generateId(), ...data }
  posts.push(newPost)
  await writePosts(posts)
  return newPost
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
  const posts = await readPosts()
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) throw new Error('Post niet gevonden')
  posts[index] = { ...posts[index], ...data }
  await writePosts(posts)
  return posts[index]
}

export async function deletePost(id: string): Promise<void> {
  const posts = (await readPosts()).filter((p) => p.id !== id)
  await writePosts(posts)
}
