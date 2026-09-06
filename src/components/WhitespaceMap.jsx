import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function WhitespaceMap() {
  const { analysis, setScreen } = useApp();
  const [selectedPocket, setSelectedPocket] = useState('pocket1');
  const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

  const skus = [
    // Zone A (Overcrowded Red)
    { id: 1, cx: 90, cy: 110, r: 18, name: 'Herbalife Shake · Zone A (Overcrowded)' },
    { id: 2, cx: 125, cy: 90, r: 15, name: 'MuscleBlaze Fuel One · Zone A' },
    { id: 3, cx: 155, cy: 120, r: 18, name: 'Fast&Up Plant Protein · Zone A' },
    { id: 4, cx: 195, cy: 100, r: 14, name: 'Amway Nutrilite · Zone A' },
    { id: 5, cx: 220, cy: 130, r: 12, name: 'Ensure Plus Complete · Zone A' },
    { id: 6, cx: 100, cy: 145, r: 11, name: 'Protinex Original · Zone A' },
    { id: 7, cx: 170, cy: 60, r: 13, name: 'RiteBite Max Protein · Zone A' },

    // Zone B (Contested Amber)
    { id: 8, cx: 330, cy: 80, r: 15, name: 'Oziva Plant Protein · Zone B (Contested)' },
    { id: 9, cx: 380, cy: 100, r: 13, name: 'Wellbeing Nutrition Superfood · Zone B' },
    { id: 10, cx: 430, cy: 60, r: 11, name: 'Boldfit Plant Protein · Zone B' },
    { id: 11, cx: 480, cy: 95, r: 12, name: 'YogaBar Protein Plus · Zone B' },
    { id: 12, cx: 350, cy: 145, r: 10, name: 'The Whole Truth Clean Protein · Zone B' },

    // Zone D (Under-Served Blue)
    { id: 13, cx: 95, cy: 265, r: 14, name: 'Regional Organic Sattu Drink · Zone D' },
    { id: 14, cx: 145, cy: 300, r: 11, name: 'Ayurvedic Functional Decoction · Zone D' },
    { id: 15, cx: 200, cy: 260, r: 10, name: 'Herbal Wellness RTD · Zone D' }
  ];

  const handleMouseEnter = (e, name) => {
    const wrap = e.currentTarget.closest('.map-svg-wrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const svgRect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      text: name,
      x: svgRect.left - rect.left + svgRect.width / 2,
      y: svgRect.top - rect.top - 42
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  return (
    <section className="whitespace-view">
      <div className="flex-between mb-4">
        <div>
          <div className="page-title">
            Whitespace Map — <em>{analysis.category} · {analysis.market}</em>
          </div>
          <div className="page-sub" style={{ marginBottom: 0 }}>
            47 competitor SKUs mapped for "{analysis.concept}". 2 Positioning Pockets™ identified.
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
            <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--ink)' }}></div>Your Product</div>
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

              {/* Quadrant Labels */}
              <text x="165" y="40" textAnchor="middle" fontSize="10" fill="rgba(163,45,45,0.8)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE A · OVERCROWDED</text>
              <text x="410" y="40" textAnchor="middle" fontSize="10" fill="rgba(212,160,23,0.85)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE B · CONTESTED</text>
              <text x="165" y="210" textAnchor="middle" fontSize="10" fill="rgba(24,95,165,0.75)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE D · UNDER-SERVED</text>
              <text x="410" y="210" textAnchor="middle" fontSize="10" fill="rgba(15,110,86,0.85)" fontFamily="DM Sans" fontWeight="700" letterSpacing="1">ZONE C · WHITESPACE</text>

              {/* Competitor SKUs */}
              {skus.map(s => {
                const fill = s.cy < 180 
                  ? (s.cx < 280 ? 'rgba(201,66,10,0.18)' : 'rgba(212,160,23,0.2)')
                  : 'rgba(24,95,165,0.16)';
                const stroke = s.cy < 180
                  ? (s.cx < 280 ? 'rgba(201,66,10,0.5)' : 'rgba(212,160,23,0.55)')
                  : 'rgba(24,95,165,0.4)';

                return (
                  <circle
                    key={s.id}
                    cx={s.cx}
                    cy={s.cy}
                    r={s.r}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="1.2"
                    style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
                    onMouseEnter={(e) => handleMouseEnter(e, s.name)}
                    onMouseLeave={handleMouseLeave}
                  />
                );
              })}

              {/* Zone C Whitespace Star & Aura */}
              <text x="410" y="275" textAnchor="middle" fontSize="38" fill="rgba(212,160,23,0.9)">★</text>
              <circle cx="410" cy="273" r="32" fill="none" stroke="rgba(15,110,86,0.4)" strokeWidth="2" strokeDasharray="6 3" />

              {/* Your Product Placement */}
              <circle cx="445" cy="310" r="12" fill="rgba(15,110,86,0.25)" stroke="var(--teal)" strokeWidth="2.5" />
              <circle cx="445" cy="310" r="5" fill="var(--teal)" />
              <text x="445" y="332" textAnchor="middle" fontSize="9.5" fill="var(--teal)" fontFamily="DM Sans" fontWeight="700">YOUR PRODUCT</text>

              {/* Coordinate Axes */}
              <line x1="50" y1="352" x2="530" y2="352" stroke="#ccc" strokeWidth="1" />
              <line x1="38" y1="20" x2="38" y2="352" stroke="#ccc" strokeWidth="1" />
              <text x="290" y="364" textAnchor="middle" fontSize="10.5" fill="#777" fontFamily="DM Sans">Consumer Desire Intensity →</text>
              <text x="22" y="186" textAnchor="middle" fontSize="10.5" fill="#777" fontFamily="DM Sans" transform="rotate(-90,22,186)">← Competitive Density</text>
              <text x="50" y="17" fontSize="9" fill="#aaa" fontFamily="DM Sans">High</text>
              <text x="50" y="348" fontSize="9" fill="#aaa" fontFamily="DM Sans">Low</text>
              <text x="50" y="364" fontSize="9" fill="#aaa" fontFamily="DM Sans">Low</text>
              <text x="500" y="364" fontSize="9" fill="#aaa" fontFamily="DM Sans">High</text>
            </svg>
          </div>
        </div>

        <div className="results-sidebar">
          <div className="section-label">Recommended Positioning Pockets™</div>

          <div
            className={`whitespace-card zone-c ${selectedPocket === 'pocket1' ? 'selected' : ''}`}
            onClick={() => setSelectedPocket('pocket1')}
          >
            <div className="ws-card-header">
              <div>
                <div className="ws-card-score" style={{ color: 'var(--teal)' }}>94</div>
                <div style={{ fontSize: '10px', color: 'var(--ink3)', fontWeight: 600 }}>OPPORTUNITY SCORE</div>
              </div>
              <div className="ws-card-badge badge-rec">★ Recommended</div>
            </div>
            <div className="ws-card-title">Performance + Daily Ritual</div>
            <div className="ws-card-desc">
              High-desire zone with 0 direct competitors using this exact claim intersection. Ritual framing + functional benefits = defensible unowned territory.
            </div>
            <div className="ws-card-tags">
              <span className="ws-tag" style={{ background: 'var(--teal-lt)', color: 'var(--teal)' }}>Zone C</span>
              <span className="ws-tag" style={{ background: 'var(--gray-lt)', color: 'var(--ink3)' }}>0 direct competitors</span>
              <span className="ws-tag" style={{ background: 'var(--teal-lt)', color: 'var(--teal)' }}>High desire</span>
            </div>
          </div>

          <div
            className={`whitespace-card zone-b ${selectedPocket === 'pocket2' ? 'selected' : ''}`}
            onClick={() => setSelectedPocket('pocket2')}
          >
            <div className="ws-card-header">
              <div>
                <div className="ws-card-score" style={{ color: 'var(--gold)' }}>71</div>
                <div style={{ fontSize: '10px', color: 'var(--ink3)', fontWeight: 600 }}>OPPORTUNITY SCORE</div>
              </div>
              <div className="ws-card-badge badge-alt">Alternative</div>
            </div>
            <div className="ws-card-title">Adaptogen + Active Recovery</div>
            <div className="ws-card-desc">
              Moderate whitespace with 3 competitors nearby. Requires sharp packaging format differentiation (e.g. RTD cold brew) to command leadership.
            </div>
            <div className="ws-card-tags">
              <span className="ws-tag" style={{ background: 'var(--gold-lt)', color: '#7A4F00' }}>Zone B</span>
              <span className="ws-tag" style={{ background: 'var(--gray-lt)', color: 'var(--ink3)' }}>3 nearby SKUs</span>
              <span className="ws-tag" style={{ background: 'var(--gold-lt)', color: '#7A4F00' }}>High desire</span>
            </div>
          </div>

          <div className="card-sm" style={{ background: 'var(--red-lt)', borderColor: '#e8aaaa' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--red)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={14} /> Avoid — Zone A Saturated
            </div>
            <div style={{ fontSize: '12px', color: 'var(--ink2)', lineHeight: 1.55 }}>
              <strong>"Clean Protein"</strong> and <strong>"Plant Powered"</strong> are used by 22+ SKUs in this tier. Entering here requires 10× media spend to penetrate.
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
