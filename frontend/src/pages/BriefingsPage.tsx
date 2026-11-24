import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Sparkles, 
  Download, 
  Share2, 
  Bookmark, 
  CheckCircle2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Briefing, IntelligenceDevelopment } from '../types';

interface BriefingsPageProps {
  briefings: Briefing[];
  developments: IntelligenceDevelopment[];
}

export const BriefingsPage: React.FC<BriefingsPageProps> = ({ briefings, developments }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'daily' | 'weekly'>('all');
  const [activeBriefingId, setActiveBriefingId] = useState<number>(briefings[0]?.id || 1);

  const filteredBriefings = briefings.filter(b => {
    if (selectedType === 'all') return true;
    return b.type === selectedType;
  });

  const currentBriefing = briefings.find(b => b.id === activeBriefingId) || briefings[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-5 w-5 text-signal-indigo" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Executive Intelligence Briefings</h1>
          </div>
          <p className="text-sm text-slate-400">
            Synthesized intelligence dossiers compiled specifically around your professional role and active signals.
          </p>
        </div>

        {/* Daily / Weekly Filter Toggle */}
        <div className="flex items-center bg-surface-card p-1 rounded-lg border border-border-subtle">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              selectedType === 'all' ? 'bg-signal-indigo text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Briefings
          </button>
          <button
            onClick={() => setSelectedType('daily')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              selectedType === 'daily' ? 'bg-signal-indigo text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Daily Dossiers
          </button>
          <button
            onClick={() => setSelectedType('weekly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              selectedType === 'weekly' ? 'bg-signal-indigo text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Weekly Strategic
          </button>
        </div>
      </div>

      {/* Main Layout: Briefing Navigator + Briefing Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Briefing List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Available Syntheses
          </div>
          {filteredBriefings.map((b) => {
            const isActive = b.id === activeBriefingId;
            return (
              <div
                key={b.id}
                onClick={() => setActiveBriefingId(b.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-surface-card border-signal-indigo shadow-lg shadow-indigo-950/30 ring-1 ring-signal-indigo/40'
                    : 'bg-surface-card/60 border-border-subtle hover:bg-surface-card hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-semibold uppercase tracking-wider px-2 py-0.5 rounded text-[10px] ${
                    b.type === 'daily'
                      ? 'bg-signal-cyan/15 text-signal-cyan border border-signal-cyan/30'
                      : 'bg-signal-violet/15 text-signal-violet border border-signal-violet/30'
                  }`}>
                    {b.type}
                  </span>
                  <span className="text-[11px] text-slate-400">{b.period_label}</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-200 line-clamp-2 mb-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {b.executive_summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Complete Structured Briefing Dossier */}
        <div className="lg:col-span-8">
          {currentBriefing ? (
            <article className="rounded-2xl border border-border-subtle bg-surface-card p-6 md:p-8 space-y-8 shadow-xl">
              {/* Dossier Header */}
              <div className="border-b border-border-subtle pb-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-signal-cyan bg-signal-cyan/10 px-2.5 py-1 rounded border border-signal-cyan/20 font-semibold">
                    {currentBriefing.period_label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover text-slate-400 hover:text-white border border-border-subtle transition-colors" title="Bookmark Dossier">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover text-slate-400 hover:text-white border border-border-subtle transition-colors" title="Export Markdown">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
                  {currentBriefing.title}
                </h2>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-signal-cyan" />
                    <span>Generated 3 mins ago</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-signal-indigo" />
                    <span>LLM Synthesis Engine v1.0</span>
                  </div>
                </div>
              </div>

              {/* Section 1: Executive Macro Overview */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  1. Executive Synthesis
                </h3>
                <div className="p-4 rounded-xl bg-surface-subtle border border-border-subtle text-sm text-slate-200 leading-relaxed">
                  {currentBriefing.executive_summary}
                </div>
              </div>

              {/* Section 2: Key Takeaways */}
              {currentBriefing.key_takeaways && (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    2. Strategic Takeaways & Implications
                  </h3>
                  <div className="p-4 rounded-xl bg-surface-subtle/80 border border-border-subtle space-y-2 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {currentBriefing.key_takeaways}
                  </div>
                </div>
              )}

              {/* Section 3: Underlying Intelligence Signals */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  3. Linked Primary Developments & Verified Sources
                </h3>
                <div className="space-y-3">
                  {developments.slice(0, 3).map((dev) => (
                    <div key={dev.id} className="p-4 rounded-xl bg-surface-subtle border border-border-subtle hover:border-signal-indigo/40 transition-colors">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-signal-cyan">{dev.topic_name || dev.industry_name}</span>
                        <span className="font-mono text-[11px] text-slate-400">Impact: {dev.importance_score}/10</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{dev.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{dev.summary}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-border-subtle/60">
                        <span>Source: <strong className="text-slate-300">{dev.source_name}</strong></span>
                        <a
                          href={dev.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-signal-cyan hover:underline"
                        >
                          <span>Review Original Document</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ) : (
            <div className="p-12 text-center text-slate-400 border border-dashed border-border-subtle rounded-2xl">
              No briefing selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
