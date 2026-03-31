"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(scrollContainer, {
        x: () => -(scrollContainer.scrollWidth - window.innerWidth),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollContainer.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen md:h-screen w-[100vw] overflow-hidden bg-[#030303] relative border-t border-white/5 isolate">
      <div className="absolute top-6 left-6 md:top-12 md:left-12 z-10">
        <h2 className="text-white/20 text-xs md:text-sm font-bold tracking-[0.5em] uppercase">Modules</h2>
      </div>

      <div ref={scrollRef} className="flex flex-col md:flex-row h-full md:items-center w-full md:w-max pt-32 pb-24 md:py-0 px-6 md:px-0 gap-24 md:gap-0">
        
        {/* Service 01 */}
        <div className="w-full md:min-w-[70vw] md:h-[60vh] flex flex-col justify-center md:px-12 group relative">
          <span className="text-white/5 md:text-white/10 text-8xl md:text-[10vw] font-black absolute -top-10 md:-top-10 -left-4 md:-left-10 select-none group-hover:text-cyan-400 transition-colors duration-700">01</span>
          <h3 className="text-white text-5xl md:text-[8vw] font-black uppercase leading-[0.8] mb-6 md:mb-8 md:group-hover:tracking-widest transition-all duration-1000 relative z-10">Tokenomics</h3>
          <p className="text-white/40 max-w-lg text-base md:text-lg md:ml-[5vw] relative z-10">
            Architecting circular economies that defy market volatility. 
            Militarized simulations for protocol survival.
          </p>
        </div>

        {/* Service 02 */}
        <div className="w-full md:min-w-[70vw] md:h-[60vh] flex flex-col justify-center md:px-12 group relative">
          <span className="text-white/5 md:text-white/10 text-8xl md:text-[10vw] font-black absolute -top-10 md:-top-10 -left-4 md:-left-10 select-none group-hover:text-fuchsia-400 transition-colors duration-700">02</span>
          <h3 className="text-white text-5xl md:text-[8vw] font-black uppercase leading-[0.8] mb-6 md:mb-8 md:group-hover:tracking-widest transition-all duration-1000 relative z-10">Marketing</h3>
          <p className="text-white/40 max-w-lg text-base md:text-lg md:ml-[5vw] relative z-10">
            Algorithmic expansion. We kill the traditional funnels 
            and replace them with viral consensus engines.
          </p>
        </div>

        {/* Service 03 */}
        <div className="w-full md:min-w-[70vw] md:h-[60vh] flex flex-col justify-center md:px-12 md:mr-[10vw] group relative">
          <span className="text-white/5 md:text-white/10 text-8xl md:text-[10vw] font-black absolute -top-10 md:-top-10 -left-4 md:-left-10 select-none">03</span>
          <h3 className="text-white text-5xl md:text-[8vw] font-black uppercase leading-[0.8] mb-6 md:mb-8 md:group-hover:tracking-widest transition-all duration-1000 relative z-10">Security</h3>
          <p className="text-white/40 max-w-lg text-base md:text-lg md:ml-[5vw] relative z-10">
            Immutable audits and state-of-the-art cryptographic shielding. 
            Your protocol is a fortress.
          </p>
        </div>

      </div>
    </section>
  );
}
