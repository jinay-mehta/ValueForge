import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CATEGORIES_LIST, 
  MARKETS_LIST, 
  PRICE_TIERS_LIST, 
  CHANNELS_LIST, 
  PERSONAS 
} from '../data/mockData';
import { ArrowRight, ArrowLeft, Plus, Lightbulb } from 'lucide-react';

export default function NewAnalysis() {
  const { inputs, setInputs, setScreen, loadExample, showNotification } = useApp();
  const [ingInput, setIngInput] = useState('');
  const [errConcept, setErrConcept] = useState(false);

  const handleConceptChange = (val) => {
    setInputs(prev => ({ ...prev, concept: val }));
    if (val.trim().length >= 4) {
      setErrConcept(false);
    }
  };

  const handleSelectPersona = (pName) => {
    setInputs(prev => ({ ...prev, persona: pName }));
  };

  const handleAddIngredient = () => {
    if (!ingInput.trim()) return;
    const val = ingInput.trim();
    if (!inputs.ingredients.includes(val)) {
      setInputs(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, val]
      }));
    }
    setIngInput('');
  };

  const handleRemoveIngredient = (ing) => {
    setInputs(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(item => item !== ing)
    }));
  };

  const handleStartAnalysis = () => {
    if (!inputs.concept || inputs.concept.trim().length < 4) {
      setErrConcept(true);
      showNotification('Please enter a product concept (min. 4 characters).');
      return;
    }
    setScreen('processing');
  };

  return (
    <section className="new-analysis-view">
      <div className="page-title">New ValueForge™ Analysis</div>
      <div className="page-sub">
        Define your product concept. ValueForge maps the competitive landscape, finds whitespace, and generates a positioning brief tailored to your category and persona.
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
        <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--ink3)' }}>Try an example:</span>
        <button className="preset-btn" onClick={() => loadExample(0)}>⚡ Protein Drink</button>
        <button className="preset-btn" onClick={() => loadExample(1)}>🍵 Functional Tea</button>
        <button className="preset-btn" onClick={() => loadExample(2)}>✨ Niacinamide Serum</button>
        <button className="preset-btn" onClick={() => loadExample(3)}>🌾 Millet Protein Bar</button>
      </div>

      <div className="card">
        <div className="section-label">Product Basics</div>
        <div className="form-grid">
          <div className="form-group full">
            <div className="flex-between">
              <label className="form-label">Product Concept *</label>
              <span style={{ fontSize: '10.5px', color: 'var(--ink3)' }}>
                {inputs.concept.length} / 120
              </span>
            </div>
            <input
              className={`form-input ${errConcept ? 'input-err' : ''}`}
              type="text"
              maxLength={120}
              value={inputs.concept}
              onChange={(e) => handleConceptChange(e.target.value)}
              placeholder="e.g. Plant-based protein drink for daily morning ritual…"
            />
            {errConcept && (
              <div style={{ fontSize: '11px', color: 'var(--red)', marginTop: '2px' }}>
                Please describe your product concept (min. 4 characters).
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-select"
              value={inputs.category}
              onChange={(e) => setInputs(prev => ({ ...prev, category: e.target.value }))}
            >
              {CATEGORIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Market</label>
            <select
              className="form-select"
              value={inputs.market}
              onChange={(e) => setInputs(prev => ({ ...prev, market: e.target.value }))}
            >
              {MARKETS_LIST.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price Tier</label>
            <select
              className="form-select"
              value={inputs.price}
              onChange={(e) => setInputs(prev => ({ ...prev, price: e.target.value }))}
            >
              {PRICE_TIERS_LIST.map(pt => <option key={pt} value={pt}>{pt}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Target Channel</label>
            <select
              className="form-select"
              value={inputs.channel}
              onChange={(e) => setInputs(prev => ({ ...prev, channel: e.target.value }))}
            >
              {CHANNELS_LIST.map(ch => <option key={ch} value={ch}>{ch}</option>)}
            </select>
          </div>
        </div>

        <hr className="divider" />
        <div className="section-label">Target Persona * (Select one)</div>
        <div className="persona-chips">
          {PERSONAS.map(p => {
            const isSelected = inputs.persona === p.name;
            return (
              <div
                key={p.name}
                className={`persona-chip ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectPersona(p.name)}
              >
                {p.name}
              </div>
            );
          })}
        </div>

        <hr className="divider" />
        <div className="section-label">Key Ingredients / Formats (Optional)</div>
        <div style={{ marginBottom: '8px' }}>
          {inputs.ingredients.map(ing => (
            <span key={ing} className="ingredient-tag">
              {ing} <button onClick={() => handleRemoveIngredient(ing)}>×</button>
            </span>
          ))}
        </div>
        <div className="flex-gap">
          <input
            className="form-input"
            type="text"
            placeholder="Add ingredient or format (e.g. Ashwagandha, RTD, Niacinamide)…"
            style={{ maxWidth: '360px' }}
            value={ingInput}
            onChange={(e) => setIngInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddIngredient(); } }}
          />
          <button className="btn btn-secondary btn-sm" onClick={handleAddIngredient}>
            <Plus size={14} /> Add
          </button>
        </div>

        <div className="tip-box mt-4">
          <span className="tip-icon"><Lightbulb size={18} color="#825900" /></span>
          <p>
            <strong>Pro Tip:</strong> Adding ingredients helps ValueForge cross-reference claim density at the formulation level — identifying whether an ingredient-led claim is already overused in your category before you commit to it.
          </p>
        </div>

        <div className="flex-between mt-6">
          <button className="btn btn-secondary" onClick={() => setScreen('dashboard')}>
            <ArrowLeft size={15} /> Cancel
          </button>
          <button className="btn btn-primary" onClick={handleStartAnalysis}>
            Run ValueForge Analysis <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
