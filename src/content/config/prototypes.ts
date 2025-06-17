import { PrototypeMetadata } from '@/lib/types'
import QuoteDetailsPage from '@/components/prototypes/QuoteDetailsPage'
import RegistrationRedesign from '@/components/prototypes/RegistrationRedesign'
import NLAccountSelection from '@/components/prototypes/NLAccountSelection'

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
  },
  {
    slug: 'registration-redesign',
    title: 'Registration Flow Redesign',
    category: 'Registration',
    status: 'Ready for Review',
    description: 'Complete redesign of the registration process with intelligent user journey branching for discovery vs. existing clients, enhanced company search, and streamlined account creation flow.',
    tags: ['onboarding', 'user-flow', 'b2b', 'responsive', 'multi-step'],
    created: '2024-01-22',
    updated: '2024-01-22',
    component: RegistrationRedesign,
    teamsLink: 'https://teams.microsoft.com/l/message/19:cac5d94805574733812360db7f8fb72a@thread.v2/1746519361388?context=%7B%22contextType%22%3A%22chat%22%7D'
  },
  {
    slug: 'nl-account-selection',
    title: 'NL Account Selection Alert',
    category: 'Registration',
    status: 'Ready for Review',
    description: 'Netherlands-specific registration flow with contextual alert banners for improved user guidance and geographic restrictions. Features dynamic alerts and localized account type selection.',
    tags: ['localization', 'registration', 'alerts', 'user-flow', 'b2b', 'netherlands'],
    created: '2024-01-25',
    updated: '2024-01-25',
    component: NLAccountSelection
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