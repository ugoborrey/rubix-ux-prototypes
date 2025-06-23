'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from 'makocn'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { 
  ShoppingCart,
  Zap,
  FileText,
  Copy,
  MessageCircle,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  AlertCircle,
  RotateCcw
} from 'lucide-react'
import { Quote, QuoteProduct } from '@/types/quote'

// Mock data - in real app this would come from API
const mockQuote: Quote = {
  info: {
    number: '240839823A1',
    customerReference: '12349021',
    creationDate: '10/10/2024',
    expirationDate: '29/10/2024',
    requester: 'Bobby Bonham',
    accountManager: 'Fabrice Durand',
    status: 'ready',
    type: 'full_modifiable'
  },
  products: [
    {
      id: '1',
      name: 'Lyre shackle and straight shackle for lifting equipment Pramac Accessories (Challans) MHL132',
      references: {
        skf: '5026-5089264',
        rubix: '7905854',
        customer: '5026-5089264'
      },
      availability: {
        status: 'available',
        quantity: 4784,
        text: 'Available • 4784 unit(s)'
      },
      unitPrice: 87.09,
      totalPrice: 87.09,
      quantity: 1,
      isSelected: true
    },
    {
      id: '2',
      name: 'Industrial bearing assembly - High performance series',
      references: {
        skf: '4002111111',
        rubix: '1186-544968'
      },
      availability: {
        status: 'limited',
        quantity: 48,
        text: 'Limited stock • 48 unit(s)'
      },
      unitPrice: 4.30,
      totalPrice: 516.00,
      quantity: 120,
      isSelected: true,
      comment: 'Commercial comment: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check compatibility with existing equipment.'
    },
    {
      id: '3',
      name: 'Optional accessory kit - Not selected',
      references: {
        skf: '0859A589784'
      },
      availability: {
        status: 'available',
        text: 'Available'
      },
      unitPrice: 965.08,
      totalPrice: 965.08,
      quantity: 1,
      isSelected: false
    }
  ],
  priceSummary: {
    subtotalExclVat: 603.09,
    deliveryFees: 0,
    totalExclVat: 603.09,
    vat: 120.62,
    grandTotal: 723.71
  },
  contactPerson: {
    name: 'Fabrice Durand',
    role: 'Account Manager',
    initials: 'FD'
  }
}

