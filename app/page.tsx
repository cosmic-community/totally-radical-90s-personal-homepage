import Header from '@/components/Header'
import WelcomeSection from '@/components/WelcomeSection'
import AboutSection from '@/components/AboutSection'
import GallerySection from '@/components/GallerySection'
import MusicSection from '@/components/MusicSection'
import BlogSection from '@/components/BlogSection'
import GuestbookSection from '@/components/GuestbookSection'
import Footer from '@/components/Footer'
import VisitorCounter from '@/components/VisitorCounter'
import UnderConstruction from '@/components/UnderConstruction'
import BlinkingText from '@/components/BlinkingText'
import MarqueeText from '@/components/MarqueeText'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header with animated logo */}
      <Header />
      
      {/* Scrolling announcement */}
      <div className="bg-neon-yellow text-black py-2 border-y-4 border-neon-orange">
        <MarqueeText className="font-comic font-bold text-lg" speed="normal">
          🚨 BREAKING NEWS: This homepage just got even MORE radical! New features added daily! Don't forget to bookmark this page! 🚨
        </MarqueeText>
      </div>
      
      {/* Main content in classic 90s layout */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <WelcomeSection />
        
        {/* Visitor Counter */}
        <div className="text-center my-8">
          <VisitorCounter />
        </div>
        
        {/* Fun divider */}
        <div className="text-center my-8">
          <BlinkingText className="text-4xl">
            ⭐ ✨ 🌈 ✨ ⭐
          </BlinkingText>
        </div>
        
        {/* About Me Section */}
        <AboutSection />
        
        {/* Another fun divider */}
        <div className="text-center my-8">
          <MarqueeText className="text-2xl font-comic text-neon-purple font-bold">
            📸 Check out my totally awesome photo gallery below! 📸
          </MarqueeText>
        </div>
        
        {/* Photo Gallery */}
        <GallerySection />
        
        {/* Music announcement */}
        <div className="text-center my-8">
          <BlinkingText className="text-xl font-comic text-neon-pink font-bold" speed="fast">
            🎵 Music is life! Check out my collection! 🎵
          </BlinkingText>
        </div>
        
        {/* Music Collection */}
        <MusicSection />
        
        {/* Blog announcement */}
        <div className="text-center my-8">
          <UnderConstruction 
            message="BLOG SECTION - COMING SOON!" 
            size="large"
          />
        </div>
        
        {/* Blog Posts */}
        <BlogSection />
        
        {/* Guestbook announcement */}
        <div className="text-center my-8">
          <MarqueeText className="text-xl font-comic text-neon-cyan font-bold" speed="slow">
            ✍️ Please sign my guestbook! I love hearing from fellow 90s kids! ✍️
          </MarqueeText>
        </div>
        
        {/* Guestbook */}
        <GuestbookSection />
        
        {/* Final call to action */}
        <div className="text-center my-8">
          <BlinkingText className="text-2xl font-comic text-neon-green font-bold">
            🌟 Thanks for visiting my totally radical homepage! 🌟
          </BlinkingText>
        </div>
        
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}