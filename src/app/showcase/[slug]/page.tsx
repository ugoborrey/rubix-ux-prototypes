import { notFound } from 'next/navigation'
import { getPrototype } from '@/content/config/prototypes'
import { getPrototypeContent } from '@/lib/content'
import { ShowcasePageClient } from '@/components/showcase/ShowcasePageClient'

// Disable static generation for showcase pages since they use client-side MDX rendering
export const dynamic = 'force-dynamic'

interface ShowcasePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ShowcasePage({ params }: ShowcasePageProps) {
  const { slug } = await params
  const prototype = getPrototype(slug)
  const content = await getPrototypeContent(slug)

  if (!prototype || !content) {
    notFound()
  }

  return <ShowcasePageClient prototype={prototype} content={content} />
}

export async function generateStaticParams() {
  const { prototypes } = await import('@/content/config/prototypes')
  
  return prototypes.map((prototype) => ({
    slug: prototype.slug,
  }))
} 