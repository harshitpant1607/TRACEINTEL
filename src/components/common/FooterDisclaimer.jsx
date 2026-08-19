import React from 'react';
import { Info } from 'lucide-react';

export default function FooterDisclaimer() {
  return (
    <footer className="py-3 px-6 border-t border-dark-750 bg-dark-900/80 text-center text-[11px] font-mono text-gray-500 flex items-center justify-center gap-2">
      <Info className="w-3.5 h-3.5 text-brand-primary/60 shrink-0" />
      <span>Synthetic demonstration data • No live blockchain or government-system integrations</span>
    </footer>
  );
}
