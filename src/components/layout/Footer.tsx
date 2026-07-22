'use client'

import Link from "next/link"
import React from 'react';
import ContactDetails from '@/components/shared/ContactDetails';
import { CONTACT } from '@/lib/contact-info';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 sm:py-14 pb-[calc(3rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/images/logo.png"
                alt="BeYou logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-[15px] text-foreground">Fysiotherapie BeYou</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-1">&ldquo;Wat beweegt jou&rdquo;</p>
            <p className="text-gray-600 text-sm">{CONTACT.address.street}<br />{CONTACT.address.postalCode} {CONTACT.address.city}</p>
          </div>

          {/* Nav links */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Navigatie</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Visie', path: '/visie' },
                { label: 'Diensten', path: '/diensten' },
                { label: 'Fysiotherapeuten', path: '/fysiotherapeuten' },
                { label: 'Blog', path: '/blog' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link key={link.label}
                  href={link.path}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 min-h-11 flex items-center touch-manipulation"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</p>
            <ContactDetails variant="footer" showEmail />
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 text-center sm:text-left">© 2026 Fysiotherapie BeYou. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {[
              { label: 'Voorwaarden', path: '/voorwaarden' },
              { label: 'Privacyverklaring', path: '/privacyverklaring' },
              { label: 'Klachtenregeling', path: '/klachtenregeling' },
              { label: 'Disclaimer', path: '/disclaimer' },
            ].map((link) => (
              <Link key={link.label}
                href={link.path}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 min-h-11 inline-flex items-center touch-manipulation"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}