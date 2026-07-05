import sgMail from '@sendgrid/mail'

const SITE_NAME = 'Fysiotherapie BeYou'
const SITE_URL = (process.env.SITE_URL ?? 'https://www.fysiotherapiebeyou.nl').replace(/\/$/, '')

export type ContactMailPayload = {
  name: string
  email: string
  phone: string
  message: string
  source: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function emailLayout(content: string) {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="background:linear-gradient(135deg,#4586ff,#2563eb);padding:24px 28px;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">${SITE_NAME}</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.9);">Schipluiden</p>
        </td></tr>
        <tr><td style="padding:28px;">${content}</td></tr>
        <tr><td style="padding:0 28px 24px;font-size:12px;line-height:1.6;color:#6b7280;">
          <p style="margin:0;">Burgemeester Musquetiersingel 8A · 2636 GE Schipluiden<br>
          <a href="tel:+31618665863" style="color:#4586ff;text-decoration:none;">+31 6 18665863</a> ·
          <a href="mailto:info@fysiotherapiebeyou.nl" style="color:#4586ff;text-decoration:none;">info@fysiotherapiebeyou.nl</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function staffEmailHtml(payload: ContactMailPayload) {
  const { name, email, phone, message, source } = payload
  return emailLayout(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">Nieuw contactbericht</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">Via ${escapeHtml(source)} op de website</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.6;">
      <tr><td style="padding:8px 0;color:#6b7280;width:120px;vertical-align:top;">Naam</td><td style="padding:8px 0;color:#111827;font-weight:600;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}" style="color:#4586ff;">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;">Telefoon</td><td style="padding:8px 0;color:#111827;">${escapeHtml(phone)}</td></tr>
    </table>
    <div style="margin-top:20px;padding:16px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Bericht</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `)
}

function confirmationEmailHtml(payload: ContactMailPayload) {
  const firstName = payload.name.trim().split(/\s+/)[0] || payload.name
  return emailLayout(`
    <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">Bedankt voor je bericht, ${escapeHtml(firstName)}!</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">
      We hebben je bericht in goede orde ontvangen. We nemen doorgaans <strong>binnen één werkdag</strong> contact met je op.
    </p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:#6b7280;">
      Geen verwijzing nodig — je kunt altijd direct bij ons terecht voor fysiotherapie, training of leefstijlcoaching.
    </p>
    <div style="padding:16px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Jouw bericht</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
    <p style="margin:20px 0 0;font-size:14px;line-height:1.7;color:#374151;">
      Spoed of liever bellen? Neem contact op via <a href="tel:+31618665863" style="color:#4586ff;text-decoration:none;">+31 6 18665863</a>.
    </p>
    <p style="margin:16px 0 0;font-size:14px;">
      <a href="${SITE_URL}" style="display:inline-block;background:#4586ff;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px;font-size:14px;">Bezoek onze website</a>
    </p>
  `)
}

export function isSendGridConfigured() {
  return Boolean(process.env.SENDGRID_API_KEY?.trim() && process.env.SENDGRID_FROM_EMAIL?.trim())
}

export async function sendContactEmails(payload: ContactMailPayload) {
  const apiKey = process.env.SENDGRID_API_KEY?.trim()
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim()
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || 'info@fysiotherapiebeyou.nl'

  if (!apiKey || !fromEmail) {
    throw new Error('SendGrid is niet geconfigureerd (SENDGRID_API_KEY / SENDGRID_FROM_EMAIL)')
  }

  sgMail.setApiKey(apiKey)

  const fromName = process.env.SENDGRID_FROM_NAME?.trim() || SITE_NAME

  await sgMail.send([
    {
      to: contactEmail,
      from: { email: fromEmail, name: fromName },
      replyTo: { email: payload.email, name: payload.name },
      subject: `Nieuw contactbericht via website (${payload.source})`,
      html: staffEmailHtml(payload),
      text: [
        `Nieuw contactbericht via ${payload.source}`,
        '',
        `Naam: ${payload.name}`,
        `E-mail: ${payload.email}`,
        `Telefoon: ${payload.phone}`,
        '',
        payload.message,
      ].join('\n'),
    },
    {
      to: { email: payload.email, name: payload.name },
      from: { email: fromEmail, name: fromName },
      replyTo: { email: contactEmail, name: fromName },
      subject: `Bevestiging van je bericht — ${SITE_NAME}`,
      html: confirmationEmailHtml(payload),
      text: [
        `Bedankt voor je bericht, ${payload.name.split(/\s+/)[0] || payload.name}!`,
        '',
        'We hebben je bericht ontvangen en nemen doorgaans binnen één werkdag contact met je op.',
        '',
        'Jouw bericht:',
        payload.message,
        '',
        `Telefoon: +31 6 18665863`,
        `Website: ${SITE_URL}`,
      ].join('\n'),
    },
  ])
}
