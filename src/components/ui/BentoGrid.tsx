"use client";
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon, Rocket, Shield, Zap, Globe, Coins, Share2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BentoCardProps {
  title: string;
  description: string;
  className?: string;
  Icon: LucideIcon;
  accent?: 'cyan' | 'violet';
}

const BentoCard = ({ title, description, className, Icon, accent = 'cyan' }: BentoCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "glass-card inner-glow p-8 group relative flex flex-col justify-between min-h-[350px] transition-all duration-700",
        accent === 'cyan' ? "hover:bioluminescent-cyan" : "hover:neon-shadow-violet",
        className
      )}
    >
      <div style={{ transform: "translateZ(80px)" }} className="relative z-10">
        <div className={cn(
          "w-14 h-14 rounded-[1.25rem] flex items-center justify-center mb-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 inner-glow",
          accent === 'cyan' ? "bg-cyan-500/10 text-[#00F0FF]" : "bg-fuchsia-500/10 text-fuchsia-400"
        )}>
          <Icon size={28} />
        </div>
        <h3 className="text-3xl font-black tracking-tighter text-white mb-4 uppercase group-hover:liquid-shimmer">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-base font-medium max-w-[280px]">
          {description}
        </p>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
        accent === 'cyan' 
          ? "bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),#22d3ee_0%,transparent_70%)]" 
          : "bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),#d946ef_0%,transparent_70%)]"
      )} />
    </motion.div>
  );
};

export default function BentoGrid() {
  return (
    <section 
      className="px-8 py-24 max-w-7xl mx-auto relative z-20"
      style={{
        maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        <BentoCard 
          title="Tokenomics" 
          description="Crafting hyper-stable economic models for next-gen protocols."
          Icon={Coins}
          className="md:col-span-2"
        />
        <BentoCard 
          title="Marketing" 
          description="Viral expansion through algorithmic storytelling."
          Icon={Rocket}
          accent="violet"
        />
        <BentoCard 
          title="Security" 
          description="Militarized audit pipelines for immutable code."
          Icon={Shield}
          accent="violet"
        />
        <BentoCard 
          title="Global Scale" 
          description="Seamless multi-chain infrastructure from day zero."
          Icon={Globe}
          className="md:col-span-2"
        />
      </div>
    </section>
  );
}
