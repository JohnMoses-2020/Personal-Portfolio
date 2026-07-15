/*
 * The Infinite Landscape — world geography.
 *
 * One continuous coordinate space, 4800 × 3000 world units. The Pacific to
 * the west, land rising east. Every destination is a coordinate plus an
 * altitude; the camera's zoom decides what can exist on screen. There are
 * no pages — only places.
 */

export const WORLD = { w: 4800, h: 3000 };

export const Z_MIN = 0.36;
export const Z_MAX = 60;

/* The six named altitudes (z = screen px per world unit). */
export const ALTITUDES = [
  { id: 'world', label: 'World', z: 0.4 },
  { id: 'region', label: 'Region', z: 1.7 },
  { id: 'system', label: 'System', z: 2.6 },
  { id: 'project', label: 'Project', z: 12 },
  { id: 'artifact', label: 'Artifact', z: 20 },
  { id: 'source', label: 'Source', z: 44 },
];

export function altitudeForZoom(z) {
  let best = ALTITUDES[0];
  for (const a of ALTITUDES) {
    if (z >= a.z * 0.78) best = a;
  }
  return best;
}

/* World position → plausible coastal coordinates (display only). */
export function toLatLon(x, y) {
  const lat = 38.4 - (y / WORLD.h) * 2.1;
  const lon = -123.6 + (x / WORLD.w) * 2.0;
  return {
    lat: `${lat.toFixed(3)}° N`,
    lon: `${Math.abs(lon).toFixed(3)}° W`,
  };
}

export function scaleLabel(z) {
  const denom = Math.max(50, Math.round(240000 / z / 50) * 50);
  return `1:${denom.toLocaleString('en-US')}`;
}

/* ---- The AI-Lab constellation, in world units ---- */
export const LAB = {
  basin: [2780, 700, 3760, 1330],
  instrument: [2960, 900, 3210, 1070],
  foundation: [2960, 1096, 3210, 1146],
  trunkX: 3252,
  outPort: { x: 3210, y: 985 },
  intent: { x: 2840, y: 985 },
  chips: [
    { id: 'morning-briefing', name: 'Morning Briefing', role: 'Anticipates', state: 'In daily use', rect: [3290, 880, 3408, 914], branchY: 897 },
    { id: 'calendar', name: 'Calendar', role: 'Coordinates', state: 'In daily use', rect: [3290, 932, 3408, 966], branchY: 949 },
    { id: 'reminder', name: 'Reminder', role: 'Remembers', state: 'In daily use', rect: [3436, 996, 3554, 1030], branchY: 1013 },
    { id: 'nutrition', name: 'Nutrition', role: 'Guides', state: 'On the bench', rect: [3290, 1162, 3408, 1196], branchY: 1179 },
    { id: 'health', name: 'Health', role: 'Understands', state: 'Under test', rect: [3436, 1123, 3554, 1157], branchY: 1140 },
  ],
  flight: { rect: [3290, 1047, 3408, 1131], branchY: 1089 },
  /* the source well, recessed inside the Flight floor */
  well: [3305.5, 1085, 3341.9, 1107.6],
};

/* ---- The Decision Ledger ---- */
export const LEDGER = {
  region: [2280, 1700, 2960, 2080],
  cards: [
    [2330, 1750, 2620, 1806],
    [2330, 1828, 2620, 1884],
    [2330, 1906, 2620, 1962],
    [2330, 1984, 2620, 2040],
  ],
  panel: [2650, 1745, 2920, 1965],
  openIndex: 1,
};

export const DESK_RECT = [3500, 380, 4100, 720];
export const COVE_RECT = [2030, 2060, 2650, 2430];
export const FARPOINT_RECT = [2080, 2540, 2560, 2820];

