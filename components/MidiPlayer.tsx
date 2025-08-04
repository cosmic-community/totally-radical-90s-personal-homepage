'use client'

import { useState, useEffect, useRef } from 'react'
import { cosmic, hasStatus } from '@/lib/cosmic'
import type { MidiTrack } from '@/types'

export default function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [tracks, setTracks] = useState<MidiTrack[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fallback tracks with sample audio (you can replace these URLs with actual MIDI-converted audio)
  const fallbackTracks = [
    {
      id: 'fallback-1',
      title: 'Für Elise - Beethoven',
      slug: 'fur-elise-beethoven',
      metadata: {
        track_title: 'Für Elise',
        composer: 'Ludwig van Beethoven',
        genre: { key: 'classical', value: 'Classical' },
        tempo: 120,
        duration: '2:45',
        difficulty: { key: 'intermediate', value: 'Intermediate' },
        description: 'The most famous classical piece ever!',
        midi_file: null,
        album_cover: {
          url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=2000&auto=format,compress',
          imgix_url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=2000&auto=format,compress'
        }
      }
    },
    {
      id: 'fallback-2',
      title: 'The Entertainer - Scott Joplin',
      slug: 'the-entertainer-scott-joplin',
      metadata: {
        track_title: 'The Entertainer',
        composer: 'Scott Joplin',
        genre: { key: 'jazz', value: 'Jazz' },
        tempo: 120,
        duration: '3:30',
        difficulty: { key: 'advanced', value: 'Advanced' },
        description: 'Scott Joplin\'s most famous ragtime piece!',
        midi_file: null,
        album_cover: {
          url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=2000&auto=format,compress',
          imgix_url: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=2000&auto=format,compress'
        }
      }
    },
    {
      id: 'fallback-3',
      title: 'Greensleeves - Traditional',
      slug: 'greensleeves-traditional',
      metadata: {
        track_title: 'Greensleeves',
        composer: 'Traditional (Anonymous)',
        genre: { key: 'folk', value: 'Folk' },
        tempo: 90,
        duration: '3:20',
        difficulty: { key: 'beginner', value: 'Beginner' },
        description: 'A hauntingly beautiful English ballad from the Renaissance era.',
        midi_file: null,
        album_cover: {
          url: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=2000&auto=format,compress',
          imgix_url: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=2000&auto=format,compress'
        }
      }
    }
  ]

  useEffect(() => {
    const fetchMidiTracks = async () => {
      try {
        setIsLoading(true)
        const response = await cosmic.objects
          .find({
            type: 'midi-music-library'
          })
          .props(['id', 'title', 'slug', 'metadata'])
          .depth(1)
        
        const cosmicTracks = response.objects as MidiTrack[]
        
        if (cosmicTracks.length > 0) {
          setTracks(cosmicTracks)
        } else {
          // Use fallback tracks if no tracks in Cosmic
          setTracks(fallbackTracks)
        }
      } catch (err) {
        if (hasStatus(err) && err.status === 404) {
          // No tracks found, use fallback
          setTracks(fallbackTracks)
        } else {
          console.error('Error fetching MIDI tracks:', err)
          setTracks(fallbackTracks)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchMidiTracks()
  }, [])

  const currentTrack = tracks[currentTrackIndex]
  const audioUrl = getAudioUrl(currentTrack)

  function getAudioUrl(track: MidiTrack | undefined): string | null {
    if (!track) return null
    
    // If the track has an actual MIDI file uploaded to Cosmic
    if (track.metadata?.midi_file?.url) {
      return track.metadata.midi_file.url
    }
    
    // Generate a simple audio tone as fallback
    return generateToneDataURL(track.metadata?.track_title || 'Unknown Track')
  }

  // Generate a simple audio tone using Web Audio API
  const generateToneDataURL = (trackName: string) => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) {
        throw new Error('Web Audio API not supported')
      }
      
      const audioContext = new AudioContextClass()
      const sampleRate = audioContext.sampleRate
      const duration = 3 // 3 seconds
      const samples = sampleRate * duration
      const buffer = audioContext.createBuffer(1, samples, sampleRate)
      const channelData = buffer.getChannelData(0)

      // Generate different melodies based on track name
      const melodySeeds = {
        'Für Elise': [523, 494, 523, 494, 523, 392, 466, 440, 349], // E, D#, E, D#, E, B, D, C, A
        'The Entertainer': [262, 294, 330, 349, 392, 349, 330, 294], // C, D, E, F, G, F, E, D  
        'Greensleeves': [392, 466, 523, 587, 523, 466, 415, 392], // G, B, C, D, C, B, G#, G
        'Unknown Track': [440, 554, 659, 440] // A, C#, E, A
      }
      
      const frequencies = melodySeeds[trackName as keyof typeof melodySeeds] || melodySeeds['Unknown Track']
      
      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate
        const noteIndex = Math.floor((t * 2) % frequencies.length)
        const freq = frequencies[noteIndex]
        const envelope = Math.exp(-t * 0.3) // Gentle decay
        
        channelData[i] = Math.sin(2 * Math.PI * freq * t) * 0.3 * envelope
      }

      // Convert buffer to WAV data URL
      const wavData = bufferToWav(buffer)
      const blob = new Blob([wavData], { type: 'audio/wav' })
      return URL.createObjectURL(blob)
    } catch {
      // Fallback to a simple beep sound data URL
      return 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQ4AAAAAAAAAAAAAAA=='
    }
  }

  // Simple WAV file creation helper
  const bufferToWav = (buffer: AudioBuffer) => {
    const length = buffer.length
    const arrayBuffer = new ArrayBuffer(44 + length * 2)
    const view = new DataView(arrayBuffer)
    const channels = buffer.numberOfChannels
    const sampleRate = buffer.sampleRate ?? 44100

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
      audio.loop = false // Don't loop individual tracks
      audio.volume = 0.4
      audio.muted = isMuted
      
      const handleCanPlay = () => {
        setError(null)
      }
      
      const handleError = () => {
        setError('Audio file could not be loaded')
        setIsPlaying(false)
      }
      
      const handleEnded = () => {
        setIsPlaying(false)
        // Auto-advance to next track
        nextTrack()
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

  const nextTrack = () => {
    if (tracks.length > 0) {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length)
      setIsPlaying(false)
    }
  }

  const prevTrack = () => {
    if (tracks.length > 0) {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
      setIsPlaying(false)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="table-90s">
          <div className="bg-gradient-90s p-1">
            <div className="bg-white p-3 border-2 border-black max-w-xs">
              <div className="flex items-center gap-2">
                <div className="text-neon-purple font-comic font-bold text-sm">
                  🎵 Loading MIDI Library...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (tracks.length === 0) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="table-90s">
          <div className="bg-gradient-90s p-1">
            <div className="bg-white p-3 border-2 border-black max-w-xs">
              <div className="text-neon-purple font-comic font-bold text-sm">
                🎵 No MIDI tracks found
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
          <div className="bg-white p-3 border-2 border-black max-w-xs">
            <div className="flex items-center gap-1 mb-2">
              <div className="text-neon-purple font-comic font-bold text-sm">
                🎵 MIDI Player
              </div>
              <div className="text-xs text-gray-600">
                ({currentTrackIndex + 1}/{tracks.length})
              </div>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              <button
                onClick={prevTrack}
                className="btn-90s px-1 py-1 text-xs hover:bg-neon-cyan hover:text-black transition-colors"
                disabled={tracks.length <= 1}
                title="Previous track"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlay}
                className="btn-90s px-2 py-1 text-xs hover:bg-neon-green hover:text-black transition-colors"
                disabled={!audioUrl || isLoading}
                title={isPlaying ? 'Pause music' : 'Play music'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={nextTrack}
                className="btn-90s px-1 py-1 text-xs hover:bg-neon-cyan hover:text-black transition-colors"
                disabled={tracks.length <= 1}
                title="Next track"
              >
                ⏭️
              </button>
              <button
                onClick={toggleMute}
                className="btn-90s px-1 py-1 text-xs hover:bg-neon-pink hover:text-black transition-colors"
                disabled={!audioUrl || isLoading}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
            
            <div className="text-xs text-black">
              {error ? (
                <div className="text-red-600 mb-1">{error}</div>
              ) : currentTrack ? (
                <div className="mb-1">
                  <div className="font-bold text-neon-purple truncate">
                    {currentTrack.metadata?.track_title || currentTrack.title}
                  </div>
                  <div className="text-gray-600 truncate">
                    by {currentTrack.metadata?.composer || 'Unknown'}
                  </div>
                  {currentTrack.metadata?.genre && (
                    <div className="text-gray-500 text-xs">
                      {currentTrack.metadata.genre.value} • {currentTrack.metadata?.duration || 'Unknown duration'}
                    </div>
                  )}
                </div>
              ) : null}
              
              {isPlaying ? (
                <div className="animate-pulse text-neon-green text-center">
                  ♪ Now Playing ♪
                </div>
              ) : (
                <div className="text-gray-700 text-center">
                  ♪ Click ▶️ to play! ♪
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
            setError('Audio format not supported!')
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