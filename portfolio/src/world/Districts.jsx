import React from 'react';
import { DECISIONS } from '../content/decisions.js';
import { site } from '../content/site.js';
import { COVE_RECT, DESK_RECT, FARPOINT_RECT, LEDGER } from './geography.js';
import { COVE_ITEMS, DESK_NOTES, LEDGER_INDEX_NOTE, STATIONS } from './deep-content.js';
import { Band, PlaceMark, Stage } from './primitives.jsx';
import Checksum from '../components/common/Checksum.jsx';

/*
 * The warm districts: Decision Ridge (the ledger), The Desk (writing),
 * The Cove (the person), Far Point (correspondence), and the field
 * stations along Highway 1. All paper, graphite, and quiet.
 */

/* ---- Decision Ridge ---- */
export function LedgerDistrict() {
  const r = LEDGER.region;
  const open = DECISIONS[LEDGER.openIndex];
  return (
    <Band zin={1.15} fin={0.5}>
      <Stage x={r[0]} y={r[1]} w={r[2] - r[0]} h={r[3] - r[1]} k={4} className="ledger-stage">
        <div className="ledger-inner">
          <header className="district-head">
            <span className="engraved-label">
              <span className="notch" />
              THE DECISION LEDGER
            </span>
            <span className="district-note">{LEDGER_INDEX_NOTE}</span>
          </header>

          <div className="ledger-body">
            <div className="ledger-list">
              {DECISIONS.map((d, i) => (
                <article key={d.id} className={`ledger-card ${i === LEDGER.openIndex ? 'is-open' : ''}`}>
                  <div className="ledger-card-meta">
                    <span className="ledger-no">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ledger-date">{d.date}</span>
                    <span className="ledger-sys">{d.system.toUpperCase()}</span>
                    {d.failure && <span className="ledger-tag ledger-tag--failure">FAILURE, KEPT</span>}
                    {d.human && <span className="ledger-tag">HUMAN BY DESIGN</span>}
                  </div>
                  <h3 className="ledger-statement">{d.statement}</h3>
                  <p className="ledger-consequence">{d.consequence}</p>
                </article>
              ))}
            </div>

            <aside className="ledger-open-panel">
              <div className="ledger-open-kicker">OPEN ON THE RIDGE · DECISION 02</div>
              <h3 className="ledger-open-title">{open.statement}</h3>
              <div className="ledger-open-row">
                <div className="ledger-open-label">TRIED</div>
                <p>{open.tried}</p>
              </div>
              <div className="ledger-open-row">
                <div className="ledger-open-label">SURPRISED</div>
                <p>{open.surprised}</p>
              </div>
              <div className="ledger-open-row">
                <div className="ledger-open-label">CHANGED</div>
                <p>{open.changed}</p>
              </div>
              <div className="ledger-open-foot">
                AFFECTS · {open.affects.map((a) => a.toUpperCase()).join(' · ')}
              </div>
            </aside>
          </div>
        </div>
      </Stage>
    </Band>
  );
}

/* ---- The Desk ---- */
export function DeskDistrict() {
  const r = DESK_RECT;
  return (
    <Band zin={1.15} fin={0.5}>
      <Stage x={r[0]} y={r[1]} w={r[2] - r[0]} h={r[3] - r[1]} k={4} className="desk-stage">
        <div className="desk-inner">
          <header className="district-head">
            <span className="engraved-label">
              <span className="notch" />
              THE DESK · WRITING
            </span>
            <span className="district-note">Field notes that turned into principles.</span>
          </header>
          <div className="desk-sheets">
            {DESK_NOTES.map((n, i) => (
              <article key={n.id} className="desk-sheet" style={{ '--tilt': `${(i - 1) * 0.5}deg` }}>
                <div className="desk-sheet-meta">
                  {n.date} · {n.words} WORDS
                </div>
                <h3 className="desk-sheet-title">{n.title}</h3>
                <p className="desk-sheet-lede">{n.lede}</p>
                <div className="desk-sheet-foot">READ AT THE DESK →</div>
              </article>
            ))}
          </div>
        </div>
      </Stage>
    </Band>
  );
}

