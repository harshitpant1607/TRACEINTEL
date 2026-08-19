import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Shield, ArrowRight, Wallet, Hash, Briefcase, Network, Radio } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import { useApp } from '../../context/AppContext';
import { shortenAddress, shortenHash } from '../../utils/helpers';

export default function TopBar({ onToggleMobileSidebar }) {
  const { searchQuery, setSearchQuery, wallets, transactions, cases, investigations, entities, alerts, unreadNotificationCount, currentUser } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Multi-category search
  const q = searchQuery.trim().toLowerCase();

  const matchingWallets = q ? wallets.filter(w => 
    w.address.toLowerCase().includes(q) || w.label.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchingTxs = q ? transactions.filter(t => 
    t.hash.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchingInvs = q ? investigations.filter(i => 
    i.id.toLowerCase().includes(q) || i.title.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchingCases = q ? cases.filter(c => 
    c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchingEntities = q ? entities.filter(e => 
    e.name.toLowerCase().includes(q) || e.type.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const matchingAlerts = q ? alerts.filter(a => 
    a.id.toLowerCase().includes(q) || a.alertType.toLowerCase().includes(q)
  ).slice(0, 2) : [];

  const hasResults = matchingWallets.length > 0 || matchingTxs.length > 0 || matchingInvs.length > 0 || matchingCases.length > 0 || matchingEntities.length > 0 || matchingAlerts.length > 0;

  const handleSelect = (type, item) => {
    setShowDropdown(false);
    setSearchQuery('');
    if (type === 'wallet') navigate(`/wallet-intelligence?address=${item.address}`);
    else if (type === 'tx') navigate(`/transaction-monitor?hash=${item.hash}`);
    else if (type === 'inv') navigate(`/investigations/${item.id}`);
    else if (type === 'case') navigate(`/cases`);
    else if (type === 'entity') navigate(`/entity-intelligence`);
    else if (type === 'alert') navigate(`/risk-alerts`);
  };

  return (
    <header className="h-16 bg-dark-850 border-b border-dark-700/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left: Mobile Toggle & Synthetic Feed Indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-750"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold">Simulated Intelligence Feed</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="relative flex-1 max-w-md mx-4">
        <SearchBar
          value={searchQuery}
          onChange={(val) => {
            setSearchQuery(val);
            setShowDropdown(true);
          }}
          placeholder="Search wallet, tx hash, case ID, or entity..."
        />

        {/* Multi-Category Dropdown */}
        {showDropdown && q && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-dark-750 max-h-96 overflow-y-auto">
            {hasResults ? (
              <>
                {matchingWallets.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-bold text-gray-400 uppercase">Wallets</div>
                    {matchingWallets.map(w => (
                      <div key={w.address} onClick={() => handleSelect('wallet', w)} className="flex items-center justify-between p-2 rounded hover:bg-dark-750 cursor-pointer text-xs">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="font-mono text-gray-200">{shortenAddress(w.address)}</span>
                          <span className="text-gray-400 text-[11px]">{w.label}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-500" />
                      </div>
                    ))}
                  </div>
                )}

                {matchingTxs.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-bold text-gray-400 uppercase">Transactions</div>
                    {matchingTxs.map(t => (
                      <div key={t.hash} onClick={() => handleSelect('tx', t)} className="flex items-center justify-between p-2 rounded hover:bg-dark-750 cursor-pointer text-xs">
                        <div className="flex items-center gap-2">
                          <Hash className="w-3.5 h-3.5 text-amber-400" />
                          <span className="font-mono text-gray-200">{shortenHash(t.hash)}</span>
                        </div>
                        <span className="text-[10px] font-mono text-red-400 font-semibold">{t.amount} {t.asset}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingInvs.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-bold text-gray-400 uppercase">Investigations</div>
                    {matchingInvs.map(i => (
                      <div key={i.id} onClick={() => handleSelect('inv', i)} className="flex items-center justify-between p-2 rounded hover:bg-dark-750 cursor-pointer text-xs">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5 text-red-400" />
                          <span className="font-mono font-bold text-cyan-400">{i.id}</span>
                          <span className="text-gray-300 truncate max-w-xs">{i.title}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-500" />
                      </div>
                    ))}
                  </div>
                )}

                {matchingCases.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-bold text-gray-400 uppercase">Cases</div>
                    {matchingCases.map(c => (
                      <div key={c.id} onClick={() => handleSelect('case', c)} className="flex items-center justify-between p-2 rounded hover:bg-dark-750 cursor-pointer text-xs">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="font-mono font-bold text-gray-200">{c.id}</span>
                          <span className="text-gray-300">{c.name}</span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-gray-500" />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-xs text-gray-400">
                No intelligence records found for "{searchQuery}". Try wallet address, tx hash, or case ID.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-dark-750 transition"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-primary animate-ping" />
          )}
        </button>

        <div className="hidden md:flex items-center gap-2 pl-3 border-l border-dark-700">
          <div className="w-7 h-7 rounded bg-brand-primary/20 text-brand-primary border border-brand-primary/30 flex items-center justify-center font-mono font-bold text-xs">
            {currentUser.avatar}
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-gray-200 leading-tight">{currentUser.id}</p>
            <p className="text-[10px] text-cyan-400 font-mono">DEMO SESSION</p>
          </div>
        </div>
      </div>
    </header>
  );
}
