import { describe, expect, it } from "vitest"

import {
  filterPlays,
  getAdjacentPlays,
  getAllPlays,
  getPlayBySlug,
  getPlaybookTimeline,
} from "./archive"

describe("archive data layer", () => {
  const plays = getAllPlays()

  it("loads the normalized archive counts", () => {
    expect(plays).toHaveLength(26)
    expect(plays.flatMap((play) => play.appearances)).toHaveLength(28)
    expect(getPlaybookTimeline()).toHaveLength(6)
  })

  it("resolves a play by slug with all appearances", () => {
    const play = getPlayBySlug("my-penis-grants-wishes")
    expect(play?.appearances).toHaveLength(3)
  })

  it("filters by search, season, and status", () => {
    expect(
      filterPlays(plays, { q: "Robin" }).map((play) => play.slug)
    ).toContain("the-robin")
    expect(filterPlays(plays, { season: "1" })).toHaveLength(1)
    expect(
      filterPlays(plays, { status: "revealed" }).map((play) => play.slug)
    ).toEqual(["the-robin"])
  })

  it("sorts chronologically and provides wrapping adjacency", () => {
    const chronological = filterPlays(plays, { sort: "season-asc" })
    expect(chronological[0].slug).toBe("the-duffel-bag")
    const adjacency = getAdjacentPlays(plays[0].slug)
    expect(adjacency?.previous).toBeDefined()
    expect(adjacency?.next).toBeDefined()
  })
})
