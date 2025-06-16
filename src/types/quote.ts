export interface QuoteProduct {
  id: string
  name: string
  image?: string
  references: {
    skf?: string
    rubix?: string
    customer?: string
  }
  availability: {
    status: 'available' | 'limited' | 'unavailable'
    quantity?: number
    text: string
  }
  unitPrice: number
  totalPrice: number
  quantity: number
  isSelected: boolean
  comment?: string
  minOrderQuantity?: number
}

export interface QuoteInfo {
  number: string
  customerReference: string
  creationDate: string
  expirationDate: string
  requester: string
  accountManager: string
  status: 'ready' | 'pending' | 'expired' | 'draft'
  type: 'full_package' | 'line_locked' | 'full_modifiable'
}

export interface PriceSummary {
  subtotalExclVat: number
  deliveryFees: number
  totalExclVat: number
  vat: number
  grandTotal: number
}

export interface ContactPerson {
  name: string
  role: string
  initials: string
}

export interface Quote {
  info: QuoteInfo
  products: QuoteProduct[]
  priceSummary: PriceSummary
  contactPerson: ContactPerson
} 