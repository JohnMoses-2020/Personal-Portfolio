/*
 * The camera — one continuous view onto the landscape.
 *
 * Wheel descends and climbs. Drag travels. Double-click approaches.
 * flyTo() is the only long-distance transport: it climbs, crosses, and
 * descends in one breath, like a light aircraft — never a page cut.
 *
 * The transform is applied outside React for frame-rate; a throttled `view`
 * feeds the HUD (coordinates, breadcrumb, altitude, minimap).
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { WORLD, Z_MIN, Z_MAX, placeById } from './geography.js';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function parseHash() {
  const m = /#@(-?[\d.]+),(-?[\d.]+),([\d.]+)z/.exec(window.location.hash);
  if (!m) return null;
  return {
    x: clamp(parseFloat(m[1]), 0, WORLD.w),
    y: clamp(parseFloat(m[2]), 0, WORLD.h),
    z: clamp(parseFloat(m[3]), Z_MIN, Z_MAX),
  };
}

export function useCamera(viewportRef, worldRef) {
  const cam = useRef({ x: 2550, y: 1560, z: 0.4 });
  const [view, setView] = useState({ ...cam.current });
  const [interacted, setInteracted] = useState(false);

  const raf = useRef(0);
  const hudTimer = useRef(0);
  const settleTimer = useRef(0);
  const pointers = useRef(new Map());
  const drag = useRef(null);
  const moved = useRef(0);
  const reducedMotion = useRef(false);

  const scheduleHud = useCallback(() => {
    if (hudTimer.current) return;
    hudTimer.current = window.setTimeout(() => {
      hudTimer.current = 0;
      setView({ ...cam.current });
    }, 80);
  }, []);

  const writeHash = useCallback(() => {
    const { x, y, z } = cam.current;
    const hash = `#@${x.toFixed(0)},${y.toFixed(0)},${z.toFixed(2)}z`;
    window.history.replaceState(null, '', hash);
  }, []);

  const scheduleSettle = useCallback(() => {
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(writeHash, 380);
  }, [writeHash]);

  const apply = useCallback(() => {
    const world = worldRef.current;
    const vp = viewportRef.current;
    if (!world || !vp) return;
    const { x, y, z } = cam.current;
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    world.style.transform = `translate3d(${(vw / 2 - x * z).toFixed(2)}px, ${(vh / 2 - y * z).toFixed(2)}px, 0) scale(${z})`;
    world.style.setProperty('--z', String(z));
    scheduleHud();
    scheduleSettle();
  }, [scheduleHud, scheduleSettle, viewportRef, worldRef]);

  const stopAnim = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
  }, []);

  const setCam = useCallback(
    (x, y, z) => {
      cam.current.x = clamp(x, 60, WORLD.w - 60);
      cam.current.y = clamp(y, 60, WORLD.h - 60);
      cam.current.z = clamp(z, Z_MIN, Z_MAX);
      apply();
    },
    [apply],
  );

  /* Zoom keeping the world point under (sx, sy) fixed on screen. */
  const zoomAt = useCallback(
    (sx, sy, factor) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const r = vp.getBoundingClientRect();
      const { x, y, z } = cam.current;
      const nz = clamp(z * factor, Z_MIN, Z_MAX);
      const dx = sx - r.left - r.width / 2;
      const dy = sy - r.top - r.height / 2;
      const wx = x + dx / z;
      const wy = y + dy / z;
      setCam(wx - dx / nz, wy - dy / nz, nz);
    },
    [setCam, viewportRef],
  );

  /* One-breath flight: climb, cross, descend. */
  const flyTo = useCallback(
    (tx, ty, tz, opts = {}) => {
      stopAnim();
      const from = { ...cam.current };
      tx = clamp(tx, 60, WORLD.w - 60);
      ty = clamp(ty, 60, WORLD.h - 60);
      tz = clamp(tz, Z_MIN, Z_MAX);

      if (reducedMotion.current) {
        setCam(tx, ty, tz);
        return;
      }

      const lz0 = Math.log(from.z);
      const lz1 = Math.log(tz);
      const dist = Math.hypot(tx - from.x, ty - from.y);
      const midZ = Math.exp((lz0 + lz1) / 2);
      const screensAway = (dist * midZ) / 900;
      const arc = Math.min(2.1, Math.max(0, Math.log1p(screensAway) * 0.9));
      const duration =
        opts.duration ??
        clamp(560 + Math.abs(lz1 - lz0) * 190 + Math.log1p(screensAway) * 330, 560, 1900);

      const t0 = performance.now();
      const step = (now) => {
        const t = clamp((now - t0) / duration, 0, 1);
        const k = ease(t);
        const lz = lz0 + (lz1 - lz0) * k - arc * Math.sin(Math.PI * k);
        setCam(from.x + (tx - from.x) * k, from.y + (ty - from.y) * k, Math.exp(lz));
        if (t < 1) raf.current = requestAnimationFrame(step);
        else raf.current = 0;
      };
      raf.current = requestAnimationFrame(step);
    },
    [setCam, stopAnim],
  );

  const flyToPlace = useCallback(
    (id) => {
      const p = placeById(id);
      if (p) flyTo(p.x, p.y, p.z);
    },
    [flyTo],
  );

  const zoomCenterTo = useCallback(
    (z) => {
      flyTo(cam.current.x, cam.current.y, z);
    },
    [flyTo],
  );

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return undefined;

    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const syncFromHash = () => {
      const parsed = parseHash();
      if (!parsed) return;
      stopAnim();
      cam.current = parsed;
      apply();
      setView({ ...cam.current });
    };

    syncFromHash();

    const onHashChange = () => syncFromHash();

    const markInteracted = () => setInteracted(true);

    const onWheel = (e) => {
      e.preventDefault();
      stopAnim();
      markInteracted();
      const unit = e.deltaMode === 1 ? 16 : 1;
      const speed = e.ctrlKey || e.metaKey ? 0.0072 : 0.0017;
      const factor = Math.exp(-e.deltaY * unit * speed);
      zoomAt(e.clientX, e.clientY, factor);
    };

    const onPointerDown = (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      vp.setPointerCapture(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      moved.current = 0;
      if (pointers.current.size === 1) {
        drag.current = { x: e.clientX, y: e.clientY };
        stopAnim();
      }
    };

    const onPointerMove = (e) => {
      if (!pointers.current.has(e.pointerId)) return;
      const prev = pointers.current.get(e.pointerId);
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.current.size === 2) {
        const pts = [...pointers.current.values()];
        const prevPts = pts.map((p, i) =>
          i === [...pointers.current.keys()].indexOf(e.pointerId) ? prev : p,
        );
        const d0 = Math.hypot(prevPts[0].x - prevPts[1].x, prevPts[0].y - prevPts[1].y);
        const d1 = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        const mx = (pts[0].x + pts[1].x) / 2;
        const my = (pts[0].y + pts[1].y) / 2;
        if (d0 > 0) zoomAt(mx, my, d1 / d0);
        markInteracted();
        moved.current += 10;
        return;
      }

      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current = { x: e.clientX, y: e.clientY };
      moved.current += Math.abs(dx) + Math.abs(dy);
      if (moved.current > 4) markInteracted();
      const { x, y, z } = cam.current;
      setCam(x - dx / z, y - dy / z, z);
    };

    const onPointerUp = (e) => {
      pointers.current.delete(e.pointerId);
      if (pointers.current.size === 0) drag.current = null;
      else drag.current = [...pointers.current.values()][0];
    };

    const onClickCapture = (e) => {
      if (moved.current > 6) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const onDblClick = (e) => {
      e.preventDefault();
      markInteracted();
      const vpr = vp.getBoundingClientRect();
      const { x, y, z } = cam.current;
      const factor = e.shiftKey ? 1 / 2.4 : 2.4;
      const nz = clamp(z * factor, Z_MIN, Z_MAX);
      const dx = e.clientX - vpr.left - vpr.width / 2;
      const dy = e.clientY - vpr.top - vpr.height / 2;
      const wx = x + dx / z;
      const wy = y + dy / z;
      flyTo(wx - dx / nz, wy - dy / nz, nz, { duration: 620 });
    };

    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.metaKey || e.ctrlKey) return;
      const { x, y, z } = cam.current;
      const panStep = 180 / z;
      const alts = [0.4, 1.7, 2.6, 12, 20, 44];
      switch (e.key) {
        case '+':
        case '=':
          flyTo(x, y, z * 1.7, { duration: 420 });
          break;
        case '-':
        case '_':
          flyTo(x, y, z / 1.7, { duration: 420 });
          break;
        case 'ArrowLeft':
          setCam(x - panStep, y, z);
          break;
        case 'ArrowRight':
          setCam(x + panStep, y, z);
          break;
        case 'ArrowUp':
          setCam(x, y - panStep, z);
          break;
        case 'ArrowDown':
          setCam(x, y + panStep, z);
          break;
        case '0':
        case 'h':
        case 'H': {
          const p = placeById('overview');
          flyTo(p.x, p.y, p.z);
          break;
        }
        default: {
          const n = parseInt(e.key, 10);
          if (n >= 1 && n <= 6) flyTo(x, y, alts[n - 1], { duration: 700 });
          break;
        }
      }
    };

    const onResize = () => apply();

    vp.addEventListener('wheel', onWheel, { passive: false });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    vp.addEventListener('click', onClickCapture, true);
    vp.addEventListener('dblclick', onDblClick);
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('resize', onResize);

    return () => {
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
      vp.removeEventListener('click', onClickCapture, true);
      vp.removeEventListener('dblclick', onDblClick);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('resize', onResize);
      stopAnim();
      window.clearTimeout(hudTimer.current);
      window.clearTimeout(settleTimer.current);
    };
  }, [apply, flyTo, setCam, stopAnim, viewportRef, zoomAt]);

  return { view, interacted, flyTo, flyToPlace, zoomCenterTo };
}
