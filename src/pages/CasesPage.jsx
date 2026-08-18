import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Plus, Search, Eye, ArrowRight, User } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import CaseStatusBadge from '../components/common/CaseStatusBadge';
import CreateCaseModal from '../components/modals/CreateCaseModal';
import { useApp } from '../context/AppContext';
import { shortenAddress } from '../utils/helpers';

export default function CasesPage() {
  const { cases } = useApp();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-brand-primary" />
            <span>Law Enforcement Case Files</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Official evidentiary case tracking, target assignments, and taskforce operations.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Establish New Case</span>
        </button>
      </div>

      {/* Cases Table */}
      <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-dark-700 font-mono text-[11px] uppercase text-gray-400 bg-dark-850">
              <th className="p-3">Case Reference</th>
              <th className="p-3">Operation Title</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Target Address</th>
              <th className="p-3">Risk Assessment</th>
              <th className="p-3">Assigned Lead</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-750 font-sans">
            {cases.map(c => (
              <tr key={c.id} className="hover:bg-dark-750/60 transition">
                <td className="p-3 font-mono font-bold text-cyan-400">{c.id}</td>
                <td className="p-3 font-bold text-gray-100">{c.name}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                    c.priority === 'Critical' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400'
                  }`}>
                    {c.priority}
                  </span>
                </td>
                <td className="p-3 font-mono text-gray-300 select-all">{shortenAddress(c.targetWallet)}</td>
                <td className="p-3">
                  <RiskBadge score={c.riskScore} size="sm" />
                </td>
                <td className="p-3 font-mono text-gray-400 text-[11px]">{c.assignedAnalyst}</td>
                <td className="p-3">
                  <CaseStatusBadge status={c.status} />
                </td>
                <td className="p-3 text-gray-400 font-mono text-[11px]">{c.createdDate}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => navigate(`/investigations/INV-2026-004`)}
                    className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold transition inline-flex items-center gap-1"
                  >
                    <span>Open Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
