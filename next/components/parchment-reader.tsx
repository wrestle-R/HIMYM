"use client"

import { useMemo, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import type { PlayStep } from "@/lib/archive-types"

function ParchmentContent({
  title,
  steps,
  pageLabel,
}: {
  title: string
  steps: PlayStep[]
  pageLabel?: string
}) {
  return (
    <>
      <div className="parchment-grain" />
      <div className="relative z-10 flex h-full flex-col px-9 py-12 sm:px-14 sm:py-16 md:px-20 md:py-20">
        <div className="mx-auto mb-10 w-[74%] border border-parchment-ink px-4 py-5 text-center sm:mb-14 sm:py-8">
          <h2 className="script-type text-4xl leading-none sm:text-6xl md:text-7xl">
            {title}
          </h2>
        </div>
        <ol className="book-type flex flex-col gap-3 text-[0.72rem] leading-[1.55] sm:text-sm md:gap-4 md:text-[0.92rem]">
          {steps.map((item) => (
            <li key={item.order} className="grid grid-cols-[1.35rem_1fr] gap-1">
              <span aria-hidden="true">{item.order}.</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ol>
        {pageLabel ? (
          <p className="book-type mt-auto pt-8 text-center text-[0.65rem] tracking-[0.2em] uppercase opacity-60">
            {pageLabel}
          </p>
        ) : null}
      </div>
    </>
  )
}

export function ParchmentReader({
  title,
  steps,
}: {
  title: string
  steps: PlayStep[]
}) {
  const pages = useMemo(
    () =>
      Array.from({ length: Math.ceil(steps.length / 5) }, (_, index) =>
        steps.slice(index * 5, index * 5 + 5)
      ),
    [steps]
  )
  const [page, setPage] = useState(0)
  const reducedMotion = useReducedMotion()

  return (
    <div>
      <motion.article
        initial={false}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="parchment-sheet mx-auto hidden min-h-[68rem] w-full max-w-3xl overflow-hidden md:block"
      >
        <ParchmentContent title={title} steps={steps} />
      </motion.article>

      <div className="md:hidden">
        <div className="overflow-hidden px-1 py-4" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={page}
              initial={false}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={
                reducedMotion ? undefined : { opacity: 0, rotateY: -7, x: -18 }
              }
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="parchment-sheet min-h-[42rem] overflow-hidden"
            >
              <ParchmentContent
                title={title}
                steps={pages[page]}
                pageLabel={`Page ${page + 1} of ${pages.length}`}
              />
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full"
            disabled={page === 0}
            onClick={() => setPage((value) => Math.max(0, value - 1))}
          >
            <ChevronLeftIcon />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {pages.map((_, index) => (
              <span
                key={index}
                className={
                  index === page
                    ? "h-1.5 w-8 rounded-full bg-primary"
                    : "size-1.5 rounded-full bg-muted"
                }
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon-lg"
            className="rounded-full"
            disabled={page === pages.length - 1}
            onClick={() =>
              setPage((value) => Math.min(pages.length - 1, value + 1))
            }
          >
            <ChevronRightIcon />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
