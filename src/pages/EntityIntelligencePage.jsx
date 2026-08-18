import React, { useState } from 'react';
import { Network, Building2, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import RiskBadge from '../components/common/RiskBadge';
import Modal from '../components/common/Modal';
import { useApp } from '../context/AppContext';

export default function EntityIntelligencePage() {
  const { entities } = useApp();
  const [selectedEntity, setSelectedEntity] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
          <Network className="w-5 h-5 text-brand-primary" />
          <span>Entity Intelligence Directory</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">VASP compliance registry, darknet marketplaces, mixers, and OTC desks.</p>
      </div>

      {/* Entities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entities.map(entity => (
          <div
            key={entity.id}
            onClick={() => setSelectedEntity(entity)}
            className="p-5 rounded-xl bg-dark-800 border border-dark-700 hover:border-brand-primary/50 shadow-lg cursor-pointer transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-gray-400">{entity.type}</span>
                <RiskBadge score={entity.riskScore} level={entity.riskLevel} />
              </div>
              <h3 className="mt-2 text-base font-bold text-gray-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-primary" />
                <span>{entity.name}</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{entity.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-dark-900 border border-dark-750 font-mono text-xs">
              <div>
                <span className="text-[10px] text-gray-400 block">Connected Wallets</span>
                <span className="text-gray-200 font-bold">{entity.connectedWallets}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block">Volume Monitored</span>
                <span className="text-emerald-400 font-bold">{entity.volumeMonitored}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-dark-700 pt-3">
              <span className="text-xs text-gray-400 font-mono">{entity.jurisdiction}</span>
              <span className="text-xs font-bold text-brand-primary flex items-center gap-1">
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Entity Detail Modal */}
      {selectedEntity && (
        <Modal
          isOpen={!!selectedEntity}
          onClose={() => setSelectedEntity(null)}
          title={`Entity Profile: ${selectedEntity.name}`}
          subtitle={`Type: ${selectedEntity.type} | Jurisdiction: ${selectedEntity.jurisdiction}`}
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 rounded-xl bg-dark-900 border border-dark-700">
              <div>
                <span className="text-[10px] text-gray-400 font-mono">Monitored Volume</span>
                <p className="text-xl font-bold font-mono text-emerald-400">{selectedEntity.volumeMonitored}</p>
              </div>
              <RiskBadge score={selectedEntity.riskScore} level={selectedEntity.riskLevel} size="lg" />
            </div>

            <div>
              <h4 className="font-semibold text-gray-200 mb-1">Intelligence Notes & Background</h4>
              <p className="text-gray-300 leading-relaxed p-3 rounded-lg bg-dark-850 border border-dark-750">
                {selectedEntity.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
                <span className="text-[10px] text-gray-400 block">Compliance Status</span>
                <span className="text-amber-400 font-bold">{selectedEntity.status}</span>
              </div>
              <div className="p-3 rounded-lg bg-dark-900 border border-dark-750">
                <span className="text-[10px] text-gray-400 block">Connected Wallets</span>
                <span className="text-gray-200 font-bold">{selectedEntity.connectedWallets} Wallets</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
