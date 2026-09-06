import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const { activePersona, setScreen, loadPreset, historyList } = useApp();

  return (
    <section className="dashboard-view">
      <div className="hero-banner">
        <div className="hero-text">
          <h2>{activePersona.welcome}</h2>
          <p>
            {activePersona.desc} Your active portfolio Positioning Confidence Index™ stands at{' '}
            <strong style={{ color: 'var(--teal)' }}>88 / 100</strong> — launch ready.
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
          <div className="num accent">88</div>
          <div className="lbl">Avg. Positioning Confidence Index™ (PCI)</div>
          <div className="change up">↑ +12 pts vs last quarter</div>
        </div>
        <div className="stat-card">
          <div className="num teal">4</div>
          <div className="lbl">Whitespace Zones Identified (Last 30 Days)</div>
          <div className="change up">↑ 2 newly surfaced this week</div>
        </div>
        <div className="stat-card">
          <div className="num gold">7</div>
          <div className="lbl">Total Analyses Run</div>
          <div className="change">3 executive briefs exported</div>
        </div>
      </div>

      <div className="card">
        <div className="flex-between mb-4">
          <div className="section-label" style={{ margin: 0 }}>Recent Category Analyses</div>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setScreen('history')}
          >
            View all ({historyList.length})
          </button>
        </div>

        <table className="recent-table">
          <thead>
            <tr>
              <th>Product Concept</th>
              <th>Category</th>
              <th>Whitespace Zone</th>
              <th>PCI Score</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyList.map(item => {
              const zoneColor = item.zone === 'C' ? 'var(--teal)' : item.zone === 'B' ? 'var(--gold)' : 'var(--red)';
              const pciClass = item.pci >= 80 ? 'pci-high' : item.pci >= 60 ? 'pci-mid' : 'pci-low';
              const pillClass = item.status === 'Exported' || item.status === 'Brief Ready' ? 'pill-green' : item.status === 'In Progress' ? 'pill-amber' : 'pill-red';

              return (
                <tr key={item.id} style={{ cursor: 'pointer' }}>
                  <td><strong>{item.concept}</strong></td>
                  <td>{item.category}</td>
                  <td>
                    <span className="zone-dot" style={{ background: zoneColor }}></span>
                    Zone {item.zone} {item.zone === 'C' ? '— Whitespace' : item.zone === 'B' ? '— Contested' : '— Saturated'}
                  </td>
                  <td>
                    <span className={`pci-pill ${pciClass}`}>{item.pci}</span>
                  </td>
                  <td>
                    <span className={`pill ${pillClass}`}>{item.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => loadPreset(item.presetKey, 'brief')}
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
