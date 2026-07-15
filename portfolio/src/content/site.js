/*
 * Canonical page copy. Strings marked as canonical come directly from
 * docs/design/05-homepage-specification.md and must not be reworded.
 * Anything with `provisional: true` is awaiting John's confirmation.
 */
export const site = {
  identityStack: ['John Moses', 'Software Engineer', 'Systems Builder'],

  headline: 'Everyday life, thoughtfully automated.',
  identityLine: 'John Moses — Software Engineer at Microsoft.',
  descriptor:
    'I build connected systems for time, travel, health, and the small decisions that shape a day.',
  heroInvitation: 'See the system at work',

  silenceSentence: 'The most useful intelligence is often the least visible.',

  nav: [
    { id: 'system', label: 'System' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'notes', label: 'Notes' },
    { id: 'contact', label: 'Contact' },
  ],

  farEnd: {
    invitation:
      'If you are building a system that should feel more useful than complicated, I would like to hear about it.',
    action: 'Write to John',
    email: {
      value: 'johnmoses4949@gmail.com',
      provisional: true,
      note: 'Address pending confirmation',
    },
    references: [
      { label: 'GitHub', href: 'https://github.com/JohnMoses-2020', pending: false },
      { label: 'LinkedIn', href: null, pending: true },
      { label: 'Résumé', href: null, pending: true },
    ],
    status: 'AI-Lab is ongoing',
    lastRevision: '2026-07',
  },
};
