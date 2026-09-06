import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Search } from 'lucide-react';

export default function Dashboard() {
  const { activePersona, setScreen, loadHistoryItem, historyList } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = historyList.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.concept.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.persona.toLowerCase().includes(q)
    );
  });

  const avgPci = historyList.length
    ? Math.round(historyList.reduce((acc, h) => acc + h.pci, 0) / historyList.length)
    : 88;
  const whitespaceCount = historyList.filter(h => h.zone === 'C').length;
  const exportedCount = historyList.filter(h => h.status === 'ready').length;

  return (
    <section className="dashboard-view">
      <div className="hero-banner">
        <div className="hero-text">
          <h2>{activePersona.welcome}</h2>
          <p>
            {activePersona.desc} Your active portfolio Positioning Confidence Index™ stands at{' '}
            <strong style={{ color: 'var(--teal)' }}>{avgPci} / 100</strong> — launch ready.
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setScreen('new-analysis')}
        >
          Start New Analysis <ArrowRight size={15} />
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="num accent">{avgPci}</div>
          <div className="lbl">Avg. Positioning Confidence Index™ (PCI)</div>
          <div className="change up">↑ +12 pts vs last quarter</div>
        </div>
        <div className="stat-card">
          <div className="num teal">{whitespaceCount}</div>
          <div className="lbl">Whitespace Zones Identified (Zone C)</div>
          <div className="change up">↑ {whitespaceCount} unowned territories active</div>
        </div>
        <div className="stat-card">
          <div className="num gold">{historyList.length}</div>
          <div className="lbl">Total Analyses Run</div>
          <div className="change">{exportedCount} executive briefs exported</div>
        </div>
      </div>

      <div className="card">
        <div className="flex-between mb-4" style={{ flexWrap: 'wrap', gap: '10px' }}>
          <div className="section-label" style={{ margin: 0 }}>Recent Category Analyses</div>
          <div className="flex-gap">
            <div className="search-box" style={{ display: 'flex', alignItems: 'center', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '6px', padding: '4px 8px', gap: '6px' }}>
              <Search size={14} color="var(--ink3)" />
              <input
                type="text"
                placeholder="Search analyses…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px' }}
              />
            </div>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setScreen('history')}
            >
              View all ({historyList.length})
            </button>
          </div>
        </div>

        <table className="recent-table">
          <thead>
            <tr>
              <th>Product Concept</th>
              <th>Category</th>
              <th>Target Persona</th>
              <th>Whitespace Zone</th>
              <th>PCI Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((item, idx) => {
              const zoneColor = item.zone === 'C' ? 'var(--teal)' : item.zone === 'B' ? 'var(--gold)' : 'var(--red)';
              const pciClass = item.pci >= 80 ? 'pci-high' : item.pci >= 60 ? 'pci-mid' : 'pci-low';
              const pillClass = item.status === 'ready' ? 'pill-green' : item.status === 'progress' ? 'pill-amber' : 'pill-red';
              const statusLabel = item.status === 'ready' ? 'Launch Ready' : item.status === 'progress' ? 'In Progress' : 'Rework Needed';

              return (
                <tr key={idx} style={{ cursor: 'pointer' }}>
                  <td><strong>{item.concept}</strong></td>
                  <td>{item.category}</td>
                  <td style={{ fontSize: '12px', color: 'var(--ink3)' }}>{item.persona}</td>
                  <td>
                    <span className="zone-dot" style={{ background: zoneColor }}></span>
                    Zone {item.zone} {item.zone === 'C' ? '— Whitespace' : item.zone === 'B' ? '— Contested' : '— Saturated'}
                  </td>
                  <td>
                    <span className={`pci-pill ${pciClass}`}>{item.pci}</span>
                  </td>
                  <td>
                    <span className={`pill ${pillClass}`}>{statusLabel}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => loadHistoryItem(item.concept)}
                    >
                      View Brief
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
