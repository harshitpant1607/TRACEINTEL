import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import RiskBadge from '../common/RiskBadge';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatTimestamp, shortenAddress } from '../../utils/helpers';
import { ArrowRight, ExternalLink, ShieldAlert, Network, Briefcase, Flag } from 'lucide-react';

export default function TransactionDetailModal({ tx, isOpen, onClose, onOpenCreateCase }) {
  const { addToast } = useApp();
  const navigate = useNavigate();

  if (!tx) return null;

  const handleFlagTransaction = () => {
    addToast(`Transaction ${tx.hash.substring(0, 10)}... flagged for compliance escalation`, 'warning');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Intelligence Detail"
      subtitle={`Blockchain Hash: ${tx.hash}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-5 text-xs">
        {/* Risk & Value Overview Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-dark-900 border border-dark-700">
          <div>
            <span className="text-[11px] font-mono text-gray-400">Transfer Value</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-gray-100">{tx.amount} {tx.asset}</span>
              <span className="text-sm font-mono text-emerald-400">({formatCurrency(tx.usdValue)})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RiskBadge score={tx.riskScore} level={tx.riskLevel} size="lg" />
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-red-950/80 text-red-400 border border-red-800/60">
              {tx.status || 'Flagged'}
            </span>
          </div>
        </div>

        {/* Sender & Receiver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-dark-850 border border-dark-700 space-y-2">
            <span className="text-[10px] font-mono font-semibold uppercase text-gray-400">Origin / Sender</span>
            <p className="font-mono text-xs text-cyan-400 select-all font-semibold">{tx.from}</p>
            <button
              onClick={() => {
                onClose();
                navigate(`/wallet-intelligence?address=${tx.from}`);
              }}
              className="mt-2 flex items-center gap-1.5 text-xs text-gray-300 hover:text-cyan-400 transition"
            >
              <span>View Sender Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-850 border border-dark-700 space-y-2">
            <span className="text-[10px] font-mono font-semibold uppercase text-gray-400">Destination / Receiver</span>
            <p className="font-mono text-xs text-amber-400 select-all font-semibold">{tx.to}</p>
            <button
              onClick={() => {
                onClose();
                navigate(`/wallet-intelligence?address=${tx.to}`);
              }}
              className="mt-2 flex items-center gap-1.5 text-xs text-gray-300 hover:text-amber-400 transition"
            >
              <span>View Receiver Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Transaction Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-dark-900 border border-dark-750 font-mono">
          <div>
            <span className="text-[10px] text-gray-400 block">Blockchain Network</span>
            <span className="text-gray-200 font-semibold">{tx.network || 'Ethereum Mainnet'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Block Height</span>
            <span className="text-gray-200 font-semibold">{tx.blockNumber || '19842109'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Gas Fee Paid</span>
            <span className="text-gray-200 font-semibold">{tx.gasFee || '0.0042 ETH'}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Timestamp</span>
            <span className="text-gray-200 font-semibold">{tx.timestamp}</span>
          </div>
        </div>

        {/* Risk Trigger Factors */}
        <div>
          <h4 className="text-xs font-semibold text-gray-300 mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Automated Risk Trigger Indicators</span>
          </h4>
          <ul className="space-y-1.5">
            {(tx.riskReasons || [
              'High-risk sender identified in mixer cluster',
              'Rapid velocity fund transfer (< 5 min delay)',
              'Layering fan-out to newly created address'
            ]).map((reason, idx) => (
              <li key={idx} className="flex items-center gap-2 p-2 rounded bg-red-950/20 border border-red-500/20 text-red-300 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-dark-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                navigate(`/transaction-network`);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Trace Flow in Graph</span>
            </button>
            <button
              onClick={handleFlagTransaction}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-amber-400 font-medium border border-dark-600"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>Flag Transaction</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              if (onOpenCreateCase) onOpenCreateCase({ address: tx.from });
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 font-semibold border border-red-800/60"
          >
            <Briefcase className="w-3.5 h-3.5 text-red-400" />
            <span>Add Transaction to Case</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
