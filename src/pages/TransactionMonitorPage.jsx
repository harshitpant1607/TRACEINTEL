import React, { useState } from 'react';
import { Layers, Search, Eye, Filter } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import FilterPanel from '../components/common/FilterPanel';
import RiskBadge from '../components/common/RiskBadge';
import TransactionDetailModal from '../components/modals/TransactionDetailModal';
import CreateCaseModal from '../components/modals/CreateCaseModal';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';
import { shortenAddress, shortenHash, formatCurrency } from '../utils/helpers';

export default function TransactionMonitorPage() {
  const { transactions } = useApp();
  const [search, setSearch] = useState('');
  const [selectedTxModal, setSelectedTxModal] = useState(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [caseWallet, setCaseWallet] = useState('');

  const [selectedFilters, setSelectedFilters] = useState({
    risk: 'ALL',
    asset: 'ALL',
    status: 'ALL'
  });

  const filterConfigs = [
    {
      key: 'risk',
      label: 'Risk Severity',
      options: [
        { label: 'Critical Severity', value: 'CRITICAL' },
        { label: 'High Severity', value: 'HIGH' },
        { label: 'Medium Severity', value: 'MEDIUM' }
      ]
    },
    {
      key: 'asset',
      label: 'Asset',
      options: [
        { label: 'USDT', value: 'USDT' },
        { label: 'ETH', value: 'ETH' },
        { label: 'BTC', value: 'BTC' }
      ]
    },
    {
      key: 'status',
      label: 'Flag Status',
      options: [
        { label: 'Flagged', value: 'Flagged' },
        { label: 'Under Review', value: 'Under Review' },
        { label: 'Cleared', value: 'Cleared' }
      ]
    }
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = !search.trim() || 
      t.hash.toLowerCase().includes(search.toLowerCase()) ||
      t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = selectedFilters.risk === 'ALL' || t.riskLevel === selectedFilters.risk;
    const matchesAsset = selectedFilters.asset === 'ALL' || t.asset === selectedFilters.asset;
    const matchesStatus = selectedFilters.status === 'ALL' || t.status === selectedFilters.status;

    return matchesSearch && matchesRisk && matchesAsset && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-brand-primary" />
          <span>Real-time Transaction Monitor</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Cross-network transaction stream, velocity triggers, and block telemetry.</p>
      </div>

      {/* Toolbar */}
      <div className="space-y-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Filter by transaction hash (0xa72f...), sender address, or receiver address..."
        />

        <FilterPanel
          filters={filterConfigs}
          selectedFilters={selectedFilters}
          onChange={(key, val) => setSelectedFilters(prev => ({ ...prev, [key]: val }))}
          onReset={() => {
            setSelectedFilters({ risk: 'ALL', asset: 'ALL', status: 'ALL' });
            setSearch('');
          }}
        />
      </div>

      {/* Transaction Table */}
      {filteredTransactions.length === 0 ? (
        <EmptyState
          title="No Transaction Logs Found"
          description="No transactions match your current search or risk filter criteria."
        />
      ) : (
        <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-dark-700 font-mono text-[11px] uppercase text-gray-400 bg-dark-850">
                <th className="p-3">Transaction Hash</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Sender (From)</th>
                <th className="p-3">Receiver (To)</th>
                <th className="p-3">Asset</th>
                <th className="p-3">Amount</th>
                <th className="p-3">USD Value</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750 font-sans">
              {filteredTransactions.map(tx => (
                <tr
                  key={tx.hash}
                  onClick={() => setSelectedTxModal(tx)}
                  className="hover:bg-dark-750/60 transition cursor-pointer"
                >
                  <td className="p-3 font-mono font-bold text-cyan-400">{shortenHash(tx.hash)}</td>
                  <td className="p-3 font-mono text-gray-400 text-[11px]">{tx.timestamp}</td>
                  <td className="p-3 font-mono text-gray-300 select-all">{shortenAddress(tx.from)}</td>
                  <td className="p-3 font-mono text-gray-300 select-all">{shortenAddress(tx.to)}</td>
                  <td className="p-3 font-mono font-semibold text-gray-200">{tx.asset}</td>
                  <td className="p-3 font-mono font-bold text-gray-100">{tx.amount.toLocaleString()}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{formatCurrency(tx.usdValue)}</td>
                  <td className="p-3">
                    <RiskBadge score={tx.riskScore} level={tx.riskLevel} size="sm" />
                  </td>
                  <td className="p-3 font-mono font-bold text-red-400">{tx.status}</td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedTxModal(tx)}
                      className="px-2.5 py-1 rounded bg-dark-750 hover:bg-dark-700 text-gray-200 font-medium transition flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        tx={selectedTxModal}
        isOpen={!!selectedTxModal}
        onClose={() => setSelectedTxModal(null)}
        onOpenCreateCase={(walletObj) => {
          setCaseWallet(walletObj?.address || '');
          setIsCaseModalOpen(true);
        }}
      />

      {/* Create Case Modal */}
      <CreateCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        initialWallet={caseWallet}
      />
    </div>
  );
}
