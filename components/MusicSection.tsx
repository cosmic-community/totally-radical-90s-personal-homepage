import { cosmic, hasStatus } from '@/lib/cosmic'
import { MusicItem } from '@/types'

async function getMusicItems(): Promise<MusicItem[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'music-collection'
    }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    
    return response.objects as MusicItem[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch music items');
  }
}

function getRatingDisplay(rating: string): string {
  const ratings: Record<string, string> = {
    '5': '★★★★★ AMAZING!',
    '4': '★★★★☆ Totally Cool',
    '3': '★★★☆☆ Pretty Good',
    '2': '★★☆☆☆ Meh',
    '1': '★☆☆☆☆ Not My Thing'
  };
  return ratings[rating] || 'Not Rated';
}

function getGenreDisplay(genre: string): string {
  const genres: Record<string, string> = {
    'grunge': 'Grunge',
    'pop': 'Pop',
    'hiphop': 'Hip Hop',
    'alternative': 'Alternative Rock',
    'dance': 'Dance/Electronic'
  };
  return genres[genre] || 'Other';
}

interface SampleMusic {
  id: string;
  title: string;
  artist: string;
  genre: string;
  rating: string;
  release_year: number;
  comments: string;
  album_cover: string;
}

export default async function MusicSection() {
  const musicItems = await getMusicItems();
  
  // Sample fallback data
  const sampleMusic: SampleMusic[] = [
    {
      id: 'sample-1',
      title: 'Smells Like Teen Spirit',
      artist: 'Nirvana',
      genre: 'grunge',
      rating: '5',
      release_year: 1991,
      comments: 'This song is totally AWESOME! Kurt Cobain is like, the coolest!',
      album_cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&auto=format'
    },
    {
      id: 'sample-2',
      title: 'Waterfalls', 
      artist: 'TLC',
      genre: 'pop',
      rating: '4',
      release_year: 1994,
      comments: 'Left Eye\'s rap is totally radical! This song is the bomb!',
      album_cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop&auto=format'
    },
    {
      id: 'sample-3',
      title: 'I Want It That Way',
      artist: 'Backstreet Boys', 
      genre: 'pop',
      rating: '4',
      release_year: 1999,
      comments: 'The ultimate boy band anthem! BSB forever!',
      album_cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&auto=format'
    }
  ];
  
  const itemsToShow: (MusicItem | SampleMusic)[] = musicItems.length > 0 ? musicItems : sampleMusic;
  
  return (
    <section className="mb-8">
      <div className="retro-border p-6 bg-white">
        <h2 className="text-3xl font-comic text-neon-green glow-text text-center mb-6 animate-pulse">
          🎵 My Totally Radical Music Collection! 🎵
        </h2>
        
        <div className="table-90s w-full">
          <div className="bg-gradient-rainbow p-2">
            <div className="bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {itemsToShow.map((item: MusicItem | SampleMusic, index: number) => {
                  const albumCover = 'metadata' in item && item.metadata?.album_cover?.imgix_url 
                    ? item.metadata.album_cover.imgix_url 
                    : 'album_cover' in item ? (item as SampleMusic).album_cover : '';
                  
                  const title = 'metadata' in item && item.metadata?.title 
                    ? item.metadata.title 
                    : 'title' in item ? (item as SampleMusic).title : '';
                  
                  const artist = 'metadata' in item && item.metadata?.artist 
                    ? item.metadata.artist 
                    : 'artist' in item ? (item as SampleMusic).artist : '';
                  
                  const genre = 'metadata' in item && item.metadata?.genre 
                    ? item.metadata.genre 
                    : 'genre' in item ? (item as SampleMusic).genre : '';
                  
                  const rating = 'metadata' in item && item.metadata?.rating 
                    ? item.metadata.rating 
                    : 'rating' in item ? (item as SampleMusic).rating : '';
                  
                  const releaseYear = 'metadata' in item && item.metadata?.release_year 
                    ? item.metadata.release_year 
                    : 'release_year' in item ? (item as SampleMusic).release_year : null;
                  
                  const comments = 'metadata' in item && item.metadata?.comments 
                    ? item.metadata.comments 
                    : 'comments' in item ? (item as SampleMusic).comments : '';
                  
                  return (
                    <div key={item.id} className="border-4 border-neon-orange bg-neon-pink p-3">
                      <div className="bg-white p-4 border-2 border-black">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <img 
                              src={albumCover ? `${albumCover}?w=100&h=100&fit=crop&auto=format,compress` : ''}
                              alt={`${title} album cover`}
                              width="80"
                              height="80"
                              className="w-20 h-20 object-cover pixel-art border-2 border-gray-400"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-comic text-lg font-bold text-neon-purple mb-1">
                              {title}
                            </h3>
                            <p className="text-md font-bold text-neon-blue mb-1">
                              by {artist}
                            </p>
                            <p className="text-sm text-black mb-1">
                              Genre: {getGenreDisplay(genre)}
                            </p>
                            {releaseYear && (
                              <p className="text-sm text-black mb-1">
                                Year: {releaseYear}
                              </p>
                            )}
                            <div className="text-neon-orange font-bold mb-2">
                              {getRatingDisplay(rating)}
                            </div>
                          </div>
                        </div>
                        {comments && (
                          <div className="mt-3 p-2 bg-neon-yellow border-2 border-neon-purple">
                            <p className="text-sm font-comic">
                              "{comments}"
                            </p>
                          </div>
                        )}
                        <div className="text-center mt-2">
                          <div className="animate-blink text-neon-green font-bold">
                            ♫ TOTALLY TUBULAR! ♫
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