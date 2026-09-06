export const PERSONAS = {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    avatar: 'PS',
    title: 'Sr. Brand Manager',
    org: 'Tier-1 FMCG (Mumbai)',
    tagline: 'Defend positioning with data, not instinct',
    painPoint: 'Agency briefs take 8 weeks — often too late to change formulation',
    welcome: 'Welcome back, Priya.',
    desc: 'You have 2 analyses in progress. Your category Positioning Confidence Index™ stands at 88 / 100 — launch ready.'
  },
  david: {
    id: 'david',
    name: 'David Chen',
    avatar: 'DC',
    title: 'Head of Innovation & R&D',
    org: 'Regional FMCG (Bangkok)',
    tagline: 'De-risk functional claim ownability upfront',
    painPoint: 'Uncertain whether functional ingredients are ownable or already dead in the category',
    welcome: 'Welcome back, David.',
    desc: 'Validate claim-formulation alignment early before committing R&D capex. 4 formulation whitespace pockets detected.'
  },
  aigerim: {
    id: 'aigerim',
    name: 'Aigerim Bekova',
    avatar: 'AB',
    title: 'Consumer Insights Director',
    org: 'Global CPG (Dubai)',
    tagline: 'Brief leadership with defensible whitespace evidence',
    painPoint: 'Must defend AI-generated scores to skeptical CMOs with transparent methodology',
    welcome: 'Welcome back, Aigerim.',
    desc: 'Evaluate methodology across 100+ synthetic cohorts grounded in Ai Palette\'s 500M+ regional consumer signal spine.'
  }
};

export const CATEGORIES = [
  'Functional Beverages',
  'Hot Beverages',
  'Snacks & Bars',
  'Dairy & Alternatives',
  'Condiments & Sauces'
];

export const MARKETS = [
  'India',
  'Indonesia',
  'Singapore',
  'UAE',
  'Thailand'
];

export const PRICE_TIERS = [
  'Economy (₹20–50)',
  'Mid (₹80–120)',
  'Premium (₹150–300)',
  'Super Premium (₹300+)'
];

export const CHANNELS = [
  'Modern Trade + E-Commerce',
  'General Trade',
  'D2C Online',
  'Foodservice'
];

export const TARGET_PERSONAS_LIST = [
  'Urban Millennials (25–34)',
  'Gen Z Health-First',
  'Wellness Women 28–38',
  'Fitness Enthusiasts',
  'Busy Professionals',
  'Health-Conscious Parents'
];

