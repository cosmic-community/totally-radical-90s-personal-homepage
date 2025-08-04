export default function WebPortal() {
  const coolSites = [
    { name: 'Radical 90s Kids Club', url: '#', description: 'Where all the cool kids hang out!' },
    { name: 'Awesome GIF Archive', url: '#', description: 'The BEST animated GIFs on the web!' },
    { name: 'MIDI Music Paradise', url: '#', description: 'Totally tubular tunes for your ears!' },
    { name: 'Neon Colors Central', url: '#', description: 'Bright colors that will blow your mind!' },
    { name: 'GeoCities Hall of Fame', url: '#', description: 'The most radical homepages ever!' },
    { name: 'Cyber Pet Adoption Center', url: '#', description: 'Adopt your own virtual pet today!' }
  ]

  const webRings = [
    'Ring of Radical Homepages',
    'Totally Awesome 90s Kids',
    'Neon Dreams Web Ring',
    'MIDI Music Lovers United'
  ]

  return (
    <div className="table-90s">
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-white p-4">
          <h3 className="font-comic font-bold text-neon-purple text-lg text-center mb-4 animate-pulse">
            🌐 Cool Sites Directory 🌐
          </h3>
          
          {/* Cool Sites Section */}
          <div className="mb-6">
            <h4 className="font-comic font-bold text-neon-blue text-md mb-3 text-center">
              🔗 Sites That Are Totally RAD! 🔗
            </h4>
            
            <div className="space-y-2">
              {coolSites.map((site, index) => (
                <div key={index} className="border-2 border-neon-pink p-2 bg-neon-yellow">
                  <div className="flex items-center gap-2">
                    <span className="text-lg animate-bounce">⭐</span>
                    <div>
                      <a 
                        href={site.url}
                        className="font-comic font-bold text-neon-purple hover:text-neon-orange text-sm"
                      >
                        {site.name}
                      </a>
                      <div className="text-xs text-black">
                        {site.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Web Rings Section */}
          <div className="mb-4">
            <h4 className="font-comic font-bold text-neon-green text-md mb-3 text-center">
              💍 Join These Web Rings! 💍
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {webRings.map((ring, index) => (
                <div key={index} className="text-center">
                  <div className="border-2 border-neon-cyan p-2 bg-gradient-90s">
                    <div className="text-xs font-comic font-bold text-white">
                      {ring}
                    </div>
                    <div className="flex justify-center gap-1 mt-1">
                      <button className="btn-90s px-1 py-0 text-xs">←</button>
                      <button className="btn-90s px-1 py-0 text-xs">?</button>
                      <button className="btn-90s px-1 py-0 text-xs">→</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center p-3 bg-black text-green-400 font-mono">
            <div className="animate-blink text-sm">
              🌟 Want your site listed here? Email me! 🌟
            </div>
            <div className="text-xs mt-1">
              cool90skid@totallyradical.com
            </div>
          </div>

          <div className="mt-3 text-center">
            <div className="animate-marquee text-xs text-neon-pink font-bold">
              🚀 Surfing the information superhighway since 1995! 🚀
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}