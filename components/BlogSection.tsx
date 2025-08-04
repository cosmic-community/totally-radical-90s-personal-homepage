import { cosmic, hasStatus } from '@/lib/cosmic'
import { BlogPost } from '@/types'

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'blog-posts'
    }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1);
    
    return response.objects as BlogPost[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch blog posts');
  }
}

function getMoodDisplay(mood: string): string {
  const moods: Record<string, string> = {
    'awesome': 'Totally Awesome!',
    'radical': 'Radical Dude!', 
    'tubular': 'Tubular!',
    'gnarly': 'Gnarly!'
  };
  return moods[mood] || 'Cool!';
}

export default async function BlogSection() {
  const blogPosts = await getBlogPosts();
  
  // Sample fallback data
  const samplePosts = [
    {
      id: 'sample-1',
      title: 'OMG! Just Got the New Tamagotchi!',
      content: '<p>Dudes and dudettes! Today was like, totally the BEST day ever! I finally got my hands on the coolest Tamagotchi at the mall. It\'s this totally rad little purple one and I named him "Pixel"!</p><p>I\'ve been taking care of him all day and he\'s already grown from a little blob into the cutest digital pet EVER! Mom says I\'m obsessed but she just doesn\'t understand how AWESOME virtual pets are!</p>',
      mood: 'awesome',
      post_date: '1997-03-15',
      featured_image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=250&fit=crop&auto=format'
    },
    {
      id: 'sample-2',
      title: 'My Totally Radical Website Adventures!',
      content: '<p>Hey cyberspace! I\'ve been learning HTML and it\'s like, totally mind-blowing! Did you know you can make text BLINK and change colors?! The internet is going to be HUGE!</p><p>I spent all weekend making this homepage and adding the coolest animated GIFs I could find. Wait until you see my under construction section - it\'s going to be GNARLY when it\'s done!</p>',
      mood: 'radical', 
      post_date: '1997-04-22',
      featured_image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c80d4b?w=400&h=250&fit=crop&auto=format'
    }
  ];
  
  const postsToShow = blogPosts.length > 0 ? blogPosts : samplePosts;
  
  return (
    <section className="mb-8">
      <div className="retro-border p-6 bg-white">
        <h2 className="text-3xl font-comic text-neon-blue glow-text text-center mb-6 animate-pulse">
          📝 My Totally Awesome Blog Posts! 📝
        </h2>
        
        <div className="space-y-6">
          {postsToShow.map((post, index) => {
            const featuredImage = 'metadata' in post && post.metadata?.featured_image?.imgix_url 
              ? post.metadata.featured_image.imgix_url 
              : 'featured_image' in post ? (post as any).featured_image : '';
            
            const title = 'metadata' in post && post.metadata?.title 
              ? post.metadata.title 
              : 'title' in post ? (post as any).title : post.title;
            
            const content = 'metadata' in post && post.metadata?.content 
              ? post.metadata.content 
              : 'content' in post ? (post as any).content : '';
            
            const mood = 'metadata' in post && post.metadata?.mood 
              ? post.metadata.mood 
              : 'mood' in post ? (post as any).mood : '';
            
            const postDate = 'metadata' in post && post.metadata?.post_date 
              ? post.metadata.post_date 
              : 'post_date' in post ? (post as any).post_date : '';
            
            return (
              <div key={post.id} className="table-90s w-full">
                <div className="bg-gradient-90s p-2">
                  <div className="bg-white p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {featuredImage && (
                        <div className="md:w-1/3">
                          <img 
                            src={`${featuredImage}?w=400&h=250&fit=crop&auto=format,compress`}
                            alt={title}
                            width="300"
                            height="200"
                            className="w-full h-48 object-cover pixel-art border-4 border-neon-pink"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-comic font-bold text-neon-purple mb-2">
                          {title}
                        </h3>
                        
                        <div className="flex gap-4 mb-4">
                          {postDate && (
                            <div className="text-sm bg-neon-yellow text-black px-2 py-1 font-bold">
                              📅 {new Date(postDate).toLocaleDateString()}
                            </div>
                          )}
                          
                          {mood && (
                            <div className="text-sm bg-neon-green text-black px-2 py-1 font-bold animate-pulse">
                              Mood: {getMoodDisplay(mood)}
                            </div>
                          )}
                        </div>
                        
                        <div 
                          className="font-serif text-black leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: content || '' }}
                        />
                        
                        <div className="text-center mt-4">
                          <div className="animate-blink text-neon-orange font-bold">
                            ✨ TOTALLY TUBULAR ENTRY! ✨
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}