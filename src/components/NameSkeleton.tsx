// Loading skeleton shown while names "generate" for a tactile feel.
export function NameSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="w-full space-y-2">
            <div className="skeleton-shimmer h-5 w-1/2 rounded-md" />
            <div className="skeleton-shimmer h-3 w-2/3 rounded-md" />
          </div>
        </div>
      ))}
    </>
  );
}
