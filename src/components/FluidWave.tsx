'use client';

import { useEffect, useRef } from 'react';

export default function FluidWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      alpha: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y =
          yOffset +
          Math.sin(x * frequency + time * speed) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 0.7) * amplitude * 0.5 +
          Math.sin(x * frequency * 2 + time * speed * 1.3) * amplitude * 0.25;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Multiple layered waves for depth effect
      // Darker wave in back
      drawWave(
        canvas.height * 0.55,
        40,
        0.003,
        0.5,
        'rgba(59, 130, 246, 0.3)',
        0.4
      );

      // Middle wave
      drawWave(
        canvas.height * 0.6,
        50,
        0.004,
        0.7,
        'rgba(99, 179, 237, 0.4)',
        0.5
      );

      // Lighter wave in front
      drawWave(
        canvas.height * 0.65,
        35,
        0.005,
        0.9,
        'rgba(147, 197, 253, 0.5)',
        0.6
      );

      // Soft glow effect
      drawWave(
        canvas.height * 0.7,
        25,
        0.006,
        1.1,
        'rgba(191, 219, 254, 0.3)',
        0.3
      );

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
