import Link from 'next/link'
import type { BlogPost } from '@/lib/types'
import { formatPublishDate } from '@/lib/format-date'
import ContactForm from '@/components/shared/ContactForm'

type BlogProps = {
  posts: BlogPost[]
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <section className="page-hero page-hero--center relative">
        <div className="page-hero__bg" />
        <div className="relative page-container">
          <div className="eyebrow eyebrow--center">
            <span className="eyebrow__dot" />
            <span className="eyebrow__label">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 max-w-3xl mx-auto">
            Gezond leven begint bij kennis en inzicht
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto text-base leading-relaxed">
            Artikelen over fysiotherapie, beweging en leefstijl van het team van Fysiotherapie BeYou.
          </p>
        </div>
      </section>

      <section className="page-section bg-white">
        <div className="page-container">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Nog geen artikelen beschikbaar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="card-hover rounded-xl overflow-hidden h-full flex flex-col bg-white border border-gray-200">
                    {post.image_url ? (
                      <div className="overflow-hidden h-56 shrink-0">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="h-56 bg-gray-100 shrink-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="w-4 h-4 rounded-sm bg-gray-300 block" />
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="font-semibold text-base text-gray-900 mb-4 leading-snug flex-1">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-auto pt-4 border-t border-gray-200">
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
          )}
        </div>
      </section>

      <ContactForm />
    </>
  )
}
