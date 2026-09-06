import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export default function WhitespaceMap() {
  const { analysis, selectedPocketIdx, setSelectedPocketIdx, setScreen } = useApp();
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  if (!analysis) return null;

  const catData = CATEGORIES[analysis.category] || CATEGORIES["Functional Beverages"];
  const competitors = analysis.competitors || [];
  const pockets = analysis.pockets || [];
  const selectedPocket = pockets[selectedPocketIdx] || pockets[0];

  // Map coordinate conversion: plot width 480, height 320, padding 50
  const mapWidth = 480;
  const mapHeight = 310;
  const originX = 50;
  const originY = 20;

  // Function to map (desire, crowding) to SVG (x, y)
  // X = Consumer Desire Intensity (0.2 -> 1.0)
  // Y = Competitive Density (1.0 at top, 0.0 at bottom)
  const getCoords = (desire, crowding, jitterX = 0, jitterY = 0) => {
    const normX = Math.max(0.1, Math.min(0.95, desire + jitterX));
    const normY = Math.max(0.1, Math.min(0.95, crowding + jitterY));

    const x = originX + normX * mapWidth;
    const y = originY + (1 - normY) * mapHeight;
    return { x, y };
  };

  // Find most crowded tone for the warning box
  const worstTone = Object.keys(analysis.toneCounts).reduce((a, b) => 
    (analysis.toneCounts[a] > analysis.toneCounts[b] ? a : b), 'clinical'
  );
  const worstCount = analysis.toneCounts[worstTone];
  const worstExamples = catData.competitors
    .filter(c => c.tone === worstTone)
    .slice(0, 3)
    .map(c => c.name)
    .join(', ');

  const handleMouseEnter = (e, name, tone) => {
    const wrap = e.currentTarget.closest('.map-svg-wrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const svgRect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: `${name} · ${tone.toUpperCase()} framing`,
      x: svgRect.left - rect.left + svgRect.width / 2,
      y: svgRect.top - rect.top - 40
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // User product coordinates based on selected pocket
  const targetCoords = getCoords(
    selectedPocket.tone === 'ritual' ? 0.88 : selectedPocket.tone === 'social' ? 0.75 : 0.65,
    selectedPocket.zone === 'C' ? 0.25 : 0.55
  );

  return (
    <section className="whitespace-view">
      <div className="steps-bar">
        <div className="step-item done" onClick={() => setScreen('new-analysis')} style={{ cursor: 'pointer' }}>
          <div className="step-num"><span>✓</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>1. Define Concept</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>{analysis.inputs.concept}</div>
          </div>
        </div>
        <div className="step-item active">
          <div className="step-num"><span>2</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>2. Explore Whitespace</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>{analysis.category}</div>
          </div>
        </div>
        <div className="step-item inactive" onClick={() => setScreen('vp-generator')} style={{ cursor: 'pointer' }}>
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
          <div className="page-title">
            Whitespace Map — <em>{analysis.category} · {analysis.inputs.market}</em>
          </div>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            {competitors.length} competitor SKUs mapped for "{analysis.inputs.concept}". {pockets.length} Positioning Pockets™ surfaced.
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setScreen('vp-generator')}>
          Generate Value Props <ArrowRight size={15} />
        </button>
      </div>

      <div className="results-layout">
        <div className="map-container">
          <div className="map-legend">
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--red)' }}></div>Zone A: Overcrowded</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--gold)' }}></div>Zone B: Contested</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--teal)' }}></div>Zone C: Whitespace ★</div>
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--blue)' }}></div>Zone D: Under-served</div>
            <div className="legend-item" style={{ marginLeft: 'auto' }}>
              <span style={{ fontSize: '11px', color: 'var(--ink3)' }}>{competitors.length} SKUs analyzed</span>
            </div>
          </div>

          <div className="map-svg-wrap">
            {tooltip.visible && (
              <div
                className="zone-tooltip visible"
                style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
              >
                {tooltip.text}
              </div>
            )}

            <svg viewBox="0 0 560 360" xmlns="http://www.w3.org/2000/svg">
              {/* Quadrant backgrounds */}
              <rect x="50" y="20" width="230" height="160" rx="6" fill="rgba(163,45,45,0.08)" stroke="rgba(163,45,45,0.3)" strokeWidth="1" />
              <rect x="290" y="20" width="240" height="160" rx="6" fill="rgba(212,160,23,0.07)" stroke="rgba(212,160,23,0.3)" strokeWidth="1" />
              <rect x="50" y="190" width="230" height="150" rx="6" fill="rgba(24,95,165,0.07)" stroke="rgba(24,95,165,0.25)" strokeWidth="1" />
              <rect x="290" y="190" width="240" height="150" rx="6" fill="rgba(15,110,86,0.1)" stroke="rgba(15,110,86,0.5)" strokeWidth="2" strokeDasharray="6 3" />

              {/* Labels */}
              <text x="165" y="40" textAnchor="middle" fontSize="10" fill="rgba(163,45,45,0.8)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE A · OVERCROWDED</text>
              <text x="410" y="40" textAnchor="middle" fontSize="10" fill="rgba(212,160,23,0.85)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE B · CONTESTED</text>
              <text x="165" y="210" textAnchor="middle" fontSize="10" fill="rgba(24,95,165,0.75)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE D · UNDER-SERVED</text>
              <text x="410" y="210" textAnchor="middle" fontSize="10" fill="rgba(15,110,86,0.85)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE C · WHITESPACE</text>

              {/* Dynamically Plotted Competitor SKUs */}
              {competitors.map((c, i) => {
                const pt = getCoords(c.desire, c.crowding, c.jitterX, c.jitterY);
                const isOvercrowded = c.crowding > 0.6;
                const fill = isOvercrowded
                  ? (c.desire > 0.5 ? 'rgba(212,160,23,0.22)' : 'rgba(201,66,10,0.2)')
                  : (c.desire > 0.5 ? 'rgba(15,110,86,0.22)' : 'rgba(24,95,165,0.2)');
                const stroke = isOvercrowded
                  ? (c.desire > 0.5 ? 'rgba(212,160,23,0.6)' : 'rgba(201,66,10,0.6)')
                  : (c.desire > 0.5 ? 'rgba(15,110,86,0.6)' : 'rgba(24,95,165,0.5)');
                const radius = 10 + c.crowding * 8;

                return (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r={radius}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="1.2"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={(e) => handleMouseEnter(e, c.name, c.tone)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}

              {/* Zone C Star */}
              <text x="410" y="275" textAnchor="middle" fontSize="38" fill="rgba(212,160,23,0.9)">★</text>
              <circle cx="410" cy="273" r="34" fill="none" stroke="rgba(15,110,86,0.4)" strokeWidth="2" strokeDasharray="6 3" />

              {/* Dynamically Plotted "Your Product" Target */}
              <circle cx={targetCoords.x} cy={targetCoords.y} r="14" fill="rgba(15,110,86,0.25)" stroke="var(--teal)" strokeWidth="2.5" />
              <circle cx={targetCoords.x} cy={targetCoords.y} r="5" fill="var(--teal)" />
              <text x={targetCoords.x} y={targetCoords.y + 22} textAnchor="middle" fontSize="9" fill="var(--teal)" fontFamily="DM Sans" fontWeight="700">YOUR PRODUCT</text>

              {/* Coordinates */}
              <line x1="50" y1="352" x2="530" y2="352" stroke="#ccc" strokeWidth="1" />
              <line x1="38" y1="20" x2="38" y2="352" stroke="#ccc" strokeWidth="1" />
              <text x="290" y="364" textAnchor="middle" fontSize="10.5" fill="#777" fontFamily="DM Sans">Consumer Desire Intensity →</text>
              <text x="22" y="186" textAnchor="middle" fontSize="10.5" fill="#777" fontFamily="DM Sans" transform="rotate(-90,22,186)">← Competitive Density</text>
            </svg>
          </div>
        </div>

        <div className="results-sidebar">
          <div className="section-label">Recommended Positioning Pockets™</div>

          {pockets.map((pkt, idx) => {
            const isSelected = selectedPocketIdx === idx;
            const isZoneC = pkt.zone === 'C';
            const cardClass = isZoneC ? 'zone-c' : 'zone-b';
            const scoreColor = isZoneC ? 'var(--teal)' : 'var(--gold)';

            return (
              <div
                key={idx}
                className={`whitespace-card ${cardClass} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedPocketIdx(idx)}
              >
                <div className="ws-card-header">
                  <div>
                    <div className="ws-card-score" style={{ color: scoreColor }}>{pkt.score}</div>
                    <div style={{ fontSize: '10px', color: 'var(--ink3)', fontWeight: 600 }}>OPPORTUNITY SCORE</div>
                  </div>
                  <div className={`ws-card-badge ${pkt.recommended ? 'badge-rec' : 'badge-alt'}`}>
                    {pkt.recommended ? '★ Recommended' : 'Alternative'}
                  </div>
                </div>
                <div className="ws-card-title">{pkt.title}</div>
                <div className="ws-card-desc">{pkt.desc}</div>
                <div className="ws-card-tags">
                  <span className="ws-tag" style={{ background: isZoneC ? 'var(--teal-lt)' : 'var(--gold-lt)', color: isZoneC ? 'var(--teal)' : '#7A4F00' }}>
                    Zone {pkt.zone}
                  </span>
                  <span className="ws-tag" style={{ background: 'var(--gray-lt)', color: 'var(--ink3)' }}>
                    {pkt.competitorCount} direct competitor{pkt.competitorCount === 1 ? '' : 's'}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="card-sm" style={{ background: 'var(--red-lt)', borderColor: '#e8aaaa' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={14} /> Avoid — Zone A Overcrowded
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink2)', lineHeight: 1.5 }}>
              <strong>{worstTone.toUpperCase()}</strong> framing is used by {worstCount} SKUs ({worstExamples}). Entering here requires 10× paid media spend.
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setScreen('vp-generator')}>
            Generate VPs for Selected Pocket <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
