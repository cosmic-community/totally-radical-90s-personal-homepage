'use client'

import { useState, useEffect } from 'react'

export default function HitCounter() {
  const [count, setCount] = useState<number>(0)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    // Simulate loading hit count from localStorage
    const savedCount = localStorage.getItem('radical-homepage-hits')
    const currentCount = savedCount ? parseInt(savedCount, 10) : 12847 // Start with a rad number
    
    // Increment the count
    const newCount = currentCount + 1
    setCount(newCount)
    localStorage.setItem('radical-homepage-hits', newCount.toString())
    setIsLoaded(true)
  }, [])

  // Format number with leading zeros for that authentic 90s feel
  const formatCount = (num: number): string => {
    return num.toString().padStart(6, '0')
  }

  if (!isLoaded) {
    return (
      <div className="table-90s inline-block">
        <div className="bg-black p-2">
          <div className="bg-green-500 text-black px-3 py-1 font-mono text-lg font-bold">
            Loading...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="table-90s inline-block">
        <div className="bg-black p-2">
          <div className="bg-green-500 text-black px-3 py-1 font-mono text-lg font-bold">
            {formatCount(count)}
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm font-comic text-neon-purple animate-pulse">
        ★ You are visitor #{formatCount(count)}! ★
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Thanks for stopping by my totally rad homepage!
      </div>
    </div>
  )
}