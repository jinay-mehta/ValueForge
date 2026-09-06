import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  RefreshCw, 
  Columns, 
  Check, 
  AlertTriangle, 
  XCircle, 
  Edit3 
} from 'lucide-react';

export default function VPGenerator() {
  const { 
    analysis, 
    selectedVpIdx, 
    setSelectedVpIdx, 
    compareMode, 
    compareSet, 
    toggleCompareMode, 
    toggleCompareSelect, 
    editClaimText, 
    regenerateClaims, 
    setScreen 
  } = useApp();

  if (!analysis || !analysis.vpCandidates) return null;

  const vpList = analysis.vpCandidates;
  const activeVP = vpList[selectedVpIdx] || vpList[0];
  const pci = activeVP.score;

  // PCI gauge stroke calculation
  const dashOffset = Math.max(0, 264 - (pci / 100) * 264);
  const strokeColor = pci >= 80 ? 'var(--teal)' : pci >= 60 ? 'var(--gold)' : 'var(--red)';
  const statusClass = pci >= 80 ? 'pill-green' : pci >= 60 ? 'pill-amber' : 'pill-red';
  const statusText = pci >= 75 ? 'Launch Ready' : pci >= 50 ? 'Refinement Suggested' : 'Rework Required';

  const compareCandidates = compareSet.map(idx => vpList[idx]).filter(Boolean);

  return (
    <section className="vp-view">
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
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Zone C Whitespace</div>
          </div>
        </div>
        <div className="step-item active">
          <div className="step-num"><span>3</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>3. Generate VPs</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>4 candidates</div>
          </div>
        </div>
        <div className="step-item inactive" onClick={() => setScreen('brief')} style={{ cursor: 'pointer' }}>
          <div className="step-num"><span>4</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>4. Positioning Brief</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Decision-ready</div>
          </div>
        </div>
      </div>

      <div className="flex-between mb-4">
        <div>
          <div className="page-title">Value Proposition Generator</div>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            Whitespace Zone · Target Persona: {analysis.persona} · PCI Launch Threshold: 75+
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setScreen('brief')}>
          Build Positioning Brief <ArrowRight size={15} />
        </button>
      </div>

      <div className="flex-between mb-4" style={{ gap: '10px', flexWrap: 'wrap' }}>
        <div className="flex-gap">
          <button className="btn btn-secondary btn-sm" onClick={regenerateClaims}>
            <RefreshCw size={13} /> ↻ Regenerate Claims
          </button>
          <button 
            className={`btn btn-sm ${compareMode ? 'btn-teal' : 'btn-secondary'}`}
            onClick={toggleCompareMode}
          >
            <Columns size={13} /> {compareMode ? 'Exit Compare Mode' : '⚌ Compare Mode'}
          </button>
        </div>
        <span style={{ fontSize: '11.5px', color: 'var(--ink3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Edit3 size={13} /> Click any claim text to edit — score recalculates in real time
        </span>
      </div>

      <div className="vp-layout">
        <div className="vp-list">
          {vpList.map((vp, idx) => {
            const isSelected = selectedVpIdx === idx;
            const inCompare = compareMode && compareSet.includes(idx);
            const pciColor = vp.score >= 80 ? 'var(--teal)' : vp.score >= 60 ? 'var(--gold)' : 'var(--red)';
            const pciBg = vp.score >= 80 ? 'var(--teal-lt)' : vp.score >= 60 ? 'var(--gold-lt)' : 'var(--accent-lt)';

            return (
              <div
                key={idx}
                className={`vp-card ${isSelected ? 'selected' : ''} ${inCompare ? 'in-compare' : ''}`}
                onClick={() => {
                  if (compareMode) {
                    toggleCompareSelect(idx);
                  } else {
                    setSelectedVpIdx(idx);
                  }
                }}
              >
                <div className="flex-between" style={{ marginBottom: '8px' }}>
                  <span className="vp-pci-badge" style={{ background: pciBg, color: pciColor }}>
                    PCI™ {vp.score} — {vp.score >= 75 ? 'Launch Ready' : vp.score >= 50 ? 'Refinement Suggested' : 'Rework Required'}
                  </span>
                  <div className="flex-gap">
                    {compareMode && (
                      <span className={`pill ${inCompare ? 'pill-blue' : 'pill-gray'}`}>
                        {inCompare ? `Compared (${compareSet.indexOf(idx) + 1})` : 'Select to Compare'}
                      </span>
                    )}
                    <span className="pill pill-green" style={{ textTransform: 'capitalize' }}>
                      {vp.tone} framing
                    </span>
                  </div>
                </div>

                {/* Inline Editable Claim */}
                <div
                  className="vp-claim"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => editClaimText(idx, e.currentTarget.textContent)}
                  onClick={(e) => e.stopPropagation()}
                  title="Click to edit claim text"
                  style={{ outline: 'none', borderBottom: '1px dashed rgba(0,0,0,0.15)', paddingBottom: '2px' }}
                >
                  {vp.claim}
                </div>

                <div className="vp-scores">
                  <div className="score-item">
                    <div className="score-label">Emotional Pull</div>
                    <div className="score-bar">
                      <div className="score-fill teal" style={{ width: `${vp.dims.personaFit}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.dims.personaFit}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Novelty</div>
                    <div className="score-bar">
                      <div className="score-fill teal" style={{ width: `${vp.dims.novelty}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.dims.novelty}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Comp. Gap</div>
                    <div className="score-bar">
                      <div className="score-fill teal" style={{ width: `${vp.dims.competitiveGap}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.dims.competitiveGap}%</div>
                  </div>
                  <div className="score-item">
                    <div className="score-label">Freshness</div>
                    <div className="score-bar">
                      <div className="score-fill teal" style={{ width: `${vp.dims.freshness}%` }}></div>
                    </div>
                    <div className="score-pct">{vp.dims.freshness}%</div>
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
        </div>

        {/* Right Panel */}
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
              {statusText}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--ink3)', marginTop: '6px' }}>
              Score ≥ 75 indicates validated launch viability.<br />Select or edit any claim to update live.
            </div>
          </div>

          <div className="card-sm">
            <div className="section-label" style={{ marginBottom: '12px' }}>Dimension Breakdown</div>
            <div className="dim-row">
              <span className="dim-label">Persona Fit</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.dims.personaFit}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.dims.personaFit}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Novelty Score</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.dims.novelty}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.dims.novelty}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Competitive Gap</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.dims.competitiveGap}%</span>
            </div>
            <div className="dim-bar-wrap">
              <div className="dim-bar" style={{ width: `${activeVP.dims.competitiveGap}%`, background: strokeColor }}></div>
            </div>

            <div className="dim-row">
              <span className="dim-label">Claim Freshness</span>
              <span className="dim-val" style={{ color: strokeColor }}>{activeVP.dims.freshness}%</span>
            </div>
            <div className="dim-bar-wrap" style={{ marginBottom: 0 }}>
              <div className="dim-bar" style={{ width: `${activeVP.dims.freshness}%`, background: strokeColor }}></div>
            </div>
          </div>

          {/* Compare Panel when Active */}
          {compareMode && compareCandidates.length === 2 && (
            <div className="card-sm" style={{ background: 'var(--blue-lt)', borderColor: '#b6d3f2' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Head-to-Head Comparison
              </div>
              <div style={{ fontSize: '11.5px', marginBottom: '6px' }}>
                <strong>Claim A (PCI {compareCandidates[0].score}):</strong> "{compareCandidates[0].claim}"
              </div>
              <div style={{ fontSize: '11.5px', marginBottom: '8px' }}>
                <strong>Claim B (PCI {compareCandidates[1].score}):</strong> "{compareCandidates[1].claim}"
              </div>
              <div style={{ fontSize: '11px', color: 'var(--ink2)', lineHeight: 1.4 }}>
                {compareCandidates[0].score > compareCandidates[1].score
                  ? `Claim A outperforms Claim B by +${compareCandidates[0].score - compareCandidates[1].score} PCI points due to stronger ${compareCandidates[0].tone} resonance.`
                  : `Claim B outperforms Claim A by +${compareCandidates[1].score - compareCandidates[0].score} PCI points.`}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
