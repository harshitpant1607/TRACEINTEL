import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useApp } from '../../context/AppContext';

export default function AddNoteModal({ isOpen, onClose, investigationId = 'INV-2026-004' }) {
  const { addAnalystNote } = useApp();
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addAnalystNote(investigationId, text);
    setText('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Analyst Intelligence Note"
      subtitle={`Append formal notes to investigation case ${investigationId}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-gray-300 font-semibold mb-1">Analyst Observations & Compliance Notes *</label>
          <textarea
            rows={4}
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter intelligence findings, subpoena responses, VASP communications, or network cluster observations..."
            className="w-full px-3 py-2 bg-dark-900 border border-dark-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-dark-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-dark-750 text-gray-300 hover:bg-dark-700 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-brand-primary hover:bg-cyan-600 text-dark-950 font-bold"
          >
            Save Note to Audit Trail
          </button>
        </div>
      </form>
    </Modal>
  );
}
