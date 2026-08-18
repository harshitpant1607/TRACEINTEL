import React, { useState } from 'react';
import { Settings, User, Bell, Shield, Sliders, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SettingsPage() {
  const { currentUser, addToast } = useApp();
  const [autoFlagThreshold, setAutoFlagThreshold] = useState(80);
  const [enableSoundAlerts, setEnableSoundAlerts] = useState(true);
  const [autoCaseGeneration, setAutoCaseGeneration] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Workstation configuration preferences updated', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-black text-gray-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-primary" />
          <span>Workstation Configuration Settings</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Manage investigator profile, rule thresholds, and system alerts.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
            <User className="w-4 h-4 text-brand-primary" />
            <span>Investigator Profile</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="block text-gray-400 mb-1">Analyst Full Name</label>
              <input
                type="text"
                readOnly
                value={currentUser.name}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-750 rounded text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Investigator Badge ID</label>
              <input
                type="text"
                readOnly
                value={currentUser.id}
                className="w-full px-3 py-2 bg-dark-900 border border-dark-750 rounded text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Rule Engine Thresholds */}
        <div className="p-5 rounded-xl bg-dark-800 border border-dark-700 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Automated Intelligence Engine Thresholds</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-gray-300 font-medium mb-1">
                <span>Critical Risk Score Escalation Threshold</span>
                <span className="font-mono font-bold text-red-400">{autoFlagThreshold}/100</span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={autoFlagThreshold}
                onChange={(e) => setAutoFlagThreshold(e.target.value)}
                className="w-full accent-brand-primary"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t border-dark-750">
              <div>
                <span className="font-bold text-gray-200 block">Auto-Establish Case Files</span>
                <span className="text-gray-400 text-[11px]">Automatically open law enforcement case files on Critical threats</span>
              </div>
              <input
                type="checkbox"
                checked={autoCaseGeneration}
                onChange={(e) => setAutoCaseGeneration(e.target.checked)}
                className="w-4 h-4 rounded border-dark-600 bg-dark-900 text-brand-primary"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-t border-dark-750">
              <div>
                <span className="font-bold text-gray-200 block">Critical Audio & Visual Beacons</span>
                <span className="text-gray-400 text-[11px]">Trigger priority audio alerts on incoming high-risk mixer feeds</span>
              </div>
              <input
                type="checkbox"
                checked={enableSoundAlerts}
                onChange={(e) => setEnableSoundAlerts(e.target.checked)}
                className="w-4 h-4 rounded border-dark-600 bg-dark-900 text-brand-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
