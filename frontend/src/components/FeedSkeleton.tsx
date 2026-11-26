import React from 'react';
import { cn } from '../lib/utils';

interface FeedSkeletonProps {
  count?: number;
  featured?: boolean;
}

export const FeedSkeleton: React.FC<FeedSkeletonProps> = ({ count = 3, featured = false }) => {
  return (
    <div className="space-y-4 w-full animate-pulse" role="status" aria-label="Loading intelligence feed">
      {featured && (
        <div className="rounded-xl border border-border-subtle bg-surface-card/60 p-5 space-y-4">
          {/* Header badges skeleton */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-24 rounded bg-surface-subtle/80"></div>
              <div className="h-5 w-20 rounded bg-surface-subtle/80"></div>
              <div className="h-5 w-28 rounded bg-surface-subtle/80"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-16 rounded bg-surface-subtle/80"></div>
              <div className="h-5 w-16 rounded bg-surface-subtle/80"></div>
            </div>
          </div>

          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-5 w-5/6 rounded bg-surface-subtle/80"></div>
            <div className="h-5 w-3/5 rounded bg-surface-subtle/80"></div>
          </div>

          {/* Summary skeleton */}
          <div className="space-y-1.5 pt-1">
            <div className="h-3.5 w-full rounded bg-surface-subtle/60"></div>
            <div className="h-3.5 w-11/12 rounded bg-surface-subtle/60"></div>
          </div>

          {/* Why It Matters block skeleton */}
          <div className="rounded-lg bg-surface-subtle/40 border border-border-subtle/60 p-3.5 space-y-2">
            <div className="h-3.5 w-36 rounded bg-signal-cyan/15"></div>
            <div className="h-3 w-full rounded bg-surface-subtle/70"></div>
            <div className="h-3 w-4/5 rounded bg-surface-subtle/70"></div>
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-3.5 w-32 rounded bg-surface-subtle/60"></div>
            <div className="h-3.5 w-16 rounded bg-surface-subtle/60"></div>
          </div>
        </div>
      )}

      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-xl border border-border-subtle bg-surface-card/60 p-5 space-y-3.5"
        >
          {/* Header badges skeleton */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-20 rounded bg-surface-subtle/80"></div>
              <div className="h-5 w-24 rounded bg-surface-subtle/80"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-14 rounded bg-surface-subtle/80"></div>
              <div className="h-5 w-14 rounded bg-surface-subtle/80"></div>
            </div>
          </div>

          {/* Title skeleton */}
          <div className="h-4.5 w-4/5 rounded bg-surface-subtle/80"></div>

          {/* Summary skeleton */}
          <div className="space-y-1.5">
            <div className="h-3.5 w-full rounded bg-surface-subtle/60"></div>
            <div className="h-3.5 w-5/6 rounded bg-surface-subtle/60"></div>
          </div>

          {/* Why it matters callout */}
          <div className="rounded-lg bg-surface-subtle/40 border border-border-subtle/60 p-3 space-y-1.5">
            <div className="h-3 w-32 rounded bg-signal-cyan/15"></div>
            <div className="h-3 w-11/12 rounded bg-surface-subtle/70"></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-3 w-28 rounded bg-surface-subtle/60"></div>
            <div className="h-3 w-12 rounded bg-surface-subtle/60"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
