import type { BlogPost } from '@/lib/types'

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error((error as { error?: string }).error || 'Request mislukt')
  }
  return response.json() as Promise<T>
}

export const blogApi = {
  async list(sortField = '-publish_date'): Promise<BlogPost[]> {
    const response = await fetch(`/api/blog?sort=${encodeURIComponent(sortField)}`, {
      cache: 'no-store',
    })
    return handleResponse<BlogPost[]>(response)
  },

  async filter(
    criteria: Partial<BlogPost>,
    sortField = '-publish_date',
    limit?: number
  ): Promise<BlogPost[]> {
    const params = new URLSearchParams({ sort: sortField })
    if (criteria.published) params.set('published', 'true')
    if (limit) params.set('limit', String(limit))
    const response = await fetch(`/api/blog?${params}`, { cache: 'no-store' })
    return handleResponse<BlogPost[]>(response)
  },

  async getBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`/api/blog/slug/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    })
    return handleResponse<BlogPost>(response)
  },

  async create(data: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return handleResponse<BlogPost>(response)
  },

  async update(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    const response = await fetch(`/api/blog/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return handleResponse<BlogPost>(response)
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/blog/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })
    await handleResponse<{ success: boolean }>(response)
  },
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = await handleResponse<{ url: string }>(response)
  return data.url
}

export async function submitContactForm(payload: {
  name: string
  email: string
  phone?: string
  message: string
  source: string
  website?: string
}): Promise<{ success: boolean; confirmationSent?: boolean }> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}
