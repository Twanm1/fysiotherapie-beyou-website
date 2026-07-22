'use client'

import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Intake & Onderzoek',
    description: 'We brengen jouw hulpvraag, klachten en bewegingspatroon zorgvuldig in kaart.',
    image: '/images/process/intake.png',
  },
  {
    number: '02',
    title: 'Uitleg & Behandelplan',
    description: 'Je krijgt een heldere uitleg over de oorzaak van jouw klachten en een behandelplan op maat.',
    image: '/images/process/behandeling.png',
  },
  {
    number: '03',
    title: 'Behandeling & Afronding',
    description: 'Herstel is het begin – indien gewenst begeleiden we je ook in het versterken van jouw balans en weerbaarheid.',
    image: '/images/process/resultaat.png',
  },
];

export default function ProcessSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Werkwijze</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight px-4">
            Jouw traject bij BeYou
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="overflow-hidden h-48 sm:h-56 relative">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xs sm:text-sm font-bold text-primary mb-4 sm:mb-5 inline-flex shrink-0">
                  {step.number}
                </span>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2 sm:mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}