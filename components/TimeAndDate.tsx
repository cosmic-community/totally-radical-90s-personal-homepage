'use client'

import { useState, useEffect } from 'react'

interface TimeAndDateProps {
  showMultipleZones?: boolean;
  className?: string;
}

export default function TimeAndDate({ 
  showMultipleZones = true,
  className = '' 
}: TimeAndDateProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [blinkColon, setBlinkColon] = useState<boolean>(true)

  const timeZones = [
    { name: 'Local Time', offset: null },
    { name: 'Cyberspace', offset: -8 }, // PST
    { name: 'Web City', offset: -5 },   // EST
    { name: 'Internet HQ', offset: 0 }   // GMT
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setBlinkColon(prev => !prev)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date, offset: number | null = null): string => {
    let timeToFormat = date
    
    if (offset !== null) {
      timeToFormat = new Date(date.getTime() + (offset * 60 * 60 * 1000))
    }
    
    const hours = timeToFormat.getHours().toString().padStart(2, '0')
    const minutes = timeToFormat.getMinutes().toString().padStart(2, '0')
    const seconds = timeToFormat.getSeconds().toString().padStart(2, '0')
    const colon = blinkColon ? ':' : ' '
    
    return `${hours}${colon}${minutes}${colon}${seconds}`
  }

  const formatDate = (date: Date): string => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December']
    
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const getY2KCountdown = (): string => {
    const y2k = new Date('2000-01-01T00:00:00')
    const now = new Date()
    
    if (now >= y2k) {
      return "Y2K Survived! 🎉"
    }
    
    const diff = y2k.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    
    return `Y2K in: ${days}d ${hours}h`
  }

  return (
    <div className={`table-90s ${className}`}>
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-black p-4 text-green-400 font-mono">
          <h3 className="font-comic font-bold text-neon-cyan text-center text-sm mb-3">
            ⏰ Digital Clock Central ⏰
          </h3>
          
          {/* Main time display */}
          <div className="text-center mb-3">
            <div className="text-2xl font-bold glow-text">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-neon-yellow mt-1">
              {formatDate(currentTime)}
            </div>
          </div>

          {/* Multiple time zones */}
          {showMultipleZones && (
            <div className="space-y-1 text-xs mb-3">
              {timeZones.slice(1).map((zone, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-neon-purple">{zone.name}:</span>
                  <span className="text-white">
                    {formatTime(currentTime, zone.offset)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Y2K Countdown */}
          <div className="text-center animate-blink">
            <div className="text-xs text-neon-orange font-bold">
              {getY2KCountdown()}
            </div>
          </div>

          {/* Digital effects */}
          <div className="text-center mt-2 animate-pulse">
            <div className="text-xs text-gray-500">
              █▓▒░ DIGITAL TIME ░▒▓█
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}