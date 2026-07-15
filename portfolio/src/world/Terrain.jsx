import React from 'react';
import { WORLD } from './geography.js';
import { Band, PlaceMark } from './primitives.jsx';

/*
 * The terrain — one continuous chart of the coast.
 * Paper land, fog-grey Pacific, survey furniture. Region names are engraved
 * into the landscape and dissolve as the camera descends past them, the way
 * a state name disappears when you approach a street.
 */

const COAST =
  'M1780,-60 C1730,200 1705,420 1760,620 C1810,800 1640,950 1600,1150 ' +
  'C1565,1330 1700,1420 1680,1560 C1660,1720 1500,1810 1420,1950 ' +
  'C1345,2080 1330,2130 1300,2200 C1265,2290 1290,2360 1240,2450 ' +
  'C1180,2560 1100,2600 1050,2700 C1010,2790 990,2900 980,3060';

const HIGHWAY =
  'M1868,-60 C1872,240 1880,520 1895,706 C1908,930 1830,1080 1800,1256 ' +
  'C1772,1430 1826,1610 1855,1786 C1882,1950 1900,2050 1980,2320 ' +
  'C2030,2470 2120,2560 2320,2680 C2440,2750 2500,2800 2540,2900';

const ROUTE =
  'M1895,706 C1908,930 1830,1080 1800,1256 C1772,1430 1826,1610 1855,1786';

function Soundings() {
  const marks = [
    [520, 640, '1,240'],
    [880, 1120, '860'],
    [430, 1680, '1,910'],
    [760, 2140, '1,410'],
    [1210, 1490, '320'],
    [1450, 2620, '540'],
  ];
  return marks.map(([x, y, v]) => (
    <div key={`${x}-${y}`} className="sounding" style={{ left: x, top: y }}>
      {v}
    </div>
  ));
}

