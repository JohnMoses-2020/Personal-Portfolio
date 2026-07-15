import React from 'react';
import { checksumGrid } from '../../lib/checksum.js';

export default function Checksum({ seed, size = 24, cobalt = false, className = '', label }) {
  const cell = size / 8;
  const cells = checksumGrid(seed);
  return (
    <svg
      className={`checksum ${cobalt ? 'checksum--cobalt' : ''} ${className}`}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell} height={cell} />
      ))}
    </svg>
  );
}
