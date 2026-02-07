'use client';

import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import SplineHero from '@/components/SplineHero';
import Hero from '@/components/Hero';
import FeaturesScroll from '@/components/FeaturesScroll';
import ResearchSection from '@/components/ResearchSection';
import Community from '@/components/Community';
import Testimonials from '@/components/Testimonials';
import Team from '@/components/Team';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [mounted, setMounted] = useState(false);

  const handleEnterSite = () => {
    setShowPreloader(false);
    // Start the content animations after preloader exits
    setTimeout(() => setMounted(true), 100);
  };

  // Skip preloader if user has already seen it this session
  useEffect(() => {
    if (!sessionStorage.getItem('preloaderSeen')) return;

    const frame = requestAnimationFrame(() => {
      setShowPreloader(false);
      setMounted(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!showPreloader) {
      sessionStorage.setItem('preloaderSeen', 'true');
    }
  }, [showPreloader]);

  return (
    <main>
      {/* Preloader */}
      {showPreloader && <Preloader onEnter={handleEnterSite} />}

      {/* Spline Hero Section */}
      <SplineHero sceneUrl="https://prod.spline.design/XLsCBfyV8CMDkBcUECyNOuHm/scene.splinecode" />

      {/* Hero Section */}
      <Hero mounted={mounted} />

      {/* Phone Storytelling Section */}
      <FeaturesScroll />

      {/* AGI Research Section */}
      <ResearchSection />

      {/* Community Section */}
      <Community />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Team Section */}
      <Team />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
