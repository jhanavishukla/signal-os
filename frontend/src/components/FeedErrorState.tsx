import React from 'react';
import { AlertCircle, RefreshCw, WifiOff } from 'lucide-react';

interface FeedErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void;
  isRetrying?: boolean;
}

export const FeedErrorState: React.FC<FeedErrorStateProps> = ({
  title = "Unable to load intelligence stream",
  message = "A connectivity or service error occurred while retrieving real-time signals. Your tracked topics remain preserved.",
  onRetry,
  isRetrying = false
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 rounded-2xl border border-rose-500/20 bg-rose-950/10 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="h-14 w-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400 shadow-lg shadow-rose-950/30">
        <WifiOff className="h-7 w-7" />
      </div>

      <h3 className="text-base font-bold text-slate-100 mb-1.5 tracking-tight">
        {title}
      </h3>

      <p className="text-xs text-slate-300/80 max-w-md leading-relaxed mb-6">
        {message}
      </p>

      <button
        onClick={onRetry}
        disabled={isRetrying}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-signal-indigo hover:bg-signal-indigo/90 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
        <span>{isRetrying ? 'Retrying Connection...' : 'Retry Fetching Updates'}</span>
      </button>
    </div>
  );
};
