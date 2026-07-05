'use client'

import Link from "next/link"
import Image from 'next/image'
import React from 'react';
import GoogleRatingBadge from '@/components/shared/GoogleRatingBadge';

export default function HeroSection() {
  return (
    <section className="page-hero min-h-[65vh] flex items-center relative overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[300px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative container-wide w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="order-1 lg:order-2 lg:hidden mb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200">
              <span className="eyebrow__dot" />
              <span className="text-xs font-medium text-gray-700">Fysiotherapie BeYou · Schipluiden</span>
            </div>
          </div>

          <div className="order-2 lg:order-3 relative">
            <div className="relative rounded-3xl overflow-hidden glow-primary shadow-xl">
              <Image
                src="/images/hero-team.png"
                alt="Fysiotherapie BeYou team"
                width={960}
                height={640}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] object-cover object-[50%_20%]"
              />
            </div>
          </div>

          <div className="order-3 lg:order-1">
            <div className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="eyebrow__dot" />
              <span className="text-xs font-medium text-gray-700">Fysiotherapie BeYou · Schipluiden</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 text-gray-900">
              Fysiotherapie<br />
              Schipluiden
            </h1>
            <p className="text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              Binnen Fysiotherapie BeYou benaderen we gezondheid integraal met Positieve Gezondheid als leidraad. Lichaam en geest beïnvloeden elkaar voortdurend en vormen samen de basis voor herstel, balans en duurzaam functioneren.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="bg-primary text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg inline-block text-center"
              >
                Maak een afspraak
              </Link>
              <Link
                href="/visie"
                className="px-6 py-3 text-sm font-medium rounded-full border border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-200 inline-block text-center"
              >
                Over ons
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 gap-4 sm:flex sm:flex-nowrap sm:items-center sm:gap-0">
                <div className="flex justify-center sm:justify-start sm:shrink-0 sm:pr-3 lg:pr-4">
                  <GoogleRatingBadge size="sm" />
                </div>
                <div className="flex flex-col justify-center gap-1 leading-none text-center sm:text-left shrink-0 sm:border-l sm:border-gray-200 sm:pl-3 lg:pl-4 sm:pr-3 lg:pr-4">
                  <p className="text-sm font-bold text-gray-900">Snel terecht</p>
                  <p className="text-xs text-gray-500">Geen wachttijd</p>
                </div>
                <div className="flex flex-col justify-center gap-1 leading-none text-center sm:text-left shrink-0 sm:border-l sm:border-gray-200 sm:pl-3 lg:pl-4">
                  <p className="text-sm font-bold text-gray-900">Geen verwijzing nodig</p>
                  <p className="text-xs text-gray-500">Direct aanmelden</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
