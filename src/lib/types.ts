export type PrototypeCategory = 
  | 'Registration'
  | 'Homepage' 
  | 'Search'
  | 'Quotation'
  | 'Cart & Checkout'
  | 'Mobile App'

export type PrototypeStatus = 
  | 'In Progress'
  | 'Ready for Review'
  | 'Approved'
  | 'In Development'
  | 'Live'

export interface PrototypeMetadata {
  slug: string
  title: string
  category: PrototypeCategory
  status: PrototypeStatus
  description: string
  tags: string[]
  created: string
  updated: string
  screenshot?: string
  component: React.ComponentType
}

export interface PrototypeFrontmatter {
  title: string
  category: PrototypeCategory
  status: PrototypeStatus
  description: string
  tags: string[]
  created: string
  updated: string
  screenshot?: string
} 