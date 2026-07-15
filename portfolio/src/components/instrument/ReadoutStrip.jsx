import React from 'react';
import { JARVIS, agentById } from '../../content/ecosystem.js';

/*
 * The readout: an engraved information strip on the instrument frame.
 * It reports the focused capability's role, state, and latest meaningful
 * change — never invented telemetry.
 */
export default function ReadoutStrip({ agentId }) {
  const subject = agentId === JARVIS.id ? JARVIS : agentById(agentId);

  if (!subject) {
    return (
      <div className="readout">
        <p className="readout__empty">
          Focus a capability to read its role, state, and latest change. Choose an intention to see coordination.
        </p>
      </div>
    );
  }

  const isJarvis = subject.id === JARVIS.id;

  return (
    <div className="readout" aria-live="polite">
      <div className="readout__body">
        <div>
          <span className="readout__name">{subject.name}</span>
          <span className="readout__role">{isJarvis ? subject.label : subject.role}</span>
        </div>
        <p className="readout__purpose">{isJarvis ? subject.description : subject.purpose}</p>
        <div className="readout__meta">
          <div>
            STATE: <span className="is-state">{subject.state.toUpperCase()}</span>
            {subject.stateProvisional ? ' *' : ''}
          </div>
          {subject.latestChange && (
            <div>
              {subject.latestChange.date} — {subject.latestChange.note}
            </div>
          )}
          {isJarvis && <div>Central through relationships, not size.</div>}
        </div>
      </div>
    </div>
  );
}
