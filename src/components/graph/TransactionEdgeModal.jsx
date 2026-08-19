import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import RiskBadge from '../common/RiskBadge';
import { shortenAddress, formatCurrency } from '../../utils/helpers';
import { ArrowRight, Clock, ShieldAlert, Layers } from 'lucide-react';

export default function TransactionEdgeModal({ edge, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!edge) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Graph Transaction Flow Hop Detail"
      subtitle={`Blockchain Hash: ${edge.txHash || '0xa72f9d84c1b9201948571029384756102938475691f3'}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 text-xs">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-dark-900 border border-dark-750 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400">Transfer Hop Volume</span>
            <p className="text-xl font-bold font-mono text-emerald-400">{edge.amount}</p>
          </div>

          <RiskBadge score={edge.riskScore || 85} size="lg" />
        </div>

        {/* Origin -> Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
          <div className="p-3 rounded-lg bg-dark-850 border border-dark-750 space-y-1">
            <span className="text-[10px] text-gray-400 block">Sender Node</span>
            <p className="text-cyan-400 font-semibold">{shortenAddress(edge.fromAddress || '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F')}</p>
          </div>
          <div className="p-3 rounded-lg bg-dark-850 border border-dark-750 space-y-1">
            <span className="text-[10px] text-gray-400 block">Receiver Node</span>
            <p className="text-amber-400 font-semibold">{shortenAddress(edge.toAddress || '0x4B91E72D88C3A410928371F029C8B201A9E7E72D')}</p>
          </div>
        </div>

        {/* Hop Latency & Telemetry */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-dark-900 border border-dark-750 font-mono">
          <div>
            <span className="text-[10px] text-gray-400 block">Inter-Hop Latency</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{edge.time || '4m 12s'}</span>
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block">Asset Type</span>
            <span className="text-gray-200 font-semibold">{edge.asset || 'USDT'}</span>
          </div>
        </div>

        {/* Risk Trigger Indicators */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Hop Telemetry Indicators</span>
          </h4>
          <ul className="space-y-1 text-gray-300">
            <li className="p-2 rounded bg-red-950/20 border border-red-500/20 text-red-300 text-[11px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>High-velocity transfer hop executed within 5 minutes of deposit</span>
            </li>
            <li className="p-2 rounded bg-red-950/20 border border-red-500/20 text-red-300 text-[11px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span>Routing path intersects with high-risk mixer cluster CL-9021</span>
            </li>
          </ul>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-dark-700">
          <button
            onClick={() => {
              onClose();
              navigate(`/transaction-monitor?hash=${edge.txHash}`);
            }}
            className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-md transition flex items-center gap-1"
          >
            <span>View Transaction Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
