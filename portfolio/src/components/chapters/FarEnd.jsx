import React, { useEffect, useState } from 'react';
import { site } from '../../content/site.js';
import { AGENTS, JARVIS } from '../../content/ecosystem.js';
import { useInView } from '../../hooks/use-in-view.js';
import RoomMark from '../common/RoomMark.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import ProvisionalStamp from '../common/ProvisionalStamp.jsx';
import Checksum from '../common/Checksum.jsx';
import './farend.css';

/*
 * 07 Invitation — the far edge of the table, where inspection becomes
 * participation. The cobalt context trace settles into the checksum;
 * nothing celebratory happens.
 */
export default function FarEnd() {
  const { farEnd } = site;
  const [settleRef, reached] = useInView({ threshold: 0.9 });
  const [settling, setSettling] = useState(false);

  useEffect(() => {
    if (!reached) return undefined;
    setSettling(true);
    const timer = setTimeout(() => setSettling(false), 900);
    return () => clearTimeout(timer);
  }, [reached]);

  return (
    <section id="contact" className="room farend" aria-labelledby="contact-heading">
      <RoomMark index="07" chapter="Invitation" room="The Far End" />

      <h2 id="contact-heading" className="t-claim farend__invitation">
        {farEnd.invitation}
      </h2>

      <div className="farend__actions">
        <a className="quiet-button" href={`mailto:${farEnd.email.value}`}>
          <span className="notch" aria-hidden="true" />
          {farEnd.action}
        </a>
        <span className="farend__email">
          {farEnd.email.value}
          {farEnd.email.provisional && (
            <ProvisionalStamp title={farEnd.email.note}>Confirm address</ProvisionalStamp>
          )}
        </span>
      </div>

      <div className="farend__references">
        {farEnd.references.map((reference) =>
          reference.pending ? (
            <span key={reference.label} className="farend__reference farend__reference--pending" title="Link pending">
              {reference.label} — pending
            </span>
          ) : (
            <a
              key={reference.label}
              className="farend__reference"
              href={reference.href}
              target="_blank"
              rel="noreferrer"
            >
              {reference.label}
            </a>
          ),
        )}
      </div>

      <details className="workbench-index">
        <summary>
          <span className="notch" aria-hidden="true" />
          Workbench index
        </summary>
        <div className="workbench-index__table">
          <div className="workbench-index__row">
            <span className="name">{JARVIS.name}</span>
            <span className="role">Orchestration</span>
            <span className="state">{JARVIS.state}</span>
            <a href="#system">System ↑</a>
          </div>
          {AGENTS.map((agent) => (
            <div key={agent.id} className="workbench-index__row">
              <span className="name">{agent.name}</span>
              <span className="role">{agent.role}</span>
              <span className="state">{agent.state}</span>
              <a href="#evidence">Evidence ↑</a>
            </div>
          ))}
        </div>
      </details>

      <div className={`farend__settle ${settling ? 'is-settling' : ''}`} ref={settleRef}>
        <span id="master-checksum">
          <Checksum seed="ai-lab" size={32} label="AI-Lab checksum — John Moses’s mark" />
        </span>
        <div className="farend__status">
          <EngravedLabel>{farEnd.status}</EngravedLabel>
          <span className="t-mono" style={{ color: 'var(--ink-muted)' }}>
            Last revision {farEnd.lastRevision} · © {new Date().getFullYear()} John Moses
          </span>
        </div>
      </div>
    </section>
  );
}
