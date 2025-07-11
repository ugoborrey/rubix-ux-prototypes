'use client'

import { Card, CardContent, CardHeader, CardTitle, Button } from 'makocn'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Calendar, Tag, ChevronLeft, Users } from 'lucide-react'
import { getCategoryIcon, getStatusColor } from '@/lib/utils'
import { TeamsIcon } from '@/components/ui/teams-icon'
import { ContextLayout } from '@/components/showcase/ContextLayout'
import Link from 'next/link'
import { PrototypeMetadata, PrototypeFrontmatter } from '@/lib/types'

interface ShowcasePageClientProps {
  prototype: PrototypeMetadata
  content: {
    frontmatter: PrototypeFrontmatter
    content: string
  }
}

export function ShowcasePageClient({ prototype, content }: ShowcasePageClientProps) {
  const PrototypeComponent = prototype.component
  const statusColors = getStatusColor(prototype.status)
  const categoryIcon = getCategoryIcon(prototype.category)
  const isReadyForReview = prototype.status === 'Ready for Review'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back to Prototypes Link */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to prototypes</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
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
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href={`/demo/${prototype.slug}`}>
                <Button leadingIcon={<ExternalLink size={16} />}>
                  View Full Demo
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Ready for Review Banner */}
          {isReadyForReview && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">Ready for Stakeholder Review</h3>
                    <p className="text-sm text-green-700 mt-1">
                      This prototype is ready for feedback. {prototype.teamsLink ? 'Join the Teams discussion to share your thoughts.' : 'Contact the UX team to provide feedback.'}
                    </p>
                  </div>
                </div>
                {prototype.teamsLink && (
                  <a href={prototype.teamsLink} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <Button 
                      variant="outline"
                      leadingIcon={<TeamsIcon size={16} />}
                      className="bg-white border-[#6264A7] text-[#6264A7] hover:bg-[#6264A7] hover:text-white transition-colors"
                    >
                      Join Discussion
                    </Button>
                  </a>
                )}
              </div>
            </div>
          )}
          
          <p className="text-lg text-slate-600 mb-6">{prototype.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            <ContextLayout content={content} />
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
                <div className="space-y-2 mt-4">
                  <Link href={`/demo/${prototype.slug}`}>
                    <Button leadingIcon={<ExternalLink size={16} />} className="w-full">
                      Open Full Demo
                    </Button>
                  </Link>
                  {isReadyForReview && prototype.teamsLink && (
                    <a href={prototype.teamsLink} target="_blank" rel="noopener noreferrer" className="inline-block w-full mt-3">
                      <Button 
                        variant="outline"
                        leadingIcon={<TeamsIcon size={16} />}
                        className="w-full border-[#6264A7] text-[#6264A7] hover:bg-[#6264A7]/10"
                      >
                        Join Teams Discussion
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 