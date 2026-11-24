import React from 'react';
import { 
  Compass, 
  Layers, 
  FileText, 
  Compass as ExploreIcon, 
  User, 
  Radio, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

export type NavTab = 'dashboard' | 'radar' | 'briefings' | 'explore' | 'profile';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  followedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab, followedCount }) => {
  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Intelligence Desk', icon: Activity },
    { id: 'radar', label: 'Industry Radar', icon: Radio, badge: 'Live' },
    { id: 'briefings', label: 'Executive Briefings', icon: FileText },
    { id: 'explore', label: 'Explore & Follow', icon: ExploreIcon },
    { id: 'profile', label: 'Profile & Priorities', icon: User },
  ];

  return (
    <aside className="w-64 border-r border-border-subtle bg-surface/50 backdrop-blur-xl flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-border-subtle gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-signal-indigo to-signal-cyan flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Radio className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">SignalOS</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-signal-indigo/20 text-signal-indigo border border-signal-indigo/30">
                Core v0.1
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Personal Industry Intelligence</p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Intelligence Matrix
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group",
                    isActive
                      ? "bg-signal-indigo/15 text-white border border-signal-indigo/30 shadow-sm shadow-indigo-500/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-surface-hover"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-signal-cyan" : "text-slate-400 group-hover:text-slate-200")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-semibold tracking-wide uppercase px-1.5 py-0.2 rounded bg-signal-cyan/15 text-signal-cyan border border-signal-cyan/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Active Subscriptions Summary */}
        <div className="px-4 py-3 mx-3 rounded-lg bg-surface-subtle/80 border border-border-subtle">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400">Tracked Topics</span>
            <span className="font-semibold text-signal-cyan">{followedCount} Active</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-signal-indigo to-signal-cyan h-1.5 rounded-full" style={{ width: `${Math.min(100, followedCount * 25)}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            AI synthesis engine automatically customizes briefings to these signals.
          </p>
        </div>
      </div>

      {/* Footer Profile Mini Pill */}
      <div className="p-4 border-t border-border-subtle">
        <button 
          onClick={() => onSelectTab('profile')}
          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow">
              AC
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">Alex Chen</div>
              <div className="text-[11px] text-slate-400 truncate">Staff AI Architect</div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </aside>
  );
};
