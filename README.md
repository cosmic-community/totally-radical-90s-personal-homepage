# 🌈 Totally Radical 90s Personal Homepage! 🌈

A completely authentic 1990s personal homepage that captures the essence of the early web era! This single-page website celebrates everything that made the 90s totally awesome with genuine retro design elements, nostalgic content sections, and interactive features.

![App Preview](https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1200&h=300&fit=crop&auto=format)

## ✨ Features

- 🎵 **Interactive MIDI Music Player** - Authentic 90s background music (muted by default)
- 📊 **Animated Visitor Counter** - Increments with each page visit
- 💬 **Functional Guestbook System** - Visitors can sign and leave messages
- 🖼️ **90s Gallery Showcase** - Categorized images and memorabilia
- 🎶 **Personal Music Collection** - Star ratings and nostalgic reviews
- 🌈 **Authentic 90s Design** - Pixelated fonts, neon colors, scrolling marquees
- ⚡ **Blinking Text & Animations** - All the classic 90s web elements
- 🚧 **Under Construction GIFs** - Because no 90s site was ever "finished"
- 📝 **Personal Blog Posts** - Diary-style entries with 90s mood indicators

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689124aa9f3266af745d3ac5&clone_repository=689126d69f3266af745d3acf)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build me a full single-page website that looks and feels like it was made in the 1990s. Use outdated design trends like pixelated fonts, bright neon colors, gradients, background textures, clip art, low-res images, scrolling marquees, flashing text, and lots of tables. Include fake visitor counters, 'Under Construction' gifs, and a guestbook link at the bottom. Add a cheesy animated logo, a MIDI music player (muted by default), and a 'Sign My Guestbook' button. Write all the copy in a fun, enthusiastic tone like a personal homepage from 1997. The topic of the site is my love of the 90s."

### Code Generation Prompt

> Build me a full single-page website that looks and feels like it was made in the 1990s. Use outdated design trends like pixelated fonts, bright neon colors, gradients, background textures, clip art, low-res images, scrolling marquees, flashing text, and lots of tables. Include fake visitor counters, 'Under Construction' gifs, and a guestbook link at the bottom. Add a cheesy animated logo, a MIDI music player (muted by default), and a 'Sign My Guestbook' button. Write all the copy in a fun, enthusiastic tone like a personal homepage from 1997. The topic of the site is my love and interests in the 90s.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom 90s styling
- **Cosmic** - Headless CMS for content management
- **Framer Motion** - Animations and transitions
- **React Icons** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see your radical 90s homepage!

## 📚 Cosmic SDK Examples

### Fetching Homepage Content
```typescript
import { cosmic } from '@/lib/cosmic'

const homepage = await cosmic.objects.findOne({
  type: 'homepage'
}).catch(() => null)
```

### Getting Gallery Items
```typescript
const galleryItems = await cosmic.objects.find({
  type: 'gallery-items'
}).props(['id', 'title', 'slug', 'metadata'])
.catch(() => ({ objects: [] }))
```

### Adding Guestbook Entries
```typescript
await cosmic.objects.insertOne({
  type: 'guestbook-entries',
  title: `${visitorName} - ${new Date().toLocaleDateString()}`,
  metadata: {
    visitor_name: visitorName,
    message: message,
    email: email || '',
    homepage_url: homepageUrl || '',
    location: location || '',
    date_signed: new Date().toISOString().split('T')[0]
  }
})
```

## 🎨 Cosmic CMS Integration

This app integrates with your Cosmic bucket and uses the following object types:

- **Homepage** (singleton) - Welcome message, about content, and site assets
- **Blog Posts** - Personal diary entries with 90s mood indicators
- **Gallery Items** - Categorized photo collection with descriptions
- **Music Collection** - Rated music library with artist and genre info  
- **Guestbook Entries** - Visitor messages with contact information

The content structure supports authentic 90s categories like "90s Memorabilia", "Computer Screenshots", and music genres from "Grunge" to "Dance/Electronic".

## 🚀 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify
1. Build the static site: `bun run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

### Environment Variables
Add these to your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`

Welcome to the most radical homepage on the World Wide Web! 🌐✨
<!-- README_END -->