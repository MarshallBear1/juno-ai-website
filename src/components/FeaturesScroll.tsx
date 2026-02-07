'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import PhoneDevice from './PhoneDevice';
import { phoneScreens, featureCards } from './PhoneScreens';

const featureSteps = [
  {
    id: 1,
    title: 'Finally someone who understands chronic disease',
    shortTitle: 'Understanding',
  },
  {
    id: 2,
    title: 'Track symptoms automatically',
    shortTitle: 'Tracking',
  },
  {
    id: 3,
    title: 'Detect flares early',
    shortTitle: 'Detection',
  },
  {
    id: 4,
    title: 'Learn how to pace yourself',
    shortTitle: 'Pacing',
  },
];

// Calculate active index from scroll progress
function getActiveIndex(progress: number): number {
  if (progress < 0.25) return 0;
  if (progress < 0.50) return 1;
  if (progress < 0.75) return 2;
  return 3;
}

// Mobile version - stacked layout without sticky
function MobileFeatures() {
  return (
    <div className="lg:hidden">
      {featureSteps.map((step, index) => (
        <div key={step.id} className="py-12 px-4">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            {step.title}
          </h3>

          {/* Phone */}
          <div className="flex justify-center mb-8">
            <div className="w-[260px] sm:w-[300px]">
              <PhoneDevice screens={phoneScreens} activeScreenIndex={index} />
            </div>
          </div>

          {/* Feature card content */}
          <div className="max-w-md mx-auto">
            {featureCards[index]}
          </div>
        </div>
      ))}
    </div>
  );
}

// Desktop/Tablet version - sticky scroll-driven
function DesktopFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Phone X position: centered (0) -> right offset (moves to right column)
  const phoneX = useTransform(
    scrollYProgress,
    [0, 0.2],
    ['0%', '40%']
  );

  // Subtle scale animation
  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1.05, 1]
  );

  // Left content opacity (fade in as section enters)
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    [0, 1]
  );

  // Update active index based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const newIndex = getActiveIndex(latest);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  // Memoize screens to prevent unnecessary re-renders
  const memoizedScreens = useMemo(() => phoneScreens, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block relative"
      style={{ height: '400vh' }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full max-w-6xl mx-auto px-6 xl:px-12 flex items-center">
          {/* Left column: Title and feature cards */}
          <motion.div
            className="w-[55%] pr-8 xl:pr-16"
            style={{ opacity: contentOpacity }}
          >
            {/* Animated title */}
            <div className="relative h-24 mb-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeIndex}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-3xl xl:text-4xl font-semibold text-gray-900 leading-tight"
                >
                  {featureSteps[activeIndex].title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Step indicators */}
            <div className="flex gap-2 mb-8">
              {featureSteps.map((step, index) => (
                <button
                  key={step.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-gray-900'
                      : 'w-4 bg-gray-300'
                  }`}
                  aria-label={`Go to ${step.shortTitle}`}
                />
              ))}
            </div>

            {/* Feature card content */}
            <div className="relative min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {featureCards[activeIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right column: Phone */}
          <div className="w-[45%] flex justify-center items-center">
            <motion.div
              className="w-[320px] xl:w-[360px]"
              style={prefersReducedMotion ? {} : {
                x: phoneX,
                scale: phoneScale,
              }}
            >
              <PhoneDevice
                screens={memoizedScreens}
                activeScreenIndex={activeIndex}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesScroll() {
  return (
    <section className="relative bg-[#ECECEC]">
      {/* Section header - visible above both layouts */}
      <div className="pt-16 pb-8 lg:pt-24 lg:pb-0 px-4">
        <div className="max-w-6xl mx-auto text-center lg:text-left">
          <p className="text-sm font-medium text-orange-600 tracking-wide uppercase mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl lg:hidden font-semibold text-gray-900">
            Everything you need to manage your health
          </h2>
        </div>
      </div>

      <MobileFeatures />
      <DesktopFeatures />

      {/* Bottom padding for smooth transition to next section */}
      <div className="h-16 lg:h-0" />
    </section>
  );
}
