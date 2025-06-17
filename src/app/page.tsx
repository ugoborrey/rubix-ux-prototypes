'use client'

import { prototypes } from '@/content/config/prototypes'
import PrototypeCard from '@/components/showcase/PrototypeCard'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const totalPrototypes = prototypes.length
  const readyForReview = prototypes.filter(p => p.status === 'Ready for Review').length
  const categories = Array.from(new Set(prototypes.map(p => p.category)))
  
  // Filter prototypes based on selected category
  const filteredPrototypes = selectedCategory 
    ? prototypes.filter(p => p.category === selectedCategory)
    : prototypes

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Compact Hero Section */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome to Rubix UX Prototypes
          </h1>
          <p className="text-sm text-slate-600 mb-4 max-w-2xl mx-auto">
            Explore our latest interface designs and user experience improvements with context and demo modes.
          </p>
          
          {/* Compact Stats */}
          <div className="flex justify-center gap-6 mb-3">
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
            <h2 className="text-xl font-semibold text-slate-800">
              {selectedCategory ? `${selectedCategory} Prototypes` : 'All Prototypes'}
              <span className="text-sm font-normal text-slate-600 ml-2">
                ({filteredPrototypes.length})
              </span>
            </h2>
            
            {/* Filter buttons aligned to the right */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === null ? "default" : "secondary"}
                className={`px-3 py-1 text-sm cursor-pointer transition-colors ${
                  selectedCategory === null 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`px-3 py-1 text-sm cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrototypes.map((prototype) => (
              <PrototypeCard 
                key={prototype.slug} 
                prototype={prototype} 
              />
            ))}
          </div>
          
          {filteredPrototypes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No prototypes found in this category.</p>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-blue-600 hover:text-blue-700 mt-2 text-sm"
              >
                View all prototypes
              </button>
            </div>
          )}
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
