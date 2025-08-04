'use client'

import { useState, useEffect } from 'react'

interface GlitterTextProps {
  text: string;
  color?: 'rainbow' | 'gold' | 'silver' | 'pink';
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

export default function GlitterText({ 
  text,
  color = 'rainbow',
  density = 'medium',
  className = '' 
}: GlitterTextProps) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; char: string }>>([])

  const sparkleChars = ['✨', '⭐', '💫', '🌟', '✦', '✧', '⚡', '💎']
  const densityLevels = {
    low: 3,
    medium: 6,
    high: 10
  }

  const colorClasses = {
    rainbow: 'bg-gradient-rainbow bg-clip-text text-transparent',
    gold: 'text-yellow-400 glow-text',
    silver: 'text-gray-300 glow-text',
    pink: 'text-neon-pink glow-text'
  }

  useEffect(() => {
    const updateSparkles = () => {
      const sparkleCount = densityLevels[density]
      const newSparkles = Array.from({ length: sparkleCount }, (_, index) => {
        const randomChar = sparkleChars[Math.floor(Math.random() * sparkleChars.length)]
        return {
          id: Date.now() + index,
          x: Math.random() * 100,
          y: Math.random() * 100,
          char: randomChar || '✨' // Fallback to ensure char is never undefined
        }
      })
      setSparkles(newSparkles)
    }

    updateSparkles()
    const interval = setInterval(updateSparkles, 800)
    return () => clearInterval(interval)
  }, [density])

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Sparkle layer */}
      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="absolute animate-pulse text-xs"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDuration: `${0.5 + Math.random()}s`
            }}
          >
            {sparkle.char}
          </span>
        ))}
      </div>

      {/* Main text */}
      <div className={`font-comic font-bold text-2xl ${colorClasses[color]} animate-pulse relative z-10`}>
        {text}
      </div>
    </div>
  )
}