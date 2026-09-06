import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Search, Star, Zap, Radio } from 'lucide-react';

export default function ProcessingView() {
  const { setScreen } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [progresses, setProgresses] = useState([0, 0, 0, 0, 0]);

  const steps = [
    { icon: UserCheck, text: 'Persona Intelligence Module™ — Decoding Desire Vectors' },
    { icon: Search, text: 'Competitive Saturation Scanner™ — Mapping Category SKUs & Density' },
    { icon: Star, text: 'WhiteSpace Navigator™ — Identifying Positioning Pockets™' },
    { icon: Zap, text: 'Claim Forge Engine™ — Generating Differentiated Claims' },
    { icon: Radio, text: 'Consumer Resonance Simulator™ — Scoring via Synthetic Cohorts' }
  ];

  useEffect(() => {
    let stepIdx = 0;
    let pct = 0;

    const interval = setInterval(() => {
      pct += 8;
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
          }, 500);
        }
      }
    }, 45);

    return () => clearInterval(interval);
  }, [setScreen, steps.length]);

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
      <div style={{ fontSize: '13.5px', color: 'var(--ink3)', marginBottom: '28px' }}>
        Executing all 5 layers of the Differentiation Genome™ in real time
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
              <span style={{ flex: 1 }}>{s.text}</span>
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
