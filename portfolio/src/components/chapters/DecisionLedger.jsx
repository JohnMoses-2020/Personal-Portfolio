import React, { useState } from 'react';
import { DECISIONS } from '../../content/decisions.js';
import { agentById, JARVIS } from '../../content/ecosystem.js';
import RoomMark from '../common/RoomMark.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import ProvisionalStamp from '../common/ProvisionalStamp.jsx';
import './ledger.css';

const REVEALS = [
  { id: 'tried', label: 'What we tried' },
  { id: 'surprised', label: 'What surprised me' },
  { id: 'changed', label: 'What changed' },
];

function systemName(id) {
  if (id === JARVIS.id) return 'Jarvis';
  const agent = agentById(id);
  return agent ? agent.name : id;
}

function LedgerEntry({ entry }) {
  const [openReveal, setOpenReveal] = useState(null);

  return (
    <article className="ledger-entry" id={`decision-${entry.id}`} aria-label={entry.statement}>
      <div className="ledger-entry__meta">
        <span className="ledger-entry__date">{entry.date}</span>
        <EngravedLabel>{entry.system}</EngravedLabel>
        {entry.failure && (
          <span className="ledger-entry__tag">
            <EngravedLabel>Retired with lessons</EngravedLabel>
          </span>
        )}
        {entry.human && (
          <span className="ledger-entry__tag">
            <span className="notch notch--amber" aria-hidden="true" />
            <EngravedLabel>Human boundary</EngravedLabel>
          </span>
        )}
      </div>

      <h3 className="ledger-entry__statement">{entry.statement}</h3>
      <p className="ledger-entry__consequence">{entry.consequence}</p>

      <div className="ledger-entry__reveals">
        {REVEALS.map((reveal) => (
          <button
            key={reveal.id}
            type="button"
            className="ledger-entry__reveal-toggle"
            aria-expanded={openReveal === reveal.id}
            onClick={() => setOpenReveal((current) => (current === reveal.id ? null : reveal.id))}
          >
            {reveal.label}
          </button>
        ))}
      </div>

      {openReveal && (
        <div key={openReveal} className="ledger-entry__reveal">
          <EngravedLabel>{REVEALS.find((r) => r.id === openReveal).label}</EngravedLabel>
          <p>{entry[openReveal]}</p>
        </div>
      )}

      <div className="ledger-entry__affects">
        <span className="t-engraved">Affects</span>
        {entry.affects.map((id) => (
          <span key={id} className="ledger-entry__system-chip">
            {systemName(id)}
          </span>
        ))}
      </div>

      {entry.provisional && (
        <div className="ledger-entry__stamp-row">
          <ProvisionalStamp title="Drafted; dates and signals awaiting John’s real record">
            Awaiting John’s record
          </ProvisionalStamp>
        </div>
      )}
    </article>
  );
}

/*
 * 05 Judgment — the quality of the reasoning: constraints, tradeoffs,
 * failures, and deliberate non-features, with the same care as the wins.
 */
export default function DecisionLedger() {
  return (
    <section id="notes" className="room" aria-labelledby="notes-heading">
      <RoomMark index="05" chapter="Judgment" room="The Decision Ledger" />

      <header className="room-head">
        <EngravedLabel className="room-kicker">The decision ledger</EngravedLabel>
        <h2 id="notes-heading" className="t-claim">
          Knowing when not to automate.
        </h2>
        <p className="t-lede room-lede">
          Consequential decisions, in plain language: what was tried, what the evidence said, and what boundary or
          constraint remains. Failures are recorded with the same care.
        </p>
      </header>

      <div className="ledger__well">
        {DECISIONS.map((entry) => (
          <LedgerEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
