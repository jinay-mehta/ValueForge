import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import NewAnalysis from './components/NewAnalysis';
import ProcessingView from './components/ProcessingView';
import WhitespaceMap from './components/WhitespaceMap';
import VPGenerator from './components/VPGenerator';
import PositioningBrief from './components/PositioningBrief';
import HistoryView from './components/HistoryView';
import NotificationToast from './components/NotificationToast';

export default function App() {
  const { screen } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard />;
      case 'new-analysis':
        return <NewAnalysis />;
      case 'processing':
        return <ProcessingView />;
      case 'whitespace':
        return <WhitespaceMap />;
      case 'vp-generator':
        return <VPGenerator />;
      case 'brief':
        return <PositioningBrief />;
      case 'history':
        return <HistoryView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="shell">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="main">
        <Topbar onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} />
        <div className="screen-area">
          {renderScreen()}
        </div>
      </main>

      <NotificationToast />
    </div>
  );
}
