export const CONTACT = {
  email: 'info@fysiotherapiebeyou.nl',
  whatsapp: {
    label: 'WhatsApp',
    display: '06 18665863',
    tel: '+31618665863',
    waMe: 'https://wa.me/31618665863',
    recommended: true,
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

export function contactPhoneSummary() {
  return `WhatsApp ${CONTACT.whatsapp.display} of bel ${CONTACT.practicePhone.display}`
}
