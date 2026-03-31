"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  as?: 'h1' | 'h2';
}

export default function KineticTypography({ text, className, as: Tag = 'h1' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Morph weight from 100 to 900 based on scroll position (center of screen)
  const fontWeight = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [100, 900, 100]);
  
  const words = text.split(" ");

  return (
    <motion.div 
      ref={containerRef} 
      className={className}
      style={{ fontWeight }}
    >
      <Tag className="flex flex-wrap gap-x-[0.2em]">
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
