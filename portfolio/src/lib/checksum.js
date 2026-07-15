/*
 * The pixel checksum — an 8×8 registration stamp generated from a
 * hand-authored pattern vocabulary. Every stamp in the family shares the four
 * corner registration cells and the baseline calibration notch; the seed
 * chooses a core and a set of mirrored satellite cells. It is a signature,
 * not an illustration. Its ancestor is the 2020 pixel portfolio.
 */

function fnv1a(str) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/* Always present: corner registration + the calibration notch. */
const REGISTRATION = [
  [0, 0],
  [7, 0],
  [0, 7],
  [7, 7],
  [3, 7],
  [4, 7],
];

/* Four authored core shapes. */
const CORES = [
  [
    [3, 3],
    [4, 4],
  ],
  [
    [3, 4],
    [4, 3],
  ],
  [
    [3, 3],
    [3, 4],
    [4, 3],
    [4, 4],
  ],
  [
    [3, 3],
    [4, 4],
    [4, 3],
  ],
];

/* Authored satellite positions (left half; each mirrors to the right). */
const SATELLITES = [
  [1, 1],
  [2, 1],
  [3, 1],
  [1, 2],
  [3, 2],
  [1, 3],
  [2, 4],
  [1, 5],
  [3, 5],
  [1, 6],
  [2, 6],
  [3, 6],
];

export function checksumCells(seed) {
  const hash = fnv1a(seed);
  const cells = new Set();
  REGISTRATION.forEach(([x, y]) => cells.add(`${x},${y}`));
  CORES[hash & 3].forEach(([x, y]) => cells.add(`${x},${y}`));
  SATELLITES.forEach(([x, y], index) => {
    if ((hash >>> (2 + index)) & 1) {
      cells.add(`${x},${y}`);
      cells.add(`${7 - x},${y}`);
    }
  });
  return cells;
}

export function checksumGrid(seed) {
  const cells = checksumCells(seed);
  const grid = [];
  for (let y = 0; y < 8; y += 1) {
    for (let x = 0; x < 8; x += 1) {
      if (cells.has(`${x},${y}`)) grid.push([x, y]);
    }
  }
  return grid;
}
