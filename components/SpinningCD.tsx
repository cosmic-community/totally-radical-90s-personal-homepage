'use client'

import { useState, useEffect } from 'react'

interface SpinningCDProps {
  isPlaying?: boolean;
  trackName?: string;
  className?: string;
}

export default function SpinningCD({ 
  isPlaying = true,
  trackName = 'Awesome 90s Mix',
  className = '' 
}: SpinningCDProps) {
  const [sparklePosition, setSparklePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setSparklePosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      })
    }, 500)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className={`text-center ${className}`}>
      <div className="relative inline-block">
        <div className={`w-16 h-16 text-6xl ${isPlaying ? 'animate-spin' : ''} glow-text`}>
          💿
        </div>
        {isPlaying && (
          <div 
            className="absolute w-2 h-2 bg-neon-yellow rounded-full animate-pulse"
            style={{
              left: `${sparklePosition.x}%`,
              top: `${sparklePosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            ✨
          </div>
        )}
      </div>
      <div className="mt-2">
        <div className="font-comic text-neon-pink font-bold text-sm animate-pulse">
          {isPlaying ? '♫ NOW PLAYING ♫' : '⏸️ PAUSED'}
        </div>
        <div className="text-xs text-black bg-neon-yellow px-2 py-1 inline-block mt-1">
          {trackName}
        </div>
      </div>
    </div>
  )
}