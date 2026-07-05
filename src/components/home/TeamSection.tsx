'use client'

import Link from "next/link"
import React from 'react';
import { ArrowRight } from 'lucide-react';

const team = [
  {
    name: 'Twan Mosch',
    role: 'Fysiotherapeut/Leefstijlcoach',
    image: 'https://framerusercontent.com/images/0elBPCnVPoUS5prUTLUTjJqpI8.png?width=1080&height=1080',
    link: '/fysiotherapeuten/twan-mosch',
  },
  {
    name: 'Mariana Cobo',
    role: 'Fysiotherapeut',
    image: 'https://framerusercontent.com/images/xKg3KCie4yhQiZkpkuFJEPQVsI.png?width=1080&height=1080',
    link: '/fysiotherapeuten/mariana-cobo',
  },
];

export default function TeamSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          <span className="text-xs uppercase font-semibold tracking-widest text-gray-600">Ons team</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">Maak kennis met ons team</h2>
          <Link href="/fysiotherapeuten" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 shrink-0">
            Bekijk het team <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {team.map((member) => (
            <Link key={member.name} href={member.link} className="group block">
               <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="overflow-hidden h-80 sm:h-96 bg-gray-100 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{member.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{member.role}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                  </div>
                </div>
              </Link>
           ))}
        </div>
      </div>
    </section>
  );
}