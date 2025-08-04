export default function Header() {
  return (
    <header className="text-center py-8">
      <div className="table-90s mx-auto">
        <div className="bg-gradient-rainbow p-2">
          <div className="bg-white p-6">
            <h1 className="text-5xl font-comic font-bold text-transparent bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text animate-pulse mb-4">
              🌈 MY TOTALLY AWESOME 90s HOMEPAGE! 🌈
            </h1>
            <div className="marquee text-xl font-comic text-neon-purple font-bold">
              ★ Welcome to the most RADICAL corner of cyberspace! ★ Grab your favorite drink and enjoy the 90s vibes! ★
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated decorations */}
      <div className="flex justify-center gap-8 mt-6">
        <div className="animate-bounce text-4xl">🎮</div>
        <div className="animate-spin-slow text-4xl">💿</div>
        <div className="animate-wiggle text-4xl">📺</div>
        <div className="animate-bounce-slow text-4xl">📞</div>
        <div className="animate-pulse text-4xl">💾</div>
      </div>
      
      {/* Under construction banner */}
      <div className="mt-4">
        <div className="construction inline-block animate-blink">
          🚧 UNDER CONSTRUCTION - ALWAYS IMPROVING! 🚧
        </div>
      </div>
    </header>
  )
}