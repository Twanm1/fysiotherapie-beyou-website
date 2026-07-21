'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useMounted } from '@/lib/use-mounted';
import OpeningHoursBanner from '@/components/layout/OpeningHoursBanner';

const navLinks = [
  { label: 'Visie', path: '/visie' },
  { label: 'Diensten', path: '/diensten' },
  { label: 'Fysiotherapeuten', path: '/fysiotherapeuten' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mounted = useMounted();
  const pathname = usePathname() ?? "";
  const showScrolledStyle = mounted && scrolled;

  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      showScrolledStyle
        ? 'bg-white/98 backdrop-blur-lg border-b border-gray-100/50 shadow-lg'
        : 'bg-white/90 backdrop-blur-md border-b border-gray-100/20'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 min-w-0 shrink" prefetch={false}>
            <img
              src="https://framerusercontent.com/images/39T3NYh2RTzdtqcUOLKHcbYTs.png?width=64&height=64"
              alt="BeYou logo"
              className="w-8 h-8 object-contain shrink-0"
            />
            <span className="font-semibold text-[15px] text-gray-900 tracking-tight truncate">Fysiotherapie BeYou</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                prefetch={false}
                className={`text-sm transition-colors duration-150 ${
                  pathname === link.path || pathname.startsWith(link.path + '/')
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              prefetch={false}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 inline-block shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Maak een afspraak
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden min-w-11 min-h-11 flex items-center justify-center rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors touch-manipulation"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {!showScrolledStyle && <OpeningHoursBanner />}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[min(28rem,calc(100dvh-5rem))] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ borderTop: mobileOpen ? '1px solid #e5e7eb' : 'none' }}
      >
        <div className="bg-white shadow-lg">
          <nav id="mobile-navigation" className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                prefetch={false}
                className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-colors touch-manipulation ${
                  pathname === link.path || pathname.startsWith(link.path + '/')
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/contact"
                prefetch={false}
                className="bg-primary hover:bg-primary/90 text-white w-full py-3.5 text-base font-semibold rounded-full transition-all duration-200 block text-center shadow-md hover:shadow-lg active:scale-[0.98] touch-manipulation"
              >
                Maak een afspraak
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
