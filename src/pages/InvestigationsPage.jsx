import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Search, LayoutGrid, List, ArrowRight, Eye, User } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import FilterPanel from '../components/common/FilterPanel';
import RiskBadge from '../components/common/RiskBadge';
import CaseStatusBadge from '../components/common/CaseStatusBadge';
import EmptyState from '../components/common/EmptyState';
import { useApp } from '../context/AppContext';
import { shortenAddress, formatCurrency } from '../utils/helpers';

export default function InvestigationsPage() {
  const { investigations } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
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
      label: 'Digital Asset',
      options: [
        { label: 'USDT', value: 'USDT' },
        { label: 'BTC', value: 'BTC' },
        { label: 'ETH', value: 'ETH' }
      ]
    },
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'CRITICAL / Open', value: 'CRITICAL' },
        { label: 'Open', value: 'Open' },
        { label: 'Under Review', value: 'Under Review' },
        { label: 'Escalated', value: 'Escalated' }
      ]
    }
  ];

  const filteredInvestigations = investigations.filter(inv => {
    const matchesSearch = !search.trim() || 
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.targetWallet.toLowerCase().includes(search.toLowerCase()) ||
      inv.title.toLowerCase().includes(search.toLowerCase());

    const matchesRisk = selectedFilters.risk === 'ALL' || inv.riskLevel === selectedFilters.risk;
    const matchesAsset = selectedFilters.asset === 'ALL' || inv.asset === selectedFilters.asset;
    const matchesStatus = selectedFilters.status === 'ALL' || inv.status.includes(selectedFilters.status);

    return matchesSearch && matchesRisk && matchesAsset && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-brand-primary" />
            <span>Active Investigations Workspace</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Law enforcement cybercrime cases, priority targets, and threat telemetry.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-dark-800 border border-dark-700 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-brand-primary/20 text-brand-primary' : 'text-gray-400'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-brand-primary/20 text-brand-primary' : 'text-gray-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Filter cases by Case ID (INV-2026-004), wallet address, or suspicion keywords..."
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

      {/* Results View */}
      {filteredInvestigations.length === 0 ? (
        <EmptyState
          title="No Matching Investigations Found"
          description="Try broadening your risk severity filters or search term."
        />
      ) : viewMode === 'table' ? (
        <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-dark-700 font-mono text-[11px] uppercase text-gray-400 bg-dark-850">
                <th className="p-3">Case ID</th>
                <th className="p-3">Target Wallet</th>
                <th className="p-3">Suspicion Type</th>
                <th className="p-3">Risk Assessment</th>
                <th className="p-3">Monitored Flow</th>
                <th className="p-3">Assigned Lead</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750 font-sans">
              {filteredInvestigations.map(inv => (
                <tr 
                  key={inv.id} 
                  className="hover:bg-dark-750/60 transition cursor-pointer"
                  onClick={() => navigate(`/investigations/${inv.id}`)}
                >
                  <td className="p-3 font-mono font-bold text-cyan-400">{inv.id}</td>
                  <td className="p-3 font-mono text-gray-200 select-all font-semibold">
                    {shortenAddress(inv.targetWallet)}
                  </td>
                  <td className="p-3 text-gray-300 font-medium">{inv.suspicionType}</td>
                  <td className="p-3">
                    <RiskBadge score={inv.riskScore} level={inv.riskLevel} size="sm" />
                  </td>
                  <td className="p-3 font-mono font-semibold text-emerald-400">
                    {formatCurrency(inv.totalFlow)} <span className="text-gray-400 font-normal">({inv.asset})</span>
                  </td>
                  <td className="p-3 text-gray-400 font-mono text-[11px]">{inv.assignedAnalyst || 'INV-2047'}</td>
                  <td className="p-3">
                    <CaseStatusBadge status={inv.status} />
                  </td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => navigate(`/investigations/${inv.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold transition flex items-center justify-end gap-1.5 ml-auto"
                    >
                      <span>Investigate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInvestigations.map(inv => (
            <div
              key={inv.id}
              onClick={() => navigate(`/investigations/${inv.id}`)}
              className="p-5 rounded-xl bg-dark-800 border border-dark-700 hover:border-brand-primary/50 shadow-lg cursor-pointer transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-cyan-400">{inv.id}</span>
                  <RiskBadge score={inv.riskScore} level={inv.riskLevel} />
                </div>
                <h3 className="mt-2 text-base font-bold text-gray-100">{inv.title}</h3>
                <p className="font-mono text-xs text-gray-400 mt-1">Target: <span className="text-cyan-300">{inv.targetWallet}</span></p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-dark-900 border border-dark-750 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 block">Monitored Volume</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(inv.totalFlow)} {inv.asset}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block">Case Status</span>
                  <CaseStatusBadge status={inv.status} />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-dark-700 pt-3">
                <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>{inv.assignedAnalyst || 'INV-2047'}</span>
                </span>
                <span className="text-xs font-bold text-brand-primary flex items-center gap-1">
                  <span>Open Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
