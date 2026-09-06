// ══════════════════════════════════════════════════════════
// VALUEFORGE™ CATEGORY & COMPETITIVE INTELLIGENCE DATASET
// ══════════════════════════════════════════════════════════

export const CATEGORIES = {
  "Functional Beverages": {
    benefit: "energy",
    moment: "morning",
    defaultIngredient: "plant protein",
    competitors: [
      { name: "Herbalife Protein Shake", tone: "clinical" },
      { name: "MuscleBlaze Whey", tone: "clinical" },
      { name: "Fast&Up Protein", tone: "clinical" },
      { name: "Amway Protein", tone: "clinical" },
      { name: "Ensure Plus", tone: "clinical" },
      { name: "Protinex Daily", tone: "convenience" },
      { name: "RiteBite Fuel Shake", tone: "convenience" },
      { name: "OZiva Plant Protein", tone: "social" },
      { name: "Bevzilla Cold Brew Protein", tone: "social" },
      { name: "Yakult Original", tone: "convenience" }
    ],
    saturatedClaims: [
      "25g protein",
      "clean label",
      "no added sugar",
      "plant-powered",
      "clinically tested",
      "clinically proven"
    ]
  },
  "Hot Beverages": {
    benefit: "calm",
    moment: "evening",
    defaultIngredient: "ashwagandha",
    competitors: [
      { name: "Tetley Green Tea", tone: "clinical" },
      { name: "Lipton Immuni-T", tone: "clinical" },
      { name: "Sleepy Owl Cold Brew", tone: "social" },
      { name: "Blue Tokai Coffee", tone: "social" },
      { name: "Vahdam Wellness Tea", tone: "ritual" },
      { name: "Twinings Detox", tone: "clinical" },
      { name: "Typhoo Green Tea", tone: "clinical" },
      { name: "MyMuse Adaptogen Latte", tone: "ritual" },
      { name: "Chaayos Kadak Chai", tone: "convenience" }
    ],
    saturatedClaims: [
      "antioxidant rich",
      "detox",
      "immunity boost",
      "100% natural",
      "farm fresh",
      "pure"
    ]
  },
  "Snacks & Bars": {
    benefit: "fuel",
    moment: "midday",
    defaultIngredient: "almonds",
    competitors: [
      { name: "RiteBite Max Protein", tone: "clinical" },
      { name: "Yoga Bar Protein", tone: "clinical" },
      { name: "The Whole Truth Bar", tone: "social" },
      { name: "Slurrp Farm Snacks", tone: "convenience" },
      { name: "Too Yumm Baked", tone: "convenience" },
      { name: "Epigamia Protein Bites", tone: "clinical" },
      { name: "Nutriwish Trail Mix", tone: "ritual" },
      { name: "Open Secret Millet Bar", tone: "social" }
    ],
    saturatedClaims: [
      "high protein",
      "no maida",
      "gluten free",
      "guilt-free",
      "baked not fried",
      "zero sugar"
    ]
  },
  "Dairy & Alternatives": {
    benefit: "gut health",
    moment: "breakfast",
    defaultIngredient: "probiotics",
    competitors: [
      { name: "Epigamia Greek Yogurt", tone: "clinical" },
      { name: "Go Desi A2 Milk", tone: "ritual" },
      { name: "Nutriwiz Almond Milk", tone: "social" },
      { name: "Sofit Soy Milk", tone: "convenience" },
      { name: "Amul High Protein", tone: "clinical" },
      { name: "Mother Dairy Probiotic", tone: "clinical" },
      { name: "Raw Pressery Oat Milk", tone: "social" }
    ],
    saturatedClaims: [
      "probiotic",
      "farm fresh",
      "no preservatives",
      "high calcium",
      "rich & creamy",
      "natural"
    ]
  },
  "Skincare": {
    benefit: "glow",
    moment: "evening",
    defaultIngredient: "niacinamide",
    competitors: [
      { name: "Minimalist Niacinamide", tone: "clinical" },
      { name: "The Ordinary Serum", tone: "clinical" },
      { name: "Plum 15% Vit-C Serum", tone: "clinical" },
      { name: "Mamaearth Vitamin C", tone: "social" },
      { name: "Dot & Key Glow Serum", tone: "ritual" },
      { name: "Foxtale Barrier Repair", tone: "clinical" },
      { name: "Re'equil Sunscreen", tone: "clinical" },
      { name: "Forest Essentials Ubtan", tone: "ritual" }
    ],
    saturatedClaims: [
      "dermat tested",
      "paraben free",
      "niacinamide",
      "clinically proven",
      "cruelty free",
      "10% concentration"
    ]
  },
  "Haircare": {
    benefit: "strength",
    moment: "weekend",
    defaultIngredient: "onion extract",
    competitors: [
      { name: "WOW Onion Oil", tone: "clinical" },
      { name: "Mamaearth Onion Shampoo", tone: "social" },
      { name: "Indulekha Bringha", tone: "ritual" },
      { name: "Kesh King Ayurvedic", tone: "ritual" },
      { name: "Bare Anatomy Serum", tone: "clinical" },
      { name: "Traya Hair Growth", tone: "clinical" },
      { name: "Khadi Natural Shampoo", tone: "ritual" }
    ],
    saturatedClaims: [
      "ayurvedic formula",
      "sulphate free",
      "hair fall control",
      "onion extract",
      "doctor recommended",
      "clinically tested"
    ]
  }
};

