"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import HeroCanvas from './HeroCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const visualColRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { images, loaded } = useImagePreloader(288, '/sequence-hero/');
  
  useEffect(() => {
    if (!loaded || !textRef.current || !leftColRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // MASTER TIMELINE: ALL animations in one engine
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, 
          invalidateOnRefresh: true,
        }
      });

      tl.to(leftColRef.current, {
        x: -100,
        opacity: 0,
        filter: "blur(20px)",
        force3D: true,
        ease: "power2.in"
      }, 0); 

      // Expand visual column to full screen
      tl.to(visualColRef.current, {
        width: "100%",
        left: "0%",
        force3D: true,
        ease: "power2.inOut"
      }, 0.1);

      // Fade out the gradient overlay to reveal full spaceship
      tl.to(overlayRef.current, {
        opacity: 0,
        ease: "power2.inOut"
      }, 0.3);    });

    const split = new SplitType('.reveal-text', { types: 'lines' });
    gsap.from(split.lines, {
      rotateX: -90,
      opacity: 0,
      y: 50,
      stagger: 0.05,
      duration: 1.2,
      ease: "power4.out",
    });

    return () => mm.revert();
  }, [loaded]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-[100vw] bg-[#030303] isolate">
      
      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-[100vw] flex flex-col md:flex-row items-center overflow-hidden">
        
        {/* Editorial Left */}
        <div 
          ref={leftColRef} 
          className="w-full md:w-1/2 px-6 md:px-[8vw] z-30 max-md:absolute max-md:inset-0 max-md:flex max-md:flex-col max-md:justify-center max-md:pointer-events-none"
        >
          <h1 
            ref={textRef} 
            className="huge-type cyphernaut-title text-white mb-12 blend-diff font-black"
          >
            CYPHERNAUT
          </h1>
          
          <div className="max-w-md reveal-text">
            <p className="text-xl text-white font-medium uppercase tracking-tighter leading-none mb-8 blend-diff text-shadow-glow">
              The next era of digital realization. 
              Engineered. 03.
            </p>
            <p className="text-white/40 leading-relaxed font-medium blend-diff text-sm max-w-xs uppercase tracking-widest">
              // We build high-fidelity protocols that scale 
              seamlessly into the decentralized frontier.
            </p>
          </div>
        </div>

        {/* Visual Right Column - Pinned Canvas Engine (Now expanding to full-frame) */}
        <div 
          ref={visualColRef}
          className="w-full h-full absolute inset-0 md:left-1/2 md:w-1/2 md:h-full z-10 bg-[#030303] overflow-hidden transition-all duration-300"
        >
          <HeroCanvas images={images} scrollContainerRef={containerRef} />
          
          {/* Subtle overlay for integration - will fade out to reveal full ship */}
          <div 
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/40 to-transparent pointer-events-none z-20" 
          />
        </div>

      </div>

    </section>
  );
}
