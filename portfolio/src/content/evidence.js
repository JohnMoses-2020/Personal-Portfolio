/*
 * Evidence assemblies — one primary artifact each, with a decision note,
 * provenance, one supporting trace, and a three-depth lens.
 *
 * Rule: show only what is real. The Jarvis assembly carries a real artifact —
 * the working system sketch. The other three hold reserved bench positions,
 * labeled honestly, until John supplies the artifacts listed in
 * docs/design/07-open-questions.md. Swapping one in is a content edit here.
 */

export const EVIDENCE = [
  {
    id: 'jarvis-orchestration',
    system: 'Jarvis',
    checksumSeed: 'jarvis',
    title: 'The orchestration sketch',
    kind: 'System sketch',
    state: 'On the bench',
    date: '2026-07',
    revision: 'rev 3',
    provisionalState: true,
    artifact: { type: 'system-sketch' },
    decisionNote:
      'Jarvis routes intent and carries context. It owns no outcome of its own — every result must land in a specialist, or it does not happen.',
    supporting: {
      label: 'Iteration trace',
      body: 'Rev 1 let agents subscribe to intent directly. Rev 2 added a shared bus. Rev 3 removed both: one router, explicit handoffs.',
      provisional: true,
    },
    depths: {
      experience:
        'From the outside there is no Jarvis. There is a morning that starts usefully, a trip that plans itself around the week, and time that holds. The coordinator is invisible when it works.',
      decisions:
        'The consequential choice: Jarvis never acts, it delegates. Alternatives considered — a monolithic assistant, and agents that talk to each other freely. Both blurred responsibility. One router keeps every action attributable.',
      architecture:
        'Intent enters once. Jarvis resolves it against shared context and dispatches along explicit routes — trunk and branch, no broadcast. Specialists return results and obligations; Jarvis composes one coherent answer. Foundation services sit beneath: context, memory, trust, boundaries.',
    },
  },
  {
    id: 'flight-decision',
    system: 'Flight',
    checksumSeed: 'flight',
    title: 'A decision under uncertainty',
    kind: 'Decision record',
    state: 'Under test',
    date: '2026-06',
    revision: 'rev 2',
    provisionalState: true,
    artifact: {
      type: 'reserved',
      awaiting: 'The June decision record: two surviving options, the fare-volatility caveat, and the rejected auto-book path.',
      shape: 'document',
    },
    decisionNote:
      'The rejected approach mattered more than the chosen one: auto-booking under a price threshold was built, tested, and removed.',
    supporting: {
      label: 'Rejected approach',
      body: 'Auto-book cleared every technical bar and still failed — the problem was regret, not confidence. Removal note pending.',
      provisional: true,
    },
    depths: {
      experience:
        'Flight hands over two options and one honest caveat, then waits. It feels less like a booking engine and more like a colleague who did the homework.',
      decisions:
        'What was protected: trust over speed. A wrong automatic booking costs more confidence than a hundred correct ones earn.',
      architecture:
        'Options are scored against calendar constraints and route history; uncertainty is carried as a first-class value, not stripped from the summary. The approval gate is structural — there is no code path that books without a human token.',
    },
  },
  {
    id: 'time-handoff',
    system: 'Calendar · Reminder',
    checksumSeed: 'calendar-reminder',
    title: 'The handoff that closes loops',
    kind: 'Handoff trace',
    state: 'In daily use',
    date: '2026-05',
    revision: 'rev 4',
    provisionalState: true,
    artifact: {
      type: 'reserved',
      awaiting: 'A real handoff trace: Calendar detecting the unresolved follow-up and Reminder accepting it, with timestamps.',
      shape: 'trace',
    },
    decisionNote:
      'Obligations transfer explicitly. A loop either belongs to Reminder or it belongs to John — it never floats between systems.',
    supporting: {
      label: 'Iteration note',
      body: 'Earlier versions re-surfaced loops on a timer. Now they re-surface on relevance. The iteration note is pending.',
      provisional: true,
    },
    depths: {
      experience:
        'A meeting ends with an unresolved thread, and by evening the thread has a keeper. Nothing is remembered by trying hard.',
      decisions:
        'Tradeoff: fewer, better reminders. Every additional nudge trains the person to ignore all of them.',
      architecture:
        'Calendar emits an obligation with provenance; Reminder acknowledges receipt before Calendar releases it. Two-phase, so a loop is never silently dropped between systems.',
    },
  },
  {
    id: 'wellbeing-boundary',
    system: 'Health · Nutrition',
    checksumSeed: 'wellbeing',
    title: 'Where the system stops',
    kind: 'Boundary artifact',
    state: 'Under test',
    date: '2026-03',
    revision: 'rev 1',
    provisionalState: true,
    artifact: {
      type: 'reserved',
      awaiting: 'The wellbeing artifact that shows the boundary: a weekly pattern summary with the local-only data path visible.',
      shape: 'panel',
    },
    decisionNote:
      'Wellbeing data is computed where it is collected. There is no sync, no cloud copy, and no diagnosis — patterns only.',
    supporting: {
      label: 'Boundary trace',
      body: 'The constraint shrank the feature set to what can be inspected on one machine. The scope note is pending.',
      provisional: true,
    },
    depths: {
      experience:
        'The system knows the week was hard on sleep, and no one else does. That is the feature.',
      decisions:
        'What was protected: the right to be unquantified in public. Privacy here is an architecture decision, not a settings page.',
      architecture:
        'Signals resolve on-device; correlations run locally against a rolling window; only the rendered summary ever reaches a screen. The network boundary is enforced at the process level.',
    },
  },
];

export const DEPTH_LEVELS = [
  { id: 'experience', label: 'Experience' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'architecture', label: 'Architecture' },
];
