'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaRef.current || vantaEffect) return;

    // Dynamically import Vanta to avoid SSR issues
    import('vanta/dist/vanta.globe.min').then((GLOBE) => {
      const effect = GLOBE.default({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x6366f1,
        color2: 0x3b82f6,
        backgroundColor: 0x0f172a,
        size: 1.2,
      });
      setVantaEffect(effect);
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 z-0"
    />
  );
}
