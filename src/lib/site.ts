export const SITE_URL = (process.env.SITE_URL ?? 'https://www.fysiotherapiebeyou.nl').replace(/\/$/, '')
export const SITE_NAME = 'Fysiotherapie BeYou'

export const DEFAULT_OG_IMAGE = '/images/hero-team.png'

export const TEAM_MEMBERS = [
  {
    name: 'Twan Mosch',
    role: 'Fysiotherapeut/Leefstijlcoach',
    image: '/images/team/twan-mosch.png',
    slug: 'twan-mosch',
  },
  {
    name: 'Mariana Cobo',
    role: 'Fysiotherapeut',
    image: '/images/team/mariana-cobo.png',
    slug: 'mariana-cobo',
  },
] as const

export type TeamMember = (typeof TEAM_MEMBERS)[number]

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug)
}
