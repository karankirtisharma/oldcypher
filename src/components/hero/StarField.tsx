"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let stars: { x: number; y: number; size: number; speed: number }[] = [];
    const count = 200;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: (Math.random() * 0.2 + 0.05)
      }));
    };

    // Use GSAP's ticker instead of independent requestAnimationFrame
    // to ensure exact synchronization with Lenis and other animations.
    const onTick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Consistent movement speed regardless of monitor FPS
        // Move stars based on their individual speed property
        star.y = (star.y + star.speed) % canvas.height;
      });
    };

    init();
    gsap.ticker.add(onTick);
    window.addEventListener('resize', init);
    
    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-2] pointer-events-none opacity-40" />;
}
