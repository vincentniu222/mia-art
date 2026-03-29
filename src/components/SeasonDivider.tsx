'use client';

import { motion } from 'framer-motion';

export function SeasonDivider() {
  return (
    <div className="relative py-8 md:py-12">
      {/* Ink brush stroke SVG */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        className="max-w-lg mx-auto px-8"
      >
        <svg viewBox="0 0 400 30" className="w-full h-auto" preserveAspectRatio="none">
          {/* Main brush stroke */}
          <motion.path
            d="M0,15 C20,5 40,20 80,12 C120,4 140,22 180,14 C220,6 260,20 300,10 C340,4 360,18 400,15"
            fill="none"
            stroke="#2C2C2C"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          {/* Ink splatter along stroke */}
          {[
            { cx: 50, cy: 10, r: 2 },
            { cx: 200, cy: 16, r: 1.5 },
            { cx: 350, cy: 12, r: 2.5 },
            { cx: 100, cy: 18, r: 1 },
            { cx: 280, cy: 8, r: 1.8 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx} cy={dot.cy} r={dot.r}
              fill="#2C2C2C"
              opacity="0.1"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.5, 1] }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Ink wash cloud */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-8 bg-ink/[0.02] rounded-full blur-xl" />
      </motion.div>
    </div>
  );
}
