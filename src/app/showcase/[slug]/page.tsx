import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPrototype } from '@/content/config/prototypes'
import { getPrototypeContent } from '@/lib/content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Calendar, Tag } from 'lucide-react'
import { getCategoryIcon, getStatusColor } from '@/lib/content'
import Link from 'next/link'

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

  const PrototypeComponent = prototype.component
  const statusColors = getStatusColor(prototype.status)
  const categoryIcon = getCategoryIcon(prototype.category)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{categoryIcon}</span>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{prototype.title}</h1>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="text-sm">
                  {prototype.category}
                </Badge>
                <Badge 
                  className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} border`}
                  variant="outline"
                >
                  {prototype.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  Updated {new Date(prototype.updated).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-slate-600 mb-6">{prototype.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {prototype.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-slate-100 text-slate-600 border-slate-200"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Button */}
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            asChild
          >
            <Link href={`/demo/${prototype.slug}`}>
              <ExternalLink className="w-5 h-5 mr-2" />
              View Full Demo
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Project Documentation</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <MDXRemote source={content.content} />
              </CardContent>
            </Card>
          </div>

          {/* Prototype Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Live Preview</CardTitle>
                <p className="text-sm text-slate-600">
                  Interactive prototype embedded below. Click &quot;View Full Demo&quot; for the complete experience.
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-200 overflow-hidden">
                  <div className="transform scale-50 origin-top-left w-[200%] h-[200%]">
                    <PrototypeComponent />
                  </div>
                </div>
                <Button 
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <Link href={`/demo/${prototype.slug}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Full Demo
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const { prototypes } = await import('@/content/config/prototypes')
  
  return prototypes.map((prototype) => ({
    slug: prototype.slug,
  }))
} 