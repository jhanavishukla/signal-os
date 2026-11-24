import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Radio, 
  ArrowRight, 
  Layers, 
  FileText, 
  CheckCircle2,
  Zap,
  Target
} from 'lucide-react';
import { IntelligenceDevelopment, Briefing, Industry, Topic, UserProfile } from '../types';
import { DevelopmentCard } from '../components/DevelopmentCard';
import { NavTab } from '../components/Sidebar';

interface DashboardPageProps {
  profile: UserProfile;
  developments: IntelligenceDevelopment[];
  briefings: Briefing[];
  industries: Industry[];
  onNavigate: (tab: NavTab) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profile,
  developments,
  briefings,
  industries,
  onNavigate
}) => {
  const topDevelopment = developments[0];
  const recentDevelopments = developments.slice(1, 4);
  const latestBriefing = briefings[0];

  // Calculate trending topics across all industries
  const trendingTopics = industries
    .flatMap(ind => (ind.topics || []).map(t => ({ ...t, industry_name: ind.name })))
    .filter(t => t.is_trending)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Personalized Status Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-r from-surface-card via-surface to-surface-subtle p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-signal-indigo/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-signal-indigo/15 text-signal-cyan border border-signal-indigo/30 text-xs font-semibold mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>Synthesis Active • Customized for {profile.role_title}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Welcome back, {profile.full_name}
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              SignalOS continuously scans multi-modal industry sources and synthesizes strategic breakthroughs aligned with your interest in <span className="text-signal-cyan font-medium">{profile.followed_topics.map(t => t.name).join(", ")}</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => onNavigate('briefings')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-signal-indigo hover:bg-signal-indigo/90 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all"
            >
              <FileText className="h-4 w-4" />
              <span>Read Morning Briefing</span>
            </button>
            <button
              onClick={() => onNavigate('radar')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-subtle hover:bg-surface-hover text-slate-200 border border-border-subtle text-sm font-medium transition-all"
            >
              <Radio className="h-4 w-4 text-signal-cyan" />
              <span>Launch Radar</span>
            </button>
          </div>
        </div>

        {/* Quick Intelligence Metric Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border-subtle/80 text-left">
          <div>
            <div className="text-xs text-slate-400">High-Impact Signals</div>
            <div className="text-xl font-bold text-white mt-0.5">{developments.length} Verified</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Avg Relevance Match</div>
            <div className="text-xl font-bold text-signal-cyan mt-0.5">94.2%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Active Industries</div>
            <div className="text-xl font-bold text-slate-200 mt-0.5">{industries.length} Sectors</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Signal Cadence</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5 capitalize">{profile.briefing_frequency} Delivery</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Highlighted Development + Executive Briefing Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Featured & Priority Developments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-signal-cyan" />
              <h2 className="text-lg font-bold text-white">Today's Essential Development</h2>
            </div>
            <button 
              onClick={() => onNavigate('radar')}
              className="text-xs text-slate-400 hover:text-signal-cyan flex items-center gap-1 font-medium transition-colors"
            >
              <span>View full radar</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {topDevelopment && (
            <DevelopmentCard development={topDevelopment} featured={true} />
          )}

          {/* Recent Signals List */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Recently Discovered Developments
            </h3>
            <div className="space-y-3">
              {recentDevelopments.map((dev) => (
                <DevelopmentCard key={dev.id} development={dev} />
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Briefing Synthesis & Trending Topics */}
        <div className="space-y-6">
          {/* Latest Executive Briefing Card */}
          {latestBriefing && (
            <div className="rounded-xl border border-signal-indigo/30 bg-surface-card p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-signal-indigo/15 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-signal-indigo/20 text-signal-cyan border border-signal-indigo/30">
                  {latestBriefing.period_label}
                </span>
                <span className="text-xs text-slate-400">{latestBriefing.type}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {latestBriefing.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-4">
                {latestBriefing.executive_summary}
              </p>
              
              <div className="text-xs font-semibold text-slate-300 mb-2">Key Takeaways:</div>
              <div className="text-xs text-slate-400 space-y-1.5 whitespace-pre-line mb-5">
                {latestBriefing.key_takeaways}
              </div>

              <button
                onClick={() => onNavigate('briefings')}
                className="w-full py-2.5 px-4 rounded-lg bg-surface-subtle hover:bg-surface-hover text-signal-cyan border border-signal-cyan/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Read Full Intelligence Synthesis</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Trending Topics Tracker */}
          <div className="rounded-xl border border-border-subtle bg-surface-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Emerging Trends</h3>
              </div>
              <button 
                onClick={() => onNavigate('explore')}
                className="text-xs text-slate-400 hover:text-signal-cyan"
              >
                Browse all
              </button>
            </div>

            <div className="space-y-3">
              {trendingTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle border border-border-subtle hover:border-slate-700 transition-all cursor-pointer"
                  onClick={() => onNavigate('radar')}
                >
                  <div>
                    <div className="text-xs font-semibold text-slate-200">{topic.name}</div>
                    <div className="text-[10px] text-slate-400">{topic.industry_name}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-signal-cyan bg-signal-cyan/10 px-2 py-0.5 rounded border border-signal-cyan/20">
                      {topic.followers_count} tracked
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
