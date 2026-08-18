import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, CheckCheck, ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function NotificationPanel() {
  const { unreadNotificationCount, setUnreadNotificationCount } = useApp();

  const [notifications, setNotifications] = useState([
    {
      id: 'N1',
      title: 'CRITICAL: High-Risk Mixing Hub Detected',
      message: 'Wallet 0x71C8...A92F executed rapid $184,200 USDT transfers through 7 intermediary hops.',
      time: '10 mins ago',
      type: 'critical',
      read: false
    },
    {
      id: 'N2',
      title: 'HIGH: Rapid Fund Movement Flagged',
      message: 'Wallet 0x4B91...E72D initiated multi-address split transfers.',
      time: '25 mins ago',
      type: 'high',
      read: false
    },
    {
      id: 'N3',
      title: 'NEW ENTITY: Darknet Mixer Association',
      message: 'Automated cluster mapping identified connection to CryptoClean Mixer portal.',
      time: '1 hour ago',
      type: 'info',
      read: false
    },
    {
      id: 'N4',
      title: 'CASE UPDATE: CP-2026-004 Established',
      message: 'Lead Inv. Sarah Vance opened investigation case for USDT layering.',
      time: '2 hours ago',
      type: 'success',
      read: true
    }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadNotificationCount(0);
  };

  const handleToggleRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-gray-100 flex items-center gap-2">
            <Bell className="w-5 h-5 text-brand-primary" />
            <span>Real-time System Notifications</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Intelligence alerts, rule triggers, and case updates</p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 text-xs text-gray-300 hover:text-white transition"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const isCritical = n.type === 'critical';
          const isHigh = n.type === 'high';
          const isSuccess = n.type === 'success';

          return (
            <div
              key={n.id}
              onClick={() => handleToggleRead(n.id)}
              className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-4 ${
                !n.read 
                  ? 'bg-dark-800 border-brand-primary/40 shadow-lg' 
                  : 'bg-dark-850/60 border-dark-750 opacity-75'
              }`}
            >
              <div className={`p-2.5 rounded-lg shrink-0 ${
                isCritical 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                  : isHigh 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' 
                  : isSuccess 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
              }`}>
                {isCritical && <ShieldAlert className="w-5 h-5" />}
                {isHigh && <AlertTriangle className="w-5 h-5" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5" />}
                {!isCritical && !isHigh && !isSuccess && <Info className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-200">{n.title}</h3>
                  <span className="text-[11px] font-mono text-gray-400">{n.time}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{n.message}</p>
              </div>

              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-brand-primary shrink-0 self-center" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
