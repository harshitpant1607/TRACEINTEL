import React, { useState } from 'react';
import NetworkGraph from '../components/graph/NetworkGraph';
import NodeDetailPanel from '../components/graph/NodeDetailPanel';
import TransactionEdgeModal from '../components/graph/TransactionEdgeModal';
import FlowAnalysisPanel from '../components/graph/FlowAnalysisPanel';
import CreateCaseModal from '../components/modals/CreateCaseModal';
import { useApp } from '../context/AppContext';
import { Network, Info } from 'lucide-react';

export default function TransactionNetworkPage() {
  const { graphData } = useApp();
  const [selectedNode, setSelectedNode] = useState(graphData.nodes[2]); // Default to 0x71C8 hub node
  const [selectedEdge, setSelectedEdge] = useState(null);
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
          <p className="text-xs text-gray-400 mt-1">Multi-stage fund flow mapping: Source VASP &rarr; Buffer &rarr; Layering Hops &rarr; Target Hub &rarr; ShadowRoute Mixer.</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-dark-850 border border-dark-700 px-3 py-1.5 rounded-lg text-gray-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Active Graph Nodes: <strong>{graphData.nodes.length}</strong></span>
          <span className="text-gray-500 mx-1">|</span>
          <span>Flow Hops: <strong>{graphData.edges.length}</strong></span>
        </div>
      </div>

      {/* Flow Analysis Summary Card */}
      <FlowAnalysisPanel />

      {/* Main Canvas & Detail Drawer Area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Interactive Graph Canvas */}
        <div className="flex-1 min-w-0">
          <NetworkGraph
            data={graphData}
            selectedNode={selectedNode}
            onSelectNode={(node) => setSelectedNode(node)}
            onSelectEdge={(edge) => setSelectedEdge(edge)}
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

      {/* Modals */}
      <TransactionEdgeModal
        edge={selectedEdge}
        isOpen={!!selectedEdge}
        onClose={() => setSelectedEdge(null)}
      />

      <CreateCaseModal
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        initialWallet={caseWallet}
      />
    </div>
  );
}