export const PRESETS = {
  protein: {
    id: 'protein',
    concept: 'Plant-Based Protein Drink',
    category: 'Functional Beverages',
    market: 'India',
    price: 'Mid (₹80–120)',
    channel: 'Modern Trade + E-Commerce',
    personas: ['Urban Millennials (25–34)'],
    ingredients: ['Pea Protein', 'Ashwagandha'],
    opportunityScore: 94,
    zone: 'Zone C Whitespace',
    vps: [
      {
        id: 'vp-1',
        type: 'top',
        pci: 91,
        status: 'Launch Ready',
        badge: '★ Top Recommendation',
        claim: 'Fuel your ritual. Power your day.',
        pull: 88, nov: 94, fit: 95, gap: 89, fresh: 91,
        flags: [
          { type: 'ok', text: 'Zero direct competitors use "ritual" + "fuel" combination in category' },
          { type: 'ok', text: 'Ritual framing scores 2.3× higher for urban millennials vs clinical claims' }
        ]
      },
      {
        id: 'vp-2',
        type: 'mid',
        pci: 78,
        status: 'Refinement Suggested',
        badge: 'Consider',
        claim: 'Your body. Your protein. Naturally.',
        pull: 76, nov: 72, fit: 84, gap: 68, fresh: 75,
        flags: [
          { type: 'warn', text: '"Naturally" used by 8 competitors — moderate saturation risk' }
        ]
      },
      {
        id: 'vp-3',
        type: 'warn',
        pci: 43,
        status: 'Rework Required',
        badge: '⚠ Overcrowded',
        claim: '25g protein. Clinically proven. Clean label.',
        pull: 32, nov: 28, fit: 38, gap: 18, fresh: 25,
        flags: [
          { type: 'danger', text: 'Persona Misalignment: clinical framing scores 3.1× lower for target cohort' },
          { type: 'danger', text: '"Clean label" is already claimed by 19 competitor SKUs' }
        ]
      }
    ],
    tier2: '25g plant-powered protein per serve · Ashwagandha for daily resilience · No artificial sweeteners',
    tier3: 'Complete amino acid profile from pea + rice blend · Clinically-studied ashwagandha (KSM-66®, 300mg) · FSSAI compliant',
    risks: [
      {
        type: 'warn',
        title: 'Packaging Visual Direction',
        desc: 'Ensure the "ritual" theme is expressed through warm, earthy packaging — clinical white aesthetics reduce perceived taste appeal by ~18%.'
      },
      {
        type: 'warn',
        title: 'Price Anchoring',
        desc: 'At ₹80–120 price tier, explicitly highlight the dual benefit (functional energy + clean protein) to anchor premium value.'
      },
      {
        type: 'ok',
        title: 'Defensible Space',
        desc: 'Hero claim is completely unoccupied by any SKU in the mapped competitive category.'
      }
    ],
    rtbs: [
      '25g complete plant protein (pea + rice) per serve — matches active gym-goer daily benchmark',
      'KSM-66® Ashwagandha (300mg) — gold-standard clinical adaptogen for stress reduction & cortisol balance',
      'Zero artificial sweeteners — naturally sweetened with monk fruit; clean label formulation',
      'Ready-To-Drink (RTD) format — seamless ritual convenience; zero mixing required'
    ]
  },
  tea: {
    id: 'tea',
    concept: 'Daily Ritual Green Tea',
    category: 'Hot Beverages',
    market: 'India',
    price: 'Premium (₹150–300)',
    channel: 'Modern Trade + E-Commerce',
    personas: ['Wellness Women 28–38'],
    ingredients: ['Japanese Matcha', 'Tulsi Extract'],
    opportunityScore: 91,
    zone: 'Zone C Whitespace',
    vps: [
      {
        id: 'vp-1',
        type: 'top',
        pci: 91,
        status: 'Launch Ready',
        badge: '★ Top Recommendation',
        claim: 'Calm mindfulness for the modern morning.',
        pull: 92, nov: 89, fit: 94, gap: 90, fresh: 90,
        flags: [
          { type: 'ok', text: 'Mindfulness morning positioning is unowned in tier-1 retail teas' },
          { type: 'ok', text: 'Emotional resonance scores 92% with wellness women' }
        ]
      },
      {
        id: 'vp-2',
        type: 'mid',
        pci: 75,
        status: 'Refinement Suggested',
        badge: 'Consider',
        claim: 'Pure antioxidants from whole-leaf matcha.',
        pull: 70, nov: 68, fit: 80, gap: 65, fresh: 72,
        flags: [
          { type: 'warn', text: '"Antioxidant" claims used by 14 competitors' }
        ]
      },
      {
        id: 'vp-3',
        type: 'warn',
        pci: 48,
        status: 'Rework Required',
        badge: '⚠ Saturated',
        claim: 'Green tea for rapid weight loss and detox.',
        pull: 35, nov: 20, fit: 40, gap: 15, fresh: 20,
        flags: [
          { type: 'danger', text: '"Detox" is heavily commoditized and faces regulatory scrutiny' }
        ]
      }
    ],
    tier2: 'Ceremonial-grade shade-grown matcha · Holy basil adaptogenic support · Slow-release sustained focus',
    tier3: '35mg natural L-theanine per serve · Tested for heavy metals and pesticides · Biodegradable pyramid bags',
    risks: [
      {
        type: 'warn',
        title: 'Brewing Education',
        desc: 'Water temperature guidance is essential; boiling water scorches matcha and induces bitterness.'
      },
      {
        type: 'ok',
        title: 'Ingredient Authenticity',
        desc: 'Single-origin Kagoshima traceability provides strong brand moat against domestic blends.'
      }
    ],
    rtbs: [
      '100% single-origin Japanese matcha sourced from Kagoshima estate',
      'Standardized Tulsi bio-actives proven to enhance mental clarity without caffeine crash',
      'Clean ritual convenience: 90-second steep with zero bitterness profile',
      'No added flavoring or artificial masking agents'
    ]
  },
  bar: {
    id: 'bar',
    concept: 'Probiotic Snack Bar',
    category: 'Snacks & Bars',
    market: 'India',
    price: 'Mid (₹80–120)',
    channel: 'Modern Trade + E-Commerce',
    personas: ['Health-Conscious Parents'],
    ingredients: ['Bacillus Coagulans', 'Rolled Oats', 'Almond Butter'],
    opportunityScore: 74,
    zone: 'Zone B Contested',
    vps: [
      {
        id: 'vp-1',
        type: 'top',
        pci: 74,
        status: 'Consider with Pivot',
        badge: '★ Best Available',
        claim: 'Gut harmony for whole-family vitality.',
        pull: 78, nov: 72, fit: 82, gap: 64, fresh: 76,
        flags: [
          { type: 'ok', text: 'Family gut harmony balances health appeal with kid-friendly flavor' },
          { type: 'warn', text: '3 direct competitor bars launched in last 6 months' }
        ]
      },
      {
        id: 'vp-2',
        type: 'mid',
        pci: 68,
        status: 'Refinement Suggested',
        badge: 'Alternative',
        claim: 'High fiber probiotic fuel on the go.',
        pull: 65, nov: 58, fit: 74, gap: 55, fresh: 60,
        flags: [
          { type: 'warn', text: '"High fiber" is an expectation, not a differentiator' }
        ]
      },
      {
        id: 'vp-3',
        type: 'warn',
        pci: 39,
        status: 'Rework Required',
        badge: '⚠ Saturated',
        claim: 'Healthy protein snack bar with no added sugar.',
        pull: 30, nov: 18, fit: 34, gap: 12, fresh: 15,
        flags: [
          { type: 'danger', text: '28+ SKUs in modern trade use this exact phrasing' }
        ]
      }
    ],
    tier2: '1 Billion spore-forming live probiotics · Prebiotic fiber from chicory root · 100% whole grain oats',
    tier3: 'Heat-stable GanedenBC30® strain survives baking and stomach acid · Zero added refined cane sugar',
    risks: [
      {
        type: 'warn',
        title: 'Competitive Crowding',
        desc: 'Bars have high shelf turnover. Shelf placement must emphasize digestive health rather than general snack aisle.'
      }
    ],
    rtbs: [
      'Patented shelf-stable probiotic strain with 25+ peer-reviewed clinical studies',
      'Kid-friendly cocoa almond crunch with natural sweetness from dates',
      '5g dietary prebiotic fiber supporting digestive microbiome diversity',
      'Convenient lunchbox & post-school snack packaging format'
    ]
  },
  coffee: {
    id: 'coffee',
    concept: 'Adaptogenic Coffee Blend',
    category: 'Hot Beverages',
    market: 'India',
    price: 'Premium (₹150–300)',
    channel: 'D2C Online',
    personas: ['Busy Professionals'],
    ingredients: ['Arabica Beans', 'Lion\'s Mane', 'Chaga Mushroom'],
    opportunityScore: 41,
    zone: 'Zone A Saturated',
    vps: [
      {
        id: 'vp-1',
        type: 'warn',
        pci: 41,
        status: 'Rework Required',
        badge: '⚠ Overcrowded',
        claim: 'Sharper focus. Zero jitters.',
        pull: 50, nov: 32, fit: 55, gap: 20, fresh: 25,
        flags: [
          { type: 'danger', text: 'Overcrowded: 22+ functional coffee brands use "focus + no jitters"' },
          { type: 'warn', text: 'Recommend pivoting to evening decaf or calm decompression' }
        ]
      }
    ],
    tier2: 'Single-origin Arabica dark roast · Dual-extracted mushroom nootropics · Stomach-gentle low acidity',
    tier3: '500mg organic lion\'s mane fruiting body extract · Lab-verified beta-glucan content (>25%)',
    risks: [
      {
        type: 'danger',
        title: 'Severe Saturation',
        desc: 'Zone A territory requires 10× paid customer acquisition spend. Re-engineering the positioning angle is strongly advised.'
      }
    ],
    rtbs: [
      '100% Specialty Arabica beans shade-grown at high altitude in Coorg',
      'Organic Lion\'s Mane dual extract supporting nerve growth factor (NGF)',
      'High semantic crowding in metro D2C segment',
      'Requires repositioning to evening or recovery focus'
    ]
  }
};

