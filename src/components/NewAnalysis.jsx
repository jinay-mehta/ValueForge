import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES, 
  MARKETS, 
  PRICE_TIERS, 
  CHANNELS, 
  TARGET_PERSONAS_LIST 
} from '../data/mockData';
import { ArrowRight, ArrowLeft, Plus, Sparkles, Lightbulb } from 'lucide-react';

export default function NewAnalysis() {
  const { analysis, setAnalysis, setScreen, loadPreset, showNotification } = useApp();
  const [ingInput, setIngInput] = useState('');

  const handleTogglePersona = (p) => {
    setAnalysis(prev => {
      const exists = prev.personas.includes(p);
      const updated = exists 
        ? prev.personas.filter(item => item !== p)
        : [...prev.personas, p];
      return { ...prev, personas: updated.length > 0 ? updated : [p] };
    });
  };

  const handleAddIngredient = () => {
    if (!ingInput.trim()) return;
    const val = ingInput.trim();
    if (!analysis.ingredients.includes(val)) {
      setAnalysis(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, val]
      }));
    }
    setIngInput('');
  };

  const handleRemoveIngredient = (ing) => {
    setAnalysis(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(item => item !== ing)
    }));
  };

  const handleStartAnalysis = () => {
    if (!analysis.concept.trim()) {
      showNotification('Please enter a product concept idea.');
      return;
    }
    setScreen('processing');
  };

  return (
    <section className="new-analysis-view">
      <div className="page-title">New ValueForge™ Analysis</div>
      <div className="page-sub">
        Define your product concept. ValueForge executes all 5 layers of the Differentiation Genome™ across 
        Ai Palette's 500M+ consumer signals to find defensible Positioning Pockets™.
      </div>

      <div className="steps-bar">
        <div className="step-item active">
          <div className="step-num"><span>1</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>Define Concept</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Product & persona</div>
          </div>
        </div>
        <div className="step-item inactive">
          <div className="step-num"><span>2</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>Explore Whitespace</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Competitive map</div>
          </div>
        </div>
        <div className="step-item inactive">
          <div className="step-num"><span>3</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>Generate VPs</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Claim options</div>
          </div>
        </div>
        <div className="step-item inactive">
          <div className="step-num"><span>4</span></div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700 }}>Positioning Brief</div>
            <div style={{ fontSize: '10px', opacity: 0.7 }}>Decision-ready</div>
          </div>
        </div>
      </div>

      <div className="presets-container">
        <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink3)' }}>Quick Presets:</span>
        <button className="preset-btn" onClick={() => loadPreset('protein')}>🌱 Plant Protein Drink</button>
        <button className="preset-btn" onClick={() => loadPreset('tea')}>🍵 Daily Ritual Green Tea</button>
        <button className="preset-btn" onClick={() => loadPreset('bar')}>🍫 Probiotic Snack Bar</button>
        <button className="preset-btn" onClick={() => loadPreset('coffee')}>☕ Adaptogenic Coffee</button>
      </div>

      <div className="card">
        <div className="section-label">Product Basics</div>
        <div className="form-grid">
          <div className="form-group full">
            <label className="form-label">Product Concept</label>
            <input
              className="form-input"
              type="text"
              value={analysis.concept}
              onChange={(e) => setAnalysis(prev => ({ ...prev, concept: e.target.value }))}
              placeholder="e.g. Plant-based protein drink for morning ritual…"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={analysis.category}
              onChange={(e) => setAnalysis(prev => ({ ...prev, category: e.target.value }))}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Market</label>
            <select
              className="form-select"
              value={analysis.market}
              onChange={(e) => setAnalysis(prev => ({ ...prev, market: e.target.value }))}
            >
              {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Price Tier</label>
            <select
              className="form-select"
              value={analysis.price}
              onChange={(e) => setAnalysis(prev => ({ ...prev, price: e.target.value }))}
            >
              {PRICE_TIERS.map(pt => <option key={pt} value={pt}>{pt}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Target Channel</label>
            <select
              className="form-select"
              value={analysis.channel}
              onChange={(e) => setAnalysis(prev => ({ ...prev, channel: e.target.value }))}
            >
              {CHANNELS.map(ch => <option key={ch} value={ch}>{ch}</option>)}
            </select>
          </div>
        </div>

        <hr className="divider" />
        <div className="section-label">Target Persona (Multi-Select)</div>
        <div className="persona-chips">
          {TARGET_PERSONAS_LIST.map(p => {
            const isSelected = analysis.personas.includes(p);
            return (
              <div
                key={p}
                className={`persona-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => handleTogglePersona(p)}
              >
                {p}
              </div>
            );
          })}
        </div>

        <hr className="divider" />
        <div className="section-label">Key Ingredients / Formats</div>
        <div style={{ marginBottom: '8px' }}>
          {analysis.ingredients.map(ing => (
            <span key={ing} className="ingredient-tag">
              {ing} <button onClick={() => handleRemoveIngredient(ing)}>×</button>
            </span>
          ))}
        </div>
        <div className="flex-gap">
          <input
            className="form-input"
            type="text"
            placeholder="Add ingredient or format (e.g. Ashwagandha, RTD, Matcha)…"
            style={{ maxWidth: '360px' }}
            value={ingInput}
            onChange={(e) => setIngInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddIngredient(); }}
          />
          <button className="btn btn-secondary btn-sm" onClick={handleAddIngredient}>
            <Plus size={14} /> Add
          </button>
        </div>

        <div className="tip-box">
          <span className="tip-icon"><Lightbulb size={18} color="#825900" /></span>
          <p>
            <strong>Persona Intelligence Tip:</strong> 89% of category claims are semantically identical. Adding specific ingredients allows the Competitive Saturation Scanner™ to check whether claims like "Clean Plant Protein" are already saturated by 20+ SKUs.
          </p>
        </div>

        <div className="flex-between mt-6">
          <button className="btn btn-secondary" onClick={() => setScreen('dashboard')}>
            <ArrowLeft size={15} /> Back
          </button>
          <button className="btn btn-primary" onClick={handleStartAnalysis}>
            Run ValueForge Analysis <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
