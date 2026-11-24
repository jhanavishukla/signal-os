import React, { useState } from 'react';
import { 
  User, 
  Sliders, 
  Target, 
  Bell, 
  Save, 
  CheckCircle2, 
  ShieldCheck,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { UserProfile, Industry, Topic } from '../types';

interface ProfilePageProps {
  profile: UserProfile;
  industries: Industry[];
  topics: Topic[];
  onUpdateProfile: (updated: Partial<UserProfile>) => Promise<void>;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  industries,
  topics,
  onUpdateProfile
}) => {
  const [fullName, setFullName] = useState(profile.full_name);
  const [roleTitle, setRoleTitle] = useState(profile.role_title);
  const [expertiseLevel, setExpertiseLevel] = useState(profile.expertise_level);
  const [learningGoals, setLearningGoals] = useState(profile.learning_goals);
  const [briefingFrequency, setBriefingFrequency] = useState(profile.briefing_frequency);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onUpdateProfile({
        full_name: fullName,
        role_title: roleTitle,
        expertise_level: expertiseLevel,
        learning_goals: learningGoals,
        briefing_frequency: briefingFrequency
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-border-subtle pb-6">
        <div className="flex items-center gap-2 mb-1">
          <User className="h-5 w-5 text-signal-cyan" />
          <h1 className="text-2xl font-bold tracking-tight text-white">Profile & AI Alignment</h1>
        </div>
        <p className="text-sm text-slate-400">
          SignalOS uses your professional context and goals to tune relevance scoring and filter out noise.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-6 space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Briefcase className="h-4 w-4 text-signal-indigo" />
            <span>Identity & Professional Context</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle border border-border-subtle text-sm text-slate-200 focus:outline-none focus:border-signal-cyan"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle border border-border-subtle text-sm text-slate-200 focus:outline-none focus:border-signal-cyan"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Account Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle/50 border border-border-subtle/50 text-sm text-slate-400 cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-400 mt-1">Managed by organization identity protocol.</p>
          </div>
        </div>

        {/* Intelligence Tuning Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-6 space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Sliders className="h-4 w-4 text-signal-cyan" />
            <span>Synthesis Parameters & Goals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Technical Expertise Level
              </label>
              <select
                value={expertiseLevel}
                onChange={(e) => setExpertiseLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle border border-border-subtle text-sm text-slate-200 focus:outline-none focus:border-signal-cyan"
              >
                <option value="intermediate">Intermediate (Broad industry fluency)</option>
                <option value="advanced">Advanced (Deep technical architectures & research)</option>
                <option value="executive">Executive (Strategic macro trends & business implications)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Controls the depth of technical summaries vs strategic implications.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Briefing Frequency
              </label>
              <select
                value={briefingFrequency}
                onChange={(e) => setBriefingFrequency(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle border border-border-subtle text-sm text-slate-200 focus:outline-none focus:border-signal-cyan"
              >
                <option value="daily">Daily Executive Briefing (Delivered 07:00 AM)</option>
                <option value="weekly">Weekly Strategic Synthesis (Delivered Monday)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">
                Cadence of proactive LLM synthesis reports.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Personal Learning & Strategic Career Goals
            </label>
            <textarea
              rows={3}
              value={learningGoals}
              onChange={(e) => setLearningGoals(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-surface-subtle border border-border-subtle text-sm text-slate-200 focus:outline-none focus:border-signal-cyan leading-relaxed"
              placeholder="e.g. Master multi-agent protocols, track competitive moves in GPU acceleration..."
            />
            <p className="text-[11px] text-slate-400 mt-1">
              The LLM uses these goals to evaluate the "Why this matters to you" section for each discovery.
            </p>
          </div>
        </div>

        {/* Current Subscriptions Overview Card */}
        <div className="rounded-2xl border border-border-subtle bg-surface-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <Target className="h-4 w-4 text-emerald-400" />
              <span>Active Signal Subscriptions</span>
            </div>
            <span className="text-xs text-signal-cyan font-mono">{profile.followed_topics.length} Tracked</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {profile.followed_topics.map(t => (
              <span 
                key={t.id} 
                className="px-3 py-1.5 rounded-lg bg-surface-subtle text-xs font-medium text-slate-200 border border-border-subtle flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan"></span>
                <span>{t.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          {saveSuccess ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Alignment parameters updated successfully!</span>
            </div>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-signal-indigo hover:bg-signal-indigo/90 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Save className="h-4 w-4" />
            <span>{isSaving ? "Saving Settings..." : "Save Preferences"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
