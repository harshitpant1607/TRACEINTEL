import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, User, Key, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const [investigatorId, setInvestigatorId] = useState('INV-2047');
  const [password, setPassword] = useState('demo123');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { addToast } = useApp();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (investigatorId.trim() === 'INV-2047' && password === 'demo123') {
      setErrorMsg('');
      addToast('Authenticated: Investigator Session Active (Clearance Level 5)', 'success');
      navigate('/overview');
    } else {
      setErrorMsg('Invalid demonstration credentials.');
      addToast('Invalid demonstration credentials.', 'warning');
    }
  };

  const handleDemoAccess = () => {
    setErrorMsg('');
    addToast('Demo Access Granted: Inv. Sarah Vance (INV-2047)', 'success');
    navigate('/overview');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-brand-indigo/10 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-dark-850 border border-dark-700 rounded-2xl shadow-2xl p-8 backdrop-blur-xl z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-[11px] font-mono mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Demo Environment</span>
          </div>

          <div className="flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-indigo text-dark-950 shadow-xl shadow-brand-primary/20 mb-3 mx-auto w-14 h-14">
            <ShieldAlert className="w-8 h-8 text-gray-950" />
          </div>
          
          <h1 className="text-2xl font-black tracking-wider text-gray-100">
            TRACE<span className="text-brand-primary">INTEL</span>
          </h1>
          <p className="text-xs font-semibold text-gray-300 mt-1">
            TRACEINTEL Phase-1 Hackathon Prototype
          </p>
          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
            Synthetic demonstration environment
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSignIn} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-primary" />
              <span>Investigator Credentials ID</span>
            </label>
            <input
              type="text"
              required
              value={investigatorId}
              onChange={(e) => {
                setInvestigatorId(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="e.g. INV-2047"
              className="w-full px-3.5 py-2.5 bg-dark-900 border border-dark-700 rounded-xl text-gray-100 font-mono focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-brand-primary" />
              <span>Access Clearance Key</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 bg-dark-900 border border-dark-700 rounded-xl text-gray-100 font-mono focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-primary hover:bg-cyan-600 text-dark-950 font-extrabold text-sm shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In to Workstation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-700" />
          </div>
          <span className="relative px-3 bg-dark-850 text-[11px] font-mono text-gray-500 uppercase">
            Quick Evaluation Access
          </span>
        </div>

        {/* Demo Access Button */}
        <button
          onClick={handleDemoAccess}
          className="w-full py-3 rounded-xl bg-dark-800 hover:bg-dark-750 border border-dark-600 text-gray-200 font-semibold text-xs transition flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Use Demo Access (Inv. Sarah Vance)</span>
        </button>

        <div className="mt-6 p-3 rounded-xl bg-dark-900/60 border border-dark-750/80 text-[11px] text-gray-400 font-mono flex items-center justify-between">
          <span>Demo ID: <strong className="text-gray-200">INV-2047</strong></span>
          <span>Password: <strong className="text-gray-200">demo123</strong></span>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 font-mono">
        Synthetic demonstration data • No live blockchain or government-system integrations
      </div>
    </div>
  );
}
