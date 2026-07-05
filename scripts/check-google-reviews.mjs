/**
 * Controleer Google Reviews API-keys en test de Places API.
 * Gebruik: npm run google-reviews:check
 */
import fs from 'fs'
import path from 'path'
import net from 'net'

const ROOT = process.cwd()
const ENV_PATH = path.join(ROOT, '.env.local')
const PLACE_ID = 'ChIJaVI-Q_e1xUcRY-lMTA9ZRcA'
const SITE_ORIGIN = 'https://www.fysiotherapiebeyou.nl'
const PORT = Number(process.env.PORT || 3000)

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const env = {}
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    env[key] = value
  }
  return env
}

function maskKey(key) {
  if (!key) return '(niet ingesteld)'
  if (key.length <= 8) return '****'
  return `${key.slice(0, 6)}…${key.slice(-4)}`
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ port, host: '127.0.0.1' }, () => {
      socket.end()
      resolve(true)
    })
    socket.on('error', () => resolve(false))
  })
}

function printSection(title) {
  console.log(`\n── ${title} ${'─'.repeat(Math.max(0, 50 - title.length))}`)
}

async function testPlacesApiNew(apiKey) {
  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=nl`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
      'Accept-Language': 'nl',
      Referer: `${SITE_ORIGIN}/`,
      Origin: SITE_ORIGIN,
    },
  })
  const body = await response.text()
  return { ok: response.ok, status: response.status, body }
}

async function testPlacesApiLegacy(apiKey) {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.set('place_id', PLACE_ID)
  url.searchParams.set('fields', 'rating,user_ratings_total,reviews')
  url.searchParams.set('language', 'nl')
  url.searchParams.set('key', apiKey)

  const response = await fetch(url, {
    headers: { Referer: `${SITE_ORIGIN}/`, Origin: SITE_ORIGIN },
  })
  const body = await response.text()
  return { ok: response.ok, status: response.status, body }
}

async function testLocalApi() {
  const response = await fetch(`http://localhost:${PORT}/api/google-reviews`)
  const payload = await response.json()
  return { ok: response.ok, status: response.status, payload }
}

console.log('\n=== Google Reviews — API check ===\n')

if (!fs.existsSync(ENV_PATH)) {
  console.log('❌ .env.local ontbreekt')
  console.log('   Kopieer .env.example naar .env.local en vul je API-keys in.')
  process.exit(1)
}

const env = loadEnvFile(ENV_PATH)
const browserKey = env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY?.trim() ?? ''
const serverKey = env.GOOGLE_PLACES_API_KEY?.trim() ?? ''
const effectiveServerKey = serverKey || browserKey

printSection('API-keys in .env.local')
console.log(`  Browser (NEXT_PUBLIC_GOOGLE_PLACES_API_KEY): ${maskKey(browserKey)}`)
console.log(`  Server  (GOOGLE_PLACES_API_KEY):             ${maskKey(serverKey)}`)

if (!browserKey && !serverKey) {
  console.log('\n❌ Geen API-key gevonden.')
  console.log('   Zet minimaal NEXT_PUBLIC_GOOGLE_PLACES_API_KEY in .env.local')
  console.log('   Aanbevolen: ook GOOGLE_PLACES_API_KEY (aparte server-key).')
  process.exit(1)
}

if (!browserKey) {
  console.log('\n⚠️  Browser-key ontbreekt — homepage kan geen live reviews laden in de browser.')
}

if (!serverKey) {
  console.log('\n⚠️  Server-key ontbreekt — fallback /api/google-reviews gebruikt de browser-key.')
  console.log('   Maak voor productie een aparte key ZONDER referrer-beperking (aanbevolen).')
} else if (serverKey === browserKey) {
  console.log('\n⚠️  Zelfde key voor browser én server.')
  console.log('   Server-API faalt vaak met referrer-beperking. Maak een tweede key:')
  console.log('   • GOOGLE_PLACES_API_KEY → Application restrictions: None')
  console.log('   • NEXT_PUBLIC_... → HTTP referrers (localhost + je domein)')
}

let apiOk = false

printSection('Google Places API (New) test')
try {
  const result = await testPlacesApiNew(effectiveServerKey)
  if (result.ok) {
    const data = JSON.parse(result.body)
    const reviewCount = data.reviews?.length ?? 0
    console.log('  ✅ Verbinding OK')
    console.log(`  Rating: ${data.rating ?? '—'} (${data.userRatingCount ?? 0} reviews op Google)`)
    console.log(`  Reviews via API: ${reviewCount} (Google geeft max. ~5 per request)`)
    apiOk = true
  } else {
    console.log(`  ❌ Fout ${result.status}`)
    console.log(`  ${result.body.slice(0, 300)}`)
    console.log('\n  Controleer in Google Cloud Console:')
    console.log('  • Billing aan')
    console.log('  • Places API (New) ingeschakeld')
    console.log('  • Maps JavaScript API ingeschakeld (voor browser)')
    console.log('  • Referrers: http://localhost:* en https://www.fysiotherapiebeyou.nl/*')
    console.log('  • API restrictions: Places API (New) + Places API moeten aangevinkt staan')

    printSection('Legacy Places API test (fallback)')
    try {
      const legacy = await testPlacesApiLegacy(effectiveServerKey)
      if (legacy.ok) {
        const data = JSON.parse(legacy.body)
        if (data.status === 'OK') {
          console.log(`  ✅ Legacy API werkt (rating: ${data.result?.rating ?? '—'})`)
          console.log('  Tip: schakel ook Places API (New) in voor de beste ondersteuning.')
          apiOk = true
        } else {
          console.log(`  ❌ ${data.status}: ${data.error_message ?? legacy.body.slice(0, 200)}`)
        }
      } else {
        console.log(`  ❌ Fout ${legacy.status}`)
      }
    } catch (legacyErr) {
      console.log(`  ❌ ${legacyErr instanceof Error ? legacyErr.message : legacyErr}`)
    }
  }
} catch (err) {
  console.log(`  ❌ Netwerkfout: ${err instanceof Error ? err.message : err}`)
}

if (!apiOk) {
  process.exit(1)
}

const serverRunning = await isPortOpen(PORT)
if (serverRunning) {
  printSection(`Lokale site (localhost:${PORT})`)
  try {
    const { ok, payload } = await testLocalApi()
    if (ok && !payload.error) {
      console.log('  ✅ /api/google-reviews werkt')
      console.log(`  Reviews op homepage-route: ${payload.reviews?.length ?? 0}`)
      console.log(`  Live data: ${payload.live ? 'ja' : 'nee (fallback)'}`)
    } else {
      console.log('  ⚠️  API antwoordt maar met fout:')
      console.log(`  ${payload.error ?? 'onbekend'}`)
    }
  } catch {
    console.log('  ⚠️  Kon /api/google-reviews niet bereiken')
  }
} else {
  printSection('Lokale site')
  console.log(`  ℹ️  Geen server op poort ${PORT}. Start met: npm run live`)
}

printSection('Volgende stap')
console.log('  1. npm run live')
console.log('  2. Open http://localhost:3000 → scroll naar reviews')
console.log('  3. Ctrl+Shift+R (hard refresh)')
console.log('  4. Zet dezelfde keys op je hosting (Vercel/hosting env vars)\n')
