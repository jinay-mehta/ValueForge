import React, { createContext, useContext, useState } from 'react';
import { PERSONAS, PRESETS, INITIAL_HISTORY } from '../data/mockData';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('dashboard');
  const [activePersonaKey, setActivePersonaKey] = useState('priya');
  const [historyList, setHistoryList] = useState(INITIAL_HISTORY);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Current analysis state initialized with protein preset
  const defaultPreset = PRESETS.protein;
  const [analysis, setAnalysis] = useState({
    concept: defaultPreset.concept,
    category: defaultPreset.category,
    market: defaultPreset.market,
    price: defaultPreset.price,
    channel: defaultPreset.channel,
    personas: defaultPreset.personas,
    ingredients: defaultPreset.ingredients,
    activeVP: defaultPreset.vps[0],
    customClaim: defaultPreset.vps[0].claim,
    vps: defaultPreset.vps,
    tier2: defaultPreset.tier2,
    tier3: defaultPreset.tier3,
    risks: defaultPreset.risks,
    rtbs: defaultPreset.rtbs,
    opportunityScore: defaultPreset.opportunityScore,
    zone: defaultPreset.zone
  });

  const activePersona = PERSONAS[activePersonaKey] || PERSONAS.priya;

  const showNotification = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  const switchPersona = (key) => {
    if (PERSONAS[key]) {
      setActivePersonaKey(key);
      showNotification(`Switched persona to ${PERSONAS[key].name}`);
    }
  };

  const loadPreset = (key, targetScreen = null) => {
    const p = PRESETS[key];
    if (!p) return;
    setAnalysis({
      concept: p.concept,
      category: p.category,
      market: p.market,
      price: p.price,
      channel: p.channel,
      personas: p.personas,
      ingredients: p.ingredients,
      activeVP: p.vps[0],
      customClaim: p.vps[0].claim,
      vps: p.vps,
      tier2: p.tier2,
      tier3: p.tier3,
      risks: p.risks,
      rtbs: p.rtbs,
      opportunityScore: p.opportunityScore,
      zone: p.zone
    });
    showNotification(`Loaded preset: ${p.concept}`);
    if (targetScreen) {
      setScreen(targetScreen);
    }
  };

  const selectVP = (vp) => {
    setAnalysis(prev => ({
      ...prev,
      activeVP: vp,
      customClaim: vp.claim
    }));
  };

  const rescoreClaim = (customText) => {
    if (!customText || !customText.trim()) return;
    const text = customText.trim();
    let score = 70;
    const words = text.toLowerCase();

    if (words.includes('ritual') || words.includes('mindful') || words.includes('harmony') || words.includes('flow')) score += 15;
    if (words.includes('fuel') || words.includes('power') || words.includes('vitality') || words.includes('energy')) score += 10;
    if (words.includes('clean') || words.includes('pure') || words.includes('clinically')) score -= 18;
    if (words.includes('protein') && text.length > 18) score += 6;
    if (words.includes('100%') || words.includes('natural')) score -= 8;

    score = Math.min(96, Math.max(34, score));

    const status = score >= 80 ? 'Launch Ready' : score >= 60 ? 'Refinement Suggested' : 'Rework Required';
    const pull = Math.min(98, Math.max(20, Math.round(score * 0.95)));
    const nov  = Math.min(99, Math.max(25, Math.round(score * 1.02)));
    const fit  = Math.min(97, Math.max(28, Math.round(score * 1.04)));
    const gap  = Math.min(96, Math.max(15, Math.round(score * 0.97)));
    const fresh= Math.min(98, Math.max(20, Math.round(score)));

    const updatedVP = {
      ...analysis.activeVP,
      claim: text,
      pci: score,
      status,
      pull, nov, fit, gap, fresh
    };

    setAnalysis(prev => ({
      ...prev,
      activeVP: updatedVP,
      customClaim: text
    }));

    showNotification(`Rescored claim to PCI™ ${score} (${status})`);
  };

  const exportPDF = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    showNotification('Preparing print-ready executive brief…');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const copyMarkdown = () => {
    const briefText = `# ValueForge™ Positioning Brief
**Product Concept:** ${analysis.concept}
**Category:** ${analysis.category}
**Market:** ${analysis.market}
**Price Tier:** ${analysis.price}
**Target Channel:** ${analysis.channel}
**Positioning Confidence Index™:** ${analysis.activeVP.pci} / 100 (${analysis.activeVP.status})

---
### 1. Claim Hierarchy™
- **Tier 1 (Hero Claim):** "${analysis.activeVP.claim}"
- **Tier 2 (Supporting Claims):** ${analysis.tier2}
- **Tier 3 (Proof Points & Formulations):** ${analysis.tier3}

### 2. Strategic Opportunity
- **Positioning Pocket Zone:** ${analysis.zone}
- **Opportunity Score:** ${analysis.opportunityScore} / 100
- **Validation Engine:** Ai Palette 500M+ Consumer Signal Spine (Synthetic Cohorts)

### 3. Reasons to Believe (RTBs)
${analysis.rtbs.map((r, i) => `${i + 1}. ${r}`).join('\n')}

### 4. Key Risks & Mitigations
${analysis.risks.map(rk => `- [${rk.type.toUpperCase()}] **${rk.title}:** ${rk.desc}`).join('\n')}
`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(briefText)
        .then(() => showNotification('Brief copied to clipboard!'))
        .catch(() => showNotification('Brief ready for export.'));
    } else {
      showNotification('Brief ready for export.');
    }
  };

  const exportJSON = () => {
    const data = {
      title: `ValueForge Positioning Brief - ${analysis.concept}`,
      generatedAt: new Date().toISOString(),
      concept: analysis.concept,
      category: analysis.category,
      market: analysis.market,
      priceTier: analysis.price,
      channel: analysis.channel,
      pciScore: analysis.activeVP.pci,
      status: analysis.activeVP.status,
      whitespaceZone: analysis.zone,
      heroClaim: analysis.activeVP.claim,
      tier2Supporting: analysis.tier2,
      tier3Proof: analysis.tier3,
      reasonsToBelieve: analysis.rtbs,
      riskFlags: analysis.risks
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ValueForge-Brief-${analysis.concept.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded JSON brief.');
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        activePersona,
        activePersonaKey,
        switchPersona,
        analysis,
        setAnalysis,
        loadPreset,
        selectVP,
        rescoreClaim,
        exportPDF,
        copyMarkdown,
        exportJSON,
        historyList,
        showNotification,
        toast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
