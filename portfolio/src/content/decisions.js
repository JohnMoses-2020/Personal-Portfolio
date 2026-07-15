/*
 * The Decision Ledger — consequential decisions in plain language.
 *
 * Every entry is drafted and flagged provisional: the dates, signals, and
 * consequences must be verified or replaced by John's real records before the
 * flags come off. Failures receive the same care as wins.
 */

export const DECISIONS = [
  {
    id: 'human-confirmation',
    date: '2025-11',
    system: 'Flight',
    statement: 'Booking money stays a human decision.',
    consequence: 'Flight prepares a decision, holds it, and asks. The approval gate is structural, not a setting.',
    human: true,
    provisional: true,
    tried:
      'Auto-booking under a fare threshold, with a 24-hour cancellation safety net. It worked, technically — every test booking was defensible.',
    surprised:
      'Confidence was never the problem. Regret was. A correct booking John didn’t choose still felt wrong a week later.',
    changed:
      'The auto-book path was removed entirely. Since then, every booking has a moment where the system presents and a person decides.',
    affects: ['flight', 'jarvis'],
  },
  {
    id: 'broadcast-bus',
    date: '2026-01',
    system: 'Jarvis',
    statement: 'The broadcast bus failed, and the duplicate reminder proved it.',
    consequence: 'Agents never subscribe to intent directly. Jarvis owns routing; every handoff is explicit and attributable.',
    failure: true,
    provisional: true,
    tried:
      'A shared event stream: agents subscribed to intents and acted independently. Elegant on the whiteboard — no central bottleneck.',
    surprised:
      'Two agents answered the same intent twice. The duplicate reminder was trivial; not being able to say which system was responsible was not.',
    changed:
      'Routing moved into Jarvis. The system became less clever and more legible — a trade that has aged well.',
    affects: ['jarvis', 'reminder', 'calendar'],
  },
  {
    id: 'wellbeing-privacy',
    date: '2026-03',
    system: 'Health · Nutrition',
    statement: 'Health data never leaves the house.',
    consequence: 'Wellbeing patterns are computed on-device against a rolling window. No sync, no cloud copy, no diagnosis.',
    human: true,
    provisional: true,
    tried:
      'A hosted store for wellbeing signals, so patterns could improve across devices and time.',
    surprised:
      'The constraint improved the product. Forced to fit one machine, the feature shrank to the part that was actually useful — one qualified pattern a week.',
    changed:
      'The network boundary is enforced at the process level. What cannot be inspected locally does not ship.',
    affects: ['health', 'nutrition'],
  },
  {
    id: 'jarvis-memory',
    date: '2026-05',
    system: 'Jarvis',
    statement: 'Jarvis remembers less than it could.',
    consequence: 'Context is scoped per intention instead of accumulating into a global profile of John.',
    provisional: true,
    tried:
      'A persistent everything-memory: every preference, correction, and pattern folded into one long-lived profile.',
    surprised:
      'The system got spookier as it got smarter. Help that arrives from context you don’t remember sharing reads as surveillance, not service.',
    changed:
      'Complexity was removed rather than added: per-intention context windows, explicitly carried, visibly expiring. Predictable beats impressive.',
    affects: ['jarvis'],
  },
];
