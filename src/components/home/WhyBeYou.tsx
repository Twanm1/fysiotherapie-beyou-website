'use client'

import Link from "next/link"
import React from 'react';

const pillars = [
  {
    number: '01',
    title: 'Laagdrempelig en lokaal',
    description: 'Een plek waar je je welkom voelt, gehoord wordt en samen werkt aan gezondheid. Midden in Schipluiden.',
  },
  {
    number: '02',
    title: 'Persoonlijk en doelgericht',
    description: 'Samen werken we aan wat voor jóu belangrijk is. Met behandelingen die aansluiten bij wie jij bent.',
  },
  {
    number: '03',
    title: 'Integraal en duurzaam',
    description: 'We kijken verder dan de klacht. Lichaam, geest en leefstijl vormen samen de basis voor blijvend herstel.',
  },
];

export default function WhyBeYou() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start lg:items-center">

          {/* Left: tekst + pillars */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-sm font-medium text-gray-600">Over ons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 leading-tight mb-8 sm:mb-12">
              Waarom Fysiotherapie<br />BeYou?
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {pillars.map((p) => (
                <div key={p.number} className="flex items-start gap-4 sm:gap-5 p-4 rounded-lg bg-white border border-gray-100 shadow-sm">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-semibold text-primary">{p.number}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1.5 sm:mb-2">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12">
              <Link href="/visie"
                className="bg-primary text-white px-6 sm:px-7 py-3.5 text-sm font-semibold rounded-lg hover:bg-primary/85 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 inline-block w-full sm:w-auto text-center"
              >
                Onze visie
              </Link>
            </div>
          </div>

          {/* Right: foto */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://framerusercontent.com/images/02Jfv1EpHZhegtMcINrpOJXBagk.jpeg?width=1600&height=1200"
              alt="Fysiotherapie BeYou behandeling"
              className="w-full h-[280px] sm:h-[380px] md:h-[480px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* Floating trust badge */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 sm:px-5 py-3 sm:py-4 shadow-lg flex items-center gap-3 sm:gap-4">
                <div className="flex -space-x-1.5 sm:-space-x-2">
                  <img src="https://framerusercontent.com/images/0elBPCnVPoUS5prUTLUTjJqpI8.png?width=200&height=200" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover object-top border-2 border-white" alt="Twan" />
                  <img src="https://framerusercontent.com/images/xKg3KCie4yhQiZkpkuFJEPQVsI.png?width=200&height=200" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover object-top border-2 border-white" alt="Mariana" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Persoonlijke begeleiding</p>
                  <p className="text-xs text-gray-500 hidden sm:block">door gecertificeerde fysiotherapeuten</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}