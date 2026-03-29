'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function InkCurtain() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main ink wash - dissolves from center */}
          <motion.div
            className="absolute inset-0 bg-ink"
            initial={{ clipPath: 'circle(150% at 50% 50%)' }}
            animate={{ clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />

          {/* Ink drips falling during curtain */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bg-ink"
              style={{
                left: `${8 + i * 8}%`,
                width: `${1 + Math.random() * 2}px`,
              }}
              initial={{ height: '0%' }}
              animate={{ height: '100%' }}
              transition={{
                delay: 0.2 + i * 0.08,
                duration: 0.8 + Math.random() * 0.4,
                ease: 'easeIn',
              }}
            />
          ))}

          {/* Center text - appears then fades */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-brush text-3xl md:text-5xl text-white/90"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.1] }}
              transition={{ times: [0, 0.3, 0.7, 1], duration: 2 }}
            >
              展卷
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
