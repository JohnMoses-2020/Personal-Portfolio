/*
 * The AI-Lab ecosystem — the one data structure behind the instrument map,
 * the scenarios, the focus panel, and the far-end index.
 *
 * Geometry lives in the map's own coordinate space (viewBox 1000 × 640) so
 * connectors can be routed once, by hand, with no crossings.
 *
 * Maturity states are provisional until John confirms them.
 * Allowed states: In daily use · On the bench · Under test · Retired with lessons.
 */

export const JARVIS = {
  id: 'jarvis',
  name: 'Jarvis',
  label: 'Intent · Context · Orchestration',
  description:
    'Understands intent, coordinates specialists, preserves context, and presents one coherent experience.',
  state: 'On the bench',
  stateProvisional: true,
  plate: { x: 200, y: 264, w: 168, h: 72 },
};

export const INTENT_MARKER = { x: 60, y: 300, label: 'Human intent' };

export const FOUNDATION = {
  lines: ['Shared context · Memory · Trust', 'Automation boundaries · Design principles'],
  plate: { x: 112, y: 500, w: 296, h: 64 },
};

export const REGIONS = [
  {
    id: 'daily',
    name: 'Daily Intelligence',
    outcome: 'A useful start to the day',
    band: { x: 516, y: 56, w: 460, h: 96 },
  },
  {
    id: 'time',
    name: 'Time',
    outcome: 'Hours protected, loops closed',
    band: { x: 516, y: 174, w: 460, h: 138 },
  },
  {
    id: 'movement',
    name: 'Movement',
    outcome: 'Certainty in motion',
    band: { x: 516, y: 336, w: 460, h: 94 },
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing',
    outcome: 'Patterns, privately understood',
    band: { x: 516, y: 454, w: 460, h: 162 },
  },
];

export const AGENTS = [
  {
    id: 'morning-briefing',
    name: 'Morning Briefing',
    role: 'Anticipates',
    region: 'daily',
    purpose: 'Turns context into a useful start to the day.',
    state: 'In daily use',
    stateProvisional: true,
    latestChange: { date: '2026-06', note: 'Brief now leads with what changed overnight.' },
    latestChangeProvisional: true,
    exchanges: ['calendar', 'reminder'],
    plate: { x: 540, y: 82, w: 172, h: 52 },
    branchY: 108,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    role: 'Coordinates',
    region: 'time',
    purpose: 'Protects time and resolves scheduling friction.',
    state: 'In daily use',
    stateProvisional: true,
    latestChange: { date: '2026-05', note: 'Conflicts are flagged, never resolved silently.' },
    latestChangeProvisional: true,
    exchanges: ['morning-briefing', 'reminder', 'flight'],
    plate: { x: 540, y: 196, w: 172, h: 52 },
    branchY: 222,
  },
  {
    id: 'reminder',
    name: 'Reminder',
    role: 'Remembers',
    region: 'time',
    purpose: 'Closes loops before they become cognitive load.',
    state: 'In daily use',
    stateProvisional: true,
    latestChange: { date: '2026-04', note: 'Accepts obligations handed off by other agents.' },
    latestChangeProvisional: true,
    exchanges: ['calendar', 'flight', 'morning-briefing'],
    plate: { x: 780, y: 256, w: 172, h: 52 },
    branchY: 282,
  },
  {
    id: 'flight',
    name: 'Flight',
    role: 'Navigates',
    region: 'movement',
    purpose: 'Reduces uncertainty around movement and travel.',
    state: 'Under test',
    stateProvisional: true,
    latestChange: { date: '2026-06', note: 'Auto-booking removed; it prepares and asks.' },
    latestChangeProvisional: true,
    exchanges: ['calendar', 'reminder'],
    plate: { x: 540, y: 370, w: 172, h: 52 },
    branchY: 396,
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    role: 'Guides',
    region: 'wellbeing',
    purpose: 'Makes everyday food decisions more informed.',
    state: 'On the bench',
    stateProvisional: true,
    latestChange: { date: '2026-03', note: 'Reports patterns; the lecture was cut.' },
    latestChangeProvisional: true,
    exchanges: ['health'],
    plate: { x: 540, y: 474, w: 172, h: 52 },
    branchY: 500,
  },
  {
    id: 'health',
    name: 'Health',
    role: 'Understands',
    region: 'wellbeing',
    purpose: 'Finds useful patterns across personal wellbeing.',
    state: 'Under test',
    stateProvisional: true,
    latestChange: { date: '2026-05', note: 'Correlations now carry a confidence range.' },
    latestChangeProvisional: true,
    exchanges: ['nutrition'],
    plate: { x: 780, y: 546, w: 172, h: 52 },
    branchY: 572,
  },
];

/* Routing constants for the trunk-and-branch connector system. */
export const ROUTING = {
  trunkX: 452,
  jarvisOut: { x: 368, y: 300 },
  trunkTop: 108,
  trunkBottom: 572,
};

export function agentById(id) {
  return AGENTS.find((agent) => agent.id === id);
}
