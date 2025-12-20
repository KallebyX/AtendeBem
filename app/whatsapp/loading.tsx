import { Skeleton } from "@/components/ui/skeleton"

export default function WhatsAppLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16" />
      </div>

      <div className="container mx-auto p-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-3 gap-4 h-[600px]">
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-2" />
        </div>
      </div>
    </div>
  )
}