export const PERSONAS = [
  { 
    name: "Urban Millennials (25–34)", 
    weights: { ritual: 0.90, clinical: 0.30, social: 0.60, convenience: 0.50 } 
  },
  { 
    name: "Gen Z Health-First",        
    weights: { ritual: 0.50, clinical: 0.40, social: 0.90, convenience: 0.60 } 
  },
  { 
    name: "Wellness Women 28–38",      
    weights: { ritual: 0.95, clinical: 0.50, social: 0.40, convenience: 0.40 } 
  },
  { 
    name: "Fitness Enthusiasts",       
    weights: { ritual: 0.30, clinical: 0.80, social: 0.50, convenience: 0.50 } 
  },
  { 
    name: "Busy Professionals",        
    weights: { ritual: 0.40, clinical: 0.50, social: 0.30, convenience: 0.90 } 
  },
  { 
    name: "Health-Conscious Parents",  
    weights: { ritual: 0.60, clinical: 0.65, social: 0.30, convenience: 0.70 } 
  }
];

export const CLAIM_TEMPLATES = {
  ritual: [
    "Your {moment} ritual, reimagined.",
    "Make {concept} part of your everyday ritual.",
    "Slow down. {concept} — on your terms.",
    "{articleMoment} moment, made for you."
  ],
  clinical: [
    "{ingredient}. Clinically studied. Visibly {benefit}.",
    "Backed by science. Built for {benefit}.",
    "The {catShort} formulated like a lab, not a trend.",
    "{ingredient} you can verify — not just trust."
  ],
  social: [
    "The {catShort} everyone's asking about.",
    "Join the {conceptShort} movement.",
    "Made for how you actually live — and share.",
    "Your feed's next favorite {catShort}."
  ],
  convenience: [
    "{benefitCap}. Zero compromise. Zero effort.",
    "Fits your day, not the other way around.",
    "One step. All the {benefit}.",
    "{conceptShort}, without the extra steps."
  ]
};

export const RISK_TEMPLATES = {
  saturation: (n) => `Saturation Flag: similar language already used by ${n} competitor SKU${n === 1 ? '' : 's'} in this category.`,
  misalign:   (persona) => `Persona Misalignment: this tone scores well below the dominant Desire Vector for ${persona}.`,
  price:      () => `Price Anchoring Risk: at this price tier, the claim needs a stronger visible reason-to-believe or risks rejection.`
};

