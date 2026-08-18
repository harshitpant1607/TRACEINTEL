import React from 'react';
import { getRiskColorClass, getRiskLevel } from '../../utils/helpers';

export default function RiskBadge({ score, level, showScore = true, size = 'md' }) {
  const currentLevel = level || getRiskLevel(score || 0);
  const color = getRiskColorClass(score || (currentLevel === 'CRITICAL' ? 90 : currentLevel === 'HIGH' ? 70 : currentLevel === 'MEDIUM' ? 45 : 15));

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-mono',
    md: 'px-2.5 py-1 text-xs font-mono font-medium',
    lg: 'px-3.5 py-1.5 text-sm font-mono font-semibold'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border ${color.badge} ${sizeClasses[size]} shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${color.dot} animate-pulse-subtle`} />
      <span>{currentLevel}</span>
      {showScore && score !== undefined && (
        <span className="opacity-75 text-[11px] border-l border-current/30 pl-1.5 ml-0.5">
          {score}/100
        </span>
      )}
    </span>
  );
}
