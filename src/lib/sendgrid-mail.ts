import sgMail from '@sendgrid/mail'
import { CONTACT } from './contact-info'

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
          <p style="margin:0;">${CONTACT.address.line}<br>
          <a href="tel:${CONTACT.whatsapp.tel}" style="color:#4586ff;text-decoration:none;">${CONTACT.whatsapp.label} ${CONTACT.whatsapp.display} ${CONTACT.whatsapp.recommendedLabel}</a> ·
          <a href="tel:${CONTACT.practicePhone.tel}" style="color:#4586ff;text-decoration:none;">${CONTACT.practicePhone.display}</a> ·
          <a href="mailto:${CONTACT.email}" style="color:#4586ff;text-decoration:none;">${CONTACT.email}</a></p>
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
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#111827;">Beste ${escapeHtml(firstName)},</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">
      Bedankt voor uw aanvraag bij Fysiotherapie BeYou.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">
      Wij hebben uw aanvraag in goede orde ontvangen. Een van onze medewerkers neemt zo spoedig mogelijk
      contact met u op om uw hulpvraag te bespreken en, indien gewenst, direct een afspraak in te plannen.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#374151;">
      Wij streven ernaar om <strong>binnen 24 uur</strong> contact met u op te nemen. In uitzonderlijke gevallen
      kan dit door drukte of andere omstandigheden oplopen tot 48 uur. Uiteraard doen wij ons uiterste best
      om u zo snel mogelijk te helpen.
    </p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#374151;">
      In de tussentijd kunt u alvast een kijkje nemen op onze
      <a href="${SITE_URL}/blog" style="color:#4586ff;text-decoration:none;font-weight:600;">blogpagina</a>.
      Hier vindt u praktische informatie en tips over veelvoorkomende klachten, behandelingen en gezondheid.
    </p>
    <div style="padding:16px;background:#f9fafb;border-radius:12px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280;">Uw bericht</p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#374151;">
      Met vriendelijke groet,<br>
      <strong>Team Fysiotherapie BeYou</strong>
    </p>
    <p style="margin:16px 0 0;font-size:14px;line-height:1.8;color:#374151;">
      WhatsApp: <a href="${CONTACT.whatsapp.waMe}" style="color:#4586ff;text-decoration:none;">${CONTACT.whatsapp.display}</a><br>
      E-mail: <a href="mailto:${CONTACT.email}" style="color:#4586ff;text-decoration:none;">${CONTACT.email}</a><br>
      Website: <a href="${SITE_URL}" style="color:#4586ff;text-decoration:none;">www.fysiotherapiebeyou.nl</a>
    </p>
  `)
}

export function isSendGridConfigured() {
  return Boolean(process.env.SENDGRID_API_KEY?.trim() && process.env.SENDGRID_FROM_EMAIL?.trim())
}

export async function sendContactEmails(payload: ContactMailPayload) {
  const apiKey = process.env.SENDGRID_API_KEY?.trim()
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim()
  const contactEmail = process.env.CONTACT_EMAIL?.trim() || CONTACT.email

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
      subject: `Bevestiging van uw aanvraag — ${SITE_NAME}`,
      html: confirmationEmailHtml(payload),
      text: [
        `Beste ${payload.name.split(/\s+/)[0] || payload.name},`,
        '',
        'Bedankt voor uw aanvraag bij Fysiotherapie BeYou.',
        '',
        'Wij hebben uw aanvraag in goede orde ontvangen. Een van onze medewerkers neemt zo spoedig mogelijk contact met u op om uw hulpvraag te bespreken en, indien gewenst, direct een afspraak in te plannen.',
        '',
        'Wij streven ernaar om binnen 24 uur contact met u op te nemen. In uitzonderlijke gevallen kan dit door drukte of andere omstandigheden oplopen tot 48 uur. Uiteraard doen wij ons uiterste best om u zo snel mogelijk te helpen.',
        '',
        `In de tussentijd kunt u alvast een kijkje nemen op onze blogpagina: ${SITE_URL}/blog. Hier vindt u praktische informatie en tips over veelvoorkomende klachten, behandelingen en gezondheid.`,
        '',
        'Uw bericht:',
        payload.message,
        '',
        'Met vriendelijke groet,',
        '',
        'Team Fysiotherapie BeYou',
        '',
        `WhatsApp: ${CONTACT.whatsapp.display}`,
        `E-mail: ${CONTACT.email}`,
        'Website: www.fysiotherapiebeyou.nl',
      ].join('\n'),
    },
  ])
}
