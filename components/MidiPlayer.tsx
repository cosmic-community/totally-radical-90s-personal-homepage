'use client'

import { useState, useEffect, useRef } from 'react'
import { cosmic, hasStatus } from '@/lib/cosmic'
import type { Homepage } from '@/types'

export default function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Fetch audio file from Cosmic CMS
    const fetchAudioFile = async () => {
      try {
        setIsLoading(true)
        const { object } = await cosmic.objects
          .findOne({
            type: 'homepage'
          })
          .props(['metadata'])
          .depth(1)
        
        const homepage = object as Homepage
        if (homepage?.metadata?.midi_file?.url) {
          // Use the file from Cosmic if available
          setAudioUrl(homepage.metadata.midi_file.url)
        } else {
          // Fallback to placeholder audio file
          setAudioUrl('/audio/placeholder-music.mp3')
        }
      } catch (err) {
        if (hasStatus(err) && err.status === 404) {
          // No homepage object found, use fallback
          setAudioUrl('/audio/placeholder-music.mp3')
        } else {
          console.error('Error fetching audio file:', err)
          setAudioUrl('/audio/placeholder-music.mp3')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAudioFile()
  }, [])

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      const audio = audioRef.current
      audio.loop = true
      audio.volume = 0.3
      audio.muted = isMuted
      
      // Add event listeners
      const handleCanPlay = () => {
        setError(null)
      }
      
      const handleError = () => {
        setError('Audio file could not be loaded')
        setIsPlaying(false)
      }
      
      const handleEnded = () => {
        setIsPlaying(false)
      }
      
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)
      audio.addEventListener('ended', handleEnded)
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [audioUrl, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl || isLoading) return

    const audio = audioRef.current

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        // Reset error state when trying to play
        setError(null)
        
        // Ensure audio is loaded
        if (audio.readyState < 2) {
          audio.load()
        }
        
        const playPromise = audio.play()
        
        if (playPromise !== undefined) {
          await playPromise
          setIsPlaying(true)
        }
      }
    } catch (err) {
      console.error('Error playing audio:', err)
      setError('Click play again to start the music!')
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted
      audioRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="table-90s">
          <div className="bg-gradient-90s p-1">
            <div className="bg-white p-3 border-2 border-black">
              <div className="flex items-center gap-2">
                <div className="text-neon-purple font-comic font-bold text-sm">
                  🎵 Loading...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="table-90s">
        <div className="bg-gradient-90s p-1">
          <div className="bg-white p-3 border-2 border-black">
            <div className="flex items-center gap-2">
              <div className="text-neon-purple font-comic font-bold text-sm">
                🎵 MIDI Player
              </div>
              <button
                onClick={togglePlay}
                className="btn-90s px-2 py-1 text-xs hover:bg-neon-green hover:text-black transition-colors"
                disabled={!audioUrl || isLoading}
                title={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={toggleMute}
                className="btn-90s px-2 py-1 text-xs hover:bg-neon-pink hover:text-black transition-colors"
                disabled={!audioUrl || isLoading}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
            <div className="text-xs text-black mt-1">
              {error ? (
                <div className="text-red-600">{error}</div>
              ) : isPlaying ? (
                <div className="animate-pulse text-neon-purple">
                  ♪ Now Playing: Radical90s.mp3 ♪
                </div>
              ) : (
                <div className="text-gray-700">
                  ♪ Click ▶️ to play awesome 90s tunes! ♪
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={(e) => {
            console.error('Audio error:', e)
            setError('Audio format not supported - try a different browser!')
            setIsPlaying(false)
          }}
          onLoadStart={() => setError(null)}
          muted={isMuted}
          preload="metadata"
          crossOrigin="anonymous"
        />
      )}
    </div>
  )
}