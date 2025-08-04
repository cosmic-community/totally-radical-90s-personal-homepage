'use client'

import { useState, useEffect } from 'react'

interface MessageOfTheDayProps {
  className?: string;
}

export default function MessageOfTheDay({ className = '' }: MessageOfTheDayProps) {
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [messageIndex, setMessageIndex] = useState<number>(0)

  const messages = [
    "🌟 Today is totally RADICAL! Make it count! 🌟",
    "💫 Life is like a box of Tamagotchis - you never know what you're gonna get! 💫",
    "🎮 Level up your day with some AWESOME vibes! 🎮",
    "🌈 Keep calm and stay TUBULAR! 🌈",
    "✨ You're more AMAZING than a 56k modem! ✨",
    "🚀 Surf the information superhighway to success! 🚀",
    "💖 Spread love like it's peanut butter and jelly! 💖",
    "🎵 Dance like nobody's watching (but everyone's online)! 🎵",
    "🔥 You're HOTTER than a freshly burned CD-ROM! 🔥",
    "⭐ Shine brighter than a glittery GeoCities background! ⭐",
    "🌺 Be groovy, be kind, be TOTALLY RAD! 🌺",
    "🎪 Life's a circus - enjoy the show! 🎪"
  ]

  useEffect(() => {
    // Get today's message based on date
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    const todayMessageIndex = dayOfYear % messages.length
    
    setCurrentMessage(messages[todayMessageIndex])
    setMessageIndex(todayMessageIndex)
  }, [])

  useEffect(() => {
    // Cycle through messages every 10 seconds for extra fun
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length)
      setCurrentMessage(messages[messageIndex])
    }, 10000)

    return () => clearInterval(interval)
  }, [messageIndex, messages])

  return (
    <div className={`table-90s ${className}`}>
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-white p-4 text-center">
          <h3 className="font-comic font-bold text-neon-purple text-lg mb-3 animate-pulse">
            💭 Thought of the Day 💭
          </h3>
          
          <div className="retro-border p-4 bg-neon-yellow">
            <div className="font-comic text-black font-bold text-lg glow-text animate-pulse">
              {currentMessage}
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-600">
            <div>Message #{messageIndex + 1} of {messages.length}</div>
            <div className="animate-marquee mt-1">
              <span className="text-neon-cyan font-bold">
                ✨ New inspirational message every day! Check back tomorrow! ✨
              </span>
            </div>
          </div>
          
          <div className="mt-2 flex justify-center gap-2">
            <button
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * messages.length)
                setMessageIndex(randomIndex)
                setCurrentMessage(messages[randomIndex])
              }}
              className="btn-90s px-3 py-1 text-xs"
            >
              🔄 Random Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}