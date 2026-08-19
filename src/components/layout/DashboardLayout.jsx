import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ToastContainer from '../common/ToastContainer';
import FooterDisclaimer from '../common/FooterDisclaimer';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col">
      {/* Sidebar */}
      <Sidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Container */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <TopBar 
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* Synthetic Data Disclaimer Footer */}
        <FooterDisclaimer />
      </div>

      {/* Global Toasts */}
      <ToastContainer />
    </div>
  );
}
