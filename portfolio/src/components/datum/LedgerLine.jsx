import React, { useEffect, useState } from 'react';

/*
 * The vertical datum: the table's long edge, running the entire page.
 * A cobalt trace holds at reading height while the bench moves beneath it;
 * at the far end it yields to the checksum, where the trace settles.
 */
export default function LedgerLine() {
  const [traceVisible, setTraceVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const pastArrival = window.scrollY > window.innerHeight * 0.55;
      const checksum = document.getElementById('master-checksum');
      const beforeChecksum = !checksum || checksum.getBoundingClientRect().top > window.innerHeight * 0.42 + 26;
      setTraceVisible(pastArrival && beforeChecksum);
    };

    const requestMeasure = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', requestMeasure, { passive: true });
    window.addEventListener('resize', requestMeasure);
    return () => {
      window.removeEventListener('scroll', requestMeasure);
      window.removeEventListener('resize', requestMeasure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="ledger-line" aria-hidden="true" />
      <div className={`ledger-trace ${traceVisible ? 'is-visible' : ''}`} aria-hidden="true" />
    </>
  );
}
