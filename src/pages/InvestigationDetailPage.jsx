import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Network, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquarePlus, 
  Clock, 
  ArrowRight, 
  ExternalLink,
  Layers,
  ShieldCheck,
  User,
  ArrowLeft
} from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import CaseStatusBadge from '../components/common/CaseStatusBadge';
import CreateCaseModal from '../components/modals/CreateCaseModal';
import AddNoteModal from '../components/modals/AddNoteModal';
import GenerateReportModal from '../components/modals/GenerateReportModal';
import { useApp } from '../context/AppContext';
import { formatCurrency, shortenAddress } from '../utils/helpers';

export default function InvestigationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { investigations, updateInvestigationStatus, addToast } = useApp();

  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Find target investigation or default to INV-2026-004
  const inv = investigations.find(i => i.id === (id || 'INV-2026-004')) || investigations[0];

  const handleMarkReviewed = () => {
    updateInvestigationStatus(inv.id, 'Under Review');
    addToast(`Investigation ${inv.id} marked as Analyst Reviewed`, 'success');
  };

  const handleEscalate = () => {
    updateInvestigationStatus(inv.id, 'Escalated');
    addToast(`Investigation ${inv.id} escalated to Federal Law Enforcement Taskforce`, 'warning');
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/investigations')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace Cases</span>
        </button>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleMarkReviewed}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs font-semibold text-gray-200 transition"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Mark Reviewed</span>
          </button>
          <button
            onClick={handleEscalate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-800/60 text-xs font-semibold text-amber-300 transition"
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Escalate Case</span>
          </button>
          <button
            onClick={() => setIsNoteModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 border border-dark-700 text-xs font-semibold text-gray-200 transition"
          >
            <MessageSquarePlus className="w-4 h-4 text-brand-primary" />
            <span>Add Note</span>
          </button>
          <button
            onClick={() => setIsCaseModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-xs font-semibold text-red-300 transition"
          >
            <Briefcase className="w-4 h-4 text-red-400" />
            <span>Establish Case</span>
          </button>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Primary Dossier Header Banner */}
      <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700 pb-4">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-black text-gray-100 font-mono">Investigation: {inv.id}</h1>
              <RiskBadge score={inv.riskScore} level={inv.riskLevel} size="lg" />
              <CaseStatusBadge status={inv.status} />
            </div>
            <p className="mt-1 text-sm font-bold text-gray-200">{inv.title}</p>
          </div>

          <div className="text-right font-mono text-xs">
            <span className="text-gray-400 block">Lead Investigator</span>
            <span className="text-cyan-400 font-semibold">{inv.assignedAnalyst || 'Inv. Sarah Vance (INV-2047)'}</span>
          </div>
        </div>

        {/* Target Address Quick Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-dark-900 border border-dark-750 font-mono text-xs">
          <div>
            <span className="text-gray-400 text-[11px] block">Target Suspect Address</span>
            <span className="text-cyan-400 font-bold text-sm select-all">{inv.targetWallet}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/wallet-intelligence?address=${inv.targetWallet}`)}
              className="flex items-center gap-1 text-xs text-brand-primary hover:underline"
            >
              <span>Wallet Intelligence</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate(`/transaction-network`)}
              className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
            >
              <span>Graph Network</span>
              <Network className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout of Investigation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Summary, Indicators, Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Summary */}
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-2">
            <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-primary" />
              <span>1. Investigation Threat Summary</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed bg-dark-850 p-4 rounded-lg border border-dark-750">
              {inv.summary || 'Automated intelligence rules flagged wallet 0x71C8...A92F executing rapid high-volume USDT transfers through 7 intermediary hop addresses within 36 minutes, terminating at a known sanctioned mixer portal.'}
            </p>
          </div>

          {/* Section 2: Risk Indicators */}
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>2. Risk Indicators & Behavioral Anomalies</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(inv.riskIndicators || [
                'Rapid fund movement (< 5 min latency between hops)',
                'Multi-hop layering pattern across 7 accounts',
                'High-risk counterparty exposure (CryptoClean Mixer)',
                'Newly created destination wallets (< 7 days old)',
                'Sub-threshold structured amounts ($92,000 splits)',
                'Cross-asset conversion attempt (ETH/USDT)'
              ]).map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-xs text-red-300">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Interactive Timeline */}
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>3. Chronological Attack Vector Timeline</span>
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-dark-700">
              {(inv.timeline || [
                { time: '09:42', title: 'Initial Deposit Detected', desc: '300,000 USDT withdrawn from Nova Exchange Proxy 0x9E21...E21A.' },
                { time: '09:47', title: 'Funds Transferred to Intermediary', desc: '250,000 USDT routed through buffer wallet 0x82FA...B10C.' },
                { time: '09:52', title: 'Funds Split Across 3 Wallets', desc: 'Transfers split into $184.2K, $35.8K, and $30K tranches.' },
                { time: '10:03', title: 'Assets Converted', desc: 'Partial USDT swapped for WETH via decentralized protocol.' },
                { time: '10:11', title: 'Funds Moved to High-Risk Destination', desc: '$92,000 USDT deposited into CryptoClean Mixer portal.' },
                { time: '10:18', title: 'Critical Alert Escalated', desc: 'TRACEINTEL Risk Engine trigger rule #804 fired; case auto-generated.' }
              ]).map((step, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-brand-primary ring-4 ring-dark-800" />
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-brand-primary">{step.time}</span>
                    <h4 className="text-xs font-bold text-gray-200">{step.title}</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Analyst Notes & Actions */}
        <div className="space-y-6">
          {/* Section 7: Analyst Audit Trail Notes */}
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
                <span>Analyst Audit Trail</span>
              </h3>
              <button
                onClick={() => setIsNoteModalOpen(true)}
                className="text-xs text-brand-primary hover:underline font-semibold"
              >
                + Add Note
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {(inv.analystNotes || [
                { date: '2026-08-18 10:22', author: 'Inv. Sarah Vance', text: 'Initiated freeze request query with VASP compliance liaison for Nova Exchange proxy address.' },
                { date: '2026-08-18 10:45', author: 'Inv. Mark Sterling', text: 'Graph analysis confirms 0x71C8 is part of Cluster CL-9021 linked to Eastern Europe cybercrime syndicate.' }
              ]).map((note, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-dark-850 border border-dark-750 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span className="text-cyan-400 font-semibold">{note.author}</span>
                    <span>{note.date}</span>
                  </div>
                  <p className="text-gray-300 leading-normal">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Recommended Actions Checklist */}
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recommended Enforcement Protocol</span>
            </h3>

            <div className="space-y-2">
              {(inv.recommendedActions || [
                'Issue emergency freeze order request to Nova Exchange VASP compliance portal.',
                'Submit blockchain cluster tag update to international law enforcement shared database.',
                'Generate full evidentiary PDF report for FinCEN SAR filing.'
              ]).map((action, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-dark-850 border border-dark-750 text-xs text-gray-300">
                  <input type="checkbox" defaultChecked={idx === 0} className="mt-0.5 rounded border-dark-600 bg-dark-900 text-brand-primary" />
                  <span>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        initialWallet={inv.targetWallet}
      />
      <AddNoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        investigationId={inv.id}
      />
      <GenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        investigation={inv}
      />
    </div>
  );
}
