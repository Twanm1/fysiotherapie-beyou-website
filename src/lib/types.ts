/** Blog post data structure (matches blog-posts.json seed). */
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  read_time: string
  published: boolean
  publish_date: string
}

export interface ContactFormPayload {
  name: string
  email: string
  phone?: string
  message: string
  source: string
  /** Honeypot — must stay empty */
  website?: string
}
