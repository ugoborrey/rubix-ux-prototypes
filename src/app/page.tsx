import { prototypes } from '@/content/config/prototypes'
import PrototypeCard from '@/components/showcase/PrototypeCard'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

export default function HomePage() {
  const totalPrototypes = prototypes.length
  const readyForReview = prototypes.filter(p => p.status === 'Ready for Review').length
  const categories = Array.from(new Set(prototypes.map(p => p.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Compact Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome to Rubix UX Prototypes
          </h1>
          <p className="text-sm text-slate-600 mb-4 max-w-2xl mx-auto">
            Explore our latest interface designs and user experience improvements with context and demo modes.
          </p>
          
          {/* Compact Stats */}
          <div className="flex justify-center gap-6 mb-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{totalPrototypes}</div>
              <div className="text-xs text-slate-600">Prototypes</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{readyForReview}</div>
              <div className="text-xs text-slate-600">Ready for Review</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-xs text-slate-600">Categories</div>
            </div>
          </div>
        </div>

        {/* Prototypes Grid - Now More Prominent */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">All Prototypes</h2>
            <div className="flex gap-2">
              <div className="text-sm text-slate-500 flex items-center gap-1">
                <Search className="w-4 h-4" />
                Search & Filter coming soon
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prototypes.map((prototype) => (
              <PrototypeCard 
                key={prototype.slug} 
                prototype={prototype} 
              />
            ))}
          </div>
        </div>

        {/* Compact Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge 
                key={category}
                variant="secondary" 
                className="px-3 py-1 text-sm bg-white border-slate-200 text-slate-700"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Compact How to Use */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">How to Use This Showcase</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-slate-700 mb-1">📋 Context View</h4>
              <p className="text-slate-600">
                Click &quot;View Context&quot; to see the full project background, design decisions, and technical notes alongside the prototype.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-700 mb-1">🎯 Demo Mode</h4>
              <p className="text-slate-600">
                Click &quot;Demo&quot; for a clean, fullscreen prototype experience perfect for stakeholder presentations and screen sharing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
