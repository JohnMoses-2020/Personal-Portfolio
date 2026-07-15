import React from 'react';

/*
 * Band — existence by altitude. Opacity is computed in CSS from the live
 * camera zoom (--z, set every frame on the world element), so layers breathe
 * in and out during travel without React re-renders.
 *
 *   zin   zoom at which the layer is fully absent below
 *   fin   zoom span over which it resolves
 *   zout  zoom at which it has fully dissolved above (optional)
 */
export function Band({ zin = 0, fin = 0.4, zout, fout, className = '', style, children }) {
  const vars = {
    '--in': zin,
    '--ifi': 1 / Math.max(fin, 0.001),
    '--out': zout ?? 100000,
    '--ifo': 1 / Math.max(fout ?? (zout ? zout * 0.28 : 1), 0.001),
  };
  return (
    <div className={`band ${className}`} style={{ ...vars, ...style }}>
      {children}
    </div>
  );
}

/*
 * Stage — a plot of land authored at k× resolution, scaled down into world
 * units. Deep strata are authored at readable font sizes and compressed, so
 * text stays vector-crisp when the camera lands on them at 20–60×.
 */
export function Stage({ x, y, w, h, k = 4, className = '', children }) {
  return (
    <div className={`stage ${className}`} style={{ left: x, top: y, width: w, height: h }}>
      <div
        className="stage-inner"
        style={{ width: w * k, height: h * k, transform: `scale(${1 / k})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* A world-space label that flies the camera somewhere when chosen. */
export function PlaceMark({ x, y, onTravel, target, className = '', children, style }) {
  return (
    <button
      type="button"
      className={`placemark ${className}`}
      style={{ left: x, top: y, ...style }}
      onClick={(e) => {
        e.stopPropagation();
        onTravel?.(target);
      }}
    >
      {children}
    </button>
  );
}
