'use client'

import { useState, useEffect } from 'react'

interface MIDITrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
}

interface MIDIJukeboxProps {
  className?: string;
}

export default function MIDIJukebox({ className = '' }: MIDIJukeboxProps) {
  const [currentTrack, setCurrentTrack] = useState<MIDITrack | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(0.7)
  const [visualizer, setVisualizer] = useState<string[]>([])

  const tracks: MIDITrack[] = [
    { id: '1', title: 'All The Small Things', artist: 'Blink 182', duration: '2:48', genre: 'Rock' },
    { id: '2', title: 'Radical Melody', artist: 'MIDI Master', duration: '3:15', genre: 'Electronic' },
    { id: '3', title: 'Neon Dreams', artist: 'Synth Kid', duration: '4:02', genre: 'Ambient' },
    { id: '4', title: 'Cyber Dance', artist: 'Digital DJ', duration: '3:33', genre: 'Dance' },
    { id: '5', title: 'Pixel Perfect', artist: 'Chiptune Hero', duration: '2:57', genre: 'Game Music' }
  ]

  const visualizerBars = ['█', '▇', '▆', '▅', '▄', '▃', '▂', '▁']

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      // Generate random visualizer pattern
      const newPattern = Array.from({ length: 16 }, () => {
        const randomBar = visualizerBars[Math.floor(Math.random() * visualizerBars.length)]
        return randomBar || '█' // Fallback to ensure string is never undefined
      })
      setVisualizer(newPattern)
    }, 200)

    return () => clearInterval(interval)
  }, [isPlaying])

  const playTrack = (track: MIDITrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    // In a real app, you'd start playing the MIDI file here
    console.log(`🎵 Playing: ${track.title} by ${track.artist}`)
  }

  const stopTrack = () => {
    setIsPlaying(false)
    setVisualizer([])
  }

  const nextTrack = () => {
    if (!currentTrack) return
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    const nextTrackToPlay = tracks[nextIndex]
    if (nextTrackToPlay) {
      playTrack(nextTrackToPlay)
    }
  }

  const prevTrack = () => {
    if (!currentTrack) return
    
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id)
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1
    const prevTrackToPlay = tracks[prevIndex]
    if (prevTrackToPlay) {
      playTrack(prevTrackToPlay)
    }
  }

  return (
    <div className={`table-90s ${className}`}>
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-black p-4 text-green-400 font-mono">
          <h3 className="font-comic font-bold text-neon-cyan text-center text-lg mb-3">
            💿 MIDI Jukebox 2000 💿
          </h3>
          
          {/* Now playing display */}
          <div className="mb-4 p-2 border-2 border-neon-green bg-gray-900">
            <div className="text-center">
              {currentTrack ? (
                <>
                  <div className="text-neon-yellow font-bold text-sm">
                    ♫ NOW PLAYING ♫
                  </div>
                  <div className="text-white text-lg mt-1">
                    {currentTrack.title}
                  </div>
                  <div className="text-neon-purple text-sm">
                    by {currentTrack.artist}
                  </div>
                  <div className="text-xs text-gray-400">
                    {currentTrack.genre} • {currentTrack.duration}
                  </div>
                </>
              ) : (
                <div className="text-gray-500 animate-pulse">
                  Select a track to start jamming! 🎵
                </div>
              )}
            </div>
          </div>

          {/* Visualizer */}
          <div className="mb-4 p-2 bg-black border border-green-500">
            <div className="text-center font-mono text-green-400">
              {isPlaying ? (
                <div className="flex justify-center gap-1 animate-pulse">
                  {visualizer.map((bar, index) => (
                    <span 
                      key={index}
                      className="text-neon-cyan"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        color: `hsl(${120 + index * 20}, 100%, 50%)`
                      }}
                    >
                      {bar}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-gray-600">
                  ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mb-4">
            <div className="flex justify-center gap-2 mb-2">
              <button
                onClick={prevTrack}
                disabled={!currentTrack}
                className="btn-90s px-3 py-1 text-sm disabled:opacity-50"
              >
                ⏮️ PREV
              </button>
              
              <button
                onClick={isPlaying ? stopTrack : () => currentTrack && playTrack(currentTrack)}
                disabled={!currentTrack}
                className="btn-90s px-3 py-1 text-sm disabled:opacity-50"
              >
                {isPlaying ? '⏸️ PAUSE' : '▶️ PLAY'}
              </button>
              
              <button
                onClick={nextTrack}
                disabled={!currentTrack}
                className="btn-90s px-3 py-1 text-sm disabled:opacity-50"
              >
                ⏭️ NEXT
              </button>
            </div>

            {/* Volume control */}
            <div className="flex items-center justify-center gap-2 text-xs">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20"
              />
              <span>{Math.round(volume * 100)}%</span>
            </div>
          </div>

          {/* Track list */}
          <div className="space-y-1">
            <div className="text-center text-xs text-neon-yellow mb-2">
              🎵 Track Selection 🎵
            </div>
            
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-2 border cursor-pointer hover:bg-gray-800 text-xs ${
                  currentTrack?.id === track.id 
                    ? 'border-neon-pink bg-gray-800 text-neon-pink' 
                    : 'border-gray-600 text-white'
                }`}
                onClick={() => playTrack(track)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-neon-green">
                    {currentTrack?.id === track.id && isPlaying ? '🎵' : '💿'}
                  </span>
                  <div>
                    <div className="font-bold">{track.title}</div>
                    <div className="text-gray-400">{track.artist}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div>{track.duration}</div>
                  <div className="text-neon-orange">{track.genre}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 text-center text-xs animate-blink">
            <div className="text-neon-orange">
              🎼 Premium MIDI quality for your listening pleasure! 🎼
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}