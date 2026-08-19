import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import RiskBadge from '../common/RiskBadge';
import CaseStatusBadge from '../common/CaseStatusBadge';
import { useApp } from '../../context/AppContext';
import { shortenAddress } from '../../utils/helpers';
import { Briefcase, ExternalLink, Network, FileText, ArrowRight, User, ShieldAlert } from 'lucide-react';

export default function CaseDetailModal({ caseData, isOpen, onClose }) {
  const { updateCaseStatus } = useApp();
  const navigate = useNavigate();

  if (!caseData) return null;

  const handleStatusChange = (e) => {
    updateCaseStatus(caseData.id, e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Case File: ${caseData.id}`}
      subtitle={caseData.name}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 text-xs">
        {/* Header Overview */}
        <div className="p-4 rounded-xl bg-dark-900 border border-dark-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 text-[10px]">
                PRIORITY: {caseData.priority?.toUpperCase()}
              </span>
              <RiskBadge score={caseData.riskScore} size="sm" />
            </div>
            <h3 className="text-base font-bold text-gray-100">{caseData.name}</h3>
            <p className="font-mono text-xs text-gray-400 mt-0.5">
              Target Suspect Address: <span className="text-cyan-400 select-all">{caseData.targetWallet}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <label className="text-gray-400 text-[11px] font-mono">Status:</label>
            <select
              value={caseData.status || 'Open'}
              onChange={handleStatusChange}
              className="bg-dark-850 border border-dark-700 rounded px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-brand-primary font-semibold"
            >
              <option value="Open">Open</option>
              <option value="Under Review">Under Review</option>
              <option value="Escalated">Escalated</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-dark-850 border border-dark-750 font-mono">
          <div>
            <span className="text-[10px] text-gray-400 block">Assigned Lead Analyst</span>
            <span className="text-gray-200 font-semibold">{caseData.assignedAnalyst || 'Inv. Sarah Vance'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Created Date</span>
            <span className="text-gray-200 font-semibold">{caseData.createdDate}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Related Investigation</span>
            <span className="text-cyan-400 font-bold">{caseData.investigationId || 'INV-2026-004'}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold text-gray-300 mb-1">Case Description & Objectives</h4>
          <p className="p-3 rounded-lg bg-dark-900 border border-dark-750 text-gray-300 leading-relaxed">
            {caseData.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dark-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                navigate(`/wallet-intelligence?address=${caseData.targetWallet}`);
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 border border-dark-600 font-medium"
            >
              <span>View Wallet</span>
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/transaction-network');
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 border border-dark-600 font-medium"
            >
              <Network className="w-3.5 h-3.5 text-amber-400" />
              <span>View Graph Network</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              navigate(`/investigations/${caseData.investigationId || 'INV-2026-004'}`);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold shadow-md transition"
          >
            <span>Open Related Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
