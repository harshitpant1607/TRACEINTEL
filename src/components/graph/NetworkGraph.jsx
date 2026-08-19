import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Filter, Eye, ShieldAlert, ArrowRight } from 'lucide-react';

export default function NetworkGraph({ data, selectedNode, onSelectNode, onSelectEdge }) {
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [riskFilter, setRiskFilter] = useState('ALL');

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.0));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.6));
  const handleReset = () => {
    setZoom(1);
    setRiskFilter('ALL');
  };

  const filteredNodes = data.nodes.filter(n => {
    if (riskFilter === 'CRITICAL') return n.level === 'CRITICAL';
    if (riskFilter === 'HIGH') return n.level === 'CRITICAL' || n.level === 'HIGH';
    return true;
  });

  const nodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredEdges = data.edges.filter(e => nodeIds.has(e.from) && nodeIds.has(e.to));

  return (
    <div className="relative w-full h-[600px] bg-dark-900 border border-dark-700 rounded-xl overflow-hidden shadow-2xl flex flex-col">
      {/* Toolbar Controls */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 p-2 rounded-xl bg-dark-850/90 border border-dark-700/80 backdrop-blur-md shadow-lg">
        <button onClick={handleZoomIn} className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-dark-750 transition" title="Zoom In">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={handleZoomOut} className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-dark-750 transition" title="Zoom Out">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={handleReset} className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-dark-750 transition" title="Reset View">
          <RotateCcw className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-dark-700 mx-1" />

        <div className="flex items-center gap-1.5 text-xs text-gray-300">
          <Filter className="w-3.5 h-3.5 text-brand-primary" />
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-dark-900 border border-dark-700 rounded px-2 py-1 text-xs text-gray-200 focus:outline-none"
          >
            <option value="ALL">Show All Risk Levels</option>
            <option value="HIGH">High & Critical Only</option>
            <option value="CRITICAL">Critical Threat Only</option>
          </select>
        </div>

        <div className="h-4 w-px bg-dark-700 mx-1" />

        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition ${
            showLabels ? 'bg-brand-primary/20 text-brand-primary font-semibold' : 'text-gray-400 hover:bg-dark-750'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Labels</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4 px-3 py-2 rounded-lg bg-dark-850/90 border border-dark-700/80 backdrop-blur-md text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-cyan-500 border border-cyan-400" />
          <span className="text-gray-300">Source Entity</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-orange-500 border border-orange-400" />
          <span className="text-gray-300">Buffer / Intermediary</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 border border-red-400" />
          <span className="text-gray-300">High Risk / Mixer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-400" />
          <span className="text-gray-300">Regulated VASP</span>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#06B6D4" />
            </marker>
          </defs>

          <g transform={`scale(${zoom})`}>
            {/* Render Directed Edges */}
            {filteredEdges.map((edge, idx) => {
              const sourceNode = data.nodes.find(n => n.id === edge.from);
              const targetNode = data.nodes.find(n => n.id === edge.to);

              if (!sourceNode || !targetNode) return null;

              const isHighlighted = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);

              return (
                <g 
                  key={`edge-${idx}`}
                  onClick={() => onSelectEdge && onSelectEdge({ ...edge, fromAddress: sourceNode.address, toAddress: targetNode.address })}
                  className="cursor-pointer group"
                >
                  <line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isHighlighted ? '#06B6D4' : '#374151'}
                    strokeWidth={isHighlighted ? 3 : 2}
                    markerEnd="url(#arrowhead)"
                    className="transition-all duration-300 group-hover:stroke-cyan-400 group-hover:stroke-[3]"
                  />
                  {showLabels && (
                    <g transform={`translate(${(sourceNode.x + targetNode.x) / 2}, ${(sourceNode.y + targetNode.y) / 2 - 8})`}>
                      <rect x="-45" y="-10" width="90" height="18" rx="4" fill="#0B0F17" stroke="#1F2937" strokeWidth="1" />
                      <text x="0" y="2" textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="monospace" fontWeight="600" className="group-hover:fill-cyan-400">
                        {edge.amount}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode && selectedNode.id === node.id;
              const isCritical = node.level === 'CRITICAL';
              const isHigh = node.level === 'HIGH';
              const isLow = node.level === 'LOW';

              let nodeColor = '#06B6D4'; // Source Cyan
              if (isCritical) nodeColor = '#EF4444';
              else if (isHigh) nodeColor = '#F97316';
              else if (isLow) nodeColor = '#10B981';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => onSelectNode(node)}
                  className="cursor-pointer group"
                >
                  {(isSelected || isCritical) && (
                    <circle r={isSelected ? 26 : 22} fill="none" stroke={nodeColor} strokeWidth="2" opacity="0.6" className="animate-pulse" />
                  )}

                  <circle
                    r="18"
                    fill="#111827"
                    stroke={nodeColor}
                    strokeWidth={isSelected ? 3.5 : 2}
                    className="transition-all duration-200 group-hover:scale-110"
                  />

                  <text x="0" y="4" textAnchor="middle" fill={nodeColor} fontSize="10" fontWeight="bold" fontFamily="monospace">
                    {node.riskScore}
                  </text>

                  {showLabels && (
                    <g transform="translate(0, 32)">
                      <rect x="-65" y="-10" width="130" height="20" rx="4" fill="#111827" stroke={isSelected ? nodeColor : '#1F2937'} strokeWidth="1" />
                      <text x="0" y="3" textAnchor="middle" fill={isSelected ? '#F3F4F6' : '#9CA3AF'} fontSize="10" fontWeight="600" className="group-hover:fill-white">
                        {node.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
