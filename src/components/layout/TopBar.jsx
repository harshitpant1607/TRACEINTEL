import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Shield, ArrowRight, Wallet, Hash, Briefcase } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import { useApp } from '../../context/AppContext';
import { shortenAddress, shortenHash } from '../../utils/helpers';

export default function TopBar({ onToggleMobileSidebar }) {
  const { searchQuery, setSearchQuery, wallets, transactions, cases, unreadNotificationCount, currentUser } = useApp();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  // Instant global search filtering across wallets, transactions, cases
  const matchingWallets = searchQuery.trim() ? wallets.filter(w => 
    w.address.toLowerCase().includes(searchQuery.toLowerCase()) || 
    w.label.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3) : [];

  const matchingTxs = searchQuery.trim() ? transactions.filter(t => 
    t.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.to.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3) : [];

  const matchingCases = searchQuery.trim() ? cases.filter(c => 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3) : [];

  const hasResults = matchingWallets.length > 0 || matchingTxs.length > 0 || matchingCases.length > 0;

  const handleSelectResult = (type, item) => {
    setShowDropdown(false);
    setSearchQuery('');
    if (type === 'wallet') {
      navigate(`/wallet-intelligence?address=${item.address}`);
    } else if (type === 'tx') {
      navigate(`/transaction-monitor?hash=${item.hash}`);
    } else if (type === 'case') {
      navigate(`/cases`);
    }
  };

  return (
    <header className="h-16 bg-dark-850 border-b border-dark-700/80 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Left: Mobile Toggle & Engine Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-750"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold">Intelligence Engine Online</span>
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
          placeholder="Search wallet, transaction, entity or case..."
        />

        {/* Global Search Dropdown */}
        {showDropdown && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-dark-700">
            {hasResults ? (
              <>
                {matchingWallets.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-semibold text-gray-400 uppercase">Wallets</div>
                    {matchingWallets.map(w => (
                      <div
                        key={w.address}
                        onClick={() => handleSelectResult('wallet', w)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-dark-750 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-cyan-400" />
                          <div>
                            <span className="font-mono text-gray-200">{shortenAddress(w.address)}</span>
                            <span className="ml-2 text-gray-400 text-[11px]">{w.label}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                    ))}
                  </div>
                )}

                {matchingTxs.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-semibold text-gray-400 uppercase">Transactions</div>
                    {matchingTxs.map(t => (
                      <div
                        key={t.hash}
                        onClick={() => handleSelectResult('tx', t)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-dark-750 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-amber-400" />
                          <span className="font-mono text-gray-200">{shortenHash(t.hash)}</span>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded">{t.amount} {t.asset}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchingCases.length > 0 && (
                  <div className="p-2">
                    <div className="px-2 py-1 text-[10px] font-mono font-semibold text-gray-400 uppercase">Cases</div>
                    {matchingCases.map(c => (
                      <div
                        key={c.id}
                        onClick={() => handleSelectResult('case', c)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-dark-750 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-brand-indigo" />
                          <div>
                            <span className="font-mono font-bold text-gray-200">{c.id}</span>
                            <span className="ml-2 text-gray-400">{c.name}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 text-center text-xs text-gray-400">
                No matching target records found for "{searchQuery}"
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
            <p className="text-[10px] text-emerald-400 font-mono">CLEARANCE: L5</p>
          </div>
        </div>
      </div>
    </header>
  );
}
