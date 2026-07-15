# The Long Table — homepage

Version 1 of the portfolio homepage, built faithfully to the canonical design
foundation in [`../docs/design/`](../docs/design/). One page, seven rooms:

```
01 Arrival        The Near Edge
02 Discovery      The Instrument Bay
03 Understanding  One Day, Many Systems
04 Evidence       Objects on the Bench
05 Judgment       The Decision Ledger
06 Person         The Maker's Edge
07 Invitation     The Far End
```

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Desktop-first by design; responsive work is a later phase.

## Stack

Vite + React 19, plain CSS with design tokens (`src/styles/tokens.css`),
hand-rolled motion on the canonical timing tiers, SVG instrument. Fonts:
Geist Sans, IBM Plex Mono, Newsreader (the doc-sanctioned accessible stack),
self-hosted via Fontsource.

## Replacing provisional content

Nothing on this page pretends. Content awaiting real material carries a
visible amber stamp and a `provisional: true` flag in the content layer —
swapping in the truth is a content edit, never a component change:

| File | Holds |
|---|---|
| `src/content/site.js` | Copy, nav, email, references, status |
| `src/content/ecosystem.js` | Agents, regions, maturity states, map geometry |
| `src/content/scenarios.js` | The four authored day scenarios |
| `src/content/evidence.js` | Evidence assemblies (artifacts, decisions, provenance) |
| `src/content/decisions.js` | Decision-ledger entries |
| `src/content/person.js` | Maker's Edge artifacts, notebook, maker photo |

The source-material checklist lives in
[`../docs/design/07-open-questions.md`](../docs/design/07-open-questions.md).

## Visual verification

`node scripts/shots.mjs` walks every room and interaction state with headless
Chromium (requires the dev server on port 5183) and writes screenshots to
`/tmp/portfolio-shots`.
