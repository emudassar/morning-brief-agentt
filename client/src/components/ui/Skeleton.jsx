export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="app-shell min-h-full px-4 py-8">
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <Skeleton className="mb-4 h-4 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-8 w-56" />
            <Skeleton className="mt-3 h-4 w-72" />
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-12 w-full" />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 xl:col-span-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="mt-3 h-36 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
