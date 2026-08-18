import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, subtitle, highlight = false, color = 'cyan' }) {
  const colorMap = {
    cyan: 'border-cyan-500/20 text-cyan-400 bg-cyan-500/10',
    red: 'border-red-500/30 text-red-400 bg-red-500/10',
    amber: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    purple: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  };

  const selectedColor = colorMap[color] || colorMap.cyan;

  return (
    <div className={`p-5 rounded-xl bg-dark-800 border ${highlight ? 'border-red-500/40 bg-red-950/20' : 'border-dark-700'} shadow-lg hover:border-dark-600 transition-all`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${selectedColor}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold font-mono text-gray-100">{value}</span>
        {trendValue && (
          <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-red-400' : trend === 'down' ? 'text-emerald-400' : 'text-gray-400'}`}>
            {trend === 'up' && <TrendingUp className="w-3.5 h-3.5 mr-1" />}
            {trend === 'down' && <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5 mr-1" />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-gray-400 truncate">{subtitle}</p>
      )}
    </div>
  );
}
