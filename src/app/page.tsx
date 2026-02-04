'use client';

import { useRef, useEffect, useState } from 'react';
import FluidBackground from '@/components/FluidBackground';
// import CleanClouds from '@/components/CleanClouds'; // Disabled - using aurora instead
import UmbrellaAnimation from '@/components/UmbrellaAnimation';
import Scene3D from '@/components/Scene3D';
import ParallaxLayer from '@/components/ParallaxLayer';

export default function Home() {
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* Hero Frame - exactly 100vh */}
      <section className="relative h-screen w-full overflow-hidden">
        
        {/* Hamburger Menu - Top Left (like Tolan) */}
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

          {/* Clouds disabled - using aurora background instead */}

          {/* Juno character - positioned in lower area */}
          <ParallaxLayer depth={0.5} style={{ zIndex: 25 }}>
            <UmbrellaAnimation />
          </ParallaxLayer>

          {/* Reviews badge at very top - loads in LAST */}
          <ParallaxLayer depth={0.9} style={{ zIndex: 40 }} className="pointer-events-none">
            <div className="absolute inset-0 flex justify-center pt-6">
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
            </div>
          </ParallaxLayer>

          {/* Text content - ABOVE the avatar, clear of umbrella */}
          <ParallaxLayer depth={0.8} style={{ zIndex: 30 }} className="pointer-events-none">
            <div className="absolute inset-0 flex flex-col items-center px-4 pt-[14vh]">
              <div className="text-center">
                {/* Main title - gentle fade in */}
                <h1 
                  className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide mb-4 transition-all duration-[2000ms] ease-out ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Meet Juno
                </h1>
                
                {/* Subtitle - fades in after title */}
                <p 
                  className={`text-lg md:text-xl lg:text-2xl text-blue-200/80 transition-all duration-[1800ms] ease-out delay-500 ${
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  Your caring health companion for every moment
                </p>
              </div>
            </div>
          </ParallaxLayer>

          {/* App Store Button + Scroll - stacked properly */}
          <ParallaxLayer depth={0.6} style={{ zIndex: 35 }} className="pointer-events-none">
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
              {/* App Store Button - ABOVE scroll */}
              <div 
                className={`transition-all duration-[1500ms] ease-out delay-1000 pointer-events-auto mb-6 ${
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <a 
                  href="#" 
                  className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-gray-900 px-5 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] opacity-70">Download on the</div>
                    <div className="text-sm font-semibold -mt-0.5">App Store</div>
                  </div>
                </a>
              </div>
              
              {/* Scroll indicator - BELOW App Store */}
              <button 
                onClick={scrollToNext}
                className="flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-colors cursor-pointer pointer-events-auto"
              >
                <span className="text-[10px] tracking-widest uppercase">Scroll</span>
                <div className="w-5 h-7 border-2 border-current rounded-full flex justify-center pt-1">
                  <div className="w-1 h-1.5 bg-current rounded-full animate-bounce" />
                </div>
              </button>
            </div>
          </ParallaxLayer>
        </Scene3D>
      </section>

      {/* Next Section - Original dark blue style */}
      <section 
        ref={nextSectionRef}
        className="min-h-screen bg-gradient-to-b from-[#0d0d25] to-[#1a1a3e] flex items-center justify-center"
      >
        <div className="text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">More Coming Soon</h2>
          <p className="text-xl text-blue-200/70">This is where the rest of your content goes</p>
        </div>
      </section>
    </main>
  );
}
