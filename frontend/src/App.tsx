import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { RadarPage } from './pages/RadarPage';
import { BriefingsPage } from './pages/BriefingsPage';
import { ExplorePage } from './pages/ExplorePage';
import { ProfilePage } from './pages/ProfilePage';
import { apiService, mockData } from './services/api';
import { UserProfile, Industry, Topic, IntelligenceDevelopment, Briefing } from './types';
import { Bell, Sparkles, RefreshCw } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(mockData.profile);
  const [industries, setIndustries] = useState<Industry[]>(mockData.industries);
  const [developments, setDevelopments] = useState<IntelligenceDevelopment[]>(mockData.developments);
  const [briefings, setBriefings] = useState<Briefing[]>(mockData.briefings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from backend
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [profData, indData, devData, briefData] = await Promise.all([
        apiService.getProfile(),
        apiService.getIndustries(),
        apiService.getIntelligence(),
        apiService.getBriefings()
      ]);
      setProfile(profData);
      setIndustries(indData);
      setDevelopments(devData);
      setBriefings(briefData);
    } catch (err: any) {
      console.warn("Failed to load intelligence feed:", err);
      setError(err?.message || "Failed to establish real-time link with intelligence service.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle follow / unfollow topic
  const handleToggleTopic = async (topicId: number) => {
    await apiService.toggleFollowTopic(topicId);
    // Refresh profile to update tracked topic list
    const updatedProfile = await apiService.getProfile();
    setProfile(updatedProfile);
  };

  // Handle profile update
  const handleUpdateProfile = async (updated: Partial<UserProfile>) => {
    const res = await apiService.updateProfile(updated);
    setProfile(res);
  };

  // Flat topics list
  const allTopics: Topic[] = industries.flatMap(ind => ind.topics || []);

  return (
    <div className="flex min-h-screen bg-background text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        followedCount={profile.followed_topics.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Floating App Bar */}
        <header className="h-16 border-b border-border-subtle bg-surface/30 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-medium text-slate-200 capitalize">
              {currentTab === 'dashboard' ? 'Intelligence Desk' : currentTab}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle border border-border-subtle text-xs text-slate-300">
              <span className={`w-2 h-2 rounded-full ${loading ? 'bg-signal-cyan animate-spin' : error ? 'bg-rose-400' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span>{loading ? 'Syncing...' : error ? 'Connection Offline' : 'Signals Online'}</span>
            </div>

            <button 
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-hover text-slate-400 hover:text-white border border-border-subtle transition-colors disabled:opacity-50"
              title="Refresh intelligence stream"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-signal-cyan' : ''}`} />
            </button>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardPage
              profile={profile}
              developments={developments}
              briefings={briefings}
              industries={industries}
              isLoading={loading}
              error={error}
              onRetry={loadData}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'radar' && (
            <RadarPage
              developments={developments}
              industries={industries}
              topics={allTopics}
              isLoading={loading}
              error={error}
              onRetry={loadData}
            />
          )}

          {currentTab === 'briefings' && (
            <BriefingsPage
              briefings={briefings}
              developments={developments}
            />
          )}

          {currentTab === 'explore' && (
            <ExplorePage
              industries={industries}
              topics={allTopics}
              profile={profile}
              onToggleTopic={handleToggleTopic}
            />
          )}

          {currentTab === 'profile' && (
            <ProfilePage
              profile={profile}
              industries={industries}
              topics={allTopics}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
