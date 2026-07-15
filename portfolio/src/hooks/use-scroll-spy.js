import { useEffect, useState } from 'react';

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null);
  const key = ids.join(',');

  useEffect(() => {
    const idList = key.split(',').filter(Boolean);
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = null;
      for (const id of idList) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      setActiveId(current);
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
  }, [key]);

  return activeId;
}
