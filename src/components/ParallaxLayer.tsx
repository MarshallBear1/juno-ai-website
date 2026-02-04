'use client';

import { ReactNode } from 'react';
import { useMouseParallax } from './Scene3D';

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number; // 0 = no movement, negative = move opposite (far), positive = move same direction (close)
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxLayer({ 
  children, 
  depth = 0, 
  className = '',
  style = {}
}: ParallaxLayerProps) {
  const mouse = useMouseParallax();
  
  // Calculate movement based on depth
  // Positive depth = foreground (moves more, same direction as mouse)
  // Negative depth = background (moves less, opposite direction)
  const moveX = mouse.x * depth * 15;
  const moveY = mouse.y * depth * 10;
  
  // Add slight rotation for 3D feel
  const rotateY = mouse.x * depth * 2;
  const rotateX = -mouse.y * depth * 1.5;

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        ...style,
        transform: `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
