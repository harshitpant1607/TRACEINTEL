import React from 'react';
import { HelpCircle, ShieldAlert, Network, Layers, CheckCircle2, Info } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-primary" />
          <span>Platform Documentation & Workflow Guide</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">TRACEINTEL Phase-1 Hackathon Prototype Architecture Guide.</p>
      </div>

      <div className="p-6 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-6 text-xs text-gray-300 leading-relaxed">
        {/* Section 1: Overview */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-primary" />
            <span>1. Platform Overview</span>
          </h3>
          <p className="p-4 rounded-lg bg-dark-850 border border-dark-750">
            TRACEINTEL is a specialized financial intelligence and digital-asset cybercrime investigation platform. 
            Designed for law enforcement analysts, regulatory investigators, and anti-money laundering (AML) teams, 
            the platform identifies high-risk cryptocurrency wallets, monitors suspicious multi-stage layering patterns, 
            maps visual transaction networks, and generates judicial evidentiary reports.
          </p>
        </div>

        {/* Section 2: Recommended Workflow */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-100 flex items-center gap-2">
            <Network className="w-4 h-4 text-amber-400" />
            <span>2. Recommended 7-Step Hackathon Demo Storyline</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="p-3 rounded bg-dark-900 border border-dark-750">
              <span className="text-cyan-400 font-bold block mb-1">Step 1: Demo Login</span>
              <span>Authenticate via Demo Access with investigator ID <strong className="text-gray-200">INV-2047</strong>.</span>
            </div>
            <div className="p-3 rounded bg-dark-900 border border-dark-750">
              <span className="text-cyan-400 font-bold block mb-1">Step 2: Overview Review</span>
              <span>Observe the live KPI counters, suspicious velocity trends, and top Critical Alert spotlight.</span>
            </div>
            <div className="p-3 rounded bg-dark-900 border border-dark-750">
              <span className="text-cyan-400 font-bold block mb-1">Step 3: Open Investigation</span>
              <span>Click the critical alert for wallet <strong className="text-red-400">0x71C8...A92F</strong> to view case INV-2026-004.</span>
            </div>
            <div className="p-3 rounded bg-dark-900 border border-dark-750">
              <span className="text-cyan-400 font-bold block mb-1">Step 4: Trace Graph Flow</span>
              <span>Navigate to the Transaction Network to view multi-hop layering topology from source VASP to mixer.</span>
            </div>
            <div className="p-3 rounded bg-dark-900 border border-dark-750">
              <span className="text-cyan-400 font-bold block mb-1">Step 5: Wallet Intelligence</span>
              <span>Select a node in the graph to open Node Intelligence, then inspect the deep wallet profile.</span>
            </div>
            <div className="p-3 rounded bg-dark-900 border border-dark-750">
              <span className="text-cyan-400 font-bold block mb-1">Step 6: Case File Creation</span>
              <span>Click "Establish Case" to save operation CP-2026-004 into the active case repository.</span>
            </div>
            <div className="p-3 rounded bg-dark-900 border border-dark-750 col-span-1 sm:col-span-2">
              <span className="text-cyan-400 font-bold block mb-1">Step 7: Evidentiary Report Export</span>
              <span>Click "Generate Report" to preview the executive summary and export the official evidentiary PDF synthesis.</span>
            </div>
          </div>
        </div>

        {/* Section 3: Risk Scoring Explanation */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-gray-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>3. Risk Scoring Heuristics (0-100)</span>
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 p-2.5 rounded bg-dark-900 border border-dark-750">
              <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0" />
              <div>
                <strong className="text-red-400 block font-mono">CRITICAL (80–100)</strong>
                <span className="text-gray-400">Direct exposure to sanctioned mixing protocols, rapid multi-hop layering, or darknet market transactions.</span>
              </div>
            </li>
            <li className="flex items-start gap-2 p-2.5 rounded bg-dark-900 border border-dark-750">
              <span className="w-2 h-2 rounded-full bg-orange-500 mt-1 shrink-0" />
              <div>
                <strong className="text-orange-400 block font-mono">HIGH (60–79)</strong>
                <span className="text-gray-400">Rapid transaction velocity, unverified OTC counterparty off-ramping, or newly created account burst activity.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
