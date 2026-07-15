import React from 'react';
import { LAB } from './geography.js';
import {
  FLIGHT_ARCH,
  FLIGHT_COMMITS,
  FLIGHT_PRS,
  FLIGHT_TRADEOFFS,
  FLIGHT_LESSONS,
} from './deep-content.js';
import { Band, PlaceMark, Stage } from './primitives.jsx';
import Checksum from '../components/common/Checksum.jsx';

/*
 * AI-Lab — the engineered basin. The dark instrument (Jarvis) is the one
 * cool surface in a warm landscape. A trunk line carries context to the
 * specialist systems; Flight opens into a full project floor; recessed in
 * its floor is the source well, the deepest stratum of the world.
 */

const rect = ([x0, y0, x1, y1]) => ({ left: x0, top: y0, width: x1 - x0, height: y1 - y0 });

function TrunkLines() {
  const [ix0, , ix1] = [LAB.instrument[0], 0, LAB.instrument[2]];
  const out = LAB.outPort;
  const w = 3600 - 2940;
  return (
    <svg
      className="lab-lines"
      style={{ left: 2940, top: 860 }}
      width={w}
      height={360}
      viewBox={`0 0 ${w} 360`}
      aria-hidden="true"
    >
      {/* intent → instrument */}
      <line
        x1={LAB.intent.x - 2940 + 34}
        y1={LAB.intent.y - 860}
        x2={ix0 - 2940}
        y2={LAB.intent.y - 860}
        stroke="var(--engraved)"
        strokeWidth="1.6"
        strokeDasharray="5 5"
      />
      {/* instrument → trunk */}
      <line
        x1={ix1 - 2940}
        y1={out.y - 860}
        x2={LAB.trunkX - 2940}
        y2={out.y - 860}
        stroke="var(--trunk)"
        strokeWidth="2.4"
      />
      {/* trunk */}
      <line
        x1={LAB.trunkX - 2940}
        y1={LAB.chips[0].branchY - 860}
        x2={LAB.trunkX - 2940}
        y2={LAB.chips[3].branchY - 860}
        stroke="var(--trunk)"
        strokeWidth="2.4"
      />
      {/* branches */}
      {[...LAB.chips.map((c) => ({ y: c.branchY, x: c.rect[0] })), { y: LAB.flight.branchY, x: LAB.flight.rect[0] }].map(
        (b) => (
          <line
            key={`${b.x}-${b.y}`}
            x1={LAB.trunkX - 2940}
            y1={b.y - 860}
            x2={b.x - 2940}
            y2={b.y - 860}
            stroke="var(--trunk)"
            strokeWidth="1.8"
          />
        ),
      )}
      {/* the one signal in motion */}
      <path
        className="signal-path"
        d={`M${ix1 - 2940},${out.y - 860} L${LAB.trunkX - 2940},${out.y - 860} L${LAB.trunkX - 2940},${LAB.flight.branchY - 860} L${LAB.flight.rect[0] - 2940},${LAB.flight.branchY - 860}`}
        fill="none"
        stroke="var(--cobalt-signal)"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function SystemChip({ chip, onTravel }) {
  return (
    <PlaceMark
      target={chip.id}
      onTravel={onTravel}
      className="syschip"
      x={chip.rect[0]}
      y={chip.rect[1]}
      style={{ width: chip.rect[2] - chip.rect[0], height: chip.rect[3] - chip.rect[1] }}
    >
      <span className="syschip-name">{chip.name}</span>
      <Band zin={2.1} fin={0.9} className="syschip-meta">
        <span className="syschip-role">{chip.role.toUpperCase()}</span>
        <span className={`syschip-state ${chip.state === 'In daily use' ? 'is-live' : ''}`}>
          {chip.state.toUpperCase()}
        </span>
      </Band>
    </PlaceMark>
  );
}

function FlightFloor({ onTravel }) {
  const r = LAB.flight.rect;
  return (
    <Stage x={r[0]} y={r[1]} w={r[2] - r[0]} h={r[3] - r[1]} k={10} className="flight-floor">
      <div className="flight-inner">
        <header className="flight-head">
          <div>
            <div className="flight-kicker">AI-LAB / JARVIS / PROJECT</div>
            <div className="flight-title">
              Flight <span className="flight-role">— navigates</span>
            </div>
          </div>
          <div className="flight-head-right">
            <span className="statechip statechip--amber">UNDER TEST</span>
            <span className="flight-date">REV 2 · 2026-06</span>
          </div>
        </header>

        <p className="flight-purpose">
          Reduces uncertainty around movement. Hands over two options and one honest caveat, then
          waits. There is no code path that books without a human token.
        </p>

        <div className="flight-bays">
          <div className="flight-bay">
            <div className="bay-label">INTAKE</div>
            {FLIGHT_ARCH.intake.map((i) => (
              <div key={i} className="bay-item">
                {i}
              </div>
            ))}
          </div>
          <div className="flight-bay">
            <div className="bay-label">CORE</div>
            {FLIGHT_ARCH.core.map((i) => (
              <div key={i} className={`bay-item ${i === 'Approval gate' ? 'bay-item--amber' : ''}`}>
                {i}
                {i === 'Approval gate' && <span className="bay-tag">HUMAN</span>}
              </div>
            ))}
          </div>
          <div className="flight-bay">
            <div className="bay-label">OUT</div>
            {FLIGHT_ARCH.out.map((i) => (
              <div key={i} className="bay-item">
                {i}
              </div>
            ))}
          </div>
        </div>

        <div className="flight-tradeoffs">
          {FLIGHT_TRADEOFFS.map((t) => (
            <div key={t.kept} className="tradeoff">
              <div className="tradeoff-head">
                KEPT <strong>{t.kept.toUpperCase()}</strong> · SPENT {t.spent.toUpperCase()}
              </div>
              <div className="tradeoff-line">{t.line}</div>
            </div>
          ))}
        </div>

        <div className="flight-foot">
          <span className="flight-foot-note">
            Latest change — auto-booking removed; it prepares and asks.
          </span>
          <button
            type="button"
            className="well-invite"
            onClick={(e) => {
              e.stopPropagation();
              onTravel?.('flight-source');
            }}
          >
            <span className="notch notch--cobalt" /> DESCEND TO SOURCE · 4 PRS · REAL HISTORY
          </button>
        </div>
      </div>
    </Stage>
  );
}

/* The source well teaser — visible from the project floor. */
function WellTeaser({ onTravel }) {
  const w = LAB.well;
  return (
    <Stage x={w[0]} y={w[1]} w={w[2] - w[0]} h={w[3] - w[1]} k={10} className="well-teaser">
      <button
        type="button"
        className="well-teaser-inner"
        onClick={(e) => {
          e.stopPropagation();
          onTravel?.('flight-source');
        }}
      >
        <div className="well-teaser-label">SOURCE WELL · PR HISTORY</div>
        {FLIGHT_PRS.slice(0, 3).map((pr) => (
          <div key={pr.id} className="well-teaser-row">
            <span>#{pr.id}</span> {pr.title}
          </div>
        ))}
        <div className="well-teaser-more">KEEP DESCENDING ↓</div>
      </button>
    </Stage>
  );
}

/* The source well — the deepest stratum. Authored at 100:1. */
function SourceWell() {
  const w = LAB.well;
  const pr = FLIGHT_PRS[0];
  return (
    <Stage x={w[0]} y={w[1]} w={w[2] - w[0]} h={w[3] - w[1]} k={100} className="source-well">
      <div className="well-inner">
        <header className="well-head">
          <div className="well-head-left">
            <div className="well-kicker">AI-LAB / JARVIS / FLIGHT / SOURCE</div>
            <div className="well-title">
              PR #{pr.id} — {pr.title}
            </div>
            <div className="well-meta">
              <span className="statechip statechip--merged">MERGED</span>
              <span>{pr.branch}</span>
              <span>{pr.date}</span>
              <span className="diffstat">
                <em>+{pr.adds}</em> <s>−{pr.dels}</s>
              </span>
            </div>
          </div>
          <div className="well-depth">DEPTH 6 / 6 · BEDROCK</div>
        </header>

        <div className="well-columns">
          <div className="well-main">
            <p className="well-body">{pr.body}</p>
            <p className="well-voice">“{pr.note}”</p>

            <div className="well-commits">
              <div className="well-sublabel">COMMITS</div>
              {FLIGHT_COMMITS.map((c) => (
                <div key={c.sha} className="commit-row">
                  <span className="commit-sha">{c.sha}</span>
                  <span className="commit-msg">{c.msg}</span>
                  <span className="commit-date">{c.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="well-side">
            <div className="well-sublabel">EARLIER PRS</div>
            {FLIGHT_PRS.slice(1).map((p) => (
              <div key={p.id} className="pr-row">
                <div className="pr-row-head">
                  <span className="pr-id">#{p.id}</span>
                  <span className="pr-title">{p.title}</span>
                </div>
                <div className="pr-row-meta">
                  {p.date} · <em>+{p.adds}</em> <s>−{p.dels}</s>
                </div>
              </div>
            ))}

            <div className="well-sublabel" style={{ marginTop: 56 }}>
              WHAT THE ROCK REMEMBERS
            </div>
            {FLIGHT_LESSONS.map((l) => (
              <div key={l} className="lesson-row">
                {l}
              </div>
            ))}
          </div>
        </div>

        <footer className="well-foot">
          <span>NOTHING BELOW THIS POINT — PRESS 0 TO SURFACE</span>
          <Checksum seed="flight" size={40} />
        </footer>
      </div>
    </Stage>
  );
}

export default function AiLab({ onTravel }) {
  return (
    <>
      {/* the basin floor */}
      <Band zin={0.8} fin={0.35}>
        <div className="lab-basin" style={rect(LAB.basin)}>
          <div className="lab-basin-head">
            <span className="engraved-label">
              <span className="notch" />
              AI-LAB · CONNECTED INTELLIGENT SYSTEMS
            </span>
            <span className="lab-basin-note">ORCHESTRATED BY JARVIS · EST. 2024</span>
          </div>
        </div>
      </Band>

      {/* trunk + branches */}
      <Band zin={1.0} fin={0.5}>
        <TrunkLines />
      </Band>

      {/* the instrument — dark at every altitude */}
      <PlaceMark
        target="jarvis"
        onTravel={onTravel}
        className="instrument"
        x={LAB.instrument[0]}
        y={LAB.instrument[1]}
        style={{
          width: LAB.instrument[2] - LAB.instrument[0],
          height: LAB.instrument[3] - LAB.instrument[1],
        }}
      >
        <Band zin={0.9} fin={0.4} className="instrument-face">
          <div className="instrument-top">
            <span className="instrument-name">JARVIS</span>
            <span className="instrument-state">ON THE BENCH</span>
          </div>
          <div className="instrument-line">INTENT · CONTEXT · ORCHESTRATION</div>
          <Band zin={2.3} fin={0.9} className="instrument-detail">
            <div className="instrument-desc">
              Understands intent, coordinates specialists, preserves context, presents one coherent
              experience. Owns no outcome of its own — every result must land in a specialist, or
              it does not happen.
            </div>
            <div className="instrument-ports">
              <span>IN · HUMAN INTENT</span>
              <span>OUT · ONE COHERENT ANSWER</span>
            </div>
          </Band>
        </Band>
      </PlaceMark>

      {/* foundation strip */}
      <Band zin={1.9} fin={0.8}>
        <div className="foundation" style={rect(LAB.foundation)}>
          SHARED CONTEXT · MEMORY · TRUST · AUTOMATION BOUNDARIES
        </div>
        <div className="intent-marker" style={{ left: LAB.intent.x - 30, top: LAB.intent.y - 17 }}>
          <span className="intent-dot" />
          HUMAN
          <br />
          INTENT
        </div>
      </Band>

      {/* the five specialist chips */}
      <Band zin={1.05} fin={0.45}>
        {LAB.chips.map((chip) => (
          <SystemChip key={chip.id} chip={chip} onTravel={onTravel} />
        ))}
      </Band>

      {/* Flight — closed plate at system altitude, floor on approach */}
      <Band zin={1.05} fin={0.45} zout={6.4} fout={1.6}>
        <PlaceMark
          target="flight"
          onTravel={onTravel}
          className="syschip syschip--flight"
          x={LAB.flight.rect[0]}
          y={LAB.flight.rect[1]}
          style={{
            width: LAB.flight.rect[2] - LAB.flight.rect[0],
            height: LAB.flight.rect[3] - LAB.flight.rect[1],
          }}
        >
          <span className="syschip-name">Flight</span>
          <Band zin={2.1} fin={0.9} className="syschip-meta">
            <span className="syschip-role">NAVIGATES</span>
            <span className="syschip-state">UNDER TEST</span>
          </Band>
          <Band zin={2.6} fin={1.1} className="syschip-invite">
            A PROJECT FLOOR OPENS AT THIS SITE — APPROACH
          </Band>
        </PlaceMark>
      </Band>

      <Band zin={5.6} fin={2.2}>
        <FlightFloor onTravel={onTravel} />
      </Band>

      <Band zin={8} fin={3} zout={26} fout={7}>
        <WellTeaser onTravel={onTravel} />
      </Band>

      <Band zin={21} fin={9}>
        <SourceWell />
      </Band>
    </>
  );
}