export const EXAMPLES = [
  { 
    concept: "Plant-based protein drink", 
    category: "Functional Beverages", 
    persona: "Urban Millennials (25–34)", 
    ingredients: ["Pea Protein", "Ashwagandha"] 
  },
  { 
    concept: "Daily ritual green tea", 
    category: "Hot Beverages", 
    persona: "Wellness Women 28–38", 
    ingredients: ["L-Theanine"] 
  },
  { 
    concept: "10% niacinamide brightening serum", 
    category: "Skincare", 
    persona: "Gen Z Health-First", 
    ingredients: ["Niacinamide", "Zinc"] 
  },
  { 
    concept: "High-protein millet snack bar", 
    category: "Snacks & Bars", 
    persona: "Fitness Enthusiasts", 
    ingredients: ["Millet", "Whey"] 
  }
];

export const CATEGORIES_LIST = Object.keys(CATEGORIES);
export const MARKETS_LIST = ['India', 'Indonesia', 'Singapore', 'UAE', 'Thailand'];
export const PRICE_TIERS_LIST = [
  'Economy (₹20–50)',
  'Mid (₹80–120)',
  'Premium (₹150–300)',
  'Super Premium (₹300+)'
];
export const CHANNELS_LIST = [
  'Modern Trade + E-Commerce',
  'General Trade',
  'D2C Online',
  'Foodservice'
];

export const USER_PERSONAS = {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    avatar: 'PS',
    title: 'Sr. Brand Manager',
    org: 'HUL (Tier-1 FMCG Mumbai)',
    welcome: 'Welcome back, Priya.',
    desc: 'You have 2 analyses in progress. Your category Positioning Confidence Index™ stands at 88 / 100 — launch ready.'
  },
  david: {
    id: 'david',
    name: 'David Chen',
    avatar: 'DC',
    title: 'Head of Innovation & R&D',
    org: 'Regional FMCG (Bangkok)',
    welcome: 'Welcome back, David.',
    desc: 'Validate claim-formulation alignment early before committing R&D capex. 4 formulation whitespace pockets detected.'
  },
  aigerim: {
    id: 'aigerim',
    name: 'Aigerim Bekova',
    avatar: 'AB',
    title: 'Consumer Insights Director',
    org: 'Global CPG (Dubai)',
    welcome: 'Welcome back, Aigerim.',
    desc: 'Evaluate methodology across 100+ synthetic cohorts grounded in Ai Palette\'s 500M+ regional consumer signal spine.'
  }
};

export const SEED_HISTORY = [
  { 
    concept: "Plant-based protein drink", 
    category: "Functional Beverages", 
    persona: "Urban Millennials (25–34)", 
    pci: 88, 
    zone: "C", 
    status: "ready", 
    date: "Jun 2025" 
  },
  { 
    concept: "Daily ritual green tea", 
    category: "Hot Beverages", 
    persona: "Wellness Women 28–38", 
    pci: 91, 
    zone: "C", 
    status: "ready", 
    date: "May 2025" 
  },
  { 
    concept: "Probiotic snack bar", 
    category: "Snacks & Bars", 
    persona: "Health-Conscious Parents", 
    pci: 74, 
    zone: "B", 
    status: "progress", 
    date: "May 2025" 
  },
  { 
    concept: "Adaptogenic coffee", 
    category: "Hot Beverages", 
    persona: "Busy Professionals", 
    pci: 41, 
    zone: "A", 
    status: "rework", 
    date: "Apr 2025" 
  },
  { 
    concept: "Coconut collagen water", 
    category: "Functional Beverages", 
    persona: "Urban Millennials (25–34)", 
    pci: 82, 
    zone: "C", 
    status: "ready", 
    date: "Apr 2025" 
  },
  { 
    concept: "Millet breakfast biscuit", 
    category: "Snacks & Bars", 
    persona: "Health-Conscious Parents", 
    pci: 69, 
    zone: "B", 
    status: "progress", 
    date: "Mar 2025" 
  }
];

