import { cosmic, hasStatus } from '@/lib/cosmic'
import { GalleryItem } from '@/types'

async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'gallery-items'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.objects as GalleryItem[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch gallery items');
  }
}

function getCategoryDisplay(category: string): string {
  const categories: Record<string, string> = {
    'photos': 'Personal Photos',
    'memorabilia': '90s Memorabilia', 
    'screenshots': 'Computer Screenshots',
    'clipart': 'Cool Clip Art'
  };
  return categories[category] || 'Uncategorized';
}

export default async function GallerySection() {
  const galleryItems = await getGalleryItems();
  
  // Sample fallback data for empty gallery
  const sampleItems = [
    {
      id: 'sample-1',
      title: 'My Awesome Tamagotchi!',
      category: 'memorabilia',
      description: 'This little guy is totally the coolest virtual pet ever!',
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: 'sample-2', 
      title: 'Super Nintendo Setup',
      category: 'photos',
      description: 'My radical gaming setup! Mario Kart anyone?',
      image: 'https://images.unsplash.com/photo-1593277816459-c4639e07c1f9?w=300&h=200&fit=crop&auto=format'
    },
    {
      id: 'sample-3',
      title: 'Windows 95 Desktop',
      category: 'screenshots', 
      description: 'Check out my totally customized desktop!',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop&auto=format'
    }
  ];
  
  const itemsToShow = galleryItems.length > 0 ? galleryItems : sampleItems;
  
  return (
    <section className="mb-8">
      <div className="retro-border p-6 bg-white">
        <h2 className="text-3xl font-comic text-neon-purple glow-text text-center mb-6 animate-pulse">
          🖼️ My Totally Awesome Photo Gallery! 🖼️
        </h2>
        
        <div className="table-90s w-full">
          <div className="bg-gradient-90s p-2">
            <div className="bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itemsToShow.map((item, index) => {
                  const imageUrl = 'metadata' in item && item.metadata?.image?.imgix_url 
                    ? item.metadata.image.imgix_url 
                    : 'image' in item ? (item as any).image : '';
                  
                  const title = 'metadata' in item && item.metadata?.title 
                    ? item.metadata.title 
                    : 'title' in item ? (item as any).title : item.title;
                  
                  const description = 'metadata' in item && item.metadata?.description 
                    ? item.metadata.description 
                    : 'description' in item ? (item as any).description : '';
                  
                  const category = 'metadata' in item && item.metadata?.category 
                    ? item.metadata.category 
                    : 'category' in item ? (item as any).category : '';
                  
                  return (
                    <div key={item.id} className="border-4 border-neon-pink bg-neon-cyan p-3">
                      <div className="bg-white p-3 border-2 border-black">
                        <img 
                          src={imageUrl ? `${imageUrl}?w=300&h=200&fit=crop&auto=format,compress` : ''}
                          alt={title}
                          width="250"
                          height="180"
                          className="w-full h-40 object-cover pixel-art border-2 border-gray-400 mb-2"
                        />
                        <h3 className="font-comic text-lg font-bold text-neon-purple mb-1">
                          {title}
                        </h3>
                        <p className="text-sm text-neon-orange font-bold mb-2">
                          Category: {getCategoryDisplay(category)}
                        </p>
                        {description && (
                          <p className="text-sm text-black">
                            {description}
                          </p>
                        )}
                        <div className="text-center mt-2">
                          <div className="animate-blink text-neon-pink font-bold">
                            ★ TOTALLY COOL! ★
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}