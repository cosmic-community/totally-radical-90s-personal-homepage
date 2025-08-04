'use client'

interface BlinkingTextProps {
  children: React.ReactNode
  className?: string
  speed?: 'slow' | 'normal' | 'fast'
}

export default function BlinkingText({ children, className = '', speed = 'normal' }: BlinkingTextProps) {
  const getAnimationClass = () => {
    switch (speed) {
      case 'slow':
        return 'animate-blink-slow'
      case 'fast':
        return 'animate-blink-fast'
      default:
        return 'animate-blink'
    }
  }

  return (
    <span className={`${getAnimationClass()} ${className}`}>
      {children}
    </span>
  )
}