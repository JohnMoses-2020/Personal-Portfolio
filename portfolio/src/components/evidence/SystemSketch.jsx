import React from 'react';

/*
 * A real artifact: the working system sketch of AI-Lab as documented in the
 * design foundation. Graphite records thought; cobalt records one active
 * responsibility; the retired broadcast bus stays visible as a correction —
 * evidence of change, not a cleaner fiction.
 */

const GRAPHITE = 'var(--ink-muted)';
const FAINT = 'var(--aluminum-strong)';

function Box({ x, y, w, h, label, sub }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={GRAPHITE} strokeWidth="1" rx="1" />
      <text x={x + 12} y={y + 21} fontSize="12" fontWeight="500" fill="var(--ink)" letterSpacing="0.04em">
        {label}
      </text>
      {sub && (
        <text x={x + 12} y={y + 36} fontSize="9" fill={GRAPHITE} letterSpacing="0.1em">
          {sub}
        </text>
      )}
    </g>
  );
}

export default function SystemSketch() {
  return (
    <svg
      className="system-sketch"
      viewBox="0 0 720 470"
      role="img"
      aria-label="Hand-drawn style system sketch: human intent flows into Jarvis, which routes explicitly to six agents. A retired shared event bus is crossed out. Foundation layer beneath."
    >
      {/* title block */}
      <text x="16" y="24" fontSize="10" letterSpacing="0.12em" fill={GRAPHITE}>
        AI-LAB — SYSTEM SKETCH · REV 3
      </text>
      <line x1="16" y1="32" x2="240" y2="32" stroke={FAINT} strokeWidth="1" />

      {/* intent → jarvis */}
      <text x="16" y="130" fontSize="10" letterSpacing="0.1em" fill={GRAPHITE}>
        HUMAN
      </text>
      <text x="16" y="144" fontSize="10" letterSpacing="0.1em" fill={GRAPHITE}>
        INTENT
      </text>
      <path d="M 62 138 H 106" stroke="var(--cobalt)" strokeWidth="1.4" fill="none" />
      <path d="M 101 134 L 108 138 L 101 142" fill="none" stroke="var(--cobalt)" strokeWidth="1.4" />

      <Box x={108} y={108} w={130} h={60} label="Jarvis" sub="ONE ROUTER" />

      {/* trunk */}
      <path d="M 238 138 H 300 V 420 " stroke={GRAPHITE} strokeWidth="1" fill="none" />

      {/* branches to agents */}
      {[
        { y: 70, label: 'Morning Briefing', sub: 'ANTICIPATES' },
        { y: 138, label: 'Calendar', sub: 'COORDINATES', cobalt: true },
        { y: 206, label: 'Reminder', sub: 'REMEMBERS' },
        { y: 274, label: 'Flight', sub: 'NAVIGATES' },
        { y: 342, label: 'Nutrition', sub: 'GUIDES' },
        { y: 410, label: 'Health', sub: 'UNDERSTANDS' },
      ].map((agent) => (
        <g key={agent.label}>
          <path
            d={`M 300 ${agent.y} H 356`}
            stroke={agent.cobalt ? 'var(--cobalt)' : GRAPHITE}
            strokeWidth={agent.cobalt ? 1.4 : 1}
            fill="none"
          />
          <Box x={356} y={agent.y - 24} w={150} h={48} label={agent.label} sub={agent.sub} />
        </g>
      ))}

      {/* trunk vertical needs to start at first branch */}
      <path d="M 300 70 V 138" stroke={GRAPHITE} strokeWidth="1" fill="none" />

      {/* cobalt route: intent → jarvis → calendar (one routed example) */}
      <path d="M 238 138 H 300" stroke="var(--cobalt)" strokeWidth="1.4" fill="none" />
      <text x="16" y="172" fontSize="9" fill="var(--cobalt)" letterSpacing="0.06em">
        one routed example
      </text>

      {/* retired broadcast bus — kept visible as a correction */}
      <path d="M 173 168 V 244 H 348" stroke={FAINT} strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <line x1="236" y1="230" x2="260" y2="258" stroke={GRAPHITE} strokeWidth="1.2" />
      <line x1="260" y1="230" x2="236" y2="258" stroke={GRAPHITE} strokeWidth="1.2" />
      <text x="150" y="264" fontSize="9" fill={GRAPHITE} letterSpacing="0.06em">
        shared event bus — retired 2026-01
      </text>
      <text x="150" y="277" fontSize="9" fill={GRAPHITE} letterSpacing="0.06em">
        (two agents answered one intent)
      </text>

      {/* annotations with leader lines */}
      <text x="540" y="66" fontSize="9" fill={GRAPHITE} letterSpacing="0.06em">
        explicit handoffs —
      </text>
      <text x="540" y="78" fontSize="9" fill={GRAPHITE} letterSpacing="0.06em">
        every action attributable
      </text>
      <path d="M 536 70 L 512 78" stroke={FAINT} strokeWidth="1" fill="none" />

      <text x="96" y="330" fontSize="9" fill={GRAPHITE} letterSpacing="0.06em">
        context scoped per intention,
      </text>
      <text x="96" y="343" fontSize="9" fill={GRAPHITE} letterSpacing="0.06em">
        visibly expiring
      </text>
      <path d="M 160 316 L 172 172" stroke={FAINT} strokeWidth="1" fill="none" strokeDasharray="1 3" />

      {/* foundation */}
      <line x1="108" y1="446" x2="506" y2="446" stroke={GRAPHITE} strokeWidth="1" />
      <text x="108" y="462" fontSize="9" fill={GRAPHITE} letterSpacing="0.1em">
        FOUNDATION: SHARED CONTEXT · MEMORY · TRUST · AUTOMATION BOUNDARIES
      </text>
    </svg>
  );
}