export const INITIAL_HISTORY = [
  {
    id: 'hist-1',
    date: 'Current',
    concept: 'Plant-Based Protein Drink',
    category: 'Functional Beverages',
    pci: 88,
    zone: 'C',
    status: 'Brief Ready',
    presetKey: 'protein'
  },
  {
    id: 'hist-2',
    date: 'May 2025',
    concept: 'Daily Ritual Green Tea',
    category: 'Hot Beverages',
    pci: 91,
    zone: 'C',
    status: 'Exported',
    presetKey: 'tea'
  },
  {
    id: 'hist-3',
    date: 'May 2025',
    concept: 'Probiotic Snack Bar',
    category: 'Snacks & Bars',
    pci: 74,
    zone: 'B',
    status: 'In Progress',
    presetKey: 'bar'
  },
  {
    id: 'hist-4',
    date: 'Apr 2025',
    concept: 'Adaptogenic Coffee Blend',
    category: 'Hot Beverages',
    pci: 41,
    zone: 'A',
    status: 'Rework Needed',
    presetKey: 'coffee'
  },
  {
    id: 'hist-5',
    date: 'Apr 2025',
    concept: 'Coconut Collagen Water',
    category: 'Functional Beverages',
    pci: 82,
    zone: 'C',
    status: 'Exported',
    presetKey: 'protein'
  }
];
