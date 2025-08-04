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

export default async function WelcomeSection() {
  const homepage = await getHomepage();
  
  const defaultWelcome = `
    <h2>Welcome to My Totally Awesome Homepage!</h2>
    <p>Hey there, fellow 90s kid! You've just stumbled upon the most RADICAL corner of cyberspace! 
    This site is dedicated to everything that made the 1990s absolutely TUBULAR!</p>
    <p>Grab your favorite beverage, crank up that dial-up modem, and get ready to take a trip 
    back to the decade that brought us the best music, the coolest fashion, and the birth of the World Wide Web!</p>
  `;
  
  return (
    <section className="retro-border p-6 mb-8 bg-white">
      <div 
        className="font-serif text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ 
          __html: homepage?.metadata?.welcome_message || defaultWelcome 
        }}
      />
      
      {/* Animated GIFs placeholders */}
      <div className="flex justify-center gap-4 mt-6 flex-wrap">
        <div className="animate-spin-slow text-4xl">💿</div>
        <div className="animate-bounce text-4xl">📺</div>
        <div className="animate-pulse text-4xl">🎮</div>
        <div className="animate-wiggle text-4xl">📞</div>
      </div>
    </section>
  )
}