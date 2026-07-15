/*
 * Canonical timing tiers (docs/design/06-design-principles.md).
 * Motion is the visible transfer of responsibility:
 * initiator first, relationship second, receiver third, consequence last.
 */
export const tiers = {
  contact: 120,
  interface: 220,
  relationship: 400,
  narrative: 900,
};

/* Signals travel at constant visual velocity so causality stays readable. */
const SIGNAL_SPEED_PX_PER_MS = 0.7;

export function transferDuration(lengthPx) {
  const raw = Math.round(lengthPx / SIGNAL_SPEED_PX_PER_MS);
  return Math.min(480, Math.max(320, raw));
}
