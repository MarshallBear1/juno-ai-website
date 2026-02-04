'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface IntroSplotchesProps {
  onComplete: () => void;
}

export default function IntroSplotches({ onComplete }: IntroSplotchesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splotchRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    // Animate each splotch expanding from different positions
    splotchRefs.current.forEach((splotch, i) => {
      tl.fromTo(
        splotch,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        i * 0.2 // Stagger
      );
    });

    // Fade out the cream background
    tl.to(
      containerRef.current,
      {
        backgroundColor: 'transparent',
        duration: 1,
        ease: 'power2.inOut',
      },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  const addSplotchRef = (el: HTMLDivElement | null, index: number) => {
    if (el) splotchRefs.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      style={{ backgroundColor: '#f5f3e8' }}
    >
      {/* Blue splotches appearing from different places */}
      <div
        ref={(el) => addSplotchRef(el, 0)}
        className="absolute rounded-full"
        style={{
          width: '150vw',
          height: '150vw',
          top: '-20%',
          left: '-25%',
          background: 'radial-gradient(circle, rgba(34, 63, 130, 0.9) 0%, rgba(15, 23, 42, 0.95) 60%, transparent 70%)',
        }}
      />
      <div
        ref={(el) => addSplotchRef(el, 1)}
        className="absolute rounded-full"
        style={{
          width: '120vw',
          height: '120vw',
          bottom: '-30%',
          right: '-20%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(30, 58, 95, 0.9) 50%, transparent 65%)',
        }}
      />
      <div
        ref={(el) => addSplotchRef(el, 2)}
        className="absolute rounded-full"
        style={{
          width: '100vw',
          height: '100vw',
          top: '30%',
          right: '-30%',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.7) 0%, rgba(37, 99, 235, 0.8) 40%, transparent 60%)',
        }}
      />
      <div
        ref={(el) => addSplotchRef(el, 3)}
        className="absolute rounded-full"
        style={{
          width: '80vw',
          height: '80vw',
          bottom: '10%',
          left: '-15%',
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.6) 0%, rgba(59, 130, 246, 0.7) 45%, transparent 60%)',
        }}
      />
    </div>
  );
}
