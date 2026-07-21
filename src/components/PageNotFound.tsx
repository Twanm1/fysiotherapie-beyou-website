'use client'

import Link from 'next/link'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Diensten', href: '/diensten' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export default function PageNotFound() {
  return (
    <div className="py-16 md:py-24 bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-7xl font-bold text-blue-200 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Pagina niet gevonden</h1>
        <p className="text-gray-700 text-sm mb-8">
          De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar de homepage of kies een pagina hieronder.
        </p>
        <Link
          href="/"
          className="bg-primary text-white px-7 py-3.5 min-h-11 text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] inline-block mb-8 touch-manipulation"
        >
          Terug naar home
        </Link>
        <div className="flex flex-wrap justify-center gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-primary hover:text-primary/80 px-4 py-2.5 min-h-11 inline-flex items-center rounded-full border border-primary/20 hover:bg-primary/5 transition-colors touch-manipulation"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
