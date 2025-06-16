'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'

interface SiteHeaderProps {
  showBackButton?: boolean
  demoMode?: boolean
  prototypeTitle?: string
}

export default function SiteHeader({ 
  showBackButton, 
  demoMode, 
  prototypeTitle 
}: SiteHeaderProps) {
  const pathname = usePathname()
  
  if (demoMode) {
    // Minimal header for demo mode
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm shadow-lg border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900"
          asChild
        >
          <Link href={`/showcase${pathname.replace('/demo', '')}`}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Context
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showBackButton ? (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Link>
              </Button>
            ) : (
              <Link href="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">Rubix UX Prototypes</h1>
                  <p className="text-xs text-slate-600">Internal Design Showcase</p>
                </div>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {prototypeTitle && (
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-800">{prototypeTitle}</div>
                <div className="text-xs text-slate-600">Prototype Context</div>
              </div>
            )}
            
            {pathname.startsWith('/showcase/') && (
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                asChild
              >
                <Link href={pathname.replace('/showcase', '/demo')}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 