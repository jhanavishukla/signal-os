import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  ArrowUpDown, 
  Layers
} from 'lucide-react';
import { IntelligenceDevelopment, Industry, Topic } from '../types';
import { DevelopmentCard } from '../components/DevelopmentCard';
import { FeedSkeleton } from '../components/FeedSkeleton';
import { FeedEmptyState } from '../components/FeedEmptyState';
import { FeedErrorState } from '../components/FeedErrorState';

interface RadarPageProps {
  developments: IntelligenceDevelopment[];
  industries: Industry[];
  topics: Topic[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const RadarPage: React.FC<RadarPageProps> = ({
  developments,
  industries,
  topics,
  isLoading = false,
  error = null,
  onRetry
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<number | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minImportance, setMinImportance] = useState<number>(7.0);
  const [sortBy, setSortBy] = useState<'relevance' | 'importance' | 'recent'>('relevance');

  // Filter topics based on selected industry
  const availableTopics = selectedIndustry === 'all' 
    ? topics 
    : topics.filter(t => t.industry_id === selectedIndustry);

  const hasActiveFilters = selectedIndustry !== 'all' || selectedTopic !== 'all' || searchQuery.trim() !== '' || minImportance > 7.0;

  const handleResetFilters = () => {
    setSelectedIndustry('all');
    setSelectedTopic('all');
    setSearchQuery('');
    setMinImportance(7.0);
  };

  // Filter developments
  const filteredDevelopments = developments.filter(dev => {
    if (selectedIndustry !== 'all' && dev.industry_id !== selectedIndustry) return false;
    if (selectedTopic !== 'all' && dev.topic_id !== selectedTopic) return false;
    if (dev.importance_score < minImportance) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = dev.title.toLowerCase().includes(q);
      const matchSummary = dev.summary.toLowerCase().includes(q);
      const matchWhy = dev.why_it_matters.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchWhy) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'relevance') return b.relevance_score - a.relevance_score;
    if (sortBy === 'importance') return b.importance_score - a.importance_score;
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Radar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="h-5 w-5 text-signal-cyan animate-pulse" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Industry Radar</h1>
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-signal-cyan/15 text-signal-cyan border border-signal-cyan/30">
              Live Monitoring
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Real-time multi-source intelligence radar. Disentangles strategic impact from personal profile relevance.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search signals, papers, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-card border border-border-subtle text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-signal-cyan transition-colors"
          />
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-surface-card border border-border-subtle">
        {/* Industry Pill Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">Industry:</span>
          <button
            onClick={() => { setSelectedIndustry('all'); setSelectedTopic('all'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedIndustry === 'all'
                ? 'bg-signal-indigo text-white font-semibold shadow-sm'
                : 'bg-surface-subtle text-slate-400 hover:text-slate-200 hover:bg-surface-hover'
            }`}
          >
            All Sectors
          </button>
          {industries.map(ind => (
            <button
              key={ind.id}
              onClick={() => { setSelectedIndustry(ind.id); setSelectedTopic('all'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedIndustry === ind.id
                  ? 'bg-signal-indigo text-white font-semibold shadow-sm'
                  : 'bg-surface-subtle text-slate-400 hover:text-slate-200 hover:bg-surface-hover'
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* Sort & Impact Threshold Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Min Impact:</span>
            <select
              value={minImportance}
              onChange={(e) => setMinImportance(Number(e.target.value))}
              className="bg-surface-subtle border border-border-subtle rounded-md px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value={0}>Any Impact</option>
              <option value={7.5}>&gt;= 7.5 High Impact</option>
              <option value={8.5}>&gt;= 8.5 Critical Paradigm</option>
              <option value={9.0}>&gt;= 9.0 Frontier Breakthrough</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-surface-subtle border border-border-subtle rounded-md px-2 py-1 text-xs text-slate-200 focus:outline-none"
            >
              <option value="relevance">Sort by: Profile Match</option>
              <option value="importance">Sort by: Strategic Impact</option>
              <option value="recent">Sort by: Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sub-Topic Badges if Industry Selected */}
      {availableTopics.length > 0 && selectedIndustry !== 'all' && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400">Filter Topic:</span>
          <button
            onClick={() => setSelectedTopic('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedTopic === 'all'
                ? 'bg-signal-cyan/20 text-signal-cyan border border-signal-cyan/40'
                : 'bg-surface-subtle text-slate-400 border border-border-subtle hover:text-slate-200'
            }`}
          >
            All Subtopics
          </button>
          {availableTopics.map(top => (
            <button
              key={top.id}
              onClick={() => setSelectedTopic(top.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedTopic === top.id
                  ? 'bg-signal-cyan/20 text-signal-cyan border border-signal-cyan/40'
                  : 'bg-surface-subtle text-slate-400 border border-border-subtle hover:text-slate-200'
              }`}
            >
              {top.name}
            </button>
          ))}
        </div>
      )}

      {/* Developments Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>
            {isLoading ? (
              <span className="inline-block h-4 w-32 bg-surface-subtle animate-pulse rounded"></span>
            ) : (
              <>Showing <strong className="text-white">{filteredDevelopments.length}</strong> intelligence developments</>
            )}
          </span>
          <span>Dual Score Metrics: <strong className="text-signal-cyan">Relevance Match</strong> vs <strong className="text-white">Impact (1-10)</strong></span>
        </div>

        {isLoading ? (
          <FeedSkeleton count={4} />
        ) : error ? (
          <FeedErrorState 
            message={error} 
            onRetry={onRetry || (() => {})} 
          />
        ) : filteredDevelopments.length === 0 ? (
          <FeedEmptyState
            title="No matching developments found"
            description={
              hasActiveFilters
                ? "No signals match the combination of active filters, keyword query, and impact threshold."
                : "No intelligence updates have been recorded yet."
            }
            hasFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
          />
        ) : (
          filteredDevelopments.map(dev => (
            <DevelopmentCard key={dev.id} development={dev} />
          ))
        )}
      </div>
    </div>
  );
};
