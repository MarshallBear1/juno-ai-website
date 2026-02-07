'use client';

import { Suspense, lazy, useState, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline/next'));

interface SplineHeroProps {
  sceneUrl?: string;
}

function SplineLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#0a0a1a] to-[#1a1a2e]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-white/20 border-t-orange-400 rounded-full animate-spin" />
        <p className="text-white/60 text-sm">Loading 3D experience...</p>
      </div>
    </div>
  );
}

export default function SplineHero({
  sceneUrl = 'https://prod.spline.design/XLsCBfyV8CMDkBcUECyNOuHm/scene.splinecode',
}: SplineHeroProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Small delay to not block initial render
    const timer = setTimeout(() => setShouldLoad(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (hasError) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-[#1a1a2e]">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white/40 text-sm">3D scene unavailable</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-[#1a1a2e]">
      {shouldLoad && (
        <Suspense fallback={<SplineLoader />}>
          <Spline
            scene={sceneUrl}
            className="h-full w-full"
            onError={() => setHasError(true)}
          />
        </Suspense>
      )}
    </section>
  );
}
