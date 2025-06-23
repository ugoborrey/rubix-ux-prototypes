'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { Card, CardContent, CardHeader, CardTitle } from 'makocn'
import { ContextTabs } from './ContextTabs'

interface ContextLayoutClientProps {
  renderedContent: {
    overview: MDXRemoteSerializeResult
    userExperience: MDXRemoteSerializeResult
    technical: MDXRemoteSerializeResult
    review: MDXRemoteSerializeResult
  }
}

export function ContextLayoutClient({ renderedContent }: ContextLayoutClientProps) {
  // Convert serialized content to JSX elements for the tabs
  const tabContent = {
    overview: renderedContent.overview ? <MDXRemote {...renderedContent.overview} /> : <div>No overview content available</div>,
    userExperience: renderedContent.userExperience ? <MDXRemote {...renderedContent.userExperience} /> : <div>No user experience content available</div>,
    technical: renderedContent.technical ? <MDXRemote {...renderedContent.technical} /> : <div>No technical content available</div>,
    review: renderedContent.review ? <MDXRemote {...renderedContent.review} /> : <div>No review content available</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-slate-800">Project Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <ContextTabs renderedContent={tabContent} />
      </CardContent>
    </Card>
  )
} 