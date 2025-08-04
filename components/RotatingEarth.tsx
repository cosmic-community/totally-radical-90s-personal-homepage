'use client'

import { useState, useEffect } from 'react'

interface RotatingEarthProps {
  size?: 'small' | 'medium' | 'large';
  showMessage?: boolean;
  className?: string;
}

export default function RotatingEarth({ 
  size = 'medium',
  showMessage = true,
  className = '' 
}: RotatingEarthProps) {
  const [messageIndex, setMessageIndex] = useState<number>(0)

  const messages = [
    '🌍 World Wide Web! 🌍',
    '🌎 Global Village! 🌎', 
    '🌏 Information Superhighway! 🌏',
    '🌍 Connected Planet! 🌍'
  ]

  useEffect(() => {
    if (!showMessage) return
    
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [showMessage, messages.length])

  const sizeClasses = {
    small: 'w-12 h-12 text-3xl',
    medium: 'w-16 h-16 text-5xl',
    large: 'w-20 h-20 text-6xl'
  }

  return (
    <div className={`text-center ${className}`}>
      <div className={`${sizeClasses[size]} mx-auto animate-spin-slow glow-text`}>
        🌍
      </div>
      {showMessage && (
        <div className="mt-2 animate-pulse">
          <div className="font-comic text-neon-cyan font-bold text-sm">
            {messages[messageIndex]}
          </div>
        </div>
      )}
    </div>
  )
}