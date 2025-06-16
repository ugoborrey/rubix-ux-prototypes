import { PrototypeMetadata } from '@/lib/types'
import QuoteDetailsPage from '@/components/prototypes/QuoteDetailsPage'

export const prototypes: PrototypeMetadata[] = [
  {
    slug: 'quote-details',
    title: 'Quote Details Redesign',
    category: 'Quotation',
    status: 'Ready for Review',
    description: 'Redesigned quote interface focusing on improved information architecture and user workflows with better product selection and modification capabilities.',
    tags: ['e-commerce', 'b2b', 'dashboard', 'responsive'],
    created: '2024-01-15',
    updated: '2024-01-20',
    screenshot: '/screenshots/quote-details.png',
    component: QuoteDetailsPage
  }
  // Additional prototypes will be added here as they're created
]

export function getPrototype(slug: string): PrototypeMetadata | undefined {
  return prototypes.find(p => p.slug === slug)
}

export function getPrototypesByCategory(category: string): PrototypeMetadata[] {
  return prototypes.filter(p => p.category === category)
}

export function getPrototypesByStatus(status: string): PrototypeMetadata[] {
  return prototypes.filter(p => p.status === status)
} 