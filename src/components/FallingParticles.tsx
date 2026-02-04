'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
}

export default function FallingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const particleCount = 50;

    const colors = [
      '#F59E0B', // amber-500
      '#FBBF24', // amber-400
      '#FCD34D', // amber-300
      '#F97316', // orange-500
      '#FB923C', // orange-400
      '#FDBA74', // orange-300
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 4 + 2,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle();
        particle.y = Math.random() * canvas.height;
        particles.push(particle);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.y += particle.speedY;
        particle.x += particle.speedX;

        // Add subtle floating motion
        particle.x += Math.sin(particle.y * 0.01) * 0.3;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height + 20) {
          particles[index] = createParticle();
        }

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(0.5, particle.color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core circle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        ctx.restore();
      });

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
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}
