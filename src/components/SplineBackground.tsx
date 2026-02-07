'use client';

import { useState } from 'react';
import Spline from '@splinetool/react-spline/next';

export default function SplineBackground() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="absolute inset-0 w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a1628]">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-white/40 animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}
      <Spline
        scene="https://prod.spline.design/OtUSokTAbfAsGamQ/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
