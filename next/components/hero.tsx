"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon, SparklesIcon } from "lucide-react"
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

import { Button } from "@/components/ui/button"
import { VideoFade } from "@/components/video-fade"

export function Hero() {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 90, damping: 22 })
  const springY = useSpring(pointerY, { stiffness: 90, damping: 22 })
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7])
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6])

  return (
    <section
      className="relative flex min-h-screen w-full items-end overflow-hidden pt-32"
      onPointerMove={(event) => {
        if (reducedMotion) return
        const bounds = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
        pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
      }}
      onPointerLeave={() => {
        pointerX.set(0)
        pointerY.set(0)
      }}
    >
      <VideoFade
        src="/media/gold-bloom.mp4"
        poster="/media/gold-bloom-poster.jpg"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="grain-overlay" />

      <div className="site-shell relative z-10 grid min-h-[calc(100vh-8rem)] items-center gap-10 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-6 pt-8"
        >
          <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-[0.22em] text-gold-soft uppercase">
            <SparklesIcon className="size-3.5" aria-hidden="true" />
            The Stinson Playbook Archive
          </div>
          <h1 className="display-type max-w-3xl text-6xl leading-[0.88] tracking-[-0.04em] text-balance sm:text-7xl lg:text-[7.5rem]">
            Every play.
            <br />
            <em className="text-gold-soft">One legendary</em>
            <br />
            archive.
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Twenty-six schemes, nine seasons, one impossible final page. The
            book Barney said he burned is open again.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/plays">
                Open the Playbook <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-6"
            >
              <Link href="#timeline">Trace the legend</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          style={
            reducedMotion
              ? undefined
              : { rotateX, rotateY, transformPerspective: 1100 }
          }
          initial={false}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-xl"
        >
          <div className="book-glow" />
          <Image
            src="/media/playbook-cover-v2.png"
            alt="The Playbook, a black leather-bound book with antique-gold tooling"
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 44vw"
            className="book-cover-shadow scale-[1.06] object-contain"
          />
        </motion.div>

        <a
          href="#archive"
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] tracking-[0.24em] text-muted-foreground uppercase"
        >
          Enter the archive
          <ArrowDownIcon className="size-4 animate-bounce" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
