'use client'

import { useState, useEffect } from 'react'

interface SoundEffectsProps {
  enabled?: boolean;
  volume?: number;
  className?: string;
}

export default function SoundEffects({ 
  enabled = false,
  volume = 0.5,
  className = '' 
}: SoundEffectsProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(enabled)
  const [currentVolume, setCurrentVolume] = useState<number>(volume)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const soundEffects = [
    { name: 'Dial-up Modem', icon: '📞', description: 'Nostalgic internet connection sounds' },
    { name: 'Keyboard Typing', icon: '⌨️', description: 'Click-clack typing sounds' },
    { name: 'Mouse Click', icon: '🖱️', description: 'Classic mouse click sounds' },
    { name: 'Windows 95 Startup', icon: '🪟', description: 'The most iconic startup sound' },
    { name: 'CD-ROM Spinning', icon: '💿', description: 'Whirring disc sounds' },
    { name: 'Floppy Disk', icon: '💾', description: 'Classic floppy disk access sounds' },
    { name: 'Beep Boop', icon: '🤖', description: 'Retro computer beeps and boops' },
    { name: 'Notification Bell', icon: '🔔', description: 'Classic notification chime' }
  ]

  useEffect(() => {
    if (!isEnabled) return

    // Add click sound effects to all buttons
    const addClickSounds = () => {
      const buttons = document.querySelectorAll('button')
      buttons.forEach(button => {
        button.addEventListener('click', playClickSound)
      })
    }

    const playClickSound = () => {
      // Simulate sound effect (in a real implementation, you'd play actual audio)
      console.log('🔊 *click sound*')
    }

    addClickSounds()

    return () => {
      const buttons = document.querySelectorAll('button')
      buttons.forEach(button => {
        button.removeEventListener('click', playClickSound)
      })
    }
  }, [isEnabled])

  const playSound = (soundName: string) => {
    if (!isEnabled) return
    
    setIsPlaying(true)
    // Simulate sound playing
    console.log(`🔊 Playing: ${soundName}`)
    
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  return (
    <div className={`table-90s ${className}`}>
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-black p-4 text-green-400 font-mono">
          <h3 className="font-comic font-bold text-neon-cyan text-center text-sm mb-3">
            🔊 Sound Effects Control Panel 🔊
          </h3>
          
          {/* Main controls */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs">Sound Effects:</span>
              <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`btn-90s px-2 py-1 text-xs ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {isEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={currentVolume}
                onChange={(e) => setCurrentVolume(parseFloat(e.target.value))}
                className="w-20"
                disabled={!isEnabled}
              />
              <span className="text-xs">{Math.round(currentVolume * 100)}%</span>
            </div>
          </div>

          {/* Sound library */}
          <div className="space-y-2">
            <div className="text-center text-xs text-neon-yellow mb-2">
              🎵 Sound Library 🎵
            </div>
            
            <div className="grid grid-cols-2 gap-1">
              {soundEffects.map((sound, index) => (
                <button
                  key={index}
                  onClick={() => playSound(sound.name)}
                  disabled={!isEnabled || isPlaying}
                  className="btn-90s px-2 py-1 text-xs disabled:opacity-50"
                  title={sound.description}
                >
                  {sound.icon} {sound.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Status display */}
          <div className="mt-3 text-center">
            {isPlaying && (
              <div className="animate-pulse text-neon-pink">
                🎵 Playing Sound... 🎵
              </div>
            )}
            {!isEnabled && (
              <div className="text-red-400 text-xs">
                🔇 Sound Effects Disabled
              </div>
            )}
          </div>

          <div className="mt-2 text-center text-xs animate-blink">
            <div className="text-neon-orange">
              ⚠️ Turn up your speakers for maximum nostalgia! ⚠️
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}