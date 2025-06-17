import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Registration': '👤',
    'Homepage': '🏠',
    'Search': '🔍',
    'Quotation': '📋',
    'Cart & Checkout': '🛒',
    'Mobile App': '📱'
  }
  
  return icons[category] || '📄'
}

export function getStatusColor(status: string): {
  bg: string
  text: string
  border: string
} {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'In Progress': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-800',
      border: 'border-yellow-200'
    },
    'Ready for Review': {
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      border: 'border-blue-200'
    },
    'Approved': {
      bg: 'bg-green-50',
      text: 'text-green-800',
      border: 'border-green-200'
    },
    'In Development': {
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-200'
    },
    'Live': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200'
    }
  }

  return colors[status] || {
    bg: 'bg-gray-50',
    text: 'text-gray-800',
    border: 'border-gray-200'
  }
}
