"use client";
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      lerp: 0.05, // Much smoother, slower deceleration
      duration: 1.5, // Longer scroll inertia
      smoothWheel: true,
      wheelMultiplier: 0.9, // Less 'jumpy' initial wheel input
      touchMultiplier: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard cinematic easing
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis directly into GSAP's Core Ticker for buttery 144hz sync without fighting native RAF
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Refresh everything after a small delay to handle initial image/font paint
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      console.log("ScrollTrigger: Refresh complete");
    }, 1000);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return <>{children}</>;
}
