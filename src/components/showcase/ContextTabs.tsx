"use client"

import { useState, ReactNode } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

interface ContextTabsProps {
  renderedContent: {
    overview: ReactNode
    userExperience: ReactNode
    technical: ReactNode
    review: ReactNode
  }
}

export function ContextTabs({ renderedContent }: ContextTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'userExperience', label: 'User Experience', icon: '👤' },
    { id: 'technical', label: 'Technical', icon: '⚙️' },
    { id: 'review', label: 'Review', icon: '✅' }
  ]

  return (
    <Tabs>
      <TabsList className="w-full justify-start">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2"
          >
            <span>{tab.icon}</span>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="overview" isActive={activeTab === 'overview'}>
        <div className="prose max-w-none">
          {renderedContent.overview}
        </div>
      </TabsContent>

      <TabsContent value="userExperience" isActive={activeTab === 'userExperience'}>
        <div className="prose max-w-none">
          {renderedContent.userExperience}
        </div>
      </TabsContent>

      <TabsContent value="technical" isActive={activeTab === 'technical'}>
        <div className="prose max-w-none">
          {renderedContent.technical}
        </div>
      </TabsContent>

      <TabsContent value="review" isActive={activeTab === 'review'}>
        <div className="prose max-w-none">
          {renderedContent.review}
        </div>
      </TabsContent>
    </Tabs>
  )
} 