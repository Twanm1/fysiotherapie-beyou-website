import Fysiotherapeuten from '@/components/pages/Fysiotherapeuten'
import JsonLd from '@/components/JsonLd'
import { createPageMetadata, personJsonLd } from '@/lib/seo'
import { getTeamMember, TEAM_MEMBERS } from '@/lib/site'
import { notFound } from 'next/navigation'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return TEAM_MEMBERS.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) return { title: 'Fysiotherapeut' }

  return createPageMetadata({
    title: `${member.name} – ${member.role}`,
    description: `Lees meer over ${member.name}, ${member.role.toLowerCase()} bij Fysiotherapie BeYou in Schipluiden.`,
    path: `/fysiotherapeuten/${member.slug}`,
    image: member.image,
  })
}

export default async function FysiotherapeutDetailPage({ params }: Props) {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) notFound()

  return (
    <>
      <JsonLd data={personJsonLd(member)} />
      <Fysiotherapeuten member={member} />
    </>
  )
}
