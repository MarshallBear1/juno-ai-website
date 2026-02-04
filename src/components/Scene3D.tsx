'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Context to share mouse position with children
interface MouseContextType {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

const MouseContext = createContext<MouseContextType>({ x: 0, y: 0 });

export function useMouseParallax() {
  return useContext(MouseContext);
}

interface Scene3DProps {
  children: ReactNode;
}

export default function Scene3D({ children }: Scene3DProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth lerp
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setSmoothPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.05,
        y: prev.y + (mousePos.y - prev.y) * 0.05,
      }));
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  return (
    <MouseContext.Provider value={smoothPos}>
      <div className="fixed inset-0 overflow-hidden bg-[#0a0520]">
        {children}
      </div>
    </MouseContext.Provider>
  );
}
