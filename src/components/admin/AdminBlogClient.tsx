'use client'

import dynamic from 'next/dynamic'

const AdminBlog = dynamic(() => import('@/components/pages/AdminBlog'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
    </div>
  ),
})

export default function AdminBlogClient() {
  return <AdminBlog />
}
