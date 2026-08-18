import React, { useState } from 'react';
import NetworkGraph from '../components/graph/NetworkGraph';
import NodeDetailPanel from '../components/graph/NodeDetailPanel';
import CreateCaseModal from '../components/modals/CreateCaseModal';
import { useApp } from '../context/AppContext';
import { Network, Info, ShieldAlert, ArrowRight } from 'lucide-react';

export default function TransactionNetworkPage() {
  const { graphData } = useApp();
  const [selectedNode, setSelectedNode] = useState(graphData.nodes[2]); // Default selected to 0x71C8 hub node
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [caseWallet, setCaseWallet] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
            <Network className="w-5 h-5 text-brand-primary" />
            <span>Interactive Transaction Graph Network</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">Multi-stage fund flow mapping: Source VASP $\rightarrow$ Layering Intermediaries $\rightarrow$ Sanctioned Mixer.</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-dark-850 border border-dark-700 px-3 py-1.5 rounded-lg text-gray-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Active Graph Nodes: <strong>{graphData.nodes.length}</strong></span>
          <span className="text-gray-500 mx-1">|</span>
          <span>Flow Hops: <strong>{graphData.edges.length}</strong></span>
        </div>
      </div>

      {/* Main Canvas & Detail Drawer Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Interactive Graph Canvas */}
        <div className="flex-1 min-w-0">
          <NetworkGraph
            data={graphData}
            selectedNode={selectedNode}
            onSelectNode={(node) => setSelectedNode(node)}
          />
        </div>

        {/* Right Drawer Panel */}
        {selectedNode && (
          <div className="shrink-0">
            <NodeDetailPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              onOpenCreateCase={(nodeObj) => {
                setCaseWallet(nodeObj.address);
                setIsCaseModalOpen(true);
              }}
            />
          </div>
        )}
      </div>

      {/* Storyline Flow Guide Box */}
      <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span>Multi-Stage Fund Laundering Topology Map</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-dark-850 border border-cyan-500/30 space-y-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              STAGE 1: SOURCE
            </span>
            <p className="font-semibold text-gray-200 mt-1">Nova Exchange Proxy</p>
            <p className="text-[11px] text-gray-400">Off-market OTC deposit withdrawal of 300,000 USDT.</p>
          </div>

          <div className="p-3 rounded-lg bg-dark-850 border border-amber-500/30 space-y-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800">
              STAGE 2: BUFFER
            </span>
            <p className="font-semibold text-gray-200 mt-1">Buffer Wallet 1</p>
            <p className="text-[11px] text-gray-400">Rapid inter-transfer latency under 5 mins.</p>
          </div>

          <div className="p-3 rounded-lg bg-dark-850 border border-red-500/40 space-y-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
              STAGE 3: MIXING HUB
            </span>
            <p className="font-semibold text-gray-200 mt-1">Wallet 0x71C8...A92F</p>
            <p className="text-[11px] text-gray-400">Central anonymization hub (Risk score: 94/100).</p>
          </div>

          <div className="p-3 rounded-lg bg-dark-850 border border-red-500/40 space-y-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-800">
              STAGE 4: DESTINATION
            </span>
            <p className="font-semibold text-gray-200 mt-1">CryptoClean Mixer</p>
            <p className="text-[11px] text-gray-400">Sanctioned darknet protocol final deposit.</p>
          </div>
        </div>
      </div>

      <CreateCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        initialWallet={caseWallet}
      />
    </div>
  );
}
