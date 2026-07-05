/** Legacy slugs zonder accenten → canonieke blog-slugs in blog-posts.json */
export const BLOG_SLUG_ALIASES: Record<string, string> = {
  'waarom-langdurige-rugpijn-wel-over-kan-gaan': 'waarom-langdurige-rugpijn-wél-over-kan-gaan',
  'hoe-leefstijlverandering-echt-werkt': 'hoe-leefstijlverandering-écht-werkt',
  'belasting-vs-belastbaarheid': 'belasting-en-belastbaarheid-hoe-houd-je-de-balans',
}

export function normalizeBlogSlug(raw: string): string {
  let slug = raw
  try {
    slug = decodeURIComponent(raw)
  } catch {
    slug = raw
  }
  return slug.normalize('NFC').trim()
}

export function resolveBlogSlug(raw: string): string {
  const normalized = normalizeBlogSlug(raw)
  return BLOG_SLUG_ALIASES[normalized] ?? normalized
}
