export const CONTACT = {
  email: 'info@fysiotherapiebeyou.nl',
  whatsapp: {
    label: 'WhatsApp',
    display: '06 18665863',
    tel: '+31618665863',
    waMe: 'https://wa.me/31618665863',
    recommended: true,
    recommendedLabel: '(aanbevolen)',
  },
  practicePhone: {
    label: 'Praktijktelefoon',
    display: '015 380 8924',
    tel: '+31153808924',
  },
  address: {
    street: 'Burgemeester Musquetiersingel 8A',
    postalCode: '2636 GE',
    city: 'Schipluiden',
    line: 'Burgemeester Musquetiersingel 8A, 2636 GE Schipluiden',
  },
} as const

export function whatsappContactLine() {
  const line = `${CONTACT.whatsapp.label}: ${CONTACT.whatsapp.display}`
  return CONTACT.whatsapp.recommended ? `${line} ${CONTACT.whatsapp.recommendedLabel}` : line
}

export function contactPhoneSummary() {
  return `${whatsappContactLine()} of bel ${CONTACT.practicePhone.display}`
}
