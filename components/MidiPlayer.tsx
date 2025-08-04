'use client'

import { useState, useEffect, useRef } from 'react'
import { cosmic, hasStatus } from '@/lib/cosmic'
import type { Homepage } from '@/types'

export default function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [midiUrl, setMidiUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Fetch MIDI file from Cosmic CMS
    const fetchMidiFile = async () => {
      try {
        const { object } = await cosmic.objects
          .findOne({
            type: 'homepage'
          })
          .props(['metadata'])
          .depth(1)
        
        const homepage = object as Homepage
        if (homepage?.metadata?.midi_file?.url) {
          setMidiUrl(homepage.metadata.midi_file.url)
        } else {
          // Fallback to a placeholder audio file that actually works
          setMidiUrl('/audio/placeholder-music.mp3')
        }
      } catch (err) {
        if (hasStatus(err) && err.status === 404) {
          // No homepage object found, use fallback
          setMidiUrl('/audio/placeholder-music.mp3')
        } else {
          console.error('Error fetching MIDI file:', err)
          setError('Could not load music file')
        }
      }
    }

    fetchMidiFile()
  }, [])

  useEffect(() => {
    if (audioRef.current && midiUrl) {
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      audioRef.current.muted = isMuted
    }
  }, [midiUrl, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current || !midiUrl) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (err) {
      console.error('Error playing audio:', err)
      setError('Could not play music - try clicking again!')
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

  if (error && !midiUrl) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <div className="table-90s">
          <div className="bg-gradient-90s p-1">
            <div className="bg-white p-3 border-2 border-black">
              <div className="text-red-600 text-xs">
                🎵 Music player unavailable
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
                className="btn-90s px-2 py-1 text-xs"
                disabled={!midiUrl}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={toggleMute}
                className="btn-90s px-2 py-1 text-xs"
                disabled={!midiUrl}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
            <div className="text-xs text-black mt-1">
              {error ? (
                <div className="text-red-600">{error}</div>
              ) : isPlaying ? (
                <div className="animate-pulse">♪ Now Playing: Radical90s.mid ♪</div>
              ) : (
                <div>♪ Click to play awesome 90s tunes! ♪</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {midiUrl && (
        <audio
          ref={audioRef}
          src={midiUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => {
            setError('Audio format not supported')
            setIsPlaying(false)
          }}
          onLoadStart={() => setError(null)}
          muted={isMuted}
          preload="none"
        />
      )}
    </div>
  )
}