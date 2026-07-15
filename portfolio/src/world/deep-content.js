/*
 * Source-level material — the deepest stratum of the landscape.
 * PR history, commits, tradeoffs, field notes, desk writing. Everything here
 * is drafted from John's decision records; provisional entries are marked.
 */

export const FLIGHT_PRS = [
  {
    id: 247,
    title: 'Remove auto-booking path entirely',
    state: 'Merged',
    date: '2025-11-14',
    branch: 'flight/remove-autobook',
    adds: 184, dels: 1240,
    body:
      'Deletes the sub-threshold auto-book path and its 24-hour safety net. Booking money is now a structural human decision: every itinerary ends at a prepared approval, never at a completed purchase.',
    note: 'The rejected approach worked technically. It failed on regret, not confidence.',
  },
  {
    id: 231,
    title: 'Carry fare uncertainty as a first-class value',
    state: 'Merged',
    date: '2025-10-02',
    branch: 'flight/uncertainty-value',
    adds: 462, dels: 118,
    body:
      'Fare volatility is no longer stripped from summaries. Each option carries a confidence range surfaced verbatim in the recommendation.',
    note: 'Honesty about uncertainty reads as competence, not weakness.',
  },
  {
    id: 219,
    title: 'Score options against calendar constraints',
    state: 'Merged',
    date: '2025-08-21',
    branch: 'flight/calendar-scoring',
    adds: 388, dels: 74,
    body:
      'Flight asks Calendar for hard and soft constraints before ranking. A cheaper fare that lands during a protected block now loses.',
    note: 'The right answer depends on the week, not the fare.',
  },
  {
    id: 204,
    title: 'Two options maximum, one honest caveat',
    state: 'Merged',
    date: '2025-07-09',
    branch: 'flight/two-options',
    adds: 96, dels: 310,
    body:
      'Caps every recommendation at two surviving options. The list interface was deleted; choice overload was the product bug.',
    note: 'A colleague who did the homework brings two options, not nine.',
  },
];

export const FLIGHT_COMMITS = [
  { sha: 'e41c7b2', msg: 'delete BookingExecutor and threshold config', date: '2025-11-14' },
  { sha: 'a98d310', msg: 'route all itineraries through ApprovalGate', date: '2025-11-13' },
  { sha: '77f20ce', msg: 'add regret-test fixtures from October bookings', date: '2025-11-11' },
  { sha: 'c1550aa', msg: 'fare volatility: propagate range to summary', date: '2025-10-02' },
];

export const FLIGHT_TRADEOFFS = [
  {
    kept: 'Trust',
    spent: 'Speed',
    line: 'Every booking waits for a human token. Median approval adds 90 seconds; a wrong automatic booking costs more than a hundred right ones earn.',
  },
  {
    kept: 'Legibility',
    spent: 'Cleverness',
    line: 'Options are scored by four visible constraints, not an opaque model. John can always answer "why this flight?"',
  },
  {
    kept: 'Two options',
    spent: 'Completeness',
    line: 'The long tail of nearly-identical fares is deliberately discarded before it reaches a screen.',
  },
];

export const FLIGHT_LESSONS = [
  'Confidence was never the problem. Regret was.',
  'Uncertainty carried honestly reads as competence.',
  'The approval gate is structural, not a setting.',
];

export const FLIGHT_ARCH = {
  intake: ['Intent from Jarvis', 'Calendar constraints', 'Route history'],
  core: ['Option scorer', 'Uncertainty carrier', 'Approval gate'],
  out: ['Two options + caveat', 'Obligation → Reminder'],
};

/* Field stations along Highway 1 — travel + photography + observation. */
export const STATIONS = [
  {
    id: 'station-01',
    mark: 'STN 01',
    name: 'Fog line',
    coord: '38.05° N · 122.88° W',
    time: '06:41',
    kind: 'Photograph · 35mm',
    observation:
      'The fog burns off in one direction only. Timing against it beats fighting it — most scheduling problems are like this.',
    fedInto: 'Calendar · conflict pacing',
    palette: ['#aebdc6', '#7e8691', '#3d434c'],
  },
  {
    id: 'station-02',
    mark: 'STN 02',
    name: 'Market, early',
    coord: '37.79° N · 122.42° W',
    time: '07:12',
    kind: 'Field recording · 00:42',
    observation:
      'Listening for when a room decides to get loud. Good systems have the same threshold — quiet until something actually changes.',
    fedInto: 'Morning Briefing · lead with what changed',
    palette: ['#c9a86a', '#8a6f45', '#4a3f2e'],
  },
  {
    id: 'station-03',
    mark: 'STN 03',
    name: 'The overlook',
    coord: '36.56° N · 121.92° W',
    time: '18:54',
    kind: 'Notebook page',
    observation:
      'You can see the whole road from up here but none of the texture. Altitude is a tradeoff, not a virtue. Same with dashboards.',
    fedInto: 'Jarvis · scoped context over global memory',
    palette: ['#d9c9a8', '#a58e64', '#5c4f3a'],
  },
];

/* Writing on the desk. */
export const DESK_NOTES = [
  {
    id: 'boundary-list',
    title: 'The boundary list is the real spec',
    date: '2026-07',
    lede: 'Writing down what Jarvis must never do turned out to be the fastest way to decide what it should do.',
    words: 840,
  },
  {
    id: 'quiet-systems',
    title: 'Quiet until something changes',
    date: '2026-05',
    lede: 'A notification is a claim on someone\u2019s attention. Most systems make that claim carelessly.',
    words: 1120,
  },
  {
    id: 'forty-batches',
    title: 'Forty batches of pasta',
    date: '2026-02',
    lede: 'Hydration matters more than flour. Iteration tastes the same in every medium.',
    words: 620,
  },
];

export const LEDGER_INDEX_NOTE =
  'Four consequential decisions, kept in plain language. Failures receive the same care as wins.';

/* The cove — personality artifacts. */
export const COVE_ITEMS = [
  {
    id: 'pasta',
    mark: 'SUNDAY PASTA CO.',
    name: 'Batch 41',
    line: 'Semolina · eggs · patience. Forty batches to learn that hydration matters more than flour.',
  },
  {
    id: 'recorder',
    mark: 'POCKET RECORDER',
    name: 'Room tone, various',
    line: 'A library of rooms deciding to get loud. Played rarely, and only by choice.',
  },
  {
    id: 'camera',
    mark: '35MM',
    name: 'One roll a month',
    line: 'Thirty-six deliberate frames. The constraint is the hobby.',
  },
];
