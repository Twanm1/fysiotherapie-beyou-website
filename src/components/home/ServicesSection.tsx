'use client'

import Link from "next/link"
import React from 'react';
import { ArrowRight, PersonStanding, Dumbbell, Heart } from 'lucide-react';

const services = [
  {
    title: 'Fysiotherapie BeYou',
    description: 'Behandeling en begeleiding bij lichamelijke klachten, gericht op herstel van beweging, functie en dagelijks welzijn.',
    link: '/diensten/fysiotherapie',
    Icon: PersonStanding,
  },
  {
    title: 'Trainingen BeYou',
    description: 'Begeleide en laagdrempelige training gericht op het verbeteren van kracht, lenigheid, snelheid en coördinatie, met aandacht voor functionele spierketens.',
    link: '/diensten/trainingen',
    Icon: Dumbbell,
  },
  {
    title: 'Leefstijlcoaching BeYou',
    description: 'Leefstijlcoaching in de Gecombineerde Leefstijl Interventie (GLI). Je hoeft het niet alleen te doen. Gezonde gewoontes bouw je samen.',
    link: '/diensten/leefstijlcoaching',
    Icon: Heart,
  },
];

export default function ServicesSection() {
  return (
    <section className="section-padding section-tinted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Diensten</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-3xl mx-auto leading-tight px-4">
            Onze zorg in beweging
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.link} className="group block h-full">
              <div className="service-card">
                <div className="service-card__icon">
                  <service.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" strokeWidth={1.5} />
                </div>

                <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">{service.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 sm:mb-8 flex-1">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-200">
                  Ontdek meer <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}