import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { EnrichedPlaybookAppearance } from "@/lib/archive-types"

import { Reveal } from "./reveal"

export function PlaybookTimeline({
  items,
}: {
  items: EnrichedPlaybookAppearance[]
}) {
  return (
    <ol className="mt-14 grid gap-0 lg:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.id} delay={(index % 3) * 0.08}>
          <li className="relative flex min-h-56 flex-col gap-5 border-l border-border px-6 py-7 lg:border-t lg:border-l-0">
            <div className="absolute top-8 -left-1.5 size-3 rounded-full bg-primary ring-4 ring-background lg:-top-1.5 lg:left-7" />
            <div className="flex items-center justify-between gap-3">
              <Badge variant="outline">{item.episode.code}</Badge>
              <span className="text-xs text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <div>
              <h3 className="display-type text-3xl">{item.label}</h3>
              <p className="mt-1 text-sm text-gold-soft italic">
                {item.episode.title}
              </p>
            </div>
            <Separator />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}
