'use client'

import { useState, useEffect } from 'react'

interface FlameTextProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function FlameText({ 
  text,
  size = 'medium',
  intensity = 'medium',
  className = '' 
}: FlameTextProps) {
  const [flamePattern, setFlamePattern] = useState<string[]>([])

  const flames = ['🔥', '🟠', '🟡', '🔴']
  
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  }

  const intensityLevels = {
    low: 3,
    medium: 5,
    high: 8
  }

  useEffect(() => {
    const updateFlames = () => {
      const flameCount = intensityLevels[intensity]
      const newPattern = Array.from({ length: flameCount }, () => {
        const randomFlame = flames[Math.floor(Math.random() * flames.length)]
        return randomFlame || '🔥' // Fallback to ensure string is never undefined
      })
      setFlamePattern(newPattern)
    }

    updateFlames()
    const interval = setInterval(updateFlames, 200)
    return () => clearInterval(interval)
  }, [intensity])

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        {/* Top flames */}
        <div className="absolute -top-6 left-0 right-0 flex justify-center">
          {flamePattern.slice(0, Math.ceil(flamePattern.length / 2)).map((flame, index) => (
            <span 
              key={`top-${index}`}
              className="animate-pulse"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateX(${(index - 1) * 10}px)`
              }}
            >
              {flame}
            </span>
          ))}
        </div>

        {/* Main text */}
        <div className={`${sizeClasses[size]} font-comic font-bold glow-text text-neon-orange animate-pulse`}>
          {text}
        </div>

        {/* Bottom flames */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
          {flamePattern.slice(Math.ceil(flamePattern.length / 2)).map((flame, index) => (
            <span 
              key={`bottom-${index}`}
              className="animate-pulse"
              style={{ 
                animationDelay: `${index * 0.15}s`,
                transform: `translateX(${(index - 1) * 15}px) rotate(180deg)`
              }}
            >
              {flame}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}