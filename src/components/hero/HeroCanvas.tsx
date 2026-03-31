"use client";
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  images: HTMLImageElement[];
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export default function HeroCanvas({ images, scrollContainerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef({ frame: 0 });

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = images[frameRef.current.frame];
    if (!img || !img.complete) return;
    
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;
    
    ctx.fillStyle = "#030303";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [images]);

  useEffect(() => {
    if (!canvasRef.current || images.length === 0) return;
    const canvas = canvasRef.current;
    
    const updateSize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        render();
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const st = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Increased from 0.1 for high-fidelity frame interpolation
      onUpdate: (self) => {
        const frame = Math.floor(self.progress * (images.length - 1));
        if (frameRef.current.frame !== frame) {
          frameRef.current.frame = Math.max(0, Math.min(frame, images.length - 1));
          requestAnimationFrame(render);
        }
      }
    });

    // Handle initial paint after a small delay to ensure styles are applied
    const timer = setTimeout(render, 100);

    return () => {
      st.kill();
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, [images, scrollContainerRef, render]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full object-cover z-0" 
      style={{ display: 'block' }}
    />
  );
}
