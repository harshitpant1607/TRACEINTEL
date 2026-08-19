import React from 'react';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function RiskBreakdown({ analysis }) {
  if (!analysis || !analysis.breakdown) return null;

  return (
    <div className="p-4 rounded-xl bg-dark-900 border border-dark-750 space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-dark-750 pb-2.5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
            Explainable Heuristic Risk Engine
          </span>
          <h4 className="text-xs font-bold text-gray-200">Behavioral Indicator Breakdown</h4>
        </div>
        <RiskBadge score={analysis.score} level={analysis.level} size="md" />
      </div>

      <div className="space-y-2 text-xs">
        {analysis.breakdown.map((item, idx) => (
          <div 
            key={idx}
            className={`flex items-center justify-between p-2 rounded border transition ${
              item.triggered 
                ? 'bg-red-950/30 border-red-500/30 text-red-200' 
                : 'bg-dark-850 border-dark-750 text-gray-400 opacity-60'
            }`}
          >
            <div className="flex items-center gap-2">
              {item.triggered ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              )}
              <div>
                <span className="font-semibold text-gray-200 block leading-tight">{item.label}</span>
                <span className="text-[10px] text-gray-400 block">{item.description}</span>
              </div>
            </div>

            <span className={`font-mono font-bold text-xs ${item.triggered ? 'text-red-400' : 'text-gray-500'}`}>
              {item.triggered ? `+${item.points}` : '+0'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-dark-750 font-mono text-xs">
        <span className="text-gray-400">Total Calculated Risk Score</span>
        <span className="text-red-400 font-bold text-sm">{analysis.score} / 100 ({analysis.level})</span>
      </div>
    </div>
  );
}
