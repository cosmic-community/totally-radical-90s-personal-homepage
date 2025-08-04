import HitCounter from './HitCounter'
import BlinkingText from './BlinkingText'

export default function VisitorCounter() {
  return (
    <div className="retro-border p-6 bg-white max-w-md mx-auto">
      <h3 className="font-comic font-bold text-neon-purple text-xl mb-4 text-center">
        <BlinkingText>📊 Visitor Statistics 📊</BlinkingText>
      </h3>
      
      <HitCounter />
      
      <div className="mt-4 text-center">
        <BlinkingText className="text-neon-orange font-bold text-sm" speed="slow">
          🎉 You're totally awesome for stopping by! 🎉
        </BlinkingText>
      </div>
      
      <div className="mt-3 text-xs text-center text-gray-600">
        <div>First visitor was on January 1st, 1997!</div>
        <div>Most visitors in one day: 1,337</div>
        <div className="mt-1">
          <BlinkingText className="text-neon-green font-bold" speed="fast">
            ✨ Sign my guestbook below! ✨
          </BlinkingText>
        </div>
      </div>
    </div>
  )
}