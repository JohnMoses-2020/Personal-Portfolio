import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
