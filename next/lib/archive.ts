import episodesData from "../generated/dataset/episodes.json"
import appearancesData from "../generated/dataset/play-appearances.json"
import playbookAppearancesData from "../generated/dataset/playbook-appearances.json"
import playsData from "../generated/dataset/plays.json"
import sourcesData from "../generated/dataset/sources.json"

import type {
  EnrichedPlay,
  EnrichedPlaybookAppearance,
  Episode,
  Play,
  PlayAppearance,
  PlayFilters,
  PlaybookAppearance,
  SourceRecord,
} from "./archive-types"

const plays = playsData as Play[]
const episodes = episodesData as Episode[]
const appearances = appearancesData as PlayAppearance[]
const playbookAppearances = playbookAppearancesData as PlaybookAppearance[]
const sources = sourcesData as SourceRecord[]

const episodeById = new Map(episodes.map((episode) => [episode.id, episode]))

const enrichedPlays: EnrichedPlay[] = plays.map((play) => {
  const playAppearances = appearances
    .filter((appearance) => appearance.playId === play.id)
    .map((appearance) => {
      const episode = episodeById.get(appearance.episodeId)
      if (!episode) throw new Error(`Missing episode ${appearance.episodeId}`)
      return { ...appearance, episode }
    })
    .sort(
      (a, b) =>
        a.episode.season - b.episode.season ||
        a.episode.number - b.episode.number
    )

  return {
    ...play,
    appearances: playAppearances,
    seasons: [
      ...new Set(
        playAppearances.map((appearance) => appearance.episode.season)
      ),
    ],
    primaryStatus: playAppearances[0].status,
  }
})

export function getAllPlays(): EnrichedPlay[] {
  return [...enrichedPlays].sort((a, b) => a.title.localeCompare(b.title))
}

export function getPlayBySlug(slug: string): EnrichedPlay | undefined {
  return enrichedPlays.find((play) => play.slug === slug)
}

export function getAdjacentPlays(
  slug: string
): { previous: EnrichedPlay; next: EnrichedPlay } | undefined {
  const ordered = getAllPlays()
  const index = ordered.findIndex((play) => play.slug === slug)
  if (index < 0) return undefined

  return {
    previous: ordered[(index - 1 + ordered.length) % ordered.length],
    next: ordered[(index + 1) % ordered.length],
  }
}

export function getPlaybookTimeline(): EnrichedPlaybookAppearance[] {
  return playbookAppearances.map((appearance) => {
    const episode = episodeById.get(appearance.episodeId)
    if (!episode) throw new Error(`Missing episode ${appearance.episodeId}`)
    return { ...appearance, episode }
  })
}

export function getSources(): SourceRecord[] {
  return [...sources]
}

export function filterPlays(
  items: EnrichedPlay[],
  filters: PlayFilters
): EnrichedPlay[] {
  const q = filters.q?.trim().toLocaleLowerCase() ?? ""
  const season =
    filters.season && filters.season !== "all" ? Number(filters.season) : null
  const status =
    filters.status && filters.status !== "all" ? filters.status : null
  const sort = filters.sort ?? "title-asc"

  return items
    .filter((play) => {
      const matchesQuery =
        !q || `${play.title} ${play.summary}`.toLocaleLowerCase().includes(q)
      const matchesSeason = !season || play.seasons.includes(season)
      const matchesStatus =
        !status ||
        play.appearances.some((appearance) => appearance.status === status)
      return matchesQuery && matchesSeason && matchesStatus
    })
    .sort((a, b) => {
      if (sort === "season-asc") {
        return (
          (a.appearances[0]?.episode.season ?? 99) -
            (b.appearances[0]?.episode.season ?? 99) ||
          a.title.localeCompare(b.title)
        )
      }
      if (sort === "season-desc") {
        return (
          (b.appearances[0]?.episode.season ?? 0) -
            (a.appearances[0]?.episode.season ?? 0) ||
          a.title.localeCompare(b.title)
        )
      }
      return a.title.localeCompare(b.title)
    })
}

export const appearanceStatusLabels: Record<string, string> = {
  used: "Used",
  featured: "Featured",
  mentioned: "Mentioned",
  demonstrated: "Demonstrated",
  "entire-episode": "Entire episode",
  revealed: "Revealed",
  "briefly-visible": "Briefly visible",
  "implied-success": "Implied success",
}
