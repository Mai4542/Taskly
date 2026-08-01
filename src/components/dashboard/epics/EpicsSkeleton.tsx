function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-lg border border-surface-highest bg-white px-5 py-4 shadow-sm animate-pulse">
      <div className="h-4 w-16 rounded bg-surface-highest" />
      <div className="mt-4 h-4 w-3/4 rounded bg-surface-highest" />
      <div className="mt-4 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-surface-highest" />
        <div className="h-3 w-24 rounded bg-surface-highest" />
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-surface-highest pt-3">
        <div className="h-3 w-20 rounded bg-surface-highest" />
        <div className="h-3 w-14 rounded bg-surface-highest" />
      </div>
    </div>
  );
}

export default function EpicsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
