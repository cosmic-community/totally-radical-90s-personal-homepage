'use client'

import { useState, useEffect } from 'react'

interface RainbowDividerProps {
  thickness?: 'thin' | 'medium' | 'thick';
  animated?: boolean;
  pattern?: 'solid' | 'dashed' | 'stars' | 'hearts';
  className?: string;
}

export default function RainbowDivider({ 
  thickness = 'medium',
  animated = true,
  pattern = 'solid',
  className = '' 
}: RainbowDividerProps) {
  const [animationPhase, setAnimationPhase] = useState<number>(0)

  const thicknessClasses = {
    thin: 'h-1',
    medium: 'h-2', 
    thick: 'h-4'
  }

  const patterns = {
    solid: '▬',
    dashed: '- ',
    stars: '⭐',
    hearts: '💖'
  }

  useEffect(() => {
    if (!animated) return

    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360)
    }, 100)

    return () => clearInterval(interval)
  }, [animated])

  if (pattern === 'solid') {
    return (
      <div className={`w-full ${thicknessClasses[thickness]} ${className}`}>
        <div 
          className={`w-full h-full bg-gradient-rainbow ${animated ? 'animate-pulse' : ''}`}
          style={{
            filter: animated ? `hue-rotate(${animationPhase}deg)` : undefined
          }}
        />
      </div>
    )
  }

  return (
    <div className={`text-center py-2 ${className}`}>
      <div className="flex justify-center overflow-hidden">
        <div className={`font-mono text-2xl ${animated ? 'animate-marquee' : ''}`}>
          {Array.from({ length: 50 }, (_, index) => (
            <span 
              key={index}
              className="glow-text"
              style={{
                color: `hsl(${(index * 20 + animationPhase) % 360}, 100%, 50%)`
              }}
            >
              {patterns[pattern]}
            </span>
          )).join('')}
        </div>
      </div>
    </div>
  )
}