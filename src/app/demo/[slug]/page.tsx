import { notFound } from 'next/navigation'
import { getPrototype } from '@/content/config/prototypes'

interface DemoPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params
  const prototype = getPrototype(slug)

  if (!prototype) {
    notFound()
  }

  const PrototypeComponent = prototype.component

  return <PrototypeComponent />
}

export async function generateStaticParams() {
  const { prototypes } = await import('@/content/config/prototypes')
  
  return prototypes.map((prototype) => ({
    slug: prototype.slug,
  }))
} 