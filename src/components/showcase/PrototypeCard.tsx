import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Calendar, Tag, Eye } from 'lucide-react'
import { PrototypeMetadata } from '@/lib/types'
import { getCategoryIcon, getStatusColor } from '@/lib/utils'
import { TeamsIcon } from '@/components/ui/teams-icon'

interface PrototypeCardProps {
  prototype: PrototypeMetadata
}

export default function PrototypeCard({ prototype }: PrototypeCardProps) {
  const statusColors = getStatusColor(prototype.status)
  const categoryIcon = getCategoryIcon(prototype.category)
  const PrototypeComponent = prototype.component
  const isReadyForReview = prototype.status === 'Ready for Review'

  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 border-slate-200 hover:border-slate-300 ${
      isReadyForReview ? 'ring-2 ring-green-200 border-green-300' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{categoryIcon}</span>
            <Badge variant="secondary" className="text-xs">
              {prototype.category}
            </Badge>
          </div>
          <Badge 
            className={`${statusColors.bg} ${statusColors.text} ${statusColors.border} border text-xs ${
              isReadyForReview ? 'ring-1 ring-green-400 animate-pulse' : ''
            }`}
            variant="outline"
          >
            {prototype.status}
          </Badge>
        </div>
        
        <CardTitle className="text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
          {prototype.title}
        </CardTitle>
        
        {/* Ready for Review Call-to-Action */}
        {isReadyForReview && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Ready for stakeholder review</span>
            </div>
            {prototype.teamsLink && (
              <Button
                size="sm"
                variant="outline"
                className="bg-white border-[#6264A7] text-[#6264A7] hover:bg-[#6264A7] hover:text-white text-xs transition-colors"
                asChild
              >
                <a href={prototype.teamsLink} target="_blank" rel="noopener noreferrer">
                  <TeamsIcon className="mr-1" size={12} />
                  Join Teams Discussion
                </a>
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Interactive Prototype Preview */}
        <Link href={`/showcase/${prototype.slug}`} className="block">
          <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-200 overflow-hidden relative group/preview cursor-pointer">
            <div className="transform scale-[0.4] origin-top-left w-[250%] h-[250%] pointer-events-none">
              <PrototypeComponent />
            </div>
            {/* Overlay to show it's a preview */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px] opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-200">
                <span className="text-sm font-medium text-slate-700">Click to explore</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {prototype.description}
        </p>

        {/* Tags */}
        {prototype.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prototype.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-slate-100 text-slate-600 border-slate-200"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {prototype.tags.length > 3 && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-slate-100 text-slate-600 border-slate-200"
              >
                +{prototype.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(prototype.updated).toLocaleDateString()}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className={`flex-1 ${
              isReadyForReview 
                ? 'bg-green-700 hover:bg-green-800 text-white shadow-md' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            asChild
          >
            <Link href={`/showcase/${prototype.slug}`}>
              {isReadyForReview ? 'Review Now' : 'View Context'}
            </Link>
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50"
            asChild
          >
            <Link href={`/demo/${prototype.slug}`}>
              <ExternalLink className="w-3 h-3 mr-1" />
              Demo
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 