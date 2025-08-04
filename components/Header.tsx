import Link from 'next/link'

export default function Header() {
  return (
    <header className="text-center py-8 bg-gradient-90s">
      {/* Animated Logo */}
      <div className="mb-6">
        <div className="inline-block animate-bounce-slow">
          <div className="text-6xl md:text-8xl font-pixel text-white glow-text animate-rainbow">
            🌈 TOTALLY RAD 🌈
          </div>
        </div>
      </div>
      
      {/* Site Title */}
      <h1 className="text-4xl md:text-6xl font-comic text-neon-yellow glow-text animate-pulse-fast mb-4">
        My Awesome 90s Homepage!
      </h1>
      
      {/* Scrolling Marquee */}
      <div className="bg-neon-pink text-black py-2 font-bold marquee">
        <span>
          ★ Welcome to the most RADICAL site on the World Wide Web! ★ 
          Last updated: {new Date().toLocaleDateString()} ★ 
          Best viewed in Netscape Navigator! ★
        </span>
      </div>
      
      {/* Under Construction GIF placeholder */}
      <div className="mt-4">
        <div className="inline-block animate-blink">
          <div className="bg-neon-yellow text-black px-4 py-2 font-bold border-4 border-neon-orange">
            🚧 UNDER CONSTRUCTION 🚧
          </div>
        </div>
      </div>
    </header>
  )
}