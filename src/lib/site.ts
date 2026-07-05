export const SITE_URL = 'https://www.fysiotherapiebeyou.nl'
export const SITE_NAME = 'Fysiotherapie BeYou'

export const DEFAULT_OG_IMAGE = '/images/hero-team.png'

export const TEAM_MEMBERS = [
  {
    name: 'Twan Mosch',
    role: 'Fysiotherapeut/Leefstijlcoach',
    image: 'https://framerusercontent.com/images/0elBPCnVPoUS5prUTLUTjJqpI8.png?width=1080&height=1080',
    slug: 'twan-mosch',
  },
  {
    name: 'Mariana Cobo',
    role: 'Fysiotherapeut',
    image: 'https://framerusercontent.com/images/xKg3KCie4yhQiZkpkuFJEPQVsI.png?width=1080&height=1080',
    slug: 'mariana-cobo',
  },
] as const

export type TeamMember = (typeof TEAM_MEMBERS)[number]

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.slug === slug)
}
