import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { ParchmentReader } from "@/components/parchment-reader"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  appearanceStatusLabels,
  getAdjacentPlays,
  getAllPlays,
  getPlayBySlug,
} from "@/lib/archive"

interface PlayPageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPlays().map((play) => ({ slug: play.slug }))
}

export async function generateMetadata({
  params,
}: PlayPageProps): Promise<Metadata> {
  const { slug } = await params
  const play = getPlayBySlug(slug)
  if (!play) return { title: "Play not found" }
  return { title: play.title, description: play.summary }
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { slug } = await params
  const play = getPlayBySlug(slug)
  if (!play) notFound()
  const adjacent = getAdjacentPlays(slug)

  return (
    <main>
      <SiteHeader />
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24">
        <div className="archive-grid absolute inset-0" />
        <div className="site-shell relative">
          <Link
            href="/plays"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" /> Back to all
            plays
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                {play.appearances.map((appearance) => (
                  <Badge key={appearance.id} variant="outline">
                    {appearance.episode.code}
                  </Badge>
                ))}
              </div>
              <h1 className="display-type mt-5 max-w-5xl text-6xl leading-[0.9] tracking-[-0.04em] text-balance sm:text-8xl">
                {play.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {play.summary}
              </p>
            </div>
            <p className="text-xs tracking-[0.25em] text-gold uppercase">
              {play.steps.length} numbered moves
            </p>
          </div>

          <div className="gold-rule my-12" />
          <ParchmentReader title={play.title} steps={play.steps} />

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="display-type text-4xl">On screen</h2>
            <div className="mt-6 flex flex-col gap-4">
              {play.appearances.map((appearance) => (
                <Card key={appearance.id} size="sm">
                  <CardHeader>
                    <CardTitle>
                      {appearance.episode.code} · {appearance.episode.title}
                    </CardTitle>
                    <CardDescription>
                      {appearanceStatusLabels[appearance.status]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {appearance.notes}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {adjacent ? (
              <>
                <Separator className="my-10" />
                <nav
                  className="grid gap-3 sm:grid-cols-2"
                  aria-label="Adjacent plays"
                >
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-auto min-h-16 justify-start rounded-2xl px-4 py-3 text-left"
                  >
                    <Link href={`/plays/${adjacent.previous.slug}`}>
                      <ArrowLeftIcon data-icon="inline-start" />
                      <span>
                        <small className="block text-muted-foreground">
                          Previous play
                        </small>
                        {adjacent.previous.title}
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-auto min-h-16 justify-end rounded-2xl px-4 py-3 text-right"
                  >
                    <Link href={`/plays/${adjacent.next.slug}`}>
                      <span>
                        <small className="block text-muted-foreground">
                          Next play
                        </small>
                        {adjacent.next.title}
                      </span>
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
                </nav>
              </>
            ) : null}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
