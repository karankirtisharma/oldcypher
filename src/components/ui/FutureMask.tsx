"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FutureMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        scale: 1.2,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[80vh] md:h-[150vh] w-[100vw] bg-[#030303] flex items-center justify-center overflow-hidden isolate">
      
      {/* Massive Masked Text - Clamped to prevent horizontal overflow */}
      <h2 className="text-[20vw] md:text-clamp font-black tracking-tighter select-none pointer-events-none z-20 text-white mix-blend-difference leading-none text-center px-4"
          style={{ fontSize: 'clamp(3rem, 22vw, 40vh)' }}>
        FUTURE
      </h2>

      {/* Background Media container that scales */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div ref={videoRef} className="w-full h-full bg-gradient-to-tr from-cyan-900 via-transparent to-fuchsia-900" />
      </div>

      <div className="absolute bottom-10 left-6 md:bottom-20 md:left-12 max-w-[80vw] md:max-w-sm z-30">
        <p className="text-white/40 font-mono text-[10px] md:text-xs uppercase tracking-normal md:tracking-widest">
          {"// The next era of digital realization is not simulated. It is engineered."}
        </p>
      </div>

    </section>
  );
}
