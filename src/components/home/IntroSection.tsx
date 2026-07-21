'use client'

import React from 'react';

export default function IntroSection() {
  return (
    <section className="section-padding relative bg-white">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Fysiotherapie BeYou</span>
        </div>
        <blockquote className="mb-8 sm:mb-12">
          <p className="text-3xl font-bold tracking-tight text-primary leading-normal sm:text-4xl md:text-5xl lg:text-6xl">
            &ldquo;Wat beweegt jou&rdquo;
          </p>
        </blockquote>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
          Bij BeYou kijken we naar het geheel. Jouw lichaam, jouw verhaal en jouw doelen. Met een persoonlijke aanpak en gerichte behandelingen werken we samen aan duurzaam herstel en een leven waarin jij weer kunt doen wat jou beweegt.
        </p>
      </div>
    </section>
  );
}