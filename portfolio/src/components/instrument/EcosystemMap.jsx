import React, { useMemo } from 'react';
import {
  AGENTS,
  JARVIS,
  REGIONS,
  FOUNDATION,
  INTENT_MARKER,
  ROUTING,
} from '../../content/ecosystem.js';
import { transferDuration } from '../../lib/motion-tiers.js';

/*
 * The instrument: AI-Lab as etched geometry behind smoked glass.
 * Signals travel trunk-and-branch from Jarvis — explicit routes, no broadcast,
 * and no connector ever crosses a plate or another signal.
 */

const RESPONSE_MS = 240;
const INTENT_PATH = `M ${INTENT_MARKER.x + 92} 300 H ${JARVIS.plate.x}`;
const INTENT_LENGTH = JARVIS.plate.x - (INTENT_MARKER.x + 92);

function branchGeometry(agent) {
  const out = ROUTING.jarvisOut;
  const d = `M ${out.x} ${out.y} H ${ROUTING.trunkX} V ${agent.branchY} H ${agent.plate.x}`;
  const length =
    Math.abs(ROUTING.trunkX - out.x) +
    Math.abs(agent.branchY - out.y) +
    Math.abs(agent.plate.x - ROUTING.trunkX);
  return { d, length };
}

export function buildSequence(agentIds, reducedMotion) {
  const paths = [];
  const plateDelays = {};

  if (reducedMotion) {
    paths.push({ id: 'intent-jarvis', d: INTENT_PATH, dur: 160, delay: 0 });
    plateDelays[JARVIS.id] = 60;
    agentIds.forEach((id, index) => {
      const agent = AGENTS.find((a) => a.id === id);
      if (!agent) return;
      const { d } = branchGeometry(agent);
      paths.push({ id, d, dur: 160, delay: 120 + index * 90 });
      plateDelays[id] = 160 + index * 90;
    });
    return { paths, plateDelays };
  }

  const introDur = transferDuration(INTENT_LENGTH);
  paths.push({ id: 'intent-jarvis', d: INTENT_PATH, dur: introDur, delay: 0 });
  plateDelays[JARVIS.id] = introDur;
  let clock = introDur + RESPONSE_MS;

  agentIds.forEach((id) => {
    const agent = AGENTS.find((a) => a.id === id);
    if (!agent) return;
    const { d, length } = branchGeometry(agent);
    const dur = transferDuration(length);
    paths.push({ id, d, dur, delay: clock });
    plateDelays[id] = clock + dur;
    clock += dur + RESPONSE_MS;
  });

  return { paths, plateDelays };
}

function AgentPlate({ agent, status, delay, pinned, onFocus, onBlur, onPin }) {
  const { x, y, w, h } = agent.plate;
  const handleKey = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPin(agent.id);
    }
  };
  return (
    <g
      className="imap__node"
      data-status={status}
      style={delay != null ? { transitionDelay: `${delay}ms` } : undefined}
      tabIndex={0}
      role="button"
      aria-pressed={pinned}
      aria-label={`${agent.name} — ${agent.role}. State: ${agent.state}.`}
      onMouseEnter={() => onFocus(agent.id)}
      onMouseLeave={() => onBlur(agent.id)}
      onFocus={() => onFocus(agent.id)}
      onBlur={() => onBlur(agent.id)}
      onClick={() => onPin(agent.id)}
      onKeyDown={handleKey}
    >
      <rect className="imap__plate" x={x} y={y} width={w} height={h} rx="1.5" />
      <rect x={x} y={y} width="5" height="5" fill="var(--instrument-line-strong)" />
      <text className="imap__name" x={x + 16} y={y + 23}>
        {agent.name}
      </text>
      <text className="imap__role" x={x + 16} y={y + 40}>
        {agent.role.toUpperCase()}
      </text>
    </g>
  );
}

