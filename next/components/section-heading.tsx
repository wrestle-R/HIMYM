export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string
  title: string
  accent?: string
  description?: string
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-4">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">{eyebrow}</p>
      <h2 className="display-type text-5xl leading-[0.95] tracking-[-0.03em] text-balance sm:text-7xl">
        {title}{" "}
        {accent ? <em className="text-muted-foreground">{accent}</em> : null}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
