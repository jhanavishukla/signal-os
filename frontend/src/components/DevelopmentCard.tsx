import React from 'react';
import { ExternalLink, Sparkles, TrendingUp, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { IntelligenceDevelopment } from '../types';
import { cn } from '../lib/utils';

interface DevelopmentCardProps {
  development: IntelligenceDevelopment;
  featured?: boolean;
}

export const DevelopmentCard: React.FC<DevelopmentCardProps> = ({ development, featured = false }) => {
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Bullish Paradigm</span>;
      case 'disrupt':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Architectural Shift</span>;
      case 'bearish':
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Downside Risk</span>;
      default:
        return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-500/10 text-slate-300 border border-slate-500/20">Structural Trend</span>;
    }
  };

  const formattedDate = new Date(development.published_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <article className={cn(
      "group relative rounded-xl border border-border-subtle bg-surface-card p-5 transition-all duration-200 hover:border-signal-indigo/40 hover:bg-surface hover:shadow-xl hover:shadow-indigo-950/20",
      featured ? "border-signal-indigo/30 bg-surface/90 ring-1 ring-signal-indigo/20" : ""
    )}>
      {/* Top Meta Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {development.industry_name && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
              {development.industry_name}
            </span>
          )}
          {development.topic_name && (
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-signal-indigo/10 text-signal-indigo border border-signal-indigo/20">
              {development.topic_name}
            </span>
          )}
          {getSentimentBadge(development.sentiment)}
        </div>

        {/* Scores */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1 text-slate-400 bg-surface-subtle px-2 py-0.5 rounded border border-border-subtle" title="Relevance to your profile & tracked topics">
            <span className="text-slate-400 text-[10px] uppercase font-sans">Match</span>
            <span className="text-signal-cyan font-bold">{(development.relevance_score * 10).toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 bg-surface-subtle px-2 py-0.5 rounded border border-border-subtle" title="Overall strategic industry importance">
            <span className="text-slate-400 text-[10px] uppercase font-sans">Impact</span>
            <span className="text-white font-bold">{development.importance_score.toFixed(1)}/10</span>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <h3 className="text-base font-semibold text-slate-100 group-hover:text-signal-cyan transition-colors leading-snug mb-2">
        {development.title}
      </h3>

      {/* Structured Summary */}
      <p className="text-sm text-slate-300 leading-relaxed mb-4">
        {development.summary}
      </p>

      {/* "Why It Matters" Intelligence Pill Box */}
      <div className="rounded-lg bg-surface-subtle/90 border border-border-subtle/80 p-3.5 mb-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-signal-cyan mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Why this matters to you</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {development.why_it_matters}
        </p>
        {development.implications && (
          <div className="mt-2.5 pt-2.5 border-t border-border-subtle/60 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Strategic Implication: </span>
            {development.implications}
          </div>
        )}
      </div>

      {/* Footer Info & Outbound Link */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-medium">{development.source_name}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        <a
          href={development.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-signal-cyan transition-colors"
        >
          <span>Source</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
};
