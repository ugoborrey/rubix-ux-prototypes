import Image from 'next/image'

interface TeamsIconProps {
  className?: string
  size?: number
}

export function TeamsIcon({ className = "", size = 16 }: TeamsIconProps) {
  return (
    <Image
      src="/icons/teams-logo.svg"
      alt="Microsoft Teams"
      width={size}
      height={size}
      className={className}
    />
  )
} 