export default function Terrain({ onTravel }) {
  return (
    <>
      <svg
        className="terrain-svg"
        width={WORLD.w}
        height={WORLD.h}
        viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
        aria-hidden="true"
      >
        {/* land */}
        <path d={`${COAST} L4860,3060 L4860,-60 Z`} fill="var(--bench)" />

        {/* bathymetry — the ocean keeps its own quiet contours */}
        <g fill="none" stroke="var(--contour-sea)" strokeWidth="1.6">
          <path d="M1560,-60 C1510,240 1490,480 1545,700 C1595,880 1430,1010 1390,1210 C1355,1390 1490,1480 1465,1630 C1440,1790 1290,1880 1210,2020 C1130,2160 1120,2230 1080,2320 C1040,2420 1060,2480 1010,2570 C950,2680 880,2720 830,2820 C790,2910 775,2980 770,3060" />
          <path d="M1290,-60 C1245,260 1230,520 1285,740 C1330,910 1170,1070 1135,1270 C1100,1450 1230,1560 1200,1710 C1170,1870 1030,1960 950,2100 C870,2240 860,2320 820,2410 C780,2510 790,2560 740,2650 C680,2760 620,2800 570,2900 C535,2985 525,3020 520,3060" />
          <path d="M980,-60 C940,300 930,560 985,780 C1025,950 870,1130 835,1330 C800,1510 920,1640 890,1790 C860,1950 740,2040 660,2180 C580,2320 570,2410 530,2500 C490,2600 490,2640 440,2730 C380,2840 330,2880 280,2980 C260,3020 252,3040 250,3060" />
        </g>

        {/* graticule */}
        <g stroke="var(--graticule)" strokeWidth="0.9">
          {Array.from({ length: 15 }, (_, i) => (
            <line key={`gv${i}`} x1={i * 320 + 160} y1="0" x2={i * 320 + 160} y2={WORLD.h} />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`gh${i}`} x1="0" y1={i * 320 + 160} x2={WORLD.w} y2={i * 320 + 160} />
          ))}
        </g>

        {/* coastline */}
        <path d={COAST} fill="none" stroke="var(--aluminum-strong)" strokeWidth="2.4" />

        {/* Highway 1 */}
        <path d={HIGHWAY} fill="none" stroke="var(--road)" strokeWidth="3.4" />
        {/* the surveyed route between field stations */}
        <path
          d={ROUTE}
          fill="none"
          stroke="var(--cobalt)"
          strokeWidth="1.8"
          strokeDasharray="9 8"
          className="route-line"
        />

        {/* AI-Lab basin rings */}
        <g fill="none" stroke="var(--contour-land)" strokeWidth="1.4">
          <rect x="2720" y="648" width="1100" height="742" rx="130" />
          <rect x="2660" y="596" width="1220" height="846" rx="160" />
          <rect x="2604" y="548" width="1332" height="944" rx="190" />
        </g>

        {/* Decision Ridge hachures */}
        <g stroke="var(--contour-land)" strokeWidth="1.3">
          {Array.from({ length: 11 }, (_, i) => (
            <line
              key={`ridge${i}`}
              x1={2260 + i * 66}
              y1={1662 - (i % 2) * 10}
              x2={2296 + i * 66}
              y2={1636 - (i % 2) * 10}
            />
          ))}
        </g>

        {/* Pixel Island — the 2020 portfolio, preserved offshore */}
        <g>
          <rect x="1104" y="2350" width="56" height="56" fill="var(--bench)" stroke="var(--aluminum-strong)" strokeWidth="1.6" />
          <rect x="1160" y="2378" width="30" height="30" fill="var(--bench)" stroke="var(--aluminum-strong)" strokeWidth="1.6" />
          <rect x="1128" y="2406" width="34" height="26" fill="var(--bench)" stroke="var(--aluminum-strong)" strokeWidth="1.6" />
          <rect x="1090" y="2326" width="18" height="18" fill="var(--bench)" stroke="var(--aluminum-strong)" strokeWidth="1.6" />
        </g>
      </svg>

      {/* ---- ocean typography ---- */}
      <Band zin={0} fin={0.1} zout={2.6} fout={1.0}>
        <div className="ocean-name">THE PACIFIC</div>
        <Soundings />
      </Band>

      {/* ---- the chart title, engraved into the land ---- */}
      <Band zin={0} fin={0.1} zout={1.15} fout={0.42}>
        <div className="thesis">
          <div className="thesis-kicker">JOHN MOSES · SOFTWARE ENGINEER, MICROSOFT</div>
          <h1 className="thesis-line">
            Everyday life,
            <br />
            thoughtfully automated.
          </h1>
          <div className="thesis-foot">
            SCROLL TO DESCEND · DRAG TO TRAVEL · ⌘K TO FLY
          </div>
        </div>

        {/* legend cartouche, at sea */}
        <div className="cartouche">
          <div className="cartouche-title">LEGEND</div>
          <div className="cartouche-row">
            <span className="cartouche-swatch cartouche-swatch--dark" /> Instrument · systems at work
          </div>
          <div className="cartouche-row">
            <span className="cartouche-swatch" /> Paper · decisions &amp; notes
          </div>
          <div className="cartouche-row">
            <span className="cartouche-dot" /> Field station · observation
          </div>
          <div className="cartouche-row">
            <span className="cartouche-dash" /> Surveyed route · Highway 1
          </div>
        </div>
      </Band>

      {/* ---- region names (world altitude) ---- */}
      <Band zin={0} fin={0.1} zout={1.5} fout={0.6}>
        <PlaceMark x={3130} y={950} target="ailab" onTravel={onTravel} className="region-name region-name--major">
          AI-LAB
        </PlaceMark>
        <div className="region-sub" style={{ left: 3130, top: 1042 }}>
          CONNECTED INTELLIGENT SYSTEMS · 6 ACTIVE
        </div>

        <PlaceMark x={2560} y={1832} target="ledger" onTravel={onTravel} className="region-name">
          DECISION RIDGE
        </PlaceMark>
        <div className="region-sub" style={{ left: 2560, top: 1898 }}>
          THE LEDGER · 4 CONSEQUENTIAL CALLS
        </div>

        <PlaceMark x={3790} y={520} target="desk" onTravel={onTravel} className="region-name">
          THE DESK
        </PlaceMark>
        <div className="region-sub" style={{ left: 3790, top: 586 }}>
          WRITING · FIELD NOTES
        </div>

        <PlaceMark x={2330} y={2210} target="cove" onTravel={onTravel} className="region-name">
          THE COVE
        </PlaceMark>
        <div className="region-sub" style={{ left: 2330, top: 2276 }}>
          THE PERSON · OFF THE CLOCK
        </div>

        <PlaceMark x={2320} y={2648} target="farpoint" onTravel={onTravel} className="region-name">
          FAR POINT
        </PlaceMark>
        <div className="region-sub" style={{ left: 2320, top: 2712 }}>
          CORRESPONDENCE
        </div>

        <div className="highway-mark" style={{ left: 1913, top: 980 }}>
          <span className="highway-shield">1</span> HIGHWAY ONE
        </div>
      </Band>

      {/* island caption appears on approach */}
      <Band zin={1.5} fin={0.7} zout={9} fout={3}>
        <PlaceMark x={1150} y={2452} target="island" onTravel={onTravel} className="island-caption">
          <span className="island-caption-name">PIXEL ISLAND</span>
          <span className="island-caption-sub">the 2020 portfolio · preserved offshore</span>
        </PlaceMark>
      </Band>
    </>
  );
}
