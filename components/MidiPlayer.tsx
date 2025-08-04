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
  const [currentTrack, setCurrentTrack] = useState('Radical90s.mp3')
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fallback playlist of creative commons or royalty-free audio URLs
  const fallbackTracks = [
    {
      name: 'Chill 90s Vibes',
      url: 'https://www.soundjay.com/misc/sounds/fail-buzzer-02.mp3' // This is just a placeholder - you'd want actual music
    }
  ]

  useEffect(() => {
    // Fetch audio file from Cosmic CMS or use fallback
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
          setCurrentTrack('Cosmic Audio File')
        } else {
          // Use a data URL for a simple audio tone as fallback
          setAudioUrl(generateToneDataURL())
          setCurrentTrack('Generated 90s Beep')
        }
      } catch (err) {
        if (hasStatus(err) && err.status === 404) {
          // No homepage object found, use generated tone
          setAudioUrl(generateToneDataURL())
          setCurrentTrack('Generated 90s Beep')
        } else {
          console.error('Error fetching audio file:', err)
          setAudioUrl(generateToneDataURL())
          setCurrentTrack('Generated 90s Beep')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAudioFile()
  }, [])

  // Generate a simple audio tone using Web Audio API
  const generateToneDataURL = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const sampleRate = audioContext.sampleRate
      const duration = 2 // 2 seconds
      const samples = sampleRate * duration
      const buffer = audioContext.createBuffer(1, samples, sampleRate)
      const channelData = buffer.getChannelData(0)

      // Generate a simple melody reminiscent of 90s computer sounds
      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate
        const freq1 = 440 + Math.sin(t * 2) * 100 // Base frequency with slight modulation
        const freq2 = 880 + Math.sin(t * 3) * 50  // Harmonic
        
        channelData[i] = 
          (Math.sin(2 * Math.PI * freq1 * t) * 0.3 * Math.exp(-t * 0.5)) +
          (Math.sin(2 * Math.PI * freq2 * t) * 0.2 * Math.exp(-t * 0.8))
      }

      // Convert buffer to WAV data URL
      const wavData = bufferToWav(buffer)
      const blob = new Blob([wavData], { type: 'audio/wav' })
      return URL.createObjectURL(blob)
    } catch {
      // Fallback to a simple, short beep sound data URL
      return 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAAAAAAAAAAAAA=='
    }
  }

  // Simple WAV file creation helper
  const bufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length
    const arrayBuffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(arrayBuffer)
    const channels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate ?? 44100 // Fix: Use nullish coalescing to ensure we have a number

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i))
      }
    }

    writeString(0, 'RIFF')
    view.setUint32(4, 36 + length * 2, true)
    writeString(8, 'WAVE')
    writeString(12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, channels, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * 2, true)
    view.setUint16(32, 2, true)
    view.setUint16(34, 16, true)
    writeString(36, 'data')
    view.setUint32(40, length * 2, true)

    // Convert float samples to 16-bit PCM
    const channelData = buffer.getChannelData(0)
    let offset = 44
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]))
      view.setInt16(offset, sample * 0x7FFF, true)
      offset += 2
    }

    return arrayBuffer
  }

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
                  ♪ Now Playing: {currentTrack} ♪
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