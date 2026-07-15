import React from 'react';
import { site } from '../../content/site.js';
import { useScrollSpy } from '../../hooks/use-scroll-spy.js';

const NAV_IDS = site.nav.map((item) => item.id);

export default function DatumRail() {
  const activeId = useScrollSpy(NAV_IDS);

  return (
    <header className="datum-rail">
      <div className="page-frame datum-rail__inner">
        <a className="datum-rail__name" href="#top" aria-label="John Moses — back to the top">
          <span className="t-engraved">John Moses</span>
        </a>
        <nav className="datum-rail__nav" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.id}
              className="datum-rail__item"
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              <span className="t-engraved">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
