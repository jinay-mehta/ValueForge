import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Download, 
  Copy, 
  FileText, 
  AlertTriangle, 
  Check, 
  Paintbrush, 
  Send, 
  FlaskConical, 
  PlusCircle 
} from 'lucide-react';

export default function PositioningBrief() {
  const { 
    analysis, 
    exportPDF, 
    copyMarkdown, 
    exportJSON, 
    setScreen, 
    showNotification 
  } = useApp();

  const activeVP = analysis.activeVP;
  const pci = activeVP.pci;
  const strokeColor = pci >= 80 ? 'var(--teal)' : pci >= 60 ? 'var(--gold)' : 'var(--red)';

  return (
    <section className="brief-view" id="brief-print-area">
      <div className="flex-between mb-4">
        <div>
          <div className="page-title">
            Positioning Brief — <em>{analysis.concept}</em>
          </div>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            Decision-ready brief · Verified via Ai Palette 500M+ signal spine · {analysis.market} · {analysis.price}
          </div>
        </div>
        <div className="flex-gap">
          <button className="btn btn-secondary" onClick={copyMarkdown}>
            <Copy size={14} /> Copy Brief
          </button>
          <button className="btn btn-primary" onClick={exportPDF}>
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      <div className="brief-hero">
        <div className="eyebrow">
          Recommended Hero Claim · PCI™ {pci} · {analysis.zone}
        </div>
        <div className="claim">
          "{activeVP.claim}"
        </div>
        <div className="brief-pci-row">
          <div className="brief-pci-pill" style={{ background: strokeColor }}>
            PCI™ {pci} — {activeVP.status}
          </div>
          <div className="brief-pci-bar">
            <div className="brief-pci-fill" style={{ width: `${pci}%`, background: strokeColor }}></div>
          </div>
          <div className="brief-zone">★ {analysis.zone}</div>
        </div>
      </div>

      <div className="brief-layout mt-4">
        <div className="brief-section">
          <h4>Claim Hierarchy™</h4>
          <div className="claim-tier tier1">
            <div className="claim-tier-label" style={{ color: 'var(--teal)' }}>Tier 1 — Hero Claim</div>
            <div className="claim-tier-text">"{activeVP.claim}"</div>
          </div>
          <div className="claim-tier tier2">
            <div className="claim-tier-label" style={{ color: 'var(--gold)' }}>Tier 2 — Supporting Claims</div>
            <div className="claim-tier-text">{analysis.tier2}</div>
          </div>
          <div className="claim-tier tier3">
            <div className="claim-tier-label" style={{ color: 'var(--blue)' }}>Tier 3 — Proof Points & Formulations</div>
            <div className="claim-tier-text">{analysis.tier3}</div>
          </div>
        </div>

        <div className="brief-section">
          <h4>Risk Flags & Mitigations ({analysis.risks.length})</h4>
          {analysis.risks.map((rk, idx) => (
            <div key={idx} className={`risk-row ${rk.type === 'danger' || rk.type === 'warn' ? 'warn' : 'ok'}`}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}>
                {rk.type === 'ok' ? <Check size={14} color="var(--teal)" /> : <AlertTriangle size={14} color="var(--accent)" />}
              </span>
              <div>
                <strong>{rk.title}: </strong>{rk.desc}
              </div>
            </div>
          ))}
        </div>

        <div className="brief-section">
          <h4>Reasons to Believe (RTBs)</h4>
          {analysis.rtbs.map((rtb, idx) => (
            <div key={idx} className="rtb-item">
              <div className="rtb-dot"></div>
              <div className="rtb-text">{rtb}</div>
            </div>
          ))}
        </div>

        <div className="brief-section">
          <h4>Next Strategic Actions</h4>
          <div className="next-actions">
            <div className="action-item" onClick={() => showNotification('Packaging brief initialized')}>
              <span className="action-icon"><Paintbrush size={16} /></span>
              Brief packaging team on Ritual visual direction
            </div>
            <div className="action-item" onClick={() => showNotification('Brief exported to creative agency!')}>
              <span className="action-icon"><Send size={16} /></span>
              Send brief to creative agency partner
            </div>
            <div className="action-item" onClick={() => showNotification('Screen Winner virtual testing session started')}>
              <span className="action-icon"><FlaskConical size={16} /></span>
              Run virtual concept test in Screen Winner
            </div>
            <div className="action-item" onClick={() => setScreen('new-analysis')}>
              <span className="action-icon"><PlusCircle size={16} /></span>
              Start a new ValueForge analysis
            </div>
          </div>
        </div>
      </div>

      <div className="export-bar">
        <p>
          <strong>ValueForge™ Positioning Brief</strong> · {analysis.concept} · {analysis.market} · PCI {pci} · {activeVP.status}
        </p>
        <div className="export-btns">
          <button className="btn btn-secondary btn-sm" onClick={exportJSON}>
            <Download size={13} /> Download JSON
          </button>
          <button className="btn btn-teal btn-sm" onClick={copyMarkdown}>
            <Copy size={13} /> Copy Markdown
          </button>
          <button className="btn btn-primary btn-sm" onClick={exportPDF}>
            <Download size={13} /> Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}
