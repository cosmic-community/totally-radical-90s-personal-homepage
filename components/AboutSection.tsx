import { cosmic, hasStatus } from '@/lib/cosmic'
import { Homepage } from '@/types'

async function getHomepage(): Promise<Homepage | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'homepage'
    }).depth(1);
    
    return response.object as Homepage;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch homepage content');
  }
}

export default async function AboutSection() {
  const homepage = await getHomepage();
  
  const defaultAbout = `
    <h2>About Me - The Totally Radical Story!</h2>
    <p>Hey there! I'm your friendly neighborhood 90s enthusiast! I spend my days listening to grunge music, 
    playing on my Super Nintendo, and surfing the information superhighway!</p>
    <p>My interests include:</p>
    <ul>
      <li>🎵 Collecting the most AWESOME music (Nirvana, TLC, Backstreet Boys!)</li>
      <li>🖼️ Taking photos with my totally cool disposable camera</li>
      <li>💻 Learning HTML and making the coolest websites</li>
      <li>📺 Watching the best TV shows like Friends and The X-Files</li>
      <li>🎮 Playing the most radical video games</li>
    </ul>
    <p>This homepage is my digital diary where I share all the GNARLY stuff I'm into!</p>
  `;
  
  return (
    <section className="mb-8">
      <div className="table-90s w-full">
        <div className="bg-gradient-rainbow p-1">
          <div className="bg-white p-6">
            <div 
              className="font-serif text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: homepage?.metadata?.about_me || defaultAbout 
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}