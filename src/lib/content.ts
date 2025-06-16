import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PrototypeFrontmatter } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/prototypes')

export async function getPrototypeContent(slug: string): Promise<{
  frontmatter: PrototypeFrontmatter
  content: string
} | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      frontmatter: data as PrototypeFrontmatter,
      content
    }
  } catch (error) {
    console.error(`Error loading content for ${slug}:`, error)
    return null
  }
}

export async function getAllPrototypeSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return []
    }

    const files = fs.readdirSync(CONTENT_DIR)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))
  } catch (error) {
    console.error('Error loading prototype slugs:', error)
    return []
  }
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