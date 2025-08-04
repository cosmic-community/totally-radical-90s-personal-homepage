export default function SiteMap() {
  return (
    <div className="table-90s">
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-white p-4">
          <h3 className="font-comic font-bold text-neon-purple text-lg text-center mb-4 animate-pulse">
            🗺️ Site Navigation Map 🗺️
          </h3>
          
          <div className="font-mono text-sm text-black">
            <div className="mb-2">
              <span className="font-bold text-neon-blue">📁 My Totally Radical Homepage</span>
            </div>
            <div className="ml-4">
              <div>├── 🏠 <a href="#welcome" className="text-neon-purple hover:text-neon-pink">Welcome Section</a></div>
              <div>├── 👤 <a href="#about" className="text-neon-purple hover:text-neon-pink">About Me</a></div>
              <div>├── 📸 <a href="#gallery" className="text-neon-purple hover:text-neon-pink">Photo Gallery</a></div>
              <div>│   ├── 📷 Personal Photos</div>
              <div>│   ├── 💾 Computer Screenshots</div>
              <div>│   ├── 🎨 Cool Clip Art</div>
              <div>│   └── 📼 90s Memorabilia</div>
              <div>├── 🎵 <a href="#music" className="text-neon-purple hover:text-neon-pink">Music Collection</a></div>
              <div>│   ├── 🎤 Favorite Songs</div>
              <div>│   ├── 💿 CD Collection</div>
              <div>│   └── 🎹 MIDI Files</div>
              <div>├── 📝 <a href="#blog" className="text-neon-purple hover:text-neon-pink">Blog Posts</a></div>
              <div>├── 📖 <a href="#guestbook" className="text-neon-purple hover:text-neon-pink">Guestbook</a></div>
              <div>├── 🔗 <a href="#links" className="text-neon-purple hover:text-neon-pink">Cool Links</a></div>
              <div>└── 📊 <a href="#stats" className="text-neon-purple hover:text-neon-pink">Site Statistics</a></div>
            </div>
          </div>
          
          <div className="mt-4 p-2 bg-neon-yellow text-black text-center">
            <div className="font-comic font-bold text-sm animate-blink">
              🚧 Some sections still under construction! 🚧
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <div className="animate-marquee text-xs text-neon-green font-bold">
              ✨ Navigate with style through my rad corner of cyberspace! ✨
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}