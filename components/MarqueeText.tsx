interface MarqueeTextProps {
  children: React.ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
}

export default function MarqueeText({ 
  children, 
  className = '', 
  speed = 'normal',
  direction = 'left'
}: MarqueeTextProps) {
  const getAnimationClass = () => {
    const baseClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
    switch (speed) {
      case 'slow':
        return `${baseClass}-slow`
      case 'fast':
        return `${baseClass}-fast`
      default:
        return baseClass
    }
  }

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className={`inline-block ${getAnimationClass()} ${className}`}>
        {children}
      </div>
    </div>
  )
}