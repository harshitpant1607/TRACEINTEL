import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Wallet, ShieldAlert, ArrowRight, Layers, ExternalLink, Network, Briefcase } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import RiskBadge from '../components/common/RiskBadge';
import RiskBreakdown from '../components/common/RiskBreakdown';
import CreateCaseModal from '../components/modals/CreateCaseModal';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';
import { calculateWalletRiskScore } from '../utils/riskEngine';
import { formatCurrency, shortenAddress } from '../utils/helpers';

export default function WalletIntelligencePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { wallets, transactions } = useApp();

  const queryAddress = searchParams.get('address') || '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F';
  const [addressInput, setAddressInput] = useState(queryAddress);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

  // Search wallet in mock dataset
  const targetWallet = wallets.find(w => w.address.toLowerCase() === queryAddress.trim().toLowerCase());
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!addressInput.trim()) return;
    navigate(`/wallet-intelligence?address=${addressInput.trim()}`);
  };

  const handleUseDemoWallet = () => {
    const demoAddr = '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F';
    setAddressInput(demoAddr);
    navigate(`/wallet-intelligence?address=${demoAddr}`);
  };

  if (!targetWallet) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-primary" />
            <span>Wallet Intelligence & Profiling</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Deep entity resolution, balance exposure, and counterparty telemetry.</p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="flex-1">
            <SearchBar
              value={addressInput}
              onChange={setAddressInput}
              placeholder="Enter blockchain wallet address..."
            />
          </div>
          <button type="submit" className="px-5 py-2.5 rounded-lg bg-brand-primary text-dark-950 font-bold text-xs">
            Analyze Wallet
          </button>
        </form>

        <EmptyState
          title="No Synthetic Profile Found"
          description={`No synthetic intelligence record exists for address "${queryAddress}". Try searching the flagship demo target address.`}
          actionButton={
            <button
              onClick={handleUseDemoWallet}
              className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-md transition"
            >
              Use Primary Demo Target Address (0x71C8...A92F)
            </button>
          }
        />
      </div>
    );
  }

  const riskAnalysis = calculateWalletRiskScore(targetWallet);

  const walletTxs = transactions.filter(t => 
    t.from.toLowerCase() === targetWallet.address.toLowerCase() ||
    t.to.toLowerCase() === targetWallet.address.toLowerCase()
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
          <Search className="w-5 h-5 text-brand-primary" />
          <span>Wallet Intelligence & Profiling</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Deep entity resolution, balance exposure, and counterparty telemetry.</p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <div className="flex-1">
          <SearchBar
            value={addressInput}
            onChange={setAddressInput}
            placeholder="Enter blockchain wallet address (e.g. 0x71C8F91A2B5E43C988D3E105634A9F01289EA92F)..."
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-md transition"
        >
          Analyze Wallet
        </button>
      </form>

      {/* Primary Wallet Dossier Banner */}
      <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700 shadow-2xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-700 pb-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-dark-900 text-cyan-400 border border-dark-700">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold text-gray-400">{targetWallet.label}</span>
                <RiskBadge score={riskAnalysis.score} level={riskAnalysis.level} size="lg" />
              </div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-cyan-400 mt-1 select-all">{targetWallet.address}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate(`/transaction-monitor?wallet=${targetWallet.address}`)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-gray-200 border border-dark-600 font-semibold text-xs transition"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>View Transaction Activity</span>
            </button>

            <button
              onClick={() => navigate('/transaction-network')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-dark-750 hover:bg-dark-700 text-amber-400 border border-dark-600 font-semibold text-xs transition"
            >
              <Network className="w-4 h-4" />
              <span>Trace Wallet Flow</span>
            </button>

            <button
              onClick={() => navigate('/investigations/INV-2026-004')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-md transition"
            >
              <span>View Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCaseModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-red-300 font-semibold text-xs transition"
            >
              <Briefcase className="w-4 h-4 text-red-400" />
              <span>Create Case</span>
            </button>
          </div>
        </div>

        {/* Wallet Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
            <span className="text-[10px] text-gray-400 uppercase block">Total Inflow</span>
            <span className="text-base font-bold text-emerald-400">{formatCurrency(targetWallet.totalInflow)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
            <span className="text-[10px] text-gray-400 uppercase block">Total Outflow</span>
            <span className="text-base font-bold text-red-400">{formatCurrency(targetWallet.totalOutflow)}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
            <span className="text-[10px] text-gray-400 uppercase block">Transaction Count</span>
            <span className="text-base font-bold text-gray-200">{targetWallet.txCount} txs</span>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-900 border border-dark-750">
            <span className="text-[10px] text-gray-400 uppercase block">Cluster ID</span>
            <span className="text-base font-bold text-cyan-400">{targetWallet.clusterId || 'CL-9021'}</span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Risk Engine & History */}
        <div className="lg:col-span-2 space-y-6">
          <RiskBreakdown analysis={riskAnalysis} />

          {/* Transaction History */}
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-primary" />
                <span>Associated Transaction Telemetry</span>
              </h3>
              <button
                onClick={() => navigate(`/transaction-monitor?wallet=${targetWallet.address}`)}
                className="text-xs text-brand-primary font-semibold hover:underline"
              >
                View Full Logs
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-dark-700 font-mono text-[11px] uppercase text-gray-400 bg-dark-850">
                    <th className="p-2.5">Hash</th>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Amount</th>
                    <th className="p-2.5">Risk Score</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-750 font-mono">
                  {walletTxs.map(tx => (
                    <tr key={tx.hash} className="hover:bg-dark-750/60">
                      <td className="p-2.5 text-cyan-400 font-semibold">{shortenAddress(tx.hash)}</td>
                      <td className="p-2.5 text-gray-400 text-[11px]">{tx.timestamp}</td>
                      <td className="p-2.5 font-bold text-gray-200">{tx.amount.toLocaleString()} {tx.asset}</td>
                      <td className="p-2.5">
                        <RiskBadge score={tx.riskScore} size="sm" />
                      </td>
                      <td className="p-2.5 text-red-400 font-semibold">{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Portfolio & Entities */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-gray-200">Asset Portfolio & Balance Exposure</h3>

            <div className="space-y-3">
              {(targetWallet.assets || []).map(asset => (
                <div key={asset.symbol} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-gray-200">{asset.symbol}</span>
                    <span className="text-emerald-400">{asset.balance} (${asset.usdValue.toLocaleString()})</span>
                  </div>
                  <div className="w-full h-2 bg-dark-900 rounded-full overflow-hidden border border-dark-750">
                    <div className="h-full bg-brand-primary" style={{ width: `${asset.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-3">
            <h3 className="text-sm font-bold text-gray-200">Associated Intelligence Entities</h3>

            <div className="p-3.5 rounded-lg bg-dark-850 border border-dark-750 space-y-1.5">
              <span className="text-[10px] font-mono text-gray-400 uppercase">Classification</span>
              <p className="text-xs font-bold text-cyan-400">{targetWallet.associatedEntity || 'ShadowRoute Mixer'}</p>
              <p className="text-[11px] text-gray-400">Jurisdiction: Synthetic Demonstration Entity</p>
            </div>
          </div>
        </div>
      </div>

      <CreateCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        initialWallet={targetWallet.address}
      />
    </div>
  );
}
