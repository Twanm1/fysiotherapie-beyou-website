'use client'

import dynamic from 'next/dynamic'

const Toaster = dynamic(
  () => import('sonner').then((mod) => mod.Toaster),
  { ssr: false }
)

export default function ClientToaster() {
  return <Toaster position="top-right" richColors closeButton />
}
