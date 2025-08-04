'use client'

import { useState, useEffect } from 'react'

interface GeoCitiesCounterProps {
  startValue?: number;
  style?: 'classic' | 'digital' | 'neon' | 'flame';
  showDetails?: boolean;
  className?: string;
}

export default function GeoCitiesCounter({ 
  startValue = 15847,
  style = 'classic',
  showDetails = true,
  className = '' 
}: GeoCitiesCounterProps) {
  const [count, setCount] = useState<number>(startValue)
  const [todayVisits, setTodayVisits] = useState<number>(42)
  const [onlineNow, setOnlineNow] = useState<number>(3)

  useEffect(() => {
    // Simulate counter updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCount(prev => prev + 1)
        if (Math.random() > 0.8) {
          setTodayVisits(prev => prev + 1)
        }
      }
      
      // Randomly change online count
      if (Math.random() > 0.9) {
        setOnlineNow(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(6, '0')
  }

  const styleClasses = {
    classic: 'bg-gray-800 text-green-500 border-2 border-gray-600',
    digital: 'bg-black text-red-500 border-2 border-red-800',
    neon: 'bg-purple-900 text-neon-cyan border-2 border-neon-purple',
    flame: 'bg-gradient-to-r from-red-900 to-orange-900 text-yellow-300 border-2 border-orange-600'
  }

  return (
    <div className={`${className}`}>
      <div className="table-90s">
        <div className="bg-gradient-rainbow p-1">
          <div className="bg-white p-3 text-center">
            <h3 className="font-comic font-bold text-neon-purple text-sm mb-2">
              🏠 GeoCities Counter 🏠
            </h3>
            
            {/* Main counter */}
            <div className={`${styleClasses[style]} p-3 font-mono text-lg font-bold mb-2`}>
              <div className="animate-pulse">
                {formatNumber(count)}
              </div>
            </div>
            
            <div className="text-xs font-comic text-black mb-2">
              Total Visitors Since 1996
            </div>

            {showDetails && (
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Today:</span>
                  <span className="font-bold text-neon-orange">{todayVisits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Online Now:</span>
                  <span className="font-bold text-neon-green animate-blink">{onlineNow}</span>
                </div>
                <div className="flex justify-between">
                  <span>Record Day:</span>
                  <span className="font-bold text-neon-pink">2,847</span>
                </div>
              </div>
            )}

            <div className="mt-2 animate-marquee">
              <div className="text-xs text-neon-cyan font-bold">
                🌟 Thanks for visiting my corner of cyberspace! 🌟
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}