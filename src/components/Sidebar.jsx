import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Compass, 
  Sparkles, 
  FileText 
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { screen, setScreen, activePersona, activePersonaKey, switchPersona } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'Workspace' },
    { id: 'new-analysis', label: 'New Analysis', icon: PlusCircle, section: 'Workspace' },
    { id: 'history', label: 'History', icon: History, section: 'Workspace' },
    { id: 'whitespace', label: 'Whitespace Map', icon: Compass, section: 'Tools' },
    { id: 'vp-generator', label: 'VP Generator', icon: Sparkles, section: 'Tools' },
    { id: 'brief', label: 'Positioning Brief', icon: FileText, section: 'Tools' }
  ];

  const handleNav = (id) => {
    setScreen(id);
    if (onClose) onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          Value<span>Forge</span>™
        </div>
        <div className="logo-sub">by Ai Palette</div>
      </div>

      <div className="nav-section">Workspace</div>
      {navItems.filter(i => i.section === 'Workspace').map(item => {
        const Icon = item.icon;
        const isActive = screen === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            <span className="icon"><Icon size={16} /></span>
            {item.label}
          </button>
        );
      })}

      <div className="nav-divider"></div>
      <div className="nav-section">Differentiation Engine</div>
      {navItems.filter(i => i.section === 'Tools').map(item => {
        const Icon = item.icon;
        const isActive = screen === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => handleNav(item.id)}
          >
            <span className="icon"><Icon size={16} /></span>
            {item.label}
          </button>
        );
      })}

      <div className="sidebar-footer">
        <div className="persona-picker-title">
          <span>Active Persona</span>
        </div>
        <select
          className="persona-picker-select"
          value={activePersonaKey}
          onChange={(e) => switchPersona(e.target.value)}
        >
          <option value="priya">Priya Sharma (Brand Mgr)</option>
          <option value="david">David Chen (R&D Lead)</option>
          <option value="aigerim">Aigerim Bekova (Insights Dir)</option>
        </select>
        <div className="user-badge">
          <div className="user-avatar">{activePersona.avatar}</div>
          <div>
            <div className="user-name">{activePersona.name}</div>
            <div className="user-role">{activePersona.title} · {activePersona.org}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
