'use client'

import Link from "next/link"
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="https://framerusercontent.com/images/39T3NYh2RTzdtqcUOLKHcbYTs.png?width=64&height=64"
                alt="BeYou logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-semibold text-[15px] text-foreground">Fysiotherapie BeYou</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-1">&ldquo;Wat beweegt jou&rdquo;</p>
            <p className="text-gray-600 text-sm">Burgemeester Musquetiersingel 8A<br />2636 GE Schipluiden</p>
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
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href="tel:+31618665863" className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-0.5">
                +31 6 18665863
              </a>
              <a href="mailto:info@fysiotherapiebeyou.nl" className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-0.5">
                info@fysiotherapiebeyou.nl
              </a>
            </div>
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
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
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