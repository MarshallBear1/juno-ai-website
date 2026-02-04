'use client';

import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
}

interface Comet {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
  delay: number;
  trail: TrailPoint[];
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let comet: Comet | null = null;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create the slow comet (right to left at 3 seconds)
    const createComet = (): Comet => {
      return {
        x: canvas.width + 50,
        y: canvas.height * 0.18,
        speed: 5,
        opacity: 0,
        angle: Math.PI + (Math.PI / 180) * 6,
        active: false,
        delay: 180, // 3 seconds at ~60fps
        trail: [],
      };
    };

    resize();
    window.addEventListener('resize', resize);
    comet = createComet();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      if (!comet) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Check if comet should become active
      if (!comet.active && time > comet.delay) {
        comet.active = true;
        comet.opacity = 0;
      }

      // Draw and fade the trail (even after comet is gone)
      comet.trail.forEach((point, i) => {
        point.opacity -= 0.008; // Slow fade
        if (point.opacity > 0) {
          const glowGradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 12
          );
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${point.opacity * 0.6})`);
          glowGradient.addColorStop(0.5, `rgba(200, 220, 255, ${point.opacity * 0.3})`);
          glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
          ctx.beginPath();
          ctx.arc(point.x, point.y, 12, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      });

      // Remove fully faded trail points
      comet.trail = comet.trail.filter(p => p.opacity > 0);

      if (!comet.active) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Fade in
      if (comet.opacity < 1) {
        comet.opacity += 0.04;
      }

      // Add current position to trail
      if (time % 2 === 0) {
        comet.trail.push({
          x: comet.x,
          y: comet.y,
          opacity: comet.opacity * 0.8,
        });
      }

      // Move the comet
      comet.x += Math.cos(comet.angle) * comet.speed;
      comet.y += Math.sin(comet.angle) * comet.speed;

      // Draw immediate tail behind comet
      const tailLength = 120;
      const tailX = comet.x - Math.cos(comet.angle) * tailLength;
      const tailY = comet.y - Math.sin(comet.angle) * tailLength;

      const gradient = ctx.createLinearGradient(tailX, tailY, comet.x, comet.y);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.5, `rgba(220, 240, 255, ${comet.opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${comet.opacity})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(comet.x, comet.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw comet head
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
      ctx.fill();

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        comet.x, comet.y, 0,
        comet.x, comet.y, 20
      );
      glowGradient.addColorStop(0, `rgba(255, 255, 250, ${comet.opacity * 0.9})`);
      glowGradient.addColorStop(0.4, `rgba(200, 230, 255, ${comet.opacity * 0.4})`);
      glowGradient.addColorStop(1, 'rgba(200, 230, 255, 0)');
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Comet head disappears when off screen, but trail keeps fading
      if (comet.x < -150) {
        comet.active = false;
      }

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
      className="absolute inset-0 pointer-events-none z-[45]"
    />
  );
}
