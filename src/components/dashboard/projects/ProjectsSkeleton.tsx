export default function ProjectsSkeleton() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      aria-busy="true"
      aria-label="Loading projects"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-[#E8EDFF] bg-white p-5"
        >
          <div className="h-32 rounded-md bg-[#E8EDFF]/50 animate-pulse w-63.5" />
          <div className="mt-3 h-6 w-47.5 rounded bg-[#E8EDFF]/50 animate-pulse" />
          <div className="mt-2 h-4 w-32 rounded bg-[#E8EDFF]/50 animate-pulse" />
        </div>
      ))}
    </div>
  );
}