/* ---- The Cove ---- */
export function CoveDistrict() {
  const r = COVE_RECT;
  return (
    <Band zin={1.15} fin={0.5}>
      <Stage x={r[0]} y={r[1]} w={r[2] - r[0]} h={r[3] - r[1]} k={4} className="cove-stage">
        <div className="cove-inner">
          <header className="district-head">
            <span className="engraved-label">
              <span className="notch" />
              THE COVE · THE PERSON
            </span>
            <span className="district-note">Builds software at scale at Microsoft. Off the clock:</span>
          </header>
          <div className="cove-shelf">
            {COVE_ITEMS.map((item) => (
              <article key={item.id} className="cove-item">
                <div className="cove-item-mark">{item.mark}</div>
                <h3 className="cove-item-name">{item.name}</h3>
                <p className="cove-item-line">{item.line}</p>
              </article>
            ))}
          </div>
          <p className="cove-moment">
            “The best systems I know are the ones that let you stop thinking about them.”
          </p>
        </div>
      </Stage>
    </Band>
  );
}

/* ---- Far Point ---- */
export function FarPointDistrict() {
  const r = FARPOINT_RECT;
  return (
    <Band zin={1.15} fin={0.5}>
      <Stage x={r[0]} y={r[1]} w={r[2] - r[0]} h={r[3] - r[1]} k={4} className="farpoint-stage">
        <div className="farpoint-inner">
          <div className="farpoint-beacon" aria-hidden="true">
            <Checksum seed="far-point" size={44} />
          </div>
          <div className="engraved-label">
            <span className="notch" />
            FAR POINT · CORRESPONDENCE
          </div>
          <p className="farpoint-invite">{site.farEnd.invitation}</p>
          <div className="farpoint-actions">
            <a
              className="quiet-button"
              href={`mailto:${site.farEnd.email.value}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="notch notch--cobalt" />
              Write to John
            </a>
            <a
              className="notch-link"
              href={site.farEnd.references[0].href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="notch" />
              GitHub
            </a>
          </div>
          <div className="farpoint-status">
            {site.farEnd.status.toUpperCase()} · LAST REVISION {site.farEnd.lastRevision}
          </div>
        </div>
      </Stage>
    </Band>
  );
}

/* ---- Field stations on Highway 1 ---- */
export function Stations({ onTravel }) {
  return (
    <>
      {STATIONS.map((s, i) => {
        const pos = [
          { x: 1895, y: 706 },
          { x: 1800, y: 1256 },
          { x: 1855, y: 1786 },
        ][i];
        return (
          <React.Fragment key={s.id}>
            <PlaceMark
              target={s.id}
              onTravel={onTravel}
              x={pos.x - 7}
              y={pos.y - 7}
              className="station-dot"
            >
              <span />
            </PlaceMark>
            <Band zin={1.0} fin={0.5} zout={16} fout={6}>
              <div className="station-mark" style={{ left: pos.x + 16, top: pos.y - 9 }}>
                {s.mark}
              </div>
            </Band>
            <Band zin={2.7} fin={1.1}>
              <Stage x={pos.x + 16} y={pos.y + 8} w={150} h={94} k={4} className="station-stage">
                <article className="station-card">
                  <div className="station-card-head">
                    <span className="station-card-name">{s.name}</span>
                    <span className="station-card-kind">{s.kind.toUpperCase()}</span>
                  </div>
                  <div className="station-card-meta">
                    {s.coord} · {s.time}
                  </div>
                  <div className="station-palette" aria-hidden="true">
                    {s.palette.map((c) => (
                      <span key={c} style={{ background: c }} />
                    ))}
                  </div>
                  <p className="station-obs">{s.observation}</p>
                  <div className="station-fed">FED INTO · {s.fedInto.toUpperCase()}</div>
                </article>
              </Stage>
            </Band>
          </React.Fragment>
        );
      })}

      {/* island plaque */}
      <Band zin={2.2} fin={0.9}>
        <Stage x={1062} y={2470} w={190} h={64} k={4} className="island-stage">
          <div className="island-plaque">
            <div className="island-plaque-head">
              <Checksum seed="pixel-2020" size={22} />
              <span>PIXEL ISLAND · ARCHIVED ERA</span>
            </div>
            <p>
              The 2020 portfolio, kept offshore rather than erased. Its pixel marks survive as the
              checksum stamps found across the mainland.
            </p>
          </div>
        </Stage>
      </Band>
    </>
  );
}
