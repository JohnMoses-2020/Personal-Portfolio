import React from 'react';
import { EVIDENCE } from '../../content/evidence.js';
import RoomMark from '../common/RoomMark.jsx';
import EngravedLabel from '../common/EngravedLabel.jsx';
import EvidenceAssembly from './EvidenceAssembly.jsx';
import './evidence.css';

/*
 * 04 Evidence — claims replaced by artifacts. One primary object at a time,
 * annotation layers changing around it, rough edges included.
 */
export default function EvidenceBench() {
  return (
    <section id="evidence" className="room" aria-labelledby="evidence-heading">
      <RoomMark index="04" chapter="Evidence" room="Objects on the Bench" />

      <header className="room-head">
        <EngravedLabel className="room-kicker">Evidence</EngravedLabel>
        <h2 id="evidence-heading" className="t-claim">
          Artifacts, with their provenance.
        </h2>
        <p className="t-lede room-lede">
          What the systems produce, how they changed, and which decisions mattered. Inspect closely — the rough edges
          are part of the record, and reserved positions say plainly what is still to come.
        </p>
      </header>

      <div className="evidence-list">
        {EVIDENCE.map((assembly, index) => (
          <EvidenceAssembly key={assembly.id} assembly={assembly} flip={index % 2 === 1} />
        ))}
      </div>

      <p className="evidence-transition">
        <span className="notch" aria-hidden="true" />
        <span className="t-engraved">Not “what did this use?” — “why was it built this way?”</span>
      </p>
    </section>
  );
}
