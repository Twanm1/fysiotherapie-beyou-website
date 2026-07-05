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
    <section className="section-padding bg-white">
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
            <div
              key={service.title}
              className="rounded-2xl p-6 sm:p-8 bg-white border border-gray-100 shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/8 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-primary/12 transition-all duration-300">
                <service.Icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary" strokeWidth={1.5} />
              </div>

              <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-3 sm:mb-4">{service.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 sm:mb-8 flex-1">{service.description}</p>
              <Link href={service.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-200 group/link"
              >
                Ontdek meer <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}