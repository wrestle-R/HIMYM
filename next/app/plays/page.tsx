import type { Metadata } from "next"
import { Suspense } from "react"

import { CatalogClient } from "@/components/catalog-client"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"
import { getAllPlays } from "@/lib/archive"

export const metadata: Metadata = {
  title: "Every Play",
  description:
    "Search, filter, and open all 26 plays in the Legend-dairy archive.",
}

function CatalogFallback() {
  return (
    <div className="mt-12">
      <div className="grid gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-11" />
        ))}
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-72" />
        ))}
      </div>
    </div>
  )
}

export default function PlaysPage() {
  const plays = getAllPlays()

  return (
    <main>
      <SiteHeader />
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="archive-grid absolute inset-0" />
        <div className="site-shell relative">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">
            The complete collection
          </p>
          <h1 className="display-type mt-5 max-w-5xl text-7xl leading-[0.88] tracking-[-0.04em] text-balance sm:text-8xl lg:text-[8.5rem]">
            Pick a play.
            <br />
            <em className="text-muted-foreground">Any play.</em>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Search by name, move through the seasons, or filter by how each
            scheme entered the story.
          </p>
          <Suspense fallback={<CatalogFallback />}>
            <CatalogClient plays={plays} />
          </Suspense>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
