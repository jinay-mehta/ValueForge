import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, Plus } from 'lucide-react';

export default function Topbar({ onToggleSidebar }) {
  const { screen, setScreen } = useApp();

  const screenTitles = {
    'dashboard': 'Dashboard',
    'new-analysis': 'New Analysis — Step 1: Define Concept',
    'processing': 'Running Differentiation Genome™ Analysis…',
    'whitespace': 'Step 2: Whitespace Map',
    'vp-generator': 'Step 3: Value Proposition Generator',
    'brief': 'Step 4: Positioning Brief',
    'history': 'Analysis History'
  };

  return (
    <header className="topbar">
      <button className="mobile-toggle" onClick={onToggleSidebar} aria-label="Toggle navigation">
        <Menu size={20} />
      </button>

      <div className="topbar-breadcrumb">
        ValueForge™ › <span>{screenTitles[screen] || 'Dashboard'}</span>
      </div>

      <div className="topbar-right">
        <div className="badge-beta">PROTOTYPE v1.0</div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setScreen('new-analysis')}
        >
          <Plus size={14} /> New Analysis
        </button>
      </div>
    </header>
  );
}
