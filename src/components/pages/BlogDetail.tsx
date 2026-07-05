'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'
import type { BlogPost } from '@/lib/types'
import { formatPublishDate } from '@/lib/format-date'
import ReactMarkdown from 'react-markdown'
import ContactForm from '@/components/shared/ContactForm'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import { normalizeBlogMarkdown } from '@/lib/normalize-blog-content'

type BlogDetailProps = {
  post: BlogPost
}

function isHtmlContent(content: string) {
  return /^\s*</.test(content.trim())
}

export default function BlogDetail({ post }: BlogDetailProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post.slug])

  return (
    <>
      <article className="bg-white">
        <div className="page-container max-w-3xl py-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>

        <div className="page-container max-w-3xl py-8 text-center">
          {formatPublishDate(post.publish_date) && (
            <p className="text-sm text-gray-600 mb-4">{formatPublishDate(post.publish_date)}</p>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">{post.title}</h1>
          <div className="flex items-center justify-center gap-3">
            <img
              src="https://framerusercontent.com/images/0elBPCnVPoUS5prUTLUTjJqpI8.png?width=120&height=120"
              alt="Twan Mosch"
              className="w-10 h-10 rounded-full object-cover object-top"
            />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Twan Mosch</p>
              <p className="text-xs text-gray-600">
                Fysiotherapeut/Leefstijlcoach{post.read_time ? ` · ${post.read_time}` : ''}
              </p>
            </div>
          </div>
        </div>

        {post.image_url && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-[380px] md:h-[500px] object-cover"
                loading="eager"
              />
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="blog-content">
            {isHtmlContent(post.content) ? (
              <div
                className="blog-content-html text-gray-700 leading-[1.85] text-base [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-5 [&_ul]:my-5 [&_ul]:space-y-2 [&_ol]:my-5 [&_ol]:space-y-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4 leading-tight">{children}</h2>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4 leading-tight border-b border-gray-100 pb-3">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-gray-900 mt-7 mb-2">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-base font-semibold text-gray-800 mt-5 mb-2">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-[1.85] text-base mb-5">{children}</p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  ),
                  ul: ({ children }) => <ul className="my-5 space-y-2 pl-0">{children}</ul>,
                  ol: ({ children }) => (
                    <ol className="my-5 space-y-2 pl-0 list-none counter-reset-item">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-3 text-gray-700 leading-relaxed text-base">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({ children, href }) => {
                    const isHttp = href?.startsWith('http')
                    const isInternal = href?.startsWith('/')
                    if (isInternal && href) {
                      return (
                        <Link href={href} className="text-primary underline underline-offset-2 hover:opacity-80">
                          {children}
                        </Link>
                      )
                    }
                    return (
                      <a
                        href={href}
                        className="text-primary underline underline-offset-2 hover:opacity-80"
                        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {children}
                      </a>
                    )
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 border-l-4 border-primary/40 pl-5 py-1 bg-blue-50 rounded-r-xl">
                      <div className="text-gray-700 italic leading-relaxed">{children}</div>
                    </blockquote>
                  ),
                  code: ({ className, children }) =>
                    !className ? (
                      <code className="bg-gray-100 text-gray-800 rounded px-1.5 py-0.5 text-sm font-mono">
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 my-5 overflow-x-auto text-sm text-gray-800 font-mono leading-relaxed">
                        <code>{children}</code>
                      </pre>
                    ),
                  hr: () => <hr className="my-10 border-gray-200" />,
                }}
              >
                {normalizeBlogMarkdown(post.content)}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </article>

      <ContactForm />
    </>
  )
}
