import React, { useState } from 'react';
import { SCENARIOS } from '../../content/scenarios.js';
import { useInView } from '../../hooks/use-in-view.js';
import { useReducedMotion } from '../../hooks/use-reduced-motion.js';
import EcosystemMap from './EcosystemMap.jsx';
import ReadoutStrip from './ReadoutStrip.jsx';
import RoomMark from '../common/RoomMark.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import './instrument.css';

/*
 * 02 Discovery — the conceptual turn: the visitor stops seeing a portfolio
 * and begins understanding a system builder. One bounded instrument,
 * four human intentions, honest states.
 */
export default function InstrumentBay({ intentionId, onSelectIntention }) {
  const [view, setView] = useState('system');
  const [focusedAgent, setFocusedAgent] = useState(null);
  const [pinnedAgent, setPinnedAgent] = useState(null);
  const reducedMotion = useReducedMotion();

  /* First life: the instrument wakes as attention reaches it — once. */
  const [wakeRef, awake] = useInView({ threshold: 0.45, once: true });

  const scenario = SCENARIOS.find((s) => s.id === intentionId) || null;

  const handlePin = (agentId) => {
    setPinnedAgent((current) => (current === agentId ? null : agentId));
  };

  const handleSelectIntention = (id) => {
    onSelectIntention(id === intentionId ? null : id);
    setPinnedAgent(null);
  };

  return (
    <section id="system" className="room" aria-labelledby="system-heading">
      <RoomMark index="02" chapter="Discovery" room="The Instrument Bay" />

      <header className="room-head">
        <EngravedLabel className="room-kicker">AI-Lab</EngravedLabel>
        <h2 id="system-heading" className="t-claim">
          One ecosystem, coordinated — not a collection of projects.
        </h2>
        <p className="t-lede room-lede">
          Jarvis interprets intent and coordinates specialized capabilities. The agents share context and keep clear
          responsibilities, organized around human outcomes rather than technology.
        </p>
      </header>

      <div className="bay__layout" ref={wakeRef}>
        <div className="intentions">
          <EngravedLabel className="intentions__kicker">Choose an intention</EngravedLabel>
          {SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="intention-card"
              aria-pressed={intentionId === item.id}
              onClick={() => handleSelectIntention(item.id)}
            >
              <span className="notch" aria-hidden="true" />
              {item.label}
            </button>
          ))}
          {intentionId && (
            <button type="button" className="intentions__clear" onClick={() => onSelectIntention(null)}>
              Clear intention
            </button>
          )}
          <p className="t-caption intentions__note">
            The demonstration below follows whichever intention you choose.
          </p>
        </div>

        <div className="instrument-aperture">
          <div className="instrument-aperture__view" role="group" aria-label="Map view">
            <button type="button" aria-pressed={view === 'system'} onClick={() => setView('system')}>
              System
            </button>
            <button type="button" aria-pressed={view === 'outcomes'} onClick={() => setView('outcomes')}>
              Outcomes
            </button>
          </div>

          <EcosystemMap
            view={view}
            scenario={scenario}
            wake={awake && !scenario}
            focusedAgent={focusedAgent}
            pinnedAgent={pinnedAgent}
            reducedMotion={reducedMotion}
            onFocusAgent={setFocusedAgent}
            onPinAgent={handlePin}
          />

          <ReadoutStrip agentId={focusedAgent || pinnedAgent} />
        </div>
      </div>
    </section>
  );
}
