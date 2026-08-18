import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Activity, AlertOctagon } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function CriticalAlertBanner({ alert }) {
  const navigate = useNavigate();

  if (!alert) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/70 via-dark-850 to-dark-800 p-5 shadow-2xl mb-6">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <AlertOctagon className="w-32 h-32 text-red-500" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 shrink-0">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-red-500 text-dark-950">
                CRITICAL THREAT ESCALATED
              </span>
              <RiskBadge score={alert.riskScore} level="CRITICAL" />
              <span className="text-xs text-gray-400 font-mono">{alert.time}</span>
            </div>

            <h2 className="mt-1.5 text-base font-bold text-gray-100 flex items-center gap-2">
              Target Wallet: <span className="font-mono text-red-400">{alert.wallet}</span>
            </h2>

            <p className="mt-1 text-xs text-gray-300 max-w-2xl leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/investigations/INV-2026-004')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30 transition"
          >
            <span>Open Investigation INV-2026-004</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
