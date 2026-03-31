"use client";
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function MeshGradient() {
  // We use motion values as a bridge, but update them via GSAP for better smoothing
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const xNorm = (e.clientX - window.innerWidth / 2);
      const yNorm = (e.clientY - window.innerHeight / 2);
      
      // Simplified GSAP proxy for MotionValues for buttery smooth performance
      gsap.to({ val: mouseX.get() }, {
        val: xNorm,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function() { 
          mouseX.set(this.targets()[0].val); 
        }
      });
      
      gsap.to({ val: mouseY.get() }, {
        val: yNorm,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function() { 
          mouseY.set(this.targets()[0].val); 
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
      {/* Dynamic base blobs */}
      <motion.div
        className="absolute top-[25%] left-[25%] w-[50%] h-[50%] rounded-full bg-[#22d3ee]/10 blur-[120px]"
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div
        className="absolute bottom-[25%] right-[25%] w-[60%] h-[60%] rounded-full bg-[#d946ef]/10 blur-[150px]"
        style={{ 
          x: useTransform(mouseX, (v: number) => -v * 0.8), 
          y: useTransform(mouseY, (v: number) => -v * 0.8) 
        }} 
      />
      
      {/* Static ambient depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
    </div>
  );
}
