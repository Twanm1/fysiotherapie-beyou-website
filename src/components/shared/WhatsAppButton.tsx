'use client'

import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock } from 'lucide-react';

import { CONTACT } from '@/lib/contact-info';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const phoneNumber = CONTACT.whatsapp.tel.replace('+', '');

  const handleSend = () => {
    if (!message.trim()) return;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    const newWindow = window.open(whatsappUrl, '_blank');
    
    // Focus the new window if it exists
    if (newWindow) {
      newWindow.focus();
    }
    
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed z-50 w-[min(24rem,calc(100vw-2rem))] bg-white rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{
            bottom: 'max(5.5rem, calc(1.5rem + 3.5rem + env(safe-area-inset-bottom)))',
            right: 'max(1.5rem, env(safe-area-inset-right))',
            boxShadow: '0 8px 48px rgba(69, 134, 255, 0.14), 0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm leading-tight">Fysiotherapie BeYou</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-gray-600 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-2 text-xs text-gray-600 bg-white/60 rounded-xl px-3 py-2 w-fit">
              <Clock className="w-3.5 h-3.5" />
              <span>Ma-Vr 08:00 - 18:00 · Za 10:00 - 11:30</span>
            </div>
          </div>

          {/* Message Preview */}
          <div className="p-6 bg-white/50">
            <div className="bg-white rounded-2xl p-4 border border-gray-100/50">
              <p className="text-sm text-gray-700 leading-relaxed">
                Hallo! 👋 Hoe kunnen we je helpen? Stel je vraag en we antwoorden je zo snel mogelijk.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="px-6 py-4 bg-white border-t border-gray-100/50 flex items-end gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Typ je bericht..."
              className="flex-1 bg-gray-50 border border-gray-200/60 rounded-2xl px-4 py-3 text-base sm:text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-11 h-11 rounded-full bg-primary hover:bg-primary/90 disabled:bg-gray-200 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all flex-shrink-0 shadow-sm hover:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-50 bg-primary hover:bg-primary/90 text-white rounded-full min-w-14 min-h-14 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center gap-2 group touch-manipulation"
        style={{ boxShadow: '0 4px 20px rgba(69, 134, 255, 0.3)' }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="sr-only">Chat met ons via WhatsApp</span>
      </button>
    </>
  );
}