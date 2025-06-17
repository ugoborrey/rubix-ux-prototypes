'use client'

import { usePathname } from 'next/navigation'
import SiteHeader from './SiteHeader'

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // Don't render header on demo routes since demo layout handles it
  if (pathname.startsWith('/demo/')) {
    return null
  }
  
  return <SiteHeader />
} 