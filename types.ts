// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Homepage content type
interface Homepage extends CosmicObject {
  type: 'homepage';
  metadata: {
    welcome_message?: string;
    about_me?: string;
    visitor_counter?: number;
    construction_gif?: {
      url: string;
      imgix_url: string;
    };
    background_texture?: {
      url: string;
      imgix_url: string;
    };
    animated_logo?: {
      url: string;
      imgix_url: string;
    };
    midi_file?: {
      url: string;
    };
    last_updated?: string;
  };
}

// MIDI Track type
interface MidiTrack extends CosmicObject {
  type: 'midi-music-library';
  metadata: {
    track_title?: string;
    composer?: string;
    midi_file?: {
      url: string;
    } | null;
    genre?: {
      key: string;
      value: string;
    };
    tempo?: number;
    duration?: string;
    difficulty?: {
      key: string;
      value: string;
    };
    description?: string;
    album_cover?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Blog post type
interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    post_date?: string;
    mood?: BlogMood;
  };
}

// Gallery item type
interface GalleryItem extends CosmicObject {
  type: 'gallery-items';
  metadata: {
    title?: string;
    image?: {
      url: string;
      imgix_url: string;
    };
    description?: string;
    category?: GalleryCategory;
    date_taken?: string;
  };
}

// Music collection type
interface MusicItem extends CosmicObject {
  type: 'music-collection';
  metadata: {
    title?: string;
    artist?: string;
    album_cover?: {
      url: string;
      imgix_url: string;
    };
    release_year?: number;
    genre?: MusicGenre;
    rating?: MusicRating;
    comments?: string;
  };
}

// Guestbook entry type
interface GuestbookEntry extends CosmicObject {
  type: 'guestbook-entries';
  metadata: {
    visitor_name?: string;
    email?: string;
    homepage_url?: string;
    message?: string;
    date_signed?: string;
    location?: string;
  };
}

// Type literals for select-dropdown values
type BlogMood = 'awesome' | 'radical' | 'tubular' | 'gnarly';
type GalleryCategory = 'photos' | 'memorabilia' | 'screenshots' | 'clipart';
type MusicGenre = 'grunge' | 'pop' | 'hiphop' | 'alternative' | 'dance';
type MusicRating = '1' | '2' | '3' | '4' | '5';
type MidiGenre = 'classical' | 'jazz' | 'rock' | 'electronic' | 'folk' | 'ambient' | 'game_music' | 'experimental';
type MidiDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Utility types
type CreateGuestbookData = {
  visitor_name: string;
  message: string;
  email?: string;
  homepage_url?: string;
  location?: string;
};

// Type guards
function isHomepage(obj: CosmicObject): obj is Homepage {
  return obj.type === 'homepage';
}

function isBlogPost(obj: CosmicObject): obj is BlogPost {
  return obj.type === 'blog-posts';
}

function isGalleryItem(obj: CosmicObject): obj is GalleryItem {
  return obj.type === 'gallery-items';
}

function isMusicItem(obj: CosmicObject): obj is MusicItem {
  return obj.type === 'music-collection';
}

function isGuestbookEntry(obj: CosmicObject): obj is GuestbookEntry {
  return obj.type === 'guestbook-entries';
}

function isMidiTrack(obj: CosmicObject): obj is MidiTrack {
  return obj.type === 'midi-music-library';
}

export type {
  CosmicObject,
  Homepage,
  BlogPost,
  GalleryItem,
  MusicItem,
  GuestbookEntry,
  MidiTrack,
  CosmicResponse,
  CreateGuestbookData,
  BlogMood,
  GalleryCategory,
  MusicGenre,
  MusicRating,
  MidiGenre,
  MidiDifficulty
};

export {
  isHomepage,
  isBlogPost,
  isGalleryItem,
  isMusicItem,
  isGuestbookEntry,
  isMidiTrack
};