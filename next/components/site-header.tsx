"use client"

import Link from "next/link"
import { BookOpenIcon, MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const links = [
  { href: "/", label: "Home" },
  { href: "/plays", label: "The plays" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#final-page", label: "The final page" },
]

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header
      className={
        overlay ? "absolute inset-x-0 top-0 z-30 pt-4" : "relative z-30 pt-4"
      }
    >
      <div className="site-shell">
        <div className="liquid-glass flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Legend-dairy home"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BookOpenIcon className="size-4" aria-hidden="true" />
            </span>
            <span className="display-type text-xl tracking-tight">
              Legend-dairy
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button asChild className="rounded-full" size="lg">
              <Link href="/plays">Open the Playbook</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="rounded-full md:hidden"
                aria-label="Open navigation"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="display-type text-2xl">
                  Legend-dairy
                </SheetTitle>
                <SheetDescription>
                  The Stinson Playbook Archive
                </SheetDescription>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 px-4"
                aria-label="Mobile navigation"
              >
                {links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="justify-start"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
