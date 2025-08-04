import { cosmic, hasStatus } from '@/lib/cosmic'
import { GuestbookEntry } from '@/types'
import GuestbookForm from '@/components/GuestbookForm'

async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'guestbook-entries'
    }).props(['id', 'title', 'slug', 'metadata', 'created_at'])
    .sort('-created_at')
    .limit(10);
    
    return response.objects as GuestbookEntry[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch guestbook entries');
  }
}

export default async function GuestbookSection() {
  const guestbookEntries = await getGuestbookEntries();
  
  return (
    <section className="mb-8">
      <div className="retro-border p-6 bg-white">
        <h2 className="text-3xl font-comic text-neon-purple glow-text text-center mb-6 animate-pulse">
          💬 Sign My Guestbook! 💬
        </h2>
        
        <div className="table-90s w-full mb-8">
          <div className="bg-gradient-rainbow p-2">
            <div className="bg-white p-4">
              <p className="text-center font-comic text-lg mb-4">
                Hey there, fellow web surfer! Please sign my guestbook and let me know you were here! 
                It would be totally RADICAL to hear from you! 🌈
              </p>
              
              <GuestbookForm />
            </div>
          </div>
        </div>
        
        {/* Display existing guestbook entries */}
        {guestbookEntries.length > 0 && (
          <div>
            <h3 className="text-2xl font-comic text-neon-blue text-center mb-4 animate-blink">
              ★ Awesome Visitors Who Signed My Guestbook! ★
            </h3>
            
            <div className="space-y-4">
              {guestbookEntries.map((entry) => {
                const visitorName = entry.metadata?.visitor_name || 'Anonymous Visitor';
                const message = entry.metadata?.message || '';
                const email = entry.metadata?.email || '';
                const homepageUrl = entry.metadata?.homepage_url || '';
                const location = entry.metadata?.location || '';
                const dateSigned = entry.metadata?.date_signed || entry.created_at.split('T')[0];
                
                return (
                  <div key={entry.id} className="border-4 border-neon-cyan bg-neon-yellow p-3">
                    <div className="bg-white p-4 border-2 border-black">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-comic text-lg font-bold text-neon-purple">
                            {homepageUrl ? (
                              <a 
                                href={homepageUrl.startsWith('http') ? homepageUrl : `http://${homepageUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {visitorName}
                              </a>
                            ) : (
                              visitorName
                            )}
                          </h4>
                          {location && (
                            <p className="text-sm text-neon-blue font-bold">
                              📍 From: {location}
                            </p>
                          )}
                          {email && (
                            <p className="text-sm text-neon-green">
                              📧 {email}
                            </p>
                          )}
                        </div>
                        <div className="text-sm text-black bg-neon-pink px-2 py-1 border border-black">
                          {dateSigned ? new Date(dateSigned).toLocaleDateString() : 'Unknown date'}
                        </div>
                      </div>
                      
                      <div className="bg-neon-cyan p-3 border-2 border-neon-purple">
                        <p className="font-serif text-black">
                          "{message}"
                        </p>
                      </div>
                      
                      <div className="text-center mt-2">
                        <div className="animate-blink text-neon-orange font-bold text-sm">
                          ★ Thanks for visiting! ★
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}