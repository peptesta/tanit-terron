'use client';

import { useState, useEffect } from 'react';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Non mostrare il cursore su touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHov(!!t.closest('button, .tanit-btn, .tray-chip, .color-dot, .sz-dot, .tool-btn'));
    };
    const onOut = () => setHov(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mouseout',  onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout',  onOut);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="tanit-cursor"
      style={{
        left:       pos.x,
        top:        pos.y,
        width:      hov ? 34 : 18,
        height:     hov ? 34 : 18,
        background: hov ? 'rgba(157,78,221,0.15)' : 'transparent',
      }}
    />
  );
}