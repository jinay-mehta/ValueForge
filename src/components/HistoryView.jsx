import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search } from 'lucide-react';

export default function HistoryView() {
  const { historyList, loadHistoryItem } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredHistory = historyList.filter(item => {
    // Status filter
    if (filter !== 'all' && item.status !== filter) return false;
    // Query search
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.concept.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.persona.toLowerCase().includes(q)
    );
  });

  return (
    <section className="history-view">
      <div className="page-title">Analysis History</div>
      <div className="page-sub">All ValueForge™ differentiation analyses run across your portfolio.</div>

      <div className="card">
        <div className="flex-between mb-4" style={{ flexWrap: 'wrap', gap: '12px' }}>
          <div className="search-box" style={{ display: 'flex', alignItems: 'center', background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '6px', padding: '6px 10px', gap: '8px', maxWidth: '300px', width: '100%' }}>
            <Search size={14} color="var(--ink3)" />
            <input
              type="text"
              placeholder="Search by concept or category…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12.5px', width: '100%' }}
            />
          </div>

          <div className="flex-gap">
            <button
              className={`preset-btn ${filter === 'all' ? 'active' : ''}`}
              style={filter === 'all' ? { borderColor: 'var(--accent)', color: 'var(--accent)' } : {}}
              onClick={() => setFilter('all')}
            >
              All ({historyList.length})
            </button>
            <button
              className={`preset-btn ${filter === 'ready' ? 'active' : ''}`}
              style={filter === 'ready' ? { borderColor: 'var(--teal)', color: 'var(--teal)' } : {}}
              onClick={() => setFilter('ready')}
            >
              Launch Ready
            </button>
            <button
              className={`preset-btn ${filter === 'progress' ? 'active' : ''}`}
              style={filter === 'progress' ? { borderColor: 'var(--gold)', color: 'var(--gold)' } : {}}
              onClick={() => setFilter('progress')}
            >
              In Progress
            </button>
            <button
              className={`preset-btn ${filter === 'rework' ? 'active' : ''}`}
              style={filter === 'rework' ? { borderColor: 'var(--red)', color: 'var(--red)' } : {}}
              onClick={() => setFilter('rework')}
            >
              Rework Needed
            </button>
          </div>
        </div>

        <table className="recent-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Concept</th>
              <th>Category</th>
              <th>Target Persona</th>
              <th>PCI</th>
              <th>Zone</th>
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
                <tr key={idx}>
                  <td>{item.date}</td>
                  <td><strong>{item.concept}</strong></td>
                  <td>{item.category}</td>
                  <td style={{ fontSize: '12px', color: 'var(--ink3)' }}>{item.persona}</td>
                  <td><span className={`pci-pill ${pciClass}`}>{item.pci}</span></td>
                  <td>
                    <span className="zone-dot" style={{ background: zoneColor }}></span>
                    Zone {item.zone}
                  </td>
                  <td><span className={`pill ${pillClass}`}>{statusLabel}</span></td>
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

        {filteredHistory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--ink3)' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⌕</div>
            <div style={{ fontWeight: 600, color: 'var(--ink2)' }}>No matching analyses</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>Try a different search query or filter</div>
          </div>
        )}
      </div>
    </section>
  );
}
