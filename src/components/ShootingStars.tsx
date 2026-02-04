'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  active: boolean;
  delay: number;
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const maxStars = 8;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStar = (): Star => {
      // Random angle between 20-60 degrees (shooting diagonally down-left or down-right)
      const goingLeft = Math.random() > 0.5;
      const angle = goingLeft
        ? (Math.PI / 180) * (200 + Math.random() * 40) // 200-240 degrees (down-left)
        : (Math.PI / 180) * (290 + Math.random() * 50); // 290-340 degrees (down-right)

      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.3, // Top 30% of screen
        length: Math.random() * 80 + 40,
        speed: Math.random() * 8 + 6,
        opacity: 0,
        angle: angle,
        active: false,
        delay: Math.random() * 300, // Random delay before appearing
      };
    };

    const initStars = () => {
      for (let i = 0; i < maxStars; i++) {
        const star = createStar();
        star.delay = i * 60 + Math.random() * 100; // Stagger initial delays
        stars.push(star);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    initStars();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      stars.forEach((star, index) => {
        // Check if star should become active
        if (!star.active && time > star.delay) {
          star.active = true;
          star.opacity = 0;
        }

        if (!star.active) return;

        // Fade in
        if (star.opacity < 1) {
          star.opacity += 0.05;
        }

        // Move the star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Calculate tail end position
        const tailX = star.x - Math.cos(star.angle) * star.length;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        // Draw the shooting star with gradient
        const gradient = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${star.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${star.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(star.x, star.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw bright head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Subtle glow around head
        const glowGradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, 8
        );
        glowGradient.addColorStop(0, `rgba(200, 220, 255, ${star.opacity * 0.5})`);
        glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
        ctx.beginPath();
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Reset star if it goes off screen
        if (
          star.x < -100 ||
          star.x > canvas.width + 100 ||
          star.y > canvas.height * 0.6
        ) {
          stars[index] = createStar();
          stars[index].active = false;
          stars[index].delay = time + Math.random() * 200 + 50;
        }
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
