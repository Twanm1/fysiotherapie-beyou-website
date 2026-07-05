'use client'

import React, { useState } from 'react';
import { submitContactForm } from "@/lib/api-client";
import { Phone, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm({ source = 'fysiotherapiebeyou', formTitle = 'We helpen je graag verder.' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClassName =
    'w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 transition-colors disabled:opacity-50'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await submitContactForm({
        ...form,
        source,
      });

      if (response.success) {
        setSubmitted(true);
        setConfirmationSent(Boolean(response.confirmationSent));
        setForm({ name: '', email: '', phone: '', message: '', website: '' });
      } else {
        setError('Er is een fout opgetreden bij het verzenden.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Er is een fout opgetreden bij het verzenden. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="page-container">
        <div className="mx-auto max-w-5xl rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Form — 2/3 width */}
            <div className="lg:col-span-2 p-6 sm:p-8 md:p-12 bg-white">
              {submitted ? (
                <div className="h-full flex items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-2xl font-semibold text-gray-900 mb-3">Bedankt!</p>
                    <p className="text-gray-700 text-base mb-6">
                      Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.
                      {confirmationSent && ' Je ontvangt ook een bevestiging per e-mail.'}
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setConfirmationSent(false);
                      }}
                      className="text-sm font-medium text-primary hover:text-blue-700"
                    >
                      Nog een bericht versturen
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                      <span className="text-sm font-medium text-gray-600">Contact</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">{formTitle}</h2>
                  </div>
                  {error && (
                    <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-200 mb-8">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900 mb-1">Oops, er is iets mis gegaan</p>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="relative space-y-6">
                    <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.website}
                        onChange={(e) => setForm({ ...form, website: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">Naam</label>
                        <input
                          id="contact-name"
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          disabled={loading}
                          className={inputClassName}
                          placeholder="Jouw naam"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">E-mail</label>
                        <input
                          id="contact-email"
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          disabled={loading}
                          className={inputClassName}
                          placeholder="jouw@email.nl"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">Telefoonnummer</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={loading}
                        className={inputClassName}
                        placeholder="+31 6 ..."
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-2">Bericht</label>
                      <textarea
                        id="contact-message"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        disabled={loading}
                        rows={4}
                        className={`${inputClassName} resize-none`}
                        placeholder="Hoe kunnen we je helpen?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-primary text-white px-8 py-3.5 text-base sm:text-sm font-semibold rounded-full hover:bg-primary/85 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 w-full shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-95 touch-manipulation"
                    >
                      {loading ? 'Bericht wordt verzonden...' : 'Verstuur bericht'}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar — light blue */}
            <div className="bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8 md:p-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contactgegevens</h3>
              <p className="text-gray-700 text-sm mb-10">
                We reageren doorgaans binnen één werkdag. Een verwijzing van de huisarts is niet nodig.
              </p>

              <div className="space-y-6">
                <a href="tel:+31618665863" className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                  <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </span>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">Telefoon / WhatsApp</p>
                    <p className="text-gray-900 font-medium">+31 6 18665863</p>
                  </div>
                </a>
                <a href="mailto:info@fysiotherapiebeyou.nl" className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors group">
                  <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </span>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">E-mail</p>
                    <p className="text-gray-900 font-medium">info@fysiotherapiebeyou.nl</p>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-sm">
                  <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </span>
                  <div>
                    <p className="text-xs text-gray-600 mb-0.5">Adres</p>
                    <p className="text-gray-900">Burgemeester Musquetiersingel 8A<br />2636 GE Schipluiden</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
