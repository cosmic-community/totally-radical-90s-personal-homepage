export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-rainbow p-8 text-center">
      <div className="bg-black p-6 border-4 border-white">
        
        {/* Under Construction Banner */}
        <div className="mb-6">
          <div className="animate-blink text-neon-yellow font-comic text-2xl font-bold">
            🚧 This Site is ALWAYS Under Construction! 🚧
          </div>
          <div className="text-neon-green font-pixel text-sm mt-2">
            Because the World Wide Web never stops being AWESOME!
          </div>
        </div>
        
        {/* Site Info */}
        <div className="mb-6 space-y-2">
          <div className="text-neon-cyan font-comic text-lg">
            ★ Best viewed in Netscape Navigator 4.0 or higher! ★
          </div>
          <div className="text-neon-pink font-pixel text-sm">
            This site is 100% HTML and 200% RADICAL!
          </div>
          <div className="text-neon-orange font-serif text-sm">
            Made with ❤️ and lots of neon colors in {currentYear}
          </div>
        </div>
        
        {/* Cool Links Section */}
        <div className="mb-6">
          <div className="text-neon-purple font-comic text-lg font-bold mb-3">
            ★ Cool Links Around the Web! ★
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="animate-pulse text-neon-blue">🔗 Yahoo!</div>
            <div className="animate-pulse text-neon-green">🔗 AltaVista</div>
            <div className="animate-pulse text-neon-yellow">🔗 Hotmail</div>
            <div className="animate-pulse text-neon-orange">🔗 Geocities</div>
          </div>
        </div>
        
        {/* Web Ring */}
        <div className="mb-6">
          <div className="table-90s mx-auto">
            <div className="bg-gradient-90s p-1">
              <div className="bg-white p-3">
                <div className="text-black font-comic font-bold text-sm">
                  [ ← Prev ] | 90s Kids Web Ring | [ Next → ]
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Awards Section */}
        <div className="mb-6">
          <div className="text-neon-cyan font-comic text-lg font-bold mb-2">
            ★ My Totally Awesome Web Awards! ★
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="border-2 border-neon-pink bg-neon-yellow px-2 py-1 text-black text-xs font-bold">
              🏆 Cool Site of the Day!
            </div>
            <div className="border-2 border-neon-green bg-neon-cyan px-2 py-1 text-black text-xs font-bold">
              ✨ Radical Homepage Award!
            </div>
            <div className="border-2 border-neon-orange bg-neon-pink px-2 py-1 text-black text-xs font-bold">
              🌈 Best 90s Nostalgia Site!
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t-2 border-neon-purple pt-4">
          <div className="text-neon-green font-pixel text-sm">
            © 1997-{currentYear} - My Totally Radical Homepage
          </div>
          <div className="text-neon-yellow font-comic text-xs mt-1">
            All rights reserved! Keep it REAL and keep it 90s! ✨
          </div>
          <div className="animate-rainbow text-sm font-bold mt-2">
            ★ Thanks for visiting my corner of cyberspace! ★
          </div>
        </div>
        
      </div>
    </footer>
  );
}