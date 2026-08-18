import React, { createContext, useContext, useState } from 'react';
import { 
  INITIAL_WALLETS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_INVESTIGATIONS, 
  INITIAL_CASES, 
  INITIAL_ALERTS, 
  INITIAL_ENTITIES,
  INITIAL_REPORTS,
  GRAPH_DATA
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    id: 'INV-2047',
    name: 'Lead Inv. Sarah Vance',
    role: 'Senior Cyber Financial Analyst',
    avatar: 'SV',
    department: 'Digital Assets Counter-Laundering Unit'
  });

  const [wallets, setWallets] = useState(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [investigations, setInvestigations] = useState(INITIAL_INVESTIGATIONS);
  const [cases, setCases] = useState(INITIAL_CASES);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [entities, setEntities] = useState(INITIAL_ENTITIES);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [graphData, setGraphData] = useState(GRAPH_DATA);

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // { type, data }
  const [selectedTx, setSelectedTx] = useState(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState(null);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  // Toast Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Actions
  const addCase = (newCase) => {
    const caseObj = {
      id: `CP-2026-0${cases.length + 5}`,
      name: newCase.name,
      priority: newCase.priority || 'High',
      targetWallet: newCase.targetWallet || '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
      riskScore: newCase.riskScore || 90,
      assignedAnalyst: currentUser.name,
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0],
      description: newCase.description
    };
    setCases(prev => [caseObj, ...prev]);
    addToast(`Case "${caseObj.name}" successfully established`, 'success');
  };

  const addAnalystNote = (investigationId, text) => {
    setInvestigations(prev => prev.map(inv => {
      if (inv.id === investigationId) {
        const newNotes = inv.analystNotes ? [...inv.analystNotes] : [];
        newNotes.unshift({
          date: new Date().toLocaleString(),
          author: currentUser.name,
          text
        });
        return { ...inv, analystNotes: newNotes };
      }
      return inv;
    }));
    addToast('Analyst notes recorded in investigation audit trail', 'success');
  };

  const updateInvestigationStatus = (id, newStatus) => {
    setInvestigations(prev => prev.map(inv => inv.id === id ? { ...inv, status: newStatus } : inv));
    addToast(`Investigation ${id} status updated to ${newStatus}`, 'info');
  };

  const markAlertResolved = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a));
    addToast(`Alert ${alertId} marked as resolved`, 'success');
  };

  const generateReport = (reportData) => {
    const newReport = {
      id: `REP-2026-${Math.floor(100 + Math.random() * 900)}`,
      caseId: reportData.caseId || 'CP-2026-004',
      title: reportData.title || 'Evidentiary Synthesis Report',
      targetWallet: reportData.targetWallet || '0x71C8F91A2B5E43C988D3E105634A9F01289EA92F',
      generatedBy: currentUser.name,
      generatedDate: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      riskLevel: reportData.riskLevel || 'CRITICAL',
      status: 'Completed',
      fileSize: '3.6 MB'
    };
    setReports(prev => [newReport, ...prev]);
    addToast('Investigation Report successfully compiled & exported', 'success');
    return newReport;
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      wallets,
      transactions,
      investigations,
      cases,
      alerts,
      entities,
      reports,
      graphData,
      searchQuery,
      setSearchQuery,
      toasts,
      addToast,
      removeToast,
      activeModal,
      setActiveModal,
      selectedTx,
      setSelectedTx,
      selectedGraphNode,
      setSelectedGraphNode,
      unreadNotificationCount,
      setUnreadNotificationCount,
      addCase,
      addAnalystNote,
      updateInvestigationStatus,
      markAlertResolved,
      generateReport
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
