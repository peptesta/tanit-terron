// tanit-terron / hooks.js
'use client';
import { useState, useEffect, useRef } from 'react';

export function useFadeUp(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s var(--ease) ${delay}ms, transform 0.7s var(--ease) ${delay}ms`,
    },
  };
}
