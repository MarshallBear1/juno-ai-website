'use client';

import { useRef, useEffect, useState } from 'react';
import FluidBackground from '@/components/FluidBackground';
import CleanClouds from '@/components/CleanClouds';
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

          {/* Clean 3D Clouds using drei */}
          <ParallaxLayer depth={0.2} style={{ zIndex: 20 }}>
            <CleanClouds />
          </ParallaxLayer>

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

      {/* Curved transition from blue to cream */}
      <div className="relative h-32 bg-gradient-to-b from-[#3d3d8a] to-[#3d3d8a]">
        <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 128" preserveAspectRatio="none">
          <path fill="#FAF7F2" d="M0,128 L0,80 Q720,0 1440,80 L1440,128 Z"/>
        </svg>
      </div>

      {/* Second Section - Clean cream minimalist like the HTML page */}
      <section 
        ref={nextSectionRef}
        className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center px-6 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Clean minimalist content */}
          <h2 className="text-4xl md:text-6xl font-semibold text-gray-900 mb-6">
            Always here for you
          </h2>
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Juno understands what you're going through. Track symptoms, get support, and never feel alone on your health journey.
          </p>
          
          {/* Simple feature highlights - minimal */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['24/7 Support', 'Symptom Tracking', 'Personalized Care'].map((feature) => (
              <span 
                key={feature}
                className="px-5 py-2.5 bg-white rounded-full text-gray-700 text-sm font-medium shadow-sm border border-gray-100"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* App Store button - clean style */}
          <a 
            href="#" 
            className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3.5 rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[10px] opacity-80">Download on the</div>
              <div className="text-base font-semibold -mt-0.5">App Store</div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}
