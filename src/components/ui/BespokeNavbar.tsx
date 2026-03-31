"use client";
import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function BespokeNavbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;
    
    // Improved threshold logic to prevent rapid flickering/jitter
    if (latest > 150 && diff > 10) {
      setHidden(true); // Hide when scrolling down with intent
    } else if (diff < -10) {
      setHidden(false); // Show when scrolling up with intent
    }
    
    if (latest > 20) {
      setScrolled(true); 
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-colors duration-300 ${
        scrolled ? "bg-[#030303]/40 backdrop-blur-md border-b border-white/10" : "bg-transparent border-transparent"
      }`}
    >
      <div className="text-white font-bold tracking-[0.2em] text-xl uppercase">
        Cyphernaut
      </div>
      <nav className="flex items-center gap-8 text-sm font-medium tracking-widest text-white/80 uppercase">
        <a href="#" className="hover:text-white transition-colors">Services</a>
        <a href="#" className="hover:text-white transition-colors">Work</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </nav>
    </motion.header>
  );
}
