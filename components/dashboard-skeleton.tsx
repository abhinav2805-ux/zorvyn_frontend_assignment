export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-9 w-48 rounded-md bg-muted" />
        <div className="h-5 w-80 max-w-full rounded-md bg-muted" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-muted" />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="h-[340px] rounded-2xl bg-muted xl:col-span-6" />
        <div className="h-[340px] rounded-2xl bg-muted xl:col-span-4" />
        <div className="h-[340px] rounded-2xl bg-muted xl:col-span-2" />
      </div>

      <div>
        <div className="mb-6 h-8 w-56 rounded-md bg-muted" />
        <div className="h-12 rounded-2xl bg-muted" />
        <div className="mt-4 h-64 rounded-2xl bg-muted" />
      </div>
    </div>
  );
}