// ══════════════════════════════════════════════════════════
// DETERMINISTIC ALGORITHMIC ENGINE
// ══════════════════════════════════════════════════════════

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function titleCase(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function shortConcept(s) {
  if (!s) return '';
  const words = s.trim().split(/\s+/);
  return words.length > 3 ? words.slice(-2).join(' ') : s;
}

export function toneToPocketTitle(tone, cat) {
  const map = {
    ritual: `${titleCase(cat.moment)} Ritual + ${titleCase(cat.benefit)}`,
    clinical: `Verified ${titleCase(cat.benefit)}, Proven Simply`,
    social: `Shareable ${titleCase(cat.benefit)} Moments`,
    convenience: `Effortless ${titleCase(cat.benefit)}, On Demand`
  };
  return map[tone] || 'Differentiated Territory';
}

export function toneToPocketDesc(tone, crowding, count, personaName) {
  if (crowding < 0.35) {
    return `High-desire zone for ${personaName} with only ${count} competitor${count === 1 ? '' : 's'} using this framing. Largely unowned territory.`;
  }
  if (crowding < 0.65) {
    return `Moderate whitespace — ${count} competitors nearby. Requires sharp execution to stand out, but desire is strong for this persona.`;
  }
  return `Contested territory — ${count} competitors already active here. High desire but will require 3–5× the typical media weight to break through.`;
}

export function scoreClaimForTone(claimText, tone, cat, persona, toneCounts, maxCount, inputs, rng) {
  const personaFit = persona.weights[tone] || 0.5;
  const lc = claimText.toLowerCase();
  const satMatches = (cat.saturatedClaims || []).filter(sc => {
    const words = sc.split(' ');
    return words.some(w => w.length > 3 && lc.includes(w));
  });
  const novelty = Math.max(0.08, 1 - satMatches.length * 0.22);
  const count = toneCounts[tone] || 1;
  const crowding = count / Math.max(1, maxCount);
  const competitiveGap = Math.max(0.05, 1 - crowding * 0.85);
  const freshness = Math.max(0.15, 1 - crowding * 0.55 - (tone === 'clinical' ? 0.12 : 0));

  let score = Math.round((personaFit * 35 + novelty * 25 + competitiveGap * 25 + freshness * 15) + (rng ? (rng() * 5 - 2.5) : 0));
  score = Math.max(12, Math.min(97, score));

  const flags = [];
  if (novelty < 0.55) {
    flags.push({ type: 'danger', icon: '✗', text: RISK_TEMPLATES.saturation(satMatches.length + count) });
  }
  if (personaFit < 0.45) {
    flags.push({ type: 'danger', icon: '✗', text: RISK_TEMPLATES.misalign(inputs.persona) });
  }
  if (score >= 75) {
    flags.unshift({
      type: 'ok',
      icon: '✓',
      text: `${count === 0 ? 'Zero' : count} competitor${count === 1 ? '' : 's'} currently combine "${tone}" framing with this category's core benefit.`
    });
  }
  if (inputs.price && inputs.price.includes('Premium') && novelty < 0.6) {
    flags.push({ type: 'warn', icon: '⚠', text: RISK_TEMPLATES.price() });
  }

  return {
    claim: claimText,
    tone,
    score,
    dims: {
      personaFit: Math.round(personaFit * 100),
      novelty: Math.round(novelty * 100),
      competitiveGap: Math.round(competitiveGap * 100),
      freshness: Math.round(freshness * 100)
    },
    flags: flags.filter(Boolean)
  };
}

export function runAnalysis(inputs, nonce = 0) {
  const cat = CATEGORIES[inputs.category] || CATEGORIES["Functional Beverages"];
  const persona = PERSONAS.find(p => p.name === inputs.persona) || PERSONAS[0];
  const seedStr = `${inputs.concept}|${inputs.category}|${inputs.persona}|${inputs.price}|${nonce}`;
  const rng = seededRandom(hashStr(seedStr));

  // 1. Competitive Saturation
  const toneCounts = { ritual: 0, clinical: 0, social: 0, convenience: 0 };
  cat.competitors.forEach(c => {
    if (toneCounts[c.tone] !== undefined) toneCounts[c.tone]++;
  });
  const maxCount = Math.max(1, ...Object.values(toneCounts));

  const competitorsPositioned = cat.competitors.map((c) => {
    const crowding = toneCounts[c.tone] / maxCount;
    const desire = persona.weights[c.tone] || 0.5;
    return {
      ...c,
      crowding,
      desire,
      jitterX: rng() * 0.4 - 0.2,
      jitterY: rng() * 0.4 - 0.2
    };
  });

  // 2. Whitespace Navigator
  const tones = ["ritual", "clinical", "social", "convenience"];
  const toneScores = tones.map(t => {
    const crowding = toneCounts[t] / maxCount;
    const desire = persona.weights[t] || 0.5;
    const opportunity = desire * (1 - crowding * 0.75);
    return { tone: t, crowding, desire, opportunity, count: toneCounts[t] };
  }).sort((a, b) => b.opportunity - a.opportunity);

  const pockets = toneScores.slice(0, 2).map((ts, idx) => {
    const score = Math.round(60 + ts.opportunity * 38 + rng() * 4);
    const zone = ts.crowding < 0.4 ? 'C' : 'B';
    return {
      tone: ts.tone,
      score: Math.min(99, score),
      zone,
      title: toneToPocketTitle(ts.tone, cat),
      desc: toneToPocketDesc(ts.tone, ts.crowding, toneCounts[ts.tone], persona.name),
      competitorCount: toneCounts[ts.tone],
      recommended: idx === 0
    };
  });

  // 3. Claim Forge Engine
  const shortC = shortConcept(inputs.concept);
  const ingredient = (inputs.ingredients && inputs.ingredients[0]) || cat.defaultIngredient;
  const ctx = {
    concept: inputs.concept.charAt(0).toLowerCase() + inputs.concept.slice(1),
    conceptShort: shortC,
    ingredient: titleCase(ingredient),
    benefit: cat.benefit,
    benefitCap: titleCase(cat.benefit),
    moment: cat.moment,
    catShort: inputs.category.toLowerCase(),
    articleMoment: (/^[aeiou]/i.test(cat.moment) ? 'An ' : 'A ') + cat.moment
  };
  const fillTemplate = (t) => t.replace(/\{(\w+)\}/g, (m, k) => ctx[k] || m);

  const candidateTones = [pockets[0].tone, pockets[1] ? pockets[1].tone : tones[1]];
  const usedTones = new Set(candidateTones);
  const remaining = tones.filter(t => !usedTones.has(t));
  candidateTones.push(remaining[Math.floor(rng() * remaining.length)] || tones[2]);
  candidateTones.push(remaining.find(t => t !== candidateTones[2]) || tones[3]);

  const vpCandidates = candidateTones.slice(0, 4).map((tone) => {
    const templates = CLAIM_TEMPLATES[tone] || CLAIM_TEMPLATES.ritual;
    const claim = fillTemplate(templates[Math.floor(rng() * templates.length)]);
    return scoreClaimForTone(claim, tone, cat, persona, toneCounts, maxCount, inputs, rng);
  });
  vpCandidates.sort((a, b) => b.score - a.score);

  return {
    inputs: { ...inputs },
    category: inputs.category,
    persona: inputs.persona,
    competitors: competitorsPositioned,
    toneCounts,
    maxCount,
    pockets,
    vpCandidates,
    generatedAt: new Date()
  };
}
