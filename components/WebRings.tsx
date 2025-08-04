export default function WebRings() {
  const webRings = [
    {
      name: "90s Kids Webring",
      prev: "#",
      next: "#", 
      random: "#",
      list: "#"
    },
    {
      name: "Radical Homepages Ring",
      prev: "#",
      next: "#",
      random: "#", 
      list: "#"
    },
    {
      name: "Totally Tubular Sites",
      prev: "#",
      next: "#",
      random: "#",
      list: "#"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {webRings.map((ring, index) => (
        <div key={index} className="table-90s">
          <div className="bg-gradient-rainbow p-1">
            <div className="bg-white p-3 text-center">
              <h4 className="font-comic font-bold text-neon-purple text-sm mb-2">
                {ring.name}
              </h4>
              <div className="flex justify-between text-xs">
                <a href={ring.prev} className="btn-90s px-2 py-1 text-xs">
                  ← Prev
                </a>
                <a href={ring.random} className="btn-90s px-2 py-1 text-xs">
                  Random
                </a>
                <a href={ring.next} className="btn-90s px-2 py-1 text-xs">
                  Next →
                </a>
              </div>
              <div className="mt-2">
                <a href={ring.list} className="btn-90s px-2 py-1 text-xs">
                  View All Sites
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}