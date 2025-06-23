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
    overview: <MDXRemote {...renderedContent.overview} />,
    userExperience: <MDXRemote {...renderedContent.userExperience} />,
    technical: <MDXRemote {...renderedContent.technical} />,
    review: <MDXRemote {...renderedContent.review} />
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