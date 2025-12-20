import { Skeleton } from "@/components/ui/skeleton"

export default function CalendarioLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16" />
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-80 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  )
}
