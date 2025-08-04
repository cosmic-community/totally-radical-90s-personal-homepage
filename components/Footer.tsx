import WebRings from './WebRings'
import BlinkingText from './BlinkingText'
import MarqueeText from './MarqueeText'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 py-8 text-center">
      <div className="table-90s mx-auto max-w-6xl">
        <div className="bg-gradient-90s p-2">
          <div className="bg-white p-6 text-black">
            
            {/* Web Rings Section */}
            <div className="mb-8">
              <h3 className="font-comic font-bold text-neon-purple text-xl mb-4">
                <BlinkingText>🔗 Web Rings - Join the Community! 🔗</BlinkingText>
              </h3>
              <WebRings />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              {/* Best viewed in */}
              <div className="text-center">
                <h3 className="font-comic font-bold text-neon-purple mb-2">
                  <BlinkingText speed="slow">Best Viewed In:</BlinkingText>
                </h3>
                <div className="space-y-1 text-sm">
                  <div>🌍 Netscape Navigator 4.0+</div>
                  <div>🖥️ 800x600 Resolution</div>
                  <div>🎨 256 Colors</div>
                  <div>🔊 Sound Blaster Compatible</div>
                  <div>💾 16MB RAM Required</div>
                  <div>📻 28.8k Modem Recommended</div>
                </div>
              </div>
              
              {/* Affiliates & Awards */}
              <div className="text-center">
                <h3 className="font-comic font-bold text-neon-purple mb-2">
                  <BlinkingText speed="fast">Awards & Affiliates:</BlinkingText>
                </h3>
                <div className="space-y-1 text-sm">
                  <div>🏆 Site of the Day Winner!</div>
                  <div>⭐ 5-Star Rated Homepage</div>
                  <div>🎖️ Geocities Featured Site</div>
                  <div>🥇 Tripod Top 100</div>
                  <div>💎 AngelFire Premium</div>
                  <div>🌟 Yahoo! Pick of the Week</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-center">
                <h3 className="font-comic font-bold text-neon-purple mb-2">
                  <BlinkingText>Site Stats:</BlinkingText>
                </h3>
                <div className="space-y-1 text-sm">
                  <div>📅 Est. 1997</div>
                  <div>🔄 Last Updated: Today!</div>
                  <div>⭐ 100% Radical Content</div>
                  <div>🚀 Powered by Awesome</div>
                  <div>💖 Made with Love</div>
                  <div>🎵 MIDI Background Music</div>
                </div>
              </div>
            </div>
            
            {/* Scrolling copyright */}
            <div className="border-t-2 border-neon-cyan pt-4 mb-4">
              <MarqueeText className="font-comic text-lg font-bold text-neon-green" speed="slow">
                © 1997-{currentYear} My Totally Awesome Homepage - All Rights Reserved - Unauthorized copying is totally not cool, dude! - Thanks for visiting my radical cyber-space!
              </MarqueeText>
            </div>
            
            <div className="text-center">
              <p className="text-sm mt-2">
                <BlinkingText className="text-neon-orange font-bold">
                  Made with ❤️ and lots of 90s nostalgia! This site is totally RADICAL!
                </BlinkingText>
              </p>
              <div className="mt-2 text-xs text-gray-600">
                Powered by Cosmic CMS ⚡ Built with Next.js 🚀
              </div>
            </div>
            
            {/* Animated footer decorations */}
            <div className="flex justify-center gap-4 mt-4">
              <span className="animate-bounce">🎵</span>
              <span className="animate-pulse">⭐</span>
              <span className="animate-wiggle">🌈</span>
              <span className="animate-spin-slow">✨</span>
              <span className="animate-bounce-slow">🎨</span>
              <span className="animate-blink text-neon-pink">💖</span>
              <span className="animate-wiggle">🔥</span>
            </div>
            
            {/* Final blinking message */}
            <div className="mt-4">
              <BlinkingText className="text-neon-purple font-comic font-bold" speed="fast">
                🌟 THANKS FOR VISITING MY AWESOME HOMEPAGE! COME BACK SOON! 🌟
              </BlinkingText>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}