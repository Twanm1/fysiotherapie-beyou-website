/** Fixes common scraper artifacts in markdown blog posts. */
export function normalizeBlogMarkdown(content: string): string {
  return content.replace(/^##\s+(.+)$/gm, (_, text: string) => {
    const trimmed = text.trim()
    const isArtifact =
      trimmed.length <= 35 ||
      /^["'‘’«]/.test(trimmed) ||
      /^[a-z(]/.test(trimmed)

    if (isArtifact) return `**${trimmed}**`
    return `## ${trimmed}`
  })
}
