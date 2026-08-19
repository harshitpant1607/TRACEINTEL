import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import { useApp } from '../context/AppContext';
import { shortenAddress } from '../utils/helpers';

export default function RiskAlertsPage() {
  const { alerts, markAlertResolved } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL');

  // Dynamic count derivations
  const unresolvedCritical = alerts.filter(a => a.severity === 'CRITICAL' && a.status !== 'Resolved').length;
  const unresolvedHigh = alerts.filter(a => a.severity === 'HIGH' && a.status !== 'Resolved').length;
  const unresolvedMedium = alerts.filter(a => a.severity === 'MEDIUM' && a.status !== 'Resolved').length;
  const resolvedCount = alerts.filter(a => a.status === 'Resolved').length;

  const tabs = [
    { key: 'ALL', label: 'All Alerts', count: alerts.length },
    { key: 'CRITICAL', label: 'Critical', count: unresolvedCritical },
    { key: 'HIGH', label: 'High Severity', count: unresolvedHigh },
    { key: 'MEDIUM', label: 'Medium', count: unresolvedMedium },
    { key: 'Resolved', label: 'Resolved', count: resolvedCount }
  ];

  const filteredAlerts = alerts.filter(a => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'Resolved') return a.status === 'Resolved';
    return a.severity === activeTab && a.status !== 'Resolved';
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
          <Radio className="w-5 h-5 text-red-500 animate-pulse" />
          <span>Real-time Risk Alert Center</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Automated threat engine rules, trigger alerts, and compliance flags.</p>
      </div>

      {/* Dynamic Tabs with Badges */}
      <div className="flex items-center gap-2 border-b border-dark-700 pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === tab.key 
                ? 'bg-brand-primary text-dark-950 shadow-md' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-dark-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${
              activeTab === tab.key ? 'bg-dark-950/30 text-dark-950' : 'bg-dark-900 text-gray-400 border border-dark-750'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`p-5 rounded-xl border transition shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              alert.severity === 'CRITICAL' && alert.status !== 'Resolved'
                ? 'bg-red-950/20 border-red-500/40' 
                : alert.severity === 'HIGH' && alert.status !== 'Resolved'
                ? 'bg-orange-950/20 border-orange-500/40' 
                : 'bg-dark-800 border-dark-700'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl shrink-0 ${
                alert.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs text-cyan-400">{alert.id}</span>
                  <RiskBadge score={alert.riskScore} level={alert.severity} />
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-dark-900 text-gray-300 border border-dark-700">
                    {alert.alertType}
                  </span>
                  <span className="text-xs text-gray-400 font-mono ml-auto md:ml-0">{alert.time}</span>
                </div>

                <h3 className="text-sm font-bold text-gray-100 flex items-center gap-2">
                  Target Address: <span className="font-mono text-cyan-300">{shortenAddress(alert.wallet)}</span>
                  <span className="text-emerald-400 font-mono font-semibold">({alert.amount})</span>
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed max-w-3xl">
                  {alert.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {alert.status !== 'Resolved' ? (
                <button
                  onClick={() => markAlertResolved(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-dark-750 hover:bg-dark-700 text-emerald-400 text-xs font-semibold border border-dark-600 transition flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
              ) : (
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-semibold">
                  Resolved
                </span>
              )}

              <button
                onClick={() => navigate('/investigations/INV-2026-004')}
                className="px-4 py-1.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-md transition flex items-center gap-1"
              >
                <span>Investigate Target</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
