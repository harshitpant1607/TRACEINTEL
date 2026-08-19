import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Search, 
  Layers, 
  Network, 
  DollarSign, 
  Radio, 
  ArrowRight,
  Eye,
  Info
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import CriticalAlertBanner from '../components/overview/CriticalAlertBanner';
import RiskActivityChart from '../components/overview/RiskActivityChart';
import AssetDistributionChart from '../components/overview/AssetDistributionChart';
import RiskBadge from '../components/common/RiskBadge';
import CaseStatusBadge from '../components/common/CaseStatusBadge';
import { useApp } from '../context/AppContext';
import { shortenAddress, formatCurrency } from '../utils/helpers';

export default function OverviewPage() {
  const { alerts, investigations } = useApp();
  const navigate = useNavigate();

  const criticalAlert = alerts.find(a => a.severity === 'CRITICAL') || alerts[0];

  return (
    <div className="space-y-6">
      {/* Dashboard Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-750 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
              <span>Investigation Overview</span>
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              SYNTHETIC DEMONSTRATION DATA
            </span>
          </div>
          <p className="text-xs text-gray-400">Demonstration intelligence feed across monitored digital assets and entities.</p>
        </div>
      </div>

      {/* Spotlight Critical Threat Banner */}
      <CriticalAlertBanner alert={criticalAlert} />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Active Investigations"
          value="24"
          icon={ShieldAlert}
          trend="up"
          trendValue="+3 today"
          subtitle="4 escalated priority"
          color="cyan"
        />
        <StatCard
          title="High-Risk Wallets"
          value="137"
          icon={Search}
          trend="up"
          trendValue="+12%"
          subtitle="94 critical score max"
          color="red"
          highlight={true}
        />
        <StatCard
          title="Suspicious Tx"
          value="842"
          icon={Layers}
          trend="up"
          trendValue="+8.4%"
          subtitle="Across 14 networks"
          color="amber"
        />
        <StatCard
          title="Flagged Entities"
          value="56"
          icon={Network}
          trend="neutral"
          trendValue="0"
          subtitle="Mixers, OTC, VASPs"
          color="purple"
        />
        <StatCard
          title="Monitored Volume"
          value="$18.7M"
          icon={DollarSign}
          trend="up"
          trendValue="+$2.1M"
          subtitle="USDT & ETH dominant"
          color="emerald"
        />
        <StatCard
          title="Alerts Today"
          value="31"
          icon={Radio}
          trend="up"
          trendValue="+5"
          subtitle="12 critical severity"
          color="red"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RiskActivityChart />
        </div>
        <div>
          <AssetDistributionChart />
        </div>
      </div>

      {/* Recent Active Investigations Table */}
      <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-200">Recent Priority Investigations</h3>
            <p className="text-xs text-gray-400">Target wallets requiring immediate analyst intervention</p>
          </div>

          <button
            onClick={() => navigate('/investigations')}
            className="flex items-center gap-1.5 text-xs text-brand-primary font-semibold hover:underline"
          >
            <span>View All Workspace Cases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-dark-700 font-mono text-[11px] uppercase text-gray-400 bg-dark-850">
                <th className="p-3">Case ID</th>
                <th className="p-3">Target Wallet</th>
                <th className="p-3">Risk Assessment</th>
                <th className="p-3">Primary Asset</th>
                <th className="p-3">Total Flow</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Activity</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-750 font-sans">
              {investigations.map(inv => (
                <tr key={inv.id} className="hover:bg-dark-750/60 transition">
                  <td className="p-3 font-mono font-bold text-cyan-400">{inv.id}</td>
                  <td className="p-3 font-mono text-gray-300 select-all">
                    {shortenAddress(inv.targetWallet)}
                  </td>
                  <td className="p-3">
                    <RiskBadge score={inv.riskScore} level={inv.riskLevel} size="sm" />
                  </td>
                  <td className="p-3 font-mono font-semibold text-gray-200">{inv.asset}</td>
                  <td className="p-3 font-mono font-semibold text-emerald-400">{formatCurrency(inv.totalFlow)}</td>
                  <td className="p-3">
                    <CaseStatusBadge status={inv.status} />
                  </td>
                  <td className="p-3 text-gray-400 font-mono text-[11px]">{inv.lastUpdated}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/wallet-intelligence?address=${inv.targetWallet}`)}
                        className="px-2.5 py-1 rounded bg-dark-700 hover:bg-dark-600 text-gray-200 font-medium transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/investigations/${inv.id}`)}
                        className="px-2.5 py-1 rounded bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold transition flex items-center gap-1"
                      >
                        <span>Investigate</span>
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
