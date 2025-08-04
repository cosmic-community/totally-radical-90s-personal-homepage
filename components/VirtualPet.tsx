'use client'

import { useState, useEffect } from 'react'

interface PetStats {
  hunger: number;
  happiness: number;
  health: number;
  energy: number;
}

interface VirtualPetProps {
  petName?: string;
  className?: string;
}

export default function VirtualPet({ 
  petName = 'Cyber-Pet',
  className = '' 
}: VirtualPetProps) {
  const [stats, setStats] = useState<PetStats>({
    hunger: 80,
    happiness: 75,
    health: 90,
    energy: 60
  })
  const [mood, setMood] = useState<string>('😊')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [lastFeed, setLastFeed] = useState<number>(Date.now())

  const moods = ['😊', '😴', '😋', '🤗', '😢', '😵', '🤒', '🥳']

  useEffect(() => {
    // Pet degrades over time (authentic Tamagotchi experience!)
    const interval = setInterval(() => {
      setStats(prev => ({
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 0.5),
        health: Math.max(0, prev.health - (prev.hunger < 20 ? 2 : 0.2)),
        energy: Math.max(0, prev.energy - 0.3)
      }))

      // Update mood based on stats
      setMood(prevMood => {
        const avgStats = Object.values(stats).reduce((a, b) => a + b, 0) / 4
        if (avgStats > 80) return moods[Math.floor(Math.random() * 4)] // Happy moods
        if (avgStats > 50) return moods[0] // Neutral
        if (avgStats > 20) return moods[4] // Sad
        return moods[Math.floor(Math.random() * 2) + 5] // Sick moods
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [stats])

  const feedPet = () => {
    if (Date.now() - lastFeed < 10000) return // Prevent spam feeding
    
    setStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 30),
      happiness: Math.min(100, prev.happiness + 10)
    }))
    setLastFeed(Date.now())
    setMood('😋')
  }

  const playWithPet = () => {
    if (isPlaying) return
    
    setIsPlaying(true)
    setStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 25),
      energy: Math.max(0, prev.energy - 15)
    }))
    setMood('🥳')
    
    setTimeout(() => {
      setIsPlaying(false)
      setMood('😊')
    }, 3000)
  }

  const healPet = () => {
    setStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 40),
      happiness: Math.min(100, prev.happiness + 5)
    }))
    setMood('🤗')
  }

  const getStatColor = (value: number): string => {
    if (value > 70) return 'text-green-500'
    if (value > 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatBar = (value: number): string => {
    const filled = Math.floor(value / 10)
    const empty = 10 - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
  }

  return (
    <div className={`table-90s max-w-sm ${className}`}>
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-black p-4 text-green-400 font-mono">
          <div className="text-center mb-3">
            <div className="text-neon-cyan font-bold text-lg">{petName}</div>
            <div className={`text-6xl ${isPlaying ? 'animate-bounce' : 'animate-pulse'}`}>
              {mood}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-1 text-xs mb-3">
            <div className="flex justify-between">
              <span>HUNGER:</span>
              <span className={getStatColor(stats.hunger)}>
                {getStatBar(stats.hunger)} {Math.floor(stats.hunger)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>HAPPY:</span>
              <span className={getStatColor(stats.happiness)}>
                {getStatBar(stats.happiness)} {Math.floor(stats.happiness)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>HEALTH:</span>
              <span className={getStatColor(stats.health)}>
                {getStatBar(stats.health)} {Math.floor(stats.health)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>ENERGY:</span>
              <span className={getStatColor(stats.energy)}>
                {getStatBar(stats.energy)} {Math.floor(stats.energy)}%
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={feedPet}
              className="btn-90s px-2 py-1 text-xs"
              disabled={Date.now() - lastFeed < 10000}
            >
              🍔 FEED
            </button>
            <button
              onClick={playWithPet}
              className="btn-90s px-2 py-1 text-xs"
              disabled={isPlaying || stats.energy < 10}
            >
              🎮 PLAY
            </button>
            <button
              onClick={healPet}
              className="btn-90s px-2 py-1 text-xs"
              disabled={stats.health > 90}
            >
              💊 HEAL
            </button>
          </div>

          <div className="text-center mt-2 text-xs animate-blink">
            {stats.hunger < 20 && '🍕 I\'m hungry!'}
            {stats.happiness < 30 && '😢 I\'m sad...'}
            {stats.health < 40 && '🤒 I don\'t feel good...'}
            {stats.energy < 20 && '😴 I\'m sleepy...'}
          </div>
        </div>
      </div>
    </div>
  )
}