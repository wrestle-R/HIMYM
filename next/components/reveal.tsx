export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div
      className={`reveal-enter ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
