import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, Layers, Briefcase, ArrowRight, ShieldAlert, Wallet, Eye } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';
import { shortenAddress } from '../../utils/helpers';

export default function NodeDetailPanel({ node, onClose, onOpenCreateCase }) {
  const navigate = useNavigate();

  if (!node) return null;

  return (
    <div className="w-80 bg-dark-850 border border-dark-700 rounded-xl p-5 shadow-2xl flex flex-col justify-between animate-fadeIn">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-brand-primary" />
            <h4 className="text-sm font-bold text-gray-100">Node Intelligence</h4>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded hover:bg-dark-750"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Node Risk Overview */}
        <div className="my-4 p-3 rounded-lg bg-dark-900 border border-dark-750">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-gray-400">Threat Level</span>
            <RiskBadge score={node.riskScore} level={node.level} />
          </div>
          <h3 className="mt-2 text-sm font-bold text-gray-100 truncate">{node.label}</h3>
          <p className="font-mono text-xs text-cyan-400 mt-0.5 select-all">{node.address}</p>
        </div>

        {/* Detailed Stats Grid */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-dark-750">
            <span className="text-gray-400">Entity Type</span>
            <span className="font-semibold text-gray-200">{node.type}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-dark-750">
            <span className="text-gray-400">Total Inflow</span>
            <span className="font-mono font-semibold text-emerald-400">{node.inflow || '$0'}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-dark-750">
            <span className="text-gray-400">Total Outflow</span>
            <span className="font-mono font-semibold text-red-400">{node.outflow || '$0'}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-dark-750">
            <span className="text-gray-400">Transaction Count</span>
            <span className="font-mono font-semibold text-gray-200">{node.txs || 0}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-dark-700 space-y-2">
        <button
          onClick={() => navigate(`/investigations/INV-2026-004`)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-md transition"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Investigation INV-2026-004</span>
        </button>

        <button
          onClick={() => navigate(`/wallet-intelligence?address=${node.address}`)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 font-medium text-xs border border-dark-600 transition"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Open Wallet Profile</span>
        </button>

        <button
          onClick={() => navigate(`/transaction-monitor?wallet=${node.address}`)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 font-medium text-xs border border-dark-600 transition"
        >
          <Layers className="w-3.5 h-3.5 text-gray-400" />
          <span>View Node Transactions</span>
        </button>

        <button
          onClick={() => onOpenCreateCase(node)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-xs border border-red-800/60 transition"
        >
          <Briefcase className="w-3.5 h-3.5 text-red-400" />
          <span>Create Case</span>
        </button>
      </div>
    </div>
  );
}