/* ---- Places — every destination the camera can travel to ---- */
export const PLACES = [
  { id: 'overview', name: 'The whole coast', kind: 'World', district: 'World', x: 2550, y: 1560, z: 0.4 },
  { id: 'ailab', name: 'AI-Lab', kind: 'Region', district: 'AI-Lab', x: 3270, y: 1015, z: 1.6, rect: [2780, 700, 3760, 1330] },
  { id: 'jarvis', name: 'Jarvis', kind: 'System', district: 'AI-Lab', x: 3270, y: 1040, z: 2.6, rect: [2960, 880, 3554, 1196] },
  { id: 'flight', name: 'Flight', kind: 'Project', district: 'AI-Lab', x: 3349, y: 1089, z: 12, rect: [3290, 1047, 3408, 1131] },
  { id: 'flight-source', name: 'PR #247 · Remove auto-booking', kind: 'Source', district: 'AI-Lab · Flight', x: 3323.7, y: 1096.3, z: 44, rect: [3305.5, 1085, 3341.9, 1107.6] },
  { id: 'morning-briefing', name: 'Morning Briefing', kind: 'System', district: 'AI-Lab', x: 3349, y: 897, z: 7 },
  { id: 'calendar', name: 'Calendar', kind: 'System', district: 'AI-Lab', x: 3349, y: 949, z: 7 },
  { id: 'reminder', name: 'Reminder', kind: 'System', district: 'AI-Lab', x: 3495, y: 1013, z: 7 },
  { id: 'nutrition', name: 'Nutrition', kind: 'System', district: 'AI-Lab', x: 3349, y: 1179, z: 7 },
  { id: 'health', name: 'Health', kind: 'System', district: 'AI-Lab', x: 3495, y: 1140, z: 7 },
  { id: 'ledger', name: 'The Decision Ledger', kind: 'Region', district: 'Decision Ridge', x: 2620, y: 1890, z: 2.1, rect: [2280, 1700, 2960, 2080] },
  { id: 'ledger-open', name: 'Decision 02 · The broadcast bus', kind: 'Artifact', district: 'Decision Ridge', x: 2762, y: 1855, z: 5.4 },
  { id: 'desk', name: 'The Desk', kind: 'Region', district: 'The Desk', x: 3800, y: 550, z: 2.3, rect: [3500, 380, 4100, 720] },
  { id: 'cove', name: 'The Cove', kind: 'Region', district: 'The Cove', x: 2340, y: 2245, z: 2.2, rect: [2030, 2060, 2650, 2430] },
  { id: 'station-01', name: 'Station 01 · Fog line', kind: 'Field station', district: 'Highway 1', x: 1988, y: 706, z: 5.2 },
  { id: 'station-02', name: 'Station 02 · Market, early', kind: 'Field station', district: 'Highway 1', x: 1926, y: 1256, z: 5.2 },
  { id: 'station-03', name: 'Station 03 · The overlook', kind: 'Field station', district: 'Highway 1', x: 2022, y: 1786, z: 5.2 },
  { id: 'farpoint', name: 'The Far Point', kind: 'Region', district: 'Far Point', x: 2320, y: 2680, z: 2.5, rect: [2080, 2540, 2560, 2820] },
  { id: 'island', name: 'Pixel Island · 2020', kind: 'Archive', district: 'The Pacific', x: 1152, y: 2388, z: 3.6 },
];

export function placeById(id) {
  return PLACES.find((p) => p.id === id);
}

function inRect(x, y, rect, pad = 0) {
  return x >= rect[0] - pad && x <= rect[2] + pad && y >= rect[1] - pad && y <= rect[3] + pad;
}

/* Breadcrumb trail for a camera position. */
export function breadcrumbFor(x, y, z) {
  const crumbs = [{ id: 'overview', label: 'California' }];
  if (z < 1.05) return crumbs;

  const districts = ['ailab', 'ledger', 'desk', 'cove', 'farpoint'];
  let district = null;
  for (const id of districts) {
    const p = placeById(id);
    if (inRect(x, y, p.rect, 90)) {
      district = p;
      break;
    }
  }
  if (!district) {
    if (z >= 3.4) {
      const station = PLACES.filter((p) => p.kind === 'Field station').find(
        (p) => Math.hypot(p.x - x, p.y - y) < 160,
      );
      if (station) crumbs.push({ id: station.id, label: station.name });
      else if (Math.hypot(placeById('island').x - x, placeById('island').y - y) < 220) {
        crumbs.push({ id: 'island', label: 'Pixel Island' });
      }
    }
    return crumbs;
  }
  crumbs.push({ id: district.id, label: district.name });

  if (district.id === 'ailab' && z >= 2.2) {
    const jarvis = placeById('jarvis');
    if (inRect(x, y, jarvis.rect, 60)) {
      crumbs.push({ id: 'jarvis', label: 'Jarvis' });
      const flight = placeById('flight');
      if (z >= 7.5 && inRect(x, y, flight.rect, 26)) {
        crumbs.push({ id: 'flight', label: 'Flight' });
        if (z >= 28 && inRect(x, y, placeById('flight-source').rect, 8)) {
          crumbs.push({ id: 'flight-source', label: 'PR #247' });
        }
      }
    }
  }
  if (district.id === 'ledger' && z >= 4.2) {
    crumbs.push({ id: 'ledger-open', label: 'Decision 02' });
  }
  return crumbs;
}
