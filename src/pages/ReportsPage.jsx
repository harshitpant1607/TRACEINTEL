import React, { useState } from 'react';
import { FileText, Plus, Download, Printer, Share2, CheckCircle2, ShieldAlert } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import GenerateReportModal from '../components/modals/GenerateReportModal';
import { useApp } from '../context/AppContext';
import { shortenAddress } from '../utils/helpers';

export default function ReportsPage() {
  const { reports, addToast } = useApp();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleDownloadReport = (rep) => {
    addToast(`Evidentiary report text package downloaded for ${rep.id}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-primary" />
            <span>Investigation Reports Archive</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Generated investigation summaries for demonstration and analyst review.</p>
        </div>

        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Investigation Report</span>
        </button>
      </div>

      {/* Reports Table */}
      <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-dark-700 font-mono text-[11px] uppercase text-gray-400 bg-dark-850">
              <th className="p-3">Report ID</th>
              <th className="p-3">Case ID</th>
              <th className="p-3">Title / Document Name</th>
              <th className="p-3">Target Address</th>
              <th className="p-3">Compiled By</th>
              <th className="p-3">Generated Date</th>
              <th className="p-3">Risk Level</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-750 font-sans">
            {reports.map(rep => (
              <tr key={rep.id} className="hover:bg-dark-750/60 transition">
                <td className="p-3 font-mono font-bold text-cyan-400">{rep.id}</td>
                <td className="p-3 font-mono font-bold text-gray-300">{rep.caseId}</td>
                <td className="p-3 font-bold text-gray-100">{rep.title}</td>
                <td className="p-3 font-mono text-gray-300 select-all">{shortenAddress(rep.targetWallet)}</td>
                <td className="p-3 font-mono text-gray-400 text-[11px]">{rep.generatedBy}</td>
                <td className="p-3 font-mono text-gray-400 text-[11px]">{rep.generatedDate}</td>
                <td className="p-3">
                  <RiskBadge level={rep.riskLevel} size="sm" />
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      className="px-2.5 py-1 rounded bg-dark-750 hover:bg-dark-700 text-gray-200 font-medium transition flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleDownloadReport(rep)}
                      className="px-2.5 py-1 rounded bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold transition flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <GenerateReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
