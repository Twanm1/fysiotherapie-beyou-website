# Fysiotherapie BeYou — Website

Next.js 15 (App Router) + TypeScript website voor Fysiotherapie BeYou in Schipluiden.

## Ontwikkeling

```bash
npm install
npm run dev
```

De site draait op [http://localhost:3000](http://localhost:3000).

## Configuratie

Kopieer `.env.example` naar `.env.local` en pas aan:

| Variabele | Beschrijving |
|-----------|--------------|
| `ADMIN_PASSWORD` | Server-side wachtwoord voor `/admin/blog` |
| `CONTACT_EMAIL` | Ontvanger van contactformulier |
| `SENDGRID_API_KEY` | SendGrid API-key (contactformulier + bevestigingsmail) |
| `SENDGRID_FROM_EMAIL` | Geverifieerd afzenderadres in SendGrid |
| `SENDGRID_FROM_NAME` | Optioneel: weergavenaam afzender (standaard: Fysiotherapie BeYou) |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Browser-key voor live Google reviews (homepage) |
| `GOOGLE_PLACES_API_KEY` | Server-key voor `/api/google-reviews` (aanbevolen, aparte key) |
| `SITE_URL` | Productiedomein (voor Google API-requests) |

### Google Reviews instellen

1. Vul API-keys in `.env.local` (zie stappen in `.env.example`)
2. Test: `npm run google-reviews:check`
3. Start site: `npm run live`
4. Controleer: `http://localhost:3000/api/google-reviews` → `"live": true`
5. Zet dezelfde variabelen op je hosting (productie)

## Scripts

- `npm run dev` — development server (poort 3000)
- `npm run dev:clean` — schone `.next` cache + dev server
- `npm run build` — productie build
- `npm run start` — productie server
- `npm run start:clean` — schone build + productie server
- `npm run typecheck` — TypeScript controle
- `npm run google-reviews:check` — test Google Places API-keys

## Architectuur (100% Next.js App Router)

| Onderdeel | Locatie |
|-----------|---------|
| Routes & metadata | `src/app/` |
| Pagina-inhoud | `src/components/pages/` |
| UI & layout | `src/components/` |
| Server data (blog) | `src/lib/blog-server.ts` |
| API routes | `src/app/api/` |
| Middleware (auth, redirects) | `src/middleware.ts` |

Geen Vite, geen React Router, geen aparte SPA-build. Alle pagina's worden via Next.js gerenderd (SSR/SSG waar mogelijk).

## Blog beheer

Ga naar `/admin/blog` om blog posts te beheren. Posts worden server-side opgeslagen in `src/data/blog-posts.json` via API routes.

## Contactformulier

Het contactformulier verstuurt via de server-side API route (`/api/contact`).

**Met SendGrid** (aanbevolen): bezoekers ontvangen automatisch een bevestigingsmail. Zet in `.env.local`:

- `SENDGRID_API_KEY` — API-key uit [SendGrid](https://sendgrid.com/)
- `SENDGRID_FROM_EMAIL` — geverifieerd afzenderadres (bijv. `info@fysiotherapiebeyou.nl`)
- `CONTACT_EMAIL` — waar nieuwe berichten binnenkomen

De afzender moet in SendGrid geverifieerd zijn (Single Sender Verification of Domain Authentication).

**Zonder SendGrid** valt de route terug op [FormSubmit](https://formsubmit.co) (geen bevestigingsmail naar de bezoeker).
