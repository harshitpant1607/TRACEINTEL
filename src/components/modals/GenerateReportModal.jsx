import React from 'react';
import Modal from '../common/Modal';
import RiskBadge from '../common/RiskBadge';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Share2, Printer, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function GenerateReportModal({ isOpen, onClose, investigation = null }) {
  const { generateReport, addToast } = useApp();

  const invData = investigation || {
    id: 'INV-2026-004',
    targetWallet: '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    title: 'Multi-layer USDT Anonymization & Rapid Drain',
    totalFlow: 184200,
    asset: 'USDT'
  };

  const handleExportPDF = () => {
    generateReport({
      caseId: 'CP-2026-004',
      title: invData.title,
      targetWallet: invData.targetWallet,
      riskLevel: invData.riskLevel
    });
    onClose();
  };

  const handleDownload = () => {
    addToast('Evidentiary data package (.zip) generated for LEA submission', 'success');
  };

  const handleShare = () => {
    addToast('Secure agency preview link copied to clipboard', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Investigation Report Generator & Evidentiary Synthesis"
      subtitle="Comprehensive digital-asset intelligence synthesis compiled for regulatory and judicial filing."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-xs">
        {/* Document Header Metadata */}
        <div className="p-5 rounded-xl bg-dark-900 border border-dark-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                OFFICIAL REPORT
              </span>
              <RiskBadge score={invData.riskScore} level={invData.riskLevel} />
            </div>
            <h2 className="text-base font-bold text-gray-100">{invData.title}</h2>
            <p className="font-mono text-xs text-gray-400 mt-1">Target Address: <span className="text-cyan-400">{invData.targetWallet}</span></p>
          </div>

          <div className="text-right font-mono text-[11px] text-gray-400 border-l border-dark-750 pl-4">
            <p>Case Reference: <span className="text-gray-200 font-semibold">{invData.id}</span></p>
            <p>Monitored Flow: <span className="text-emerald-400 font-semibold">${invData.totalFlow?.toLocaleString()} {invData.asset}</span></p>
            <p>Compiled Date: <span className="text-gray-200">{new Date().toLocaleDateString()}</span></p>
          </div>
        </div>

        {/* Report Preview Canvas */}
        <div className="p-6 rounded-xl bg-dark-850 border border-dark-700 space-y-5 text-gray-300 leading-relaxed font-sans shadow-inner">
          {/* Section 1: Executive Summary */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" /> 1. Executive Summary
            </h3>
            <p className="bg-dark-900/60 p-3 rounded-lg border border-dark-750 text-xs">
              Automated TRACEINTEL threat detection triggers flagged suspicious high-volume digital asset movements associated with target wallet 
              <span className="font-mono text-cyan-300 mx-1">{invData.targetWallet}</span>. 
              The address executed 7 intermediary transfer hops totaling $184,200 USDT within 36 minutes, terminating at a known sanctioned mixer portal.
            </p>
          </div>

          {/* Section 2: Risk Profile & Factors */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" /> 2. Key Risk Indicators & Threat Factors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded bg-dark-900 border border-dark-750 text-xs">
                <span className="font-semibold text-red-400 block mb-0.5">• Rapid Velocity Fund Drain</span>
                <span className="text-gray-400 text-[11px]">Inter-transfer latency calculated at under 5 minutes per hop.</span>
              </div>
              <div className="p-2.5 rounded bg-dark-900 border border-dark-750 text-xs">
                <span className="font-semibold text-orange-400 block mb-0.5">• Sanctioned Counterparty Exposure</span>
                <span className="text-gray-400 text-[11px]">Direct transfer into CryptoClean Mixer contract address.</span>
              </div>
              <div className="p-2.5 rounded bg-dark-900 border border-dark-750 text-xs">
                <span className="font-semibold text-amber-400 block mb-0.5">• Sub-Threshold Structuring</span>
                <span className="text-gray-400 text-[11px]">Transfers divided into round $92,000 tranches to evade VASP AML rules.</span>
              </div>
              <div className="p-2.5 rounded bg-dark-900 border border-dark-750 text-xs">
                <span className="font-semibold text-indigo-400 block mb-0.5">• Cross-Asset Layering</span>
                <span className="text-gray-400 text-[11px]">Partial conversion of stablecoins to ETH on decentralized protocols.</span>
              </div>
            </div>
          </div>

          {/* Section 3: Recommended Actions */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" /> 3. Recommended Enforcement Actions
            </h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Issue urgent administrative freeze order request to Nova Exchange VASP compliance portal.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Broadcast cluster blacklist indicators across FinCEN and partner intelligence networks.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dark-700">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 border border-dark-600 font-medium"
            >
              <Download className="w-3.5 h-3.5 text-gray-400" />
              <span>Download Raw Data (.json)</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 border border-dark-600 font-medium"
            >
              <Share2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Share Agency Link</span>
            </button>
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold shadow-lg shadow-cyan-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Export Official PDF Report</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
