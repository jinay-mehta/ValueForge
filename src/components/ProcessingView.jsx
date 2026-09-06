import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Search, Star, Zap, Radio } from 'lucide-react';

export default function ProcessingView() {
  const { setScreen, executeAnalysis, inputs } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [progresses, setProgresses] = useState([0, 0, 0, 0, 0]);

  const steps = [
    { icon: UserCheck, title: 'Persona Intelligence Module™', detail: `Decoding Desire Vectors for ${inputs.persona}` },
    { icon: Search, title: 'Competitive Saturation Scanner™', detail: `Mapping competitor SKUs in ${inputs.category}` },
    { icon: Star, title: 'WhiteSpace Navigator™', detail: 'Cross-referencing Desire Vectors with category Saturation' },
    { icon: Zap, title: 'Claim Forge Engine™', detail: `Generating 4 differentiated claims for "${inputs.concept}"` },
    { icon: Radio, title: 'Consumer Resonance Simulator™', detail: 'Scoring claims via 100+ synthetic cohorts (500M+ signals)' }
  ];

  useEffect(() => {
    // Run analysis calculation
    executeAnalysis();

    let stepIdx = 0;
    let pct = 0;

    const interval = setInterval(() => {
      pct += 10;
      setProgresses(prev => {
        const next = [...prev];
        next[stepIdx] = Math.min(100, pct);
        return next;
      });

      if (pct >= 100) {
        stepIdx++;
        pct = 0;
        setCurrentStep(stepIdx);
        if (stepIdx >= steps.length) {
          clearInterval(interval);
          setTimeout(() => {
            setScreen('whitespace');
          }, 450);
        }
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="processing-center">
      <div className="forge-animation">
        <div className="forge-ring"></div>
        <div className="forge-ring"></div>
        <div className="forge-ring"></div>
        <div className="forge-core"><span>VF</span></div>
      </div>

      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', marginBottom: '6px' }}>
        Forging your position…
      </div>
      <div style={{ fontSize: '13px', color: 'var(--ink3)', marginBottom: '28px' }}>
        Running all 5 layers of the Differentiation Genome™
      </div>

      <div className="process-steps">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isDone = currentStep > idx || progresses[idx] === 100;
          const isRunning = currentStep === idx && progresses[idx] < 100;
          const stateClass = isDone ? 'done' : isRunning ? 'running' : '';

          return (
            <div key={idx} className={`process-step ${stateClass}`}>
              <span className="ps-icon"><Icon size={16} /></span>
              <span style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{s.title}</div>
                <div style={{ fontSize: '11px', opacity: 0.75, marginTop: '1px' }}>{s.detail}</div>
              </span>
              <div className="ps-bar">
                <div className="ps-fill" style={{ width: `${progresses[idx]}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
