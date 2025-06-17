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

 