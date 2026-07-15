import React, { useEffect, useState } from 'react';
import { site } from '../../content/site.js';
import RoomMark from '../common/RoomMark.jsx';
import './arrival.css';

/* Dormant etchings inside the instrument edge — structure, barely legible. */
function DormantEtchings() {
  return (
    <svg className="arrival__etchings" viewBox="0 0 420 460" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      <g stroke="var(--instrument-line)" strokeWidth="1" fill="none">
        <path d="M 0 230 H 96" />
        <path d="M 96 230 V 96 H 180" />
        <path d="M 96 230 V 372 H 180" />
        <path d="M 96 230 H 180" />
      </g>
      <g fill="var(--fog-dim)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" opacity="0.6">
        <text x="186" y="100">TIME</text>
        <text x="186" y="234">MOVEMENT</text>
        <text x="186" y="376">WELLBEING</text>
        <text x="20" y="216">JARVIS</text>
      </g>
      <g fill="none" stroke="var(--instrument-line)" strokeWidth="1">
        <rect x="14" y="222" width="66" height="18" />
      </g>
    </svg>
  );
}

export default function Arrival() {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={`arrival room ${settled ? 'is-settled' : ''}`} aria-labelledby="arrival-headline">
      <RoomMark index="01" chapter="Arrival" room="The Near Edge" />

      <div className="arrival__aperture" aria-hidden="true">
        <DormantEtchings />
        <span className="arrival__registration" />
      </div>
      <div className="arrival__context-line" aria-hidden="true" />

      <div className="arrival__identity-stack" aria-hidden="true">
        {site.identityStack.map((line) => (
          <span key={line} className="t-engraved">
            {line}
          </span>
        ))}
      </div>

      <div className="arrival__content">
        <h1 id="arrival-headline" className="t-display arrival__headline">
          {site.headline}
        </h1>
        <p className="t-lede arrival__descriptor">{site.descriptor}</p>
        <p className="t-small arrival__identity-line">{site.identityLine}</p>
        <a className="notch-link" href="#system">
          <span className="notch" aria-hidden="true" />
          {site.heroInvitation}
        </a>
      </div>

      <p className="arrival__edge-note" aria-hidden="true">
        <span className="t-engraved">02 — The instrument is dormant. Jarvis is waiting for an intention.</span>
      </p>
    </section>
  );
}
