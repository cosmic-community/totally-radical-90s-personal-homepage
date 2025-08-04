import BlinkingText from './BlinkingText'

interface UnderConstructionProps {
  message?: string
  showGif?: boolean
  size?: 'small' | 'normal' | 'large'
}

export default function UnderConstruction({ 
  message = "UNDER CONSTRUCTION",
  showGif = true,
  size = 'normal'
}: UnderConstructionProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm p-2'
      case 'large':
        return 'text-xl p-4'
      default:
        return 'text-base p-3'
    }
  }

  return (
    <div className="text-center">
      <div className={`construction inline-block ${getSizeClasses()}`}>
        {showGif && (
          <span className="inline-block mr-2 text-xl animate-bounce">
            🚧
          </span>
        )}
        <BlinkingText className="font-bold">
          {message}
        </BlinkingText>
        {showGif && (
          <span className="inline-block ml-2 text-xl animate-bounce">
            🚧
          </span>
        )}
      </div>
      <div className="mt-2">
        <BlinkingText className="text-sm text-neon-orange font-bold" speed="fast">
          ⚠️ This section is being totally redesigned! ⚠️
        </BlinkingText>
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Check back soon for more awesome content!
      </div>
    </div>
  )
}