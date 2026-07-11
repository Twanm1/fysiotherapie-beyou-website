import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { CONTACT, whatsappContactLine } from '@/lib/contact-info'

type ContactDetailsProps = {
  variant?: 'sidebar' | 'inline' | 'footer'
  showAddress?: boolean
  showEmail?: boolean
  className?: string
}

export default function ContactDetails({
  variant = 'inline',
  showAddress = true,
  showEmail = true,
  className = '',
}: ContactDetailsProps) {
  if (variant === 'sidebar') {
    return (
      <div className={`space-y-6 ${className}`.trim()}>
        <a
          href={CONTACT.whatsapp.waMe}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors group"
        >
          <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
            <MessageCircle className="w-4 h-4 text-gray-600" />
          </span>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">
              {CONTACT.whatsapp.label}{' '}
              <span className="text-primary font-medium">{CONTACT.whatsapp.recommendedLabel}</span>
            </p>
            <p className="text-gray-900 font-medium">{CONTACT.whatsapp.display}</p>
          </div>
        </a>
        <a
          href={`tel:${CONTACT.practicePhone.tel}`}
          className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors group"
        >
          <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
            <Phone className="w-4 h-4 text-gray-600" />
          </span>
          <div>
            <p className="text-xs text-gray-600 mb-0.5">{CONTACT.practicePhone.label}</p>
            <p className="text-gray-900 font-medium">{CONTACT.practicePhone.display}</p>
          </div>
        </a>
        {showEmail && (
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-start gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors group"
          >
            <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
              <Mail className="w-4 h-4 text-gray-600" />
            </span>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">E-mail</p>
              <p className="text-gray-900 font-medium">{CONTACT.email}</p>
            </div>
          </a>
        )}
        {showAddress && (
          <div className="flex items-start gap-3 text-sm">
            <span className="w-9 h-9 rounded-xl bg-white/50 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-gray-600" />
            </span>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Adres</p>
              <p className="text-gray-900">
                {CONTACT.address.street}
                <br />
                {CONTACT.address.postalCode} {CONTACT.address.city}
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col gap-3 ${className}`.trim()}>
        <a
          href={CONTACT.whatsapp.waMe}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 min-h-11 flex items-center touch-manipulation"
        >
          {whatsappContactLine()}
        </a>
        <a
          href={`tel:${CONTACT.practicePhone.tel}`}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 min-h-11 flex items-center touch-manipulation"
        >
          {CONTACT.practicePhone.label}: {CONTACT.practicePhone.display}
        </a>
        {showEmail && (
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-2 min-h-11 flex items-center touch-manipulation"
          >
            {CONTACT.email}
          </a>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`.trim()}>
      <a
        href={CONTACT.whatsapp.waMe}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors py-2 min-h-11 touch-manipulation"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        <span>
          {CONTACT.whatsapp.label}: {CONTACT.whatsapp.display}{' '}
          <span className="text-primary font-medium">{CONTACT.whatsapp.recommendedLabel}</span>
        </span>
      </a>
      <a
        href={`tel:${CONTACT.practicePhone.tel}`}
        className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors py-2 min-h-11 touch-manipulation"
      >
        <Phone className="w-4 h-4 shrink-0" />
        <span>
          {CONTACT.practicePhone.label}: {CONTACT.practicePhone.display}
        </span>
      </a>
      {showEmail && (
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors py-2 min-h-11 touch-manipulation"
        >
          <Mail className="w-4 h-4 shrink-0" /> {CONTACT.email}
        </a>
      )}
      {showAddress && (
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> {CONTACT.address.line}
        </div>
      )}
    </div>
  )
}
