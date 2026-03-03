'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PhotoFrameProps {
  src: string;        // percorso immagine, es. "/foto-tanit.jpg"
  alt: string;        // testo alternativo
  rotate?: number;    // rotazione in gradi (default 0)
  width?: number;     // larghezza in px (default 380)
}

export default function PhotoFrame({
  src,
  alt,
  rotate = 0,
  width = 380,
}: PhotoFrameProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position:  'relative',
        width:     width,
        transform: `rotate(${rotate}deg)`,
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cornice principale */}
      <div
        className="photo-frame"
        style={{
          transform:  hovered ? `rotate(${-rotate + 1}deg) scale(1.02)` : 'none',
          transition: 'transform 0.45s var(--spring), box-shadow 0.45s var(--spring)',
        }}
      >
        <div style={{ position: 'relative', width: '100%', paddingBottom: '125%' }}>
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'cover' }}
            sizes={`${width}px`}
          />
        </div>
      </div>

      {/* Bordo tratteggiato animato */}
      <div
        className="photo-frame-dashed"
        style={{
          transform:  hovered ? 'rotate(-2.5deg) scale(1.04)' : 'none',
          transition: 'transform 0.45s var(--spring)',
        }}
      />
    </div>
  );
}