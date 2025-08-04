'use client'

import { useState, useEffect } from 'react'

interface AnimatedEmailProps {
  hasNewMail?: boolean;
  className?: string;
}

export default function AnimatedEmail({ 
  hasNewMail = true,
  className = '' 
}: AnimatedEmailProps) {
  const [bounce, setBounce] = useState<boolean>(false)
  const [sparkles, setSparkles] = useState<string[]>(['✨', '⭐', '💫', '🌟'])

  useEffect(() => {
    if (!hasNewMail) return

    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 1000)
    }, 2000)

    return () => clearInterval(interval)
  }, [hasNewMail])

  return (
    <div className={`text-center ${className}`}>
      <div className={`inline-block ${bounce ? 'animate-bounce' : ''}`}>
        <div className="relative">
          <div className="text-4xl glow-text">
            {hasNewMail ? '📬' : '📭'}
          </div>
          {hasNewMail && (
            <div className="absolute -top-2 -right-2 animate-pulse">
              <div className="bg-neon-pink text-black text-xs font-bold px-1 rounded-full">
                NEW!
              </div>
            </div>
          )}
        </div>
      </div>
      
      {hasNewMail && (
        <div className="mt-2">
          <div className="font-comic text-neon-orange font-bold text-sm animate-blink">
            📧 You've Got Mail! 📧
          </div>
          <div className="flex justify-center gap-1 mt-1">
            {sparkles.map((sparkle, index) => (
              <span 
                key={index}
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {sparkle}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}