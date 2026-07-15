import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function PlaysLoading() {
  return (
    <main>
      <SiteHeader />
      <div className="site-shell py-24">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-6 h-28 max-w-3xl" />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-72" />
          ))}
        </div>
      </div>
    </main>
  )
}
