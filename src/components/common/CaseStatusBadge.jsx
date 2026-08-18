import React from 'react';

export default function CaseStatusBadge({ status }) {
  const normalized = (status || '').toLowerCase();
  
  let styles = 'bg-gray-800 text-gray-300 border-gray-700';
  
  if (normalized.includes('critical') || normalized.includes('open')) {
    styles = 'bg-red-500/10 text-red-400 border-red-500/30';
  } else if (normalized.includes('review') || normalized.includes('escalated')) {
    styles = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  } else if (normalized.includes('closed') || normalized.includes('resolved') || normalized.includes('cleared')) {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
}
