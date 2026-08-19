import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function CreateCaseModal({ isOpen, onClose, initialWallet = '' }) {
  const { addCase } = useApp();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('Critical');
  const [targetWallet, setTargetWallet] = useState(initialWallet || '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide an official Operation Case Title.');
      return;
    }
    if (!targetWallet.trim()) {
      setError('Please specify a target wallet address.');
      return;
    }

    addCase({
      name: name.trim(),
      priority,
      targetWallet: targetWallet.trim(),
      description: description.trim() || 'Investigative case established for digital-asset monitoring.'
    });

    setName('');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Case File"
      subtitle="Create an official law enforcement case dossier for evidentiary tracking."
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {error && (
          <div className="p-3 rounded-lg bg-red-950/80 border border-red-800 text-red-300 font-medium">
            {error}
          </div>
        )}

        <div>
          <label className="block text-gray-300 font-semibold mb-1">Operation Title / Case Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g. Operation CyberSweep - Layered USDT Anonymization"
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-1">Priority Classification</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-gray-100 focus:outline-none focus:border-brand-primary font-semibold"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Target Suspect Address *</label>
            <input
              type="text"
              required
              value={targetWallet}
              onChange={(e) => setTargetWallet(e.target.value)}
              className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-gray-100 font-mono text-xs focus:outline-none focus:border-brand-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-semibold mb-1">Case Description & Objectives</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Summarize key suspicion triggers, counterparty exposures, and freezing objectives..."
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-dark-750 text-gray-300 hover:bg-dark-700 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold shadow-lg shadow-cyan-500/20"
          >
            Create Case File
          </button>
        </div>
      </form>
    </Modal>
  );
}
