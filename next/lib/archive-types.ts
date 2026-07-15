export type ContentKind = "transcribed" | "reconstructed"

export type AppearanceStatus =
  | "used"
  | "featured"
  | "mentioned"
  | "demonstrated"
  | "entire-episode"
  | "revealed"
  | "briefly-visible"
  | "implied-success"

export interface PlayStep {
  order: number
  text: string
}

export interface Play {
  id: string
  slug: string
  title: string
  summary: string
  steps: PlayStep[]
  contentKind: ContentKind
  sourceIds: string[]
  featured?: boolean
}

export interface Episode {
  id: string
  season: number
  number: number
  code: string
  title: string
}

export interface PlayAppearance {
  id: string
  playId: string
  episodeId: string
  status: AppearanceStatus
  notes: string
}

export interface PlaybookAppearance {
  id: string
  episodeId: string
  label: string
  description: string
}

export interface SourceRecord {
  id: string
  label: string
  kind: "user-supplied" | "reference" | "original"
  url: string | null
  notes: string
}

export interface EnrichedAppearance extends PlayAppearance {
  episode: Episode
}

export interface EnrichedPlay extends Play {
  appearances: EnrichedAppearance[]
  seasons: number[]
  primaryStatus: AppearanceStatus
}

export interface EnrichedPlaybookAppearance extends PlaybookAppearance {
  episode: Episode
}

export interface PlayFilters {
  q?: string
  season?: string
  status?: string
  sort?: "title-asc" | "season-asc" | "season-desc"
}
