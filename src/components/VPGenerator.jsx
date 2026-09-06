import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles, Check, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';

export default function VPGenerator() {
  const { analysis, selectVP, rescoreClaim, setScreen } = useApp();
  const [customInput, setCustomInput] = useState(analysis.activeVP.claim);

  const activeVP = analysis.activeVP;
  const pci = activeVP.pci;

  // PCI gauge stroke calculation: 2 * PI * 42 = ~263.89
  const dashOffset = Math.max(0, 264 - (pci / 100) * 264);
  const strokeColor = pci >= 80 ? 'var(--teal)' : pci >= 60 ? 'var(--gold)' : 'var(--red)';
  const statusClass = pci >= 80 ? 'pill-green' : pci >= 60 ? 'pill-amber' : 'pill-red';

  const handleSelectVP = (vp) => {
    selectVP(vp);
    setCustomInput(vp.claim);
  };

  const handleRescore = () => {
    rescoreClaim(customInput);
  };

  return (
    <section className="vp-view">
      <div className="flex-between mb-4">
        <div>
          <div className="page-title">Value Proposition Generator</div>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            Whitespace Zone: <strong>{analysis.zone}</strong> · Target Persona: {analysis.personas.join(', ')} · PCI Launch Threshold: 75+
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setScreen('brief')}>
          Build Positioning Brief <ArrowRight size={15} />
        </button>
      </div>

      <div className="vp-layout">
        <div className="vp-list">
          {analysis.vps.map(vp => {
            const isSelected = activeVP.claim === vp.claim;
            const pciColor = vp.pci >= 80 ? 'var(--teal)' : vp.pci >= 60 ? 'var(--gold)' : 'var(--red)';
            const pciBg = vp.pci >= 80 ? 'var(--teal-lt)' : vp.pci >= 60 ? 'var(--gold-lt)' : 'var(--accent-lt)';

            return (
              <div
                key={vp.id}
                className={`vp-card ${vp.type} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectVP(vp)}
              >
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span className="vp-pci-badge" style={{ background: pciBg, color: pciColor }}>
                    PCI™ {vp.pci} — {vp.status}
                  </span>
                  <span className={`pill ${vp.pci >= 80 ? 'pill-green' : vp.pci >= 60 ? 'pill-amber' : 'pill-red'}`}>
                    {vp.badge}
                  </span>
                </div>

                <div className="vp-claim">"{vp.claim}"</div>

                <div className="vp-scores">
                  <div className="score-item">
                    <div className="score-label">Emotional Pull</div>
                    <div className="score-bar">
                      <div className={`score-fill ${vp.pull >= 80 ? 'teal' : vp.pull >= 60 ? 'gold' : 'red'}`} style={{ width: `${vp.pull}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.pull}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Novelty</div>
                    <div className="score-bar">
                      <div className={`score-fill ${vp.nov >= 80 ? 'teal' : vp.nov >= 60 ? 'gold' : 'red'}`} style={{ width: `${vp.nov}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.nov}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Persona Fit</div>
                    <div className="score-bar">
                      <div className={`score-fill ${vp.fit >= 80 ? 'teal' : vp.fit >= 60 ? 'gold' : 'red'}`} style={{ width: `${vp.fit}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.fit}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Comp. Gap</div>
                    <div className="score-bar">
                      <div className={`score-fill ${vp.gap >= 80 ? 'teal' : vp.gap >= 60 ? 'gold' : 'red'}`} style={{ width: `${vp.gap}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.gap}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Freshness</div>
                    <div className="score-bar">
                      <div className={`score-fill ${vp.fresh >= 80 ? 'teal' : vp.fresh >= 60 ? 'gold' : 'red'}`} style={{ width: `${vp.fresh}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.fresh}%</div>
                  </div>
                </div>

                <div className="vp-flags">
                  {vp.flags.map((flg, i) => (
                    <div key={i} className={`flag ${flg.type === 'ok' ? 'flag-ok' : flg.type === 'warn' ? 'flag-warn' : 'flag-danger'}`}>
                      <span className="flag-icon">
                        {flg.type === 'ok' ? <Check size={13} /> : flg.type === 'warn' ? <AlertTriangle size={13} /> : <XCircle size={13} />}
                      </span>
                      <span>{flg.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Interactive Claim Forge Editor */}
          <div className="claim-editor-box">
            <label>⚡ Test & Rescore a Custom Value Proposition in Real Time:</label>
            <div className="claim-editor-row">
              <input
                className="form-input"
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter or refine your own claim to rescore…"
                onKeyDown={(e) => { if (e.key === 'Enter') handleRescore(); }}
              />
              <button className="btn btn-teal btn-sm" onClick={handleRescore}>
                <RefreshCw size={13} /> Rescore Claim
              </button>
            </div>
          </div>
        </div>

        {/* Right panel — Live PCI meter */}
        <div className="rhs-panel">
          <div className="pci-meter">
            <div className="section-label" style={{ marginBottom: '12px' }}>Positioning Confidence Index™</div>
            <div className="pci-ring-wrap">
              <svg className="pci-ring-svg" width="104" height="104" viewBox="0 0 100 100">
                <circle className="pci-ring-bg" cx="50" cy="50" r="42" />
                <circle
                  className="pci-ring-fill"
                  cx="50"
                  cy="50"
                  r="42"
                  style={{
                    stroke: strokeColor,
                    strokeDashoffset: dashOffset
                  }}
                />
              </svg>
              <div className="pci-num">
                <div className="n" style={{ color: strokeColor }}>{pci}</div>
                <div className="s">/ 100</div>
              </div>
            </div>
            <div className={`pill ${statusClass}`} style={{ marginBottom: '4px' }}>
              {activeVP.status}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ink3)', marginTop: '6px' }}>
              PCI ≥ 75 indicates validated launch viability.<br />Select any VP card or test custom claims.
            </div>
          </div>

          <div className="card-sm">
            <div className="section-label" style={{ marginBottom: '12px' }}>Dimension Breakdown</div>
            <div className="dim-row">
              <span className="dim-label">Emotional Pull</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.pull}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.pull}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Novelty Score</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.nov}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.nov}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Persona Fit</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.fit}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.fit}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Competitive Gap</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.gap}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.gap}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Claim Freshness</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.fresh}%</span>
            </div>
            <div className="dim-bar-wrap" style={{ marginBottom: 0 }}>
              <div className="dim-bar" style={{ width: `${activeVP.fresh}%`, background: strokeColor }}></div>
            </div>
          </div>

          <div className="card-sm" style={{ background: 'var(--gold-lt)', borderColor: '#e8c96b' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#7A4F00', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Selected Whitespace
            </div>
            <div style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--teal)', marginBottom: '4px' }}>
              {analysis.zone} ★
            </div>
            <div style={{ fontSize: '12px', color: '#5C3D00', lineHeight: 1.55 }}>
              High consumer desire · Low competitive density · 0 direct competitor SKUs at this claim intersection.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
