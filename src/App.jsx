import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import InvestigationsPage from './pages/InvestigationsPage';
import InvestigationDetailPage from './pages/InvestigationDetailPage';
import WalletIntelligencePage from './pages/WalletIntelligencePage';
import TransactionMonitorPage from './pages/TransactionMonitorPage';
import TransactionNetworkPage from './pages/TransactionNetworkPage';
import RiskAlertsPage from './pages/RiskAlertsPage';
import EntityIntelligencePage from './pages/EntityIntelligencePage';
import CasesPage from './pages/CasesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import NotificationPanel from './components/notifications/NotificationPanel';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Screen */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Dashboard Workspace */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="investigations" element={<InvestigationsPage />} />
            <Route path="investigations/:id" element={<InvestigationDetailPage />} />
            <Route path="wallet-intelligence" element={<WalletIntelligencePage />} />
            <Route path="transaction-monitor" element={<TransactionMonitorPage />} />
            <Route path="risk-alerts" element={<RiskAlertsPage />} />
            <Route path="entity-intelligence" element={<EntityIntelligencePage />} />
            <Route path="transaction-network" element={<TransactionNetworkPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="notifications" element={<NotificationPanel />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
