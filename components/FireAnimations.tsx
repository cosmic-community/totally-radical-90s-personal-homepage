export default function FireAnimations() {
  const flames = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div className="flex justify-center gap-1">
      {flames.map((_, index) => (
        <div
          key={index}
          className="text-2xl animate-bounce"
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.8s'
          }}
        >
          🔥
        </div>
      ))}
    </div>
  )
}