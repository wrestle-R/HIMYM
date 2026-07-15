import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="site-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="display-type text-2xl">Legend-dairy</p>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            A private fan archive
          </p>
        </div>
        <Button asChild variant="ghost">
          <Link href="/plays">
            Browse all 26 plays <ArrowUpRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </div>
    </footer>
  )
}
