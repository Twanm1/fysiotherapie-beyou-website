const BASE = process.env.BASE_URL || 'http://localhost:3005'

const pages = [
  '/',
  '/visie',
  '/diensten',
  '/diensten/fysiotherapie',
  '/diensten/fysiotherapieschipluiden',
  '/diensten/leefstijlcoaching',
  '/diensten/leefstijlcoaching-schipluiden',
  '/diensten/trainingen',
  '/diensten/beyou-trainingenschipluiden',
  '/fysiotherapeuten',
  '/fysiotherapeuten/twan-mosch',
  '/fysiotherapeuten/mariana-cobo',
  '/blog',
  '/blog/waarom-langdurige-rugpijn-w%C3%A9l-over-kan-gaan',
  '/blog/hoe-leefstijlverandering-%C3%A9cht-werkt',
  '/contact',
  '/voorwaarden',
  '/privacyverklaring',
  '/klachtenregeling',
  '/disclaimer',
  '/robots.txt',
  '/sitemap.xml',
]

const redirects = [
  ['/blogs', '/blog'],
  ['/blogs/waarom-langdurige-rugpijn-w%C3%A9l-over-kan-gaan', '/blog/waarom-langdurige-rugpijn-w%C3%A9l-over-kan-gaan'],
  ['/blog/waarom-langdurige-rugpijn-wel-over-kan-gaan', '/blog/waarom-langdurige-rugpijn-w%C3%A9l-over-kan-gaan'],
  ['/aanmelden', '/contact'],
  ['/privacy', '/privacyverklaring'],
  ['/team', '/fysiotherapeuten'],
  ['/Home', '/'],
]

const contentChecks = [
  { path: '/', must: ['Maak een afspraak', 'Wat beweegt jou'] },
  { path: '/contact', must: ['Virtuele rondleiding', 'CAoSHENJQUJJaEJXVC1hUF9ySkpVWmdTbnhhODRLQlY', 'maps.google.com/maps?q=Fysiotherapie'] },
  { path: '/contact', mustNot: ['CIABIhD6iSw', 'Google Maps Platform rejected', 'Microkracht'] },
  { path: '/blog/waarom-langdurige-rugpijn-w%C3%A9l-over-kan-gaan', must: ['Waarom langdurige rugpijn', 'Wanneer pijn niet meer'] },
]

const failures = []
const passes = []

async function checkPage(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'follow' })
  if (res.status !== 200) {
    failures.push(`PAGE ${path} -> ${res.status}`)
    return null
  }
  passes.push(`PAGE ${path} -> 200`)
  return res.text()
}

async function checkRedirect(from, expectedTo) {
  const res = await fetch(`${BASE}${from}`, { redirect: 'manual' })
  const loc = res.headers.get('location') || ''
  const ok = res.status >= 300 && res.status < 400 && loc.includes(expectedTo)
  if (ok) passes.push(`REDIRECT ${from} -> ${loc}`)
  else failures.push(`REDIRECT ${from} -> ${res.status} ${loc} (expected ${expectedTo})`)
}

async function main() {
  console.log(`Pre-live check on ${BASE}\n`)

  for (const path of pages) {
    await checkPage(path)
  }

  for (const [from, to] of redirects) {
    await checkRedirect(from, to)
  }

  for (const check of contentChecks) {
    const html = await checkPage(check.path)
    if (!html) continue
    for (const text of check.must || []) {
      if (!html.includes(text)) failures.push(`CONTENT ${check.path} missing: ${text}`)
      else passes.push(`CONTENT ${check.path} has: ${text.slice(0, 40)}`)
    }
    for (const text of check.mustNot || []) {
      if (html.includes(text)) failures.push(`CONTENT ${check.path} should NOT have: ${text}`)
    }
  }

  // APIs
  const reviews = await fetch(`${BASE}/api/google-reviews`)
  if (reviews.ok) {
    const data = await reviews.json()
    if (Array.isArray(data.reviews) && data.reviews.length > 0) passes.push('API /api/google-reviews -> reviews OK')
    else failures.push('API /api/google-reviews -> no reviews')
  } else failures.push(`API /api/google-reviews -> ${reviews.status}`)

  const contactBad = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', email: 'bad', message: '' }),
  })
  if (contactBad.status === 400) passes.push('API /api/contact validation -> 400 OK')
  else failures.push(`API /api/contact validation -> ${contactBad.status}`)

  const blogPosts = JSON.parse(await (await import('fs')).promises.readFile('src/data/blog-posts.json', 'utf8'))
  for (const post of blogPosts.filter((p) => p.published)) {
    const slugEnc = encodeURIComponent(post.slug).replace(/%20/g, '+')
    const res = await fetch(`${BASE}/blog/${slugEnc}`, { redirect: 'follow' })
    if (res.status !== 200) failures.push(`BLOG ${post.slug} -> ${res.status}`)
    else passes.push(`BLOG ${post.slug} -> 200`)
  }

  console.log(`\n=== PASSED: ${passes.length} ===`)
  if (failures.length) {
    console.log(`\n=== FAILED: ${failures.length} ===`)
    failures.forEach((f) => console.log('  ✗', f))
    process.exit(1)
  }
  console.log('\nAll checks passed.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
