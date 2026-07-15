/*
 * The Maker's Edge — three artifacts at a time, one sentence each,
 * discovered rather than advertised.
 *
 * The physical artifacts (photograph, recording, pasta object, notebook page,
 * the unstaged photo of John) are reserved positions until John supplies the
 * real ones. Each reserved plate states plainly what belongs there.
 */

export const ARTIFACTS = [
  {
    id: 'california-light',
    kind: 'Photograph',
    title: 'California light',
    provenance: 'Highway 1 · 35mm',
    provenanceProvisional: true,
    note: 'What I noticed: the fog burns off in one direction only. Timing against it beats fighting it — most scheduling problems are like this.',
    noteProvisional: true,
    media: { type: 'reserved', awaiting: 'A photograph of California light, with the field note beneath it.' },
  },
  {
    id: 'field-recording',
    kind: 'Field recording',
    title: 'Market, early',
    provenance: '00:42 · recorded on a pocket recorder',
    provenanceProvisional: true,
    note: 'Listening for when a room decides to get loud. Good systems have the same threshold — quiet until something actually changes.',
    noteProvisional: true,
    media: { type: 'audio-reserved', awaiting: 'A 30–60 second field recording. Plays only by choice; the room stays visually quiet.' },
  },
  {
    id: 'sunday-pasta',
    kind: 'Sunday Pasta Co.',
    title: 'Batch 41 label',
    provenance: 'Semolina · eggs · patience',
    provenanceProvisional: true,
    note: 'Forty batches to learn that hydration matters more than flour. Iteration tastes the same in every medium.',
    noteProvisional: true,
    media: { type: 'reserved', awaiting: 'A Sunday Pasta Co. label, recipe card, or packaging proof.' },
  },
];

export const NOTEBOOK = {
  title: 'What surprised me',
  date: '2026-07',
  provisional: true,
  body: 'Writing down what Jarvis must never do turned out to be the fastest way to decide what it should do. The boundary list is the real spec.',
  linksTo: { decisionId: 'jarvis-memory', label: 'It shaped the memory decision' },
};

export const MAKER = {
  photo: { type: 'reserved', awaiting: 'One unstaged image of John, or his hands at work.' },
  microsoftLine: 'Builds software at scale at Microsoft.',
};
