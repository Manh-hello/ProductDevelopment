import { cn } from "../../utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-navy-50", className)}
      aria-hidden="true"
    />
  );
}

export function VocabularyCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-bg-card p-5">
      <div className="flex items-start justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-4 w-24" />
      <Skeleton className="mt-2 h-4 w-32" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-border px-4 py-3.5">
      <Skeleton className="h-6 w-14" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="ml-auto h-5 w-16 rounded-full" />
    </div>
  );
}
