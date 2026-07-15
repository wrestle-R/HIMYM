import Link from "next/link"
import { BookXIcon } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <div className="site-shell flex min-h-[75vh] flex-col items-center justify-center text-center">
        <BookXIcon className="size-12 text-gold" aria-hidden="true" />
        <p className="mt-6 text-xs tracking-[0.3em] text-gold uppercase">
          Page missing
        </p>
        <h1 className="display-type mt-4 text-7xl sm:text-9xl">
          Play not found.
        </h1>
        <p className="mt-5 max-w-md text-muted-foreground">
          Even Barney knew when to abandon a play. Return to the archive and
          choose another.
        </p>
        <Button asChild className="mt-8 rounded-full" size="lg">
          <Link href="/plays">Back to the Playbook</Link>
        </Button>
      </div>
    </main>
  )
}
