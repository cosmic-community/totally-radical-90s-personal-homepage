'use client'

import { useState, useEffect, useRef } from 'react'

export default function MidiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulated MIDI-style background music (using a placeholder)
  const musicUrl = "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSMFl"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          console.log('Autoplay prevented');
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={toggleMute}
                className="btn-90s px-2 py-1 text-xs"
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
            <div className="text-xs text-black mt-1">
              {isPlaying ? (
                <div className="animate-pulse">♪ Now Playing: Radical90s.mid ♪</div>
              ) : (
                <div>♪ Click to play awesome 90s tunes! ♪</div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={musicUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        muted={isMuted}
      />
    </div>
  );
}