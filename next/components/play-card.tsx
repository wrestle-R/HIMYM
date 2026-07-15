import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { appearanceStatusLabels } from "@/lib/archive"
import type { EnrichedPlay } from "@/lib/archive-types"

export function PlayCard({ play }: { play: EnrichedPlay }) {
  const firstAppearance = play.appearances[0]

  return (
    <Card className="h-full min-h-72">
      <CardHeader>
        <div className="mb-5 flex items-center justify-between gap-3">
          <Badge variant="outline">{firstAppearance.episode.code}</Badge>
          <span className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {appearanceStatusLabels[play.primaryStatus]}
          </span>
        </div>
        <CardTitle className="text-3xl tracking-tight">{play.title}</CardTitle>
        <CardDescription>{firstAppearance.episode.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="leading-relaxed text-muted-foreground">{play.summary}</p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">
          {play.steps.length} steps
        </span>
        <Button asChild variant="ghost" size="sm">
          <Link href={`/plays/${play.slug}`}>
            Read play <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
