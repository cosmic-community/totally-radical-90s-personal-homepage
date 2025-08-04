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
  const [volume, setVolume] = useState(30)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sample 90s-style tracks (using placeholder data URLs for demo)
  const sample90sTracks = [
    {
      name: 'Radical Synthwave',
      url: '/audio/sample-90s-song.mp3' // This will be our main track
    },
    {
      name: 'Neon Dreams',
      url: generateSynth90sSound()
    },
    {
      name: 'Digital Nostalgia',
      url: generateRetroBeep()
    }
  ]

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  useEffect(() => {
    // Try to fetch audio file from Cosmic CMS first, then fallback to sample tracks
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
          // Use our sample 90s track
          setAudioUrl(sample90sTracks[currentTrackIndex].url)
          setCurrentTrack(sample90sTracks[currentTrackIndex].name)
        }
      } catch (err) {
        if (hasStatus(err) && err.status === 404) {
          // No homepage object found, use sample track
          setAudioUrl(sample90sTracks[currentTrackIndex].url)
          setCurrentTrack(sample90sTracks[currentTrackIndex].name)
        } else {
          console.error('Error fetching audio file:', err)
          setAudioUrl(sample90sTracks[currentTrackIndex].url)
          setCurrentTrack(sample90sTracks[currentTrackIndex].name)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchAudioFile()
  }, [currentTrackIndex])

  // Generate a 90s synthwave-style sound
  function generateSynth90sSound(): string {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const sampleRate = audioContext.sampleRate || 44100 // Fix: Provide fallback value
      const duration = 3 // 3 seconds
      const samples = sampleRate * duration
      const buffer = audioContext.createBuffer(1, samples, sampleRate)
      const channelData = buffer.getChannelData(0)

      // Generate a synthwave-style melody
      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate
        
        // Main synth lead
        const leadFreq = 440 + Math.sin(t * 0.5) * 110
        const lead = Math.sin(2 * Math.PI * leadFreq * t) * 0.4 * Math.exp(-t * 0.3)
        
        // Bass line
        const bassFreq = 110 + Math.sin(t * 0.25) * 20
        const bass = Math.sin(2 * Math.PI * bassFreq * t) * 0.3
        
        // Arp
        const arpFreq = 880 * (1 + Math.floor(t * 4) % 4 * 0.25)
        const arp = Math.sin(2 * Math.PI * arpFreq * t) * 0.2 * (Math.sin(t * 8) > 0 ? 1 : 0)
        
        channelData[i] = lead + bass * 0.5 + arp * 0.3
      }

      const wavData = bufferToWav(buffer)
      const blob = new Blob([wavData], { type: 'audio/wav' })
      return URL.createObjectURL(blob)
    } catch {
      return generateSimpleBeep()
    }
  }

  // Generate a retro computer beep
  function generateRetroBeep(): string {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const sampleRate = audioContext.sampleRate || 44100 // Fix: Provide fallback value
      const duration = 2
      const samples = sampleRate * duration
      const buffer = audioContext.createBuffer(1, samples, sampleRate)
      const channelData = buffer.getChannelData(0)

      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate
        const freq = 800 + Math.sin(t * 10) * 200
        channelData[i] = Math.sin(2 * Math.PI * freq * t) * 0.3 * Math.exp(-t * 1.5)
      }

      const wavData = bufferToWav(buffer)
      const blob = new Blob([wavData], { type: 'audio/wav' })
      return URL.createObjectURL(blob)
    } catch {
      return generateSimpleBeep()
    }
  }

  // Simple fallback beep
  function generateSimpleBeep(): string {
    return 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAAAAAAAAAAAAA=='
  }

  // Convert AudioBuffer to WAV
  const bufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
    const length = buffer.length
    const arrayBuffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(arrayBuffer)
    const channels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate || 44100 // Fix: Use nullish coalescing with fallback

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

    const channelData = buffer.getChannelData(0)
    let offset = 44
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, channelData[i]))
      view.setInt16(offset, sample * 0x7FFF, true)
      offset += 2
    }

    return arrayBuffer
  }

  // Audio event handlers
  useEffect(() => {
    if (audioRef.current && audioUrl) {
      const audio = audioRef.current
      audio.volume = volume / 100
      audio.muted = isMuted
      
      const handleCanPlay = () => setError(null)
      const handleError = () => {
        setError('Audio file could not be loaded')
        setIsPlaying(false)
      }
      const handleEnded = () => {
        setIsPlaying(false)
        // Auto-play next track
        nextTrack()
      }
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
        setDuration(audio.duration || 0)
      }
      const handleLoadedMetadata = () => {
        setDuration(audio.duration || 0)
      }
      
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      
      return () => {
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    }
  }, [audioUrl, isMuted, volume])

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl || isLoading) return

    const audio = audioRef.current

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        setError(null)
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % sample90sTracks.length
    setCurrentTrackIndex(nextIndex)
    setIsPlaying(false)
  }

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? sample90sTracks.length - 1 : currentTrackIndex - 1
    setCurrentTrackIndex(prevIndex)
    setIsPlaying(false)
  }

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickTime = (clickX / width) * duration
    
    audioRef.current.currentTime = clickTime
    setCurrentTime(clickTime)
  }

  if (isLoading) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="table-90s">
          <div className="bg-gradient-90s p-1">
            <div className="bg-white p-4 border-2 border-black min-w-[280px]">
              <div className="flex items-center gap-2">
                <div className="text-neon-purple font-comic font-bold text-sm animate-pulse">
                  🎵 Loading Radical Music Player...
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
          <div className="bg-white p-4 border-2 border-black min-w-[280px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-neon-purple font-comic font-bold text-sm">
                🎵 Radical Music Player
              </div>
              <div className="text-xs text-gray-600">
                {currentTrackIndex + 1}/{sample90sTracks.length}
              </div>
            </div>

            {/* Track Info */}
            <div className="mb-3">
              <div className="text-xs font-bold text-black truncate">
                {currentTrack}
              </div>
              <div className="text-xs text-gray-600">
                90s Nostalgia Collection
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div 
                className="bg-gray-300 h-2 border border-black cursor-pointer relative"
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-neon-purple h-full transition-all duration-100"
                  style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <button
                onClick={prevTrack}
                className="btn-90s px-2 py-1 text-xs hover:bg-neon-cyan hover:text-black transition-colors"
                title="Previous track"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlay}
                className="btn-90s px-3 py-2 text-sm hover:bg-neon-green hover:text-black transition-colors"
                disabled={!audioUrl || isLoading}
                title={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={nextTrack}
                className="btn-90s px-2 py-1 text-xs hover:bg-neon-cyan hover:text-black transition-colors"
                title="Next track"
              >
                ⏭️
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

            {/* Volume Control */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-600">Vol:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-gray-300 border border-black appearance-none slider-90s"
                style={{
                  background: `linear-gradient(to right, #ff00ff 0%, #ff00ff ${volume}%, #ccc ${volume}%, #ccc 100%)`
                }}
              />
              <span className="text-xs text-gray-600 w-8">{volume}%</span>
            </div>

            {/* Status */}
            <div className="text-xs text-center">
              {error ? (
                <div className="text-red-600">{error}</div>
              ) : isPlaying ? (
                <div className="animate-pulse text-neon-purple">
                  ♪ Now Playing ♪
                </div>
              ) : (
                <div className="text-gray-700">
                  ♪ Click ▶️ to jam out! ♪
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