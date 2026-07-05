const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@fysiotherapiebeyou.nl'

export type ContactMailPayload = {
  name: string
  email: string
  phone: string
  message: string
  source: string
}

/** Fallback wanneer SendGrid niet is geconfigureerd. Geen bevestigingsmail naar bezoeker. */
export async function sendViaFormSubmit(payload: ContactMailPayload) {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      source: payload.source,
      _subject: `Contact via website (${payload.source})`,
      _template: 'table',
      _captcha: 'false',
      _honeypot: 'website',
    }),
  })

  if (!response.ok) {
    throw new Error(`FormSubmit mislukt (${response.status})`)
  }

  const data = (await response.json()) as { success?: string | boolean }
  if (data.success !== 'true' && data.success !== true) {
    throw new Error('FormSubmit gaf geen succes terug')
  }
}
