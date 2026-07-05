import { format } from 'date-fns'
import { nl } from 'date-fns/locale'

export function formatPublishDate(
  value: string | null | undefined,
  pattern = 'd MMM yyyy'
): string | null {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return format(date, pattern, { locale: nl })
}
