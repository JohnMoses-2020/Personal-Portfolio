import React from 'react';
import { site } from '../../content/site.js';
import { useInView } from '../../hooks/use-in-view.js';
import './silence.css';

/*
 * The exhale. A broad field of space and one sentence — the page's single
 * serif moment. Nothing asks for attention for several beats.
 */
export default function SilenceBreak() {
  const [ref, inView] = useInView({ threshold: 0.6 });
  return (
    <div className="silence room" ref={ref}>
      <p className={`t-serif-moment silence__sentence placed ${inView ? 'is-placed' : ''}`}>
        {site.silenceSentence}
      </p>
    </div>
  );
}
