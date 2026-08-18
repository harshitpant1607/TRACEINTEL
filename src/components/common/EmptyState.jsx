import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function EmptyState({ title = "No Results Found", description = "Try adjusting your query or filter parameters.", icon: Icon = ShieldAlert, actionButton }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-dark-800/50 border border-dark-700/60 rounded-xl">
      <div className="p-4 rounded-full bg-dark-750 text-gray-400 mb-3 border border-dark-700">
        <Icon className="w-8 h-8 stroke-1 text-cyan-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-200">{title}</h3>
      <p className="text-xs text-gray-400 mt-1 max-w-md">{description}</p>
      {actionButton && <div className="mt-4">{actionButton}</div>}
    </div>
  );
}
