'use client';

import { useEffect, useState } from 'react';
import FluidBackground from '@/components/FluidBackground';
import UmbrellaAnimation from '@/components/UmbrellaAnimation';
import Scene3D from '@/components/Scene3D';
import ParallaxLayer from '@/components/ParallaxLayer';
import ShootingStars from '@/components/ShootingStars';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* Hero Frame - exactly 100vh */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Shooting Stars */}
        <ShootingStars />

        {/* Hamburger Menu - Top Left */}
        <button className="absolute top-6 left-6 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors">
          <div className="flex flex-col gap-1.5">
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
          </div>
        </button>

        <Scene3D>
          {/* Background */}
          <ParallaxLayer depth={-0.5} style={{ zIndex: 0 }}>
            <FluidBackground />
          </ParallaxLayer>

          {/* Juno character */}
          <ParallaxLayer depth={0.5} style={{ zIndex: 25 }}>
            <UmbrellaAnimation />
          </ParallaxLayer>

          {/* Reviews at top */}
          <ParallaxLayer depth={0.9} style={{ zIndex: 40 }} className="pointer-events-none">
            <div className="absolute inset-0 flex flex-col items-center pt-6 gap-3">
              {/* Rating badge */}
              <div
                className={`transition-all duration-[1200ms] ease-out delay-[2500ms] ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-white/90 text-sm font-medium">4.9 on the App Store</span>
                </div>
              </div>

              {/* Short reviews */}
              <div
                className={`flex flex-wrap justify-center gap-2 px-4 max-w-2xl transition-all duration-[1500ms] ease-out delay-[3000ms] ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                {[
                  "Finally, I feel understood",
                  "Like talking to a friend",
                  "My daily companion",
                  "So gentle and caring",
                ].map((review, i) => (
                  <span
                    key={i}
                    className="text-white/70 text-xs italic px-3 py-1 bg-white/5 rounded-full border border-white/10"
                  >
                    "{review}"
                  </span>
                ))}
              </div>
            </div>
          </ParallaxLayer>

          {/* Text content - centered but pushed up to sit above umbrella */}
          <ParallaxLayer depth={0.8} style={{ zIndex: 30 }} className="pointer-events-none">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-[35vh]">
              <div className="text-center">
                <h1
                  className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide transition-opacity duration-[3000ms] ease-in-out ${
                    mounted ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Meet Juno
                </h1>

                <div className="h-8"></div>

                <p
                  className={`text-lg md:text-xl lg:text-2xl text-blue-200/80 transition-opacity duration-[3000ms] ease-in-out delay-700 ${
                    mounted ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Your caring health companion for every moment
                </p>
              </div>
            </div>
          </ParallaxLayer>

          {/* App Store Button + Scroll to Explore */}
          <ParallaxLayer depth={0.6} style={{ zIndex: 35 }} className="pointer-events-none">
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
              {/* App Store Button */}
              <div
                className={`transition-opacity duration-[2500ms] ease-in-out delay-1000 pointer-events-auto mb-6 ${
                  mounted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-4 bg-white hover:bg-gray-100 text-gray-900 px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left leading-tight">
                    <div className="text-xs opacity-70">Download on the</div>
                    <div className="text-base font-semibold">App Store</div>
                  </div>
                </a>
              </div>

              {/* Scroll to Explore */}
              <div
                className={`flex flex-col items-center gap-2 transition-opacity duration-[2500ms] ease-in-out delay-[2000ms] ${
                  mounted ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="text-white/60 text-xs tracking-widest uppercase">Scroll to explore</span>
                <svg
                  className="w-5 h-5 text-white/60 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </ParallaxLayer>
        </Scene3D>
      </section>
    </main>
  );
}
