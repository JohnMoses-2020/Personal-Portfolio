import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ALTITUDES,
  PLACES,
  WORLD,
  altitudeForZoom,
  breadcrumbFor,
  scaleLabel,
  toLatLon,
} from './geography.js';
import Checksum from '../components/common/Checksum.jsx';

/* ---- Top bar: identity, trail, travel ---- */
export function TopBar({ view, onTravel, onOpenPalette }) {
  const crumbs = breadcrumbFor(view.x, view.y, view.z);
  return (
    <header className="hud hud-top">
      <div className="hud-top-left">
        <Checksum seed="john-moses" size={18} />
        <span className="hud-name">John Moses</span>
        <span className="hud-role">SOFTWARE ENGINEER · MICROSOFT</span>
      </div>

      <nav className="hud-trail" aria-label="Location">
        {crumbs.map((c, i) => (
          <React.Fragment key={c.id}>
            {i > 0 && <span className="hud-trail-sep">/</span>}
            <button
              type="button"
              className={`hud-trail-item ${i === crumbs.length - 1 ? 'is-here' : ''}`}
              onClick={() => onTravel(c.id)}
            >
              {c.label}
            </button>
          </React.Fragment>
        ))}
      </nav>

      <div className="hud-top-right">
        <button type="button" className="hud-travel" onClick={onOpenPalette}>
          Travel <kbd>⌘K</kbd>
        </button>
        <a className="hud-write" href="mailto:johnmoses4949@gmail.com">
          Write to John
        </a>
      </div>
    </header>
  );
}

/* ---- Bottom-left survey readout ---- */
export function Readout({ view }) {
  const { lat, lon } = toLatLon(view.x, view.y);
  const alt = altitudeForZoom(view.z);
  return (
    <div className="hud hud-readout">
      <span>{lat}</span>
      <span className="hud-readout-sep">·</span>
      <span>{lon}</span>
      <span className="hud-readout-sep">·</span>
      <span>{scaleLabel(view.z)}</span>
      <span className="hud-readout-sep">·</span>
      <span className="hud-readout-alt">{alt.label.toUpperCase()}</span>
    </div>
  );
}

/* ---- Right altitude rail ---- */
export function AltitudeRail({ view, onSelect }) {
  const lo = Math.log(0.36);
  const hi = Math.log(60);
  const t = (Math.log(view.z) - lo) / (hi - lo);
  const current = altitudeForZoom(view.z);
  return (
    <div className="hud hud-rail" aria-label="Altitude">
      <div className="hud-rail-track">
        <div className="hud-rail-indicator" style={{ top: `${(1 - t) * 100}%` }} />
        {ALTITUDES.map((a) => {
          const at = (Math.log(a.z) - lo) / (hi - lo);
          return (
            <button
              key={a.id}
              type="button"
              className={`hud-rail-stop ${current.id === a.id ? 'is-current' : ''}`}
              style={{ top: `${(1 - at) * 100}%` }}
              onClick={() => onSelect(a.z)}
            >
              <span className="hud-rail-tick" />
              <span className="hud-rail-label">{a.label.toUpperCase()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Minimap ---- */
const MINI_COAST =
  'M59,-2 C58,7 57,14 59,21 C60,27 55,32 53,38 C52,44 57,47 56,52 C55,57 50,60 47,65 C45,69 44,71 43,73 C42,76 43,79 41,82 C39,85 37,87 35,90 C34,93 33,97 33,102';

export function Minimap({ view, onJump }) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const sx = 160 / WORLD.w;
  const sy = 100 / WORLD.h;
  const rw = Math.min(160, (vw / view.z) * sx);
  const rh = Math.min(100, (vh / view.z) * sy);
  const rx = Math.max(0, Math.min(160 - rw, view.x * sx - rw / 2));
  const ry = Math.max(0, Math.min(100 - rh, view.y * sy - rh / 2));

  const dots = useMemo(
    () => PLACES.filter((p) => ['ailab', 'ledger', 'desk', 'cove', 'farpoint', 'island'].includes(p.id)),
    [],
  );

  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * WORLD.w;
    const y = ((e.clientY - r.top) / r.height) * WORLD.h;
    onJump(x, y);
  };

  return (
    <button type="button" className="hud hud-minimap" onClick={handleClick} aria-label="Overview map">
      <svg width="160" height="100" viewBox="0 0 160 100">
        <rect x="0" y="0" width="160" height="100" fill="var(--sea-mini)" />
        <path d={`${MINI_COAST} L162,102 L162,-2 Z`} fill="var(--bench-raised)" />
        <path d={MINI_COAST} fill="none" stroke="var(--aluminum-strong)" strokeWidth="0.8" />
        {dots.map((p) => (
          <circle key={p.id} cx={p.x * sx} cy={p.y * sy} r="1.7" fill="var(--engraved)" />
        ))}
        <rect
          x={rx}
          y={ry}
          width={rw}
          height={rh}
          fill="none"
          stroke="var(--cobalt)"
          strokeWidth="1.2"
        />
      </svg>
    </button>
  );
}

/* ---- First-visit hint ---- */
export function Hint({ dismissed }) {
  return (
    <div className={`hud hud-hint ${dismissed ? 'is-dismissed' : ''}`}>
      SCROLL TO DESCEND · DRAG TO TRAVEL · <kbd>⌘K</kbd> TO FLY ANYWHERE
    </div>
  );
}

/* ---- ⌘K travel palette ---- */
export function TravelPalette({ open, onClose, onGo }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = PLACES.filter((p) => p.id !== 'overview');
    if (!q) return pool;
    return pool.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.kind.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  if (!open) return null;

  const go = (id) => {
    onGo(id);
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' && results[index]) {
      go(results[index].id);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="palette-scrim" onClick={onClose} role="presentation">
      <div
        className="palette"
        role="dialog"
        aria-label="Travel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="palette-input-row">
          <span className="palette-glyph">→</span>
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Fly to…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <span className="palette-esc">ESC</span>
        </div>
        <div className="palette-results">
          {results.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`palette-row ${i === index ? 'is-active' : ''}`}
              onMouseEnter={() => setIndex(i)}
              onClick={() => go(p.id)}
            >
              <span className="palette-row-name">{p.name}</span>
              <span className="palette-row-kind">
                {p.kind.toUpperCase()} · {p.district.toUpperCase()}
              </span>
            </button>
          ))}
          {results.length === 0 && <div className="palette-empty">Nowhere by that name yet.</div>}
        </div>
      </div>
    </div>
  );
}
