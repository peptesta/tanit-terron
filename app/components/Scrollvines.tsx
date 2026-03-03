'use client';

import { useEffect, useRef } from 'react';

export default function ScrollVines() {
  const leftPath  = useRef<SVGPathElement>(null);
  const rightPath = useRef<SVGPathElement>(null);
  const raf       = useRef<number>(0);
  const smooth    = useRef(0);

  useEffect(() => {
    function buildD(side: 'left' | 'right', p: number): string {
      // Punto x fisso per ogni lato
      const x = side === 'left' ? 20 : 40;
      const H = window.innerHeight;

      // Quanti "ricci" ci sono — crescono con lo scroll
      const curls = p * 4;

      let d = '';
      const steps = 20;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // y va dall'alto (0) verso il basso (H)
        const y = t * H;

        // L'oscillazione cresce verso il basso e con lo scroll
        const amp  = p * 22 * t;
        const freq = 2 + curls * t;
        const dir  = side === 'left' ? 1 : -1;
        const wave = Math.sin(t * Math.PI * freq) * amp * dir;

        const px = x + wave;

        if (i === 0) {
          d += `M ${px.toFixed(1)} ${y.toFixed(1)}`;
        } else {
          const tPrev  = (i - 1) / steps;
          const yPrev  = tPrev * H;
          const yCp    = ((y + yPrev) / 2).toFixed(1);
          const ampP   = p * 22 * tPrev;
          const freqP  = 2 + curls * tPrev;
          const waveP  = Math.sin(tPrev * Math.PI * freqP) * ampP * dir;
          const pxPrev = (x + waveP).toFixed(1);
          d += ` Q ${pxPrev} ${yCp} ${px.toFixed(1)} ${y.toFixed(1)}`;
        }
      }
      return d;
    }

    function tick() {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const target    = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      // Lerp morbido
      smooth.current += (target - smooth.current) * 0.07;
      const p = smooth.current;

      const lp = leftPath.current;
      const rp = rightPath.current;

      if (lp && rp) {
        const dL = buildD('left', p);
        const dR = buildD('right', p);

        lp.setAttribute('d', dL);
        rp.setAttribute('d', dR);

        // Stroke-dashoffset per l'effetto "si disegna dal basso"
        const lenL = lp.getTotalLength();
        const lenR = rp.getTotalLength();
        const drawn = Math.min(p * 1.6, 1);

        lp.style.strokeDasharray  = `${lenL}`;
        lp.style.strokeDashoffset = `${lenL * (1 - drawn)}`;
        rp.style.strokeDasharray  = `${lenR}`;
        rp.style.strokeDashoffset = `${lenR * (1 - drawn)}`;

        // Opacità
        const opacity = (0.2 + p * 0.5).toFixed(2);
        lp.style.opacity = opacity;
        rp.style.opacity = opacity;
      }

      raf.current = requestAnimationFrame(tick);
    }

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const svgStyle: React.CSSProperties = {
    position:      'fixed',
    top:           0,
    width:         60,
    height:        '100dvh',
    pointerEvents: 'none',
    zIndex:        5,
    overflow:      'visible',
  };

  const pathStyle: React.CSSProperties = {
    fill:          'none',
    stroke:        '#c77dff',
    strokeWidth:   1.8,
    strokeLinecap: 'round',
    opacity:       0.2,
  };

  return (
    <>
      <svg style={{ ...svgStyle, left: 0 }} viewBox="0 0 60 1000" preserveAspectRatio="none">
        <path ref={leftPath}  style={pathStyle} d="M 20 0 L 20 1000" />
      </svg>
      <svg style={{ ...svgStyle, right: 0 }} viewBox="0 0 60 1000" preserveAspectRatio="none">
        <path ref={rightPath} style={pathStyle} d="M 40 0 L 40 1000" />
      </svg>
    </>
  );
}