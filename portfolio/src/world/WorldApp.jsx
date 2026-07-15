import React, { useEffect, useRef, useState } from 'react';
import { useCamera } from './camera.js';
import { breadcrumbFor } from './geography.js';
import Terrain from './Terrain.jsx';
import AiLab from './AiLab.jsx';
import {
  CoveDistrict,
  DeskDistrict,
  FarPointDistrict,
  LedgerDistrict,
  Stations,
} from './Districts.jsx';
import { AltitudeRail, Hint, Minimap, Readout, TopBar, TravelPalette } from './Chrome.jsx';

/*
 * The Infinite Landscape — there are no pages here.
 * One world, one camera, six altitudes.
 */
export default function WorldApp() {
  const viewportRef = useRef(null);
  const worldRef = useRef(null);
  const { view, interacted, flyTo, flyToPlace, zoomCenterTo } = useCamera(viewportRef, worldRef);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const crumbs = breadcrumbFor(view.x, view.y, view.z);
    const here = crumbs[crumbs.length - 1];
    document.title =
      here.id === 'overview' ? 'John Moses — The Infinite Landscape' : `${here.label} · John Moses`;
  }, [view]);

  return (
    <div className="ws-viewport" ref={viewportRef}>
      <div className="ws-world" ref={worldRef}>
        <Terrain onTravel={flyToPlace} />
        <LedgerDistrict />
        <DeskDistrict />
        <CoveDistrict />
        <FarPointDistrict />
        <Stations onTravel={flyToPlace} />
        <AiLab onTravel={flyToPlace} />
      </div>

      <TopBar view={view} onTravel={flyToPlace} onOpenPalette={() => setPaletteOpen(true)} />
      <Readout view={view} />
      <AltitudeRail view={view} onSelect={zoomCenterTo} />
      <Minimap view={view} onJump={(x, y) => flyTo(x, y, view.z)} />
      <Hint dismissed={interacted} />
      <TravelPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} onGo={flyToPlace} />
    </div>
  );
}
