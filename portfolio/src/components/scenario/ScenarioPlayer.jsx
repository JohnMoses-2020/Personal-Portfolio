import React, { useEffect, useRef, useState } from 'react';
import { ACTOR_NAMES } from '../../content/scenarios.js';
import { useReducedMotion } from '../../hooks/use-reduced-motion.js';
import EngravedLabel from '../common/EngravedLabel.jsx';

/*
 * The scenario player: responsibility advances in strict causal order,
 * outputs accumulate on the bench like placed objects, and completed paths
 * cool into history instead of disappearing.
 */

function OutputCard({ step }) {
  const [placed, setPlaced] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setPlaced(true));
    return () => cancelAnimationFrame(raf);
  }, []);
  const confirmation = step.output.kind === 'Confirmation';
  return (
    <div
      className={`workplate output-card placed ${placed ? 'is-placed' : ''} ${
        confirmation ? 'output-card--confirmation' : ''
      }`}
    >
      <div className="output-card__kind">
        <span className={`notch ${confirmation ? 'notch--amber' : 'notch--cobalt'}`} aria-hidden="true" />
        <span className="t-engraved">{step.output.kind}</span>
      </div>
      <p className="output-card__label">{step.output.label}</p>
      <p className="output-card__body">{step.output.body}</p>
    </div>
  );
}

function Handoff({ step, index, done, inspected, onToggleInspect }) {
  return (
    <div className={`handoff ${done ? 'is-done' : ''} ${step.human ? 'is-human' : ''}`}>
      <span className="handoff__spine" aria-hidden="true" />
      <span className="handoff__mark" aria-hidden="true" />
      <div className="handoff__row">
        <span className="handoff__actor">
          {String(index + 1).padStart(2, '0')} {ACTOR_NAMES[step.actor]}
        </span>
        <span className="handoff__action">
          {step.action}
          {step.human && (
            <span className="handoff__human-tag">
              <span className="notch notch--amber" aria-hidden="true" />
              Human confirmation
            </span>
          )}
        </span>
      </div>
      {done && (
        <button
          type="button"
          className="handoff__inspect-toggle"
          aria-expanded={inspected}
          onClick={() => onToggleInspect(step.id)}
        >
          {inspected ? '– Close' : '+ Inspect this handoff'}
        </button>
      )}
      {done && inspected && (
        <dl className="handoff__inspect">
          <div>
            <dt>Context received</dt>
            <dd>{step.context}</dd>
          </div>
          <div>
            <dt>Decision</dt>
            <dd>{step.decision}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}

export default function ScenarioPlayer({ scenario, stepsDone, onStepsDone }) {
  const [inspectedId, setInspectedId] = useState(null);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const total = scenario.steps.length;
  const complete = stepsDone >= total;

  useEffect(() => {
    setInspectedId(null);
    setRunning(false);
  }, [scenario.id]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  useEffect(() => {
    if (!running) return undefined;
    if (stepsDone >= total) {
      setRunning(false);
      return undefined;
    }
    timerRef.current = setTimeout(() => onStepsDone(stepsDone + 1), reducedMotion ? 550 : 950);
    return () => clearTimeout(timerRef.current);
  }, [running, stepsDone, total, onStepsDone, reducedMotion]);

  const advance = () => {
    setRunning(false);
    if (!complete) onStepsDone(stepsDone + 1);
  };

  const retreat = () => {
    setRunning(false);
    if (stepsDone > 0) onStepsDone(stepsDone - 1);
  };

  const handleKey = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      advance();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      retreat();
    }
  };

  const toggleInspect = (id) => setInspectedId((current) => (current === id ? null : id));

  return (
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
    <div className="player" role="group" aria-label={`Scenario: ${scenario.label}`} onKeyDown={handleKey}>
      <div className="player__header">
        <div className="player__intent">
          <EngravedLabel>The intention</EngravedLabel>
          <p className="player__intent-sentence">“{scenario.intention}”</p>
        </div>
        <div className="player__outcome">
          <EngravedLabel>The outcome it protects</EngravedLabel>
          <p>{scenario.outcome}</p>
        </div>
      </div>

      <div className="player__body">
        <div className="sequence">
          <EngravedLabel className="sequence__participants">
            Participants — {scenario.participants.map((id) => ACTOR_NAMES[id]).join(' · ')}
          </EngravedLabel>

          {scenario.steps.map((step, index) => (
            <Handoff
              key={step.id}
              step={step}
              index={index}
              done={index < stepsDone}
              inspected={inspectedId === step.id}
              onToggleInspect={toggleInspect}
            />
          ))}

          <div className="sequence__controls">
            <button type="button" className="sequence__advance" onClick={advance} disabled={complete}>
              <span className="notch notch--cobalt" aria-hidden="true" />
              {stepsDone === 0 ? 'Begin — first handoff' : 'Next handoff'}
            </button>
            <button
              type="button"
              className="sequence__play"
              onClick={() => setRunning(true)}
              disabled={complete || running}
            >
              {running ? 'Running…' : 'Run the whole sequence'}
            </button>
            {complete && (
              <span className="sequence__done" aria-live="polite">
                Resolved. {String(total).padStart(2, '0')}/{String(total).padStart(2, '0')} responsibilities settled.
              </span>
            )}
          </div>
        </div>

        <aside className="output-bench" aria-label="Outputs placed on the bench">
          <EngravedLabel>Placed on the bench</EngravedLabel>
          <div className="output-bench__list">
            {stepsDone === 0 ? (
              <p className="output-bench__empty">
                Each handoff leaves a result here — context, decisions, outputs, obligations.
              </p>
            ) : (
              scenario.steps.slice(0, stepsDone).map((step) => <OutputCard key={step.id} step={step} />)
            )}
          </div>
        </aside>
      </div>

      <div className="player__boundary">
        <span className="notch notch--amber" aria-hidden="true" />
        <span className="t-engraved">Boundary — {scenario.boundary}</span>
      </div>
    </div>
  );
}