export default function QuoteDetailsPage() {
  // Track original state (never changes) vs current state
  const [originalQuote] = useState<Quote>(mockQuote)
  const [quote, setQuote] = useState<Quote>(mockQuote)
  const [showResetConfirmation, setShowResetConfirmation] = useState(false)

  const selectedProducts = quote.products.filter(p => p.isSelected)
  const selectedCount = selectedProducts.length

  // Detect if quote has been modified
  const hasModifications = useMemo(() => {
    return JSON.stringify(originalQuote.products) !== JSON.stringify(quote.products)
  }, [originalQuote.products, quote.products])

  // Count modified products for status description
  const modifiedProductsCount = useMemo(() => {
    let count = 0
    quote.products.forEach((product, index) => {
      const original = originalQuote.products[index]
      if (original && (
        product.isSelected !== original.isSelected ||
        product.quantity !== original.quantity
      )) {
        count++
      }
    })
    return count
  }, [quote.products, originalQuote.products])

  // Calculate dynamic pricing based on selected products
  const calculatedPricing = useMemo(() => {
    const subtotalExclVat = selectedProducts.reduce((sum, product) => sum + product.totalPrice, 0)
    const deliveryFees = subtotalExclVat > 500 ? 0 : 25 // Free delivery over €500
    const totalExclVat = subtotalExclVat + deliveryFees
    const vat = totalExclVat * 0.2 // 20% VAT
    const grandTotal = totalExclVat + vat

    return {
      subtotalExclVat,
      deliveryFees,
      totalExclVat,
      vat,
      grandTotal
    }
  }, [selectedProducts])

  const updateProductSelection = (productId: string, isSelected: boolean) => {
    setQuote(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === productId ? { ...product, isSelected } : product
      )
    }))
  }

  const updateProductQuantity = (productId: string, quantity: number) => {
    setQuote(prev => ({
      ...prev,
      products: prev.products.map(product =>
        product.id === productId 
          ? { 
              ...product, 
              quantity: Math.max(1, quantity),
              totalPrice: product.unitPrice * Math.max(1, quantity)
            } 
          : product
      )
    }))
  }

  const selectAllProducts = () => {
    setQuote(prev => ({
      ...prev,
      products: prev.products.map(product => ({ ...product, isSelected: true }))
    }))
  }

  const unselectAllProducts = () => {
    setQuote(prev => ({
      ...prev,
      products: prev.products.map(product => ({ ...product, isSelected: false }))
    }))
  }

  const resetToOriginal = () => {
    setQuote(JSON.parse(JSON.stringify(originalQuote))) // Deep copy to avoid reference issues
    setShowResetConfirmation(false)
  }

  const handleResetClick = () => {
    setShowResetConfirmation(true)
  }

  const getStatusConfig = (status: string) => {
    const baseDescription = `Valid until ${quote.info.expirationDate} • Full modifiable • ${selectedCount} items selected`
    const modificationText = hasModifications ? ` • ${modifiedProductsCount} products modified` : ''
    
    switch (status) {
      case 'ready':
        return {
          icon: CheckCircle,
          title: hasModifications ? 'Quote Modified' : 'Quote Ready for Order',
          description: baseDescription + modificationText,
          className: 'bg-green-50 border border-green-200 text-green-800',
          iconColor: 'text-green-600',
          buttonClass: 'border-green-300 text-green-700 hover:bg-green-100',
          actions: hasModifications ? ['Reset Changes'] : []
        }
      case 'pending':
        return {
          icon: Clock,
          title: 'Quote Pending Approval',
          description: 'Waiting for internal approval',
          className: 'bg-orange-50 border border-orange-200 text-orange-800',
          iconColor: 'text-orange-600',
          buttonClass: 'border-orange-300 text-orange-700 hover:bg-orange-100',
          actions: ['View Status', 'Contact Support']
        }
      case 'expired':
        return {
          icon: AlertCircle,
          title: 'Quote Expired',
          description: 'This quote has expired. Contact your sales representative.',
          className: 'bg-red-50 border border-red-200 text-red-800',
          iconColor: 'text-red-600',
          buttonClass: 'border-red-300 text-red-700 hover:bg-red-100',
          actions: ['Request Extension', 'New Quote']
        }
      default:
        return {
          icon: Clock,
          title: 'Quote Draft',
          description: 'Quote is being prepared',
          className: 'bg-gray-50 border border-gray-200 text-gray-800',
          iconColor: 'text-gray-600',
          buttonClass: 'border-gray-300 text-gray-700 hover:bg-gray-100',
          actions: []
        }
    }
  }

  const statusConfig = getStatusConfig(quote.info.status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* 1. SIMPLIFIED INFORMATION ARCHITECTURE - Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-800">
                    Quote N°{quote.info.number}
                  </h1>
                  {hasModifications && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                      Modified
                    </Badge>
                  )}
                </div>
                <p className="text-slate-600">Your ref: {quote.info.customerReference}</p>
              </div>
            </div>

            {/* 3. UNIFIED STATUS COMMUNICATION - Updated with modification awareness */}
            <div className={`${statusConfig.className} p-4 rounded-lg mb-6 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <StatusIcon className={`w-5 h-5 ${statusConfig.iconColor}`} />
                </div>
                <div>
                  <div className="font-semibold text-lg">{statusConfig.title}</div>
                  <div className="text-sm opacity-80">{statusConfig.description}</div>
                </div>
              </div>
              <div className="flex gap-2">
                {statusConfig.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={statusConfig.buttonClass}
                    onClick={action === 'Reset Changes' ? handleResetClick : undefined}
                  >
                    {action === 'Reset Changes' && <RotateCcw className="w-4 h-4 mr-1" />}
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quote Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Creation Date
                </div>
                <div className="font-semibold text-slate-800">{quote.info.creationDate}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Expiration Date
                </div>
                <div className="font-semibold text-slate-800">{quote.info.expirationDate}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Requester
                </div>
                <div className="font-semibold text-slate-800">{quote.info.requester}</div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Account Manager
                </div>
                <div className="font-semibold text-slate-800">{quote.info.accountManager}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 4. PRODUCT LINE OPTIMIZATION - Updated with subtle header */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-slate-50 border-b border-slate-200 pt-6 pb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg text-slate-800">Products</CardTitle>
                    <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                      {quote.products.length} items
                    </Badge>
                    {hasModifications && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                        {modifiedProductsCount} modified
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-700 hover:bg-slate-200"
                      onClick={selectAllProducts}
                    >
                      Select All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-700 hover:bg-slate-200"
                      onClick={unselectAllProducts}
                    >
                      Unselect All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {quote.products.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    originalProduct={originalQuote.products[index]}
                    isLast={index === quote.products.length - 1}
                    onSelectionChange={(isSelected) => updateProductSelection(product.id, isSelected)}
                    onQuantityChange={(quantity) => updateProductQuantity(product.id, quantity)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 2. UNIFIED ACTION AREA - Sidebar */}
          <div className="space-y-6">
            {/* Price Summary - Sticky */}
            <Card className="sticky top-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-slate-800">Order Summary</CardTitle>
                  <Badge variant="secondary">
                    {selectedCount}/{quote.products.length} products selected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal HT:</span>
                    <span className="font-semibold">€{calculatedPricing.subtotalExclVat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipment:</span>
                    <span className="font-semibold">
                      {calculatedPricing.deliveryFees === 0 ? 'Free' : `€${calculatedPricing.deliveryFees.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total HT:</span>
                    <span className="font-semibold">€{calculatedPricing.totalExclVat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">VAT:</span>
                    <span className="font-semibold">€{calculatedPricing.vat.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total TTC:</span>
                    <span className="font-bold text-slate-800">€{calculatedPricing.grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="space-y-3 pt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3"
                    disabled={selectedCount === 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart {selectedCount > 0 && `(${selectedCount} items)`}
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3"
                    disabled={selectedCount === 0}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Quick Order
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Secondary Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-600">More Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Original PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Current PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Request Modification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate Quote
                </Button>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-600">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {quote.contactPerson.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-800">{quote.contactPerson.name}</div>
                    <div className="text-sm text-slate-600">{quote.contactPerson.role}</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Sales Rep
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        {showResetConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-800">Reset all changes?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  This will restore the original quote. Your modifications to {modifiedProductsCount} product{modifiedProductsCount !== 1 ? 's' : ''} will be lost.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowResetConfirmation(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={resetToOriginal}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

// Product Card Component
interface ProductCardProps {
  product: QuoteProduct
  originalProduct: QuoteProduct
  isLast: boolean
  onSelectionChange: (isSelected: boolean) => void
  onQuantityChange: (quantity: number) => void
}

function ProductCard({ product, originalProduct, isLast, onSelectionChange, onQuantityChange }: ProductCardProps) {
  const availabilityConfig = {
    available: { dot: 'bg-green-500', text: 'text-slate-600' },
    limited: { dot: 'bg-orange-500', text: 'text-orange-600' },
    unavailable: { dot: 'bg-red-500', text: 'text-red-600' }
  }

  const config = availabilityConfig[product.availability.status]

  // Check if this product has been modified
  const isModified = originalProduct && (
    product.isSelected !== originalProduct.isSelected ||
    product.quantity !== originalProduct.quantity
  )

  return (
    <div className={`p-5 grid grid-cols-[auto_80px_1fr_140px_120px] gap-4 items-center transition-all duration-200 hover:bg-slate-50 ${!isLast ? 'border-b border-slate-200' : ''} ${!product.isSelected ? 'opacity-60 bg-slate-50' : ''} ${isModified ? 'border-l-4 border-l-blue-400 bg-blue-50' : ''}`}>
      {/* Selection Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={product.isSelected}
          onCheckedChange={(checked) => onSelectionChange(checked as boolean)}
          className="w-5 h-5"
        />
        {isModified && (
          <div className="w-2 h-2 bg-blue-500 rounded-full" title="Modified"></div>
        )}
      </div>

      {/* Product Image */}
      <div className="w-18 h-18 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-8 h-8 bg-slate-300 rounded"></div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-slate-800 leading-tight">{product.name}</h3>
        
        {/* References */}
        <div className="flex flex-wrap gap-2">
          {product.references.skf && (
            <Badge variant="secondary" className="text-xs">SKF: {product.references.skf}</Badge>
          )}
          {product.references.rubix && (
            <Badge variant="secondary" className="text-xs">RUBIX: {product.references.rubix}</Badge>
          )}
          {product.references.customer && (
            <Badge variant="secondary" className="text-xs">Customer: {product.references.customer}</Badge>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${config.dot}`}></div>
          <span className={`text-sm ${config.text}`}>{product.availability.text}</span>
        </div>

        {/* Comment */}
        {product.comment && (
          <div className="bg-yellow-50 border-l-3 border-yellow-400 p-3 rounded-r text-sm text-yellow-800">
            💬 {product.comment}
          </div>
        )}
      </div>

      {/* Quantity Controls - Horizontal Layout */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase text-center">Quantity</span>
        <div className="flex items-center border border-slate-200 rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-slate-100"
            disabled={!product.isSelected || product.quantity <= 1}
            onClick={() => onQuantityChange(product.quantity - 1)}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <Input
            type="number"
            value={product.quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
            className="w-20 h-8 text-center border-0 text-sm font-semibold [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
            disabled={!product.isSelected}
            min="1"
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-slate-100"
            disabled={!product.isSelected}
            onClick={() => onQuantityChange(product.quantity + 1)}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Price Section */}
      <div className="text-right space-y-1">
        <div className="text-sm text-slate-600">
          <span className="font-semibold">€{product.unitPrice.toFixed(2)}</span> per Unit
        </div>
        <div className="text-lg font-bold text-slate-800">
          {product.isSelected ? `€${product.totalPrice.toFixed(2)}` : '—'}
        </div>
        <div className="text-xs text-slate-500">
          {product.isSelected ? 'Excl. VAT' : 'Not included'}
        </div>
      </div>
    </div>
  )
} 