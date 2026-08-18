import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Activity, 
  Network, 
  Briefcase, 
  FileText, 
  Bell, 
  Settings, 
  HelpCircle, 
  Radio, 
  Layers, 
  FolderKanban,
  X,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const { unreadNotificationCount, currentUser } = useApp();
  const location = useLocation();

  const navItems = [
    { name: 'Overview', path: '/overview', icon: Activity },
    { name: 'Investigations', path: '/investigations', icon: ShieldAlert },
    { name: 'Wallet Intelligence', path: '/wallet-intelligence', icon: Search },
    { name: 'Transaction Monitor', path: '/transaction-monitor', icon: Layers },
    { name: 'Risk Alerts', path: '/risk-alerts', icon: Radio, badge: '5' },
    { name: 'Entity Intelligence', path: '/entity-intelligence', icon: Network },
    { name: 'Transaction Network', path: '/transaction-network', icon: FolderKanban },
    { name: 'Cases', path: '/cases', icon: Briefcase },
    { name: 'Reports', path: '/reports', icon: FileText },
  ];

  const utilityItems = [
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: unreadNotificationCount ? `${unreadNotificationCount}` : null },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & Docs', path: '/help', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-dark-850 border-r border-dark-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-dark-700/80 bg-dark-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-indigo text-dark-950 font-black shadow-lg shadow-brand-primary/20">
              <ShieldAlert className="w-5 h-5 text-gray-950" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wider text-gray-100 flex items-center gap-1">
                TRACE<span className="text-brand-primary">INTEL</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tight">Financial Crime Intel</p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="lg:hidden p-1 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
            Investigation Suite
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path === '/overview' && location.pathname === '/');

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                  isActive 
                    ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary font-semibold shadow-sm' 
                    : 'text-gray-300 hover:bg-dark-750 hover:text-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-primary' : 'text-gray-400 group-hover:text-gray-200'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded ${
                    isActive ? 'bg-brand-primary/20 text-brand-primary' : 'bg-red-950/80 text-red-400 border border-red-800/60'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Utilities Section */}
          <div className="pt-6 px-3 pb-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400">
            System & Support
          </div>

          {utilityItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive 
                    ? 'bg-brand-primary/10 text-brand-primary border-l-2 border-brand-primary' 
                    : 'text-gray-400 hover:bg-dark-750 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-gray-400" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-brand-primary/20 text-brand-primary">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User / Investigator Footer */}
        <div className="p-3 border-t border-dark-700/80 bg-dark-900/60">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-dark-800 border border-dark-700">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-gray-700 to-gray-900 text-cyan-400 font-mono font-bold flex items-center justify-center text-xs border border-cyan-500/30">
              {currentUser.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-200 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-gray-400 font-mono truncate">{currentUser.id}</p>
            </div>
            <Lock className="w-3.5 h-3.5 text-emerald-400" title="Session Authenticated" />
          </div>
        </div>
      </aside>
    </>
  );
}
