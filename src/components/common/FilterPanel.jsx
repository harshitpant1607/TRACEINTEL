import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function FilterPanel({ filters, selectedFilters, onChange, onReset }) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-dark-800 border border-dark-700 rounded-xl mb-4 text-xs">
      <div className="flex items-center gap-1.5 text-gray-400 font-semibold uppercase tracking-wider pr-2 border-r border-dark-700">
        <Filter className="w-3.5 h-3.5 text-brand-primary" />
        <span>Filters</span>
      </div>

      {filters.map(group => (
        <div key={group.key} className="flex items-center gap-1.5">
          <label className="text-gray-400">{group.label}:</label>
          <select
            value={selectedFilters[group.key] || 'ALL'}
            onChange={(e) => onChange(group.key, e.target.value)}
            className="bg-dark-900 border border-dark-700 rounded px-2.5 py-1 text-gray-200 focus:outline-none focus:border-brand-primary font-medium"
          >
            <option value="ALL">All {group.label}s</option>
            {group.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ))}

      {onReset && (
        <button
          onClick={onReset}
          className="ml-auto flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
