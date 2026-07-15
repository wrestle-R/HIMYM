"use client"

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { BookOpenIcon, SearchIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { PlayCard } from "@/components/play-card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { appearanceStatusLabels, filterPlays } from "@/lib/archive"
import type { EnrichedPlay, PlayFilters } from "@/lib/archive-types"

export function CatalogClient({ plays }: { plays: EnrichedPlay[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const reducedMotion = useReducedMotion()
  const [q, setQ] = useState(searchParams.get("q") ?? "")
  const [season, setSeason] = useState(searchParams.get("season") ?? "all")
  const [status, setStatus] = useState(searchParams.get("status") ?? "all")
  const [sort, setSort] = useState<NonNullable<PlayFilters["sort"]>>(
    (searchParams.get("sort") as PlayFilters["sort"]) ?? "title-asc"
  )

  const filtered = useMemo(
    () => filterPlays(plays, { q, season, status, sort }),
    [plays, q, season, status, sort]
  )

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams()
      if (q.trim()) params.set("q", q.trim())
      if (season !== "all") params.set("season", season)
      if (status !== "all") params.set("status", status)
      if (sort !== "title-asc") params.set("sort", sort)
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      })
    }, 180)
    return () => window.clearTimeout(timer)
  }, [pathname, q, router, season, sort, status])

  return (
    <div className="mt-12">
      <FieldGroup className="grid gap-3 md:grid-cols-[minmax(14rem,1fr)_10rem_12rem_11rem]">
        <Field>
          <FieldLabel htmlFor="play-search" className="sr-only">
            Search plays
          </FieldLabel>
          <div className="relative">
            <SearchIcon
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="play-search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search the archive…"
              className="h-11 pl-9"
            />
          </div>
        </Field>
        <Field>
          <FieldLabel className="sr-only">Season</FieldLabel>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Season" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="all">All seasons</SelectItem>
                {[1, 3, 4, 5, 8, 9].map((value) => (
                  <SelectItem key={value} value={String(value)}>
                    Season {value}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel className="sr-only">Status</FieldLabel>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="all">All statuses</SelectItem>
                {Object.entries(appearanceStatusLabels).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel className="sr-only">Sort</FieldLabel>
          <Select
            value={sort}
            onValueChange={(value) =>
              setSort(value as NonNullable<PlayFilters["sort"]>)
            }
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectItem value="title-asc">A–Z</SelectItem>
                <SelectItem value="season-asc">Earliest first</SelectItem>
                <SelectItem value="season-desc">Latest first</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <div className="my-8 flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          {filtered.length} of {plays.length} plays
        </p>
        <div className="gold-rule w-24 sm:w-48" />
      </div>

      {filtered.length ? (
        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((play, index) => (
              <motion.div
                layout
                key={play.id}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.025, 0.2),
                }}
              >
                <PlayCard play={play} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <Empty className="min-h-80 border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookOpenIcon />
            </EmptyMedia>
            <EmptyTitle>No play matches that move.</EmptyTitle>
            <EmptyDescription>
              Try another name, season, or appearance status.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent />
        </Empty>
      )}
    </div>
  )
}
