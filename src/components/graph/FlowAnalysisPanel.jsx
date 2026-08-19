import React from 'react';
import { Activity, Clock, ShieldAlert, Layers, DollarSign } from 'lucide-react';

export default function FlowAnalysisPanel() {
  return (
    <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-3 font-sans">
      <div className="flex items-center justify-between border-b border-dark-750 pb-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-primary" />
          <span>Graph Flow Analysis Summary</span>
        </h3>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
          HIGH LAYERING PATTERN
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
        <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
          <span className="text-[10px] text-gray-400 block">Total Monitored Flow</span>
          <span className="text-sm font-bold text-emerald-400">$184,200 USDT</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
          <span className="text-[10px] text-gray-400 block">Observed Hops</span>
          <span className="text-sm font-bold text-gray-200">5 Intermediaries</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
          <span className="text-[10px] text-gray-400 block">Fastest Hop Latency</span>
          <span className="text-sm font-bold text-amber-400">4m 12s</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
          <span className="text-[10px] text-gray-400 block">Largest Single Transfer</span>
          <span className="text-sm font-bold text-emerald-400">$91,500 USDT</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
          <span className="text-[10px] text-gray-400 block">Highest Risk Hop</span>
          <span className="text-sm font-bold text-red-400">94 / 100</span>
        </div>

        <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
          <span className="text-[10px] text-gray-400 block">Layering Risk Assessment</span>
          <span className="text-sm font-bold text-red-400">CRITICAL / HIGH</span>
        </div>
      </div>
    </div>
  );
}
