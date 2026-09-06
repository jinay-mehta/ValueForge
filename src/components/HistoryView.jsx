import React from 'react';
import { useApp } from '../context/AppContext';

export default function HistoryView() {
  const { historyList, loadPreset } = useApp();

  return (
    <section className="history-view">
      <div className="page-title">Analysis History</div>
      <div className="page-sub">All past ValueForge™ differentiation analyses run across your portfolio.</div>

      <div className="card">
        <table className="recent-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Concept</th>
              <th>Category</th>
              <th>PCI</th>
              <th>Zone</th>
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
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td><strong>{item.concept}</strong></td>
                  <td>{item.category}</td>
                  <td><span className={`pci-pill ${pciClass}`}>{item.pci}</span></td>
                  <td>
                    <span className="zone-dot" style={{ background: zoneColor }}></span>
                    {item.zone}
                  </td>
                  <td><span className={`pill ${pillClass}`}>{item.status}</span></td>
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
