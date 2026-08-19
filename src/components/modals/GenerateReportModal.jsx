import React from 'react';
import Modal from '../common/Modal';
import RiskBadge from '../common/RiskBadge';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Printer, CheckCircle2, Info } from 'lucide-react';

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

  const handlePrintPDF = () => {
    generateReport({
      caseId: 'CP-2026-004',
      title: invData.title,
      targetWallet: invData.targetWallet,
      riskLevel: invData.riskLevel
    });
    window.print();
    onClose();
  };

  const handleDownloadTextReport = () => {
    const reportText = `TRACEINTEL INVESTIGATION REPORT
====================================
Synthetic Demonstration Data
Case Reference: ${invData.id}
Target Wallet: ${invData.targetWallet}
Risk Score: ${invData.riskScore}/100 (${invData.riskLevel})
Total Monitored Flow: $${invData.totalFlow?.toLocaleString()} ${invData.asset}

1. EXECUTIVE SUMMARY
${invData.title}
Automated TRACEINTEL threat detection triggers flagged suspicious high-volume transfers terminating at ShadowRoute Mixer portal.

2. KEY RISK INDICATORS
- Rapid velocity fund movement (< 5 min latency between hops)
- Multi-hop layering pattern across 5 accounts
- High-risk counterparty exposure (ShadowRoute Mixer)
- Structuring sub-threshold deposit splits

3. RECOMMENDED ACTIONS
- Issue asset-preservation review to Nova Exchange VASP compliance portal.
- Submit cluster tag update to cross-entity intelligence reference database.

Generated: ${new Date().toLocaleString()}
TRACEINTEL Phase-1 Hackathon Prototype
`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TRACEINTEL_${invData.id}_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast(`Demo report text package downloaded for ${invData.id}`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="TRACEINTEL INVESTIGATION REPORT"
      subtitle="Generated investigation summary for demonstration and analyst review."
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-xs">
        {/* Synthetic Disclaimer Header Banner */}
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-300">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="font-mono font-semibold">Synthetic Demonstration Report • Analyst Review Copy</span>
          </div>
          <RiskBadge score={invData.riskScore} level={invData.riskLevel} />
        </div>

        {/* Report Content Box */}
        <div className="p-6 rounded-xl bg-dark-850 border border-dark-700 space-y-5 text-gray-300 leading-relaxed font-sans shadow-inner">
          <div className="border-b border-dark-750 pb-3">
            <h2 className="text-base font-bold text-gray-100">{invData.title}</h2>
            <div className="flex items-center gap-4 mt-2 font-mono text-[11px] text-gray-400">
              <span>Case Ref: <strong className="text-gray-200">{invData.id}</strong></span>
              <span>Target: <strong className="text-cyan-400">{invData.targetWallet}</strong></span>
              <span>Monitored Flow: <strong className="text-emerald-400">${invData.totalFlow?.toLocaleString()} {invData.asset}</strong></span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
              1. Executive Threat Summary
            </h3>
            <p className="bg-dark-900/60 p-3 rounded-lg border border-dark-750 text-xs">
              Automated TRACEINTEL threat detection triggers flagged suspicious high-volume digital asset movements associated with target wallet 
              <span className="font-mono text-cyan-300 mx-1">{invData.targetWallet}</span>. 
              The address executed 5 intermediary transfer hops totaling $184,200 USDT within 36 minutes, terminating at ShadowRoute Mixer portal.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
              2. Key Risk Indicators & Threat Factors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans">
              <div className="p-2.5 rounded bg-dark-900 border border-dark-750">
                <span className="font-semibold text-red-400 block mb-0.5">• Rapid Velocity Fund Drain</span>
                <span className="text-gray-400 text-[11px]">Inter-transfer latency calculated at under 5 minutes per hop.</span>
              </div>
              <div className="p-2.5 rounded bg-dark-900 border border-dark-750">
                <span className="font-semibold text-orange-400 block mb-0.5">• Sanctioned Counterparty Exposure</span>
                <span className="text-gray-400 text-[11px]">Direct transfer into ShadowRoute Mixer contract address.</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-1">
              3. Recommended Enforcement Protocol
            </h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Issue recommended asset-preservation review to Nova Exchange VASP compliance portal.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Broadcast cluster blacklist indicators across cross-entity intelligence reference network.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Honest Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dark-700">
          <button
            type="button"
            onClick={handleDownloadTextReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 border border-dark-600 font-medium text-xs"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span>Download Demo Report (.txt)</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-dark-750 text-gray-300 hover:bg-dark-700 text-xs font-medium"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handlePrintPDF}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
