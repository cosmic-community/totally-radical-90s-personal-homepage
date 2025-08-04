import BlinkingText from './BlinkingText'
import MarqueeText from './MarqueeText'
import UnderConstruction from './UnderConstruction'
import FireAnimations from './FireAnimations'

export default function Header() {
  return (
    <header className="text-center py-8">
      <div className="table-90s mx-auto">
        <div className="bg-gradient-rainbow p-2">
          <div className="bg-white p-6">
            <h1 className="text-5xl font-comic font-bold text-transparent bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green bg-clip-text animate-pulse mb-4">
              🌈 MY TOTALLY AWESOME 90s HOMEPAGE! 🌈
            </h1>
            
            {/* Scrolling marquee text */}
            <MarqueeText className="text-xl font-comic text-neon-purple font-bold">
              ★ Welcome to the most RADICAL corner of cyberspace! ★ Grab your favorite drink and enjoy the 90s vibes! ★ This site is totally TUBULAR! ★
            </MarqueeText>
            
            {/* Fire animation */}
            <div className="my-4">
              <FireAnimations />
            </div>
            
            {/* Blinking welcome message */}
            <div className="mt-4">
              <BlinkingText className="text-lg font-comic text-neon-orange font-bold">
                🎉 WELCOME TO MY CYBER WORLD! 🎉
              </BlinkingText>
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
        <div className="animate-bounce text-4xl">🕹️</div>
        <div className="animate-wiggle text-4xl">📼</div>
      </div>
      
      {/* Under construction banner */}
      <div className="mt-6">
        <UnderConstruction 
          message="SITE ALWAYS UNDER CONSTRUCTION - BUILDING THE FUTURE!" 
          size="normal"
        />
      </div>
      
      {/* Additional blinking elements */}
      <div className="mt-4 flex justify-center gap-4">
        <BlinkingText className="text-neon-pink font-bold" speed="fast">
          ⭐ NEW! ⭐
        </BlinkingText>
        <BlinkingText className="text-neon-cyan font-bold" speed="slow">
          🔥 HOT! 🔥
        </BlinkingText>
        <BlinkingText className="text-neon-green font-bold">
          💯 COOL! 💯
        </BlinkingText>
      </div>
    </header>
  )
}