export default function AwardsCase() {
  const awards = [
    {
      title: 'Most Radical Homepage',
      year: '1998',
      icon: '🏆',
      color: 'text-yellow-400',
      bg: 'bg-yellow-100'
    },
    {
      title: 'Coolest GIF Collection',
      year: '1997',
      icon: '🥇',
      color: 'text-orange-500',
      bg: 'bg-orange-100'
    },
    {
      title: 'Best Use of Neon Colors',
      year: '1999',
      icon: '🌈',
      color: 'text-pink-500',
      bg: 'bg-pink-100'
    },
    {
      title: 'Top MIDI Music Library',
      year: '1998',
      icon: '🎵',
      color: 'text-purple-500',
      bg: 'bg-purple-100'
    },
    {
      title: 'Excellence in Blinking Text',
      year: '1997',
      icon: '✨',
      color: 'text-blue-500',
      bg: 'bg-blue-100'
    },
    {
      title: 'Outstanding Visitor Counter',
      year: '1999',
      icon: '📊',
      color: 'text-green-500',
      bg: 'bg-green-100'
    }
  ]

  return (
    <div className="table-90s">
      <div className="bg-gradient-rainbow p-1">
        <div className="bg-white p-4">
          <h3 className="font-comic font-bold text-neon-purple text-lg text-center mb-4 animate-pulse">
            🏆 My Totally Awesome Awards! 🏆
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {awards.map((award, index) => (
              <div key={index} className={`${award.bg} border-4 border-neon-orange p-3 relative`}>
                <div className="text-center">
                  <div className={`text-3xl ${award.color} animate-bounce`}>
                    {award.icon}
                  </div>
                  <div className="font-comic font-bold text-sm text-black mt-1">
                    {award.title}
                  </div>
                  <div className="text-xs text-gray-600">
                    Winner - {award.year}
                  </div>
                </div>
                
                {/* Sparkle effects */}
                <div className="absolute top-1 right-1 animate-pulse">
                  ✨
                </div>
                <div className="absolute bottom-1 left-1 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  ⭐
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <div className="retro-border p-3 bg-neon-yellow">
              <div className="font-comic font-bold text-black animate-blink">
                🌟 Certified 100% RADICAL by the Internet! 🌟
              </div>
            </div>
          </div>
          
          <div className="mt-3 text-center text-xs">
            <div className="animate-marquee text-neon-green font-bold">
              💫 These awards prove my homepage is totally tubular! 💫
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}