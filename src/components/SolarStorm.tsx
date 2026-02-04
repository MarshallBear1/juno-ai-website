'use client';

import { useEffect, useRef } from 'react';

export default function SolarStorm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      life: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 150;

    const colors = [
      '#fbbf24', // amber
      '#f59e0b', // orange
      '#ef4444', // red
      '#fb923c', // light orange
      '#fcd34d', // yellow
      '#fef3c7', // cream
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (): Particle => {
      // Particles come from top, angled like solar wind
      const startFromTop = Math.random() > 0.3;
      return {
        x: startFromTop ? Math.random() * canvas.width : canvas.width + 50,
        y: startFromTop ? -20 : Math.random() * canvas.height * 0.6,
        vx: -Math.random() * 2 - 0.5, // Moving left
        vy: Math.random() * 3 + 1, // Moving down
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.2,
        life: 1,
      };
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.x = Math.random() * canvas.width;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw solar glow at top
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.7,
        -canvas.height * 0.3,
        0,
        canvas.width * 0.7,
        -canvas.height * 0.3,
        canvas.height * 0.8
      );
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0.15)');
      gradient.addColorStop(0.3, 'rgba(245, 158, 11, 0.08)');
      gradient.addColorStop(0.6, 'rgba(239, 68, 68, 0.03)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulsing glow
      const pulseIntensity = 0.05 + Math.sin(time * 2) * 0.02;
      const pulseGradient = ctx.createRadialGradient(
        canvas.width * 0.8,
        0,
        0,
        canvas.width * 0.8,
        0,
        canvas.height * 0.5
      );
      pulseGradient.addColorStop(0, `rgba(251, 191, 36, ${pulseIntensity})`);
      pulseGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = pulseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Add some wave motion
        p.x += Math.sin(p.y * 0.02 + time) * 0.5;

        // Reset if off screen
        if (p.y > canvas.height || p.x < -50) {
          particles[i] = createParticle();
        }

        // Draw particle with trail
        const trailLength = 20;
        for (let t = 0; t < trailLength; t++) {
          const trailAlpha = p.alpha * (1 - t / trailLength) * 0.5;
          const trailX = p.x - p.vx * t * 0.5;
          const trailY = p.y - p.vy * t * 0.5;

          ctx.beginPath();
          ctx.arc(trailX, trailY, p.size * (1 - t / trailLength * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(')', `, ${trailAlpha})`).replace('rgb', 'rgba').replace('#', '');

          // Convert hex to rgba
          const hex = p.color;
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${trailAlpha})`;
          ctx.fill();
        }

        // Draw main particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        const hex = p.color;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha})`);
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.fill();
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
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
