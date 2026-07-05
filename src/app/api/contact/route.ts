import { NextRequest, NextResponse } from 'next/server'
import { checkContactRateLimit } from '@/lib/contact-rate-limit'
import { sendViaFormSubmit } from '@/lib/formsubmit-mail'
import { isSendGridConfigured, sendContactEmails } from '@/lib/sendgrid-mail'
import type { ContactFormPayload } from '@/lib/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown'
  )
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  const rateLimit = checkContactRateLimit(ip)

  if (rateLimit.ok === false) {
    return NextResponse.json(
      { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSec) },
      }
    )
  }

  let body: ContactFormPayload
  try {
    body = (await request.json()) as ContactFormPayload
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek' }, { status: 400 })
  }

  const { name, email, phone, message, source, website } = body

  if (website?.trim()) {
    return NextResponse.json({ success: true, confirmationSent: false })
  }

  const trimmedName = name?.trim()
  const trimmedEmail = email?.trim()
  const trimmedMessage = message?.trim()

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ error: 'Vul alle verplichte velden in' }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json({ error: 'Vul een geldig e-mailadres in' }, { status: 400 })
  }

  if (trimmedName.length > 120 || trimmedMessage.length > 5000) {
    return NextResponse.json({ error: 'Bericht is te lang' }, { status: 400 })
  }

  const payload = {
    name: trimmedName,
    email: trimmedEmail,
    phone: phone?.trim() || 'Niet opgegeven',
    message: trimmedMessage,
    source: source?.trim() || 'website',
  }

  try {
    if (isSendGridConfigured()) {
      await sendContactEmails(payload)
      return NextResponse.json({ success: true, confirmationSent: true, provider: 'sendgrid' })
    }

    await sendViaFormSubmit(payload)
    return NextResponse.json({ success: true, confirmationSent: false, provider: 'formsubmit' })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact mail error:', err)
    }
    return NextResponse.json({ error: 'Verzenden mislukt' }, { status: 502 })
  }
}
