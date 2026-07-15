import Image from "next/image"
import Link from "next/link"
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={
        overlay ? "absolute inset-x-0 top-0 z-30 pt-5" : "relative z-30 pt-5"
      }
    >
      <div className="site-shell">
        <div className="archive-nav">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            aria-label="Legend-dairy home"
          >
            <span className="archive-nav-seal">
              <Image
                src="/media/legend-dairy-logo.png"
                alt=""
                width={48}
                height={48}
                priority
              />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="display-type truncate text-xl leading-none tracking-[-0.02em] sm:text-2xl">
                Legend-dairy
              </span>
              <span className="mt-1 hidden text-[0.56rem] leading-none tracking-[0.25em] text-muted-foreground uppercase sm:block">
                The Stinson archive
              </span>
            </span>
          </Link>

          <div
            className="hidden items-center gap-4 lg:flex"
            aria-label="Archive collection summary"
          >
            <span className="archive-nav-rule" />
            <SparklesIcon className="size-3.5 text-gold" aria-hidden="true" />
            <p className="text-[0.62rem] tracking-[0.24em] text-muted-foreground uppercase">
              26 plays <span aria-hidden="true">·</span> nine seasons{" "}
              <span aria-hidden="true">·</span> no loose ends
            </p>
            <span className="archive-nav-rule" />
          </div>

          <Button asChild size="lg" className="archive-nav-action rounded-full">
            <Link href="/plays">
              <span className="hidden sm:inline">Enter archive</span>
              <span className="sm:hidden">Archive</span>
              <ArrowUpRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
