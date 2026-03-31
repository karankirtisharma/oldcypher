"use client";
import React, { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion';
import { Menu, Home, Briefcase, Mail, Cpu, type LucideIcon } from 'lucide-react';

const NavItem = ({ label, Icon }: { label: string; Icon: LucideIcon }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      href="#"
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors relative group blend-diff"
    >
      <Icon size={16} className="group-hover:text-cyan-400 transition-colors" />
      <span className="hidden md:inline">{label}</span>
    </motion.a>
  );
};

export default function FloatingDock() {
  const { scrollY } = useScroll();
  const [isShrunk, setIsShrunk] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    if (latest > prev && latest > 100) {
      setIsShrunk(true);
    } else {
      setIsShrunk(false);
    }
  });

  return (
    <div className="fixed left-0 right-0 top-6 md:top-8 z-[100] flex justify-center pointer-events-none px-4 bottom-8 md:bottom-auto">
      <motion.nav
        animate={{ 
          width: isShrunk ? "56px" : "auto",
          height: isShrunk ? "56px" : "auto",
          borderRadius: isShrunk ? "28px" : "40px",
          padding: isShrunk ? "0px" : "8px 12px"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="pointer-events-auto flex items-center bg-[#0A0A0A]/70 backdrop-blur-2xl relative border border-white/10 overflow-hidden shadow-2xl"
        style={{
          borderImageSource: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.2), transparent)",
          borderImageSlice: 1
        }}
      >
        {isShrunk ? (
          <div className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors">
            <Menu className="text-white" size={24} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 border-r border-white/10 mr-2 hidden md:block">
              <span className="text-white font-bold tracking-tighter uppercase">Cypher</span>
            </div>
            <NavItem label="Home" Icon={Home} />
            <NavItem label="Services" Icon={Cpu} />
            <NavItem label="Work" Icon={Briefcase} />
            <NavItem label="Contact" Icon={Mail} />
          </div>
        )}
      </motion.nav>
    </div>
  );
}
