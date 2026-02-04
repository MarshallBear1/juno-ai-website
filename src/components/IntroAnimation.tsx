'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        onComplete();
      },
    });

    // Start with cream, fade to transparent revealing the gradient behind
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 2,
      ease: 'power2.inOut',
      delay: 0.5,
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50"
      style={{ backgroundColor: '#f5f3e8' }}
    />
  );
}
