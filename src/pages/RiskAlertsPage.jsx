import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import { useApp } from '../context/AppContext';
import { shortenAddress } from '../utils/helpers';

export default function RiskAlertsPage() {
  const { alerts, markAlertResolved, addToast } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('ALL');

  const tabs = [
    { key: 'ALL', label: 'All Alerts' },
    { key: 'CRITICAL', label: 'Critical' },
    { key: 'HIGH', label: 'High Severity' },
    { key: 'MEDIUM', label: 'Medium' },
    { key: 'Resolved', label: 'Resolved' }
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

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-dark-700 pb-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === tab.key 
                ? 'bg-brand-primary text-dark-950 shadow-md' 
                : 'text-gray-400 hover:text-gray-200 hover:bg-dark-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts Stream */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div
            key={alert.id}
            className={`p-5 rounded-xl border transition shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              alert.severity === 'CRITICAL' 
                ? 'bg-red-950/20 border-red-500/40' 
                : alert.severity === 'HIGH' 
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
              {alert.status !== 'Resolved' && (
                <button
                  onClick={() => markAlertResolved(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-dark-750 hover:bg-dark-700 text-emerald-400 text-xs font-semibold border border-dark-600 transition flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
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
