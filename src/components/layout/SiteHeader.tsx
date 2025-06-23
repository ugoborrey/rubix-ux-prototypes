'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, Check } from 'lucide-react'
import { useState } from 'react'

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
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  
  const copyToClipboard = async (url: string, type: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedUrl(type)
      setTimeout(() => setCopiedUrl(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const ShareButton = () => {
    if (!pathname.startsWith('/showcase/')) return null
    
    // Check if we're on the client side before accessing window
    if (typeof window === 'undefined') return null
    
    const contextUrl = window.location.href
    
    return (
      <div className="relative">
        <Button
          variant="outline"
          className="border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={() => {
            // Simple click handler - copy context URL by default
            copyToClipboard(contextUrl, 'context')
          }}
        >
          {copiedUrl ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </>
          )}
        </Button>
        
        {/* TODO: Could add a dropdown for context vs demo URL options in the future */}
      </div>
    )
  }

  if (demoMode) {
    // Minimal floating button for demo mode
    return (
      <div className="fixed top-4 left-4 z-50">
        <Link href={`/showcase${pathname.replace('/demo', '')}`}>
          <div className="bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200 rounded-lg p-3 hover:bg-white hover:shadow-xl transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">Back to context</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">R</span>
              </div>
              <span className="text-xs text-slate-500">Rubix UX Prototypes</span>
            </div>
          </div>
        </Link>
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
            <ShareButton />
          </div>
        </div>
      </div>
    </header>
  )
} 