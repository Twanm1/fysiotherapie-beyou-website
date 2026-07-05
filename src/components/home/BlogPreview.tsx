import Link from 'next/link'
import type { BlogPost } from '@/lib/types'
import { formatPublishDate } from '@/lib/format-date'
import { ArrowRight } from 'lucide-react'

type BlogPreviewProps = {
  posts: BlogPost[]
}

export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Blog</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Inzichten voor<br />gezond bewegen
          </h2>
          <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0">
            Alle artikelen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="rounded-2xl overflow-hidden h-full flex flex-col bg-white border border-gray-200 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1">
                {post.image_url ? (
                  <div className="overflow-hidden h-56 shrink-0 relative">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : (
                  <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-50 shrink-0" />
                )}
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-semibold text-base text-gray-900 mb-4 leading-snug flex-1 group-hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-auto pt-5">
                    {formatPublishDate(post.publish_date) && (
                      <span>{formatPublishDate(post.publish_date)}</span>
                    )}
                    {post.read_time && <span>{post.read_time}</span>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-blue-700 transition-colors">
            Alle artikelen <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
