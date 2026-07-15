import Link from "next/link"
import { ArrowRightIcon, BookOpenIcon } from "lucide-react"

import { Hero } from "@/components/hero"
import { ParchmentReader } from "@/components/parchment-reader"
import { PlayCard } from "@/components/play-card"
import { PlaybookTimeline } from "@/components/playbook-timeline"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { VideoFade } from "@/components/video-fade"
import { Button } from "@/components/ui/button"
import { getAllPlays, getPlaybookTimeline } from "@/lib/archive"

const stats = [
  ["26", "unique plays"],
  ["28", "screen appearances"],
  ["9", "seasons of legend"],
  ["6", "Playbook sightings"],
]

export default function HomePage() {
  const plays = getAllPlays()
  const featured = ["the-robin", "lorenzo-von-matterhorn", "the-scuba-diver"]
    .map((slug) => plays.find((play) => play.slug === slug))
    .filter((play) => play !== undefined)
  const robin = plays.find((play) => play.slug === "the-robin")
  const timeline = getPlaybookTimeline()

  return (
    <main>
      <SiteHeader overlay />
      <Hero />

      <section id="archive" className="relative overflow-hidden py-24 sm:py-32">
        <div className="archive-grid absolute inset-0" />
        <div className="site-shell relative">
          <Reveal>
            <div className="grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-border px-6 py-8 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(odd)]:border-r"
                >
                  <span className="display-type text-6xl text-gold-soft">
                    {value}
                  </span>
                  <span className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-28 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <SectionHeading
                eyebrow="The collection"
                title="Schemes this elaborate"
                accent="deserve an archive."
                description="Every screen-canon play is normalized, episode-linked, and rebuilt as a complete numbered page. No duplicates. No missing final moves."
              />
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <div className="gold-rule mb-7" />
              <p className="display-type text-3xl leading-snug text-muted-foreground sm:text-4xl">
                “When I get sad, I stop being sad and be{" "}
                <em className="text-foreground">awesome</em> instead.”
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featured.map((play, index) => (
              <Reveal key={play.id} delay={index * 0.08}>
                <PlayCard play={play} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[78vh] overflow-hidden py-28 sm:py-40">
        <VideoFade
          src="/media/cosmic-archive-v2.mp4"
          poster="/media/cosmic-archive-poster-v2.jpg"
          className="cosmic-clarity-video absolute inset-0 size-full object-cover"
        />
        <div className="cosmic-clarity-overlay absolute inset-0" />
        <div className="site-shell relative z-10 flex min-h-[52vh] items-center justify-center text-center">
          <Reveal>
            <p className="text-xs tracking-[0.3em] text-gold uppercase">
              Suit up. Look closer.
            </p>
            <h2 className="display-type mx-auto mt-5 max-w-5xl text-6xl leading-[0.9] tracking-[-0.04em] text-balance sm:text-8xl lg:text-[8.5rem]">
              A lie this detailed becomes{" "}
              <em className="text-gold-soft">architecture.</em>
            </h2>
          </Reveal>
        </div>
      </section>

      <section id="timeline" className="py-24 sm:py-32">
        <div className="site-shell">
          <Reveal>
            <SectionHeading
              eyebrow="The timeline"
              title="Burned, rebuilt,"
              accent="and passed on."
              description="The Playbook itself moves through the story—from its first leather-bound reveal to a stack of handwritten pages at sunrise."
            />
          </Reveal>
          <PlaybookTimeline items={timeline} />
        </div>
      </section>

      {robin ? (
        <section id="final-page" className="overflow-hidden py-24 sm:py-36">
          <div className="site-shell">
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <Reveal>
                <p className="text-xs tracking-[0.3em] text-gold uppercase">
                  The last play he would ever run
                </p>
                <h2 className="display-type mt-5 text-6xl leading-[0.92] tracking-[-0.04em] text-balance sm:text-8xl">
                  The final page.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground">
                  Fifteen moves. One rooftop. The only play whose ending was
                  never about winning the game.
                </p>
              </Reveal>
            </div>
            <ParchmentReader title={robin.title} steps={robin.steps} />
          </div>
        </section>
      ) : null}

      <section className="px-3 py-20 sm:px-6 sm:py-28">
        <Reveal>
          <div className="liquid-glass relative mx-auto flex min-h-[28rem] max-w-6xl flex-col items-center justify-center overflow-hidden rounded-[2rem] px-6 text-center">
            <div className="archive-grid absolute inset-0" />
            <BookOpenIcon
              className="relative z-10 mb-7 size-10 text-gold"
              aria-hidden="true"
            />
            <p className="relative z-10 text-xs tracking-[0.3em] text-gold uppercase">
              Challenge accepted
            </p>
            <h2 className="display-type relative z-10 mt-5 max-w-4xl text-6xl leading-[0.9] text-balance sm:text-8xl">
              The whole book is waiting.
            </h2>
            <Button
              asChild
              size="lg"
              className="relative z-10 mt-9 rounded-full px-7"
            >
              <Link href="/plays">
                Browse every play <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  )
}
