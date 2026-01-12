'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import Image from 'next/image'

interface LogoProps {
  variant?: 'full' | 'wordmark' | 'icon'
  theme?: 'light' | 'dark' | 'auto'
  className?: string
  height?: number
  width?: number
}

export function Logo({ 
  variant = 'full', 
  theme = 'auto',
  className, 
  height, 
  width 
}: LogoProps) {
  const [imageError, setImageError] = useState(false)

  // Determine which logo file to use based on variant
  const getLogoPath = () => {
    // For wordmark, always use text logo
    if (variant === 'wordmark') {
      return '/logo/eduseek_text.png'
    }

    // For icon, use the logo (ES monogram)
    if (variant === 'icon') {
      return '/logo/eduseek_logo.png'
    }

    // For full logo, determine based on theme
    if (variant === 'full') {
      if (theme === 'dark') {
        return '/logo/eduseek_dark.jpg'
      }
      if (theme === 'light') {
        return '/logo/eduseek_light.jpg'
      }
      // Auto: default to light version
      return '/logo/eduseek_light.jpg'
    }

    // Default fallback
    return '/logo/eduseek_logo.png'
  }

  const defaultHeight = height || (variant === 'icon' ? 32 : variant === 'wordmark' ? 24 : 40)
  const defaultWidth = width || (variant === 'icon' ? 32 : variant === 'wordmark' ? 120 : 160)

  // Fallback to text logo if image doesn't exist
  if (imageError) {
    return (
      <div className={cn('flex items-center', className)}>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
          {variant === 'icon' ? 'ES' : 'EduSeek'}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getLogoPath()}
        alt="EduSeek"
        height={defaultHeight}
        width={defaultWidth}
        className="h-auto"
        onError={() => setImageError(true)}
      />
    </div>
  )
}
