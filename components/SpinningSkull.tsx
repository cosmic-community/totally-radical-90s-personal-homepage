'use client'

import { useState, useEffect } from 'react'

interface SpinningSkullProps {
  size?: 'small' | 'medium' | 'large';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

export default function SpinningSkull({ 
  size = 'medium', 
  speed = 'normal',
  className = '' 
}: SpinningSkullProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    // Randomly hide/show for extra chaos
    const interval = setInterval(() => {
      setIsVisible(prev => Math.random() > 0.1 ? true : !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    small: 'w-8 h-8 text-2xl',
    medium: 'w-12 h-12 text-4xl', 
    large: 'w-16 h-16 text-6xl'
  }

  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'duration-500'
  }

  if (!isVisible) return null

  return (
    <div className={`inline-block ${sizeClasses[size]} ${speedClasses[speed]} ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 animate-pulse">
          💀
        </div>
        <div className="glow-text text-neon-purple">
          💀
        </div>
      </div>
    </div>
  )
}