export default function EcosystemMap({
  view,
  scenario,
  wake,
  focusedAgent,
  pinnedAgent,
  reducedMotion,
  onFocusAgent,
  onPinAgent,
}) {
  const participants = useMemo(
    () => (scenario ? scenario.participants.filter((id) => id !== 'jarvis' && id !== 'human') : null),
    [scenario],
  );

  const sequence = useMemo(() => {
    if (participants) return buildSequence(participants, reducedMotion);
    if (wake) return buildSequence(['calendar', 'reminder'], reducedMotion);
    return null;
  }, [participants, wake, reducedMotion]);

  const sequenceKey = scenario ? `scenario-${scenario.id}` : wake ? 'wake' : 'none';
  const inspecting = focusedAgent || pinnedAgent;

  const statusOf = (agentId) => {
    if (scenario) return participants.includes(agentId) ? 'active' : 'receded';
    if (inspecting) {
      if (agentId === inspecting) return 'active';
      const focused = AGENTS.find((a) => a.id === inspecting);
      if (focused && focused.exchanges.includes(agentId)) return 'related';
      return 'receded';
    }
    if (wake) return agentId === 'calendar' || agentId === 'reminder' ? 'related' : 'dormant';
    return 'dormant';
  };

  const jarvisStatus = scenario ? 'active' : inspecting ? 'related' : wake ? 'related' : 'dormant';

  const contextChain = scenario
    ? ['JARVIS', ...participants.map((id) => AGENTS.find((a) => a.id === id).name.toUpperCase())].join(' → ')
    : null;

  return (
    <svg
      className={`imap ${scenario || inspecting ? 'imap--engaged' : ''} ${view === 'outcomes' ? 'imap--outcomes' : ''} ${
        reducedMotion ? 'imap--rm' : ''
      }`}
      viewBox="0 0 1000 640"
      role="group"
      aria-label="AI-Lab ecosystem map. Jarvis coordinates six specialist capabilities across Daily Intelligence, Time, Movement, and Wellbeing."
    >
      {/* ---- context label ---- */}
      <text className="imap__context-label" x="976" y="34" textAnchor="end">
        {scenario ? (
          <>
            <tspan>INTENT: </tspan>
            <tspan className="is-cobalt">{scenario.label.toUpperCase()}</tspan>
            <tspan> · {contextChain}</tspan>
          </>
        ) : (
          <tspan>INTENT — AWAITING</tspan>
        )}
      </text>

      {/* ---- regions ---- */}
      <g className="imap__chrome">
        {REGIONS.map((region) => (
          <g key={region.id}>
            <rect
              className="imap__region-band"
              x={region.band.x}
              y={region.band.y}
              width={region.band.w}
              height={region.band.h}
            />
            <text className="imap__region-name" x={region.band.x + 14} y={region.band.y + 20}>
              {region.name.toUpperCase()}
            </text>
            <text className="imap__outcome" x={region.band.x + region.band.w - 14} y={region.band.y + 20} textAnchor="end">
              {region.outcome}
            </text>
          </g>
        ))}
      </g>

      {/* ---- static structure: intent line, trunk, branches, foundation ---- */}
      <g className="imap__structure">
        <path d={INTENT_PATH} />
        <path d={`M ${ROUTING.jarvisOut.x} 300 H ${ROUTING.trunkX}`} />
        <path d={`M ${ROUTING.trunkX} ${ROUTING.trunkTop} V ${ROUTING.trunkBottom}`} />
        {AGENTS.map((agent) => (
          <path key={agent.id} d={`M ${ROUTING.trunkX} ${agent.branchY} H ${agent.plate.x}`} />
        ))}
        <path
          d={`M ${JARVIS.plate.x + JARVIS.plate.w / 2} ${JARVIS.plate.y + JARVIS.plate.h} V ${FOUNDATION.plate.y}`}
          strokeDasharray="2 5"
        />
      </g>

      {/* ---- intent marker ---- */}
      <g className="imap__chrome">
        <text className="imap__intent-label" x={INTENT_MARKER.x} y="295">
          HUMAN
        </text>
        <text className="imap__intent-label" x={INTENT_MARKER.x} y="309">
          INTENT
        </text>
        <rect x={INTENT_MARKER.x + 86} y="297" width="6" height="6" fill="var(--fog-dim)" />
      </g>

      {/* ---- transfer signals ---- */}
      {sequence && (
        <g key={sequenceKey}>
          {sequence.paths.map((path) => (
            <path
              key={path.id}
              className="imap__transfer"
              d={path.d}
              pathLength="1"
              style={{ '--dur': `${path.dur}ms`, '--delay': `${path.delay}ms` }}
            />
          ))}
        </g>
      )}

      {/* ---- Jarvis ---- */}
      <g
        className="imap__node"
        data-status={jarvisStatus}
        style={sequence ? { transitionDelay: `${sequence.plateDelays[JARVIS.id] ?? 0}ms` } : undefined}
        tabIndex={0}
        role="button"
        aria-pressed={pinnedAgent === JARVIS.id}
        aria-label={`Jarvis — ${JARVIS.label}. State: ${JARVIS.state}.`}
        onMouseEnter={() => onFocusAgent(JARVIS.id)}
        onMouseLeave={() => onFocusAgent(null)}
        onFocus={() => onFocusAgent(JARVIS.id)}
        onBlur={() => onFocusAgent(null)}
        onClick={() => onPinAgent(JARVIS.id)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onPinAgent(JARVIS.id);
          }
        }}
      >
        <rect
          className="imap__plate"
          x={JARVIS.plate.x}
          y={JARVIS.plate.y}
          width={JARVIS.plate.w}
          height={JARVIS.plate.h}
          rx="1.5"
        />
        <rect x={JARVIS.plate.x} y={JARVIS.plate.y} width="5" height="5" fill="var(--instrument-line-strong)" />
        <text className="imap__name" x={JARVIS.plate.x + 18} y={JARVIS.plate.y + 26}>
          Jarvis
        </text>
        <text className="imap__role" x={JARVIS.plate.x + 18} y={JARVIS.plate.y + 44}>
          INTENT · CONTEXT
        </text>
        <text className="imap__role" x={JARVIS.plate.x + 18} y={JARVIS.plate.y + 58}>
          ORCHESTRATION
        </text>
      </g>

      {/* ---- agents ---- */}
      {AGENTS.map((agent) => (
        <AgentPlate
          key={agent.id}
          agent={agent}
          status={statusOf(agent.id)}
          delay={sequence && scenario ? sequence.plateDelays[agent.id] : null}
          pinned={pinnedAgent === agent.id}
          onFocus={onFocusAgent}
          onBlur={() => onFocusAgent(null)}
          onPin={onPinAgent}
        />
      ))}

      {/* ---- foundation ---- */}
      <g className="imap__chrome">
        <rect
          className="imap__region-band"
          x={FOUNDATION.plate.x}
          y={FOUNDATION.plate.y}
          width={FOUNDATION.plate.w}
          height={FOUNDATION.plate.h}
        />
        {FOUNDATION.lines.map((line, index) => (
          <text
            key={line}
            className="imap__foundation-text"
            x={FOUNDATION.plate.x + 16}
            y={FOUNDATION.plate.y + 26 + index * 18}
          >
            {line}
          </text>
        ))}
      </g>
    </svg>
  );
}
