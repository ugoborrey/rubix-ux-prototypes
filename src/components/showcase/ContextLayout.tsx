import { MDXRemote } from 'next-mdx-remote/rsc'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PrototypeFrontmatter } from '@/lib/types'
import { ContextTabs } from './ContextTabs'

interface ContextLayoutProps {
  content: {
    content: string
    frontmatter: PrototypeFrontmatter
  }
}

interface ParsedContent {
  overview: string[]
  userExperience: string[]
  technical: string[]
  review: string[]
}

// Helper function to parse MDX content into sections
function parseContentIntoSections(content: string): ParsedContent {
  const lines = content.split('\n')
  const sections: ParsedContent = {
    overview: [],
    userExperience: [],
    technical: [],
    review: []
  }
  
  let currentSection: keyof ParsedContent | null = null
  let buffer: string[] = []
  let inFrontmatter = false
  
  function flushBuffer() {
    if (currentSection && buffer.length > 0) {
      sections[currentSection].push(...buffer)
      buffer = []
    }
  }
  
  for (const line of lines) {
    // Handle frontmatter
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter
      continue
    }
    if (inFrontmatter) continue
    
    // Skip the main title (first # heading)
    if (line.startsWith('# ')) continue
    
    // Check for section headings and categorize them
    const heading = line.toLowerCase()
    
    // Overview sections: Problem Statement, Design Decisions, Success Metrics
    if (line.startsWith('## Problem Statement') || 
        line.startsWith('## Design Decisions') || 
        heading.includes('success metrics') ||
        heading.includes('problem statement') ||
        heading.includes('design decisions')) {
      flushBuffer()
      currentSection = 'overview'
      buffer.push(line)
    } 
    // User Experience sections: User Journey, Key Features, Smart Path Selection, etc.
    else if (line.startsWith('## User Journey') || 
             line.startsWith('## Key Features') ||
             line.startsWith('## Responsive Behavior') ||
             heading.includes('user journey') ||
             heading.includes('key features') ||
             heading.includes('responsive') ||
             heading.includes('smart path') ||
             heading.includes('account type education') ||
             heading.includes('company search')) {
      flushBuffer()
      currentSection = 'userExperience'
      buffer.push(line)
    }
    // Technical sections: Technical Implementation, Accessibility, Performance, etc.
    else if (line.startsWith('## Technical Implementation') || 
             line.startsWith('## Accessibility') ||
             line.startsWith('## Performance Considerations') ||
             line.startsWith('## Future Enhancements') ||
             heading.includes('technical') ||
             heading.includes('accessibility') ||
             heading.includes('performance') ||
             heading.includes('react architecture') ||
             heading.includes('state management') ||
             heading.includes('api integration')) {
      flushBuffer()
      currentSection = 'technical'
      buffer.push(line)
    }
    // Review sections: Stakeholder Feedback, Next Steps
    else if (line.startsWith('## Stakeholder Feedback') || 
             line.startsWith('## Next Steps') ||
             heading.includes('stakeholder') ||
             heading.includes('feedback') ||
             heading.includes('next steps') ||
             heading.includes('review')) {
      flushBuffer()
      currentSection = 'review'
      buffer.push(line)
    }
    // If no section is set yet, start with overview
    else if (currentSection === null && line.trim() !== '') {
      currentSection = 'overview'
      buffer.push(line)
    }
    // Add content to current section
    else {
      buffer.push(line)
    }
  }
  
  flushBuffer()
  
  return sections
}

export async function ContextLayout({ content }: ContextLayoutProps) {
  const parsedContent = parseContentIntoSections(content.content)
  
  // Pre-render all MDX content on the server
  const renderedContent = {
    overview: <MDXRemote source={parsedContent.overview.join('\n')} />,
    userExperience: <MDXRemote source={parsedContent.userExperience.join('\n')} />,
    technical: <MDXRemote source={parsedContent.technical.join('\n')} />,
    review: <MDXRemote source={parsedContent.review.join('\n')} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Project Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <ContextTabs renderedContent={renderedContent} />
      </CardContent>
    </Card>
  )
} 