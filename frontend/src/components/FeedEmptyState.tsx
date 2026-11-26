import React from 'react';
import { Radio, SearchX, RotateCcw, FilterX } from 'lucide-react';

interface FeedEmptyStateProps {
  title?: string;
  description?: string;
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

export const FeedEmptyState: React.FC<FeedEmptyStateProps> = ({
  title = "No intelligence developments found",
  description = "No signals match your active criteria or industry filter at this moment.",
  hasFilters = false,
  onResetFilters
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-dashed border-border-subtle bg-surface-card/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative mb-4">
        <div className="h-14 w-14 rounded-2xl bg-surface-subtle border border-border-subtle flex items-center justify-center shadow-lg shadow-indigo-950/20">
          {hasFilters ? (
            <FilterX className="h-7 w-7 text-signal-cyan/80" />
          ) : (
            <Radio className="h-7 w-7 text-signal-indigo/80" />
          )}
        </div>
        <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-signal-indigo border-2 border-background animate-ping"></span>
      </div>

      <h3 className="text-base font-bold text-slate-100 mb-1.5 tracking-tight">
        {title}
      </h3>

      <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {hasFilters && onResetFilters && (
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-subtle hover:bg-surface-hover text-signal-cyan border border-signal-cyan/30 text-xs font-semibold shadow-sm transition-all hover:border-signal-cyan/60"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filter Parameters</span>
        </button>
      )}
    </div>
  );
};
