'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  drift: number;
  phase: number;
  opacity: number;
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
    const particleCount = 35; // Fewer particles

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (startAtTop = true): Particle => ({
      x: Math.random() * canvas.width,
      y: startAtTop ? -20 : Math.random() * canvas.height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.12 + 0.05, // Even slower fall
      drift: (Math.random() - 0.5) * 0.3, // Gentler drift
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.2,
    });

    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(false));
      }
    };

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particles.forEach((particle, index) => {
        // Update position - slow dreamy fall
        particle.y += particle.speedY;

        // Gentle sine wave drift
        particle.x += Math.sin(time + particle.phase) * particle.drift * 0.5;

        // Reset particle if it goes off screen
        if (particle.y > canvas.height + 20) {
          particles[index] = createParticle(true);
        }

        // Wrap horizontally
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;

        // Draw particle with soft glow
        ctx.save();

        // Outer glow
        const glowSize = particle.size * 4;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        gradient.addColorStop(0, `rgba(251, 191, 36, ${particle.opacity * 0.8})`);
        gradient.addColorStop(0.3, `rgba(251, 191, 36, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core - bright center
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 150, ${particle.opacity})`;
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Delay particle appearance by 2.5 seconds
    const delayTimer = setTimeout(() => {
      resize();
      initParticles();
      animate();
    }, 2500);

    window.addEventListener('resize', resize);

    return () => {
      clearTimeout(delayTimer);
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
