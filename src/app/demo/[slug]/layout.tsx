import SiteHeader from '@/components/layout/SiteHeader'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader demoMode={true} />
      <div className="min-h-screen">
        {children}
      </div>
    </>
  )
} 