import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { 
  Download, 
  Copy, 
  Share2, 
  FileSpreadsheet, 
  Printer, 
  Check, 
  AlertTriangle, 
  Paintbrush, 
  Send, 
  FlaskConical, 
  PlusCircle 
} from 'lucide-react';

export default function PositioningBrief() {
  const { 
    analysis, 
    selectedPocketIdx, 
    selectedVpIdx, 
    exportPDF, 
    copyMarkdown, 
    exportCSV, 
    shareLink, 
    setScreen, 
    showNotification 
  } = useApp();

  if (!analysis || !analysis.vpCandidates) return null;

  const catData = CATEGORIES[analysis.category] || CATEGORIES["Functional Beverages"];
  const activeVP = analysis.vpCandidates[selectedVpIdx] || analysis.vpCandidates[0];
  const activePocket = analysis.pockets[selectedPocketIdx] || analysis.pockets[0];
  const pci = activeVP.score;
  const strokeColor = pci >= 80 ? 'var(--teal)' : pci >= 60 ? 'var(--gold)' : 'var(--red)';
  const statusText = pci >= 75 ? 'Launch Ready' : pci >= 50 ? 'Refinement Suggested' : 'Rework Required';

  const dateStr = analysis.generatedAt
    ? new Date(analysis.generatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'June 2025';

  const ingredient = (analysis.inputs.ingredients && analysis.inputs.ingredients[0]) || catData.defaultIngredient;

  // Build dynamic RTBs
  const rtbs = [
    `Formulated specifically with ${ingredient} to deliver verified ${catData.benefit}.`,
    `Designed for the ${catData.moment} occasion — directly addressing the primary need-state of ${analysis.persona}.`,
    `Zero category competitors combine "${activeVP.tone}" framing with this benefit proposition.`,
    `Clean-label execution with third-party tested bioactives and full compliance standards.`
  ];

  return (
    <section className="brief-view" id="brief-print-area">
      <div className="steps-bar">
        <div className="step-item done" onClick={() => setScreen('new-analysis')} style={{ cursor: 'pointer' }}>
          <div className="step-num"><span>✓</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>1. Define Concept</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>{analysis.inputs.concept}</div>
          </div>
        </div>
        <div className="step-item done" onClick={() => setScreen('whitespace')} style={{ cursor: 'pointer' }}>
          <div className="step-num"><span>✓</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>2. Explore Whitespace</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Zone {activePocket.zone}</div>
          </div>
        </div>
        <div className="step-item done" onClick={() => setScreen('vp-generator')} style={{ cursor: 'pointer' }}>
          <div className="step-num"><span>✓</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>3. Generate VPs</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>PCI {pci}</div>
          </div>
        </div>
        <div className="step-item active">
          <div className="step-num"><span>4</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>4. Positioning Brief</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Decision-ready</div>
          </div>
        </div>
      </div>

      <div className="flex-between mb-4">
        <div>
          <div className="page-title">
            Positioning Brief — <em>{analysis.inputs.concept}</em>
          </div>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            Decision-ready executive brief · {dateStr} · {analysis.category} · {analysis.inputs.market} · {analysis.inputs.price}
          </div>
        </div>
        <div className="flex-gap">
          <button className="btn btn-secondary" onClick={copyMarkdown}>
            <Copy size={14} /> Copy Text
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <Printer size={14} /> Print
          </button>
          <button className="btn btn-primary" onClick={exportPDF}>
            <Download size={14} /> Export PDF
          </button>
        </div>
      </div>

      <div className="brief-hero">
        <div className="eyebrow">
          Recommended Hero Claim · PCI™ {pci} · Zone {activePocket.zone} Whitespace
        </div>
        <div className="claim">
          "{activeVP.claim}"
        </div>
        <div className="brief-pci-row">
          <div className="brief-pci-pill" style={{ background: strokeColor }}>
            PCI™ {pci} — {statusText}
          </div>
          <div className="brief-pci-bar">
            <div className="brief-pci-fill" style={{ width: `${pci}%`, background: strokeColor }}></div>
          </div>
          <div className="brief-zone">★ Zone {activePocket.zone} Whitespace</div>
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
            <div className="claim-tier-text">
              Formulated with {ingredient} for sustained daily {catData.benefit} · Designed for {analysis.persona}
            </div>
          </div>
          <div className="claim-tier tier3">
            <div className="claim-tier-label" style={{ color: 'var(--blue)' }}>Tier 3 — Proof Points & Formulation</div>
            <div className="claim-tier-text">
              Verified bioactive concentration · Lab-tested purity standards · FSSAI & international regulatory compliance
            </div>
          </div>
        </div>

        <div className="brief-section">
          <h4>Risk Flags & Mitigations ({activeVP.flags.length})</h4>
          {activeVP.flags.map((flg, idx) => (
            <div key={idx} className={`risk-row ${flg.type === 'danger' || flg.type === 'warn' ? 'warn' : 'ok'}`}>
              <span style={{ flexShrink: 0, marginTop: '2px' }}>
                {flg.type === 'ok' ? <Check size={14} color="var(--teal)" /> : <AlertTriangle size={14} color="var(--accent)" />}
              </span>
              <div>
                <strong>{flg.type.toUpperCase()}: </strong>{flg.text}
              </div>
            </div>
          ))}
          <div className="risk-row warn">
            <span style={{ flexShrink: 0, marginTop: '2px' }}><AlertTriangle size={14} color="var(--accent)" /></span>
            <div>
              <strong>Visual Alignment:</strong> Ensure packaging aesthetics reflect the "{activeVP.tone}" framing rather than generic clinical tropes.
            </div>
          </div>
        </div>

        <div className="brief-section">
          <h4>Reasons to Believe (RTBs)</h4>
          {rtbs.map((rtb, idx) => (
            <div key={idx} className="rtb-item">
              <div className="rtb-dot"></div>
              <div className="rtb-text">{rtb}</div>
            </div>
          ))}
        </div>

        <div className="brief-section">
          <h4>Next Strategic Actions</h4>
          <div className="next-actions">
            <div className="action-item" onClick={() => showNotification('Packaging design brief initialized')}>
              <span className="action-icon"><Paintbrush size={16} /></span>
              Brief packaging team on {activeVP.tone} visual direction
            </div>
            <div className="action-item" onClick={() => showNotification('Brief exported to creative agency partner')}>
              <span className="action-icon"><Send size={16} /></span>
              Send positioning brief to creative agency
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
          <strong>ValueForge™ Positioning Brief</strong> · {analysis.inputs.concept} · {analysis.inputs.market} · PCI {pci} · {statusText}
        </p>
        <div className="export-btns">
          <button className="btn btn-secondary btn-sm" onClick={exportCSV}>
            <FileSpreadsheet size={13} /> ↓ Competitor Data (CSV)
          </button>
          <button className="btn btn-secondary btn-sm" onClick={shareLink}>
            <Share2 size={13} /> 🔗 Copy Share Link
          </button>
          <button className="btn btn-teal btn-sm" onClick={exportPDF}>
            <Download size={13} /> ↓ Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}
