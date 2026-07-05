'use client'

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useMounted } from '@/lib/use-mounted';

import { FAQ_ITEMS } from '@/data/faq';

const faqs = FAQ_ITEMS;

export function FAQFallback() {
  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-gray-200 bg-white px-6 py-5"
        >
          <p className="text-sm font-semibold text-gray-900">{faq.question}</p>
        </div>
      ))}
    </div>
  );
}

export default function FAQ() {
  const mounted = useMounted();

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="text-sm font-medium text-gray-600">Veelgestelde vragen</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
              Alles wat je<br />wilt weten
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Heb je een andere vraag? Neem gerust contact met ons op via het contactformulier of bel ons direct.
            </p>
          </div>

          <div>
            {mounted ? (
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`item-${idx}`}
                    className="rounded-2xl border border-gray-200 bg-white px-6 overflow-hidden transition-all duration-300 hover:border-primary/10 data-[state=open]:border-primary/20 data-[state=open]:shadow-sm"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-gray-900 hover:text-primary py-5 text-left transition-colors duration-200">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <FAQFallback />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}