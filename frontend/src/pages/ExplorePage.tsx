import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Plus, 
  Check, 
  Users, 
  Sparkles, 
  TrendingUp, 
  Search,
  Cpu,
  Server,
  Coins,
  Dna
} from 'lucide-react';
import { Industry, Topic, UserProfile } from '../types';

interface ExplorePageProps {
  industries: Industry[];
  topics: Topic[];
  profile: UserProfile;
  onToggleTopic: (topicId: number) => Promise<void>;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  industries,
  topics,
  profile,
  onToggleTopic
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndustrySlug, setActiveIndustrySlug] = useState<string>('all');
  const [loadingTopicId, setLoadingTopicId] = useState<number | null>(null);

  const followedTopicIds = new Set(profile.followed_topics.map(t => t.id));

  const getIndustryIcon = (slug: string) => {
    switch (slug) {
      case 'artificial-intelligence':
        return <Cpu className="h-5 w-5 text-signal-cyan" />;
      case 'cloud-infrastructure':
        return <Server className="h-5 w-5 text-signal-indigo" />;
      case 'fintech-defi':
        return <Coins className="h-5 w-5 text-amber-400" />;
      case 'biotech-genomics':
        return <Dna className="h-5 w-5 text-emerald-400" />;
      default:
        return <Layers className="h-5 w-5 text-slate-400" />;
    }
  };

  const handleToggle = async (topicId: number) => {
    setLoadingTopicId(topicId);
    try {
      await onToggleTopic(topicId);
    } finally {
      setLoadingTopicId(null);
    }
  };

  const filteredIndustries = industries.filter(ind => {
    if (activeIndustrySlug !== 'all' && ind.slug !== activeIndustrySlug) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="h-5 w-5 text-signal-cyan" />
            <h1 className="text-2xl font-bold tracking-tight text-white">Explore & Subscribe</h1>
          </div>
          <p className="text-sm text-slate-400">
            Select high-signal sectors and specialized technical domains to continuously train your personal intelligence feed.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics or industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-card border border-border-subtle text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-signal-cyan transition-colors"
          />
        </div>
      </div>

      {/* Sector Tab Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveIndustrySlug('all')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeIndustrySlug === 'all'
              ? 'bg-signal-indigo text-white shadow'
              : 'bg-surface-card text-slate-400 hover:text-slate-200 border border-border-subtle'
          }`}
        >
          All Sectors ({industries.length})
        </button>
        {industries.map(ind => (
          <button
            key={ind.id}
            onClick={() => setActiveIndustrySlug(ind.slug)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeIndustrySlug === ind.slug
                ? 'bg-signal-indigo text-white shadow'
                : 'bg-surface-card text-slate-400 hover:text-slate-200 border border-border-subtle'
            }`}
          >
            {getIndustryIcon(ind.slug)}
            <span>{ind.name}</span>
          </button>
        ))}
      </div>

      {/* Industry Sections with Topic Grids */}
      <div className="space-y-8">
        {filteredIndustries.map(industry => {
          const industryTopics = (industry.topics || []).filter(top => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return top.name.toLowerCase().includes(q) || top.description?.toLowerCase().includes(q);
          });

          if (industryTopics.length === 0 && searchQuery.trim()) return null;

          return (
            <div key={industry.id} className="rounded-2xl border border-border-subtle bg-surface-card p-6 space-y-4">
              {/* Industry Header */}
              <div className="flex items-start justify-between border-b border-border-subtle pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-surface-subtle border border-border-subtle">
                    {getIndustryIcon(industry.slug)}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{industry.name}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">{industry.description}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {industryTopics.length} Curated Topics
                </div>
              </div>

              {/* Topics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {industryTopics.map(topic => {
                  const isFollowed = followedTopicIds.has(topic.id);
                  const isLoading = loadingTopicId === topic.id;

                  return (
                    <div
                      key={topic.id}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                        isFollowed 
                          ? 'bg-surface-subtle border-signal-indigo/50 ring-1 ring-signal-indigo/20'
                          : 'bg-surface-card border-border-subtle hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          {topic.is_trending ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-signal-cyan/15 text-signal-cyan border border-signal-cyan/30">
                              <TrendingUp className="h-3 w-3" />
                              Emerging
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-mono">Domain Topic</span>
                          )}

                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {topic.followers_count}
                          </span>
                        </div>

                        <h3 className="text-sm font-semibold text-slate-200 mb-1 leading-snug">
                          {topic.name}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-4">
                          {topic.description || "In-depth intelligence and macro monitoring."}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggle(topic.id)}
                        disabled={isLoading}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isFollowed
                            ? 'bg-signal-indigo/20 text-signal-cyan border border-signal-cyan/30 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30'
                            : 'bg-surface hover:bg-signal-indigo hover:text-white text-slate-300 border border-border-subtle'
                        }`}
                      >
                        {isLoading ? (
                          <span>Updating...</span>
                        ) : isFollowed ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-signal-cyan" />
                            <span>Tracking Topic</span>
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            <span>Track Signal</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
