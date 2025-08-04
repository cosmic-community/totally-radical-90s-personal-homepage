import Header from '@/components/Header'
import WelcomeSection from '@/components/WelcomeSection'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import MusicSection from '@/components/MusicSection'
import BlogSection from '@/components/BlogSection'
import GuestbookSection from '@/components/GuestbookSection'
import Footer from '@/components/Footer'
import VisitorCounter from '@/components/VisitorCounter'
import MidiPlayer from '@/components/MidiPlayer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* MIDI Player - muted by default */}
      <MidiPlayer />
      
      {/* Header with animated logo */}
      <Header />
      
      {/* Main content in classic 90s layout */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Visitor Counter */}
        <div className="text-center my-8">
          <VisitorCounter />
        </div>
        
        {/* About Me Section */}
        <AboutSection />
        
        {/* Photo Gallery */}
        <GallerySection />
        
        {/* Music Collection */}
        <MusicSection />
        
        {/* Blog Posts */}
        <BlogSection />
        
        {/* Guestbook */}
        <GuestbookSection />
        
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}