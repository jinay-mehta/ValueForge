import React, { createContext, useContext, useState } from 'react';
import { 
  CATEGORIES, 
  PERSONAS, 
  USER_PERSONAS, 
  EXAMPLES, 
  SEED_HISTORY, 
  runAnalysis, 
  scoreClaimForTone 
} from '../data/mockData';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('dashboard');
  const [activePersonaKey, setActivePersonaKey] = useState('priya');
  const [historyList, setHistoryList] = useState(SEED_HISTORY);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Default initial inputs
  const defaultInputs = {
    concept: "Plant-based protein drink",
    category: "Functional Beverages",
    market: "India",
    price: "Mid (₹80–120)",
    channel: "Modern Trade + E-Commerce",
    persona: "Urban Millennials (25–34)",
    ingredients: ["Pea Protein", "Ashwagandha"]
  };

  const [inputs, setInputs] = useState(defaultInputs);
  const [analysis, setAnalysis] = useState(() => runAnalysis(defaultInputs, 0));
  const [selectedPocketIdx, setSelectedPocketIdx] = useState(0);
  const [selectedVpIdx, setSelectedVpIdx] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [compareSet, setCompareSet] = useState([0, 1]);
  const [regenNonce, setRegenNonce] = useState(0);

  const activePersona = USER_PERSONAS[activePersonaKey] || USER_PERSONAS.priya;

  const showNotification = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  const switchPersona = (key) => {
    if (USER_PERSONAS[key]) {
      setActivePersonaKey(key);
      showNotification(`Switched persona to ${USER_PERSONAS[key].name}`);
    }
  };

  const executeAnalysis = (customInputs = inputs) => {
    const result = runAnalysis(customInputs, regenNonce);
    setAnalysis(result);
    setSelectedPocketIdx(0);
    setSelectedVpIdx(0);
    setCompareMode(false);
    setCompareSet([0, 1]);
  };

  const regenerateClaims = () => {
    const nextNonce = regenNonce + 1;
    setRegenNonce(nextNonce);
    const result = runAnalysis(inputs, nextNonce);
    setAnalysis(result);
    showNotification('Regenerated fresh value proposition candidates.');
  };

  const editClaimText = (vpIdx, newText) => {
    if (!analysis) return;
    const cat = CATEGORIES[analysis.category];
    const persona = PERSONAS.find(p => p.name === analysis.persona) || PERSONAS[0];
    const targetVP = analysis.vpCandidates[vpIdx];
    if (!targetVP) return;

    const rescored = scoreClaimForTone(
      newText,
      targetVP.tone,
      cat,
      persona,
      analysis.toneCounts,
      analysis.maxCount,
      analysis.inputs,
      null
    );

    setAnalysis(prev => {
      const updatedCandidates = [...prev.vpCandidates];
      updatedCandidates[vpIdx] = rescored;
      return {
        ...prev,
        vpCandidates: updatedCandidates
      };
    });
  };

  const toggleCompareMode = () => {
    setCompareMode(prev => !prev);
    if (!compareMode) {
      showNotification('Compare Mode active. Select two claims to compare.');
    }
  };

  const toggleCompareSelect = (idx) => {
    setCompareSet(prev => {
      if (prev.includes(idx)) {
        return prev.filter(i => i !== idx);
      }
      if (prev.length < 2) {
        return [...prev, idx];
      }
      return [prev[1], idx];
    });
  };

  const loadExample = (idx) => {
    const ex = EXAMPLES[idx];
    if (!ex) return;
    const updatedInputs = {
      ...inputs,
      concept: ex.concept,
      category: ex.category,
      persona: ex.persona,
      ingredients: [...ex.ingredients]
    };
    setInputs(updatedInputs);
    showNotification(`Loaded example: ${ex.concept}`);
  };

  const loadHistoryItem = (conceptName) => {
    const item = historyList.find(h => h.concept === conceptName);
    if (!item) return;
    const updatedInputs = {
      ...inputs,
      concept: item.concept,
      category: item.category,
      persona: item.persona
    };
    setInputs(updatedInputs);
    const res = runAnalysis(updatedInputs, 0);
    setAnalysis(res);
    setScreen('brief');
    showNotification(`Loaded analysis for ${item.concept}`);
  };

  const saveToHistory = () => {
    if (!analysis) return;
    const activeVP = analysis.vpCandidates[selectedVpIdx] || analysis.vpCandidates[0];
    const activePocket = analysis.pockets[selectedPocketIdx] || analysis.pockets[0];

    const newEntry = {
      concept: analysis.inputs.concept,
      category: analysis.category,
      persona: analysis.persona,
      pci: activeVP.score,
      zone: activePocket.zone,
      status: activeVP.score >= 75 ? 'ready' : activeVP.score >= 50 ? 'progress' : 'rework',
      date: 'Just now'
    };

    setHistoryList(prev => [newEntry, ...prev.filter(h => h.concept !== newEntry.concept)]);
  };

  const exportCSV = () => {
    if (!analysis) return;
    const cat = CATEGORIES[analysis.category];
    const rows = [
      ['Competitor SKU', 'Category', 'Positioning Tone', 'Saturation Density']
    ];
    cat.competitors.forEach(c => {
      rows.push([
        `"${c.name}"`,
        `"${analysis.category}"`,
        `"${c.tone}"`,
        `"${analysis.toneCounts[c.tone] || 1}"`
      ]);
    });
    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ValueForge_${analysis.category.replace(/\s+/g, '_')}_Competitors.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Competitor dataset exported to CSV.');
  };

  const exportPDF = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    saveToHistory();
    showNotification('Opening printable executive brief…');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  const copyMarkdown = () => {
    if (!analysis) return;
    const activeVP = analysis.vpCandidates[selectedVpIdx] || analysis.vpCandidates[0];
    const activePocket = analysis.pockets[selectedPocketIdx] || analysis.pockets[0];
    const cat = CATEGORIES[analysis.category];

    const briefText = `# ValueForge™ Positioning Brief
**Product Concept:** ${analysis.inputs.concept}
**Category:** ${analysis.category}
**Market:** ${analysis.inputs.market}
**Target Persona:** ${analysis.persona}
**Price Tier:** ${analysis.inputs.price}
**Positioning Confidence Index™:** ${activeVP.score} / 100 (${activeVP.score >= 75 ? 'Launch Ready' : 'Needs Review'})

---
### 1. Claim Hierarchy™
- **Tier 1 (Hero Claim):** "${activeVP.claim}"
- **Tier 2 (Supporting Claims):** Formulated with ${analysis.inputs.ingredients.join(', ') || cat.defaultIngredient} for daily ${cat.benefit}.
- **Tier 3 (Proof Points):** Standardized bioactive extracts; verified clean ingredient profile; FSSAI compliant.

### 2. Opportunity Zone & Differentiation
- **Positioning Pocket:** ${activePocket.title} (Zone ${activePocket.zone})
- **Opportunity Rationale:** ${activePocket.desc}
- **Competitive Saturation:** Verified against ${cat.competitors.length} competing SKUs.

### 3. Risk Flags & Explainability
${activeVP.flags.map(f => `- [${f.type.toUpperCase()}] ${f.text}`).join('\n')}
`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(briefText)
        .then(() => showNotification('Brief markdown copied to clipboard!'))
        .catch(() => showNotification('Brief ready for export.'));
    }
  };

  const shareLink = () => {
    const fakeId = Math.random().toString(36).slice(2, 9);
    const link = `${window.location.origin}/#brief-${fakeId}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        showNotification('Shareable team link copied to clipboard!');
      });
    } else {
      showNotification('Share link ready!');
    }
  };

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        inputs,
        setInputs,
        analysis,
        selectedPocketIdx,
        setSelectedPocketIdx,
        selectedVpIdx,
        setSelectedVpIdx,
        compareMode,
        compareSet,
        toggleCompareMode,
        toggleCompareSelect,
        editClaimText,
        regenerateClaims,
        executeAnalysis,
        loadExample,
        loadHistoryItem,
        activePersona,
        activePersonaKey,
        switchPersona,
        historyList,
        showNotification,
        toast,
        exportCSV,
        exportPDF,
        copyMarkdown,
        shareLink
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
