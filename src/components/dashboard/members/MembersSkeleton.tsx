function SkeletonBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-surface-highest/60 rounded-md animate-pulse ${className}`}
    />
  );
}

export function MembersHeaderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex flex-col gap-2">
        <SkeletonBar className="h-3 w-40" />
        <SkeletonBar className="h-8 w-64" />
      </div>
      <SkeletonBar className="h-11 w-40" />
    </div>
  );
}

export default function MembersSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <div className="hidden md:grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 bg-surface-low">
        <SkeletonBar className="h-3 w-16" />
        <SkeletonBar className="h-3 w-12" />
        <SkeletonBar className="h-3 w-14" />
      </div>

      <div className="flex flex-col gap-3 p-4 md:p-0 md:gap-0">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-2 md:px-6 py-4 md:border-b md:border-surface-low md:last:border-b-0"
          >
            <SkeletonBar className="h-10 w-10 rounded-lg shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <SkeletonBar className="h-3 w-32" />
              <SkeletonBar className="h-3 w-44" />
            </div>
            <SkeletonBar className="h-6 w-16 rounded-full hidden md:block" />
            <SkeletonBar className="h-4 w-4 hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
