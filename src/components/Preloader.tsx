'use client';

import { useState, useEffect } from 'react';

interface PreloaderProps {
  onEnter: () => void;
}

export default function Preloader({ onEnter }: PreloaderProps) {
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-transition after loading
    const readyTimer = setTimeout(() => {
      setIsReady(true);
      // Start exit after a brief pause
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(onEnter, 600);
      }, 400);
    }, 1200);
    return () => clearTimeout(readyTimer);
  }, [onEnter]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#0a1628' }}
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Moon/Logo */}
        <div
          className={`transition-all duration-700 ${
            isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div
            className="w-20 h-20 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              boxShadow: '0 0 60px rgba(251, 191, 36, 0.4), 0 0 120px rgba(251, 191, 36, 0.2)',
            }}
          />
        </div>

        {/* Loading dots */}
        <div className="h-12 flex items-center justify-center">
          <div className={`flex gap-2 transition-opacity duration-300 ${isReady ? 'opacity-0' : 'opacity-100'}`}>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-white/60"
                style={{
                  animation: 'floatDot 0.8s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatDot {
          0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
