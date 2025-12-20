export default function Loading() {
  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-muted rounded-lg w-1/3" />
        <div className="h-20 bg-muted rounded-3xl" />
        <div className="h-96 bg-muted rounded-3xl" />
      </div>
    </div>
  )
}
