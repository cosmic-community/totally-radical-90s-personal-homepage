export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 py-8 text-center">
      <div className="table-90s mx-auto max-w-4xl">
        <div className="bg-gradient-90s p-2">
          <div className="bg-white p-6 text-black">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              {/* Best viewed in */}
              <div className="text-center">
                <h3 className="font-comic font-bold text-neon-purple mb-2">Best Viewed In:</h3>
                <div className="space-y-1 text-sm">
                  <div>🌍 Netscape Navigator 4.0+</div>
                  <div>🖥️ 800x600 Resolution</div>
                  <div>🎨 256 Colors</div>
                  <div>🔊 Sound Blaster Compatible</div>
                </div>
              </div>
              
              {/* Webrings */}
              <div className="text-center">
                <h3 className="font-comic font-bold text-neon-purple mb-2">Member Of:</h3>
                <div className="space-y-1 text-sm">
                  <div>🔗 90s Kids Webring</div>
                  <div>🔗 Radical Homepages Ring</div>
                  <div>🔗 Totally Tubular Sites</div>
                  <div>🔗 Awesome Personal Pages</div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-center">
                <h3 className="font-comic font-bold text-neon-purple mb-2">Site Stats:</h3>
                <div className="space-y-1 text-sm">
                  <div>📅 Est. 1997</div>
                  <div>🔄 Last Updated: Today!</div>
                  <div>⭐ 100% Radical Content</div>
                  <div>🚀 Powered by Awesome</div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t-2 border-neon-cyan pt-4">
              <p className="font-comic text-lg font-bold text-neon-green animate-pulse">
                © 1997-{currentYear} My Totally Awesome Homepage
              </p>
              <p className="text-sm mt-2">
                Made with ❤️ and lots of 90s nostalgia! This site is totally RADICAL!
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}